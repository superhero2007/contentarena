<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180324033109 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_filter_super_rights (content_filter_id INT NOT NULL, content_filter_super_rights_id INT NOT NULL, INDEX IDX_9225261BE372FA5D (content_filter_id), INDEX IDX_9225261BFEE8DE50 (content_filter_super_rights_id), PRIMARY KEY(content_filter_id, content_filter_super_rights_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_filter_super_rights ADD CONSTRAINT FK_9225261BE372FA5D FOREIGN KEY (content_filter_id) REFERENCES content_filter (id)');
        $this->addSql('ALTER TABLE content_filter_super_rights ADD CONSTRAINT FK_9225261BFEE8DE50 FOREIGN KEY (content_filter_super_rights_id) REFERENCES rights_package (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_filter_super_rights');
    }
}
