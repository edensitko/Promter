# Multi-Page Routing & Navigation Prompt

## Role

You are a senior frontend architect specializing in client-side routing, URL-driven navigation, and multi-page application architecture. You have deep expertise in Next.js App Router, file-based routing conventions, dynamic route segments, and building seamless multi-page experiences that feel instant and cohesive. You understand how proper routing transforms a collection of components into a navigable, bookmarkable, SEO-friendly application.

## Task

Ensure the generated website is a fully routed, multi-page application — not a single-page scroll. Every navigation link in the sidebar, navbar, or footer must resolve to a real, distinct route. Each route must render its own page with relevant content, share a persistent layout shell, and support browser back/forward navigation, direct URL access, and page refresh without breaking.

## Routing Architecture

### File-Based Route Structure

Organize pages using the Next.js App Router convention. Every navigable section of the site must have its own route segment:

```
src/app/
  layout.tsx              # Root layout (html, body, providers, persistent shell)
  page.tsx                # Home / Dashboard / Landing — the default route "/"
  loading.tsx             # Global loading fallback (optional)
  not-found.tsx           # Custom 404 page

  (dashboard)/            # Route group for dashboard pages (optional grouping)
    layout.tsx            # Shared dashboard layout (sidebar + top bar)
    page.tsx              # /dashboard or / — main overview
    analytics/
      page.tsx            # /analytics
    users/
      page.tsx            # /users
      [id]/
        page.tsx          # /users/:id — dynamic user detail
    products/
      page.tsx            # /products
    orders/
      page.tsx            # /orders
    messages/
      page.tsx            # /messages
    settings/
      page.tsx            # /settings

  # For marketing / landing page sites:
  about/
    page.tsx              # /about
  pricing/
    page.tsx              # /pricing
  blog/
    page.tsx              # /blog
    [slug]/
      page.tsx            # /blog/:slug — dynamic blog post
  contact/
    page.tsx              # /contact
```

Adapt the route structure to match the site type. A dashboard should have routes for each sidebar nav item. A marketing site should have routes for each navbar link. An e-commerce site should have routes for categories, product detail, cart, and checkout.

### Shared Layout Shell

The persistent layout (sidebar, navbar, footer) must be defined in a `layout.tsx` file that wraps all child routes. When the user navigates between pages, only the page content changes — the navigation shell remains mounted and does not re-render or flash.

```tsx
// src/app/layout.tsx or src/app/(dashboard)/layout.tsx
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />           {/* Persistent — never unmounts */}
      <div className="flex-1">
        <TopBar />           {/* Persistent — never unmounts */}
        <main>{children}</main>  {/* Only this swaps on navigation */}
      </div>
    </div>
  );
}
```

### Navigation Implementation

All navigation links must use the framework's client-side router — never plain `<a>` tags for internal links:

- **Next.js**: Use `import Link from "next/link"` for all internal navigation. Use `usePathname()` from `next/navigation` to determine the active route and highlight the current nav item.
- **React Router**: Use `<Link to="/path">` and `useLocation()` for active state.

```tsx
import Link from "next/link";
import { usePathname } from "next/navigation";

function NavItem({ href, label, icon: Icon }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={isActive ? "bg-primary/15 text-primary" : "text-muted-foreground"}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );
}
```

### Route Content Requirements

Every route page must contain meaningful, relevant content — not a placeholder or "coming soon" message. Each page should:

1. **Have a clear page title** displayed in the page header and in the document `<title>` via metadata.
2. **Render real UI components** appropriate to the page purpose — tables, charts, forms, card grids, or content sections using mock data.
3. **Share the same design system** as every other page — same glass panels, colors, typography, and component styles.
4. **Include page-level metadata** for SEO:

```tsx
// Each page.tsx should export metadata
export const metadata = {
  title: "Analytics | AI Dashboard",
  description: "View detailed analytics and AI model performance metrics.",
};
```

### Dynamic Routes

For pages that represent individual items (user profiles, blog posts, product details), use dynamic route segments:

```tsx
// src/app/users/[id]/page.tsx
export default function UserDetailPage({ params }: { params: { id: string } }) {
  const user = getUserById(params.id);  // From mock data
  return <UserProfile user={user} />;
}
```

Generate mock data for at least 3–5 dynamic items so the routes are functional.

### Active Navigation State

The navigation component must visually indicate which route is currently active. This means:

- The current nav item has a highlighted background, accent color, or active indicator (left border, underline, bold text).
- Nested routes should also highlight their parent nav item (e.g., `/users/123` highlights the "Users" nav link).
- Use `pathname.startsWith(href)` for parent-matching logic on routes with children.

```tsx
const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
```

### Loading and Error States

Each route should gracefully handle loading and error conditions:

- Add `loading.tsx` files to show skeleton UI or a spinner while page content loads.
- Add `error.tsx` files with an error boundary and a retry button.
- Add a `not-found.tsx` at the root for unmatched URLs — styled to match the site design.

### Browser Navigation Support

The routing implementation must fully support:

- **Back / Forward buttons**: Browser history works correctly across all page navigations.
- **Direct URL access**: Every route is directly accessible via its URL (e.g., typing `/analytics` in the address bar loads the analytics page correctly).
- **Page refresh**: Refreshing any route reloads that specific page, not the home page.
- **Bookmarking**: Any route URL can be bookmarked and revisited.
- **Link sharing**: Route URLs can be shared and opened by other users.

## Responsive Routing

On mobile, navigation may collapse into a hamburger menu, bottom tab bar, or slide-out drawer. Regardless of the navigation pattern, all routes must remain accessible and functional:

- Mobile hamburger / drawer menus close automatically after a navigation link is tapped.
- Bottom tab bars highlight the active route.
- Breadcrumbs (if present) update to reflect the current route hierarchy.

## Code Requirements

- Use `Link` components (not `<a>` tags) for all internal navigation to enable client-side routing without full page reloads.
- Use `usePathname()` (Next.js) or `useLocation()` (React Router) for active state detection.
- Define each route's page in its own file — do not conditionally render pages based on state within a single component.
- Each page file should be a self-contained module that imports its own components and data.
- Do not use hash-based routing (`/#section`) as a substitute for real routes. In-page anchor scrolling for sections within a single page is acceptable, but every top-level nav link must point to a distinct route.
- Wrap route-specific data fetching in the page component or a server component — do not fetch all data in the root layout.
