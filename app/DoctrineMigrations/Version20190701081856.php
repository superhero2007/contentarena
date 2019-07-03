<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190701081856 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist ADD added_by_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D355B127A4 FOREIGN KEY (added_by_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_340388D355B127A4 ON watchlist (added_by_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D355B127A4');
        $this->addSql('DROP INDEX IDX_340388D355B127A4 ON watchlist');
        $this->addSql('ALTER TABLE watchlist DROP added_by_id');
    }
}
