import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCategoriesTable1759742960705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'categories',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'parentId',
            type: 'bigint',
            isNullable: true,
            unsigned: true,
          },
          {
            name: 'isActive',
            type: 'tinyint',
            width: 1,
            isNullable: false,
            default: 1,
          },
          {
            name: 'sortOrder',
            type: 'bigint',
            isNullable: false,
            unsigned: true,
            default: 0,
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_categories_parentId',
            columnNames: ['parentId'],
          },
          {
            name: 'IDX_categories_isActive',
            columnNames: ['isActive'],
          },
          {
            name: 'UQ_categories_slug',
            columnNames: ['slug'],
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'categories',
      new TableForeignKey({
        columnNames: ['parentId'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        name: 'FK_categories_parentId_categories_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'categories',
      'FK_categories_parentId_categories_id',
    );
    await queryRunner.dropTable('categories', true);
  }
}
