# Editorial Magazine Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in editorial and magazine-style digital publications. You have deep expertise in typographic systems, asymmetric grid design, long-form reading experiences, and content-heavy layouts that balance visual richness with readability. You understand how editorial hierarchy works: how readers scan headlines, how pull quotes anchor attention, and how image placement pacing keeps readers scrolling through lengthy articles. You have a refined eye for the interplay between whitespace, typographic scale, and imagery that distinguishes premium digital publications from generic blogs.

## Task

Design and build a complete, production-ready editorial magazine layout suitable for content-heavy publications such as online magazines, news outlets, literary journals, or branded editorial platforms. The layout must support a rich homepage with asymmetric article grids, category-based browsing, and a fully realized long-form article reading experience. Every typographic choice, spacing decision, and component should reflect the craft and intentionality of a professionally art-directed publication. The design should make readers want to linger, explore, and subscribe.

## Layout Structure

The magazine layout is composed of the following interconnected sections and page types:

1. **Masthead Navigation** -- A refined top navigation bar (height: 64px on desktop, 56px on mobile) featuring: (a) the publication name or wordmark logo rendered in a distinctive serif or display typeface, centered or left-aligned depending on editorial style, (b) a horizontal row of category links (e.g., "Culture," "Technology," "Opinion," "Travel," "Science") with an active underline indicator (2px solid, offset 4px below text), (c) a search icon button that expands into a full-width overlay search field with large placeholder text (24px), autofocus, and recent searches, (d) a "Subscribe" CTA button in a contrasting accent color (px-6 py-2 rounded-full text-sm font-semibold tracking-wide uppercase), (e) a hamburger menu icon for mobile that triggers a full-screen navigation overlay with large category links (32px font-size), featured articles, and social links. The masthead should use a subtle bottom border (1px solid, 8% opacity) and remain sticky with a slight background blur (backdrop-filter: blur(12px)) on scroll.

2. **Featured Article Hero** -- A commanding full-width hero section (height: 85vh minimum, max 720px) showcasing the editor's pick or lead story. Contains: (a) a high-resolution background image with a gradient overlay (linear-gradient from transparent at top to rgba(0,0,0,0.75) at bottom) ensuring text legibility, (b) a category tag displayed as a small uppercase label (12px, letter-spacing 1.5px) with a colored underline matching the category's assigned color, (c) the article headline in large display typography (48px mobile, 64px tablet, 80px desktop, line-height 1.1, font-weight 700) positioned over the lower third of the image, (d) the article excerpt or deck in a lighter weight (18px, line-height 1.6, max-width 640px, opacity 0.9), (e) an author byline row showing the author's circular avatar (40px), name (14px semibold), publication date formatted as "Month Day, Year", and estimated reading time (e.g., "8 min read"), (f) a "Read Article" CTA button or the entire hero functioning as a clickable link with a subtle hover zoom (transform: scale(1.02), transition 600ms) on the background image.

3. **Editorial Article Grid** -- The primary content discovery section below the hero, using an asymmetric, art-directed grid layout. The grid mixes: (a) large feature cards that span 2 columns and 2 rows, displaying a large image (aspect-ratio 3:2), category tag, headline (28px), 3-line excerpt, author avatar + name, and date, (b) standard article cards occupying 1 column and 1 row with a smaller image (aspect-ratio 16:9), category tag, headline (20px), 2-line excerpt, author avatar + name, and date, (c) opinion or quote cards with no image, using a colored background matching the category with large quotation marks and a pull-quote style excerpt (24px italic). The overall grid uses CSS Grid with `grid-template-columns: repeat(4, 1fr)` on desktop, `gap: 24px`, and a `max-width: 1320px` centered container. Each card has a hover state: image scales to 1.03, headline color shifts to the accent color, and a subtle box-shadow appears (0 8px 30px rgba(0,0,0,0.08)). Cards must include proper `<article>` semantic markup, `<time>` elements with datetime attributes, and `aria-label` on the card link.

4. **Category Section Rows** -- Below the main grid, individual category sections each containing: (a) a section header with the category name (24px, semibold, uppercase tracking 1px) and a "View All" link aligned to the right, (b) a horizontally scrollable row of article cards (scrollbar hidden, scroll-snap-type: x mandatory) with each card snapping to alignment. Each card in these rows shows a 16:9 image, category tag, headline (18px), author name, and date. The scroll container has left/right arrow buttons (40px circular, semi-transparent background, positioned at the vertical center) that appear on hover (desktop) or always visible (touch devices). Include at least 3 category sections (e.g., "Technology," "Culture," "Opinion") each with 6-8 scrollable article cards.

