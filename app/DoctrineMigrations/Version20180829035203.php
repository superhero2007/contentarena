<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180829035203 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE license_agreement (id INT AUTO_INCREMENT NOT NULL, content_id INT DEFAULT NULL, sales_package_id INT DEFAULT NULL, bid_id INT DEFAULT NULL, company_id INT DEFAULT NULL, file VARCHAR(255) NOT NULL, INDEX IDX_9624AFBA84A0A3ED (content_id), INDEX IDX_9624AFBAFB701C93 (sales_package_id), INDEX IDX_9624AFBA4D9866B8 (bid_id), INDEX IDX_9624AFBA979B1AD6 (company_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBAFB701C93 FOREIGN KEY (sales_package_id) REFERENCES sales_package (id)');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA4D9866B8 FOREIGN KEY (bid_id) REFERENCES bid (id)');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA979B1AD6 FOREIGN KEY (company_id) REFERENCES company (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE license_agreement');
    }
}
