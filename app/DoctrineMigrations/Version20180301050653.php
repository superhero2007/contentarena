<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180301050653 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights DROP FOREIGN KEY FK_160D103727ACA70');
        $this->addSql('DROP INDEX IDX_160D103727ACA70 ON rights');
        $this->addSql('ALTER TABLE rights DROP parent_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights ADD parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights ADD CONSTRAINT FK_160D103727ACA70 FOREIGN KEY (parent_id) REFERENCES rights (id)');
        $this->addSql('CREATE INDEX IDX_160D103727ACA70 ON rights (parent_id)');
    }
}
