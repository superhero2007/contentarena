<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190221050940 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE job (id INT AUTO_INCREMENT NOT NULL, user_id INT DEFAULT NULL, colleague_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, run_at DATETIME NOT NULL, completed TINYINT(1) NOT NULL, type VARCHAR(255) NOT NULL, INDEX IDX_FBD8E0F8A76ED395 (user_id), INDEX IDX_FBD8E0F892482EE7 (colleague_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE job ADD CONSTRAINT FK_FBD8E0F8A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE job ADD CONSTRAINT FK_FBD8E0F892482EE7 FOREIGN KEY (colleague_id) REFERENCES `user` (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE job');
    }
}
