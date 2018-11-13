<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20181113073709 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bid ADD signature_name LONGTEXT DEFAULT NULL, ADD signature_position LONGTEXT DEFAULT NULL, ADD seller_signature_name LONGTEXT DEFAULT NULL, ADD seller_signature_position LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE content ADD signature_name LONGTEXT DEFAULT NULL, ADD signature_position LONGTEXT DEFAULT NULL');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE bid DROP signature_name, DROP signature_position, DROP seller_signature_name, DROP seller_signature_position');
        $this->addSql('ALTER TABLE content DROP signature_name, DROP signature_position');
    }
}
