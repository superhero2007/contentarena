<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180113023214 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_item_content DROP FOREIGN KEY FK_6A069C1F8D67EF79');
        $this->addSql('ALTER TABLE rights_item_content DROP FOREIGN KEY FK_6A069C1F9DE102C4');
        $this->addSql('DROP INDEX IDX_6A069C1F8D67EF79 ON rights_item_content');
        $this->addSql('DROP INDEX IDX_6A069C1F9DE102C4 ON rights_item_content');
        $this->addSql('ALTER TABLE rights_item_content ADD form_content LONGTEXT DEFAULT NULL, ADD contract_content LONGTEXT DEFAULT NULL, DROP form_content_id, DROP contract_content_id');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE rights_item_content ADD form_content_id INT DEFAULT NULL, ADD contract_content_id INT DEFAULT NULL, DROP form_content, DROP contract_content');
        $this->addSql('ALTER TABLE rights_item_content ADD CONSTRAINT FK_6A069C1F8D67EF79 FOREIGN KEY (form_content_id) REFERENCES rights_content (id)');
        $this->addSql('ALTER TABLE rights_item_content ADD CONSTRAINT FK_6A069C1F9DE102C4 FOREIGN KEY (contract_content_id) REFERENCES rights_content (id)');
        $this->addSql('CREATE INDEX IDX_6A069C1F8D67EF79 ON rights_item_content (form_content_id)');
        $this->addSql('CREATE INDEX IDX_6A069C1F9DE102C4 ON rights_item_content (contract_content_id)');
    }
}
