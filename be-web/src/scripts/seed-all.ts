import { MysqlDataSource } from '../configs/typeorm.config';
import { CategoryEntity } from '../modules/categories/entities/categories.entity';
import { ColorEntity } from '../modules/colors/entities/colors.entity';
import { ProductSizeEntity } from '../modules/product-sizes/entities/product-sizes.entity';
import { ProductEntity } from '../modules/products/entities/products.entity';
import { CollectionEntity } from '../modules/collections/entities/collections.entity';
import { ProductColorEntity } from '../modules/product-colors/entities/product-colors.entity';
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
    
    await categoryRepository.query('SET FOREIGN_KEY_CHECKS = 0');
    await categoryRepository.query('TRUNCATE TABLE `collection_products`');
    await categoryRepository.query('TRUNCATE TABLE `product_images`');
    await categoryRepository.query('TRUNCATE TABLE `product_variants`');
    await categoryRepository.query('TRUNCATE TABLE `product_colors`');
    await categoryRepository.query('TRUNCATE TABLE `products`');
    await categoryRepository.query('TRUNCATE TABLE `collections`');
    await categoryRepository.query('TRUNCATE TABLE `categories`');
    await categoryRepository.query('TRUNCATE TABLE `colors`');
    await categoryRepository.query('TRUNCATE TABLE `product_sizes`');
    await categoryRepository.query('SET FOREIGN_KEY_CHECKS = 1');
    console.log('✅ Existing data cleared!\n');

    // ============ SEED CATEGORIES ============
    console.log('📁 Seeding Categories...');

    const colorRepository = dataSource.getRepository(ColorEntity);
    const sizeRepository = dataSource.getRepository(ProductSizeEntity);
    const productRepository = dataSource.getRepository(ProductEntity);
    const collectionRepository = dataSource.getRepository(CollectionEntity);
    const productColorRepository = dataSource.getRepository(ProductColorEntity);
    const productVariantRepository = dataSource.getRepository(ProductVariantEntity);
    const productImageRepository = dataSource.getRepository(ProductImageEntity);
    const collectionProductRepository = dataSource.getRepository(CollectionProductEntity);

    const categoriesToSeed = [
      // Root Categories
      {
        name: 'Nam',
        slug: 'nam',
        thumbnail: 'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891',
        parentId: null,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Nữ',
        slug: 'nu',
        thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
        parentId: null,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Trẻ em',
        slug: 'tre-em',
        thumbnail: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
        parentId: null,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Phụ kiện',
        slug: 'phu-kien',
        thumbnail: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234',
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
        thumbnail: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf',
        parentId: namId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Quần nam',
        slug: 'quan-nam',
        thumbnail: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a',
        parentId: namId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Giày nam',
        slug: 'giay-nam',
        thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        parentId: namId,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Áo khoác nam',
        slug: 'ao-khoac-nam',
        thumbnail: 'https://images.unsplash.com/photo-1551028719-00167b16eac5',
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
        thumbnail: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e',
        parentId: nuId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Quần nữ',
        slug: 'quan-nu',
        thumbnail: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
        parentId: nuId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Váy nữ',
        slug: 'vay-nu',
        thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8',
        parentId: nuId,
        isActive: true,
        sortOrder: 3,
      },
      {
        name: 'Đầm nữ',
        slug: 'dam-nu',
        thumbnail: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae',
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
        thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 1,
      },
      {
        name: 'Áo sơ mi nam',
        slug: 'ao-so-mi-nam',
        thumbnail: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 2,
      },
      {
        name: 'Áo polo nam',
        slug: 'ao-polo-nam',
        thumbnail: 'https://images.unsplash.com/photo-1626497764746-6dc36546b388',
        parentId: aoNamId,
        isActive: true,
        sortOrder: 3,
      },
    ];
    for (const catData of grandchildCategoriesAoNam) {
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
        hexCode: '#FF0000',
        thumbnailUrl: 'https://via.placeholder.com/50/FF0000/FFFFFF?text=R',
      },
      {
        name: 'Xanh dương',
        code: 'blue',
        hexCode: '#0000FF',
        thumbnailUrl: 'https://via.placeholder.com/50/0000FF/FFFFFF?text=B',
      },
      {
        name: 'Xanh lá',
        code: 'green',
        hexCode: '#00FF00',
        thumbnailUrl: 'https://via.placeholder.com/50/00FF00/FFFFFF?text=G',
      },
      {
        name: 'Vàng',
        code: 'yellow',
        hexCode: '#FFFF00',
        thumbnailUrl: 'https://via.placeholder.com/50/FFFF00/000000?text=Y',
      },
      {
        name: 'Cam',
        code: 'orange',
        hexCode: '#FFA500',
        thumbnailUrl: 'https://via.placeholder.com/50/FFA500/FFFFFF?text=O',
      },
      {
        name: 'Tím',
        code: 'purple',
        hexCode: '#800080',
        thumbnailUrl: 'https://via.placeholder.com/50/800080/FFFFFF?text=P',
      },
      {
        name: 'Hồng',
        code: 'pink',
        hexCode: '#FFC0CB',
        thumbnailUrl: 'https://via.placeholder.com/50/FFC0CB/000000?text=Pi',
      },
      {
        name: 'Đen',
        code: 'black',
        hexCode: '#000000',
        thumbnailUrl: 'https://via.placeholder.com/50/000000/FFFFFF?text=Bl',
      },
      {
        name: 'Trắng',
        code: 'white',
        hexCode: '#FFFFFF',
        thumbnailUrl: 'https://via.placeholder.com/50/FFFFFF/000000?text=W',
      },
      {
        name: 'Xám',
        code: 'gray',
        hexCode: '#808080',
        thumbnailUrl: 'https://via.placeholder.com/50/808080/FFFFFF?text=Gr',
      },
      {
        name: 'Navy',
        code: 'navy',
        hexCode: '#000080',
        thumbnailUrl: 'https://via.placeholder.com/50/000080/FFFFFF?text=N',
      },
      {
        name: 'Be',
        code: 'beige',
        hexCode: '#F5F5DC',
        thumbnailUrl: 'https://via.placeholder.com/50/F5F5DC/000000?text=Be',
      },
    ];

    const savedColors: any = {};
    for (const colorData of colorsToSeed) {
      const color = colorRepository.create(colorData);
      const savedColor = await colorRepository.save(color);
      savedColors[colorData.code] = savedColor.id;
    }
    console.log('✅ Colors seeded successfully!\n');

    // ============ SEED PRODUCT SIZES ============
    console.log('📏 Seeding Product Sizes...');

    const sizesToSeed = [
      { name: 'XS', code: 'xs' },
      { name: 'S', code: 's' },
      { name: 'M', code: 'm' },
      { name: 'L', code: 'l' },
      { name: 'XL', code: 'xl' },
      { name: 'XXL', code: 'xxl' },
      { name: '2XL', code: '2xl' },
      { name: '3XL', code: '3xl' },
      { name: 'Free Size', code: 'free' },
    ];

    const savedSizes: any = {};
    for (const sizeData of sizesToSeed) {
      const size = sizeRepository.create(sizeData);
      const savedSize = await sizeRepository.save(size);
      savedSizes[sizeData.code] = savedSize.id;
    }
    console.log('✅ Product Sizes seeded successfully!\n');

    // ============ SEED PRODUCTS ============
    console.log('🛍️  Seeding Products...');

    const aoThunNam = await categoryRepository.findOne({
      where: { slug: 'ao-thun-nam' },
    });
    const aoSoMiNam = await categoryRepository.findOne({
      where: { slug: 'ao-so-mi-nam' },
    });
    const quanNam = await categoryRepository.findOne({
      where: { slug: 'quan-nam' },
    });
    const aoNu = await categoryRepository.findOne({
      where: { slug: 'ao-nu' },
    });
    const damNu = await categoryRepository.findOne({
      where: { slug: 'dam-nu' },
    });

    const productsToSeed = [
      // Áo thun nam
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam basic cotton Premium',
        slug: 'ao-thun-nam-basic-cotton-premium',
        description: 'Áo thun nam chất liệu cotton 100% cao cấp, form regular fit thoải mái, thấm hút mồ hôi tốt.',
        price: 199000,
        salePrice: 149000,
        isActive: true,
      },
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam Polo trơn',
        slug: 'ao-thun-nam-polo-tron',
        description: 'Áo polo nam sang trọng, cổ bẻ phối viền, thích hợp đi làm và dạo phố.',
        price: 299000,
        salePrice: 249000,
        isActive: true,
      },
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam oversize form rộng',
        slug: 'ao-thun-nam-oversize-form-rong',
        description: 'Áo thun nam form oversize trendy, phù hợp phong cách streetwear.',
        price: 249000,
        salePrice: null,
        isActive: true,
      },
      {
        categoryId: aoThunNam?.id || 1,
        name: 'Áo thun nam cổ tròn Premium Basics',
        slug: 'ao-thun-nam-co-tron-premium-basics',
        description: 'Áo thun basic thiết kế tối giản, chất vải mềm mại, co giãn nhẹ.',
        price: 179000,
        salePrice: 139000,
        isActive: true,
      },
      // Áo sơ mi nam
      {
        categoryId: aoSoMiNam?.id || 1,
        name: 'Áo sơ mi nam dài tay công sở',
        slug: 'ao-so-mi-nam-dai-tay-cong-so',
        description: 'Áo sơ mi nam dài tay chất vải cao cấp, chống nhăn, phù hợp môi trường công sở.',
        price: 399000,
        salePrice: 349000,
        isActive: true,
      },
      {
        categoryId: aoSoMiNam?.id || 1,
        name: 'Áo sơ mi nam Oxford cao cấp',
        slug: 'ao-so-mi-nam-oxford-cao-cap',
        description: 'Áo sơ mi vải Oxford dày dặn, form slim fit thanh lịch.',
        price: 449000,
        salePrice: null,
        isActive: true,
      },
      // Quần nam
      {
        categoryId: quanNam?.id || 1,
        name: 'Quần jean nam slim fit xanh đậm',
        slug: 'quan-jean-nam-slim-fit-xanh-dam',
        description: 'Quần jean nam form slim fit ôm vừa vặn, chất vải denim co giãn nhẹ.',
        price: 499000,
        salePrice: 399000,
        isActive: true,
      },
      {
        categoryId: quanNam?.id || 1,
        name: 'Quần kaki nam công sở Regular Fit',
        slug: 'quan-kaki-nam-cong-so-regular-fit',
        description: 'Quần kaki nam chất vải cao cấp, form regular thoải mái, phù hợp đi làm.',
        price: 379000,
        salePrice: 329000,
        isActive: true,
      },
      {
        categoryId: quanNam?.id || 1,
        name: 'Quần jogger nam thể thao',
        slug: 'quan-jogger-nam-the-thao',
        description: 'Quần jogger nam form thể thao, chất vải thun co giãn tốt, thoải mái vận động.',
        price: 299000,
        salePrice: null,
        isActive: true,
      },
      // Nữ
      {
        categoryId: aoNu?.id || 2,
        name: 'Áo thun nữ basic form fitted',
        slug: 'ao-thun-nu-basic-form-fitted',
        description: 'Áo thun nữ form fitted ôm dáng, chất cotton mềm mại.',
        price: 179000,
        salePrice: 149000,
        isActive: true,
      },
      {
        categoryId: aoNu?.id || 2,
        name: 'Áo kiểu nữ tay bồng vintage',
        slug: 'ao-kieu-nu-tay-bong-vintage',
        description: 'Áo kiểu nữ thiết kế tay bồng điệu đà, phong cách vintage.',
        price: 259000,
        salePrice: 219000,
        isActive: true,
      },
      {
        categoryId: aoNu?.id || 2,
        name: 'Áo croptop nữ trẻ trung năng động',
        slug: 'ao-croptop-nu-tre-trung-nang-dong',
        description: 'Áo croptop nữ form ngắn trendy, phối đồ đa dạng.',
        price: 159000,
        salePrice: null,
        isActive: true,
      },
      // Đầm nữ
      {
        categoryId: damNu?.id || 2,
        name: 'Váy đầm nữ babydoll dễ thương',
        slug: 'vay-dam-nu-babydoll-de-thuong',
        description: 'Váy đầm babydoll xinh xắn, thiết kế xòe nhẹ, phù hợp dạo phố.',
        price: 349000,
        salePrice: 299000,
        isActive: true,
      },
      {
        categoryId: damNu?.id || 2,
        name: 'Đầm maxi nữ dài elegant',
        slug: 'dam-maxi-nu-dai-elegant',
        description: 'Đầm maxi dài thanh lịch, thích hợp dự tiệc và sự kiện.',
        price: 599000,
        salePrice: 499000,
        isActive: true,
      },
      {
        categoryId: damNu?.id || 2,
        name: 'Đầm suông nữ công sở',
        slug: 'dam-suong-nu-cong-so',
        description: 'Đầm suông nữ form A đơn giản, phù hợp môi trường công sở.',
        price: 429000,
        salePrice: null,
        isActive: true,
      },
    ];

    const savedProducts: any[] = [];
    for (const productData of productsToSeed) {
      const product = productRepository.create(productData);
      const savedProduct = await productRepository.save(product);
      savedProducts.push(savedProduct);
    }
    console.log('✅ Products seeded successfully!\n');

    // ============ SEED PRODUCT COLORS ============
    console.log('🌈 Seeding Product Colors (linking products with colors)...');

    const productColorsToSeed: any[] = [];

    // Mỗi sản phẩm có 2-4 màu
    for (const product of savedProducts) {
      const productIndex = savedProducts.indexOf(product);
      
      if (productIndex % 3 === 0) {
        // Sản phẩm 0, 3, 6, 9, 12: Đen, Trắng, Xám, Navy
        productColorsToSeed.push(
          { productId: product.id, colorId: savedColors['black'] },
          { productId: product.id, colorId: savedColors['white'] },
          { productId: product.id, colorId: savedColors['gray'] },
          { productId: product.id, colorId: savedColors['navy'] },
        );
      } else if (productIndex % 3 === 1) {
        // Sản phẩm 1, 4, 7, 10, 13: Xanh, Đỏ, Be
        productColorsToSeed.push(
          { productId: product.id, colorId: savedColors['blue'] },
          { productId: product.id, colorId: savedColors['red'] },
          { productId: product.id, colorId: savedColors['beige'] },
        );
      } else {
        // Sản phẩm 2, 5, 8, 11, 14: Đen, Hồng, Tím
        productColorsToSeed.push(
          { productId: product.id, colorId: savedColors['black'] },
          { productId: product.id, colorId: savedColors['pink'] },
          { productId: product.id, colorId: savedColors['purple'] },
        );
      }
    }

    const savedProductColors: any[] = [];
    for (const pcData of productColorsToSeed) {
      const productColor = productColorRepository.create(pcData);
      const savedPC = await productColorRepository.save(productColor);
      savedProductColors.push(savedPC);
    }
    console.log('✅ Product Colors seeded successfully!\n');

    // ============ SEED PRODUCT IMAGES ============
    console.log('🖼️  Seeding Product Images (for each color)...');

    const imagesToSeed: any[] = [];

    for (const productColor of savedProductColors) {
      const colorCode = Object.keys(savedColors).find(
        (key) => savedColors[key] === productColor.colorId,
      );
      const hexCode =
        colorsToSeed.find((c) => c.code === colorCode)?.hexCode || '808080';

      // Mỗi màu có 3-4 ảnh
      imagesToSeed.push(
        {
          productColorId: productColor.id,
          imageUrl: `https://via.placeholder.com/800/${hexCode.slice(1)}/FFFFFF?text=Main+Image`,
          isMain: true,
          sortOrder: 1,
        },
        {
          productColorId: productColor.id,
          imageUrl: `https://via.placeholder.com/800/${hexCode.slice(1)}/FFFFFF?text=Image+2`,
          isMain: false,
          sortOrder: 2,
        },
        {
          productColorId: productColor.id,
          imageUrl: `https://via.placeholder.com/800/${hexCode.slice(1)}/FFFFFF?text=Image+3`,
          isMain: false,
          sortOrder: 3,
        },
      );
    }

    for (const imageData of imagesToSeed) {
      const image = productImageRepository.create(imageData);
      await productImageRepository.save(image);
    }
    console.log('✅ Product Images seeded successfully!\n');

    // ============ SEED PRODUCT VARIANTS ============
    console.log('🔀 Seeding Product Variants (color + size combinations)...');

    const variantsToSeed: any[] = [];

    // Tạo variants cho mỗi product color với các size khác nhau
    for (const productColor of savedProductColors) {
      const product = savedProducts.find((p) => p.id === productColor.productId);
      if (!product) continue;

      // Mỗi màu có 3-4 size
      const sizeCodes = ['s', 'm', 'l', 'xl'];
      
      for (const sizeCode of sizeCodes) {
        const sizeId = savedSizes[sizeCode];
        if (!sizeId) continue;

        const sku = `${product.slug}-${Object.keys(savedColors).find(k => savedColors[k] === productColor.colorId)}-${sizeCode}`.toUpperCase();
        
        variantsToSeed.push({
          productId: product.id,
          colorId: productColor.id,
          sizeId: sizeId,
          sku: sku,
          price: product.price,
          stock: Math.floor(Math.random() * 100) + 20, // 20-120
          status: 'active',
        });
      }
    }

    for (const variantData of variantsToSeed) {
      const variant = productVariantRepository.create(variantData);
      await productVariantRepository.save(variant);
    }
    console.log('✅ Product Variants seeded successfully!\n');

    // ============ SEED COLLECTIONS ============
    console.log('📦 Seeding Collections...');

    const collectionsToSeed = [
      {
        name: 'Bộ sưu tập mùa hè 2024',
        slug: 'bo-suu-tap-mua-he-2024',
        description: 'Bộ sưu tập thời trang mùa hè sôi động, tươi mới với những gam màu tươi sáng.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập xuân 2024',
        slug: 'bo-suu-tap-xuan-2024',
        description: 'Bộ sưu tập xuân ngọt ngào với những họa tiết hoa lá.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập công sở',
        slug: 'bo-suu-tap-cong-so',
        description: 'Bộ sưu tập thời trang công sở lịch sự, chuyên nghiệp.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập Streetwear',
        slug: 'bo-suu-tap-streetwear',
        description: 'Bộ sưu tập phong cách đường phố năng động, cá tính.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
        isActive: true,
      },
      {
        name: 'Bộ sưu tập Premium',
        slug: 'bo-suu-tap-premium',
        description: 'Bộ sưu tập cao cấp với chất liệu và thiết kế đẳng cấp.',
        thumbnailUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04',
        isActive: true,
      },
    ];

    const savedCollections: any[] = [];
    for (const collectionData of collectionsToSeed) {
      const collection = collectionRepository.create(collectionData);
      const savedCollection = await collectionRepository.save(collection);
      savedCollections.push(savedCollection);
    }
    console.log('✅ Collections seeded successfully!\n');

    // ============ SEED COLLECTION PRODUCTS ============
    console.log('🔗 Seeding Collection Products...');

    const collectionProductsToSeed: any[] = [];

    // Phân phối sản phẩm vào collections
    if (savedCollections.length > 0 && savedProducts.length > 0) {
      // Summer collection - sản phẩm 0-4
      for (let i = 0; i < Math.min(5, savedProducts.length); i++) {
        collectionProductsToSeed.push({
          collectionId: savedCollections[0].id,
          productId: savedProducts[i].id,
          sortOrder: i + 1,
        });
      }

      // Spring collection - sản phẩm 3-7
      for (let i = 3; i < Math.min(8, savedProducts.length); i++) {
        collectionProductsToSeed.push({
          collectionId: savedCollections[1].id,
          productId: savedProducts[i].id,
          sortOrder: i - 2,
        });
      }

      // Office collection - sản phẩm có sơ mi, kaki
      [4, 5, 7, 14].forEach((idx, order) => {
        if (idx < savedProducts.length) {
          collectionProductsToSeed.push({
            collectionId: savedCollections[2].id,
            productId: savedProducts[idx].id,
            sortOrder: order + 1,
          });
        }
      });

      // Streetwear collection - sản phẩm oversize, jogger
      [2, 8, 11].forEach((idx, order) => {
        if (idx < savedProducts.length) {
          collectionProductsToSeed.push({
            collectionId: savedCollections[3].id,
            productId: savedProducts[idx].id,
            sortOrder: order + 1,
          });
        }
      });

      // Premium collection - sản phẩm cao cấp
      [5, 6, 13, 14].forEach((idx, order) => {
        if (idx < savedProducts.length) {
          collectionProductsToSeed.push({
            collectionId: savedCollections[4].id,
            productId: savedProducts[idx].id,
            sortOrder: order + 1,
          });
        }
      });
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
    const totalProductColors = await productColorRepository.count();
    const totalVariants = await productVariantRepository.count();
    const totalImages = await productImageRepository.count();
    const totalCollections = await collectionRepository.count();
    const totalCollectionProducts = await collectionProductRepository.count();

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 SEED SUMMARY:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📁 Categories: ${totalCategories}`);
    console.log(`🎨 Colors (with hex codes): ${totalColors}`);
    console.log(`📏 Product Sizes: ${totalSizes}`);
    console.log(`🛍️  Products: ${totalProducts}`);
    console.log(`🌈 Product Colors: ${totalProductColors}`);
    console.log(`🔀 Product Variants: ${totalVariants}`);
    console.log(`🖼️  Product Images: ${totalImages}`);
    console.log(`📦 Collections: ${totalCollections}`);
    console.log(`🔗 Collection Products: ${totalCollectionProducts}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    console.log('💡 Note: Carts and Orders will be created when users interact with the app.\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await dataSource.destroy();
    console.log('🔌 Database connection closed');
  }
}

seedAll().then(() => console.log('🎉 All seeds completed successfully!'));
