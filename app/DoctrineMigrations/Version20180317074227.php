<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180317074227 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE bid (id INT AUTO_INCREMENT NOT NULL, content_id INT DEFAULT NULL, currency_id INT DEFAULT NULL, company_id INT DEFAULT NULL, buyer_user_id INT DEFAULT NULL, amount BIGINT NOT NULL, INDEX IDX_4AF2B3F384A0A3ED (content_id), INDEX IDX_4AF2B3F338248176 (currency_id), INDEX IDX_4AF2B3F3979B1AD6 (company_id), INDEX IDX_4AF2B3F37C27AE3 (buyer_user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bid_countries (country_id INT NOT NULL, bid_countries_id INT NOT NULL, INDEX IDX_C75DB872F92F3E70 (country_id), INDEX IDX_C75DB8728F27030 (bid_countries_id), PRIMARY KEY(country_id, bid_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE bid_type (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE currency (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, code VARCHAR(3) NOT NULL, UNIQUE INDEX UNIQ_6956883F77153098 (code), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F338248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F37C27AE3 FOREIGN KEY (buyer_user_id) REFERENCES `user` (id)');
        $this->addSql('ALTER TABLE bid_countries ADD CONSTRAINT FK_C75DB872F92F3E70 FOREIGN KEY (country_id) REFERENCES bid (id)');
        $this->addSql('ALTER TABLE bid_countries ADD CONSTRAINT FK_C75DB8728F27030 FOREIGN KEY (bid_countries_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE content DROP links');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bid_countries DROP FOREIGN KEY FK_C75DB872F92F3E70');
        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F338248176');
        $this->addSql('DROP TABLE bid');
        $this->addSql('DROP TABLE bid_countries');
        $this->addSql('DROP TABLE bid_type');
        $this->addSql('DROP TABLE currency');
        $this->addSql('ALTER TABLE content ADD links TINYTEXT DEFAULT NULL COLLATE utf8_unicode_ci COMMENT \'(DC2Type:array)\'');
    }
}
