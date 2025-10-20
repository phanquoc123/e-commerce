export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subCategories?: SubCategory[];
}

export interface NavigationItem {
  id: string;
  label: string;
  slug: string;
  icon?: string;
}

export interface Collection {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  slug: string;
}

// Navigation menu chính
export const mainNavigation: NavigationItem[] = [
  { id: '1', label: 'BST THU ĐÔNG 2025', slug: '/bst-thu-dong-2025', icon: 'home' },
  { id: '2', label: 'CỬA HÀNG', slug: '/cua-hang', icon: 'store' },
  { id: '3', label: 'TIN TỨC', slug: '/tin-tuc', icon: 'news' },
  { id: '4', label: 'MỚI VỀ', slug: '/moi-ve', icon: 'gift' },
  { id: '5', label: 'ƯU ĐÃI', slug: '/uu-dai', icon: 'tag' },
  { id: '6', label: 'ĐỒNG PHỤC', slug: '/dong-phuc', icon: 'uniform' },
];

// Danh mục NAM
export const menCategories: Category[] = [
  {
    id: 'm1',
    name: 'Áo khoác nam',
    slug: '/nam/ao-khoac',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'm1-1', name: 'Tất cả', slug: '/nam/ao-khoac/tat-ca' },
      { id: 'm1-2', name: 'Áo chống nắng nam', slug: '/nam/ao-khoac/ao-chong-nang' },
      { id: 'm1-3', name: 'Áo vest nam', slug: '/nam/ao-khoac/ao-vest' },
      { id: 'm1-4', name: 'Áo gió nam', slug: '/nam/ao-khoac/ao-gio' },
      { id: 'm1-5', name: 'Áo phao nam', slug: '/nam/ao-khoac/ao-phao' },
    ],
  },
  {
    id: 'm2',
    name: 'Áo nam',
    slug: '/nam/ao',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'm2-1', name: 'Tất cả', slug: '/nam/ao/tat-ca' },
      { id: 'm2-2', name: 'Áo thun nam', slug: '/nam/ao/ao-thun' },
      { id: 'm2-3', name: 'Áo sơ mi nam', slug: '/nam/ao/ao-so-mi' },
      { id: 'm2-4', name: 'Áo polo nam', slug: '/nam/ao/ao-polo' },
      { id: 'm2-5', name: 'Áo len nam', slug: '/nam/ao/ao-len' },
    ],
  },
  {
    id: 'm3',
    name: 'Quần nam',
    slug: '/nam/quan',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'm3-1', name: 'Tất cả', slug: '/nam/quan/tat-ca' },
      { id: 'm3-2', name: 'Quần jean nam', slug: '/nam/quan/quan-jean' },
      { id: 'm3-3', name: 'Quần kaki nam', slug: '/nam/quan/quan-kaki' },
      { id: 'm3-4', name: 'Quần short nam', slug: '/nam/quan/quan-short' },
      { id: 'm3-5', name: 'Quần âu nam', slug: '/nam/quan/quan-au' },
    ],
  },
  {
    id: 'm4',
    name: 'Đồ thể thao nam',
    slug: '/nam/do-the-thao',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'm4-1', name: 'Tất cả', slug: '/nam/do-the-thao/tat-ca' },
      { id: 'm4-2', name: 'Bộ thể thao nam', slug: '/nam/do-the-thao/bo' },
      { id: 'm4-3', name: 'Áo thể thao nam', slug: '/nam/do-the-thao/ao' },
      { id: 'm4-4', name: 'Quần thể thao nam', slug: '/nam/do-the-thao/quan' },
    ],
  },
  {
    id: 'm5',
    name: 'Đồ mặc trong & Đồ lót nam',
    slug: '/nam/do-mac-trong',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'm6',
    name: 'Sản phẩm khác',
    slug: '/nam/san-pham-khac',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'm7',
    name: 'Phụ kiện nam',
    slug: '/nam/phu-kien',
    icon: '/images/categories/imagepr.webp',
  },
];

