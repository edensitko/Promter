# E-Commerce Store Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in e-commerce and online retail layouts. You possess extensive knowledge of shopping UX patterns, product discovery flows, cart interaction design, and conversion optimization for transactional interfaces. You understand how customers browse, filter, compare, and purchase products online, and you design layouts that reduce friction at every step of that journey.

## Task

Design and build a complete, production-ready e-commerce storefront layout that enables users to discover products effortlessly, refine results through filters, view detailed product information, and manage a shopping cart -- all within a cohesive, visually appealing interface. The layout must support a multi-category product catalog and feel equally polished whether the store sells 20 items or 2,000. Prioritize speed, scannability, and trust signals throughout.

## Layout Structure

The e-commerce storefront is composed of the following interconnected sections and pages:

1. **Top Announcement Bar** -- A slim, full-width bar at the very top for promotional messages (e.g., "Free shipping on orders over $50"). Optionally dismissible. Uses a contrasting background color to draw attention.

2. **Navigation Header** -- A multi-layer header containing: (a) the store logo on the left, (b) a prominent search bar in the center with autocomplete and recent search suggestions, (c) icon buttons for user account, wishlist, and cart on the right with a badge counter on the cart icon showing item count. Below this, include a horizontal mega-menu or category navigation bar listing top-level product categories with dropdown sub-menus on hover.

3. **Hero / Promotional Banner** -- A full-width carousel or single banner showcasing featured promotions, seasonal campaigns, or new arrivals. Each slide includes a background image, headline, short copy, and a "Shop Now" CTA button. Auto-advances with manual navigation dots and arrows.

4. **Featured Categories Section** -- A grid or horizontal scroll of category cards (e.g., "Electronics," "Clothing," "Home & Garden"). Each card has a representative image, the category name, and a subtle item count. Clicking navigates to the filtered product listing.

5. **Product Listing / Grid Page** -- The primary shopping interface. Composed of:
   - **Filter Sidebar (Left):** Collapsible filter groups for price range (slider), categories (checkboxes), brand (checkboxes with search), ratings (star filter), size, color (swatches), and availability. Each filter updates results in real time without full page reload. Include a "Clear All Filters" action and a count of active filters.
   - **Sorting & View Controls (Top):** A toolbar above the product grid with a results count, sort dropdown (Price Low-High, Price High-Low, Newest, Best Selling, Rating), and grid-density toggle (2-column, 3-column, 4-column or list view).
   - **Product Grid (Main):** A responsive grid of product cards. Each card displays the product image (with hover image swap), product name, price (with sale price and strikethrough original if discounted), star rating with review count, color variant dots, and a quick "Add to Cart" button or icon. Support infinite scroll or paginated navigation with page numbers.

6. **Product Detail Page** -- A dedicated view for a single product containing: (a) an image gallery with thumbnail strip and zoom-on-hover or lightbox, (b) product title, price, rating, and review count, (c) variant selectors for size, color, and quantity, (d) an "Add to Cart" primary button and "Add to Wishlist" secondary button, (e) tabbed or accordion content for Description, Specifications, and Customer Reviews, (f) a "Related Products" carousel at the bottom.

7. **Shopping Cart** -- Accessible as a slide-in drawer from the right side of the screen and also as a dedicated cart page. The cart lists each item with its thumbnail, name, selected variants, unit price, quantity selector (with increment/decrement buttons), line total, and a remove button. Below the item list: subtotal, estimated shipping, tax, discount code input, and order total. A prominent "Proceed to Checkout" CTA button anchors the bottom.

8. **Footer** -- A comprehensive footer with columns for Customer Service (FAQ, Returns, Shipping Info, Contact), About (Our Story, Careers, Press), Quick Links (My Account, Order Tracking, Wishlist), and a newsletter signup. Include payment method icons (Visa, Mastercard, PayPal, Apple Pay), social media links, and legal links (Privacy Policy, Terms of Service).

## Design Goals

- Prioritize product visibility: the product image is the single most important element on every card and page. Give images generous space and high quality.
- Create a clean, distraction-free browsing experience where the interface recedes and the products take center stage.
- Build trust through consistent use of security badges, clear return policy links, authentic review displays, and professional typography.
- Optimize for speed: lazy-load images below the fold, use skeleton loading states for product grids, and minimize JavaScript bundle size.
- Design for scalability so the layout handles catalogs of any size without feeling empty (few products) or overwhelming (thousands of products).
- Use a neutral base palette (whites, light grays, near-blacks for text) with a single brand accent color for CTAs, badges, and interactive highlights.

## UI Requirements

