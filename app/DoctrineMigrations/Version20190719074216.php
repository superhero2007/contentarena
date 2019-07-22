<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190719074216 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE property_definitions (id INT AUTO_INCREMENT NOT NULL, property_id INT DEFAULT NULL, position INT NOT NULL, name VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL, editable TINYINT(1) DEFAULT \'1\' NOT NULL, edited TINYINT(1) NOT NULL, custom TINYINT(1) DEFAULT \'0\' NOT NULL, INDEX IDX_2C0B65F4549213EC (property_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_license_term_item (id INT AUTO_INCREMENT NOT NULL, term_id INT DEFAULT NULL, property_id INT DEFAULT NULL, position INT NOT NULL, content LONGTEXT NOT NULL, editable TINYINT(1) DEFAULT \'1\' NOT NULL, edited TINYINT(1) NOT NULL, INDEX IDX_D94110DFE2C35FC (term_id), INDEX IDX_D94110DF549213EC (property_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE property_definitions ADD CONSTRAINT FK_2C0B65F4549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_license_term_item ADD CONSTRAINT FK_D94110DFE2C35FC FOREIGN KEY (term_id) REFERENCES source_license_term (id)');
        $this->addSql('ALTER TABLE property_license_term_item ADD CONSTRAINT FK_D94110DF549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE property_definitions');
        $this->addSql('DROP TABLE property_license_term_item');
    }
}