5. **Long-Form Article View** -- The full article reading experience, accessed when clicking any article card. Structure: (a) article header with category tag, headline (40px mobile, 56px desktop, max-width 800px, centered), deck/subtitle (20px, max-width 640px), author block (avatar 48px, name, bio snippet, date, reading time, share buttons), (b) feature image spanning full content width (max-width 960px, centered) with an optional caption and credit below (14px, italic, muted color), (c) article body rendered in a centered content column (max-width 720px, font-size 19px, line-height 1.8, paragraph spacing 1.5em) with styled elements including: pull quotes (28px italic, left border 3px solid accent, padding-left 24px, margin 48px 0), inline images (breaking out to max-width 960px with captions), subheadings (H2 at 28px, H3 at 22px, with 48px top margin and 16px bottom margin), ordered and unordered lists with custom markers, blockquotes with background tint, and code blocks if applicable, (d) a related articles sidebar on desktop (width 280px, sticky, positioned to the right of the article body, appearing after the first 3 paragraphs) showing 3-4 related articles with small thumbnails, headlines, and dates, (e) article footer with author bio card (full width, bordered, with larger avatar, name, bio paragraph, social links), tags list, and share buttons, (f) a "Read Next" section showing 3 recommended articles in a horizontal card layout.

6. **Newsletter Signup Section** -- A visually distinct full-width section (padding 80px vertical, contrasting background color or subtle pattern) containing: (a) a headline (32px, centered, e.g., "Stay informed. Subscribe to our weekly digest."), (b) a supporting paragraph (16px, max-width 480px, centered), (c) an email input field (max-width 400px, height 48px, rounded-lg, centered) with a submit button inline or below, (d) a privacy note (12px muted text, centered, e.g., "No spam. Unsubscribe anytime."). The input should have focus ring styling, validation feedback, and a success state that replaces the form with a confirmation message.

7. **Footer** -- A comprehensive multi-column footer (padding 64px top, 32px bottom, dark background) containing: (a) the publication logo/wordmark, (b) columns for category links, about pages (About, Masthead, Contact, Advertise, Careers), and legal (Privacy Policy, Terms of Service, Cookie Policy, Accessibility), (c) social media icon links (Twitter/X, Instagram, Facebook, LinkedIn, RSS), (d) a secondary newsletter signup input, (e) a copyright line with the current year. Footer columns use a 4-column grid on desktop, 2 on tablet, and stack vertically on mobile.

## Design Goals

- Establish a sophisticated editorial aesthetic that signals quality and credibility, making the publication feel premium and trustworthy.
- Create a typographic system that serves both scanning (headlines, category tags, bylines) and sustained reading (article body text at 19px with 1.8 line-height on a 720px measure).
- Use an asymmetric grid that feels art-directed and intentional rather than template-generated, mixing card sizes and formats to create visual rhythm and editorial hierarchy.
- Maintain exceptional reading performance: article pages should load under 2 seconds, images should lazy-load progressively, and fonts should use `font-display: swap` to prevent invisible text.
- Design a color system where each category has an assigned accent color used for tags, borders, and highlights, providing instant visual wayfinding across the publication.
- Ensure the layout feels timeless and content-agnostic, working equally well for tech journalism, cultural criticism, travel essays, or scientific reporting.

## UI Requirements

