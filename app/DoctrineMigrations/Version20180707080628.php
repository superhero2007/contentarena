<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180707080628 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE bid_countries');
        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F338248176');
        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F3979B1AD6');
        $this->addSql('DROP INDEX IDX_4AF2B3F338248176 ON bid');
        $this->addSql('DROP INDEX IDX_4AF2B3F3979B1AD6 ON bid');
        $this->addSql('ALTER TABLE bid ADD sales_package_id INT DEFAULT NULL, ADD total_fee NUMERIC(10, 0) NOT NULL, ADD signature VARCHAR(255) NOT NULL, DROP currency_id, DROP company_id, CHANGE amount amount NUMERIC(10, 0) NOT NULL, CHANGE updated_at updated_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F3FB701C93 FOREIGN KEY (sales_package_id) REFERENCES sales_package (id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F3FB701C93 ON bid (sales_package_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE bid_countries (country_id INT NOT NULL, bid_countries_id INT NOT NULL, INDEX IDX_C75DB872F92F3E70 (country_id), INDEX IDX_C75DB8728F27030 (bid_countries_id), PRIMARY KEY(country_id, bid_countries_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE bid_countries ADD CONSTRAINT FK_C75DB8728F27030 FOREIGN KEY (bid_countries_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE bid_countries ADD CONSTRAINT FK_C75DB872F92F3E70 FOREIGN KEY (country_id) REFERENCES bid (id)');
        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F3FB701C93');
        $this->addSql('DROP INDEX IDX_4AF2B3F3FB701C93 ON bid');
        $this->addSql('ALTER TABLE bid ADD company_id INT DEFAULT NULL, DROP total_fee, DROP signature, CHANGE amount amount BIGINT NOT NULL, CHANGE updated_at updated_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL, CHANGE sales_package_id currency_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F338248176 FOREIGN KEY (currency_id) REFERENCES currency (id)');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F3979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F338248176 ON bid (currency_id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F3979B1AD6 ON bid (company_id)');
    }
}
