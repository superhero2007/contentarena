<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180610124439 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE rights_package_rights_package');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE rights_package_rights_package (rights_package_source INT NOT NULL, rights_package_target INT NOT NULL, INDEX IDX_121F1E43546861 (rights_package_source), INDEX IDX_121F1E4319B138EE (rights_package_target), PRIMARY KEY(rights_package_source, rights_package_target)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE rights_package_rights_package ADD CONSTRAINT FK_121F1E4319B138EE FOREIGN KEY (rights_package_target) REFERENCES rights_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE rights_package_rights_package ADD CONSTRAINT FK_121F1E43546861 FOREIGN KEY (rights_package_source) REFERENCES rights_package (id) ON DELETE CASCADE');
    }
}
