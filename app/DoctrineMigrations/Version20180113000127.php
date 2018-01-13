<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180113000127 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_item_content ADD content_id INT DEFAULT NULL, ADD name VARCHAR(255) NOT NULL, ADD `values` LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:simple_array)\'');
        $this->addSql('ALTER TABLE rights_item_content ADD CONSTRAINT FK_6A069C1F84A0A3ED FOREIGN KEY (content_id) REFERENCES rights_content (id)');
        $this->addSql('CREATE INDEX IDX_6A069C1F84A0A3ED ON rights_item_content (content_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_item_content DROP FOREIGN KEY FK_6A069C1F84A0A3ED');
        $this->addSql('DROP INDEX IDX_6A069C1F84A0A3ED ON rights_item_content');
        $this->addSql('ALTER TABLE rights_item_content DROP content_id, DROP name, DROP `values`');
    }
}
