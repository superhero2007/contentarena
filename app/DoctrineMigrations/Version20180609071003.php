<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180609071003 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content DROP releaseYear, DROP availability, DROP duration, DROP own_license, DROP programName, DROP programType, DROP seriesType');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content ADD releaseYear SMALLINT DEFAULT NULL, ADD availability DATE DEFAULT NULL, ADD duration VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD own_license VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD programName VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD programType VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci, ADD seriesType VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
    }
}
