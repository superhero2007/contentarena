<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181212022003 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user_preferred_buyer_sports (user_id INT NOT NULL, user_preferred_buyer_sport_id INT NOT NULL, INDEX IDX_45BF91B2A76ED395 (user_id), INDEX IDX_45BF91B2DF95F283 (user_preferred_buyer_sport_id), PRIMARY KEY(user_id, user_preferred_buyer_sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_preferred_seller_sports (user_id INT NOT NULL, user_preferred_seller_sport_id INT NOT NULL, INDEX IDX_574D6FC7A76ED395 (user_id), INDEX IDX_574D6FC7D7D8B2D9 (user_preferred_seller_sport_id), PRIMARY KEY(user_id, user_preferred_seller_sport_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user_preferred_buyer_countries (user_id INT NOT NULL, user_preferred_buyer_country_id INT NOT NULL, INDEX IDX_9AC2AE57A76ED395 (user_id), INDEX IDX_9AC2AE57A4808137 (user_preferred_buyer_country_id), PRIMARY KEY(user_id, user_preferred_buyer_country_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE user_preferred_buyer_sports ADD CONSTRAINT FK_45BF91B2A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE user_preferred_buyer_sports ADD CONSTRAINT FK_45BF91B2DF95F283 FOREIGN KEY (user_preferred_buyer_sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE user_preferred_seller_sports ADD CONSTRAINT FK_574D6FC7A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE user_preferred_seller_sports ADD CONSTRAINT FK_574D6FC7D7D8B2D9 FOREIGN KEY (user_preferred_seller_sport_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE user_preferred_buyer_countries ADD CONSTRAINT FK_9AC2AE57A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE user_preferred_buyer_countries ADD CONSTRAINT FK_9AC2AE57A4808137 FOREIGN KEY (user_preferred_buyer_country_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE user ADD preferred_profile VARCHAR(255) DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user_preferred_buyer_sports');
        $this->addSql('DROP TABLE user_preferred_seller_sports');
        $this->addSql('DROP TABLE user_preferred_buyer_countries');
        $this->addSql('ALTER TABLE `user` DROP preferred_profile');
    }
}
