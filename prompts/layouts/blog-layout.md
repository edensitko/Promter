# Blog / Magazine Layout Prompt

## Role

You are a senior front-end developer and editorial designer with deep experience
building content-rich blog and magazine-style layouts. You understand information
hierarchy, typographic rhythm, card-based design systems, and how to present large
volumes of written content in an inviting, scannable format. You prioritize reading
comfort, performance, and clean content structure.

## Task

Create a fully functional blog or online magazine homepage that showcases articles
across multiple categories. The layout must support featured posts, category
filtering, article cards with metadata, and a comfortable long-form reading
experience. The design should feel editorial and refined.

## Design Goals

- **Content hierarchy**: Featured articles are visually prominent; regular posts
  are scannable; sidebar or secondary content does not compete for attention.
- **Reading comfort**: Typography, line length, and spacing are tuned for extended
  reading sessions.
- **Discoverability**: Categories, tags, and related articles help users explore
  the content library.
- **Performance**: Images are lazy-loaded, content is progressively rendered, and
  the page loads fast even on slow connections.

## Requirements

### Visual Design

1. Clean, content-first aesthetic with generous whitespace.
2. A refined color palette: neutral base (white/off-white/light gray) with one or
   two accent colors for links, categories, and interactive elements.
3. Serif or editorial sans-serif typeface for headings (e.g., Playfair Display,
   Fraunces, Newsreader). Clean sans-serif for body text (Inter, Source Sans 3).
4. Article images should use consistent aspect ratios within each card grid.
5. Category labels styled as colored badges or pills.
6. Subtle dividers and borders to separate content zones.

### Layout

1. **Header**: Site logo/name, primary navigation (Home, Categories, About, Contact),
   and a search icon or bar.
2. **Featured Section**: A hero area showcasing 1-3 featured articles. The primary
   featured post should occupy a large card with a background image, overlay title,
   excerpt, author, date, and estimated reading time. Secondary featured posts
   appear as smaller companion cards.
3. **Category Navigation**: A horizontal scrollable row or tabbed interface for
   filtering by category (e.g., Technology, Design, Business, Lifestyle).
4. **Article Grid**: A responsive grid (3 columns on desktop, 2 on tablet, 1 on
   mobile) of article cards. Each card includes:
   - Thumbnail image
   - Category badge
   - Title (linked)
   - Excerpt (2-3 lines, truncated with CSS)
   - Author avatar and name
   - Publication date
   - Estimated reading time (e.g., "5 min read")
5. **Sidebar** (optional on desktop, hidden on mobile): Popular posts list,
   newsletter signup form, tag cloud or category list.
6. **Pagination or Infinite Scroll**: A "Load More" button or numbered pagination
   at the bottom of the article grid.
7. **Footer**: Site links, social media icons, copyright, and a secondary
   newsletter signup.

### Article Card Component

Each card must be a self-contained, reusable component with the following data:

```
{
  "id": "string",
  "title": "string",
  "excerpt": "string",
  "category": "string",
  "author": { "name": "string", "avatar": "url" },
  "publishedAt": "ISO 8601 date",
  "readingTime": "number (minutes)",
  "thumbnail": "url",
  "slug": "string"
}
```

### Interactivity

1. Category filter tabs update the visible article grid without a full page reload.
2. Hover effects on cards: subtle lift (translateY + box-shadow) and image zoom.
3. Search overlay or expandable search bar with debounced input.
4. Dark mode toggle that persists preference in `localStorage`.

### Responsiveness

1. Three-column grid collapses to two on tablet and one on mobile.
2. Featured hero section adapts from side-by-side to stacked layout.
3. Sidebar collapses into a toggleable drawer or moves below the main content.
4. Navigation collapses into a hamburger menu on mobile.

## Technology Suggestions

| Layer         | Recommended                                         |
|---------------|-----------------------------------------------------|
| Markup        | Semantic HTML5, `<article>`, `<aside>`, `<nav>`     |
| Styling       | CSS3 Grid + Flexbox, custom properties              |
| Fonts         | Google Fonts (Newsreader + Inter)                   |
| Images        | `loading="lazy"`, `<picture>` with WebP/AVIF        |
| Framework     | Next.js, Astro, or Vanilla JS                       |
| Data          | Static JSON or Markdown with front matter            |
| Build Tool    | Vite or framework-native bundler                     |
| Accessibility | Semantic landmarks, ARIA labels, focus management   |

## Expected Output Structure

```
blog-layout/
  index.html                # Homepage with featured + grid
  css/
    variables.css           # Color tokens, type scale, spacing
    base.css                # Reset, global typography, dark mode
    layout.css              # Grid definitions, header, footer, sidebar
    components.css          # Article cards, badges, buttons, search
    responsive.css          # Breakpoint overrides
  js/
    main.js                 # Category filter, search, dark mode toggle
    components/
      article-card.js       # Card rendering logic
  data/
    articles.json           # Sample article data (10-15 entries)
  assets/
    images/                 # Placeholder thumbnails and avatars
```

## Evaluation Criteria

- Visual hierarchy makes featured content unmissable and regular content scannable.
- Typography and spacing create a comfortable reading rhythm.
- Category filtering works smoothly without layout jank.
- Dark mode is well-implemented with appropriate color adjustments.
- Page loads quickly; images are optimized and lazy-loaded.
- Code is semantic, accessible, and well-organized.
