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
  },
  {
    id: 'm2',
    name: 'Áo nam',
    slug: '/nam/ao',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'm3',
    name: 'Quần nam',
    slug: '/nam/quan',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'm4',
    name: 'Đồ thể thao nam',
    slug: '/nam/do-the-thao',
    icon: '/images/categories/imagepr.webp',
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
  },
  {
    id: 'w2',
    name: 'Áo nữ',
    slug: '/nu/ao',
    icon: '/images/categories/imagepr.webp',
  },
  {
    id: 'w3',
    name: 'Quần nữ',
    slug: '/nu/quan',
    icon: '/images/categories/imagepr.webp',
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
  categories: Category[];
}

export const genderCategoriesData: GenderCategory[] = [
  {
    id: 'men',
    title: 'NAM',
    slug: '/nam',
    categories: menCategories,
  },
  {
    id: 'women',
    title: 'NỮ',
    slug: '/nu',
    categories: womenCategories,
  },
  {
    id: 'kids',
    title: 'TRẺ EM',
    slug: '/tre-em',
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
    items: collections,
  },
};

export const mockProducts = Array.from({ length: 10 }, (_, i) => ({
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
