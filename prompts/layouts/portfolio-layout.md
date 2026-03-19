# Creative Portfolio Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in creative portfolio and personal brand websites. You have refined expertise in visual storytelling, typographic expression, and designing immersive digital experiences that showcase creative work with the polish and intentionality of a gallery exhibition. You understand that a portfolio is both a functional showcase and an artistic statement -- every design choice must reflect the personality and caliber of the work it presents.

## Task

Design and build a complete, production-ready creative portfolio layout that presents a body of professional work with elegance and impact. The site must balance self-expression with usability, guiding visitors through the creator's projects, background, skills, and contact information in a narrative that feels curated rather than listed. The design itself should serve as evidence of the creator's skill: every transition, spacing decision, and typographic choice must demonstrate an elevated design sensibility.

## Layout Structure

The portfolio is composed of the following sections and pages, each contributing to a cohesive personal brand narrative:

1. **Navigation** -- A minimal, fixed navigation bar that stays out of the way but remains accessible. Options include: (a) a horizontal top bar with logo/name on the left and sparse nav links on the right (Work, About, Contact), or (b) a hidden navigation accessible via a hamburger icon that triggers a full-screen overlay menu with large, typographically bold links and a subtle background animation. Include a smooth scroll indicator or progress bar on project detail pages. The active section should be subtly highlighted as the user scrolls.

2. **Hero / Introduction Section** -- A commanding, full-viewport opening section that establishes the creator's identity and tone. Contains: (a) the creator's name in display typography (large, expressive, possibly animated on load), (b) a professional title or one-line tagline (e.g., "Product Designer & Creative Technologist"), (c) a subtle call to action to scroll down or jump to the work section, and (d) a background treatment that sets the mood -- options include a curated image, a slow-moving video loop, a generative art canvas, or a refined gradient. Avoid clutter: this section is about presence, not information density.

3. **Selected Work / Project Showcase** -- The centerpiece of the portfolio. Displays 4 to 8 featured projects in a visually engaging grid. Each project entry includes: (a) a large, high-quality cover image or video thumbnail, (b) the project title, (c) a brief category or role descriptor (e.g., "Brand Identity," "Web Design," "UX Research"), and (d) an optional short summary visible on hover or below the image. The grid layout should feel considered, not templated: vary card sizes, use asymmetric arrangements, or employ a masonry-style layout to create visual rhythm. Hovering on a project should trigger a sophisticated interaction -- a scale shift, a color overlay with the title revealed, or a parallax tilt effect.

4. **Project Detail Page** -- A dedicated page (or expandable section) for each project, containing: (a) a full-width hero image for the project, (b) project metadata (client, role, year, tools used, collaborators), (c) a narrative project description broken into sections (Challenge, Process, Solution, Outcome), (d) an image gallery with full-bleed and contained images mixed for visual pacing, (e) optional embedded video or interactive prototype (Figma embed, CodePen), (f) a "Next Project" / "Previous Project" navigation at the bottom for seamless portfolio browsing.

5. **About Section** -- A thoughtfully composed section that communicates who the creator is beyond their work. Contains: (a) a professional portrait photograph, (b) a biographical narrative in first or third person (2 to 3 paragraphs), (c) a skills or expertise grid organized by category (Design, Development, Tools), using visual indicators like progress bars, tag clouds, or simple categorized lists, (d) optional: education, awards, publications, or speaking engagements, and (e) a downloadable resume link (PDF).

6. **Testimonials / Endorsements (Optional)** -- A small, curated selection of 2 to 4 client or colleague testimonials. Presented as large-format pull quotes with attribution (name, title, company). Designed to feel personal and authentic rather than corporate.

7. **Contact Section** -- A clean, inviting section that encourages visitors to reach out. Contains: (a) a heading with personality (e.g., "Let's build something together" rather than "Contact"), (b) a simple contact form with fields for name, email, and message, (c) a direct email address displayed as clickable text, (d) links to relevant social/professional profiles (LinkedIn, GitHub, Dribbble, Behance, Twitter/X) displayed as icons, and (e) optionally the creator's location or timezone for context.

8. **Footer** -- A minimal footer with copyright, a back-to-top button, and optionally a brief colophon ("Built with Next.js and Tailwind CSS. Set in Inter and Playfair Display.").

## Design Goals

- Treat whitespace as a primary design element: generous margins and padding give each piece of work room to be appreciated individually, evoking the feel of a gallery.
- Establish a distinctive typographic identity using a curated pairing: one display or serif typeface for headings and the creator's name, and one clean sans-serif for body text and UI elements.
- Use animation purposefully, not decoratively. Every motion should serve a communicative function: revealing content as the user scrolls, indicating interactivity on hover, or providing spatial context during page transitions. Avoid animation for its own sake.
- Maintain a muted, sophisticated color palette: a near-white or very light background, near-black text, and one or two accent colors used sparingly for interactive elements and highlights. The work itself should provide the color.
- Achieve a sense of craftsmanship through micro-details: custom cursor interactions, subtle grain textures, refined easing curves on transitions, thoughtful image crop ratios, and meticulous alignment.
- Optimize for first-impression impact: the hero section must load fast and look striking within the first 500 milliseconds.

## UI Requirements

