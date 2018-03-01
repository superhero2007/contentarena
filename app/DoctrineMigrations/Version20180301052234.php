<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180301052234 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rights_items_children_join (rights_item_content_id INT NOT NULL, rights_id INT NOT NULL, INDEX IDX_16312AF845AC4134 (rights_item_content_id), INDEX IDX_16312AF8B196EE6E (rights_id), PRIMARY KEY(rights_item_content_id, rights_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rights_items_children_join ADD CONSTRAINT FK_16312AF845AC4134 FOREIGN KEY (rights_item_content_id) REFERENCES rights_item_content (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rights_items_children_join ADD CONSTRAINT FK_16312AF8B196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rights_item_content DROP FOREIGN KEY FK_6A069C1F727ACA70');
        $this->addSql('DROP INDEX IDX_6A069C1F727ACA70 ON rights_item_content');
        $this->addSql('ALTER TABLE rights_item_content DROP parent_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE rights_items_children_join');
        $this->addSql('ALTER TABLE rights_item_content ADD parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights_item_content ADD CONSTRAINT FK_6A069C1F727ACA70 FOREIGN KEY (parent_id) REFERENCES rights (id)');
        $this->addSql('CREATE INDEX IDX_6A069C1F727ACA70 ON rights_item_content (parent_id)');
    }
}
