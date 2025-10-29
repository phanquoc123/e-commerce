import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initdb1759743500000 implements MigrationInterface {
  name = 'Initdb1759743500000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Categories table
    await queryRunner.query(`CREATE TABLE \`categories\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) NOT NULL,
      \`slug\` varchar(255) NOT NULL,
      \`thumbnail\` varchar(500) NULL,
      \`parentId\` bigint UNSIGNED NULL,
      \`isActive\` tinyint(1) NOT NULL DEFAULT 1,
      \`sortOrder\` bigint UNSIGNED NOT NULL DEFAULT 0,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_categories_parentId\` (\`parentId\`),
      INDEX \`IDX_categories_isActive\` (\`isActive\`),
      UNIQUE INDEX \`UQ_categories_slug\` (\`slug\`)
    ) ENGINE=InnoDB`);

    // Colors table
    await queryRunner.query(`CREATE TABLE \`colors\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` varchar(100) NOT NULL,
      \`code\` varchar(20) NOT NULL,
      \`hexCode\` varchar(10) NULL,
      \`thumbnailUrl\` varchar(255) NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_colors_code\` (\`code\`)
    ) ENGINE=InnoDB`);

    // Product Sizes table
    await queryRunner.query(`CREATE TABLE \`product_sizes\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` varchar(10) NOT NULL,
      \`code\` varchar(10) NOT NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_product_sizes_code\` (\`code\`)
    ) ENGINE=InnoDB`);

    // Products table
    await queryRunner.query(`CREATE TABLE \`products\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`categoryId\` bigint UNSIGNED NULL,
      \`name\` varchar(255) NOT NULL,
      \`slug\` varchar(255) NOT NULL,
      \`description\` text NULL,
      \`price\` decimal(10,2) NOT NULL,
      \`salePrice\` decimal(10,2) NULL,
      \`isActive\` tinyint(1) NOT NULL DEFAULT 1,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_products_slug\` (\`slug\`),
      INDEX \`IDX_products_categoryId\` (\`categoryId\`),
      INDEX \`IDX_products_isActive\` (\`isActive\`)
    ) ENGINE=InnoDB`);

    // Product Colors table (many-to-many: products <-> colors)
    await queryRunner.query(`CREATE TABLE \`product_colors\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`productId\` bigint UNSIGNED NOT NULL,
      \`colorId\` bigint UNSIGNED NOT NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_product_colors_productId\` (\`productId\`),
      INDEX \`IDX_product_colors_colorId\` (\`colorId\`),
      UNIQUE INDEX \`UQ_product_colors_productId_colorId\` (\`productId\`, \`colorId\`)
    ) ENGINE=InnoDB`);

    // Product Variants table
    await queryRunner.query(`CREATE TABLE \`product_variants\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`productId\` bigint UNSIGNED NOT NULL,
      \`colorId\` bigint UNSIGNED NULL,
      \`sizeId\` bigint UNSIGNED NULL,
      \`sku\` varchar(100) NOT NULL,
      \`price\` decimal(10,2) NOT NULL,
      \`stock\` int NOT NULL DEFAULT 0,
      \`status\` enum('active', 'inactive') NOT NULL DEFAULT 'active',
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_product_variants_sku\` (\`sku\`),
      INDEX \`IDX_product_variants_productId\` (\`productId\`),
      INDEX \`IDX_product_variants_colorId\` (\`colorId\`),
      INDEX \`IDX_product_variants_sizeId\` (\`sizeId\`)
    ) ENGINE=InnoDB`);

    // Product Images table
    await queryRunner.query(`CREATE TABLE \`product_images\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`productColorId\` bigint UNSIGNED NOT NULL,
      \`imageUrl\` varchar(255) NOT NULL,
      \`isMain\` tinyint(1) NOT NULL DEFAULT 0,
      \`sortOrder\` int NOT NULL DEFAULT 0,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_product_images_productColorId\` (\`productColorId\`)
    ) ENGINE=InnoDB`);

    // Collections table
    await queryRunner.query(`CREATE TABLE \`collections\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`name\` varchar(255) NOT NULL,
      \`slug\` varchar(255) NOT NULL,
      \`thumbnailUrl\` varchar(255) NULL,
      \`description\` text NULL,
      \`isActive\` tinyint(1) NOT NULL DEFAULT 1,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_collections_slug\` (\`slug\`),
      INDEX \`IDX_collections_isActive\` (\`isActive\`)
    ) ENGINE=InnoDB`);

    // Collection Products table
    await queryRunner.query(`CREATE TABLE \`collection_products\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`collectionId\` bigint UNSIGNED NOT NULL,
      \`productId\` bigint UNSIGNED NOT NULL,
      \`sortOrder\` int NOT NULL DEFAULT 0,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_collection_products_collectionId\` (\`collectionId\`),
      INDEX \`IDX_collection_products_productId\` (\`productId\`),
      UNIQUE INDEX \`UQ_collection_products_collectionId_productId\` (\`collectionId\`, \`productId\`)
    ) ENGINE=InnoDB`);

    // Carts table
    await queryRunner.query(`CREATE TABLE \`carts\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`cartToken\` varchar(255) NOT NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_carts_cartToken\` (\`cartToken\`)
    ) ENGINE=InnoDB`);

    // Cart Items table
    await queryRunner.query(`CREATE TABLE \`cart_items\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`cartId\` bigint UNSIGNED NOT NULL,
      \`variantId\` bigint UNSIGNED NOT NULL,
      \`quantity\` int NOT NULL DEFAULT 1,
      \`price\` decimal(10,2) NOT NULL,
      \`salePrice\` decimal(10,2) NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_cart_items_cartId\` (\`cartId\`),
      INDEX \`IDX_cart_items_variantId\` (\`variantId\`),
      UNIQUE INDEX \`UQ_cart_items_cartId_variantId\` (\`cartId\`, \`variantId\`)
    ) ENGINE=InnoDB`);

    // Orders table
    await queryRunner.query(`CREATE TABLE \`orders\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`userId\` bigint UNSIGNED NOT NULL,
      \`orderCode\` varchar(50) NOT NULL,
      \`status\` enum('pending', 'paid', 'shipping', 'completed', 'cancelled') NOT NULL DEFAULT 'pending',
      \`totalPrice\` decimal(12,2) NOT NULL DEFAULT 0.00,
      \`paymentMethod\` enum('cod', 'bank', 'credit_card') NOT NULL DEFAULT 'cod',
      \`shippingAddress\` varchar(500) NULL,
      \`phone\` varchar(20) NULL,
      \`note\` text NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      \`updatedAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      UNIQUE INDEX \`UQ_orders_orderCode\` (\`orderCode\`),
      INDEX \`IDX_orders_userId\` (\`userId\`),
      INDEX \`IDX_orders_status\` (\`status\`)
    ) ENGINE=InnoDB`);

    // Order Items table
    await queryRunner.query(`CREATE TABLE \`order_items\` (
      \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
      \`orderId\` bigint UNSIGNED NOT NULL,
      \`variantId\` bigint UNSIGNED NOT NULL,
      \`quantity\` int NOT NULL DEFAULT 1,
      \`price\` decimal(10,2) NOT NULL,
      \`salePrice\` decimal(10,2) NULL,
      \`createdAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (\`id\`),
      INDEX \`IDX_order_items_orderId\` (\`orderId\`),
      INDEX \`IDX_order_items_variantId\` (\`variantId\`)
    ) ENGINE=InnoDB`);

    // Foreign Keys
    // Categories
    await queryRunner.query(
      `ALTER TABLE \`categories\` ADD CONSTRAINT \`FK_categories_parentId_categories_id\` 
       FOREIGN KEY (\`parentId\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );

    // Products
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_products_categoryId_categories_id\` 
       FOREIGN KEY (\`categoryId\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL ON UPDATE CASCADE`,
    );

    // Product Colors
    await queryRunner.query(
      `ALTER TABLE \`product_colors\` ADD CONSTRAINT \`FK_product_colors_productId_products_id\` 
       FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_colors\` ADD CONSTRAINT \`FK_product_colors_colorId_colors_id\` 
       FOREIGN KEY (\`colorId\`) REFERENCES \`colors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // Product Variants
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_product_variants_productId_products_id\` 
       FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_product_variants_colorId_product_colors_id\` 
       FOREIGN KEY (\`colorId\`) REFERENCES \`product_colors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` ADD CONSTRAINT \`FK_product_variants_sizeId_product_sizes_id\` 
       FOREIGN KEY (\`sizeId\`) REFERENCES \`product_sizes\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // Product Images
    await queryRunner.query(
      `ALTER TABLE \`product_images\` ADD CONSTRAINT \`FK_product_images_productColorId_product_colors_id\` 
       FOREIGN KEY (\`productColorId\`) REFERENCES \`product_colors\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // Collection Products
    await queryRunner.query(
      `ALTER TABLE \`collection_products\` ADD CONSTRAINT \`FK_collection_products_collectionId_collections_id\` 
       FOREIGN KEY (\`collectionId\`) REFERENCES \`collections\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`collection_products\` ADD CONSTRAINT \`FK_collection_products_productId_products_id\` 
       FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // Cart Items
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_cart_items_cartId_carts_id\` 
       FOREIGN KEY (\`cartId\`) REFERENCES \`carts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` ADD CONSTRAINT \`FK_cart_items_variantId_product_variants_id\` 
       FOREIGN KEY (\`variantId\`) REFERENCES \`product_variants\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );

    // Order Items
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_order_items_orderId_orders_id\` 
       FOREIGN KEY (\`orderId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` ADD CONSTRAINT \`FK_order_items_variantId_product_variants_id\` 
       FOREIGN KEY (\`variantId\`) REFERENCES \`product_variants\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop foreign keys
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_order_items_variantId_product_variants_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DROP FOREIGN KEY \`FK_order_items_orderId_orders_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_cart_items_variantId_product_variants_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DROP FOREIGN KEY \`FK_cart_items_cartId_carts_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`collection_products\` DROP FOREIGN KEY \`FK_collection_products_productId_products_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`collection_products\` DROP FOREIGN KEY \`FK_collection_products_collectionId_collections_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DROP FOREIGN KEY \`FK_product_images_productColorId_product_colors_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_product_variants_sizeId_product_sizes_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_product_variants_colorId_product_colors_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` DROP FOREIGN KEY \`FK_product_variants_productId_products_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_colors\` DROP FOREIGN KEY \`FK_product_colors_colorId_colors_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_colors\` DROP FOREIGN KEY \`FK_product_colors_productId_products_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_products_categoryId_categories_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`categories\` DROP FOREIGN KEY \`FK_categories_parentId_categories_id\``,
    );

    // Drop tables
    await queryRunner.query(`DROP TABLE \`order_items\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`cart_items\``);
    await queryRunner.query(`DROP TABLE \`carts\``);
    await queryRunner.query(`DROP TABLE \`collection_products\``);
    await queryRunner.query(`DROP TABLE \`collections\``);
    await queryRunner.query(`DROP TABLE \`product_images\``);
    await queryRunner.query(`DROP TABLE \`product_variants\``);
    await queryRunner.query(`DROP TABLE \`product_colors\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`product_sizes\``);
    await queryRunner.query(`DROP TABLE \`colors\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}

