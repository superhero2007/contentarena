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

        $this->addSql('CREATE TABLE content_installments (content_id INT NOT NULL, content_installments_id INT NOT NULL, INDEX IDX_FA180A3384A0A3ED (content_id), INDEX IDX_FA180A33A9EFEEDF (content_installments_id), PRIMARY KEY(content_id, content_installments_id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE installments (id INT AUTO_INCREMENT NOT NULL, percentage DOUBLE PRECISION NOT NULL, due_date DATETIME NOT NULL, signing_days INT NOT NULL, granted_days INT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_FA180A3384A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('ALTER TABLE content_installments ADD CONSTRAINT FK_FA180A33A9EFEEDF FOREIGN KEY (content_installments_id) REFERENCES installments (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE content_installments DROP FOREIGN KEY FK_FA180A33A9EFEEDF');
        $this->addSql('DROP TABLE content_installments');
        $this->addSql('DROP TABLE installments');
    }
}
