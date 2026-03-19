# Technical Documentation Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in technical documentation systems, developer portals, and knowledge base interfaces. You have deep expertise in designing reading-optimized layouts for technical content, building navigation systems for deeply nested document hierarchies, and creating syntax-highlighted code block experiences that rival dedicated code editors. You understand how developers and technical users consume documentation: they search first, scan headings, copy code snippets, and jump between related pages rapidly. You design for efficiency, clarity, and sustained technical reading.

## Task

Design and build a complete, production-ready technical documentation layout suitable for software libraries, APIs, developer platforms, or internal knowledge bases. The layout must support a deep hierarchical navigation tree, a focused reading area with rich content formatting (code blocks, callouts, tables, diagrams), an on-page table of contents, and powerful search functionality. The experience should feel fast, clean, and professional -- comparable to best-in-class documentation sites like Stripe Docs, Tailwind CSS Docs, or Next.js Documentation. Every interaction should minimize friction and help the reader find, understand, and apply technical information as quickly as possible.

## Layout Structure

The documentation layout is composed of the following structural elements, designed to work as a persistent shell with swappable content:

1. **Top Bar** -- A fixed horizontal bar (height: 56px) spanning the full viewport width, layered above both sidebars. Contains: (a) the product logo and name on the left (logo 28px height, name 16px semibold) linked to the docs home page, (b) a version selector dropdown (14px, subtle bordered pill, e.g., "v3.2.1") that switches between documentation versions with a dropdown listing available versions and a "Latest" badge on the current release, (c) a search trigger button in the center or right area styled as a wide input-like element (max-width 480px, height 36px, border-radius 8px, muted background) showing placeholder text "Search documentation..." and a keyboard shortcut badge (Cmd+K or Ctrl+K, 12px, bordered pill). Clicking or pressing the shortcut opens a command-palette-style search overlay (centered modal, max-width 640px, max-height 480px) with: an autofocused search input, real-time results grouped by section (Guides, API Reference, Examples), each result showing page title, section heading, and a content snippet with the search term highlighted, keyboard navigation (arrow keys to move, Enter to select, Escape to close), and recent searches when the input is empty, (d) icon links on the far right for the GitHub repository (GitHub icon), a theme toggle button (sun/moon icon) for light/dark mode, and optionally a "Changelog" or "Discord" link. The top bar has a bottom border (1px, 8% opacity) and uses `backdrop-filter: blur(12px)` with a semi-transparent background matching the current theme.

2. **Left Sidebar Navigation** -- A fixed vertical panel (width: 260px, full viewport height minus top bar) on the left side of the screen, scrollable independently of the main content. Contains: (a) a collapsible tree structure of navigation items organized into sections. Each top-level section has a label (13px, uppercase, tracking 1px, muted color, font-weight 600, e.g., "Getting Started," "Core Concepts," "API Reference," "Guides," "Examples") serving as a non-clickable group heading. Below each section label, individual page links (14px, padding 6px 12px, border-radius 6px) are listed. Some pages have nested sub-pages revealed by clicking an expand/collapse chevron (rotate 90deg when expanded, transition 200ms). (b) Active state: the currently viewed page link has a highlighted background (primary color at 10% opacity) and a left border accent (2px solid, primary color). Hover state: subtle background tint. (c) The sidebar scrolls with a custom thin scrollbar (4px width, rounded) and preserves scroll position across page navigations. (d) At the bottom of the sidebar, include a "Last updated: [date]" timestamp and an optional "Edit this page" link. The sidebar tree must be driven by a configuration file for easy restructuring.

