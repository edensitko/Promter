# Bento Grid Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in modern bento grid layouts and asymmetric card-based compositions. You have deep expertise in CSS Grid, spatial design systems, and creating visually dynamic interfaces where content blocks of varying sizes and types coexist in a structured yet organic arrangement. You understand how to balance visual weight across a grid, create focal points through scale contrast, and maintain readability and navigability within non-uniform layouts.

## Task

Design and build a complete, production-ready bento grid layout that arranges content blocks of varying sizes, types, and visual weights into a cohesive, magazine-style composition. The layout must feel intentional and curated, not randomly arranged -- each card's size and position should reflect the importance, type, or visual nature of its content. The bento grid pattern (inspired by Japanese bento box compartments) creates visual interest through the juxtaposition of large feature cards alongside smaller utility cards, producing a layout that is both information-dense and aesthetically compelling. This layout is suitable for dashboards, personal homepages, product feature showcases, agency landing pages, or content aggregation interfaces.

## Layout Structure

The bento grid is composed of a parent grid container and a collection of content cards that span varying numbers of columns and rows:

1. **Grid Foundation** -- The underlying grid uses a 4-column structure on desktop (with optional 6 or 12-column sub-grid for finer control). Rows are auto-sized based on content with a defined minimum height (e.g., 200px) and a consistent gap (16px to 24px). The grid should fill the viewport width with comfortable horizontal padding (5% to 8% on each side) and extend vertically as content requires.

2. **Feature Card (Large)** -- Spans 2 columns and 2 rows. This is the visual anchor of the grid, occupying the most screen real estate. Used for hero-level content: a bold headline with a gradient or image background, a featured project showcase, or a primary CTA with supporting imagery. Typography is large and confident. This card should feel like the centerpiece of the composition.

3. **Medium Cards** -- Span 2 columns and 1 row, or 1 column and 2 rows (tall). These carry secondary-priority content: a text-heavy "About Me" summary, a statistics display (e.g., years of experience, projects completed), an embedded map, a recent blog post preview, or a medium-sized image showcase. They bridge the scale gap between the feature card and the small cards.

4. **Small Cards (Standard)** -- Span 1 column and 1 row. These are the building blocks of the grid, used for individual data points, icon-driven links, single metrics, social media links, a clock or weather widget, a single testimonial quote, or a technology badge. Their compact size demands ruthless content editing: one idea per card, zero clutter.

5. **Wide Card** -- Spans 3 or 4 columns and 1 row. Used for content that benefits from horizontal space: a skills marquee, a horizontal scrolling testimonials strip, an image carousel, a timeline, or a call-to-action banner. This card type breaks the vertical rhythm of the grid and creates a visual "rest" moment.

6. **Image / Media Card** -- Any size variant, but purely visual. Contains a photograph, illustration, video thumbnail, or animated graphic with no text overlay (or minimal text). Serves as a palette cleanser between text-heavy cards, adding color and visual texture to the grid. Image fills the card edge-to-edge with rounded corners matching the grid's border-radius system.

7. **Interactive Card** -- A card with embedded interactivity: a working dark/light mode toggle, a mini music player, a live code snippet, a hover-responsive 3D tilt effect, or an animated gradient that responds to cursor position. These cards showcase technical skill and add delight to the browsing experience.

### Example Grid Arrangement (Desktop)

```
+-----------------------------+
| Feature (2x2) | Small | Small |
|                | (1x1) | (1x1) |
|                +---------+---------+
|                | Medium (2x1)       |
+----------------+---------------------+
| Tall (1x2)     | Wide (3x1)          |
|                 |                     |
+---------+-------+----------+----------+
| Small   | Small | Image    | Medium   |
| (1x1)   | (1x1) | (1x1)   | (1x2)   |
+---------+-------+----------+          |
| Wide (3x1)                  |          |
+-----------------------------+----------+
```

## Design Goals

- Create a layout that immediately communicates modernity and design sophistication. The bento grid should feel like a curated composition, not a CSS experiment.
- Establish visual hierarchy through card size: the eye should travel from the feature card to medium cards to small cards, guided by scale contrast.
- Maintain a consistent design language across all card sizes: unified border-radius (12px to 20px), consistent internal padding (20px to 32px based on card size), a cohesive color system, and harmonious typography scaling.
- Use background variety to create depth and visual interest: mix solid colors (from a curated palette), subtle gradients, photographic backgrounds, and frosted-glass (backdrop-blur) effects. Ensure text remains legible on all background types.
- Design for visual balance: distribute visual weight (dark backgrounds, large images, bold colors) evenly across the grid to prevent it from feeling lopsided. Avoid clustering all heavy elements in one area.
- The grid should feel alive but not chaotic: incorporate subtle micro-animations (gentle hover lifts, background gradient shifts, icon rotations) that reward exploration without overwhelming the user.

## UI Requirements

- Every card must have a hover state that provides feedback without disrupting the grid layout: options include a subtle vertical lift with shadow deepening (translateY(-4px) with box-shadow transition), a border-color change, or a background brightness shift. Never use hover effects that change the card's grid footprint.
- Cards with clickable content must have a clear interactive affordance: a subtle arrow icon, an underlined link, or a cursor change. The entire card surface should be clickable (using a stretched link pattern or card-level click handler) for ease of targeting.
- Background colors and gradients must be defined in the theme configuration, not hard-coded in components, enabling easy palette swaps and theme customization.
- Typography within cards must scale relative to card size: feature cards use heading-level type (24px to 40px), medium cards use subheading-level (18px to 24px), and small cards use body or caption-level (14px to 16px).
- Cards with image backgrounds must include a gradient overlay or scrim to ensure text legibility, and the image must be loaded with blur-up placeholders.
- The grid gap must be perfectly consistent across all card boundaries; no card should have extra or missing spacing due to spanning calculations.
- Implement a staggered entrance animation: cards fade and slide in with increasing delays as they appear in the viewport, creating a cascade effect on first load. This animation must respect `prefers-reduced-motion`.
- Cards that display dynamic data (clock, weather, live metrics) must update without causing layout shift or re-triggering entrance animations.

