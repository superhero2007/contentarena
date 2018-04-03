<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180331152922 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE installments (id INT AUTO_INCREMENT NOT NULL, percentage FLOAT NOT NULL, due_date DATETIME DEFAULT NULL , signing_days INT DEFAULT NULL, granted_days INT DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE content_installments (content_id INT NOT NULL, content_installments_id INT NOT NULL, INDEX content_installments_id (content_installments_id), INDEX IDX_FA180A3384A0A3ED (content_id), PRIMARY KEY(content_id, content_installments_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_A074FCE4E00A6016 FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_F0312AF8B196EE6E FOREIGN KEY (content_installments_id) REFERENCES installments (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content_installments DROP FOREIGN KEY FK_A074FCE4E00A6016');
        $this->addSql('ALTER TABLE content_installments DROP FOREIGN KEY FK_F0312AF8B196EE6E');
        $this->addSql('DROP TABLE content_installments');
        $this->addSql('DROP TABLE installments');
    }
}