- Product cards must have consistent aspect ratios for images (4:3 or 1:1) to maintain grid alignment regardless of source image dimensions.
- All prices must support locale-aware formatting with currency symbols, decimal separators, and sale/original price display.
- The filter sidebar must support URL-based state so filtered views are shareable and bookmarkable via query parameters.
- Star ratings must be rendered as accessible components with proper aria-labels (e.g., "Rated 4.3 out of 5 stars based on 127 reviews").
- The cart drawer must trap focus when open and be dismissible via an overlay click, close button, or Escape key.
- Skeleton loading placeholders must match the exact dimensions of the content they replace to prevent layout shift.
- Color variant swatches must show a visible selected state (border or checkmark) and display the color name on hover via a tooltip.
- Quantity inputs must enforce minimum (1) and maximum (stock-based) values with disabled states on the increment/decrement buttons at bounds.
- Toast notifications must confirm actions like "Added to cart" with an undo option, appearing briefly in a consistent screen position.

## Responsive Behavior

- **Desktop (1280px and above):** Product grid at 3 or 4 columns with a visible filter sidebar on the left (approximately 260px wide). Cart accessible as a slide-in drawer. Mega-menu navigation with dropdowns. Full search bar visible in the header.
- **Tablet (768px to 1279px):** Product grid at 2 or 3 columns. Filter sidebar collapses into a slide-in overlay triggered by a "Filters" button. Cart drawer remains functional. Navigation condenses; mega-menu may become a simplified dropdown. Search bar may collapse into an expandable icon.
- **Mobile (below 768px):** Product grid at 2 columns (compact cards) or 1 column (detailed cards). Filters open as a full-screen modal with an "Apply" button. Bottom-fixed "View Cart" bar appears when items are in the cart. Navigation becomes a hamburger menu. Search is accessible via a search icon that expands to a full-width input. Product detail page stacks image gallery above details. All touch targets are at least 44x44px.

## Technology Suggestions

- Next.js 14+ (App Router) for hybrid rendering: static generation for product listing pages and server components for dynamic cart state.
- Tailwind CSS 3+ for utility-first styling with a custom theme defining the store's brand tokens.
- Zustand or Jotai for lightweight client-side cart and filter state management without the overhead of Redux.
- next/image for automatic image optimization, responsive srcsets, and format negotiation (WebP/AVIF).
- Headless UI or Radix UI for accessible modals (cart drawer, filter overlay), dropdowns (sort selector), and disclosure components (filter groups).
- SWR or TanStack Query for client-side data fetching with caching, pagination, and optimistic updates on cart mutations.
- Embla Carousel for the hero banner and related products carousel, chosen for its small footprint and touch support.
- nuqs or next-usequerystate for syncing filter and sort state with URL query parameters.

## Expected Output

### Component Structure

```
EcommerceStore/
  Layout/
    AnnouncementBar.tsx
    StoreHeader.tsx
    SearchBar.tsx
    MegaMenu.tsx
    MobileNav.tsx
    Footer.tsx
  Home/
    HeroBanner.tsx
    FeaturedCategories.tsx
    CategoryCard.tsx
    TrendingProducts.tsx
  ProductListing/
    ProductListingPage.tsx
    FilterSidebar.tsx
    FilterGroup.tsx
    PriceRangeSlider.tsx
    ColorSwatch.tsx
    SortBar.tsx
    ProductGrid.tsx
    ProductCard.tsx
    Pagination.tsx
  ProductDetail/
    ProductDetailPage.tsx
    ImageGallery.tsx
    VariantSelector.tsx
    QuantityInput.tsx
    ProductTabs.tsx
    ReviewList.tsx
    RelatedProducts.tsx
  Cart/
    CartDrawer.tsx
    CartPage.tsx
    CartItem.tsx
    CartSummary.tsx
    DiscountCodeInput.tsx
  Shared/
    StarRating.tsx
    PriceDisplay.tsx
    Badge.tsx
    SkeletonCard.tsx
    Toast.tsx
```

### Page Sections

1. Announcement Bar -- promotional messaging strip
2. Store Header -- logo, search, account/cart icons, category nav
3. Hero Banner -- promotional carousel
4. Featured Categories -- category card grid
5. Product Listing -- filters + sort + product grid
6. Product Detail -- gallery, info, variants, reviews, related items
7. Cart Drawer / Page -- item list, summary, checkout CTA
8. Footer -- service links, newsletter, payment icons, legal

### Code Requirements

- Use TypeScript with strict mode for all components; define explicit interfaces for Product, CartItem, Category, Review, and Filter types.
- Implement the cart as a client-side store (Zustand) with actions for add, remove, update quantity, and clear, persisted to localStorage.
- Filter state must serialize to and deserialize from URL query parameters so that filtered views are shareable and back-button compatible.
- Product data should be abstracted behind a data access layer (e.g., `lib/products.ts`) so the frontend is decoupled from any specific backend or CMS.
- Write all monetary calculations with integer cents to avoid floating-point precision errors; format to display currency only at the presentation layer.
- Every interactive component must be keyboard navigable and screen-reader compatible; test with axe-core or a similar automated accessibility audit tool.
- Keep component files under 150 lines; extract hooks (e.g., `useCart`, `useFilters`, `useProductSearch`) into a dedicated `hooks/` directory.
- Provide a sample product data file (`products-data.ts`) with at least 12 placeholder products across 3 categories to demonstrate the full grid, filter, and detail experience.
