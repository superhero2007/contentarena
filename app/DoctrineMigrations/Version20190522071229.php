<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190522071229 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE property_rights (property_id INT NOT NULL, property_right_id INT NOT NULL, INDEX IDX_7F17BE7F549213EC (property_id), INDEX IDX_7F17BE7FA105C71 (property_right_id), PRIMARY KEY(property_id, property_right_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_right (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, code VARCHAR(2) NOT NULL, territories_mode VARCHAR(255) DEFAULT NULL, exclusive TINYINT(1) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_territories (property_id INT NOT NULL, property_territory_id INT NOT NULL, INDEX IDX_5FBE6380549213EC (property_id), INDEX IDX_5FBE6380BCF2BA8D (property_territory_id), PRIMARY KEY(property_id, property_territory_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE property_rights ADD CONSTRAINT FK_7F17BE7F549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_rights ADD CONSTRAINT FK_7F17BE7FA105C71 FOREIGN KEY (property_right_id) REFERENCES property_right (id)');
        $this->addSql('ALTER TABLE property_territories ADD CONSTRAINT FK_5FBE6380549213EC FOREIGN KEY (property_id) REFERENCES property_right (id)');
        $this->addSql('ALTER TABLE property_territories ADD CONSTRAINT FK_5FBE6380BCF2BA8D FOREIGN KEY (property_territory_id) REFERENCES country (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE property_rights DROP FOREIGN KEY FK_7F17BE7FA105C71');
        $this->addSql('ALTER TABLE property_territories DROP FOREIGN KEY FK_5FBE6380549213EC');
        $this->addSql('DROP TABLE property_rights');
        $this->addSql('DROP TABLE property_right');
        $this->addSql('DROP TABLE property_territories');
    }
}
