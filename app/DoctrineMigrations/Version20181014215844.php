<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181014215844 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3A76ED395');
        $this->addSql('DROP INDEX IDX_340388D3A76ED395 ON watchlist');
        $this->addSql('ALTER TABLE watchlist CHANGE user_id company_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_340388D3979B1AD6 ON watchlist (company_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D3979B1AD6');
        $this->addSql('DROP INDEX IDX_340388D3979B1AD6 ON watchlist');
        $this->addSql('ALTER TABLE watchlist CHANGE company_id user_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D3A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_340388D3A76ED395 ON watchlist (user_id)');
    }
}
