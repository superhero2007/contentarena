<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180313031240 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE distribution_packages_rights_packages (distribution_package_id INT NOT NULL, rights_package_id INT NOT NULL, INDEX IDX_7B50B1F3E00A60F0 (distribution_package_id), INDEX IDX_7B50B1F32EFF58CB (rights_package_id), PRIMARY KEY(distribution_package_id, rights_package_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE distribution_packages_rights_packages ADD CONSTRAINT FK_7B50B1F3E00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE distribution_packages_rights_packages ADD CONSTRAINT FK_7B50B1F32EFF58CB FOREIGN KEY (rights_package_id) REFERENCES rights_package (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE distribution_packages_rights_packages');
    }
}