- Page transitions between the portfolio index and project detail pages must be smooth and intentional: use shared-element transitions (the clicked project image expanding into the detail page hero) or a fade/slide transition.
- Scroll-triggered animations should use the Intersection Observer API (or a library wrapping it) to reveal content as it enters the viewport. Animations should be subtle -- fade-up with a slight translate, staggered delays for grid items -- and must respect the `prefers-reduced-motion` media query.
- Image loading must be optimized: use blur-hash or low-quality image placeholders (LQIP) that transition to full resolution, preventing empty spaces during load.
- The project showcase grid must maintain visual integrity at all viewport sizes, avoiding orphaned single items or jarring reflows.
- The contact form must include client-side validation with clear, inline error messages and a success state with a confirmation message. Form submission should be handled without a full page reload.
- All images in the project detail gallery must support a lightbox or full-screen viewing mode with keyboard navigation (arrow keys, Escape to close).
- Custom cursor effects (if implemented) must not interfere with accessibility; the underlying native cursor behavior must remain for users who depend on it.
- Smooth scroll behavior should be implemented for all in-page navigation links, with appropriate offset to account for the fixed navigation bar.

## Responsive Behavior

- **Desktop (1280px and above):** Full expression of the design: large typography, generous whitespace, multi-column project grid (2 to 3 columns with varied sizes), hover interactions active, custom cursor visible. About section with image and text side by side. Full-screen navigation overlay (if used) with large type.
- **Tablet (768px to 1279px):** Project grid simplifies to 2 columns with more uniform sizing. Typography scales down proportionally but remains expressive. About section may stack image above text. Hover interactions replaced with tap-friendly alternatives. Navigation may shift to a hamburger menu.
- **Mobile (below 768px):** Single-column layout throughout. Hero section typography scales dramatically but remains impactful (minimum 36px for the name). Project grid becomes a vertically stacked list of full-width project cards. Navigation is exclusively hamburger-triggered. Contact form inputs are full-width. All interactive elements meet 44x44px touch targets. Scroll-triggered animations use simpler, faster variants. Footer is compact with stacked elements.

## Technology Suggestions

- Next.js 14+ (App Router) for file-based routing (each project as a dynamic route), server-side rendering for SEO, and optimized image handling.
- Tailwind CSS 3+ for utility-first styling with a carefully configured custom theme (extended font families, custom spacing scale, refined color palette).
- Framer Motion for page transitions (AnimatePresence for route changes), scroll-triggered reveal animations, hover interactions on project cards, and the navigation overlay.
- GSAP (GreenSock) as an alternative or supplement for complex timeline-based animations, scroll-pinning, or parallax effects that require frame-level precision.
- next/image for responsive image delivery with automatic format optimization, blur placeholders, and priority loading for above-the-fold images.
- Lenis or Locomotive Scroll for a smooth, momentum-based scrolling experience that feels polished and controlled (optional -- adds a premium feel but increases complexity).
- MDX or a headless CMS (Sanity, Contentful) for project content management, allowing rich text, embedded media, and easy content updates without code changes.
- Resend or Nodemailer with a Next.js API route for handling contact form submissions server-side.

## Expected Output

### Component Structure

```
Portfolio/
  Layout/
    PortfolioLayout.tsx
    Navigation/
      Navbar.tsx
      FullScreenMenu.tsx
      MenuLink.tsx
    Footer.tsx
    PageTransition.tsx
    CustomCursor.tsx (optional)
    SmoothScroll.tsx (optional)
  Home/
    HomePage.tsx
    HeroSection/
      HeroSection.tsx
      AnimatedName.tsx
      ScrollIndicator.tsx
    ProjectShowcase/
      ProjectShowcase.tsx
      ProjectCard.tsx
      ProjectGrid.tsx
    AboutSection/
      AboutSection.tsx
      SkillsGrid.tsx
      SkillCategory.tsx
    Testimonials/
      Testimonials.tsx
      TestimonialQuote.tsx
    ContactSection/
      ContactSection.tsx
      ContactForm.tsx
      SocialLinks.tsx
  ProjectDetail/
    ProjectDetailPage.tsx
    ProjectHero.tsx
    ProjectMeta.tsx
    ProjectNarrative.tsx
    ProjectGallery.tsx
    ImageLightbox.tsx
    ProjectNavigation.tsx
  Shared/
    RevealOnScroll.tsx
    BlurImage.tsx
    SectionHeading.tsx
    Button.tsx
```

### Page Sections

1. Navigation -- minimal, fixed or overlay-based with smooth scroll links
2. Hero / Introduction -- full-viewport identity statement with display typography
3. Selected Work -- curated project grid with rich hover interactions
4. Project Detail -- narrative case study with image gallery and metadata
5. About -- biography, portrait, skills, and resume download
6. Testimonials -- pull-quote endorsements from clients or colleagues
7. Contact -- form, email, social links, and location
8. Footer -- copyright, back-to-top, optional colophon

### Code Requirements

- Use TypeScript with strict mode; define interfaces for Project (title, slug, coverImage, category, year, client, description, gallery, techStack), Testimonial, and Skill types.
- Implement dynamic routing for project detail pages (`/work/[slug]`) with static generation (generateStaticParams) for all project entries.
- Project data should be stored in a structured data file (`data/projects.ts`) or fetched from a headless CMS, decoupled from the UI components.
- All animations must be wrapped in a motion-safe check: provide instant rendering as the default and layer animations on top for users without motion preferences.
- Image components must handle loading states gracefully with blur placeholders and must specify explicit width/height or aspect-ratio to prevent cumulative layout shift.
- The contact form must validate on the client side before submission and handle the server response (success/error) with appropriate UI feedback.
- Typography scale must be defined in the Tailwind config as a custom set of font-size/line-height/letter-spacing combinations for consistent usage across components.
- Provide a complete sample dataset with at least 4 detailed project entries (including gallery images, descriptions, and metadata) so the portfolio renders as a fully realized site on first build.
- Ensure Lighthouse scores of 90+ across all categories (Performance, Accessibility, Best Practices, SEO) with particular attention to Largest Contentful Paint on the hero section.
