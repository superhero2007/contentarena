<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180724020728 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE thread (id INT AUTO_INCREMENT NOT NULL, listing_id INT DEFAULT NULL, owner_cmpany_id INT DEFAULT NULL, buyer_company_id INT DEFAULT NULL, user_id INT DEFAULT NULL, INDEX IDX_31204C83D4619D1A (listing_id), INDEX IDX_31204C834C8759DA (owner_cmpany_id), INDEX IDX_31204C836742E6F7 (buyer_company_id), INDEX IDX_31204C83A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C83D4619D1A FOREIGN KEY (listing_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C834C8759DA FOREIGN KEY (owner_cmpany_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C836742E6F7 FOREIGN KEY (buyer_company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C83A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FD4619D1A');
        $this->addSql('DROP INDEX IDX_B6BD307FD4619D1A ON message');
        $this->addSql('ALTER TABLE message CHANGE listing_id thread_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FE2904019 FOREIGN KEY (thread_id) REFERENCES thread (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307FE2904019 ON message (thread_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE message DROP FOREIGN KEY FK_B6BD307FE2904019');
        $this->addSql('DROP TABLE thread');
        $this->addSql('DROP INDEX IDX_B6BD307FE2904019 ON message');
        $this->addSql('ALTER TABLE message CHANGE thread_id listing_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE message ADD CONSTRAINT FK_B6BD307FD4619D1A FOREIGN KEY (listing_id) REFERENCES content (id)');
        $this->addSql('CREATE INDEX IDX_B6BD307FD4619D1A ON message (listing_id)');
    }
}
