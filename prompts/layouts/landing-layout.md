# Landing Page Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in high-converting landing page layouts. You have deep expertise in visual hierarchy, conversion-rate optimization, and crafting persuasive digital experiences that guide visitors toward a single, clear call to action. You understand how whitespace, typography scale, and section pacing influence user engagement and scroll depth.

## Task

Design and build a complete, production-ready landing page layout that communicates a product or service value proposition with clarity and confidence. The page must follow a proven top-to-bottom narrative flow: capture attention, establish credibility, present benefits, reinforce trust through social proof, and convert with a decisive call to action. Every section should feel intentional, with smooth visual transitions between blocks and a consistent design language throughout.

## Layout Structure

The landing page is composed of the following sequential sections, each serving a distinct role in the conversion funnel:

1. **Navigation Bar** -- Fixed or sticky top bar with logo on the left, horizontal nav links in the center or right, and a primary CTA button (e.g., "Get Started" or "Sign Up") at the far right. Include a mobile hamburger menu for smaller viewports.

2. **Hero Section** -- Full-width section occupying at least 80vh. Contains a bold headline (H1), a supporting subheadline (H2 or paragraph), a primary CTA button, and optionally a secondary CTA link. Accompanied by a hero image, illustration, or short looping video on the right or as a background. Consider adding a subtle trust indicator (e.g., "Trusted by 10,000+ teams") directly beneath the CTAs.

3. **Social Proof Bar** -- A horizontal strip displaying partner logos, client logos, or press mentions. Keep it minimal: grayscale logos on a slightly contrasting background. This section bridges the hero and the features section, lending immediate credibility.

4. **Features Section** -- A grid (typically 3 or 4 columns on desktop) of feature cards. Each card includes an icon or small illustration, a short title, and a one-to-two-sentence description. The section should have a centered heading and optional subheading above the grid.

5. **How It Works Section** -- A step-by-step breakdown (3 to 4 steps) presented horizontally with numbered indicators or a visual timeline. Each step has an icon or illustration, a title, and a brief description. This section demystifies the product or onboarding process.

6. **Testimonials Section** -- A carousel or grid of customer testimonials. Each testimonial card includes a quote, the customer's name, role/company, and optionally a headshot or company logo. Use quotation marks or a quote icon for visual reinforcement.

7. **Pricing Section (Optional)** -- Two or three pricing tier cards displayed side by side. Each card lists the plan name, price, a feature checklist, and a CTA button. Highlight the recommended plan with a visual distinction such as a border, badge, or scale increase.

8. **Final CTA Section** -- A visually distinct, full-width banner with a compelling closing headline, a short paragraph, and a prominent CTA button. Use a contrasting background color or gradient to set it apart from the rest of the page.

9. **Footer** -- Multi-column footer containing logo, navigation link groups (Product, Company, Resources, Legal), social media icons, and a copyright notice. Optionally include a newsletter signup input.

## Design Goals

- Achieve a clear and unambiguous visual hierarchy so that the visitor's eye naturally flows from headline to CTA to features to social proof to conversion.
- Maintain generous whitespace between sections to prevent visual fatigue and give each block room to breathe.
- Use a single primary accent color for all CTA buttons and interactive elements, ensuring they stand out against neutral backgrounds.
- Limit the typography system to two font families maximum: one for headings (bold, high-impact) and one for body text (clean, highly legible).
- Aim for a Lighthouse performance score above 90 by optimizing images, minimizing layout shifts, and avoiding render-blocking resources.
- Ensure the overall aesthetic feels modern, trustworthy, and professional, suitable for SaaS, fintech, or B2B products.

## UI Requirements

- All interactive elements (buttons, links, cards) must have clearly visible hover and focus states with smooth transitions (150ms to 250ms ease).
- Buttons follow a consistent sizing scale: large primary CTAs (px-8 py-4 text-lg), medium secondary CTAs (px-6 py-3 text-base), and small tertiary links.
- Icons should come from a single, consistent icon library (e.g., Lucide, Heroicons, or Phosphor Icons).
- Images must use next-gen formats (WebP or AVIF) with proper width/height attributes to prevent cumulative layout shift.
- All text must meet WCAG 2.1 AA contrast requirements (minimum 4.5:1 for body text, 3:1 for large text).
- Implement smooth scroll behavior for in-page anchor links from the navigation bar.
- Form inputs (if present, e.g., newsletter signup) must include proper labels, placeholder text, validation states, and error messages.
- Use semantic HTML elements throughout: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`.

## Responsive Behavior

- **Desktop (1280px and above):** Full multi-column layouts. Hero content and image side by side. Feature grid at 3 or 4 columns. Pricing cards in a row. Navigation fully expanded.
- **Tablet (768px to 1279px):** Feature grid collapses to 2 columns. Hero image stacks below hero text or reduces in size. Pricing cards may stack or remain in a scrollable row. Navigation condenses but may remain visible.
- **Mobile (below 768px):** Single-column layout throughout. Navigation collapses into a hamburger menu with a slide-in or full-screen overlay. Hero section becomes text-first with the image below or hidden. Testimonials switch to a single-card carousel with swipe. Footer columns stack vertically. All tap targets meet the minimum 44x44px accessibility guideline.

## Technology Suggestions

- React 18+ or Next.js 14+ (App Router) for component-based architecture and optional server-side rendering.
- Tailwind CSS 3+ for utility-first styling with a custom theme configuration for colors, spacing, and typography.
- Framer Motion for scroll-triggered entrance animations and micro-interactions on CTA buttons.
- next/image or a responsive image component for automatic format optimization and lazy loading.
- Embla Carousel or Swiper for the testimonials carousel, chosen for accessibility and bundle size.
- React Intersection Observer for triggering animations as sections enter the viewport.

## Expected Output

### Component Structure

```
LandingPage/
  Navbar/
    Navbar.tsx
    MobileMenu.tsx
  HeroSection/
    HeroSection.tsx
  SocialProofBar/
    SocialProofBar.tsx
    LogoItem.tsx
  FeaturesSection/
    FeaturesSection.tsx
    FeatureCard.tsx
  HowItWorks/
    HowItWorks.tsx
    StepItem.tsx
  Testimonials/
    Testimonials.tsx
    TestimonialCard.tsx
  Pricing/
    Pricing.tsx
    PricingCard.tsx
  FinalCTA/
    FinalCTA.tsx
  Footer/
    Footer.tsx
    FooterColumn.tsx
```

### Page Sections

1. Navbar -- sticky, transparent-to-solid on scroll
2. Hero Section -- headline, subheadline, CTA, hero visual
3. Social Proof Bar -- logo strip
4. Features Section -- icon + title + description grid
5. How It Works -- numbered step timeline
6. Testimonials -- carousel or grid of quotes
7. Pricing -- tiered plan cards (optional)
8. Final CTA -- closing conversion banner
9. Footer -- links, social icons, copyright

### Code Requirements

- Use TypeScript with strict mode enabled for all components.
- Define prop interfaces for every component; avoid using `any`.
- Extract repeated values (colors, spacing tokens, section content) into a centralized constants or config file.
- Write each section as a self-contained component that receives its content via props or a data file, enabling easy content swaps.
- Include aria-labels on icon-only buttons and links, proper heading hierarchy (single H1, sequential H2/H3), and skip-navigation link.
- Keep individual component files under 150 lines; extract sub-components when complexity grows.
- Ensure zero ESLint warnings under a standard config (e.g., eslint-config-next or airbnb-typescript).
- Provide a sample data file (e.g., `landing-data.ts`) containing placeholder content for all sections so the page renders fully on first build.
