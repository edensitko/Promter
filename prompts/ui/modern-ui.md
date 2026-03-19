# Modern UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in modern, contemporary design systems. You have deep expertise in creating clean, sophisticated interfaces that balance aesthetics with usability. Your work is informed by the latest trends from leading design teams at companies like Apple, Stripe, Linear, and Vercel.

## Task

Design and build a modern, visually striking website UI that communicates professionalism and forward-thinking craftsmanship. The interface should feel fresh, intentional, and polished --- leveraging bold typography, generous whitespace, smooth micro-interactions, and a refined color palette. Every element on the page must serve a clear purpose, and the overall composition should guide the user's eye naturally through the content hierarchy.

## Design Goals

- **Clarity above all**: Every section, component, and element must communicate its purpose instantly. Remove anything that does not directly support comprehension or engagement.
- **Bold visual hierarchy**: Use scale contrast between headings, subheadings, and body text to create a strong typographic rhythm that draws users through the page.
- **Purposeful whitespace**: Treat negative space as a first-class design element. Generous margins and padding should give content room to breathe and reinforce grouping.
- **Polished micro-interactions**: Subtle hover states, smooth scroll behaviors, and refined transitions should make the interface feel alive without being distracting.
- **Responsive excellence**: The design must look intentional and beautiful across all breakpoints --- from large desktop monitors down to mobile devices.

## UI Requirements

- A full-width hero section with a large headline (48px--80px), a concise subtitle, and a prominent call-to-action button with hover animation.
- A navigation bar that is minimal, sticky, and uses a transparent-to-solid background transition on scroll.
- Section dividers that use whitespace and subtle background color shifts rather than hard lines.
- Card-based content layouts with rounded corners (12px--16px), soft drop shadows, and slight scale-up on hover.
- Icon usage should be consistent, using a single icon library (such as Lucide or Heroicons) at uniform stroke widths.
- Image treatments should include subtle border-radius and optional soft shadow or gradient overlays.
- A footer with clear column layout, muted color scheme, and logical link grouping.
- Accessible color contrast ratios meeting WCAG AA standards at minimum.
- Smooth page-level scroll animations using intersection observers or a library like Framer Motion.

## Color Palette Guidelines

Adopt a neutral-dominant palette with one strong accent color to anchor interactive elements and calls to action.

- **Primary background**: White (`#FFFFFF`) or near-white (`#FAFAFA`).
- **Secondary background**: Light gray (`#F3F4F6`) for alternating sections.
- **Primary text**: Dark charcoal (`#111827`) for headings, medium gray (`#4B5563`) for body copy.
- **Accent color**: A single vibrant hue --- electric blue (`#2563EB`), violet (`#7C3AED`), or emerald (`#059669`) --- used sparingly for buttons, links, and highlights.
- **Border and divider tones**: Very light gray (`#E5E7EB`) to maintain subtlety.
- **Hover and active states**: Darken accent by 10--15% or add a subtle box-shadow glow in the accent hue.

## Typography

- **Heading font**: Inter, Satoshi, or General Sans --- set in semibold or bold weight. Use letter-spacing of `-0.02em` to `-0.04em` for tighter, more modern headline feel.
- **Body font**: Inter or system font stack for optimal readability at 16px--18px base size with 1.6--1.75 line-height.
- **Monospace accent** (optional): JetBrains Mono or Fira Code for any code snippets or technical labels.
- **Scale**: Use a modular type scale (e.g., 1.250 or 1.333 ratio) to maintain consistent hierarchy across headings (h1 through h6) and body text.

## Technology Suggestions

- **Framework**: React 18+ or Next.js 14+ (App Router) for component-based architecture and server-side rendering.
- **Styling**: Tailwind CSS 3+ for utility-first styling with a well-configured `tailwind.config.js` extending the default theme.
- **Animations**: Framer Motion for declarative entrance animations, hover effects, and layout transitions.
- **Icons**: Lucide React or Heroicons for a clean, consistent icon set.
- **Fonts**: Google Fonts or Fontsource for self-hosted font loading with `font-display: swap`.
- **Linting**: ESLint + Prettier configured for consistent code formatting.

## Expected Output

### Component Structure

Generate the following components, each in its own file:

- `Navbar.tsx` --- Sticky navigation with transparent-to-solid scroll behavior, logo, nav links, and CTA button.
- `Hero.tsx` --- Full-width hero with large headline, subtitle, primary CTA, and optional secondary action.
- `Features.tsx` --- Grid or alternating layout showcasing 3--6 features with icons, titles, and descriptions.
- `Testimonials.tsx` --- Carousel or grid of testimonial cards with avatar, quote, name, and role.
- `CTA.tsx` --- A visually distinct call-to-action banner section with contrasting background.
- `Footer.tsx` --- Multi-column footer with navigation links, social icons, and copyright.
- `Layout.tsx` --- Wrapper component that composes Navbar, main content area, and Footer.

### Code Requirements

- All components must be written in TypeScript with proper type annotations and interfaces.
- Use functional components with React hooks exclusively --- no class components.
- Tailwind classes should be organized logically: layout, spacing, typography, color, then state variants.
- Responsive design must be implemented using Tailwind breakpoint prefixes (`sm:`, `md:`, `lg:`, `xl:`).
- Animations should degrade gracefully and respect the `prefers-reduced-motion` media query.
- Semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`) must be used throughout.
- All interactive elements must be keyboard-accessible with visible focus indicators.

### Design Explanation

Accompany the code with a brief design rationale (3--5 paragraphs) that covers:

1. The visual strategy --- why this particular layout and typographic treatment was chosen.
2. Color usage --- how the palette supports brand perception and guides user attention.
3. Interaction design --- what micro-interactions are used and why they improve UX.
4. Responsive approach --- how the layout adapts across breakpoints and what trade-offs were made.
5. Accessibility considerations --- specific steps taken to ensure inclusive design.
