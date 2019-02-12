<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180330225717 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_rights_items');
        $this->addSql('ALTER TABLE content DROP rights');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_rights_items (content_id INT NOT NULL, right_items_content_id INT NOT NULL, INDEX IDX_674BB01D84A0A3ED (content_id), INDEX IDX_674BB01DA065EA4E (right_items_content_id), PRIMARY KEY(content_id, right_items_content_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_rights_items ADD CONSTRAINT FK_674BB01D84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_rights_items ADD CONSTRAINT FK_674BB01DA065EA4E FOREIGN KEY (right_items_content_id) REFERENCES rights_item_content (id)');
        $this->addSql('ALTER TABLE content ADD rights LONGTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:json_array)\'');
    }
}
