<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20190520082959 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE property_sport_categories (property_id INT NOT NULL, property_sport_category_id INT NOT NULL, INDEX IDX_7CB6C1E9549213EC (property_id), INDEX IDX_7CB6C1E988BF6BD3 (property_sport_category_id), PRIMARY KEY(property_id, property_sport_category_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE property_tournaments (property_id INT NOT NULL, property_tournament_id INT NOT NULL, INDEX IDX_5BD93AF5549213EC (property_id), INDEX IDX_5BD93AF521A94F47 (property_tournament_id), PRIMARY KEY(property_id, property_tournament_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE property_sport_categories ADD CONSTRAINT FK_7CB6C1E9549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_sport_categories ADD CONSTRAINT FK_7CB6C1E988BF6BD3 FOREIGN KEY (property_sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('ALTER TABLE property_tournaments ADD CONSTRAINT FK_5BD93AF5549213EC FOREIGN KEY (property_id) REFERENCES property (id)');
        $this->addSql('ALTER TABLE property_tournaments ADD CONSTRAINT FK_5BD93AF521A94F47 FOREIGN KEY (property_tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE property DROP FOREIGN KEY FK_8BF21CDE33D1A3E7');
        $this->addSql('ALTER TABLE property DROP FOREIGN KEY FK_8BF21CDE7173D9A4');
        $this->addSql('DROP INDEX IDX_8BF21CDE7173D9A4 ON property');
        $this->addSql('DROP INDEX IDX_8BF21CDE33D1A3E7 ON property');
        $this->addSql('ALTER TABLE property DROP tournament_id, DROP sport_category_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE property_sport_categories');
        $this->addSql('DROP TABLE property_tournaments');
        $this->addSql('ALTER TABLE property ADD tournament_id INT DEFAULT NULL, ADD sport_category_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE property ADD CONSTRAINT FK_8BF21CDE33D1A3E7 FOREIGN KEY (tournament_id) REFERENCES tournament (id)');
        $this->addSql('ALTER TABLE property ADD CONSTRAINT FK_8BF21CDE7173D9A4 FOREIGN KEY (sport_category_id) REFERENCES sport_category (id)');
        $this->addSql('CREATE INDEX IDX_8BF21CDE7173D9A4 ON property (sport_category_id)');
        $this->addSql('CREATE INDEX IDX_8BF21CDE33D1A3E7 ON property (tournament_id)');
    }
}
