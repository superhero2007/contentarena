<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180724052039 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE thread DROP FOREIGN KEY FK_31204C834C8759DA');
        $this->addSql('DROP INDEX IDX_31204C834C8759DA ON thread');
        $this->addSql('ALTER TABLE thread CHANGE owner_cmpany_id owner_company_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C83C5F18393 FOREIGN KEY (owner_company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_31204C83C5F18393 ON thread (owner_company_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE thread DROP FOREIGN KEY FK_31204C83C5F18393');
        $this->addSql('DROP INDEX IDX_31204C83C5F18393 ON thread');
        $this->addSql('ALTER TABLE thread CHANGE owner_company_id owner_cmpany_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE thread ADD CONSTRAINT FK_31204C834C8759DA FOREIGN KEY (owner_cmpany_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_31204C834C8759DA ON thread (owner_cmpany_id)');
    }
}
