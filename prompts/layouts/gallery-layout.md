# Image Gallery Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in image and media gallery layouts. You have extensive expertise in masonry and grid-based image presentation, lightbox interactions, performance optimization for media-heavy pages, and designing filtering and categorization systems that make large visual collections navigable and enjoyable. You understand the technical challenges of working with images of varying aspect ratios and sizes, and you design layouts that celebrate visual content while maintaining structure and usability.

## Task

Design and build a complete, production-ready image and media gallery layout that presents a collection of visual content in an engaging, well-organized, and high-performance interface. The gallery must support both curated small collections (20 to 50 items) and larger libraries (hundreds of items) without degrading performance or usability. Users must be able to browse the full collection, filter by category or tag, view individual images in a full-screen lightbox with metadata and navigation, and experience a layout that adapts fluidly across all device sizes. The gallery is suitable for photography portfolios, design showcases, product image libraries, stock photo collections, or any media-centric presentation.

## Layout Structure

The gallery is composed of the following sections and interactive layers:

1. **Gallery Header** -- A clean header section containing: (a) the gallery title or site logo, (b) an optional subtitle or description of the collection, (c) navigation links if the gallery is part of a larger site. Keep this section compact so the visual content dominates the viewport as quickly as possible.

2. **Filter and Category Bar** -- A horizontal bar or toolbar positioned above the gallery grid. Contains: (a) category filter buttons or tabs (e.g., "All," "Landscape," "Portrait," "Architecture," "Street," "Abstract") that filter the gallery with smooth transitions, (b) an optional search input for finding images by title, tag, or description, (c) a layout toggle allowing users to switch between masonry layout and uniform grid layout, and (d) a sort control (Newest, Oldest, Most Viewed, or custom ordering). Active filters should be visually distinct (filled background, underline, or bold text) with a clear count of visible items.

3. **Masonry Gallery Grid** -- The primary content area displaying images in a masonry (Pinterest-style) layout where images maintain their natural aspect ratios within a multi-column structure. Key characteristics:
   - Images flow into columns, filling vertical space efficiently with no gaps between rows.
   - Columns are of equal width but images within them vary in height based on their aspect ratio.
   - Each image item includes the image itself, and on hover reveals: the image title, photographer/creator name, a like/favorite button, and a download or share button.
   - The grid supports infinite scroll or a "Load More" button for large collections, loading 20 to 30 images per batch.
   - A subtle fade-in or scale-up animation plays as new images enter the viewport.

4. **Uniform Grid Alternative** -- A toggleable alternative to the masonry layout where all images are displayed in a uniform grid with consistent aspect ratios (e.g., 1:1 square crops or 4:3 landscape crops). This mode sacrifices aspect-ratio preservation for visual uniformity and alignment. Each cell has the same dimensions, and images are center-cropped using `object-fit: cover`.

5. **Lightbox Overlay** -- A full-screen modal that opens when an image is clicked. The lightbox includes:
   - The selected image displayed at maximum size within the viewport, with letterboxing on mismatched aspect ratios.
   - Previous/Next navigation arrows on the left and right sides, plus keyboard navigation (Arrow Left, Arrow Right).
   - A close button (top-right) and Escape key dismissal.
   - A bottom panel or sidebar with image metadata: title, description, date taken, camera/lens details (if applicable), tags, dimensions, and creator attribution.
   - A thumbnail filmstrip strip along the bottom for quick jumping between images.
   - Swipe gesture support on touch devices for navigating between images.
   - Preloading of adjacent images (previous and next) for instant navigation.
   - A counter indicating position within the collection (e.g., "14 / 87").
   - Optional actions: download original, share link, copy embed code, toggle favorite.

6. **Filter Transition Layer** -- When a filter is applied, the gallery grid should animate smoothly: images that do not match the filter scale down and fade out, while matching images reposition to fill the gaps. This creates a dynamic, polished filtering experience rather than an abrupt re-render. New filter results should also stagger their entrance for visual continuity.

7. **Empty State** -- When no images match the active filters or search query, display a well-designed empty state with an illustration or icon, a helpful message (e.g., "No images match your filters"), and a clear action to reset filters.

8. **Footer** -- A minimal footer with copyright information, a link to the photographer's or creator's main site, and optionally a count of total images in the collection.

