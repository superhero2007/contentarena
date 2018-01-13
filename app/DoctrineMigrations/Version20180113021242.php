<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180113021242 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rights_items_join (rights_id INT NOT NULL, rights_item_content_id INT NOT NULL, INDEX IDX_F53E8565B196EE6E (rights_id), INDEX IDX_F53E856545AC4134 (rights_item_content_id), PRIMARY KEY(rights_id, rights_item_content_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rights_items_join ADD CONSTRAINT FK_F53E8565B196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rights_items_join ADD CONSTRAINT FK_F53E856545AC4134 FOREIGN KEY (rights_item_content_id) REFERENCES rights_item_content (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rights_item_content DROP FOREIGN KEY FK_6A069C1FB196EE6E');
        $this->addSql('DROP INDEX IDX_6A069C1FB196EE6E ON rights_item_content');
        $this->addSql('ALTER TABLE rights_item_content DROP rights_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE rights_items_join');
        $this->addSql('ALTER TABLE rights_item_content ADD rights_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights_item_content ADD CONSTRAINT FK_6A069C1FB196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id)');
        $this->addSql('CREATE INDEX IDX_6A069C1FB196EE6E ON rights_item_content (rights_id)');
    }
}
