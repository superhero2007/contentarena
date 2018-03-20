<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180320045134 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sales_package (id INT AUTO_INCREMENT NOT NULL, content_id INT DEFAULT NULL, currency_id INT DEFAULT NULL, sales_method_id INT DEFAULT NULL, name VARCHAR(255) DEFAULT NULL, amount BIGINT NOT NULL, sellAsPackage TINYINT(1) NOT NULL, worldwide TINYINT(1) NOT NULL, INDEX IDX_D0911BF584A0A3ED (content_id), INDEX IDX_D0911BF538248176 (currency_id), INDEX IDX_D0911BF525C6612E (sales_method_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sales_package_selected_countries (country_id INT NOT NULL, sales_package_selected_countries_id INT NOT NULL, INDEX IDX_1421D864F92F3E70 (country_id), INDEX IDX_1421D8642C17F991 (sales_package_selected_countries_id), PRIMARY KEY(country_id, sales_package_selected_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE sales_package_excluded_countries (country_id INT NOT NULL, sales_package_excluded_countries_id INT NOT NULL, INDEX IDX_E3FEA3C3F92F3E70 (country_id), INDEX IDX_E3FEA3C32A87DDFB (sales_package_excluded_countries_id), PRIMARY KEY(country_id, sales_package_excluded_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sales_package ADD CONSTRAINT FK_D0911BF584A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE sales_package ADD CONSTRAINT FK_D0911BF538248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE sales_package ADD CONSTRAINT FK_D0911BF525C6612E FOREIGN KEY (sales_method_id) REFERENCES bid_type (id)');
        $this->addSql('ALTER TABLE sales_package_selected_countries ADD CONSTRAINT FK_1421D864F92F3E70 FOREIGN KEY (country_id) REFERENCES sales_package (id)');
        $this->addSql('ALTER TABLE sales_package_selected_countries ADD CONSTRAINT FK_1421D8642C17F991 FOREIGN KEY (sales_package_selected_countries_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE sales_package_excluded_countries ADD CONSTRAINT FK_E3FEA3C3F92F3E70 FOREIGN KEY (country_id) REFERENCES sales_package (id)');
        $this->addSql('ALTER TABLE sales_package_excluded_countries ADD CONSTRAINT FK_E3FEA3C32A87DDFB FOREIGN KEY (sales_package_excluded_countries_id) REFERENCES country (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sales_package_selected_countries DROP FOREIGN KEY FK_1421D864F92F3E70');
        $this->addSql('ALTER TABLE sales_package_excluded_countries DROP FOREIGN KEY FK_E3FEA3C3F92F3E70');
        $this->addSql('DROP TABLE sales_package');
        $this->addSql('DROP TABLE sales_package_selected_countries');
        $this->addSql('DROP TABLE sales_package_excluded_countries');
    }
}
