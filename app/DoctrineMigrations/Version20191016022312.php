<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191016022312 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE listing DROP FOREIGN KEY FK_CB0048D48AFD2F33');
        $this->addSql('DROP INDEX IDX_CB0048D48AFD2F33 ON listing');
        $this->addSql('ALTER TABLE listing ADD last_action VARCHAR(255) NOT NULL, DROP last_action_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE listing ADD last_action_id INT DEFAULT NULL, DROP last_action');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D48AFD2F33 FOREIGN KEY (last_action_id) REFERENCES listing_last_action (id)');
        $this->addSql('CREATE INDEX IDX_CB0048D48AFD2F33 ON listing (last_action_id)');
    }
}
