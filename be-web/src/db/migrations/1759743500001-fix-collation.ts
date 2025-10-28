import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixCollation1759743500001 implements MigrationInterface {
  name = 'FixCollation1759743500001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Categories table - Fix collation
    await queryRunner.query(`ALTER TABLE \`categories\` 
            MODIFY \`name\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`slug\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`thumbnail\` VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`);

    // Colors table - Fix collation
    await queryRunner.query(`ALTER TABLE \`colors\` 
            MODIFY \`name\` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`code\` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`hexCode\` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
            MODIFY \`thumbnailUrl\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`);

    // Product Sizes table - Fix collation
    await queryRunner.query(`ALTER TABLE \`product_sizes\` 
            MODIFY \`name\` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`code\` VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL`);

    // Products table - Fix collation
    await queryRunner.query(`ALTER TABLE \`products\` 
            MODIFY \`name\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`slug\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`description\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`);

    // Product Variants table - Fix collation
    await queryRunner.query(`ALTER TABLE \`product_variants\` 
            MODIFY \`sku\` VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL`);

    // Product Images table - Fix collation
    await queryRunner.query(`ALTER TABLE \`product_images\` 
            MODIFY \`imageUrl\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL`);

    // Collections table - Fix collation
    await queryRunner.query(`ALTER TABLE \`collections\` 
            MODIFY \`name\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`slug\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`thumbnailUrl\` VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
            MODIFY \`description\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`);

    // Orders table - Fix collation
    await queryRunner.query(`ALTER TABLE \`orders\` 
            MODIFY \`orderCode\` VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
            MODIFY \`shippingAddress\` VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
            MODIFY \`phone\` VARCHAR(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
            MODIFY \`note\` TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL`);

    // Set default charset and collation for all tables
    await queryRunner.query(
      `ALTER TABLE \`categories\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`colors\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_sizes\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_colors\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_variants\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`product_images\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`collections\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`collection_products\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`carts\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`cart_items\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order_items\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revert collation changes (optional - usually not needed)
    // This would revert all varchar/text fields back to their original collation
    // For brevity, we'll leave this empty as reverting collation changes is rarely needed
  }
}

