import { MysqlDataSource } from '../configs/typeorm.config';
import { CategoryEntity } from '../modules/categories/entities/categories.entity';
import { ColorEntity } from '../modules/colors/entities/colors.entity';
import { SizeEntity } from '../modules/sizes/entities/sizes.entity';
import { ProductEntity } from '../modules/products/entities/products.entity';
import { CollectionEntity } from '../modules/collections/entities/collections.entity';
import { ProductVariantEntity } from '../modules/product-variants/entities/product-variants.entity';
import { ProductImageEntity } from '../modules/product-images/entities/product-images.entity';
import { CollectionProductEntity } from '../modules/collection-products/entities/collection-products.entity';

async function seedAll() {
  const dataSource = MysqlDataSource;

  try {
    console.log('🚀 Starting seed process...\n');
    await dataSource.initialize();
    console.log('🔌 Database connection established\n');

    // ============ CLEAR EXISTING DATA ============
    console.log('🗑️  Clearing existing data...');
    const categoryRepository = dataSource.getRepository(CategoryEntity);
    const colorRepository = dataSource.getRepository(ColorEntity);
    const sizeRepository = dataSource.getRepository(SizeEntity);
    const productRepository = dataSource.getRepository(ProductEntity);
    const collectionRepository = dataSource.getRepository(CollectionEntity);

    await categoryRepository.query('SET FOREIGN_KEY_CHECKS = 0');
    await categoryRepository.query('TRUNCATE TABLE `collections`');
    await categoryRepository.query('TRUNCATE TABLE `collection_products`');
    await categoryRepository.query('TRUNCATE TABLE `product_images`');
    await categoryRepository.query('TRUNCATE TABLE `product_variants`');
    await categoryRepository.query('TRUNCATE TABLE `products`');
    await categoryRepository.query('TRUNCATE TABLE `categories`');
    await categoryRepository.query('TRUNCATE TABLE `colors`');
    await categoryRepository.query('TRUNCATE TABLE `sizes`');
    await categoryRepository.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Existing data cleared!\n');

    // ============ SEED CATEGORIES ============
    console.log('📁 Seeding Categories...');

    const categoriesToSeed = [
      // Root Categories
      {
        name: 'Nam',
        slug: 'nam',
        thumbnail: 'https://via.placeholder.com/300/1E90FF/ffffff?text=Nam',
        parentId: null,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Nữ',
        slug: 'nu',
        thumbnail: 'https://via.placeholder.com/300/FF1493/ffffff?text=Nu',
        parentId: null,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Trẻ em',
        slug: 'tre-em',
        thumbnail: 'https://via.placeholder.com/300/FFD700/ffffff?text=Tre+Em',
        parentId: null,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Phụ kiện',
        slug: 'phu-kien',
        thumbnail:
          'https://via.placeholder.com/300/32CD32/ffffff?text=Phu+Kien',
        parentId: null,
        isActive: true,
        sortOrder: 4,
      },
    ];

    const savedCategories: any = {};
    for (const catData of categoriesToSeed) {
      const newCategory = categoryRepository.create(catData);
      const savedCat = await categoryRepository.save(newCategory);
      savedCategories[catData.name] = savedCat.id;
    }

    // Child Categories for Nam
    const namId = savedCategories['Nam'];
    const childCategoriesNam = [
      {
        name: 'Áo nam',
        slug: 'ao-nam',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: namId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Quần nam',
        slug: 'quan-nam',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: namId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Giày nam',
        slug: 'giay-nam',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: namId,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Áo khoác nam',
        slug: 'ao-khoac-nam',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: namId,
        isActive: true,
        sortOrder: 4,
      },
    ];
    for (const catData of childCategoriesNam) {
      const newCategory = categoryRepository.create(catData);
      const savedCat = await categoryRepository.save(newCategory);
      savedCategories[catData.name] = savedCat.id;
    }

    // Child Categories for Nữ
    const nuId = savedCategories['Nữ'];
    const childCategoriesNu = [
      {
        name: 'Áo nữ',
        slug: 'ao-nu',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: nuId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Quần nữ',
        slug: 'quan-nu',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: nuId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Giày nữ',
        slug: 'giay-nu',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: nuId,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Áo khoác nữ',
        slug: 'ao-khoac-nu',
        thumbnail: 'https://via.placeholder.com/250',
        parentId: nuId,
        isActive: true,
        sortOrder: 4,
      },
    ];
    for (const catData of childCategoriesNu) {
      const newCategory = categoryRepository.create(catData);
      const savedCat = await categoryRepository.save(newCategory);
      savedCategories[catData.name] = savedCat.id;
    }

    // Grandchild Categories for Áo nam
    const aoNamId = savedCategories['Áo nam'];
    const grandchildCategoriesAoNam = [
      {
        name: 'Áo thun nam',
        slug: 'ao-thun-nam',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Áo sơ mi nam',
        slug: 'ao-so-mi-nam',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Áo polo nam',
        slug: 'ao-polo-nam',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 3,
      },
    ];
    for (const catData of grandchildCategoriesAoNam) {
      const newCategory = categoryRepository.create(catData);
      await categoryRepository.save(newCategory);
    }

    // Grandchild Categories for Áo nữ
    const aoNuId = savedCategories['Áo nữ'];
    const grandchildCategoriesAoNu = [
      {
        name: 'Áo thun nữ',
        slug: 'ao-thun-nu',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNuId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Áo sơ mi nữ',
        slug: 'ao-so-mi-nu',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNuId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Áo đầm nữ',
        slug: 'ao-dam-nu',
        thumbnail: 'https://via.placeholder.com/200',
        parentId: aoNuId,
        isActive: true,
        sortOrder: 3,
      },
    ];
    for (const catData of grandchildCategoriesAoNu) {
      const newCategory = categoryRepository.create(catData);
      await categoryRepository.save(newCategory);
    }

    console.log('✅ Categories seeded successfully!\n');

    // ============ SEED COLORS ============
    console.log('🎨 Seeding Colors...');

    const colorsToSeed = [
      {
        name: 'Đỏ',
        code: 'red',
        image: 'https://via.placeholder.com/50/ff0000',
      },
      {
        name: 'Xanh dương',
        code: 'blue',
        image: 'https://via.placeholder.com/50/0000ff',
      },
      {
        name: 'Xanh lá',
        code: 'green',
        image: 'https://via.placeholder.com/50/00ff00',
      },
      {
        name: 'Vàng',
        code: 'yellow',
        image: 'https://via.placeholder.com/50/ffff00',
      },
      {
        name: 'Cam',
        code: 'orange',
        image: 'https://via.placeholder.com/50/ffa500',
      },
      {
        name: 'Tím',
        code: 'purple',
        image: 'https://via.placeholder.com/50/800080',
      },
      {
        name: 'Hồng',
        code: 'pink',
        image: 'https://via.placeholder.com/50/ffc0cb',
      },
      {
        name: 'Đen',
        code: 'black',
        image: 'https://via.placeholder.com/50/000000',
      },
      {
        name: 'Trắng',
        code: 'white',
        image: 'https://via.placeholder.com/50/ffffff',
      },
      {
        name: 'Xám',
        code: 'gray',
        image: 'https://via.placeholder.com/50/808080',
      },
    ];

    for (const colorData of colorsToSeed) {
      const color = colorRepository.create(colorData);
      await colorRepository.save(color);
    }
    console.log('✅ Colors seeded successfully!\n');

    // ============ SEED SIZES ============
    console.log('📏 Seeding Sizes...');

    const sizesToSeed = [
      { name: 'XS' },
      { name: 'S' },
      { name: 'M' },
      { name: 'L' },
      { name: 'XL' },
      { name: 'XXL' },
      { name: '2XL' },
      { name: '3XL' },
      { name: 'Free Size' },
    ];

    for (const sizeData of sizesToSeed) {
      const size = sizeRepository.create(sizeData);
      await sizeRepository.save(size);
    }
    console.log('✅ Sizes seeded successfully!\n');

    // ============ SEED PRODUCTS ============
    console.log('🛍️  Seeding Products...');

    const aoThunNam = await categoryRepository.findOne({
      where: { slug: 'ao-thun-nam' },
    });
    const aoThunNu = await categoryRepository.findOne({
      where: { slug: 'ao-thun-nu' },
    });
    const quanNam = await categoryRepository.findOne({
      where: { slug: 'quan-nam' },
    });
    const quanNu = await categoryRepository.findOne({
      where: { slug: 'quan-nu' },
    });

    const productsToSeed = [
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam basic cotton',
        slug: 'ao-thun-nam-basic-cotton',
        description: 'Áo thun nam chất liệu cotton 100%',
        price: 199000,
        isActive: true,
      },
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam polo',
        slug: 'ao-thun-nam-polo',
        description: 'Áo polo nam sang trọng',
        price: 299000,
        isActive: true,
      },
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam oversize',
        slug: 'ao-thun-nam-oversize',
        description: 'Áo thun nam form oversize',
        price: 249000,
        isActive: true,
      },
      {
        categoryId: aoThunNu?.id || 2,
        name: 'Áo thun nữ basic',
        slug: 'ao-thun-nu-basic',
        description: 'Áo thun nữ basic form fitted',
        price: 179000,
        isActive: true,
      },
      {
        categoryId: aoThunNu?.id || 2,
        name: 'Áo thun nữ croptop',
        slug: 'ao-thun-nu-croptop',
        description: 'Áo croptop nữ trẻ trung',
        price: 159000,
        isActive: true,
      },
      {
        categoryId: quanNam?.id || 1,
        name: 'Quần jean nam slim fit',
        slug: 'quan-jean-nam-slim-fit',
        description: 'Quần jean nam form slim fit',
        price: 450000,
        isActive: true,
      },
      {
        categoryId: quanNu?.id || 2,
        name: 'Quần jean nữ skinny',
        slug: 'quan-jean-nu-skinny',
        description: 'Quần jean nữ form skinny',
        price: 420000,
        isActive: true,
      },
    ];

    for (const productData of productsToSeed) {
      const product = productRepository.create(productData);
      await productRepository.save(product);
    }
    console.log('✅ Products seeded successfully!\n');

    // ============ SEED COLLECTIONS ============
    console.log('📦 Seeding Collections...');

    const collectionsToSeed = [
      {
        name: 'Bộ sưu tập mùa hè 2024',
        slug: 'bo-suu-tap-mua-he-2024',
        description: 'Bộ sưu tập mùa hè',
        thumbnail: 'https://via.placeholder.com/800x400',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập xuân 2024',
        slug: 'bo-suu-tap-xuan-2024',
        description: 'Bộ sưu tập xuân',
        thumbnail: 'https://via.placeholder.com/800x400',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập công sở',
        slug: 'bo-suu-tap-cong-so',
        description: 'Bộ sưu tập công sở',
        thumbnail: 'https://via.placeholder.com/800x400',
        isActive: true,
      },
    ];

    for (const collectionData of collectionsToSeed) {
      const collection = collectionRepository.create(collectionData);
      await collectionRepository.save(collection);
    }
    console.log('✅ Collections seeded successfully!\n');

    // ============ SEED PRODUCT VARIANTS ============
    console.log('🔀 Seeding Product Variants...');
    const productVariantRepository = dataSource.getRepository(ProductVariantEntity);

    // Get products for variants
    const allProducts = await productRepository.find();
    const allColors = await colorRepository.find();
    const allSizes = await sizeRepository.find();

    const variantsToSeed: any[] = [];
    
    // Create variants for each product
    for (const product of allProducts) {
      // Create 2-3 variants per product with different colors and sizes
      const redColor = allColors.find(c => c.code === 'red');
      const blueColor = allColors.find(c => c.code === 'blue');
      const blackColor = allColors.find(c => c.code === 'black');
      
      const sizeM = allSizes.find(s => s.name === 'M');
      const sizeL = allSizes.find(s => s.name === 'L');
      const sizeXL = allSizes.find(s => s.name === 'XL');

      if (redColor && sizeM) {
        variantsToSeed.push({
          productId: product.id,
          sku: `${product.slug}-red-m`.toUpperCase(),
          price: product.price,
          available: Math.floor(Math.random() * 50) + 10,
          colorId: redColor.id,
          sizeId: sizeM.id,
          imageUrl: 'https://via.placeholder.com/400/ff0000',
        });
      }

      if (blueColor && sizeL) {
        variantsToSeed.push({
          productId: product.id,
          sku: `${product.slug}-blue-l`.toUpperCase(),
          price: product.price + 10000,
          available: Math.floor(Math.random() * 50) + 10,
          colorId: blueColor.id,
          sizeId: sizeL.id,
          imageUrl: 'https://via.placeholder.com/400/0000ff',
        });
      }

      if (blackColor && sizeXL) {
        variantsToSeed.push({
          productId: product.id,
          sku: `${product.slug}-black-xl`.toUpperCase(),
          price: product.price + 20000,
          available: Math.floor(Math.random() * 50) + 10,
          colorId: blackColor.id,
          sizeId: sizeXL.id,
          imageUrl: 'https://via.placeholder.com/400/000000',
        });
      }
    }

    for (const variantData of variantsToSeed) {
      const variant = productVariantRepository.create(variantData);
      await productVariantRepository.save(variant);
    }
    console.log('✅ Product Variants seeded successfully!\n');

    // ============ SEED PRODUCT IMAGES ============
    console.log('🖼️  Seeding Product Images...');
    const productImageRepository = dataSource.getRepository(ProductImageEntity);

    const imagesToSeed: any[] = [];

    for (const product of allProducts) {
      // Main product image
      imagesToSeed.push({
        productId: product.id,
        variantId: null,
        imageUrl: `https://via.placeholder.com/800/808080?text=${product.name}`,
        isMain: true,
      });

      // Additional product images
      imagesToSeed.push({
        productId: product.id,
        variantId: null,
        imageUrl: `https://via.placeholder.com/800/cccccc?text=${product.name}-2`,
        isMain: false,
      });

      imagesToSeed.push({
        productId: product.id,
        variantId: null,
        imageUrl: `https://via.placeholder.com/800/999999?text=${product.name}-3`,
        isMain: false,
      });
    }

    // Add variant-specific images
    const allVariants = await productVariantRepository.find();
    for (const variant of allVariants.slice(0, 5)) { // Only first 5 variants
      imagesToSeed.push({
        productId: variant.productId,
        variantId: variant.id,
        imageUrl: variant.imageUrl || 'https://via.placeholder.com/800',
        isMain: false,
      });
    }

    for (const imageData of imagesToSeed) {
      const image = productImageRepository.create(imageData);
      await productImageRepository.save(image);
    }
    console.log('✅ Product Images seeded successfully!\n');

    // ============ SEED COLLECTION PRODUCTS ============
    console.log('🔗 Seeding Collection Products...');
    const collectionProductRepository = dataSource.getRepository(CollectionProductEntity);

    const allCollections = await collectionRepository.find();
    
    const collectionProductsToSeed: any[] = [];

    // Add products to collections
    if (allCollections.length > 0 && allProducts.length > 0) {
      const summerCollection = allCollections.find(c => c.slug === 'bo-suu-tap-mua-he-2024');
      const springCollection = allCollections.find(c => c.slug === 'bo-suu-tap-xuan-2024');
      const officeCollection = allCollections.find(c => c.slug === 'bo-suu-tap-cong-so');

      // Summer collection - first 3 products
      if (summerCollection) {
        for (let i = 0; i < Math.min(3, allProducts.length); i++) {
          collectionProductsToSeed.push({
            collectionId: summerCollection.id,
            productId: allProducts[i].id,
            displayOrder: i + 1,
          });
        }
      }

      // Spring collection - products 2-5
      if (springCollection) {
        for (let i = 1; i < Math.min(5, allProducts.length); i++) {
          collectionProductsToSeed.push({
            collectionId: springCollection.id,
            productId: allProducts[i].id,
            displayOrder: i,
          });
        }
      }

      // Office collection - products 4-7
      if (officeCollection) {
        for (let i = 3; i < Math.min(7, allProducts.length); i++) {
          collectionProductsToSeed.push({
            collectionId: officeCollection.id,
            productId: allProducts[i].id,
            displayOrder: i - 2,
          });
        }
      }
    }

    for (const cpData of collectionProductsToSeed) {
      const collectionProduct = collectionProductRepository.create(cpData);
      await collectionProductRepository.save(collectionProduct);
    }
    console.log('✅ Collection Products seeded successfully!\n');

    // ============ SUMMARY ============
    const totalCategories = await categoryRepository.count();
    const totalColors = await colorRepository.count();
    const totalSizes = await sizeRepository.count();
    const totalProducts = await productRepository.count();
    const totalCollections = await collectionRepository.count();
    const totalVariants = await productVariantRepository.count();
    const totalImages = await productImageRepository.count();
    const totalCollectionProducts = await collectionProductRepository.count();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SEED SUMMARY:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📁 Categories: ${totalCategories}`);
    console.log(`🎨 Colors: ${totalColors}`);
    console.log(`📏 Sizes: ${totalSizes}`);
    console.log(`🛍️  Products: ${totalProducts}`);
    console.log(`🔀 Product Variants: ${totalVariants}`);
    console.log(`🖼️  Product Images: ${totalImages}`);
    console.log(`📦 Collections: ${totalCollections}`);
    console.log(`🔗 Collection Products: ${totalCollectionProducts}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

seedAll().then(() => console.log('🎉 All seeds completed successfully!'));
