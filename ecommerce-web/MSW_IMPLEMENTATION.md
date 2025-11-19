# MSW Implementation - E-Commerce Web

## ✅ Hoàn thành

Tất cả API endpoints đã được mock đầy đủ với MSW (Mock Service Worker).

## 🎯 API Endpoints

### 1. Categories Tree
**Endpoint:** `GET /api/categories/tree`

**Response Structure:**
```typescript
{
  data: {
    status: 200,
    message: 'Success',
    success: true,
    result: Category[] // Nested categories with children
  }
}
```

**Category Interface:**
```typescript
interface Category {
  id: number;
  name: string;
  slug: string;
  thumbnail: string | null;
  parentId: number | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  children?: Category[];
}
```

**Mock Data:**
- NAM (id: 1)
  - Áo khoác nam (id: 2)
    - Áo chống nắng nam, Áo vest nam, Áo gió nam, Áo phao nam
  - Áo nam (id: 7)
    - Áo thun nam, Áo sơ mi nam, Áo polo nam, Áo len nam
  - Quần nam (id: 12)
    - Quần jean nam, Quần kaki nam, Quần short nam, Quần âu nam
- NỮ (id: 20)
- TRẺ EM (id: 30)

### 2. Category by ID
**Endpoint:** `GET /api/categories/:id`

**Response:** Same structure as tree, but returns single category

### 3. Collections with Products
**Endpoint:** `GET /api/collections/with-products`

**Response Structure:**
```typescript
{
  data: {
    status: 200,
    message: 'Success',
    success: true,
    result: Collection[]
  }
}
```

**Collection Interface:**
```typescript
interface Collection {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: ProductInCollection[];
}
```

**Mock Collections:**
1. **Everyday Basics** - `/images/banner/banner-web-destop.webp`
2. **BST ÁO GIÓ** - `/images/banner/banner-web-destop2.webp`
3. **SMART COOL** - `/images/banner/banner-web-destop3.webp`

### 4. Product Detail with Variants
**Endpoint:** `GET /api/product-variants/product/:slug?colorId=X&sizeId=Y`

**Query Parameters:**
- `colorId` (optional): ID của màu cần xem
- `sizeId` (optional): ID của size cần xem

**Response Structure:**
```typescript
{
  data: {
    status: 200,
    message: 'Success',
    success: true,
    result: ProductDetailResult
  }
}
```

**ProductDetailResult Interface:**
```typescript
interface ProductDetailResult {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  salePrice: number | null;
  discountPercent: number | null;
  isActive: boolean;
  category: CategoryBrief | null;
  selectedColorId: number | null;      // Color được chọn
  selectedSizeId: number | null;       // Size được chọn
  colors: ProductColorItem[];          // Tất cả màu available
  variants: ProductVariantItem[];      // Tất cả variants (color+size)
  createdAt: string;
  updatedAt: string;
}
```

**ProductColorItem Interface:**
```typescript
interface ProductColorItem {
  id: number;
  name: string;
  code: string;
  hexCode: string | null;
  thumbnailUrl: string | null;
  productColorId: number;
  images: ProductImageItem[];          // ⭐ IMAGES CỦA MÀU NÀY
  sizes: ProductSizeItem[];
  variants: Array<{
    id: number;
    sku: string;
    price: number;
    stock: number;
    status: 'active' | 'inactive';
    sizeId: number | null;
    sizeName?: string;
    sizeCode?: string;
  }>;
}
```

**ProductImageItem Interface:**
```typescript
interface ProductImageItem {
  id: number;
  imageUrl: string;        // ⭐ PATH ĐẾN ẢNH
  isMain: boolean;         // Ảnh chính của màu
  sortOrder: number;       // Thứ tự hiển thị
}
```

## 🎨 Mock Data - Product Colors & Images

### Mock Product: "Áo thun nam basic" (slug: `ao-thun-nam-basic`)

