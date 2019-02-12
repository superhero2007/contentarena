<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180918055657 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6494BAB96C');
        $this->addSql('DROP TABLE profile');
        $this->addSql('DROP INDEX IDX_8D93D649CCFA12B8 ON user');
        $this->addSql('ALTER TABLE user ADD profile VARCHAR(255) DEFAULT NULL, DROP profile_id');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D384A0A3ED');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE profile (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, UNIQUE INDEX UNIQ_8157AA0F5E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE `user` ADD profile_id INT DEFAULT NULL, DROP profile');
        $this->addSql('ALTER TABLE `user` ADD CONSTRAINT FK_8D93D6494BAB96C FOREIGN KEY (profile_id) REFERENCES profile (id)');
        $this->addSql('CREATE INDEX IDX_8D93D649CCFA12B8 ON `user` (profile_id)');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D384A0A3ED');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE');
    }
}
