# Bluestone

A React application for managing product information with update capabilities and persistent locally storage.

## Tech Stack

### Core
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Styling

### Forms & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### UI Components
- **Radix UI** - Accessible component primitives

### Testing
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing
- **Testing Library** - Component testing utilities

### Code Quality
- **Biome** - Fast linter and formatter
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting

## Getting Started

### Prerequisites

- **Node.js** 22.19.0 >
- **pnpm**

### Installation

```bash
# Install dependencies
pnpm install

# Install Playwright browsers (for E2E tests)
pnpm dlx playwright install
```

### Development

```bash
# Start development server
pnpm dev
```

The application will be available at `http://localhost:5173`

### Build

```bash
# Create production build
pnpm build

# Preview production build
pnpm preview
```

## Testing

### Unit Tests

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:ui

# Run tests once
pnpm test:run
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests with UI
pnpm test:e2e:ui

# Run E2E tests in debug mode
pnpm test:e2e:debug
```

**Note**: E2E tests run on Chromium and Firefox. WebKit is not supported on macOS 13 ARM64.

## Code Quality

```bash
# Run linter
pnpm lint

# Fix linting issues
pnpm lint:fix
```

Pre-commit hooks automatically run linting on staged files.

## Project Structure

```
bluestone-product-list/
├── src/
│   ├── components                 # Product management components       
│   ├── test                       # Test setup and utilities
│   ├── App.tsx                    # Root component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
└── tests                          # E2E tests
```

### Component Structure

Components in this project follow a consistent structure:

- **File Naming**: `component-name.component.tsx` for component files
- **Type Definitions**: `component-name.types.ts` for TypeScript types
- **Exports**: `index.ts` for clean imports
- **Tests**: Co-located `component-name.test.tsx` files
- **Organization**: Features are grouped in directories (e.g., `product-list/`)

**Example structure:**
```
product-card/
├── product-card.component.tsx    # Main component
├── product-card.types.ts         # TypeScript types
├── product-card.test.tsx         # Unit tests
└── index.tsx                     # Export
```

## Features in Detail

- **View Products**: Display a list of products with images, names, and descriptions
- **Edit Products**: Modal-based editing with form validation
- **Data Persistence**: Changes are automatically saved to localStorage
- **Image Support**: Multiple images per product with preview