#### Color 1: Trắng (White)
- **ID:** 1
- **Hex:** `#FFFFFF`
- **Images:**
  1. `/images/product/product-detail.webp` (main)
  2. `/images/banner/banner-web-destop.webp`
  3. `/images/banner/banner-web1.webp`
- **Sizes:** S, M, L, XL, XXL
- **Stock:** 20, 50, 30, 15, 10

#### Color 2: Đen (Black)
- **ID:** 2
- **Hex:** `#000000`
- **Images:**
  1. `/images/product/product-detail-1.webp` (main)
  2. `/images/banner/banner-web-destop2.webp`
  3. `/images/banner/banner-web2.webp`
- **Sizes:** S, M, L, XL, XXL
- **Stock:** 25, 45, 35, 20, 12

#### Color 3: Xanh Navy (Navy)
- **ID:** 3
- **Hex:** `#001f3f`
- **Images:**
  1. `/images/banner/banner-web-destop3.webp` (main)
  2. `/images/banner/banner-web3.webp`
  3. `/images/blog/blog-img.webp`
- **Sizes:** S, M, L, XL, XXL
- **Stock:** 18, 40, 28, 15, 8

## 🔧 Cách sử dụng

### 1. Enable MSW in Development

MSW tự động enable khi chạy `npm run dev` (nếu `VITE_ENABLE_MSW !== 'false'`)

### 2. Tắt MSW để dùng Real Backend

Tạo file `.env.local`:
```bash
VITE_ENABLE_MSW=false
VITE_API_URL=http://your-real-backend.com/api
```

### 3. Test trong Browser

Mở DevTools Console, bạn sẽ thấy:
```
[MSW] Mocking enabled.
[MSW] GET /api/categories/tree (200 OK)
[MSW] GET /api/product-variants/product/ao-thun-nam-basic?colorId=2&sizeId=3 (200 OK)
```

## 📊 Ví dụ Response

### Product Detail Response:
```json
{
  "data": {
    "status": 200,
    "message": "Success",
    "success": true,
    "result": {
      "id": 101,
      "name": "Áo thun nam basic",
      "slug": "ao-thun-nam-basic",
      "price": 199000,
      "selectedColorId": 2,
      "selectedSizeId": 3,
      "colors": [
        {
          "id": 2,
          "name": "Đen",
          "hexCode": "#000000",
          "images": [
            {
              "id": 11,
              "imageUrl": "/images/product/product-detail-1.webp",
              "isMain": true,
              "sortOrder": 1
            },
            {
              "id": 12,
              "imageUrl": "/images/banner/banner-web-destop2.webp",
              "isMain": false,
              "sortOrder": 2
            }
          ],
          "sizes": [
            { "id": 1, "name": "S", "code": "S" },
            { "id": 2, "name": "M", "code": "M" },
            { "id": 3, "name": "L", "code": "L" }
          ]
        }
      ]
    }
  }
}
```

## ✨ Features

✅ **Đầy đủ BE structure** - Response giống y hệt Backend  
✅ **Images cho từng màu** - Mỗi color có riêng images array  
✅ **Local images** - Không cần internet, load nhanh  
✅ **Dynamic selection** - Query params thay đổi màu/size được chọn  
✅ **Full variants** - Tất cả combinations của colors × sizes  
✅ **Type-safe** - TypeScript interfaces đầy đủ  

## 🚀 Benefits

1. **Development độc lập**: Không cần chờ Backend
2. **Testing dễ dàng**: Data consistent và predictable
3. **Performance tốt**: Local images load nhanh
4. **No CORS issues**: Chạy trên same origin
5. **Hot reload**: Thay đổi mock data → auto refresh

## 📝 Notes

- Tất cả images sử dụng local paths trong `public/images/`
- Mỗi màu có 3 ảnh (1 main + 2 secondary)
- Default selection: Màu đầu tiên, size M
- Khi switch màu → images tự động update theo màu đó



