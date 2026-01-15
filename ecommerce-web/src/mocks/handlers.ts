import { http, HttpResponse } from 'msw';

const API_BASE_URL = 'http://localhost:4000/api';

// ============================================
// MOCK DATA - Categories Tree
// ============================================
const mockCategoriesTree = {
  data: {
    status: 200,
    message: 'Success',
    success: true,
    result: [
      {
        id: 1,
        name: 'NAM',
        slug: 'nam',
        thumbnail: '/images/categories/imagepr.webp',
        parentId: null,
        isActive: true,
        sortOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: 2,
            name: 'Áo khoác nam',
            slug: 'ao-khoac-nam',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 1,
            isActive: true,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: 3,
                name: 'Áo chống nắng nam',
                slug: 'ao-chong-nang-nam',
                thumbnail: null,
                parentId: 2,
                isActive: true,
                sortOrder: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 4,
                name: 'Áo vest nam',
                slug: 'ao-vest-nam',
                thumbnail: null,
                parentId: 2,
                isActive: true,
                sortOrder: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 5,
                name: 'Áo gió nam',
                slug: 'ao-gio-nam',
                thumbnail: null,
                parentId: 2,
                isActive: true,
                sortOrder: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 6,
                name: 'Áo phao nam',
                slug: 'ao-phao-nam',
                thumbnail: null,
                parentId: 2,
                isActive: true,
                sortOrder: 4,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
          {
            id: 7,
            name: 'Áo nam',
            slug: 'ao-nam',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 1,
            isActive: true,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: 8,
                name: 'Áo thun nam',
                slug: 'ao-thun-nam',
                thumbnail: null,
                parentId: 7,
                isActive: true,
                sortOrder: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 9,
                name: 'Áo sơ mi nam',
                slug: 'ao-so-mi-nam',
                thumbnail: null,
                parentId: 7,
                isActive: true,
                sortOrder: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 10,
                name: 'Áo polo nam',
                slug: 'ao-polo-nam',
                thumbnail: null,
                parentId: 7,
                isActive: true,
                sortOrder: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 11,
                name: 'Áo len nam',
                slug: 'ao-len-nam',
                thumbnail: null,
                parentId: 7,
                isActive: true,
                sortOrder: 4,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
          {
            id: 12,
            name: 'Quần nam',
            slug: 'quan-nam',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 1,
            isActive: true,
            sortOrder: 3,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: 13,
                name: 'Quần jean nam',
                slug: 'quan-jean-nam',
                thumbnail: null,
                parentId: 12,
                isActive: true,
                sortOrder: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 14,
                name: 'Quần kaki nam',
                slug: 'quan-kaki-nam',
                thumbnail: null,
                parentId: 12,
                isActive: true,
                sortOrder: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 15,
                name: 'Quần short nam',
                slug: 'quan-short-nam',
                thumbnail: null,
                parentId: 12,
                isActive: true,
                sortOrder: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 16,
                name: 'Quần âu nam',
                slug: 'quan-au-nam',
                thumbnail: null,
                parentId: 12,
                isActive: true,
                sortOrder: 4,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        ],
      },
      {
        id: 20,
        name: 'NỮ',
        slug: 'nu',
        thumbnail: '/images/categories/imagepr.webp',
        parentId: null,
        isActive: true,
        sortOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: 21,
            name: 'Áo khoác nữ',
            slug: 'ao-khoac-nu',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 20,
            isActive: true,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: 22,
                name: 'Áo vest nữ',
                slug: 'ao-vest-nu',
                thumbnail: null,
                parentId: 21,
                isActive: true,
                sortOrder: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 23,
                name: 'Áo blazer nữ',
                slug: 'ao-blazer-nu',
                thumbnail: null,
                parentId: 21,
                isActive: true,
                sortOrder: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 24,
                name: 'Áo khoác dạ nữ',
                slug: 'ao-khoac-da-nu',
                thumbnail: null,
                parentId: 21,
                isActive: true,
                sortOrder: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
          {
            id: 25,
            name: 'Áo nữ',
            slug: 'ao-nu',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 20,
            isActive: true,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            children: [
              {
                id: 26,
                name: 'Áo thun nữ',
                slug: 'ao-thun-nu',
                thumbnail: null,
                parentId: 25,
                isActive: true,
                sortOrder: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 27,
                name: 'Áo sơ mi nữ',
                slug: 'ao-so-mi-nu',
                thumbnail: null,
                parentId: 25,
                isActive: true,
                sortOrder: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
              {
                id: 28,
                name: 'Áo đầm nữ',
                slug: 'ao-dam-nu',
                thumbnail: null,
                parentId: 25,
                isActive: true,
                sortOrder: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            ],
          },
        ],
      },
      {
        id: 30,
        name: 'TRẺ EM',
        slug: 'tre-em',
        thumbnail: '/images/categories/imagepr.webp',
        parentId: null,
        isActive: true,
        sortOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        children: [
          {
            id: 31,
            name: 'Áo khoác trẻ em',
            slug: 'ao-khoac-tre-em',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 30,
            isActive: true,
            sortOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 32,
            name: 'Áo trẻ em',
            slug: 'ao-tre-em',
            thumbnail: '/images/categories/imagepr.webp',
            parentId: 30,
            isActive: true,
            sortOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    ],
  },
};

// ============================================
// MOCK DATA - Collections with Products
// ============================================
const mockCollectionsWithProducts = {
  data: {
    status: 200,
    message: 'Success',
    success: true,
    result: [
      {
        id: 1,
        name: 'Everyday Basics',
        slug: 'everyday-basics',
        description: 'Sản phẩm tốt - Giá trải nghiệm',
        thumbnailUrl: 'https://buggy.yodycdn.com/images/home-collection-product-dt/ea652794cd4bb0a8c155c640f5df7f6a.webp?width=2688&height=360',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [
          {
            id: 101,
            name: 'Áo thun nam basic',
            slug: 'ao-thun-nam-basic',
            description: 'Áo thun nam chất liệu cotton cao cấp',
            price: 199000,
            isActive: true,
            category: {
              id: 8,
              name: 'Áo thun nam',
              slug: 'ao-thun-nam',
            },
            displayOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          {
            id: 102,
            name: 'Áo polo nam trơn',
            slug: 'ao-polo-nam-tron',
            description: 'Áo polo nam thiết kế trẻ trung',
            price: 249000,
            isActive: true,
            category: {
              id: 10,
              name: 'Áo polo nam',
              slug: 'ao-polo-nam',
            },
            displayOrder: 2,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: 2,
        name: 'BST ÁO GIÓ',
        slug: 'bst-ao-gio',
        description: 'Chờ như gió thôi - Giá tốt',
        thumbnailUrl: 'https://buggy.yodycdn.com/images/home-collection-product-dt/f1f7457593a39f0712c619e68a6260b6.webp?width=2688&height=360',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [
          {
            id: 201,
            name: 'Áo gió nam 2 lớp',
            slug: 'ao-gio-nam-2-lop',
            description: 'Áo gió chống thấm nước hiệu quả',
            price: 399000,
            isActive: true,
            category: {
              id: 5,
              name: 'Áo gió nam',
              slug: 'ao-gio-nam',
            },
            displayOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: 3,
        name: 'SMART COOL',
        slug: 'smart-cool',
        description: 'Công nghệ làm mát thông minh',
        thumbnailUrl: 'https://buggy.yodycdn.com/images/home-collection-product-dt/e7fc7e3e6316ba92dacec7ec6dcf25c1.webp?width=2688&height=360',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        products: [
          {
            id: 301,
            name: 'Áo thun Smart Cool',
            slug: 'ao-thun-smart-cool',
            description: 'Áo thun công nghệ làm mát',
            price: 299000,
            isActive: true,
            category: {
              id: 8,
              name: 'Áo thun nam',
              slug: 'ao-thun-nam',
            },
            displayOrder: 1,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ],
      },
     
    ],
  },
};

// ============================================
// MOCK PRODUCTS LIST for Search (with colors)
// ============================================
const mockColors = [
  {
    id: 1,
    name: 'Trắng',
    code: 'white',
    hexCode: '#FFFFFF',
    thumbnailUrl: '/images/product/product-detail.webp',
    productColorId: 101,
    images: [
      {
        id: 1,
        imageUrl: '/images/product/product-detail.webp',
        isMain: true,
        sortOrder: 1,
      },
    ],
    sizes: [
      { id: 1, name: 'S', code: 'S', stock: 10 },
      { id: 2, name: 'M', code: 'M', stock: 15 },
      { id: 3, name: 'L', code: 'L', stock: 20 },
    ],
  },
  {
    id: 2,
    name: 'Đen',
    code: 'black',
    hexCode: '#000000',
    thumbnailUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
    productColorId: 102,
    images: [
      {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
        isMain: true,
        sortOrder: 1,
      },
    ],
    sizes: [
      { id: 1, name: 'S', code: 'S', stock: 10 },
      { id: 2, name: 'M', code: 'M', stock: 15 },
      { id: 3, name: 'L', code: 'L', stock: 20 },
    ],
  },
  {
    id: 3,
    name: 'Xanh Navy',
    code: 'navy',
    hexCode: '#001f3f',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=200&h=200&fit=crop',
    productColorId: 103,
    images: [
      {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
        isMain: true,
        sortOrder: 1,
      },
    ],
    sizes: [
      { id: 1, name: 'S', code: 'S', stock: 10 },
      { id: 2, name: 'M', code: 'M', stock: 15 },
      { id: 3, name: 'L', code: 'L', stock: 20 },
    ],
  },
];

// Flatten all products from collections and add colors
const mockProductsList = mockCollectionsWithProducts.data.result.flatMap((collection: any) =>
  collection.products.map((product: any, index: number) => ({
    ...product,
    colors: [
      mockColors[0],
      mockColors[1],
      ...(index % 3 === 0 ? [mockColors[2]] : []),
    ],
    salePrice: index % 2 === 0 ? Math.floor(product.price * 0.8) : null,
  }))
);

// Additional mock products for variety
const additionalMockProducts = [
  {
    id: 401,
    name: 'Quần jean nam slim fit',
    slug: 'quan-jean-nam-slim-fit',
    description: 'Quần jean nam co giãn thoải mái',
    price: 399000,
    salePrice: 349000,
    isActive: true,
    category: { id: 14, name: 'Quần jean nam', slug: 'quan-jean-nam' },
    colors: [mockColors[1], mockColors[2]],
  },
  {
    id: 402,
    name: 'Áo khoác bomber nam',
    slug: 'ao-khoac-bomber-nam',
    description: 'Áo khoác bomber phong cách Hàn Quốc',
    price: 599000,
    isActive: true,
    category: { id: 2, name: 'Áo khoác nam', slug: 'ao-khoac-nam' },
    colors: [mockColors[0], mockColors[1]],
  },
  {
    id: 403,
    name: 'Giày sneaker trắng',
    slug: 'giay-sneaker-trang',
    description: 'Giày sneaker basic phối đồ dễ dàng',
    price: 799000,
    salePrice: 699000,
    isActive: true,
    category: { id: 20, name: 'Giày dép', slug: 'giay-dep' },
    colors: [mockColors[0]],
  },
  {
    id: 404,
    name: 'Quần kaki nam',
    slug: 'quan-kaki-nam',
    description: 'Quần kaki form regular thoải mái',
    price: 349000,
    isActive: true,
    category: { id: 12, name: 'Quần kaki nam', slug: 'quan-kaki-nam' },
    colors: [mockColors[1], mockColors[2], mockColors[0]],
  },
  {
    id: 405,
    name: 'Áo sơ mi nam dài tay',
    slug: 'ao-so-mi-nam-dai-tay',
    description: 'Áo sơ mi nam công sở',
    price: 299000,
    salePrice: 249000,
    isActive: true,
    category: { id: 9, name: 'Áo sơ mi nam', slug: 'ao-so-mi-nam' },
    colors: [mockColors[0], mockColors[1]],
  },
];

// Combine all products
const allMockProducts = [...mockProductsList, ...additionalMockProducts];

// ============================================
// MOCK DATA - Product Detail with Variants
// ============================================
const createMockProductDetail = (colorId: number | null, sizeId: number | null) => {
  // Define colors with their images
  const colors = [
    {
      id: 1,
      name: 'Trắng',
      code: 'white',
      hexCode: '#FFFFFF',
      thumbnailUrl: '/images/product/product-detail.webp',
      productColorId: 101,
      images: [
        {
          id: 1,
          imageUrl: '/images/product/product-detail.webp',
          isMain: true,
          sortOrder: 1,
        },
        {
          id: 2,
          imageUrl: '/images/banner/banner-web-destop.webp',
          isMain: false,
          sortOrder: 2,
        },
        {
          id: 3,
          imageUrl: '/images/banner/banner-web1.webp',
          isMain: false,
          sortOrder: 3,
        },
      ],
      sizes: [
        { id: 1, name: 'S', code: 'S' },
        { id: 2, name: 'M', code: 'M' },
        { id: 3, name: 'L', code: 'L' },
        { id: 4, name: 'XL', code: 'XL' },
        { id: 5, name: 'XXL', code: 'XXL' },
      ],
      variants: [
        {
          id: 1001,
          sku: 'ATN-BASIC-WHITE-S',
          price: 199000,
          stock: 20,
          status: 'active' as const,
          sizeId: 1,
          sizeName: 'S',
          sizeCode: 'S',
        },
        {
          id: 1002,
          sku: 'ATN-BASIC-WHITE-M',
          price: 199000,
          stock: 50,
          status: 'active' as const,
          sizeId: 2,
          sizeName: 'M',
          sizeCode: 'M',
        },
        {
          id: 1003,
          sku: 'ATN-BASIC-WHITE-L',
          price: 199000,
          stock: 30,
          status: 'active' as const,
          sizeId: 3,
          sizeName: 'L',
          sizeCode: 'L',
        },
        {
          id: 1004,
          sku: 'ATN-BASIC-WHITE-XL',
          price: 199000,
          stock: 15,
          status: 'active' as const,
          sizeId: 4,
          sizeName: 'XL',
          sizeCode: 'XL',
        },
        {
          id: 1005,
          sku: 'ATN-BASIC-WHITE-XXL',
          price: 199000,
          stock: 10,
          status: 'active' as const,
          sizeId: 5,
          sizeName: 'XXL',
          sizeCode: 'XXL',
        },
      ],
    },
    {
      id: 2,
      name: 'Đen',
      code: 'black',
      hexCode: '#000000',
      thumbnailUrl: '/images/product/product-detail-1.webp',
      productColorId: 102,
      images: [
        {
          id: 11,
          imageUrl: '/images/product/product-detail-1.webp',
          isMain: true,
          sortOrder: 1,
        },
        {
          id: 12,
          imageUrl: '/images/banner/banner-web-destop2.webp',
          isMain: false,
          sortOrder: 2,
        },
        {
          id: 13,
          imageUrl: '/images/banner/banner-web2.webp',
          isMain: false,
          sortOrder: 3,
        },
      ],
      sizes: [
        { id: 1, name: 'S', code: 'S' },
        { id: 2, name: 'M', code: 'M' },
        { id: 3, name: 'L', code: 'L' },
        { id: 4, name: 'XL', code: 'XL' },
        { id: 5, name: 'XXL', code: 'XXL' },
      ],
      variants: [
        {
          id: 2001,
          sku: 'ATN-BASIC-BLACK-S',
          price: 199000,
          stock: 25,
          status: 'active' as const,
          sizeId: 1,
          sizeName: 'S',
          sizeCode: 'S',
        },
        {
          id: 2002,
          sku: 'ATN-BASIC-BLACK-M',
          price: 199000,
          stock: 45,
          status: 'active' as const,
          sizeId: 2,
          sizeName: 'M',
          sizeCode: 'M',
        },
        {
          id: 2003,
          sku: 'ATN-BASIC-BLACK-L',
          price: 199000,
          stock: 35,
          status: 'active' as const,
          sizeId: 3,
          sizeName: 'L',
          sizeCode: 'L',
        },
        {
          id: 2004,
          sku: 'ATN-BASIC-BLACK-XL',
          price: 199000,
          stock: 20,
          status: 'active' as const,
          sizeId: 4,
          sizeName: 'XL',
          sizeCode: 'XL',
        },
        {
          id: 2005,
          sku: 'ATN-BASIC-BLACK-XXL',
          price: 199000,
          stock: 12,
          status: 'active' as const,
          sizeId: 5,
          sizeName: 'XXL',
          sizeCode: 'XXL',
        },
      ],
    },
    {
      id: 3,
      name: 'Xanh Navy',
      code: 'navy',
      hexCode: '#001f3f',
      thumbnailUrl: '/images/banner/banner-web-destop3.webp',
      productColorId: 103,
      images: [
        {
          id: 21,
          imageUrl: '/images/banner/banner-web-destop3.webp',
          isMain: true,
          sortOrder: 1,
        },
        {
          id: 22,
          imageUrl: '/images/banner/banner-web3.webp',
          isMain: false,
          sortOrder: 2,
        },
        {
          id: 23,
          imageUrl: '/images/blog/blog-img.webp',
          isMain: false,
          sortOrder: 3,
        },
      ],
      sizes: [
        { id: 1, name: 'S', code: 'S' },
        { id: 2, name: 'M', code: 'M' },
        { id: 3, name: 'L', code: 'L' },
        { id: 4, name: 'XL', code: 'XL' },
        { id: 5, name: 'XXL', code: 'XXL' },
      ],
      variants: [
        {
          id: 3001,
          sku: 'ATN-BASIC-NAVY-S',
          price: 199000,
          stock: 18,
          status: 'active' as const,
          sizeId: 1,
          sizeName: 'S',
          sizeCode: 'S',
        },
        {
          id: 3002,
          sku: 'ATN-BASIC-NAVY-M',
          price: 199000,
          stock: 40,
          status: 'active' as const,
          sizeId: 2,
          sizeName: 'M',
          sizeCode: 'M',
        },
        {
          id: 3003,
          sku: 'ATN-BASIC-NAVY-L',
          price: 199000,
          stock: 28,
          status: 'active' as const,
          sizeId: 3,
          sizeName: 'L',
          sizeCode: 'L',
        },
        {
          id: 3004,
          sku: 'ATN-BASIC-NAVY-XL',
          price: 199000,
          stock: 15,
          status: 'active' as const,
          sizeId: 4,
          sizeName: 'XL',
          sizeCode: 'XL',
        },
        {
          id: 3005,
          sku: 'ATN-BASIC-NAVY-XXL',
          price: 199000,
          stock: 8,
          status: 'active' as const,
          sizeId: 5,
          sizeName: 'XXL',
          sizeCode: 'XXL',
        },
      ],
    },
  ];

  // Determine selected color and size
  const selectedColor = colorId ? colors.find(c => c.id === colorId) || colors[0] : colors[0];
  const selectedSize = sizeId
    ? selectedColor.sizes.find(s => s.id === sizeId) || selectedColor.sizes[1]
    : selectedColor.sizes[1]; // Default to M

  // Create variants array (all combinations of colors and sizes)
  const allVariants = colors.flatMap(color =>
    color.variants.map(variant => ({
      id: variant.id,
      sku: variant.sku,
      price: variant.price,
      stock: variant.stock,
      status: variant.status,
      colorId: color.id,
      productColorId: color.productColorId,
      sizeId: variant.sizeId,
      color: {
        id: color.id,
        name: color.name,
        code: color.code,
        hexCode: color.hexCode,
      },
      size: {
        id: variant.sizeId!,
        name: variant.sizeName!,
        code: variant.sizeCode!,
      },
      images: color.images,
    }))
  );

  return {
    data: {
      status: 200,
      message: 'Success',
      success: true,
      result: {
        id: 101,
        name: 'Áo thun nam basic',
        slug: 'ao-thun-nam-basic',
        description:
          'Áo thun nam chất liệu cotton 100%, thoáng mát, thấm hút mồ hôi tốt. Thiết kế basic dễ phối đồ. Co giãn 4 chiều, thoải mái vận động.',
        price: 199000,
        salePrice: null,
        discountPercent: null,
        isActive: true,
        category: {
          id: 8,
          name: 'Áo thun nam',
          slug: 'ao-thun-nam',
        },
        selectedColorId: selectedColor.id,
        selectedSizeId: selectedSize.id,
        colors: colors,
        variants: allVariants,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    },
  };
};

// ============================================
// CART HELPERS - LocalStorage Management
// ============================================
const CART_STORAGE_KEY = 'ecommerce_cart';

interface CartItem {
  id: string; // unique cart item id
  productId: number;
  productName: string;
  productSlug: string;
  variantId: number;
  sku: string;
  colorId: number;
  colorName: string;
  colorHexCode: string | null;
  sizeId: number | null;
  sizeName: string | null;
  sizeCode: string | null;
  price: number;
  quantity: number;
  imageUrl: string;
  stock: number;
  addedAt: string;
}

interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}

// Get cart from localStorage
const getCartFromStorage = (): Cart => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartData) {
      return {
        items: [],
        totalItems: 0,
        totalPrice: 0,
        updatedAt: new Date().toISOString(),
      };
    }
    return JSON.parse(cartData);
  } catch (error) {
    console.error('Error reading cart from localStorage:', error);
    return {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date().toISOString(),
    };
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart: Cart): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Calculate cart totals
const calculateCartTotals = (items: CartItem[]): { totalItems: number; totalPrice: number } => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalItems, totalPrice };
};

// Generate unique cart item id
const generateCartItemId = (productId: number, variantId: number): string => {
  return `${productId}_${variantId}_${Date.now()}`;
};

// ============================================
// MSW HANDLERS
// ============================================
export const handlers = [
  // Get all categories tree
  http.get(`${API_BASE_URL}/categories/tree`, () => {
    return HttpResponse.json(mockCategoriesTree);
  }),

  // Get category by ID
  http.get(`${API_BASE_URL}/categories/:id`, ({ params }) => {
    const { id } = params;
    const categoryId = Number(id);

    // Find category in the tree
    const findCategory = (categories: any[]): any => {
      for (const cat of categories) {
        if (cat.id === categoryId) return cat;
        if (cat.children) {
          const found = findCategory(cat.children);
          if (found) return found;
        }
      }
      return null;
    };

    const category = findCategory(mockCategoriesTree.data.result);

    if (!category) {
      return HttpResponse.json(
        {
          data: {
            status: 404,
            message: 'Category not found',
            success: false,
            result: null,
          },
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Success',
        success: true,
        result: category,
      },
    });
  }),

  // Get all collections with products
  http.get(`${API_BASE_URL}/collections/with-products`, () => {
    return HttpResponse.json(mockCollectionsWithProducts);
  }),

  // Get product detail with variant
  http.get(`${API_BASE_URL}/product-variants/product/:slug`, ({ request }) => {
    const url = new URL(request.url);
    const colorId = url.searchParams.get('colorId');
    const sizeId = url.searchParams.get('sizeId');

    const parsedColorId = colorId ? Number(colorId) : null;
    const parsedSizeId = sizeId ? Number(sizeId) : null;

    const productDetail = createMockProductDetail(parsedColorId, parsedSizeId);

    return HttpResponse.json(productDetail);
  }),

  // Search products
  http.get(`${API_BASE_URL}/products/search`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('q') || '';
    const limit = parseInt(url.searchParams.get('limit') || '10');

    // Search from allMockProducts by name
    const searchResults = allMockProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Success',
        success: true,
        result: {
          items: searchResults.slice(0, limit),
          total: searchResults.length,
          query,
        },
      },
    });
  }),

  // Create category (POST)
  http.post(`${API_BASE_URL}/categories`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      {
        data: {
          status: 201,
          message: 'Category created successfully',
          success: true,
          result: {
            id: Math.floor(Math.random() * 10000),
            ...body,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        },
      },
      { status: 201 }
    );
  }),

  // ============================================
  // CART APIs
  // ============================================

  // Get cart
  http.get(`${API_BASE_URL}/cart`, () => {
    const cart = getCartFromStorage();
    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Success',
        success: true,
        result: cart,
      },
    });
  }),

  // Add item to cart
  http.post(`${API_BASE_URL}/cart/items`, async ({ request }) => {
    const body = (await request.json()) as {
      productId: number;
      productName: string;
      productSlug: string;
      variantId: number;
      sku: string;
      colorId: number;
      colorName: string;
      colorHexCode: string | null;
      sizeId: number | null;
      sizeName: string | null;
      sizeCode: string | null;
      price: number;
      quantity: number;
      imageUrl: string;
      stock: number;
    };

    // Validate required fields
    if (!body.productId || !body.variantId || !body.quantity) {
      return HttpResponse.json(
        {
          data: {
            status: 400,
            message: 'Missing required fields',
            success: false,
            result: null,
          },
        },
        { status: 400 }
      );
    }

    // Validate quantity
    if (body.quantity <= 0 || body.quantity > body.stock) {
      return HttpResponse.json(
        {
          data: {
            status: 400,
            message: `Invalid quantity. Available stock: ${body.stock}`,
            success: false,
            result: null,
          },
        },
        { status: 400 }
      );
    }

    const cart = getCartFromStorage();

    // Check if item already exists (same variantId)
    const existingItemIndex = cart.items.findIndex(item => item.variantId === body.variantId);

    if (existingItemIndex >= 0) {
      // Update quantity of existing item
      const existingItem = cart.items[existingItemIndex];
      const newQuantity = existingItem.quantity + body.quantity;

      // Check stock limit
      if (newQuantity > body.stock) {
        return HttpResponse.json(
          {
            data: {
              status: 400,
              message: `Cannot add more. Maximum stock available: ${body.stock}`,
              success: false,
              result: null,
            },
          },
          { status: 400 }
        );
      }

      cart.items[existingItemIndex].quantity = newQuantity;
      cart.items[existingItemIndex].addedAt = new Date().toISOString();
    } else {
      // Add new item to cart
      const newItem: CartItem = {
        id: generateCartItemId(body.productId, body.variantId),
        productId: body.productId,
        productName: body.productName,
        productSlug: body.productSlug,
        variantId: body.variantId,
        sku: body.sku,
        colorId: body.colorId,
        colorName: body.colorName,
        colorHexCode: body.colorHexCode,
        sizeId: body.sizeId,
        sizeName: body.sizeName,
        sizeCode: body.sizeCode,
        price: body.price,
        quantity: body.quantity,
        imageUrl: body.imageUrl,
        stock: body.stock,
        addedAt: new Date().toISOString(),
      };

      cart.items.unshift(newItem); // Add to beginning of array
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    cart.updatedAt = new Date().toISOString();

    // Save to localStorage
    saveCartToStorage(cart);

    return HttpResponse.json(
      {
        data: {
          status: 201,
          message: 'Item added to cart successfully',
          success: true,
          result: cart,
        },
      },
      { status: 201 }
    );
  }),

  // Update cart item quantity
  http.put(`${API_BASE_URL}/cart/items/:id`, async ({ params, request }) => {
    const { id } = params;
    const body = (await request.json()) as { quantity: number };

    if (!body.quantity || body.quantity <= 0) {
      return HttpResponse.json(
        {
          data: {
            status: 400,
            message: 'Invalid quantity',
            success: false,
            result: null,
          },
        },
        { status: 400 }
      );
    }

    const cart = getCartFromStorage();
    const itemIndex = cart.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json(
        {
          data: {
            status: 404,
            message: 'Cart item not found',
            success: false,
            result: null,
          },
        },
        { status: 404 }
      );
    }

    const item = cart.items[itemIndex];

    // Check stock limit
    if (body.quantity > item.stock) {
      return HttpResponse.json(
        {
          data: {
            status: 400,
            message: `Cannot update. Maximum stock available: ${item.stock}`,
            success: false,
            result: null,
          },
        },
        { status: 400 }
      );
    }

    // Update quantity
    cart.items[itemIndex].quantity = body.quantity;

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    cart.updatedAt = new Date().toISOString();

    // Save to localStorage
    saveCartToStorage(cart);

    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Cart item updated successfully',
        success: true,
        result: cart,
      },
    });
  }),

  // Remove cart item
  http.delete(`${API_BASE_URL}/cart/items/:id`, ({ params }) => {
    const { id } = params;
    const cart = getCartFromStorage();

    const itemIndex = cart.items.findIndex(item => item.id === id);

    if (itemIndex === -1) {
      return HttpResponse.json(
        {
          data: {
            status: 404,
            message: 'Cart item not found',
            success: false,
            result: null,
          },
        },
        { status: 404 }
      );
    }

    // Remove item
    cart.items.splice(itemIndex, 1);

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalPrice = totals.totalPrice;
    cart.updatedAt = new Date().toISOString();

    // Save to localStorage
    saveCartToStorage(cart);

    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Item removed from cart successfully',
        success: true,
        result: cart,
      },
    });
  }),

  // Clear cart
  http.delete(`${API_BASE_URL}/cart`, () => {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      totalPrice: 0,
      updatedAt: new Date().toISOString(),
    };

    saveCartToStorage(emptyCart);

    return HttpResponse.json({
      data: {
        status: 200,
        message: 'Cart cleared successfully',
        success: true,
        result: emptyCart,
      },
    });
  }),
];
