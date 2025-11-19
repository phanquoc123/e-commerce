# Environment Variables Setup

## Creating `.env` file

Create a `.env.local` or `.env` file in the `ecommerce-web` directory with the following content:

```bash
# API Configuration
# Base URL for API requests
VITE_API_URL=http://localhost:4000/api

# MSW Configuration
# Enable/Disable Mock Service Worker in development
# Set to 'false' to use real backend API
VITE_ENABLE_MSW=true
```

## Available Environment Variables

### `VITE_API_URL`
- **Description**: Base URL for API requests
- **Default**: `http://localhost:4000/api`
- **Example**: `VITE_API_URL=https://api.yourdomain.com/v1`

### `VITE_ENABLE_MSW`
- **Description**: Enable or disable Mock Service Worker in development mode
- **Default**: `true` (MSW enabled)
- **Values**: 
  - `true` - Use mock data (MSW enabled)
  - `false` - Use real backend API (MSW disabled)

## Quick Start

1. Copy the content above into a new `.env` file in the `ecommerce-web` directory
2. Adjust values as needed
3. Restart your development server: `npm run dev`

## Note

- File `.env` is gitignored and should NOT be committed
- File `.env.local` takes precedence over `.env`
- Always restart dev server after changing environment variables



