import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductsTables1759743200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Colors
    await queryRunner.createTable(
      new Table({
        name: 'colors',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          { name: 'name', type: 'varchar', length: '20', isNullable: false },
          { name: 'code', type: 'varchar', length: '20', isNullable: false },
          { name: 'image', type: 'varchar', length: '100', isNullable: true },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          { name: 'UQ_colors_code', columnNames: ['code'], isUnique: true },
        ],
      }),
      true,
    );

    // Sizes
    await queryRunner.createTable(
      new Table({
        name: 'sizes',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          { name: 'name', type: 'varchar', length: '10', isNullable: false },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Products
    await queryRunner.createTable(
      new Table({
        name: 'products',
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
            name: 'categoryId',
            type: 'bigint',
            isNullable: false,
            unsigned: true,
          },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'slug', type: 'varchar', length: '255', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'isActive',
            type: 'tinyint',
            width: 1,
            isNullable: false,
            default: 1,
          },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          { name: 'UQ_products_slug', columnNames: ['slug'], isUnique: true },
          { name: 'IDX_products_categoryId', columnNames: ['categoryId'] },
          { name: 'IDX_products_isActive', columnNames: ['isActive'] },
        ],
      }),
      true,
    );

    // Variants
    await queryRunner.createTable(
      new Table({
        name: 'product_variants',
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
            name: 'productId',
            type: 'bigint',
            isNullable: false,
            unsigned: true,
          },
          { name: 'sku', type: 'varchar', length: '50', isNullable: false },
          {
            name: 'price',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          { name: 'available', type: 'bigint', unsigned: true, default: 0 },
          {
            name: 'colorId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          { name: 'sizeId', type: 'bigint', unsigned: true, isNullable: false },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'UQ_product_variants_sku',
            columnNames: ['sku'],
            isUnique: true,
          },
          {
            name: 'IDX_product_variants_productId',
            columnNames: ['productId'],
          },
          { name: 'IDX_product_variants_colorId', columnNames: ['colorId'] },
          { name: 'IDX_product_variants_sizeId', columnNames: ['sizeId'] },
        ],
      }),
      true,
    );

    // Product Images
    await queryRunner.createTable(
      new Table({
        name: 'product_images',
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
            name: 'productId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'variantId',
            type: 'bigint',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'imageUrl',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'isMain', type: 'tinyint', width: 1, default: 0 },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          { name: 'IDX_product_images_productId', columnNames: ['productId'] },
          { name: 'IDX_product_images_variantId', columnNames: ['variantId'] },
        ],
      }),
      true,
    );

    // Collections
    await queryRunner.createTable(
      new Table({
        name: 'collections',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          { name: 'name', type: 'varchar', length: '255', isNullable: false },
          { name: 'slug', type: 'varchar', length: '255', isNullable: false },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'thumbnail',
            type: 'varchar',
            length: '255',
            isNullable: true,
          },
          { name: 'isActive', type: 'tinyint', width: 1, default: 1 },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'UQ_collections_slug',
            columnNames: ['slug'],
            isUnique: true,
          },
          { name: 'IDX_collections_isActive', columnNames: ['isActive'] },
        ],
      }),
      true,
    );

    // Collection Products
    await queryRunner.createTable(
      new Table({
        name: 'collection_products',
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
            name: 'collectionId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          {
            name: 'productId',
            type: 'bigint',
            unsigned: true,
            isNullable: false,
          },
          { name: 'displayOrder', type: 'bigint', unsigned: true, default: 0 },
          { name: 'createdAt', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
        indices: [
          {
            name: 'IDX_collection_products_collectionId',
            columnNames: ['collectionId'],
          },
          {
            name: 'IDX_collection_products_productId',
            columnNames: ['productId'],
          },
        ],
      }),
      true,
    );

    // Foreign Keys
    await queryRunner.createForeignKeys('products', [
      new TableForeignKey({
        columnNames: ['categoryId'],
        referencedTableName: 'categories',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        name: 'FK_products_categoryId_categories_id',
      }),
    ]);

    await queryRunner.createForeignKeys('product_variants', [
      new TableForeignKey({
        columnNames: ['productId'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_product_variants_productId_products_id',
      }),
      new TableForeignKey({
        columnNames: ['colorId'],
        referencedTableName: 'colors',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        name: 'FK_product_variants_colorId_colors_id',
      }),
      new TableForeignKey({
        columnNames: ['sizeId'],
        referencedTableName: 'sizes',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE',
        name: 'FK_product_variants_sizeId_sizes_id',
      }),
    ]);

    await queryRunner.createForeignKeys('product_images', [
      new TableForeignKey({
        columnNames: ['productId'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_product_images_productId_products_id',
      }),
      new TableForeignKey({
        columnNames: ['variantId'],
        referencedTableName: 'product_variants',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_product_images_variantId_product_variants_id',
      }),
    ]);

    await queryRunner.createForeignKeys('collection_products', [
      new TableForeignKey({
        columnNames: ['collectionId'],
        referencedTableName: 'collections',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_collection_products_collectionId_collections_id',
      }),
      new TableForeignKey({
        columnNames: ['productId'],
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        name: 'FK_collection_products_productId_products_id',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const tables = [
      'collection_products',
      'collections',
      'product_images',
      'product_variants',
      'products',
      'sizes',
      'colors',
    ];
    for (const table of tables) {
      await queryRunner.dropTable(table, true);
    }
  }
}
