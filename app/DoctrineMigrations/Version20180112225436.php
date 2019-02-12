<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180112225436 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rights (id INT AUTO_INCREMENT NOT NULL, group_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, definition LONGTEXT DEFAULT NULL, INDEX IDX_160D103FE54D947 (group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rights_content (id INT AUTO_INCREMENT NOT NULL, slug VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, content LONGTEXT DEFAULT NULL, UNIQUE INDEX UNIQ_3C22F82C989D9B62 (slug), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rights_item_content (id INT AUTO_INCREMENT NOT NULL, enabled TINYINT(1) NOT NULL, items LONGTEXT NOT NULL COMMENT \'(DC2Type:array)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE rights_item_content_type (id INT AUTO_INCREMENT NOT NULL, slug_id INT DEFAULT NULL, type VARCHAR(255) NOT NULL, value VARCHAR(255) DEFAULT NULL, date DATETIME DEFAULT NULL, INDEX IDX_5F4286E2311966CE (slug_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rights ADD CONSTRAINT FK_160D103FE54D947 FOREIGN KEY (group_id) REFERENCES rights_group (id)');
        $this->addSql('ALTER TABLE rights_item_content_type ADD CONSTRAINT FK_5F4286E2311966CE FOREIGN KEY (slug_id) REFERENCES rights_content (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_item_content_type DROP FOREIGN KEY FK_5F4286E2311966CE');
        $this->addSql('DROP TABLE rights');
        $this->addSql('DROP TABLE rights_content');
        $this->addSql('DROP TABLE rights_item_content');
        $this->addSql('DROP TABLE rights_item_content_type');
    }
}
