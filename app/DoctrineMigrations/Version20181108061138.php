<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181108061138 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE company_snapshot (id INT AUTO_INCREMENT NOT NULL, country_id INT DEFAULT NULL, legal_name VARCHAR(255) NOT NULL, vat VARCHAR(255) DEFAULT NULL, registration_number VARCHAR(255) DEFAULT NULL, city VARCHAR(255) DEFAULT NULL, website VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, address2 VARCHAR(255) DEFAULT NULL, zip VARCHAR(255) DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, year INT DEFAULT NULL, size INT DEFAULT NULL, UNIQUE INDEX UNIQ_34DA0058735890B1 (legal_name), INDEX IDX_34DA0058F92F3E70 (country_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE company_snapshot ADD CONSTRAINT FK_34DA0058F92F3E70 FOREIGN KEY (country_id) REFERENCES country (id)');
        $this->addSql('ALTER TABLE bid ADD buyer_company_snapshot_id INT DEFAULT NULL, ADD seller_company_snapshot_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F3746F49AC FOREIGN KEY (buyer_company_snapshot_id) REFERENCES company_snapshot (id)');
        $this->addSql('ALTER TABLE bid ADD CONSTRAINT FK_4AF2B3F359088F04 FOREIGN KEY (seller_company_snapshot_id) REFERENCES company_snapshot (id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F3746F49AC ON bid (buyer_company_snapshot_id)');
        $this->addSql('CREATE INDEX IDX_4AF2B3F359088F04 ON bid (seller_company_snapshot_id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F3746F49AC');
        $this->addSql('ALTER TABLE bid DROP FOREIGN KEY FK_4AF2B3F359088F04');
        $this->addSql('DROP TABLE company_snapshot');
        $this->addSql('DROP INDEX IDX_4AF2B3F3746F49AC ON bid');
        $this->addSql('DROP INDEX IDX_4AF2B3F359088F04 ON bid');
        $this->addSql('ALTER TABLE bid DROP buyer_company_snapshot_id, DROP seller_company_snapshot_id');
    }
}
