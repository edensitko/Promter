# SaaS Marketing Page Layout Prompt

## Role

You are a senior front-end developer and conversion-focused designer experienced
in building high-converting SaaS marketing pages. You understand pricing psychology,
social proof patterns, feature comparison techniques, and the funnel-oriented layout
structures that drive sign-ups. You balance persuasive design with honest, clear
communication.

## Task

Create a fully functional, multi-section SaaS marketing landing page. The page
must present a software product's value proposition, feature set, pricing tiers,
social proof, and calls to action in a layout designed to convert visitors into
trial users or paying customers.

## Design Goals

- **Clarity of value**: A visitor should understand what the product does and why
  it matters within 5 seconds of landing on the page.
- **Trust building**: Social proof, logos, testimonials, and metrics create
  confidence before the visitor reaches the pricing section.
- **Frictionless conversion**: CTAs are prominent, repeated, and contextually
  placed. The pricing section removes ambiguity.
- **Professional polish**: The page must look like a credible, funded product —
  clean type, consistent spacing, refined micro-interactions.

## Requirements

### Visual Design

1. Clean, modern SaaS aesthetic: generous whitespace, subtle shadows, soft rounded
   corners (8-12px border-radius).
2. Color palette: neutral base (white and slate/gray tones) with a single bold
   primary accent color for CTAs and highlights. Optional secondary accent for
   the premium pricing tier.
3. Sans-serif typeface for all text (Inter, DM Sans, or similar). Bold weights
   for headings; regular/medium for body.
4. Consistent icon style throughout (outline or filled, not mixed). Use a library
   like Lucide, Phosphor, or Heroicons.
5. Product screenshots or mockups presented in device frames (browser, phone) with
   subtle shadow and rotation for depth.

### Layout Sections (in order)

1. **Navigation Bar**: Logo, nav links (Features, Pricing, Testimonials, Blog),
   "Sign In" text link, and "Get Started" primary CTA button. Sticky on scroll.

2. **Hero Section**: Large headline (benefit-driven, not feature-driven), supporting
   sub-headline (1-2 sentences), primary CTA button, secondary CTA (e.g., "Watch
   Demo"), and a hero image or product screenshot. Optional: a row of trusted-by
   logos beneath the CTAs.

3. **Logo Bar**: A horizontal strip of 5-8 grayscale client or press logos with
   a label like "Trusted by 10,000+ teams worldwide."

4. **Features Section**: 3-6 feature blocks in a responsive grid. Each block
   includes an icon, a short title, and a 1-2 sentence description. One feature
   may be expanded into a full-width spotlight with a screenshot and detailed
   explanation.

5. **Feature Comparison Section**: A side-by-side or tabbed comparison showing
   the product vs. alternatives, or a before/after transformation visual.

6. **Metrics / Stats Bar**: 3-4 key numbers displayed prominently (e.g.,
   "99.9% uptime", "50M+ API calls/day", "4.9 star rating", "150+ integrations").

7. **Pricing Section**: 3 pricing tiers displayed as cards side by side:
   - Each card: plan name, monthly price (with annual toggle showing savings),
     feature bullet list with checkmarks, CTA button.
   - The recommended plan is visually highlighted (border, badge, or background).
   - A "Compare all features" expandable table beneath the cards with row-by-row
     feature breakdown across all tiers.

8. **Testimonials Section**: 3 customer testimonials in cards. Each includes a
   quote, customer name, title, company, and avatar/logo. Optional: star rating.

9. **FAQ Section**: 6-8 questions in an accordion (expand/collapse) pattern. Common
   SaaS questions: free trial, cancellation, data security, integrations.

10. **Final CTA Section**: A full-width gradient or colored banner with a compelling
    headline, supporting text, and a prominent "Start Free Trial" button.

11. **Footer**: Product links, company links, legal links, social icons, and a
    copyright line.

### Interactivity

1. Sticky navigation that adds a background/shadow on scroll.
2. Pricing toggle between monthly and annual billing with animated price update.
3. FAQ accordion with smooth expand/collapse animation.
4. Scroll-triggered entrance animations on feature cards and testimonials.
5. Smooth scroll to sections when nav links are clicked.
6. Optional: a floating "Get Started" button on mobile that appears after scrolling
   past the hero.

### Responsiveness

1. Full layout adapts to desktop (1200px+), tablet (768px-1199px), and mobile
   (below 768px).
2. Pricing cards stack vertically on mobile with the recommended plan first.
3. Navigation collapses to a hamburger menu on mobile.
4. Feature comparison table scrolls horizontally on small screens.
5. Logo bar wraps or becomes a scrolling marquee on mobile.

## Technology Suggestions

| Layer         | Recommended                                         |
|---------------|-----------------------------------------------------|
| Markup        | Semantic HTML5                                      |
| Styling       | CSS3 Grid + Flexbox, custom properties              |
| Fonts         | Google Fonts (Inter or DM Sans)                     |
| Icons         | Lucide Icons or Heroicons (SVG)                     |
| Animation     | CSS transitions + Intersection Observer, or AOS     |
| Framework     | Next.js, Astro, or Vanilla JS                       |
| Build Tool    | Vite or framework-native bundler                     |
| Accessibility | ARIA roles, keyboard-accessible accordion, focus mgmt|

## Expected Output Structure

```
saas-layout/
  index.html                # Full marketing page
  css/
    variables.css           # Color tokens, type scale, spacing, radii
    base.css                # Reset, global typography
    layout.css              # Section containers, grid definitions
    components.css          # Navbar, pricing cards, accordion, testimonials
    responsive.css          # Breakpoint overrides
  js/
    main.js                 # Sticky nav, pricing toggle, accordion, scroll anims
  assets/
    icons/                  # SVG icon files
    images/                 # Product screenshots, avatars, logos
  data/
    pricing.json            # Tier definitions and feature matrix
```

## Evaluation Criteria

- Value proposition is immediately clear in the hero section.
- Pricing section is unambiguous, with a working monthly/annual toggle.
- Social proof (logos, testimonials, stats) is strategically placed before pricing.
- FAQ accordion is smooth and keyboard-accessible.
- Page is fully responsive and looks polished at every breakpoint.
- CTA buttons are prominent, repeated, and consistently styled.
- Code is semantic, accessible, and well-structured.
