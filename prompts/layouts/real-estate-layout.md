# Real Estate Listing Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in real estate platforms and property listing websites. You have deep expertise in search-driven interfaces, map-based exploration patterns, image gallery experiences, and conversion-optimized lead capture forms. You understand how property seekers browse: they search by location and filters, toggle between map and list views, scan property cards rapidly based on price and photos, and dive deep into property detail pages before contacting an agent. You design layouts that make property discovery efficient, visually compelling, and trustworthy.

## Task

Design and build a complete, production-ready real estate listing platform layout that enables users to search for properties by location and criteria, browse results in a synchronized map + list view, explore detailed property pages with rich media galleries, and connect with listing agents. The layout must support residential sales, rentals, or both, and should feel polished whether the catalog contains 50 or 50,000 listings. Prioritize search usability, image quality, and trust signals (agent credentials, property verification badges) throughout the experience.

## Layout Structure

The real estate platform is composed of the following interconnected sections and page types:

1. **Search Hero Section** -- A visually impactful homepage hero (height: 70vh, minimum 480px) with a large background image of an aspirational property or neighborhood, overlaid with a semi-transparent gradient (rgba(0,0,0,0.4)). Centered in the hero: (a) a headline (40px mobile, 56px desktop, font-weight 700, text-white, e.g., "Find Your Perfect Home"), (b) a subtitle (18px, text-white/80), (c) a prominent search bar container (max-width 900px, background white, border-radius 12px, padding 8px, box-shadow 0 8px 32px rgba(0,0,0,0.15)) containing: a location input with autocomplete powered by a geocoding API (showing suggestions for cities, neighborhoods, zip codes, addresses as the user types, with a location pin icon prefix), a property type dropdown (House, Apartment, Condo, Townhouse, Land), a price range selector (dual-handle slider or two inputs for min/max, formatted with currency symbols and abbreviations like "$200K - $500K"), beds and baths filter (dropdown selectors or stepper controls, e.g., "2+ Beds," "1+ Baths"), and a search button (accent color, px-8 py-3, "Search" label with a magnifying glass icon). Below the search bar, include quick-filter chips (e.g., "New Listings," "Open Houses," "Price Reduced," "Luxury") that act as preset searches. On mobile, the search bar simplifies to a location input and a "Filters" button that opens a full-screen filter panel.

2. **Featured Listings Carousel** -- A section (padding 64px vertical) below the hero showcasing premium or featured listings. Structure: (a) section header ("Featured Listings", 32px, semibold) with "View All" link, (b) a horizontally scrollable carousel (scroll-snap-type: x mandatory) of property cards (width 340px each, gap 24px). Each featured card contains: an image slideshow (aspect-ratio 4:3, 3-5 images with dot indicators and swipe/arrow navigation within the card), a "Featured" badge overlay (top-left, accent background, small pill), the property price in bold (24px, font-weight 700, formatted with comma separators), the full address (14px, muted, 1-line truncate), a property specs row showing beds (bed icon + number), baths (bath icon + number), and square footage (ruler icon + formatted number) at 14px, and the listing agent's name and brokerage (12px, muted) at the bottom. Cards have rounded corners (12px), subtle shadow, and a hover elevation effect (translateY(-4px), enhanced shadow). Carousel has left/right arrow buttons (44px circular) at the edges.

3. **Map + List Split View** -- The primary property browsing interface, accessible from search results. This section fills the full viewport height below a condensed fixed header. Layout: (a) an interactive map occupying the left 55% of the viewport (on desktop) using Mapbox GL or Google Maps. The map shows property markers (custom pins colored by property type or price range), clustered when zoomed out, with a popup on marker click showing a mini property card (image, price, address, beds/baths, "View Details" link). The map responds to list scrolling: hovering a listing in the list highlights the corresponding marker on the map (scale increase, color change, z-index boost). The map also responds to viewport changes: panning or zooming the map updates the listing results to show only properties within the visible map bounds ("Search as I move the map" toggle checkbox). (b) A scrollable listing panel occupying the right 45% of the viewport with: a results count and sort bar at the top ("128 homes for sale" + sort dropdown: Price Low-High, Price High-Low, Newest, Beds, Sqft), active filter pills with "x" remove buttons, and a vertically scrolling list of property cards. Each card shows: a property image (aspect-ratio 16:9, with a heart/save icon overlay for favoriting), price (20px bold), address (14px), beds/baths/sqft specs row, days on market (12px muted, e.g., "Listed 3 days ago"), and listing agent tiny avatar + name. Cards have a hover state (subtle background tint, border-color shift) and the hovered card's map marker pulses. Support infinite scroll or "Load More" button pagination.

