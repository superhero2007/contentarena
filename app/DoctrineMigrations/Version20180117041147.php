<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180117041147 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_package ADD parent_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights_package ADD CONSTRAINT FK_1C8FAF10727ACA70 FOREIGN KEY (parent_id) REFERENCES rights_package (id)');
        $this->addSql('CREATE INDEX IDX_1C8FAF10727ACA70 ON rights_package (parent_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_package DROP FOREIGN KEY FK_1C8FAF10727ACA70');
        $this->addSql('DROP INDEX IDX_1C8FAF10727ACA70 ON rights_package');
        $this->addSql('ALTER TABLE rights_package DROP parent_id');
    }
}
