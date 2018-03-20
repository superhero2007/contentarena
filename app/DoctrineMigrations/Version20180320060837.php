<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180320060837 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sales_package DROP FOREIGN KEY FK_D0911BF584A0A3ED');
        $this->addSql('DROP INDEX IDX_D0911BF584A0A3ED ON sales_package');
        $this->addSql('ALTER TABLE sales_package DROP content_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE sales_package ADD content_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE sales_package ADD CONSTRAINT FK_D0911BF584A0A3ED FOREIGN KEY (content_id) REFERENCES content (id)');
        $this->addSql('CREATE INDEX IDX_D0911BF584A0A3ED ON sales_package (content_id)');
    }
}
