<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180831080348 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE license_agreement DROP FOREIGN KEY FK_9624AFBA4D9866B8');
        $this->addSql('ALTER TABLE license_agreement DROP FOREIGN KEY FK_9624AFBA84A0A3ED');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA4D9866B8 FOREIGN KEY (bid_id) REFERENCES bid (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id) ON DELETE CASCADE');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE license_agreement DROP FOREIGN KEY FK_9624AFBA84A0A3ED');
        $this->addSql('ALTER TABLE license_agreement DROP FOREIGN KEY FK_9624AFBA4D9866B8');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA84A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE license_agreement ADD CONSTRAINT FK_9624AFBA4D9866B8 FOREIGN KEY (bid_id) REFERENCES bid (id)');
    }
}