## Responsive Behavior

- **Desktop (1280px and above):** Full 4-column grid with all card size variants active. Hover interactions enabled. Feature card occupies 2x2 with full visual impact. Wide cards span 3 or 4 columns. Comfortable horizontal padding.
- **Tablet (768px to 1279px):** Grid reduces to 2 columns. The feature card remains 2x2 (full width). Medium 2x1 cards span full width. Tall 1x2 cards become 1x1 or 2x1. Wide cards span the full 2 columns. Card internal padding reduces slightly. Interactive cards simplify animations.
- **Mobile (below 768px):** Grid reduces to 1 column. All cards become full-width, stacking vertically. Card height adapts to content (no fixed row spans). The visual hierarchy is maintained through vertical ordering: feature card first, then medium cards, then small cards. Interactive hover effects are replaced with tap feedback. The staggered entrance animation uses faster timing. Horizontal padding reduces to 16px.

- **Transition handling:** The grid rearrangement across breakpoints must not cause jarring reflows. Use CSS Grid's `auto-fit` or `auto-fill` with `minmax()` where appropriate, and define explicit grid-template-areas per breakpoint for controlled placement. Card order should be manageable via CSS `order` or explicit `grid-area` assignment.

## Technology Suggestions

- React 18+ or Next.js 14+ for component-based architecture and server-side rendering of the initial grid layout.
- Tailwind CSS 3+ with custom grid utilities. Define the bento grid using CSS Grid (`grid-template-columns`, `grid-template-rows`, `grid-column`, `grid-row`) with Tailwind's arbitrary value syntax or custom utilities in the config. Use `@apply` or utility composition for card size variants.
- Framer Motion for staggered entrance animations (`staggerChildren`, `delayChildren`), hover lift effects (`whileHover`), and layout animations when grid items reorder.
- CSS `container queries` (via `@container`) for card-level responsive behavior: cards adapt their internal layout based on their own size rather than the viewport, enabling true component-level responsiveness.
- next/image for optimized image loading with blur placeholders in image cards.
- Tailwind CSS `backdrop-blur` and `bg-opacity` utilities for frosted-glass card effects.
- `clamp()` CSS function for fluid typography that scales smoothly between breakpoints without media query jumps.
- React Intersection Observer for triggering entrance animations and lazy-loading heavy card content (maps, embedded media).

## Expected Output

### Component Structure

```
BentoGrid/
  Layout/
    BentoGridLayout.tsx
    Navbar.tsx
    Footer.tsx
  Grid/
    BentoGrid.tsx
    BentoCard.tsx
    CardVariants/
      FeatureCard.tsx
      MediumCard.tsx
      SmallCard.tsx
      WideCard.tsx
      TallCard.tsx
      ImageCard.tsx
      InteractiveCard.tsx
  CardContent/
    HeroContent.tsx
    AboutContent.tsx
    StatsContent.tsx
    ProjectPreview.tsx
    SocialLinks.tsx
    SkillsMarquee.tsx
    TestimonialQuote.tsx
    ClockWidget.tsx
    MapEmbed.tsx
    MusicPlayer.tsx
    ThemeToggleCard.tsx
    TechBadges.tsx
  Shared/
    GradientBackground.tsx
    ImageWithOverlay.tsx
    AnimatedCounter.tsx
    RevealOnScroll.tsx
    CardHoverEffect.tsx
  config/
    grid-config.ts
    cards-data.ts
    theme-palette.ts
```

### Page Sections

1. Navigation -- minimal top bar or overlay menu
2. Bento Grid Container -- the primary content area holding all cards
   - Feature Card -- hero-level content anchor (2x2)
   - Medium Cards -- secondary content (2x1, 1x2)
   - Small Cards -- compact single-idea blocks (1x1)
   - Wide Cards -- horizontal-format content (3x1, 4x1)
   - Image Cards -- purely visual blocks
   - Interactive Cards -- embedded micro-interactions
3. Footer -- minimal closing element

### Code Requirements

- Use TypeScript with strict mode; define a `BentoCardConfig` interface specifying: `id`, `title`, `type` (feature | medium | small | wide | tall | image | interactive), `colSpan`, `rowSpan`, `background` (solid | gradient | image | blur), `content` (React component or content data), and `href` (optional link destination).
- The grid layout must be driven by a configuration array (`cards-data.ts`) that defines each card's size, position, and content reference. Reordering cards should require only editing the config, not touching component code.
- Implement the grid using CSS Grid with named grid areas or explicit `grid-column` / `grid-row` spans. Avoid using flexbox hacks to simulate grid behavior.
- Define responsive grid templates per breakpoint using Tailwind's responsive prefixes or a custom hook that provides the current breakpoint.
- Each card variant (Feature, Medium, Small, Wide, Image, Interactive) must be a distinct component that receives content via props and handles its own internal layout and styling.
- Background treatments (solid colors, gradients, images with overlays) must be configurable per card via the config object, not hard-coded.
- Entrance animations must use a stagger pattern where the delay is calculated from the card's visual position (top-left to bottom-right), not its DOM order, for a natural cascade effect.
- Provide a complete sample configuration with at least 10 cards of varied types and sizes that produces a visually balanced grid on first render.
- All card components must support an optional `className` prop for one-off style overrides without breaking the design system.
- Ensure the grid has no overflow issues at any viewport width: test that no card extends beyond the grid container or causes horizontal scrolling.
