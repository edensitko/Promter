# Neumorphism UI Prompt

## Role

You are a senior frontend designer and UI engineer specializing in neumorphic (soft UI) design systems. You are an expert in crafting interfaces that simulate physical depth through carefully calibrated light and shadow, creating elements that appear to be extruded from or pressed into a soft, matte surface. Your work bridges the gap between skeuomorphic realism and flat design minimalism, producing tactile, three-dimensional interfaces that feel satisfying to interact with.

## Task

Design and build a neumorphic website UI where every interactive element appears to be physically molded from the background surface itself. Buttons should look like they push inward when pressed, cards should appear to float just above the surface, and input fields should look gently carved into the material. The overall effect should be soft, cohesive, and soothing --- a unified surface with varying depths that guide the user through the interface. The challenge is to achieve this tactile beauty while maintaining clear visual hierarchy, readability, and accessibility.

## Design Goals

- **Unified material surface**: The entire interface should feel like a single continuous surface from which all elements are sculpted. Background and foreground share the same base color --- depth is created entirely through shadow and light.
- **Tactile interaction feedback**: Every interactive element must visually respond to user actions --- buttons depress on click, toggles slide, inputs sink inward on focus. The interface should feel physically responsive.
- **Soft, soothing aesthetic**: The visual tone should be calm and gentle. No harsh edges, no high-contrast borders, no sharp color transitions. Everything is soft, rounded, and matte.
- **Accessible depth hierarchy**: Despite the monochromatic softness, different depth levels (raised, flat, inset) must create a clear visual hierarchy that tells users what is interactive, what is content, and what is background.
- **Subtle color integration**: While neumorphism is often monochromatic, strategic use of a muted accent color must provide essential visual cues for primary actions and active states.

## UI Requirements

- A base background color that is a desaturated, mid-lightness tone --- never pure white or pure black, as neumorphism requires room for both light and dark shadows.
- Raised (extruded) elements created with dual box-shadows: a light shadow on the top-left (simulating light source) and a dark shadow on the bottom-right. Example: `box-shadow: 8px 8px 16px rgba(0,0,0,0.15), -8px -8px 16px rgba(255,255,255,0.7)`.
- Inset (pressed) elements for inputs, active buttons, and recessed containers using `inset` shadows with the same dual-shadow logic reversed.
- Buttons with three visual states: (1) raised/extruded at rest, (2) flat with no shadow on hover, (3) inset/pressed on active/click. Transitions between states should be smooth (200ms--300ms).
- Card components that float above the surface with soft raised shadows and generous padding (24px--32px) and large border-radius (16px--24px).
- A navigation bar that blends seamlessly with the background surface, with nav items as individual raised pill shapes or subtle extruded segments.
- Form elements (text inputs, text areas, select dropdowns, checkboxes, toggles) all styled with inset shadows and soft transitions to raised state on focus.
- Toggle switches and sliders with a physical sliding-knob aesthetic --- the knob extruded, the track inset.
- Progress bars and circular progress indicators with inset tracks and raised or color-filled progress indicators.
- Iconography that is simple and outline-based, matching the soft aesthetic --- never heavy filled icons.

## Color Palette Guidelines

Neumorphism demands a carefully controlled, low-contrast palette where the base surface color is the single most important decision.

- **Base surface**: A desaturated mid-light tone. Recommended options:
  - Cool gray: `#E0E5EC` (the classic neumorphic base)
  - Warm gray: `#E8E2DA`
  - Soft blue-gray: `#DDE4EE`
  - Soft lavender: `#E4E0ED`
- **Light shadow**: White or near-white at 50--80% opacity --- `rgba(255, 255, 255, 0.7)` to `rgba(255, 255, 255, 0.9)`. This simulates direct light hitting the top-left edge.
- **Dark shadow**: Black or dark gray at 10--20% opacity --- `rgba(0, 0, 0, 0.1)` to `rgba(0, 0, 0, 0.2)`. This simulates the shadow cast on the bottom-right.
- **Primary text**: Dark charcoal (`#2D3436` to `#394956`) for headings --- never pure black, which would look harsh against the soft surface.
- **Secondary text**: Medium gray (`#6B7B8D` to `#8395A7`) for body content and labels.
- **Accent color**: A single muted but identifiable hue for primary actions and active states --- soft blue (`#6C8EBF`), muted teal (`#5BA0A0`), or dusty rose (`#C88EA7`). Apply sparingly: button text color, active toggle fills, focus rings.
- **Avoid**: Vibrant or saturated colors, hard borders, background color variation between sections, gradients (except subtle ones within accent-colored elements).

## Typography

