# 🔍 Search Feature Documentation

## Tổng quan
Chức năng tìm kiếm sản phẩm realtime với dropdown hiển thị kết quả ngay khi user gõ.

## Cấu trúc

### 1. **API Mock** (`src/mocks/handlers.ts`)
```typescript
GET /products/search?q={query}&limit={limit}
```

**Response:**
```json
{
  "data": {
    "status": 200,
    "message": "Success",
    "success": true,
    "result": {
      "items": [
        {
          "id": 1,
          "name": "Áo thun nam basic",
          "slug": "ao-thun-nam-basic",
          "price": 199000,
          "thumbnail": "https://..."
        }
      ],
      "total": 5,
      "query": "áo"
    }
  }
}
```

### 2. **Service Layer** (`src/services/productService.ts`)
```typescript
searchProducts: (query: string, limit: number = 10) =>
  axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}&limit=${limit}`)
```

### 3. **React Query Hook** (`src/hooks/useProduct.ts`)
```typescript
export const useSearchProducts = (query: string, limit: number = 10)
```

**Features:**
- ✅ Auto-fetch when query changes
- ✅ Debounce built-in (handled at component level)
- ✅ Caching (2 minutes stale time)
- ✅ Error handling
- ✅ Empty query returns empty result

### 4. **Components**

#### **SearchBar** (`src/components/molecules/SearchBar/SearchBar.tsx`)
- Input field với debounce (500ms default)
- Quản lý state: `inputValue`, `searchQuery`, `isDropdownOpen`
- Click outside để đóng dropdown
- Logic thông minh:
  - Nếu có text → hiển thị dropdown (không mở MegaMenu)
  - Nếu empty → mở MegaMenu (nếu có prop `onClick`)

#### **SearchDropdown** (`src/components/molecules/SearchDropdown/SearchDropdown.tsx`)
- Hiển thị kết quả tìm kiếm
- 3 states:
  - **Loading**: Spinner + "Đang tìm kiếm..."
  - **No results**: Icon + "Không tìm thấy sản phẩm"
  - **Results**: List sản phẩm (ảnh, tên, giá)
- Click vào sản phẩm → navigate đến `/product/{slug}`

## Luồng hoạt động

1. User gõ text vào SearchBar
2. Sau 500ms (debounce) → trigger `setSearchQuery(inputValue)`
3. `useSearchProducts` hook được gọi
4. MSW interceptor trả về mock data
5. SearchDropdown hiển thị kết quả
6. User click sản phẩm → navigate đến ProductDetailPage

## UI States

```
┌─────────────────────────────────┐
│  [🔍 Tìm kiếm            ]     │  ← Input empty
└─────────────────────────────────┘
         ↓ User gõ "áo"
┌─────────────────────────────────┐
│  [🔍 áo                  ]     │
├─────────────────────────────────┤
│  Đang tìm kiếm...              │  ← Loading state
└─────────────────────────────────┘
         ↓ 300ms sau
┌─────────────────────────────────┐
│  [🔍 áo                  ]     │
├─────────────────────────────────┤
│  KẾT QUẢ TÌM KIẾM (3)          │
│  ┌──────────────────────────┐  │
│  │ 📷 Áo thun nam basic    │  │
│  │    199,000đ             │  │
│  ├──────────────────────────┤  │
│  │ 📷 Áo polo nam cao cấp  │  │
│  │    299,000đ             │  │
│  ├──────────────────────────┤  │
│  │ 📷 Áo khoác bomber      │  │
│  │    599,000đ             │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

## Testing

### Test cases:
1. ✅ Gõ text → hiển thị dropdown sau 500ms
2. ✅ Xóa hết text → đóng dropdown
3. ✅ Click outside → đóng dropdown
4. ✅ Click vào sản phẩm → navigate đến detail page
5. ✅ Click vào input khi empty → mở MegaMenu
6. ✅ Click vào input khi có text → không mở MegaMenu
7. ✅ Search không có kết quả → hiển thị "Không tìm thấy"

## Cải tiến trong tương lai

- [ ] Highlight keyword trong tên sản phẩm
- [ ] Search history (localStorage)
- [ ] Autocomplete suggestions
- [ ] Filter by category trong dropdown
- [ ] Keyboard navigation (arrow keys, Enter)
- [ ] Analytics tracking
- [ ] Voice search 🎤
