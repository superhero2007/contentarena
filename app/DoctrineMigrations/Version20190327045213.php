<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190327045213 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE bid_definitions (id INT AUTO_INCREMENT NOT NULL, bid_id INT DEFAULT NULL, position INT NOT NULL, name VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_67ACE6674D9866B8 (bid_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bid_license_term_item (id INT AUTO_INCREMENT NOT NULL, term_id INT DEFAULT NULL, bid_id INT DEFAULT NULL, position INT NOT NULL, content LONGTEXT NOT NULL, INDEX IDX_1886FDEDE2C35FC (term_id), INDEX IDX_1886FDED4D9866B8 (bid_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bid_definitions ADD CONSTRAINT FK_67ACE6674D9866B8 FOREIGN KEY (bid_id) REFERENCES bid (id)');
        $this->addSql('ALTER TABLE bid_license_term_item ADD CONSTRAINT FK_1886FDEDE2C35FC FOREIGN KEY (term_id) REFERENCES source_license_term (id)');
        $this->addSql('ALTER TABLE bid_license_term_item ADD CONSTRAINT FK_1886FDED4D9866B8 FOREIGN KEY (bid_id) REFERENCES bid (id)');
        $this->addSql('DROP INDEX UNIQ_AF11F562462CE4F5 ON source_definitions');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE bid_definitions');
        $this->addSql('DROP TABLE bid_license_term_item');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_AF11F562462CE4F5 ON source_definitions (position)');
    }
}
