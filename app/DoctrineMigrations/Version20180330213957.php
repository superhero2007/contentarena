<?php

namespace Application\Migrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180330213957 extends AbstractMigration
{
    /**
     * @param Schema $schema
     */
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE content_selected_right (id INT AUTO_INCREMENT NOT NULL, group_id INT DEFAULT NULL, right_id INT DEFAULT NULL, right_item_id INT DEFAULT NULL, distribution_package_id INT DEFAULT NULL, inputs VARCHAR(255) DEFAULT NULL, INDEX IDX_CD04B49BFE54D947 (group_id), INDEX IDX_CD04B49B54976835 (right_id), INDEX IDX_CD04B49B75B2E078 (right_item_id), INDEX IDX_CD04B49BE00A60F0 (distribution_package_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE content_selected_right ADD CONSTRAINT FK_CD04B49BFE54D947 FOREIGN KEY (group_id) REFERENCES rights_group (id)');
        $this->addSql('ALTER TABLE content_selected_right ADD CONSTRAINT FK_CD04B49B54976835 FOREIGN KEY (right_id) REFERENCES rights (id)');
        $this->addSql('ALTER TABLE content_selected_right ADD CONSTRAINT FK_CD04B49B75B2E078 FOREIGN KEY (right_item_id) REFERENCES rights_item_content (id)');
        $this->addSql('ALTER TABLE content_selected_right ADD CONSTRAINT FK_CD04B49BE00A60F0 FOREIGN KEY (distribution_package_id) REFERENCES distribution_package (id)');
    }

    /**
     * @param Schema $schema
     */
    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE content_selected_right');
    }
}