4. **Property Detail Page** -- A comprehensive single-property view. Structure from top: (a) Image gallery -- a grid of 5 images (one large taking 50% width, four smaller in a 2x2 grid taking the other 50%, all with border-radius 12px and 4px gap) with a "View All Photos" button overlay that opens a full-screen lightbox carousel with keyboard navigation (arrow keys, Escape to close), swipe on touch, zoom on click, and a thumbnail strip at the bottom. (b) A two-column layout below the gallery: left column (60%) containing the price (36px, bold), address (18px, muted), beds/baths/sqft/lot-size stats in a horizontal row with icons, a property description (16px, line-height 1.75, expandable "Read More" if over 4 lines), an amenities/features grid (3 columns, each item has a check icon and label, e.g., "Central AC," "Garage," "Pool," "Hardwood Floors"), a "Property Details" section with a key-value table (year built, property type, lot size, HOA fees, MLS number, tax amount), a floor plan section (zoomable floor plan image or interactive viewer), a neighborhood info section (walk score, transit score, nearby schools rated by score, local amenities map), and a property history section (price change history, listing timeline). Right column (40%, sticky, top offset 80px) containing: an agent contact card (agent photo 80px, name 18px bold, brokerage name, phone number, "Licensed since [year]", star rating) with a contact form (name input, email input, phone input, message textarea pre-filled with "I'm interested in [property address]", and a "Request Info" CTA button), a mortgage calculator widget (inputs for home price, down payment percentage/amount, interest rate, loan term dropdown (15/30 year), showing calculated monthly payment breakdown: principal + interest, property tax estimate, insurance estimate, PMI if applicable, displayed in a small visual breakdown chart), and a "Schedule Tour" button with date/time picker.

5. **Agent Directory Section** -- Accessible from the main navigation. Structure: (a) a search bar for finding agents by name or location, (b) a grid of agent cards (3 columns desktop) each showing: agent headshot (rounded, 120px), full name (18px bold), brokerage name, specialization areas (tags), number of active listings, "Contact" CTA button. Cards link to individual agent profile pages showing full bio, active listings, sold history, testimonials, and contact form.

6. **Mortgage Calculator Widget** -- Also available as a standalone page. Contains: (a) a clean form layout (max-width 560px) with labeled inputs for home price (currency formatted), down payment (toggle between percentage and dollar amount), interest rate (with current average rate shown), loan term selector (15, 20, 30 years as radio buttons or dropdown), (b) a real-time results panel showing monthly payment as a large number (36px bold), a donut chart breaking down the payment components (principal & interest, taxes, insurance, PMI), an amortization summary (total interest paid over loan life, total cost), (c) an optional amortization schedule table (year, payment, principal, interest, remaining balance) that can be expanded.

7. **Footer** -- A comprehensive footer containing: (a) quick links (Buy, Rent, Sell, Agents, Mortgage Calculator, Blog), (b) popular searches by city or neighborhood, (c) company info (About, Careers, Press, Contact), (d) legal links (Privacy, Terms, Fair Housing Statement, Accessibility, DMCA), (e) Equal Housing Opportunity logo and brokerage license information, (f) social media icons, (g) app download badges (App Store, Google Play) if applicable.

## Design Goals