3. **Main Content Area** -- The central reading pane (max-width 800px, centered within the space between the two sidebars, padding 40px top, 48px horizontal on desktop) where the documentation page content renders. Structure from top to bottom: (a) Breadcrumbs (14px, muted, separated by "/" or chevrons) showing the navigation path (e.g., "Docs / Guides / Authentication / OAuth2"), (b) the page title as an H1 (36px, font-weight 700, margin-bottom 8px), (c) an optional page description or subtitle (18px, muted, line-height 1.6, margin-bottom 32px), (d) the page content rendered from Markdown or MDX with comprehensive styling for all standard and extended elements:

   - **Headings:** H2 (28px, font-weight 600, margin-top 48px, margin-bottom 16px, scroll-margin-top 80px for anchor offset), H3 (22px, margin-top 36px), H4 (18px, margin-top 24px). Each heading has an anchor link icon (#) that appears on hover to the left of the heading text, with a click-to-copy URL functionality.
   - **Paragraphs:** 16px, line-height 1.75, color balanced for extended reading (not pure black -- use hsl(0, 0%, 15%) in light mode, hsl(0, 0%, 85%) in dark mode), margin-bottom 20px.
   - **Code Blocks:** Fenced code blocks with syntax highlighting (using Shiki or Prism with a curated theme for both light and dark modes). Each code block has: a top bar showing the language label (12px, muted) and a file name if specified, a "Copy" button (14px icon button) that copies the code to clipboard and shows a brief "Copied!" confirmation (icon swap, auto-revert after 2s), line numbers (optional, toggleable), line highlighting for emphasizing specific lines (background tint on highlighted lines), a max-height of 500px with internal scrolling for long blocks, and proper horizontal scrolling for wide lines without wrapping.
   - **Inline Code:** Styled with a muted background (e.g., hsl(0,0%,95%) in light), border-radius 4px, padding 2px 6px, font-size 14px, font-family monospace, distinct from surrounding body text.
   - **Callout Boxes:** Four variants -- Info (blue icon and left border), Warning (amber), Tip (green), Danger (red). Each has: a colored left border (3px), a matching-color background tint (5% opacity), an icon (info circle, alert triangle, lightbulb, octagon-x), a bold label ("Info," "Warning," "Tip," "Danger"), and the callout body text (15px). Callouts are set apart with 24px vertical margin.
   - **Tables:** Responsive tables with horizontal scrolling when content overflows. Styled with: header row in a slightly tinted background (font-weight 600), alternating row stripes (2% opacity tint), cell padding (12px 16px), border-bottom per row (1px, 5% opacity), and a wrapping container with `overflow-x: auto` and rounded corners.
   - **Lists:** Ordered and unordered lists with custom markers. Unordered lists use a small filled circle (6px, primary color). Ordered lists use the numeral with primary color styling. Nested list indentation at 24px per level. List item spacing at 8px.
   - **Images and Figures:** Images render at full content width with border-radius 8px, a subtle border (1px, 5% opacity), and optional captions below (14px, muted, italic, centered). Support for light/dark mode image variants (different `src` per theme).
   - **Horizontal Rules:** Styled as subtle dividers (1px, 8% opacity, margin 48px 0).
   - **Links:** Styled with the primary accent color, underlined on hover, with external links showing a small external-link icon suffix.

4. **Right Sidebar -- On-Page Table of Contents** -- A fixed vertical panel (width: 220px) on the right side of the screen, visible on desktop viewports. Contains: (a) a "On this page" label (12px, uppercase, tracking 1px, muted, font-weight 600) at the top, (b) a list of links corresponding to H2 and H3 headings on the current page (13px, line-height 1.5, padding 4px 0). H3 items are indented 12px from H2 items. (c) Active section highlighting: as the user scrolls, the heading currently visible in the viewport is highlighted in the TOC (font-weight 600, primary color text) via an Intersection Observer tracking all headings with `rootMargin: "0px 0px -80% 0px"`. An active indicator line (2px wide, primary color, position absolute on the left) smoothly transitions between items. (d) Clicking a TOC item smooth-scrolls to the corresponding heading with an offset accounting for the fixed top bar (scroll-margin-top: 80px).

5. **Prev / Next Navigation** -- At the bottom of the main content area (below the rendered page content, separated by a horizontal rule), a two-column layout showing: (a) a "Previous" link on the left with a left-pointing arrow, the label "Previous" in small muted text (12px), and the previous page title (16px, semibold, primary color on hover), (b) a "Next" link on the right (text-aligned right) with a right-pointing arrow, the label "Next" in small muted text, and the next page title. Both links have a subtle bordered container (border-radius 8px, padding 16px, hover border-color shift to primary). The previous and next pages are determined by the sidebar navigation order.

6. **Edit This Page Link** -- Positioned below the prev/next navigation or in the sidebar footer. A text link (14px, muted, with a pencil/edit icon) reading "Edit this page on GitHub" that links to the source file in the documentation repository, enabling community contributions.

## Design Goals

- Optimize for reading speed and comprehension: body text at 16px on an 800px measure provides approximately 80-90 characters per line, widely considered the optimal range for sustained reading.
- Create a three-panel layout that keeps navigation, content, and page structure simultaneously visible without requiring scrolling between them.
- Make search the fastest path to any piece of information: the command palette should return results in under 200ms and be accessible from any page via keyboard shortcut.
- Ensure code blocks are first-class citizens: they should look sharp, be easy to copy, support syntax highlighting for 15+ languages, and display correctly in both light and dark modes.
- Design a dark mode that is truly excellent for extended technical reading: low-contrast dark backgrounds (not pure black), warm-tinted text (not pure white), and syntax highlighting themes specifically chosen for dark backgrounds.
- Maintain a minimal, distraction-free aesthetic where the documentation chrome (navigation, controls) recedes and the content takes center stage.

## UI Requirements

- The search command palette must index all page titles, headings (H2, H3), and optionally page body text, providing instant client-side results via a pre-built search index (e.g., FlexSearch or Pagefind).
- All heading anchor links must update the browser URL hash without a full page reload, and linking directly to a heading URL must scroll to that heading on page load.
- Code block "Copy" button must use the Clipboard API (`navigator.clipboard.writeText`) with a fallback for insecure contexts, and provide visual feedback (icon change from copy to checkmark, reverting after 2 seconds).
- The sidebar navigation tree state (which sections are expanded/collapsed) must persist across page navigations and page reloads using localStorage.
- Theme preference (light/dark) must be detected from `prefers-color-scheme` on first visit, then stored in localStorage and applied via a `class` strategy on the `<html>` element to prevent flash of wrong theme.
- All keyboard shortcuts must be discoverable: display them in the search trigger button (Cmd+K), and optionally provide a "Keyboard Shortcuts" help modal listing all available shortcuts.
- Table of contents active state tracking must use `IntersectionObserver` rather than scroll event listeners for performance.
- All pages must have proper `<title>` tags (e.g., "Authentication - MyLibrary Docs"), Open Graph meta tags for social sharing, and canonical URLs.

## Responsive Behavior

- **Desktop (1280px and above):** Full three-panel layout -- left sidebar (260px), main content (flexible, max 800px), right sidebar (220px). Both sidebars visible and fixed. Top bar spans full width. Search overlay centered.
- **Tablet (768px to 1279px):** Left sidebar collapses into a slide-in drawer triggered by a hamburger icon in the top bar. Right sidebar (table of contents) hides; the TOC becomes accessible via a floating "On this page" button or is placed above the content as a collapsible disclosure. Main content expands to fill available width (max 800px, centered). Top bar remains fixed.
- **Mobile (below 768px):** Both sidebars become drawers: left sidebar via hamburger button, TOC via a floating button or dropdown at the top of the content. Main content uses full viewport width with 16px horizontal padding. Code blocks scroll horizontally with a visible scrollbar. Tables render with horizontal scroll in a visible scroll container. Breadcrumbs may truncate with ellipsis for long paths. Search overlay becomes full-screen. Body text adjusts to 15px. Headings scale down proportionally (H1: 28px, H2: 22px, H3: 18px). All tap targets meet the minimum 44x44px accessibility guideline. The prev/next navigation stacks vertically.

## Technology Suggestions

- Next.js 14+ (App Router) with static site generation (SSG) for all documentation pages, enabling instant page loads and SEO optimization.
- Tailwind CSS 3+ with `@tailwindcss/typography` for the prose styling of rendered Markdown/MDX content, and `darkMode: 'class'` strategy.
- MDX 3 with next-mdx-remote or Contentlayer for authoring documentation pages in Markdown with embedded React components (callouts, interactive examples, tabs).
- Shiki for syntax highlighting at build time (server-side), producing pre-rendered HTML with inline styles for zero-JS code highlighting that works in both themes.
- FlexSearch or Pagefind for fast, client-side full-text search across all documentation pages, with the index built at compile time.
- Radix UI or Shadcn/UI for accessible primitives: dialog (search overlay), navigation-menu (sidebar), collapsible (sidebar sections), tooltip (copy button feedback).
- next-themes for system-preference-aware theming with localStorage persistence and `class` strategy to prevent flash.
- rehype and remark plugins for extending Markdown rendering: rehype-slug (heading IDs), rehype-autolink-headings (anchor links), remark-gfm (GitHub Flavored Markdown tables, strikethrough, task lists).

## Expected Output

### Component Structure

```
Documentation/
  Layout/
    DocsLayout.tsx
    TopBar/
      TopBar.tsx
      VersionSelector.tsx
      SearchTrigger.tsx
      ThemeToggle.tsx
      ExternalLinks.tsx
    Sidebar/
      LeftSidebar.tsx
      SidebarSection.tsx
      SidebarNavItem.tsx
      SidebarNavTree.tsx
    TableOfContents/
      RightSidebar.tsx
      TOCList.tsx
      TOCItem.tsx
  Search/
    SearchOverlay.tsx
    SearchInput.tsx
    SearchResults.tsx
    SearchResultItem.tsx
    SearchResultGroup.tsx
    RecentSearches.tsx
  Content/
    DocsPage.tsx
    Breadcrumbs.tsx
    PageHeader.tsx
    MDXComponents/
      CodeBlock.tsx
      CopyButton.tsx
      InlineCode.tsx
      CalloutBox.tsx
      HeadingAnchor.tsx
      ResponsiveTable.tsx
      ImageFigure.tsx
      TabGroup.tsx
      StepList.tsx
    PrevNextNav.tsx
    EditPageLink.tsx
  Shared/
    CommandPalette.tsx
    KeyboardShortcut.tsx
    Skeleton.tsx
    ScrollToTop.tsx
```

### Page Sections

1. Top Bar -- logo, version selector, search trigger (Cmd+K), GitHub link, theme toggle
2. Left Sidebar Navigation -- collapsible tree structure with sections, pages, active state, scroll preservation
3. Main Content Area -- breadcrumbs, page title, MDX-rendered content with code blocks, callouts, tables, images
4. Right Sidebar -- on-page table of contents with scroll-spy active section highlighting
5. Prev / Next Navigation -- sequential page links based on sidebar order
6. Edit This Page -- GitHub source link for community contributions

### Code Requirements

- Use TypeScript with strict mode for all components; define interfaces for NavItem, NavSection, TOCHeading, SearchResult, and DocPageMeta types.
- The sidebar navigation structure must be driven by a declarative configuration file (`docs-nav.ts`) that defines the full tree structure: sections, pages (with slug, title, and optional children), enabling restructuring without touching component code.
- MDX components must be mapped through a centralized `mdx-components.tsx` file that provides custom renderers for all standard HTML elements (h1-h6, p, a, code, pre, table, img, blockquote, ul, ol, hr) and custom components (Callout, CodeBlock, Tabs, Steps).
- The search index must be built at compile time (during `next build`) by extracting titles, headings, and content from all MDX files, and loaded client-side as a static JSON asset.
- Implement scroll-spy for the table of contents using `IntersectionObserver` in a custom hook (`useActiveHeading`) that returns the ID of the currently visible heading.
- Theme toggling must prevent flash of incorrect theme by injecting a blocking `<script>` in `<head>` that reads localStorage and applies the theme class before the page renders.
- All code blocks must support a `title` prop (e.g., ` ```tsx title="components/Button.tsx" ` `) rendered as a filename tab above the code, and a `highlight` prop for line highlighting (e.g., `highlight="3,7-9"`).
- Provide a sample navigation config, at least 5 sample MDX documentation pages across 2 sections (Getting Started, API Reference), and a pre-built search index fixture so the docs site renders and functions fully on first build.
- Keep individual component files under 150 lines; extract hooks (`useActiveHeading`, `useSearchIndex`, `useSidebarState`) into a `hooks/` directory.
- Ensure zero ESLint warnings, pass automated accessibility audit (axe-core), and achieve Lighthouse performance score above 95 for documentation pages.