## Design Goals

- Make the images the undisputed stars: the interface should recede into the background, providing structure and navigation without competing with the visual content for attention.
- Achieve a gallery-quality presentation where the surrounding UI is minimal, neutral, and refined. Use a near-white or very dark background (configurable for light/dark mode) so images are viewed against a clean backdrop.
- Optimize perceived performance: the gallery must feel fast even with hundreds of high-resolution images. Use progressive loading (blur-up or LQIP), virtualized rendering for off-screen images, and aggressive lazy loading to achieve this.
- Create satisfying filtering interactions: filter transitions should feel fluid and physical, as if the images are reorganizing themselves in space rather than being swapped in the DOM.
- The lightbox experience must feel premium: transitions should be smooth (image expanding from its grid position into the lightbox), navigation should be instant (preloaded adjacent images), and the overlay should have a refined backdrop-blur or dark overlay.
- Support both photography-focused collections (where aspect ratio preservation is critical) and design-focused collections (where uniform grid presentation may be preferred), hence the layout toggle.

## UI Requirements

- The masonry layout must handle images of any aspect ratio -- from ultra-wide panoramas to tall portrait shots -- without cropping, stretching, or creating awkward gaps.
- Image hover overlays must transition smoothly (opacity fade over 200ms) and must not cause layout shift in the grid. Use absolute positioning within the image container.
- The filter bar must support horizontal scrolling on mobile when categories exceed the viewport width, with subtle fade edges indicating scrollability.
- The lightbox must implement focus trapping: Tab cycles through the lightbox controls only, and focus returns to the triggering image when the lightbox closes.
- Image loading must use the `loading="lazy"` attribute combined with Intersection Observer for progressive enhancement. Above-the-fold images (first visible row) should use `loading="eager"` and `fetchpriority="high"`.
- Implement responsive image delivery using `srcset` and `sizes` attributes so the browser fetches the appropriate resolution for the user's viewport and device pixel ratio.
- The "Load More" or infinite scroll mechanism must clearly communicate loading state (skeleton placeholders or a spinner) and end-of-collection state ("You've reached the end").
- All interactive elements in the lightbox must be operable via keyboard: arrow keys for navigation, Escape to close, Tab to cycle through action buttons.
- Implement URL-based state for filters and lightbox: applying a filter should update the URL query parameter (e.g., `?category=landscape`), and opening an image should update the URL (e.g., `?image=sunset-01`), enabling direct linking to filtered views and specific images.
- Color mode: support both light (white background) and dark (near-black background) viewing modes, since photographers and viewers have strong preferences. Images should always be rendered without any background tinting.

## Responsive Behavior

- **Desktop (1280px and above):** Masonry grid at 4 to 5 columns. Hover overlays fully active with title, actions, and metadata. Lightbox shows image at large scale with metadata panel. Filter bar spans the full width with all categories visible. Thumbnail filmstrip visible in lightbox.
- **Tablet (768px to 1279px):** Masonry grid at 3 columns. Hover overlays simplified (title only) or replaced with a persistent small label. Lightbox adapts: metadata panel may move below the image or collapse into an expandable drawer. Filter bar may horizontally scroll. Thumbnail filmstrip hides or becomes scrollable.
- **Mobile (below 768px):** Masonry grid at 2 columns, or optionally 1 column for a full-width card-based view. Hover overlays are removed entirely; image metadata is displayed below each image inline or revealed on tap. Lightbox becomes a full-screen image viewer with swipe navigation, simplified controls, and metadata accessible via a pull-up sheet. Filter bar becomes a horizontally scrollable pill list or a dropdown selector. Infinite scroll is preferred over pagination. Minimum touch target size of 44x44px for all interactive elements.

## Technology Suggestions

