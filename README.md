# SpaceX Apollo System

A modern web application built with Nuxt 3, Vue 3, and Vuetify that displays SpaceX launch data with advanced filtering, favorites management, and state persistence.

## 🚀 Features

### Core Functionality

- **Launch Listings**: Browse SpaceX launches with detailed information
- **Advanced Filtering**: Filter launches by year, limit results, and sort by date
- **Rocket Details**: View comprehensive rocket specifications and information
- **Responsive Design**: Optimized for desktop and mobile devices

### Advanced Features

- **Favorites System**: Add/remove rockets from favorites with toggle functionality
- **State Persistence**: Favorites stored in IndexedDB for offline access
- **Real-time Feedback**: Snackbar notifications for user actions
- **Route Protection**: Middleware redirects for non-existent pages
- **Server-Side Rendering**: SEO-optimized with Nuxt 3

## 🛠️ Tech Stack

- **Framework**: Nuxt 3 (Vue 3)
- **UI Library**: Vuetify 3
- **State Management**: Pinia with persistence
- **Data Fetching**: Apollo GraphQL
- **Storage**: IndexedDB via LocalForage
- **Styling**: SCSS with Vuetify theming
- **TypeScript**: Full type safety

## 📋 Project Requirements Implementation

### Task 1: Launch Listings with Filtering ✅

- Implemented comprehensive launch table with mission details
- Advanced filtering by year with "All Years" option
- Result limiting (10, 25, 50, 100 launches)
- Sort by date (ascending/descending)
- Active filter indicators with reset functionality

### Task 2: Rocket Details Page ✅

- Dynamic routing (`/rocket/[id]`)
- Comprehensive rocket specifications display
- Navigation breadcrumbs and back functionality
- Error handling for non-existent rockets

### Task 3: Favorites System ✅

- Add/remove rockets from favorites with toggle button
- Dedicated favorites page (`/favorites`)
- Visual feedback with snackbar notifications
- Clear all favorites functionality
- Persistent storage across sessions

### Task 4: State Persistence ✅

- IndexedDB storage via LocalForage
- Pinia plugin integration
- Client-side only persistence (SSR compatible)
- Automatic state restoration on app load

### Task 5: Route Middleware ✅

- Global middleware for 404 handling
- Automatic redirect to `/launches` for invalid routes
- Seamless user experience

## 🏗️ Architecture

### Directory Structure

```
app/
├── components/
│   ├── LaunchFilters.vue     # Filtering component
│   └── EmptyState.vue        # Reusable empty state
├── pages/
│   ├── launches.vue          # Main launch listings
│   ├── favorites.vue         # Favorites management
│   └── rocket/
│       └── [id].vue          # Dynamic rocket details
├── stores/
│   └── favorite-rocket.ts    # Pinia store for favorites
├── plugins/
│   └── pinia.ts              # Persistence configuration
└── middleware/
    └── notfound-redirect.global.ts
```

### State Management

- **Pinia Store**: Centralized favorites management
- **IndexedDB Persistence**: Offline-capable storage
- **Type Safety**: Full TypeScript integration

### Data Flow

1. Apollo GraphQL fetches SpaceX API data
2. Vue components render with reactive state
3. User interactions update Pinia store
4. State automatically persists to IndexedDB
5. SSR ensures SEO optimization

## 🎯 Unique Feature: Advanced Persistence Strategy

### Rationale

Instead of using simple localStorage, I implemented IndexedDB via LocalForage for several key benefits:

1. **Storage Capacity**: IndexedDB can store much larger datasets than localStorage
2. **Performance**: Asynchronous operations don't block the UI
3. **Data Types**: Native support for complex objects without JSON serialization overhead
4. **Offline Capability**: Works seamlessly in offline scenarios
5. **Future-Proof**: Scalable for additional features like cached launch data

### Implementation Highlights

```typescript
// Custom storage adapter for Pinia persistence
storage: {
  getItem: (key) => localForage.getItem(key),
  setItem: (key, value) => localForage.setItem(key, value),
  removeItem: (key) => localForage.removeItem(key),
}
```

## 🚧 Challenges Faced

### 1. Apollo GraphQL Integration

**Challenge**: Complex nested GraphQL queries for rocket and launch data  
**Solution**: Structured queries with proper error handling and loading states

### 2. State Persistence with SSR

**Challenge**: IndexedDB not available during server-side rendering  
**Solution**: `clientOnly: true` configuration and proper hydration handling

### 3. Type Safety with Dynamic Data

**Challenge**: SpaceX API returns varying data structures  
**Solution**: Optional chaining and fallback values throughout components

### 4. Responsive Design Complexity

**Challenge**: Complex table layouts on mobile devices  
**Solution**: Vuetify's responsive grid system with card-based mobile layout

### 5. Build Configuration

**Challenge**: Dependency conflicts between Nuxt, Pinia, and persistence plugins  
**Solution**: Careful plugin ordering and proper TypeScript configuration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/geloNaru/NuxtVGP.git

# Navigate to project directory
cd NuxtVGP

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Environment Setup

No additional environment variables required - the app uses the public SpaceX GraphQL API.

## 📦 Deployment

The application is configured for Vercel deployment with automatic builds on push to main branch.

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔧 Configuration

### Nuxt Configuration

- Apollo GraphQL client configured for SpaceX API
- Pinia auto-imports enabled
- Vuetify integration with custom theming
- SSR optimization for performance

### Browser Support

- Modern browsers with IndexedDB support
- Progressive enhancement for older browsers
- Mobile-first responsive design

## 📈 Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Nuxt's built-in image optimization
- **Bundle Analysis**: Optimized dependencies and tree-shaking
- **Caching Strategy**: Apollo cache + IndexedDB persistence
- **SSR**: Server-side rendering for faster initial loads

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- SpaceX for providing the open GraphQL API
- Nuxt.js team for the excellent framework
- Vuetify team for the comprehensive UI library
- Pinia team for the intuitive state management
