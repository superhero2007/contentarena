<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180226071326 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_selected_countries');
        $this->addSql('ALTER TABLE content DROP fee, DROP salesMethod, DROP bid');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_selected_countries (content_id INT NOT NULL, country_id INT NOT NULL, INDEX IDX_49182EF84A0A3ED (content_id), INDEX IDX_49182EFF92F3E70 (country_id), PRIMARY KEY(content_id, country_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_selected_countries ADD CONSTRAINT FK_49182EF84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_selected_countries ADD CONSTRAINT FK_49182EFF92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE content ADD fee VARCHAR(20) DEFAULT NULL COLLATE utf8_unicode_ci, ADD salesMethod VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD bid VARCHAR(20) DEFAULT NULL COLLATE utf8_unicode_ci');
    }
}