- React 18+ or Next.js 14+ for component-based architecture, image optimization, and optional static generation for pre-rendered gallery pages.
- Tailwind CSS 3+ for utility-first styling with custom configuration for the gallery's minimal design system.
- CSS `columns` property or a JavaScript masonry library (e.g., react-masonry-css, masonic) for the masonry layout. For maximum control, use a custom implementation with CSS Grid and JavaScript-calculated row spans based on image aspect ratios.
- Framer Motion with `AnimatePresence` and `layoutId` for filter transitions (items animating out/in and repositioning) and lightbox open/close animations (shared-element transition from grid to full-screen).
- next/image for automatic image optimization, responsive srcsets, blur placeholders, and format negotiation (WebP/AVIF).
- react-photo-album or a custom implementation for intelligent column-based image layout that minimizes row height variance.
- @tanstack/react-virtual for virtualizing the image grid in large collections, rendering only the images currently in or near the viewport.
- nuqs or useSearchParams for syncing filter and lightbox state with URL query parameters.
- blurhash or thumbhash for generating compact blur placeholders that load instantly while full images are fetched.
- PhotoSwipe or yet-another-react-lightbox for a feature-complete, accessible lightbox with pinch-to-zoom, swipe navigation, and keyboard support.

## Expected Output

### Component Structure

```
Gallery/
  Layout/
    GalleryLayout.tsx
    GalleryHeader.tsx
    Footer.tsx
    ThemeToggle.tsx
  FilterBar/
    FilterBar.tsx
    CategoryFilter.tsx
    SearchInput.tsx
    LayoutToggle.tsx
    SortControl.tsx
    ActiveFilterBadge.tsx
  Grid/
    MasonryGrid.tsx
    UniformGrid.tsx
    GalleryGrid.tsx (wrapper that switches between masonry and uniform)
    GalleryImage.tsx
    ImageOverlay.tsx
    LoadMoreTrigger.tsx
    SkeletonImage.tsx
  Lightbox/
    Lightbox.tsx
    LightboxImage.tsx
    LightboxControls.tsx
    LightboxMetadata.tsx
    ThumbnailFilmstrip.tsx
    LightboxActions.tsx
  Shared/
    BlurPlaceholder.tsx
    EmptyState.tsx
    FavoriteButton.tsx
    ShareMenu.tsx
    AnimatedGrid.tsx
    ResponsiveImage.tsx
  config/
    gallery-data.ts
    categories.ts
    gallery-config.ts
  hooks/
    useMasonryLayout.ts
    useLightbox.ts
    useGalleryFilters.ts
    useInfiniteGallery.ts
    useKeyboardNavigation.ts
```

### Page Sections

1. Gallery Header -- title, description, minimal navigation
2. Filter and Category Bar -- category tabs, search, layout toggle, sort
3. Gallery Grid -- masonry or uniform grid of images with hover overlays
4. Lightbox Overlay -- full-screen image viewer with navigation, metadata, and actions
5. Load More / Infinite Scroll -- progressive loading mechanism
6. Empty State -- friendly feedback when no images match filters
7. Footer -- copyright, links, collection count

### Code Requirements

- Use TypeScript with strict mode; define interfaces for `GalleryImage` (id, src, alt, title, description, width, height, category, tags, date, camera, creator, blurHash), `GalleryCategory` (id, label, count), and `GalleryConfig` (columns per breakpoint, gap, layout mode, items per page).
- The masonry layout algorithm must be deterministic: given the same set of images and container width, it must produce the same layout every time. This ensures no layout jitter on re-renders.
- Filter logic must be implemented as a composable hook (`useGalleryFilters`) that accepts the full image array and active filters, returning the filtered and sorted subset with memoization to avoid recalculating on unrelated re-renders.
- The lightbox must be implemented as a portal rendered outside the main DOM tree to avoid z-index stacking context issues and to enable proper focus trapping.
- Image loading performance must be a first-class concern: implement a custom hook (`useInfiniteGallery`) that manages batch loading, tracks loaded vs. pending images, and exposes loading state for UI consumption.
- All image URLs must be abstracted through a utility function that appends responsive sizing parameters (width, quality) based on the display context (grid thumbnail vs. lightbox full-size).
- Provide a sample data file (`gallery-data.ts`) with at least 20 image entries across 4 categories, each with complete metadata. Use placeholder image services (Unsplash, Picsum) for source URLs.
- The grid must maintain smooth scroll performance with 100+ images rendered: use content-visibility, contain, or virtualization to ensure the browser does not paint off-screen images.
- Accessibility: every image must have descriptive alt text, the lightbox must announce the current image to screen readers on navigation, and all controls must be labeled with aria attributes.
- The filter transition animation must gracefully handle rapid filter switching: if a user clicks two filters in quick succession, the second animation should interrupt and replace the first without visual glitching.
