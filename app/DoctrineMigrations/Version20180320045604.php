<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180320045604 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_sales_package (content_id INT NOT NULL, content_sales_package_id INT NOT NULL, INDEX IDX_8B4B3DE484A0A3ED (content_id), INDEX IDX_8B4B3DE4434C6D61 (content_sales_package_id), PRIMARY KEY(content_id, content_sales_package_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_sales_package ADD CONSTRAINT FK_8B4B3DE484A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_sales_package ADD CONSTRAINT FK_8B4B3DE4434C6D61 FOREIGN KEY (content_sales_package_id) REFERENCES sales_package (id)');
        $this->addSql('ALTER TABLE content DROP sales_packages');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_sales_package');
        $this->addSql('ALTER TABLE content ADD sales_packages LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:json_array)\'');
    }
}