- Article cards must implement a "stacking link" pattern where the entire card is clickable via an absolutely positioned anchor, but inner links (author name, category tag) remain independently clickable with higher z-index.
- All images in the article grid must use `aspect-ratio` CSS property with `object-fit: cover` to maintain consistent card heights regardless of source image dimensions.
- The horizontal scroll sections must support both mouse wheel horizontal scrolling (via `overscroll-behavior-x: contain`) and touch swipe, with scroll-snap alignment to each card's left edge.
- Reading progress should be indicated via a thin progress bar (3px height, accent color) fixed to the top of the viewport on article pages, driven by scroll position.
- The article body must support a "reading mode" toggle that increases font size to 21px, switches to a warmer background (e.g., #faf6f0), and hides the sidebar.
- Estimated reading time must be calculated dynamically based on word count at an assumed pace of 200 words per minute.
- Share buttons must support native Web Share API where available, with fallback copy-to-clipboard and platform-specific share links (Twitter, Facebook, LinkedIn).
- All category tag colors must meet WCAG 2.1 AA contrast requirements against their backgrounds (minimum 4.5:1 for small text).

## Responsive Behavior

- **Desktop (1280px and above):** Full 4-column asymmetric article grid. Masthead with all category links visible. Article view with content column (720px) and right sidebar (280px). Horizontal scroll sections show 4 cards with arrow navigation. Footer in 4 columns.
- **Tablet (768px to 1279px):** Article grid collapses to 2 columns with feature cards spanning full width. Masthead condenses category links into a horizontally scrollable strip. Article view hides the sidebar; related articles move below the content. Horizontal scroll sections show 2.5 cards with visible arrows. Footer in 2 columns.
- **Mobile (below 768px):** Single-column layout throughout. Masthead shows only logo, hamburger menu, and search icon. Hero section reduces headline to 36px and height to 60vh. Article cards stack vertically with images at full width (aspect-ratio 16:9). Article body text adjusts to 17px at 100% container width with 20px horizontal padding. Pull quotes reduce to 22px. Horizontal scroll sections show 1.2 cards to hint at scrollability. Newsletter section stacks input and button vertically. Footer columns stack into an accordion with expandable section headers. All tap targets meet the minimum 44x44px accessibility guideline.

## Technology Suggestions

- Next.js 14+ (App Router) with static site generation for article pages and incremental static regeneration for the homepage grid.
- Tailwind CSS 3+ with a custom typography plugin (`@tailwindcss/typography`) for article body styling and a theme configuration mapping category names to accent colors.
- MDX or a headless CMS (Sanity, Contentful) for article content management with rich text rendering.
- next/image for responsive image delivery with automatic format negotiation (WebP/AVIF), blur placeholders, and priority loading for hero images.
- Framer Motion for article card entrance animations (stagger fade-up), hero image parallax effects, and smooth page transitions.
- Embla Carousel for horizontal scroll category rows with snap behavior, touch support, and programmatic arrow navigation.
- React Intersection Observer for triggering reading progress, lazy-loading category sections, and activating the sticky sidebar table of contents in article view.
- next-themes for light/dark mode and the warm reading mode toggle.

## Expected Output

### Component Structure

```
Magazine/
  Layout/
    MagazineLayout.tsx
    Masthead/
      Masthead.tsx
      CategoryNav.tsx
      SearchOverlay.tsx
      MobileMenuOverlay.tsx
    Footer/
      Footer.tsx
      FooterColumn.tsx
      FooterNewsletter.tsx
  Home/
    HomePage.tsx
    FeaturedHero/
      FeaturedHero.tsx
    EditorialGrid/
      EditorialGrid.tsx
      LargeFeatureCard.tsx
      StandardArticleCard.tsx
      OpinionQuoteCard.tsx
    CategoryRow/
      CategorySection.tsx
      HorizontalScrollRow.tsx
      ScrollArrowButton.tsx
      CategoryArticleCard.tsx
    NewsletterSignup/
      NewsletterSignup.tsx
  Article/
    ArticlePage.tsx
    ArticleHeader/
      ArticleHeader.tsx
      AuthorByline.tsx
      ShareButtons.tsx
    ArticleBody/
      ArticleBody.tsx
      PullQuote.tsx
      InlineImage.tsx
      CalloutBox.tsx
    ArticleSidebar/
      RelatedArticlesSidebar.tsx
      RelatedArticleItem.tsx
    ArticleFooter/
      AuthorBioCard.tsx
      TagsList.tsx
      ReadNextSection.tsx
      ReadNextCard.tsx
    ReadingProgress/
      ReadingProgressBar.tsx
  Shared/
    CategoryTag.tsx
    AuthorAvatar.tsx
    ReadingTime.tsx
    ArticleCardBase.tsx
    Skeleton.tsx
```

### Page Sections

1. Masthead Navigation -- sticky refined nav with publication name, category links, search, subscribe CTA
2. Featured Article Hero -- full-width hero with overlay text, author byline, reading time
3. Editorial Article Grid -- asymmetric 4-column grid mixing feature cards, standard cards, and quote cards
4. Category Section Rows -- horizontal scrolling rows per category with arrow navigation
5. Long-Form Article View -- centered content column with pull quotes, inline images, related sidebar
6. Newsletter Signup -- email capture section with validation and confirmation
7. Footer -- category links, about pages, social links, legal, copyright

### Code Requirements

- Use TypeScript with strict mode for all components; define interfaces for Article, Author, Category, Tag, and NewsletterSubscription types.
- Implement the article grid using CSS Grid with named grid areas and `grid-template-columns: repeat(4, 1fr)` rather than flexbox, to enable the asymmetric spanning layout.
- Article body content must be rendered from a structured format (MDX or CMS rich text) with custom component mapping for pull quotes, inline images, callout boxes, and embedded media.
- Category accent colors must be defined in a centralized theme config (`lib/categories.ts`) mapping category slugs to hex colors, and consumed via a utility function or CSS custom properties.
- Reading time calculation and reading progress tracking must be extracted into reusable hooks (`useReadingTime`, `useReadingProgress`) in a dedicated `hooks/` directory.
- All date formatting must use a consistent utility (e.g., `date-fns` or `Intl.DateTimeFormat`) with relative time for recent articles ("2 hours ago") and absolute format for older ones ("March 15, 2026").
- Image loading must use blur-up placeholder technique with dominant color extraction or low-quality image placeholders (LQIP) for hero and feature images.
- Provide a sample data file (`magazine-data.ts`) with at least 15 placeholder articles across 4 categories, 5 authors with bios, and realistic headlines and excerpts to demonstrate the full grid, category rows, and article view.
- Keep individual component files under 150 lines; extract sub-components and hooks when complexity grows.
- Ensure zero ESLint warnings under a standard config and pass automated accessibility audit (axe-core) with no critical violations.