// Danh mục NỮ
export const womenCategories: Category[] = [
  {
    id: 'w1',
    name: 'Áo khoác nữ',
    slug: '/nu/ao-khoac',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'w1-1', name: 'Tất cả', slug: '/nu/ao-khoac/tat-ca' },
      { id: 'w1-2', name: 'Áo vest nữ', slug: '/nu/ao-khoac/ao-vest' },
      { id: 'w1-3', name: 'Áo blazer nữ', slug: '/nu/ao-khoac/ao-blazer' },
      { id: 'w1-4', name: 'Áo khoác dạ nữ', slug: '/nu/ao-khoac/ao-khoac-da' },
    ],
  },
  {
    id: 'w2',
    name: 'Áo nữ',
    slug: '/nu/ao',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'w2-1', name: 'Tất cả', slug: '/nu/ao/tat-ca' },
      { id: 'w2-2', name: 'Áo thun nữ', slug: '/nu/ao/ao-thun' },
      { id: 'w2-3', name: 'Áo sơ mi nữ', slug: '/nu/ao/ao-so-mi' },
      { id: 'w2-4', name: 'Áo đầm nữ', slug: '/nu/ao/ao-dam' },
    ],
  },
  {
    id: 'w3',
    name: 'Quần nữ',
    slug: '/nu/quan',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'w3-1', name: 'Tất cả', slug: '/nu/quan/tat-ca' },
      { id: 'w3-2', name: 'Quần jean nữ', slug: '/nu/quan/quan-jean' },
      { id: 'w3-3', name: 'Quần kaki nữ', slug: '/nu/quan/quan-kaki' },
      { id: 'w3-4', name: 'Quần short nữ', slug: '/nu/quan/quan-short' },
    ],
  },
  {
    id: 'w4',
    name: 'Đồ thể thao nữ',
    slug: '/nu/do-the-thao',
    icon: '/images/categories/imagepr.webp',
    subCategories: [
      { id: 'w4-1', name: 'Tất cả', slug: '/nu/do-the-thao/tat-ca' },
      { id: 'w4-2', name: 'Bộ thể thao nữ', slug: '/nu/do-the-thao/bo' },
      { id: 'w4-3', name: 'Áo polo thể thao nữ', slug: '/nu/do-the-thao/ao-polo' },
      { id: 'w4-4', name: 'Áo thun thể thao nữ', slug: '/nu/do-the-thao/ao-thun' },
    ],
  },
  {
    id: 'w5',
    name: 'Đồ mặc trong & Đồ lót nữ',
    slug: '/nu/do-mac-trong',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'w6',
    name: 'Sản phẩm khác',
    slug: '/nu/san-pham-khac',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'w7',
    name: 'Phụ kiện nữ',
    slug: '/nu/phu-kien',
    icon: '/images/categories/imagepr.webp',
  },
];

// Danh mục TRẺ EM
export const kidsCategories: Category[] = [
  {
    id: 'k1',
    name: 'Áo khoác trẻ em',
    slug: '/tre-em/ao-khoac',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'k2',
    name: 'Áo trẻ em',
    slug: '/tre-em/ao',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'k3',
    name: 'Quần trẻ em',
    slug: '/tre-em/quan',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'k4',
    name: 'Đồ mặc trong trẻ em',
    slug: '/tre-em/do-mac-trong',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'k5',
    name: 'Sản phẩm khác',
    slug: '/tre-em/san-pham-khac',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'k6',
    name: 'Phụ kiện trẻ em',
    slug: '/tre-em/phu-kien',
    icon: '/images/categories/imagepr.webp',
  },
];

// Bộ sưu tập
export const collections: Collection[] = [
  {
    id: 'c1',
    title: 'Everyday Basics',
    subtitle: 'Sẵn phẩm tốt ✓\nGiá trai nghiệm',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
    slug: '/collection/everyday-basics',
  },
  {
    id: 'c2',
    title: 'BST ÁO GIÓ',
    subtitle: 'CHỜ NHƯ\nGIÓ THÔI\nGIÁ TỐT',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=300&fit=crop',
    slug: '/collection/ao-gio-yody',
  },
  {
    id: 'c3',
    title: 'SMART.\nCOOL',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1f88?w=500&h=300&fit=crop',
    slug: '/collection/smart-cool',
  },
  {
    id: 'c4',
    title: 'SMART.\nCOOL',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1f88?w=500&h=300&fit=crop',
    slug: '/collection/smart-cool',
  },
  {
    id: 'c5',
    title: 'SMART.\nCOOL',
    subtitle: '',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1f88?w=500&h=300&fit=crop',
    slug: '/collection/smart-cool',
  },
];

// Gender Categories Data (từ API)
export interface GenderCategory {
  id: string;
  title: string;
  slug: string;
  image?: string;
  categories: Category[];
}

export const genderCategoriesData: GenderCategory[] = [
  {
    id: 'men',
    title: 'NAM',
    slug: '/nam',
    image: '/images/categories/imagepr.webp',
    categories: menCategories,
  },
  {
    id: 'women',
    title: 'NỮ',
    slug: '/nu',
    image: '/images/categories/imagepr.webp',
    categories: womenCategories,
  },
  {
    id: 'kids',
    title: 'TRẺ EM',
    slug: '/tre-em',
    image: '/images/categories/imagepr.webp',
    categories: kidsCategories,
  },
];

