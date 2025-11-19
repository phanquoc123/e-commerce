# Mock Service Worker (MSW) Configuration

## 📖 Tổng quan

MSW (Mock Service Worker) được sử dụng để mock API responses trong môi trường development và testing. Service worker sẽ intercept các network requests và trả về mock data thay vì gọi đến backend thật.

## 🗂️ Cấu trúc

```
src/mocks/
├── handlers.ts       # Định nghĩa các mock handlers
├── browser.ts        # Setup cho browser (development)
├── node.ts          # Setup cho Node.js (testing)
├── types.ts         # TypeScript types cho mock data
└── README.md        # Documentation
```

## 🚀 Cách sử dụng

### Development Mode

MSW được tự động khởi động trong `src/main.tsx`:

```typescript
async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}
```

- MSW chỉ chạy khi `import.meta.env.DEV === true`
- Các requests không được mock sẽ bypass đến server thật
- Service worker file: `public/mockServiceWorker.js`

### Testing Mode

Trong test files, import và setup MSW server:

```typescript
import { server } from './mocks/node';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 📝 Handlers

### Các API Endpoints đã được mock

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/api/categories/tree` | Lấy cây danh mục sản phẩm đầy đủ | - |
| GET | `/api/categories/:id` | Lấy thông tin danh mục theo ID | - |
| GET | `/api/collections/with-products` | Lấy tất cả bộ sưu tập kèm sản phẩm | - |
| GET | `/api/product-variants/product/:slug` | Lấy chi tiết sản phẩm với variants & colors | `colorId`, `sizeId` |
| POST | `/api/categories` | Tạo danh mục mới | - |

### Backend Response Structure

Tất cả API responses đều có cấu trúc chuẩn:

```typescript
{
  data: {
    status: number;      // HTTP status code
    message: string;     // Message từ server
    success: boolean;    // true/false
    result: T;           // Dữ liệu thực tế
  }
}
```

### Product Detail với Color Variants

Endpoint `/api/product-variants/product/:slug` trả về dữ liệu đầy đủ về:
- **Product info**: id, name, slug, description, price, category
- **Colors array**: Mỗi màu có:
  - `images[]`: Danh sách ảnh của màu đó (với `isMain`, `sortOrder`)
  - `sizes[]`: Các size available cho màu đó
  - `variants[]`: Các variant (color + size combinations)
- **Selected color & size**: `selectedColorId`, `selectedSizeId` dựa vào query params

**Ví dụ:**
```bash
GET /api/product-variants/product/ao-thun-nam-basic?colorId=2&sizeId=3
```

Trả về sản phẩm với màu Đen (id=2) và size L (id=3) được selected, kèm theo tất cả images của màu Đen.

### Ví dụ: Thêm Handler mới

```typescript
// handlers.ts
export const handlers = [
  // Thêm handler mới
  http.get(`${API_BASE_URL}/products`, ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const limit = url.searchParams.get('limit') || '10';
    
    return HttpResponse.json({
      data: mockProducts.slice(
        (Number(page) - 1) * Number(limit),
        Number(page) * Number(limit)
      ),
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: mockProducts.length,
      },
      message: 'Success',
    });
  }),
];
```

### Ví dụ: Override Handler trong Test

```typescript
import { server } from './mocks/node';
import { http, HttpResponse } from 'msw';

test('handles error response', async () => {
  // Override handler cho test này
  server.use(
    http.get('/api/products', () => {
      return HttpResponse.json(
        { message: 'Server error' },
        { status: 500 }
      );
    })
  );
  
  // Test logic...
});
```

## 🔄 Tắt/Bật MSW

### Tắt MSW trong Development

MSW đã được cấu hình để có thể bật/tắt dễ dàng qua biến môi trường.

**Cách 1: Sử dụng biến môi trường (Khuyến nghị)**

Tạo file `.env.local` hoặc `.env` trong thư mục `ecommerce-web/`:

```bash
# Tắt MSW - sử dụng backend thật
VITE_ENABLE_MSW=false

# Bật MSW - sử dụng mock data (mặc định)
VITE_ENABLE_MSW=true
```

**Cách 2: Comment code trong `main.tsx`:**

```typescript
// Tạm thời tắt MSW
// enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
// });
```

> 💡 **Lưu ý:** Restart dev server sau khi thay đổi biến môi trường!

### Chỉ mock một số endpoints

Sử dụng option `onUnhandledRequest`:

```typescript
worker.start({
  onUnhandledRequest: 'bypass', // 'warn' | 'error' | 'bypass'
});
```

- `bypass`: Requests không được mock sẽ đi đến server thật (default)
- `warn`: Log warning cho requests không được mock
- `error`: Throw error cho requests không được mock

## 🧪 Testing với MSW

### Setup trong Vitest

```typescript
// vitest.setup.ts
import { beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './src/mocks/node';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Test Component với Mock Data

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from './ProductList';

test('displays products', async () => {
  const queryClient = new QueryClient();
  
  render(
    <QueryClientProvider client={queryClient}>
      <ProductList />
    </QueryClientProvider>
  );
  
  await waitFor(() => {
    expect(screen.getByText('Áo thun nam basic')).toBeInTheDocument();
  });
});
```

## 🔧 Troubleshooting

### MSW không hoạt động

1. **Kiểm tra Service Worker:**
   - Mở DevTools → Application → Service Workers
   - Đảm bảo `mockServiceWorker.js` đang active

2. **Re-generate Service Worker:**
   ```bash
   npx msw init public/ --save
   ```

3. **Clear Browser Cache:**
   - Hard refresh: `Ctrl + Shift + R` (Windows) / `Cmd + Shift + R` (Mac)
   - Hoặc unregister service worker trong DevTools

### Requests không được intercept

1. **Kiểm tra URL matching:**
   - Đảm bảo base URL trong handlers khớp với `VITE_API_URL`
   - MSW so khớp exact URL hoặc sử dụng path params

2. **Kiểm tra console:**
   - MSW sẽ log các requests được mocked
   - Format: `[MSW] GET /api/products (200 OK)`

### Type Errors

Import types từ `./types.ts`:

```typescript
import type { ApiResponse, Product } from './types';

const mockResponse: ApiResponse<Product[]> = {
  data: [...],
  message: 'Success',
};
```

## 📚 Tài liệu tham khảo

- [MSW Documentation](https://mswjs.io/)
- [MSW with React Query](https://tkdodo.eu/blog/testing-react-query)
- [MSW Best Practices](https://kentcdodds.com/blog/stop-mocking-fetch)

