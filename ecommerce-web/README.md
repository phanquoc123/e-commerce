# E-commerce Web - React + TypeScript + Vite

Ứng dụng web thương mại điện tử được xây dựng với React, TypeScript, Vite và TailwindCSS.

## 🚀 Công nghệ sử dụng

- **React 19** - Thư viện UI
- **TypeScript** - Type safety
- **Vite** (Rolldown) - Build tool & dev server
- **TailwindCSS** - CSS framework
- **React Query** - Data fetching & caching
- **React Router** - Routing
- **Axios** - HTTP client
- **MSW (Mock Service Worker)** - API mocking
- **Storybook** - Component development
- **Vitest** - Testing framework

## 📦 Cài đặt

```bash
npm install
```

## 🛠️ Development

### Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173`

### Mock Service Worker (MSW)

Dự án sử dụng MSW để mock API trong môi trường development. MSW sẽ tự động intercept các API calls và trả về mock data.

**Cấu hình:**
- Mock handlers: `src/mocks/handlers.ts`
- Browser setup: `src/mocks/browser.ts`
- Node setup: `src/mocks/node.ts`
- Service worker: `public/mockServiceWorker.js`

**API Endpoints được mock:**
- `GET /api/categories/tree` - Lấy cây danh mục
- `GET /api/categories/:id` - Lấy danh mục theo ID
- `GET /api/collections/with-products` - Lấy bộ sưu tập kèm sản phẩm
- `GET /api/product-variants/product/:slug` - Lấy chi tiết sản phẩm
- `POST /api/categories` - Tạo danh mục mới

MSW chỉ hoạt động trong development mode (`import.meta.env.DEV`). Trong production, các API calls sẽ gửi đến backend thật.

### Chạy Storybook

```bash
npm run storybook
```

Storybook sẽ chạy tại `http://localhost:6006`

## 🏗️ Build

```bash
npm run build
```

## 🧪 Testing

```bash
npm run test
```

## 📝 Scripts

- `npm run dev` - Chạy dev server
- `npm run build` - Build production
- `npm run preview` - Preview production build
- `npm run lint` - Chạy ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code với Prettier
- `npm run format:check` - Check format
- `npm run storybook` - Chạy Storybook
- `npm run build-storybook` - Build Storybook

## 🌍 Biến môi trường

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

**Biến môi trường:**
- `VITE_API_URL` - Base URL của backend API (mặc định: `http://localhost:4000/api`)

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
