<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180610051436 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sales_package_territories (country_id INT NOT NULL, sales_package_sales_package_territory_id INT NOT NULL, INDEX IDX_D5F1692DF92F3E70 (country_id), INDEX IDX_D5F1692DD5584D97 (sales_package_sales_package_territory_id), PRIMARY KEY(country_id, sales_package_sales_package_territory_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sales_package_territories ADD CONSTRAINT FK_D5F1692DF92F3E70 FOREIGN KEY (country_id) REFERENCES sales_package (id)');
        $this->addSql('ALTER TABLE sales_package_territories ADD CONSTRAINT FK_D5F1692DD5584D97 FOREIGN KEY (sales_package_sales_package_territory_id) REFERENCES country (id)');
        $this->addSql('DROP TABLE sales_package_selected_countries');
        $this->addSql('ALTER TABLE sales_package ADD territories_method VARCHAR(255) DEFAULT NULL, ADD bundle_method VARCHAR(255) DEFAULT NULL, DROP sellAsPackage, DROP worldwide, CHANGE amount fee BIGINT NOT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE sales_package_selected_countries (country_id INT NOT NULL, sales_package_selected_countries_id INT NOT NULL, INDEX IDX_1421D864F92F3E70 (country_id), INDEX IDX_1421D8642C17F991 (sales_package_selected_countries_id), PRIMARY KEY(country_id, sales_package_selected_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE sales_package_selected_countries ADD CONSTRAINT FK_1421D8642C17F991 FOREIGN KEY (sales_package_selected_countries_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE sales_package_selected_countries ADD CONSTRAINT FK_1421D864F92F3E70 FOREIGN KEY (country_id) REFERENCES sales_package (id)');
        $this->addSql('DROP TABLE sales_package_territories');
        $this->addSql('ALTER TABLE sales_package ADD sellAsPackage TINYINT(1) NOT NULL, ADD worldwide TINYINT(1) NOT NULL, DROP territories_method, DROP bundle_method, CHANGE fee amount BIGINT NOT NULL');
    }
}