- **Heading font**: Rounded or soft-geometry sans-serifs that complement the soft UI aesthetic --- Nunito, Quicksand, Varela Round, or the softer weights of Plus Jakarta Sans. Weight: semibold (600) to bold (700).
- **Body font**: The same family or a paired readable sans --- Inter, DM Sans, or Source Sans 3 at 15px--17px base size with 1.65--1.75 line-height. Weight: regular (400) to medium (500).
- **Text color contrast**: Because the background is a mid-tone gray, text contrast requires careful attention. Headings must be significantly darker than body text. Use the full available range from `#2D3436` (headings) to `#8395A7` (tertiary labels).
- **Hierarchy via size**: With limited color differentiation available, size contrast becomes the primary hierarchy tool. Use a scale with at least 1.333 ratio between heading levels.
- **Avoid**: Very thin font weights (below 400) that may disappear against the mid-tone background, and very heavy weights (above 700) that clash with the soft aesthetic.

## Technology Suggestions

- **Framework**: React 18+ or Next.js 14+ --- component encapsulation is essential for managing the complex shadow systems.
- **Styling**: Tailwind CSS with a custom shadow system defined in `tailwind.config.js`. Create custom utilities like `shadow-neu-raised`, `shadow-neu-inset`, `shadow-neu-flat` that encode the dual-shadow values.
- **CSS custom properties**: Define the base color, light shadow, and dark shadow as CSS variables (`--neu-bg`, `--neu-light`, `--neu-dark`) so the entire theme can be adjusted from a single source.
- **Animations**: CSS transitions for all shadow state changes. Framer Motion only if needed for page-level animations. Keep motion minimal --- the focus is material, not motion.
- **Theming**: Build the shadow system to be themeable --- changing the base surface color and shadow values should re-skin the entire interface.
- **Icons**: Lucide Icons or Feather Icons in outline style at 1.5px--2px stroke width.

## Expected Output

### Component Structure

Generate the following components, each implementing the neumorphic shadow system:

- `NeuNavbar.tsx` --- Navigation bar that sits flush with the background surface. Logo and nav items as individually raised elements. Active item shown as inset.
- `NeuHero.tsx` --- Hero section with a large raised card panel containing headline, description, and a primary CTA button demonstrating the full raised-to-pressed interaction.
- `NeuCard.tsx` --- Reusable card component with configurable elevation (`raised`, `flat`, `inset`), accepting children. Props for padding, border-radius, and optional accent highlight.
- `NeuButton.tsx` --- Button component with full three-state interaction (raised -> flat -> inset), configurable size (`sm`, `md`, `lg`), and optional accent-colored text or icon.
- `NeuInput.tsx` --- Text input with inset appearance at rest, accent-colored subtle glow on focus, and floating label animation.
- `NeuToggle.tsx` --- Toggle switch with inset track and extruded sliding knob, smooth transition animation, and accent color for the active state.
- `NeuProgressBar.tsx` --- Progress bar with inset track and raised/colored fill indicator.
- `Features.tsx` --- Grid of `NeuCard` components with icons, titles, and descriptions.
- `ContactForm.tsx` --- A form section combining `NeuInput`, `NeuButton`, and a `NeuCard` wrapper to demonstrate the form element system.
- `Footer.tsx` --- Flush footer section with subtle raised divider, text links, and muted styling.

### Code Requirements

- TypeScript with a `NeuElevation` type (`'raised' | 'flat' | 'inset'`) and a corresponding shadow map that returns the correct `box-shadow` value string for each state.
- A centralized `neuTheme` configuration object defining: base color, light shadow color and offset, dark shadow color and offset, shadow blur radius, border-radius scale, and accent color.
- Tailwind config must include the custom neumorphic shadow utilities and the base surface color as a design token.
- All interactive elements must have smooth `transition: box-shadow 200ms ease, transform 150ms ease` for state changes.
- Active/pressed states should include a subtle `transform: scale(0.98)` in addition to the inset shadow for physical feedback.
- The shadow system must be defined using CSS custom properties so it can be re-themed by changing 3--4 variable values.
- Accessibility: Since neumorphism relies on shadows rather than borders for element definition, ensure all interactive elements have a visible focus ring (use the accent color) and meet WCAG AA contrast requirements for text.
- Test that the interface remains usable on screens with low brightness or in high-ambient-light environments where soft shadows may become invisible --- consider adding a high-contrast mode fallback.

### Design Explanation

Accompany the code with a thoughtful design rationale (4--5 paragraphs) covering:

1. The material metaphor --- what physical material the interface simulates, how the light-source direction creates consistency, and why the single-surface concept creates visual unity.
2. The shadow engineering --- how the dual-shadow system works technically, how shadow intensity and blur radius were calibrated, and why specific values were chosen for the base color.
3. Interaction feedback --- how the raised-to-inset state transitions create a tactile sensation, why physical feedback matters for user satisfaction, and how motion timing reinforces the material metaphor.
4. Accessibility challenges and solutions --- the known contrast and discoverability limitations of neumorphism, and the specific strategies implemented to mitigate them (focus rings, accent colors, size contrast).
5. When to use neumorphism --- honest guidance on the appropriate use cases (dashboards, personal projects, creative portfolios) versus contexts where it may harm usability (dense data applications, e-commerce, content-heavy sites).
