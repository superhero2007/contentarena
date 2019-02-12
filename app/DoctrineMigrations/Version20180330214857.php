<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180330214857 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_selected_rights (content_id INT NOT NULL, content_selected_right_id INT NOT NULL, INDEX IDX_7C1E817384A0A3ED (content_id), INDEX IDX_7C1E817310C33D49 (content_selected_right_id), PRIMARY KEY(content_id, content_selected_right_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_selected_rights ADD CONSTRAINT FK_7C1E817384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_selected_rights ADD CONSTRAINT FK_7C1E817310C33D49 FOREIGN KEY (content_selected_right_id) REFERENCES content_selected_right (id)');
        $this->addSql('ALTER TABLE content_selected_right CHANGE inputs inputs LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_selected_rights');
        $this->addSql('ALTER TABLE content_selected_right CHANGE inputs inputs VARCHAR(255) DEFAULT NULL COLLATE utf8_unicode_ci');
    }
}
