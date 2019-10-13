<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191010004523 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing_bundles (listing_id INT NOT NULL, bundle_listing_id INT NOT NULL, INDEX IDX_C79941D7D4619D1A (listing_id), INDEX IDX_C79941D7920A1EC (bundle_listing_id), PRIMARY KEY(listing_id, bundle_listing_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE territorial_bundle (id INT AUTO_INCREMENT NOT NULL, currency_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, minimum_bid BIGINT NOT NULL, sold TINYINT(1) NOT NULL, custom TINYINT(1) DEFAULT \'0\' NOT NULL, region_named TINYINT(1) NOT NULL, INDEX IDX_5048B15F38248176 (currency_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bundle_territories (bundle_id INT NOT NULL, bundle_territory_id INT NOT NULL, INDEX IDX_B4D8B5A3F1FAD9D3 (bundle_id), INDEX IDX_B4D8B5A31E7EAD29 (bundle_territory_id), PRIMARY KEY(bundle_id, bundle_territory_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing_bundles ADD CONSTRAINT FK_C79941D7D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE listing_bundles ADD CONSTRAINT FK_C79941D7920A1EC FOREIGN KEY (bundle_listing_id) REFERENCES territorial_bundle (id)');
        $this->addSql('ALTER TABLE territorial_bundle ADD CONSTRAINT FK_5048B15F38248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE bundle_territories ADD CONSTRAINT FK_B4D8B5A3F1FAD9D3 FOREIGN KEY (bundle_id) REFERENCES territorial_bundle (id)');
        $this->addSql('ALTER TABLE bundle_territories ADD CONSTRAINT FK_B4D8B5A31E7EAD29 FOREIGN KEY (bundle_territory_id) REFERENCES country (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE listing_bundles DROP FOREIGN KEY FK_C79941D7920A1EC');
        $this->addSql('ALTER TABLE bundle_territories DROP FOREIGN KEY FK_B4D8B5A3F1FAD9D3');
        $this->addSql('DROP TABLE listing_bundles');
        $this->addSql('DROP TABLE territorial_bundle');
        $this->addSql('DROP TABLE bundle_territories');
    }
}
