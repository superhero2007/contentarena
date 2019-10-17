<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191017023349 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE deal (id INT AUTO_INCREMENT NOT NULL, property_id INT DEFAULT NULL, listing_id INT DEFAULT NULL, company_id INT DEFAULT NULL, closed_by_id INT DEFAULT NULL, custom_id VARCHAR(255) DEFAULT NULL, buyer_company_name VARCHAR(255) DEFAULT NULL, custom TINYINT(1) NOT NULL, created_at DATETIME DEFAULT NULL, attachments LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', status VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_E3FEC116614A603A (custom_id), INDEX IDX_E3FEC116549213EC (property_id), INDEX IDX_E3FEC116D4619D1A (listing_id), INDEX IDX_E3FEC116979B1AD6 (company_id), INDEX IDX_E3FEC116E1FA7797 (closed_by_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deal_rights (deal_id INT NOT NULL, deal_right_id INT NOT NULL, INDEX IDX_1527528FF60E2305 (deal_id), INDEX IDX_1527528FB71079AF (deal_right_id), PRIMARY KEY(deal_id, deal_right_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deal_season (deal_id INT NOT NULL, season_deal_id INT NOT NULL, INDEX IDX_E4A3D825F60E2305 (deal_id), INDEX IDX_E4A3D825D3778A5B (season_deal_id), PRIMARY KEY(deal_id, season_deal_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deal_bundles (deal_id INT NOT NULL, bundle_deal_id INT NOT NULL, INDEX IDX_3CBDB210F60E2305 (deal_id), INDEX IDX_3CBDB210F69A7C (bundle_deal_id), PRIMARY KEY(deal_id, bundle_deal_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE deal_right (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) DEFAULT NULL, code VARCHAR(2) NOT NULL, territories_mode VARCHAR(255) DEFAULT NULL, exclusive TINYINT(1) NOT NULL, details LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE deal ADD CONSTRAINT FK_E3FEC116549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE deal ADD CONSTRAINT FK_E3FEC116D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE deal ADD CONSTRAINT FK_E3FEC116979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE deal ADD CONSTRAINT FK_E3FEC116E1FA7797 FOREIGN KEY (closed_by_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE deal_rights ADD CONSTRAINT FK_1527528FF60E2305 FOREIGN KEY (deal_id) REFERENCES deal (id)');
        $this->addSql('ALTER TABLE deal_rights ADD CONSTRAINT FK_1527528FB71079AF FOREIGN KEY (deal_right_id) REFERENCES deal_right (id)');
        $this->addSql('ALTER TABLE deal_season ADD CONSTRAINT FK_E4A3D825F60E2305 FOREIGN KEY (deal_id) REFERENCES deal (id)');
        $this->addSql('ALTER TABLE deal_season ADD CONSTRAINT FK_E4A3D825D3778A5B FOREIGN KEY (season_deal_id) REFERENCES season (id)');
        $this->addSql('ALTER TABLE deal_bundles ADD CONSTRAINT FK_3CBDB210F60E2305 FOREIGN KEY (deal_id) REFERENCES deal (id)');
        $this->addSql('ALTER TABLE deal_bundles ADD CONSTRAINT FK_3CBDB210F69A7C FOREIGN KEY (bundle_deal_id) REFERENCES territorial_bundle (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE deal_rights DROP FOREIGN KEY FK_1527528FF60E2305');
        $this->addSql('ALTER TABLE deal_season DROP FOREIGN KEY FK_E4A3D825F60E2305');
        $this->addSql('ALTER TABLE deal_bundles DROP FOREIGN KEY FK_3CBDB210F60E2305');
        $this->addSql('ALTER TABLE deal_rights DROP FOREIGN KEY FK_1527528FB71079AF');
        $this->addSql('DROP TABLE deal');
        $this->addSql('DROP TABLE deal_rights');
        $this->addSql('DROP TABLE deal_season');
        $this->addSql('DROP TABLE deal_bundles');
        $this->addSql('DROP TABLE deal_right');
    }
}