- Make property search feel instantaneous and responsive: search results should update in real-time as filters change, map interactions should feel smooth at 60fps, and the map-list synchronization should be seamless.
- Prioritize property photography: images are the most important element in real estate browsing. Give them generous space, ensure high quality loading, and make gallery browsing frictionless.
- Build trust through transparency: display listing dates, price history, agent credentials, and verified listing badges prominently.
- Optimize for the dual browsing modes users employ: geographic exploration (map-first) and criteria-based filtering (list-first), making both pathways equally powerful.
- Use a clean, neutral design palette (whites, light grays, dark text) with a single accent color for CTAs and interactive highlights, letting the property photos provide the visual richness.
- Ensure the mortgage calculator is genuinely useful with accurate formulas and clear breakdowns, positioning the platform as a comprehensive home-buying resource.

## UI Requirements

- The location autocomplete must debounce input (300ms) and display results in categorized groups (Cities, Neighborhoods, Zip Codes, Addresses) with the matching text portion highlighted in bold.
- Property card image slideshows must support swipe gestures on touch devices and show dot indicators for image count, loading placeholders for unloaded images, and preload the next image in sequence.
- The map + list split view must support a draggable divider handle allowing users to resize the proportions between map and list.
- Map property markers must use clustering with animated cluster expansion on zoom; cluster count badges should show the number of properties.
- The favorite/save heart button must toggle with an animation (scale bounce), persist state (localStorage for anonymous users, API for authenticated), and show a toast confirmation ("Saved to favorites").
- The image gallery lightbox must trap focus, support keyboard navigation (left/right arrows, Escape to close), preload adjacent images, and show image count (e.g., "3 of 24").
- The mortgage calculator must update results in real-time as any input changes, with number inputs formatted with commas and currency symbols as the user types.
- All price displays must be locale-aware with proper currency formatting (commas, symbols, decimal places based on locale).
- Filter state must be serialized to URL query parameters for shareable and bookmarkable search results.

## Responsive Behavior

- **Desktop (1280px and above):** Full map + list split view (55%/45%). Property detail page with gallery grid and two-column content/sidebar layout. Agent directory in 3-column grid. Search hero with inline filter bar. Featured carousel shows 3.5 cards.
- **Tablet (768px to 1279px):** Map + list split view adjusts to 50%/50%, or provides a toggle button to switch between full-screen map and full-screen list view. Property detail gallery becomes a full-width single-image carousel with thumbnails below. Detail content/sidebar stacks (sidebar below content). Agent directory in 2-column grid. Search filters condense to fewer visible options with a "More Filters" expandable section.
- **Mobile (below 768px):** Map and list views are separate, toggled via a floating "Map/List" toggle button. Property cards in the list view use full-width images. The search hero simplifies to a location input and a "Filters" button opening a full-screen filter modal with all options stacked vertically and an "Apply" button fixed at the bottom. Property detail gallery becomes a swipeable full-width carousel. The agent contact card becomes a sticky bottom bar with "Call" and "Message" buttons. The mortgage calculator stacks vertically. Footer columns collapse into accordion sections. All tap targets meet the minimum 44x44px accessibility guideline.

## Technology Suggestions

- Next.js 14+ (App Router) with server components for initial listings data and client components for interactive map, filters, and gallery.
- Tailwind CSS 3+ for utility-first styling with a custom theme defining the brand's color, spacing, and typography tokens.
- Mapbox GL JS or Google Maps JavaScript API for the interactive map with custom markers, clustering (Supercluster), and geocoding/autocomplete.
- Zustand or Jotai for client-side state management (filter state, favorites, map viewport, active listing) with URL query parameter synchronization.
- next/image for responsive property photo delivery with automatic format negotiation, blur placeholders (blurDataURL), and priority loading for above-the-fold images.
- Embla Carousel for property card image slideshows and the featured listings carousel, chosen for lightweight bundle and touch support.
- React Hook Form with Zod validation for the agent contact form and mortgage calculator inputs.
- nuqs for bidirectional syncing of filter state with URL search parameters (price range, beds, baths, property type, location).
- SWR or TanStack Query for paginated listing fetches with caching, background revalidation, and optimistic UI updates for favorites.

## Expected Output

### Component Structure