// Mega Menu Data
export const megaMenuData = {
  navigation: mainNavigation,
  genderCategories: genderCategoriesData,
  men: {
    title: 'NAM',
    slug: '/nam',
    categories: menCategories,
  },
  women: {
    title: 'NỮ',
    slug: '/nu',
    categories: womenCategories,
  },
  kids: {
    title: 'TRẺ EM',
    slug: '/tre-em',
    categories: kidsCategories,
  },
  collections: {
    title: 'BỘ SƯU TẬP',
    image: '/images/categories/imagepr.webp',
    items: collections,
  },
};

export const mockProducts = Array.from({ length: 5 }, (_, i) => ({
  id: `product-${i + 1}`,
  name: `Sản phẩm ${i + 1}`,
  price: `${(i + 1) * 100000}đ`,
  image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop`,
  colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
  colorImages: {
    '#FF0000': `https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop&sat=100`,
    '#00FF00': `https://images.unsplash.com/photo-${1500000000000 + i + 1}?w=200&h=200&fit=crop&sat=100`,
    '#0000FF': `https://images.unsplash.com/photo-${1500000000000 + i + 2}?w=200&h=200&fit=crop&sat=100`,
    '#FFFF00': `https://images.unsplash.com/photo-${1500000000000 + i + 3}?w=200&h=200&fit=crop&sat=100`,
  },
}));

// Blog Posts Data
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  image: string;
  publishDate: string;
  excerpt?: string;
}

export const mockBlogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'HÀNH TRÌNH LAN TỎA YÊU THƯƠNG CỦA YODY ĐẾN VỚI BÀ CON BẮC NINH',
    slug: '/post/hanh-trinh-lan-toa-yeu-thuong-cua-yody-den-bac-ninh',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop',
    publishDate: '11/10/2025',
    excerpt: 'YODY cùng đồng hành với bà con Bắc Ninh trong chương trình từ thiện ý nghĩa'
  },
  {
    id: 'blog-2',
    title: 'MUA 2 ÁO GIÓ NHẬN NGAY QUÀ TẶNG ÁO THUN HOẶC POLO - ƯU ĐÃI MỪNG RA MẮT BST THU ĐÔNG',
    slug: '/post/mua-2-ao-gio-tang-qua',
    image: 'https://images.unsplash.com/photo-1544966503-7cc4ac81b9a1?w=500&h=300&fit=crop',
    publishDate: '9/10/2025',
    excerpt: 'Ưu đãi đặc biệt cho bộ sưu tập Thu Đông mới nhất'
  },
  {
    id: 'blog-3',
    title: 'YODY CHÍNH THỨC RA MẮT BỘ SƯU TẬP THU ĐÔNG 2025 "DÒNG CHẢY KẾT NỐI"',
    slug: '/post/yody-chinh-thuc-ra-mat-bo-suu-tap-thu-dong-2025',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
    publishDate: '9/10/2025',
    excerpt: 'Khám phá bộ sưu tập Thu Đông với thiết kế hiện đại và chất liệu cao cấp'
  },
  {
    id: 'blog-4',
    title: 'Top 7 mẫu áo gió chạy bộ YODY đáng mua nhất 2025',
    slug: '/post/ao-gio-chay-bo-yody',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=300&fit=crop',
    publishDate: '3/10/2025',
    excerpt: 'Tổng hợp những mẫu áo gió chạy bộ được yêu thích nhất'
  },
  {
    id: 'blog-5',
    title: '2 NĂM LIÊN TIẾP YODY VINH DỰ LÀ THƯƠNG HIỆU THỜI TRANG VIỆT LỌT TOP 10 ĐÔNG NAM Á',
    slug: '/post/yody-thuong-hieu-thoi-trang-viet-top-10-dong-nam-a',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
    publishDate: '3/10/2025',
    excerpt: 'Thành tựu đáng tự hào của thương hiệu thời trang Việt Nam'
  },
  {
    id: 'blog-6',
    title: 'BST THU ĐÔNG AW25 - DÒNG CHẢY KẾT NỐI',
    slug: '/post/bst-thu-dong-aw25-dong-chay-ket-noi',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea1f1f88?w=500&h=300&fit=crop',
    publishDate: '1/10/2025',
    excerpt: 'Khám phá ngay bộ sưu tập Thu Đông với thiết kế độc đáo'
  }
];
