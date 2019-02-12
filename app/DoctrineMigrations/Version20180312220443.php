<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180312220443 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE distribution_package (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_3ED929275E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE distribution_packages_rights (distribution_package_id INT NOT NULL, rights_id INT NOT NULL, INDEX IDX_A074FCE4E00A60F0 (distribution_package_id), INDEX IDX_A074FCE4B196EE6E (rights_id), PRIMARY KEY(distribution_package_id, rights_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE distribution_packages_rights ADD CONSTRAINT FK_A074FCE4E00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE distribution_packages_rights ADD CONSTRAINT FK_A074FCE4B196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE distribution_packages_rights DROP FOREIGN KEY FK_A074FCE4E00A60F0');
        $this->addSql('DROP TABLE distribution_package');
        $this->addSql('DROP TABLE distribution_packages_rights');
    }
}