```
RealEstate/
  Layout/
    SiteLayout.tsx
    SiteHeader.tsx
    SiteFooter.tsx
    MobileNav.tsx
  Home/
    HomePage.tsx
    SearchHero/
      SearchHero.tsx
      LocationAutocomplete.tsx
      PropertyTypeDropdown.tsx
      PriceRangeSelector.tsx
      BedsBathsFilter.tsx
      QuickFilterChips.tsx
    FeaturedListings/
      FeaturedCarousel.tsx
      FeaturedPropertyCard.tsx
      CardImageSlideshow.tsx
  Search/
    SearchResultsPage.tsx
    MapListSplitView/
      MapListSplitView.tsx
      DraggableDivider.tsx
    Map/
      PropertyMap.tsx
      PropertyMarker.tsx
      MarkerCluster.tsx
      MapPopupCard.tsx
    Listings/
      ListingPanel.tsx
      ListingSortBar.tsx
      ActiveFilterPills.tsx
      PropertyCard.tsx
      FavoriteButton.tsx
    MobileFilterModal.tsx
  PropertyDetail/
    PropertyDetailPage.tsx
    ImageGallery/
      GalleryGrid.tsx
      LightboxCarousel.tsx
      ThumbnailStrip.tsx
    PropertyInfo/
      PriceAndAddress.tsx
      PropertySpecs.tsx
      PropertyDescription.tsx
      AmenitiesGrid.tsx
      PropertyDetailsTable.tsx
      FloorPlanViewer.tsx
      NeighborhoodInfo.tsx
      PriceHistory.tsx
    AgentSidebar/
      AgentContactCard.tsx
      ContactForm.tsx
      ScheduleTourButton.tsx
    MortgageCalculator/
      MortgageCalculator.tsx
      PaymentBreakdownChart.tsx
      AmortizationTable.tsx
  Agents/
    AgentDirectoryPage.tsx
    AgentCard.tsx
    AgentProfilePage.tsx
  Shared/
    PropertySpecsRow.tsx
    PriceDisplay.tsx
    Badge.tsx
    Toast.tsx
    Skeleton.tsx
    FavoriteToggle.tsx
```

### Page Sections

1. Search Hero -- location autocomplete, property type, price range, beds/baths, quick filter chips
2. Featured Listings Carousel -- premium property cards with image slideshows
3. Map + List Split View -- interactive map with markers, synchronized scrollable listing panel
4. Property Detail Page -- image gallery lightbox, property info, amenities, agent contact, mortgage calculator
5. Agent Directory -- searchable agent grid with profiles and listings
6. Mortgage Calculator -- real-time payment estimator with breakdown chart
7. Footer -- quick links, popular searches, legal, equal housing, social icons

### Code Requirements

- Use TypeScript with strict mode for all components; define interfaces for Property, Agent, SearchFilters, MapBounds, MortgageInputs, and GalleryImage types.
- The map + list synchronization must use a shared state store (Zustand) that tracks the hovered listing ID, visible map bounds, and selected property, ensuring both panels react to changes in either.
- Filter state must serialize to and deserialize from URL query parameters using a dedicated hook (`useSearchParams`) so that search results are shareable, bookmarkable, and back-button compatible.
- The mortgage calculator must use accurate financial formulas: monthly payment = P[r(1+r)^n] / [(1+r)^n - 1], with PMI calculated at 0.5-1% annually when down payment is below 20%.
- Property card image slideshows must preload the next image in the sequence on hover/focus and use `loading="lazy"` for off-screen images.
- The location autocomplete must implement debounced API calls (300ms), keyboard navigation through results (arrow keys + Enter), and display results grouped by type.
- All monetary values must be formatted using `Intl.NumberFormat` with locale-appropriate currency symbols, grouping separators, and decimal handling.
- Provide a sample data file (`properties-data.ts`) with at least 20 property listings with varied prices, locations, property types, and image URLs, plus 5 agents, to demonstrate the full search, map, detail, and agent directory experience.
- Keep individual component files under 150 lines; extract hooks (`useMapSync`, `useMortgageCalc`, `useFavorites`, `useLocationSearch`) into a dedicated `hooks/` directory.
- Ensure zero ESLint warnings and pass automated accessibility audit (axe-core) with no critical violations.
