<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180714082249 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content_selected_right DROP FOREIGN KEY FK_CD04B49BE00A60F0');
        $this->addSql('ALTER TABLE distribution_packages_rights DROP FOREIGN KEY FK_A074FCE4E00A60F0');
        $this->addSql('ALTER TABLE distribution_packages_rights_packages DROP FOREIGN KEY FK_7B50B1F3E00A60F0');
        $this->addSql('DROP TABLE distribution_package');
        $this->addSql('DROP TABLE distribution_packages_rights');
        $this->addSql('DROP TABLE distribution_packages_rights_packages');
        $this->addSql('DROP INDEX IDX_CD04B49BE00A60F0 ON content_selected_right');
        $this->addSql('ALTER TABLE content_selected_right DROP distribution_package_id');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D384A0A3ED');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE distribution_package (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci, UNIQUE INDEX UNIQ_3ED929275E237E06 (name), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE distribution_packages_rights (distribution_package_id INT NOT NULL, rights_id INT NOT NULL, INDEX IDX_A074FCE4E00A60F0 (distribution_package_id), INDEX IDX_A074FCE4B196EE6E (rights_id), PRIMARY KEY(distribution_package_id, rights_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE distribution_packages_rights_packages (distribution_package_id INT NOT NULL, rights_package_id INT NOT NULL, INDEX IDX_7B50B1F3E00A60F0 (distribution_package_id), INDEX IDX_7B50B1F32EFF58CB (rights_package_id), PRIMARY KEY(distribution_package_id, rights_package_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE distribution_packages_rights ADD CONSTRAINT FK_A074FCE4B196EE6E FOREIGN KEY (rights_id) REFERENCES rights (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE distribution_packages_rights ADD CONSTRAINT FK_A074FCE4E00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE distribution_packages_rights_packages ADD CONSTRAINT FK_7B50B1F32EFF58CB FOREIGN KEY (rights_package_id) REFERENCES rights_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE distribution_packages_rights_packages ADD CONSTRAINT FK_7B50B1F3E00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE content_selected_right ADD distribution_package_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE content_selected_right ADD CONSTRAINT FK_CD04B49BE00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id)');
        $this->addSql('CREATE INDEX IDX_CD04B49BE00A60F0 ON content_selected_right (distribution_package_id)');
        $this->addSql('ALTER TABLE watchlist DROP FOREIGN KEY FK_340388D384A0A3ED');
        $this->addSql('ALTER TABLE watchlist ADD CONSTRAINT FK_340388D384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
    }
}
