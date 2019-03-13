<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190519061952 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE property (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, sport_category_id INT DEFAULT NULL, tournament_id INT DEFAULT NULL, custom_id VARCHAR(255) DEFAULT NULL, image VARCHAR(255) DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_8BF21CDE614A603A (custom_id), INDEX IDX_8BF21CDE979B1AD6 (company_id), INDEX IDX_8BF21CDE7173D9A4 (sport_category_id), INDEX IDX_8BF21CDE33D1A3E7 (tournament_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_sports (property_id INT NOT NULL, property_sport_id INT NOT NULL, INDEX IDX_DBE9660549213EC (property_id), INDEX IDX_DBE9660F2FF88BC (property_sport_id), PRIMARY KEY(property_id, property_sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_season (property_id INT NOT NULL, season_property_id INT NOT NULL, INDEX IDX_8E9334D5549213EC (property_id), INDEX IDX_8E9334D51C101B6A (season_property_id), PRIMARY KEY(property_id, season_property_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE property ADD CONSTRAINT FK_8BF21CDE979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE property ADD CONSTRAINT FK_8BF21CDE7173D9A4 FOREIGN KEY (sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('ALTER TABLE property ADD CONSTRAINT FK_8BF21CDE33D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE property_sports ADD CONSTRAINT FK_DBE9660549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_sports ADD CONSTRAINT FK_DBE9660F2FF88BC FOREIGN KEY (property_sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE property_season ADD CONSTRAINT FK_8E9334D5549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_season ADD CONSTRAINT FK_8E9334D51C101B6A FOREIGN KEY (season_property_id) REFERENCES season (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE property_sports DROP FOREIGN KEY FK_DBE9660549213EC');
        $this->addSql('ALTER TABLE property_season DROP FOREIGN KEY FK_8E9334D5549213EC');
        $this->addSql('DROP TABLE property');
        $this->addSql('DROP TABLE property_sports');
        $this->addSql('DROP TABLE property_season');
    }
}
