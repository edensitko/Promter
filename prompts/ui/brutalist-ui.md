# Brutalist UI Design Prompt

## Role

You are a bold, opinionated UI designer and front-end developer who embraces
brutalist web design. You reject polish for the sake of polish. You value raw
structure, honesty of materials, and deliberate rule-breaking. You understand
how to make intentionally rough design feel purposeful and powerful rather than
broken or lazy.

## Task

Build a fully functional, single-page website in the brutalist design tradition.
The page should challenge conventional web aesthetics through raw typography,
exposed structure, stark contrasts, and unconventional layouts while remaining
navigable and content-accessible.

## Design Goals

- **Radical honesty**: Expose the underlying structure of the page. No decorative
  gradients, no rounded corners, no visual sugar. Every element earns its place.
- **Typographic dominance**: Text is the hero. Use oversized, bold, sometimes
  clashing typefaces to create visual hierarchy through sheer scale and weight.
- **Intentional tension**: Misaligned elements, overlapping layers, harsh color
  clashes, and broken grids should feel deliberate, not accidental.
- **Content clarity**: Despite the raw aesthetic, users must be able to find and
  consume content without confusion. Brutalism is not chaos.

## Requirements

### Visual Design

1. Color palette limited to 2-4 high-contrast colors: black, white, and one or two
   accent colors (e.g., electric yellow, raw red, construction orange).
2. No border-radius anywhere. All elements are sharp-cornered rectangles.
3. Borders must be thick (3px+), solid, and black. Use them generously to frame
   and separate content.
4. Backgrounds should be flat solid colors. No gradients, no textures, no patterns.
5. Images, if used, should be raw, unfiltered, and presented at unconventional
   aspect ratios or with harsh `mix-blend-mode` treatments.
6. At least one section should use a deliberately "broken" or overlapping grid
   where elements collide or escape their containers.

### Typography

1. Use a mix of typefaces that create deliberate tension — pair a compressed
   grotesque with a monospace or a stencil face with a serif.
2. Headings must be oversized (clamp between 4rem and 12vw).
3. At least one text element should be rotated, skewed, or positioned
   unconventionally via CSS `transform`.
4. Body text must remain legible — brutalism applies to decoration, not to
   reading comfort.

### Layout

1. A hero section with a single massive headline that dominates the viewport,
   optionally overlapping secondary elements.
2. A content section using an asymmetric or broken grid (CSS Grid with
   intentional overlap via `grid-row` / `grid-column` spanning).
3. A list or index section styled as a raw HTML table or monospaced directory
   listing.
4. A contact or CTA section using a stark full-width color-block with minimal
   centered content.
5. A footer that is either invisible (content ends abruptly) or exaggerated
   (massive, nearly empty, with a single line of text).

### Interactivity

1. Hover states should be abrupt and dramatic: instant color inversion, bold
   underlines, or scale jumps. No ease-in-out transitions.
2. Cursor may change to a custom shape (crosshair, pointer, or a custom SVG).
3. At least one element should respond to scroll position (parallax displacement,
   sticky transformation, or content reveal).
4. All interactive elements must have visible focus states for keyboard navigation.

### Responsiveness

1. The brutalist aesthetic must adapt to mobile without losing its character.
2. Overlapping elements should reflow to stacked layouts on small screens.
3. Oversized type should scale down via `clamp()` while remaining bold.

## Technology Suggestions

| Layer         | Recommended                                          |
|---------------|------------------------------------------------------|
| Markup        | Semantic HTML5 (expose structure, minimal wrappers)  |
| Styling       | CSS3 Grid, custom properties, raw selectors          |
| Fonts         | Google Fonts (Space Mono, Archivo Black, Bebas Neue) |
| Animation     | Minimal — instant transitions, no easing             |
| Framework     | Vanilla JS or Astro (minimal overhead)               |
| Build Tool    | Vite                                                 |
| Accessibility | Focus-visible, skip-links, semantic landmarks        |

## Expected Output Structure

```
brutalist-ui/
  index.html            # Single-page document, minimal markup
  css/
    variables.css       # Color tokens, type scale, border widths
    base.css            # Aggressive reset, global type rules
    layout.css          # Broken grid, overlapping sections
    components.css      # Buttons, tables, color blocks
    responsive.css      # Breakpoint adjustments
  js/
    main.js             # Scroll reactions, cursor customization
  assets/
    fonts/              # Self-hosted brutalist typefaces
    images/             # Raw, unprocessed imagery
```

## Evaluation Criteria

- Strength of the visual statement — the design should provoke a reaction.
- Intentionality — every "broken" element must feel purposeful.
- Content remains accessible and navigable despite the raw aesthetic.
- Code is lean, semantic, and free of unnecessary abstraction.
- Keyboard and screen-reader usability are not sacrificed for style.
