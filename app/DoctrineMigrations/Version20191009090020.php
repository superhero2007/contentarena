<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20191009090020 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE listing (id INT AUTO_INCREMENT NOT NULL, company_id INT DEFAULT NULL, property_id INT DEFAULT NULL, law INT DEFAULT NULL, last_action_id INT DEFAULT NULL, last_action_user_id INT DEFAULT NULL, owner_id INT DEFAULT NULL, custom_id VARCHAR(255) DEFAULT NULL, description LONGTEXT DEFAULT NULL, expires_at DATETIME DEFAULT NULL, step INT NOT NULL, maxStep SMALLINT NOT NULL, website LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', image VARCHAR(255) DEFAULT NULL, programs LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', attachments LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', annex LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:object)\', name VARCHAR(255) DEFAULT NULL, relevance SMALLINT DEFAULT 1 NOT NULL, jurisdiction VARCHAR(255) DEFAULT NULL, featured TINYINT(1) DEFAULT \'0\' NOT NULL, featured_position SMALLINT DEFAULT NULL, expiry_notified TINYINT(1) NOT NULL, expired_notified TINYINT(1) NOT NULL, created_at DATETIME DEFAULT NULL, published_at DATETIME DEFAULT NULL, last_action_date DATETIME DEFAULT NULL, main_event_date DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_CB0048D4614A603A (custom_id), INDEX IDX_CB0048D4979B1AD6 (company_id), INDEX IDX_CB0048D4549213EC (property_id), INDEX IDX_CB0048D4C0B552F (law), INDEX IDX_CB0048D48AFD2F33 (last_action_id), INDEX IDX_CB0048D413CB52F0 (last_action_user_id), INDEX IDX_CB0048D47E3C61F9 (owner_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE listing_sports (listing_id INT NOT NULL, listing_sport_id INT NOT NULL, INDEX IDX_9731D8CFD4619D1A (listing_id), INDEX IDX_9731D8CF4A04DE82 (listing_sport_id), PRIMARY KEY(listing_id, listing_sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE listing_sport_categories (listing_id INT NOT NULL, listing_sport_category_id INT NOT NULL, INDEX IDX_F316F624D4619D1A (listing_id), INDEX IDX_F316F6246DE575E9 (listing_sport_category_id), PRIMARY KEY(listing_id, listing_sport_category_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE listing_season (listing_id INT NOT NULL, season_listing_id INT NOT NULL, INDEX IDX_141C7A7AD4619D1A (listing_id), INDEX IDX_141C7A7AE45F50BD (season_listing_id), PRIMARY KEY(listing_id, season_listing_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D4979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D4549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D4C0B552F FOREIGN KEY (law) REFERENCES country (id)');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D48AFD2F33 FOREIGN KEY (last_action_id) REFERENCES listing_last_action (id)');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D413CB52F0 FOREIGN KEY (last_action_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE listing ADD CONSTRAINT FK_CB0048D47E3C61F9 FOREIGN KEY (owner_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE listing_sports ADD CONSTRAINT FK_9731D8CFD4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE listing_sports ADD CONSTRAINT FK_9731D8CF4A04DE82 FOREIGN KEY (listing_sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE listing_sport_categories ADD CONSTRAINT FK_F316F624D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE listing_sport_categories ADD CONSTRAINT FK_F316F6246DE575E9 FOREIGN KEY (listing_sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('ALTER TABLE listing_season ADD CONSTRAINT FK_141C7A7AD4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('ALTER TABLE listing_season ADD CONSTRAINT FK_141C7A7AE45F50BD FOREIGN KEY (season_listing_id) REFERENCES season (id)');
        $this->addSql('ALTER TABLE listing_rights DROP FOREIGN KEY FK_E598F0D0549213EC');
        $this->addSql('DROP INDEX IDX_E598F0D0549213EC ON listing_rights');
        $this->addSql('ALTER TABLE listing_rights DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE listing_rights CHANGE property_id listing_id INT NOT NULL');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
        $this->addSql('CREATE INDEX IDX_E598F0D0D4619D1A ON listing_rights (listing_id)');
        $this->addSql('ALTER TABLE listing_rights ADD PRIMARY KEY (listing_id, listing_right_id)');
        $this->addSql('ALTER TABLE listing_tournaments DROP FOREIGN KEY FK_B3A22391D4619D1A');
        $this->addSql('ALTER TABLE listing_tournaments ADD CONSTRAINT FK_B3A22391D4619D1A FOREIGN KEY (listing_id) REFERENCES listing (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE listing_rights DROP FOREIGN KEY FK_E598F0D0D4619D1A');
        $this->addSql('ALTER TABLE listing_tournaments DROP FOREIGN KEY FK_B3A22391D4619D1A');
        $this->addSql('ALTER TABLE listing_sports DROP FOREIGN KEY FK_9731D8CFD4619D1A');
        $this->addSql('ALTER TABLE listing_sport_categories DROP FOREIGN KEY FK_F316F624D4619D1A');
        $this->addSql('ALTER TABLE listing_season DROP FOREIGN KEY FK_141C7A7AD4619D1A');
        $this->addSql('DROP TABLE listing');
        $this->addSql('DROP TABLE listing_sports');
        $this->addSql('DROP TABLE listing_sport_categories');
        $this->addSql('DROP TABLE listing_season');
        $this->addSql('DROP INDEX IDX_E598F0D0D4619D1A ON listing_rights');
        $this->addSql('ALTER TABLE listing_rights DROP PRIMARY KEY');
        $this->addSql('ALTER TABLE listing_rights CHANGE listing_id property_id INT NOT NULL');
        $this->addSql('ALTER TABLE listing_rights ADD CONSTRAINT FK_E598F0D0549213EC FOREIGN KEY (property_id) REFERENCES content (id)');
        $this->addSql('CREATE INDEX IDX_E598F0D0549213EC ON listing_rights (property_id)');
        $this->addSql('ALTER TABLE listing_rights ADD PRIMARY KEY (property_id, listing_right_id)');
        $this->addSql('ALTER TABLE listing_tournaments DROP FOREIGN KEY FK_B3A22391D4619D1A');
        $this->addSql('ALTER TABLE listing_tournaments ADD CONSTRAINT FK_B3A22391D4619D1A FOREIGN KEY (listing_id) REFERENCES content (id)');
    }
}
