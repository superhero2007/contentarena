<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180113005800 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights ADD definition LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights_package ADD rights_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE rights_package ADD CONSTRAINT FK_1C8FAF10B196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id)');
        $this->addSql('CREATE INDEX IDX_1C8FAF10B196EE6E ON rights_package (rights_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights DROP definition');
        $this->addSql('ALTER TABLE rights_package DROP FOREIGN KEY FK_1C8FAF10B196EE6E');
        $this->addSql('DROP INDEX IDX_1C8FAF10B196EE6E ON rights_package');
        $this->addSql('ALTER TABLE rights_package DROP rights_id');
    }
}
