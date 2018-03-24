<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180323235929 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_filter_sports (content_filter_id INT NOT NULL, content_filter_sports_id INT NOT NULL, INDEX IDX_5388173E372FA5D (content_filter_id), INDEX IDX_53881733A6C02A8 (content_filter_sports_id), PRIMARY KEY(content_filter_id, content_filter_sports_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content_filter_countries (country_id INT NOT NULL, content_filter_countries_id INT NOT NULL, INDEX IDX_33B156B2F92F3E70 (country_id), INDEX IDX_33B156B2F01C96B5 (content_filter_countries_id), PRIMARY KEY(country_id, content_filter_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_filter_sports ADD CONSTRAINT FK_5388173E372FA5D FOREIGN KEY (content_filter_id) REFERENCES content_filter (id)');
        $this->addSql('ALTER TABLE content_filter_sports ADD CONSTRAINT FK_53881733A6C02A8 FOREIGN KEY (content_filter_sports_id) REFERENCES sport (id)');
        $this->addSql('ALTER TABLE content_filter_countries ADD CONSTRAINT FK_33B156B2F92F3E70 FOREIGN KEY (country_id) REFERENCES content_filter (id)');
        $this->addSql('ALTER TABLE content_filter_countries ADD CONSTRAINT FK_33B156B2F01C96B5 FOREIGN KEY (content_filter_countries_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE content_filter ADD user_id INT DEFAULT NULL, DROP userId, DROP filterContent');
        $this->addSql('ALTER TABLE content_filter ADD CONSTRAINT FK_17F22FB1A76ED395 FOREIGN KEY (user_id) REFERENCES `user` (id)');
        $this->addSql('CREATE INDEX IDX_17F22FB1A76ED395 ON content_filter (user_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_filter_sports');
        $this->addSql('DROP TABLE content_filter_countries');
        $this->addSql('ALTER TABLE content_filter DROP FOREIGN KEY FK_17F22FB1A76ED395');
        $this->addSql('DROP INDEX IDX_17F22FB1A76ED395 ON content_filter');
        $this->addSql('ALTER TABLE content_filter ADD userId INT NOT NULL, ADD filterContent LONGTEXT NOT NULL COLLATE utf8_unicode_ci, DROP user_id');
    }
}
