<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190809024646 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE edited_program (id INT AUTO_INCREMENT NOT NULL, territories_mode VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, release_year INT DEFAULT NULL, episodes INT DEFAULT NULL, episode_duration INT DEFAULT NULL, similar_episodes_length TINYINT(1) NOT NULL, exclusive TINYINT(1) NOT NULL, languages LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', subtitles LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', scripts LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE edited_program_territories (edited_program_id INT NOT NULL, edited_program_territory_id INT NOT NULL, INDEX IDX_7317DFE36AA79D49 (edited_program_id), INDEX IDX_7317DFE3686523D3 (edited_program_territory_id), PRIMARY KEY(edited_program_id, edited_program_territory_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_edited_programs (property_id INT NOT NULL, property_edited_program_id INT NOT NULL, INDEX IDX_5A8538B9549213EC (property_id), INDEX IDX_5A8538B9936B2F3E (property_edited_program_id), PRIMARY KEY(property_id, property_edited_program_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE edited_program_territories ADD CONSTRAINT FK_7317DFE36AA79D49 FOREIGN KEY (edited_program_id) REFERENCES edited_program (id)');
        $this->addSql('ALTER TABLE edited_program_territories ADD CONSTRAINT FK_7317DFE3686523D3 FOREIGN KEY (edited_program_territory_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE property_edited_programs ADD CONSTRAINT FK_5A8538B9549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_edited_programs ADD CONSTRAINT FK_5A8538B9936B2F3E FOREIGN KEY (property_edited_program_id) REFERENCES edited_program (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE edited_program_territories DROP FOREIGN KEY FK_7317DFE36AA79D49');
        $this->addSql('ALTER TABLE property_edited_programs DROP FOREIGN KEY FK_5A8538B9936B2F3E');
        $this->addSql('DROP TABLE edited_program');
        $this->addSql('DROP TABLE edited_program_territories');
        $this->addSql('DROP TABLE property_edited_programs');
    }
}
