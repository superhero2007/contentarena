<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180713043923 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content_installments DROP FOREIGN KEY FK_F0312AF8B196EE6E');
        $this->addSql('DROP TABLE content_installments');
        $this->addSql('DROP TABLE installments');
        $this->addSql('ALTER TABLE content ADD last_action_id INT DEFAULT NULL, ADD last_action_user_id INT DEFAULT NULL, ADD last_action_date DATETIME DEFAULT NULL, DROP approved, DROP draft');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A98AFD2F33 FOREIGN KEY (last_action_id) REFERENCES listing_last_action (id)');
        $this->addSql('ALTER TABLE content ADD CONSTRAINT FK_FEC530A913CB52F0 FOREIGN KEY (last_action_user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_FEC530A98AFD2F33 ON content (last_action_id)');
        $this->addSql('CREATE INDEX IDX_FEC530A913CB52F0 ON content (last_action_user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_installments (content_id INT NOT NULL, content_installments_id INT NOT NULL, INDEX content_installments_id (content_installments_id), INDEX IDX_FA180A3384A0A3ED (content_id), PRIMARY KEY(content_id, content_installments_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE installments (id INT AUTO_INCREMENT NOT NULL, percentage DOUBLE PRECISION NOT NULL, due_date DATETIME DEFAULT NULL, signing_days INT DEFAULT NULL, granted_days INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_A074FCE4E00A6016 FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_F0312AF8B196EE6E FOREIGN KEY (content_installments_id) REFERENCES installments (id)');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A98AFD2F33');
        $this->addSql('ALTER TABLE content DROP FOREIGN KEY FK_FEC530A913CB52F0');
        $this->addSql('DROP INDEX IDX_FEC530A98AFD2F33 ON content');
        $this->addSql('DROP INDEX IDX_FEC530A913CB52F0 ON content');
        $this->addSql('ALTER TABLE content ADD approved TINYINT(1) NOT NULL, ADD draft TINYINT(1) NOT NULL, DROP last_action_id, DROP last_action_user_id, DROP last_action_date');
    }
}
