# Admin Dashboard Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in admin dashboards and data-driven analytical interfaces. You have deep expertise in information density management, data visualization, and designing complex multi-panel layouts that empower users to monitor metrics, analyze trends, and take action without feeling overwhelmed. You understand the unique challenges of dashboard UX: balancing information richness with cognitive load, supporting both quick glances and deep dives, and maintaining usability across varying data volumes.

## Task

Design and build a complete, production-ready admin/analytics dashboard layout that provides users with a comprehensive overview of key business metrics, interactive data visualizations, tabular data with full CRUD capabilities, and real-time status indicators. The dashboard must serve as a daily command center where users can quickly assess system health, drill into specific metrics, and manage operational data. The layout should feel data-rich yet organized, ensuring that critical information surfaces immediately while detailed analysis remains one click away.

## Layout Structure

The dashboard is composed of the following structural elements and content areas:

1. **Sidebar Navigation** -- A vertical navigation panel fixed to the left side of the viewport (240px wide on desktop, collapsible to 64px icon-only mode). Contains: (a) the application logo and name at the top, (b) a primary navigation section with icon + label links for Dashboard, Analytics, Users, Products, Orders, Messages, and Settings, (c) visual indicators for active state (highlighted background, accent-color left border), (d) a badge counter on items like Messages for unread counts, (e) grouped navigation sections with subtle section dividers and optional group labels (e.g., "Main," "Management," "System"), (f) a user profile section at the bottom with avatar, name, role, and a sign-out action. The sidebar should support a collapsed state toggled via a chevron button.

2. **Top Header Bar** -- A horizontal bar spanning the content area (to the right of the sidebar). Contains: (a) a breadcrumb trail or page title on the left, (b) a global search input with keyboard shortcut hint (Cmd+K or Ctrl+K) and a command-palette-style search overlay, (c) notification bell icon with unread count badge, (d) a theme toggle (light/dark mode), and (e) the user avatar as a dropdown trigger for profile and sign-out options.

3. **KPI Summary Cards Row** -- A horizontal row of 4 to 6 metric cards at the top of the main content area. Each card displays: a metric label (e.g., "Total Revenue," "Active Users," "Conversion Rate," "Open Tickets"), the current value in large bold typography, a percentage change indicator with up/down arrow and color coding (green for positive, red for negative), and an optional sparkline mini-chart showing the trend over the last 7 or 30 days. Cards should have subtle background colors or left-border accents to differentiate categories.

4. **Charts Section** -- A row of 2 to 3 primary charts directly below the KPI cards. Common configurations include: (a) a large area or line chart showing revenue or traffic over time with a date range selector, (b) a bar chart comparing performance across categories or time periods, and (c) a donut or pie chart showing distribution (e.g., traffic sources, user demographics). Each chart includes a title, optional subtitle, a legend, and action buttons for toggling data series, changing chart type, or exporting data. Charts should have loading and empty states.

5. **Data Table Section** -- A full-width, feature-rich data table below the charts. The table includes: (a) a table header with a title, search/filter input, column visibility toggle, and export button (CSV/Excel), (b) column headers that are sortable (click to toggle ascending/descending with sort indicator arrow), (c) rows displaying structured data with appropriate formatting (dates, currency, status badges, avatars), (d) inline actions per row (view, edit, delete) accessible via an action menu or icon buttons, (e) multi-row selection via checkboxes with a bulk action toolbar, (f) pagination controls at the bottom with rows-per-page selector and page navigation, (g) expandable rows for showing additional detail without leaving the table view.

6. **Activity Feed / Recent Activity Panel** -- A vertical list or timeline of recent system events (e.g., "New user registered," "Order #1234 shipped," "Payment received"). Each entry shows a timestamp, an icon representing the event type, a brief description, and optionally the user who triggered it. This can be placed in a sidebar panel on the right or as a section below the data table.

7. **Quick Actions / Widget Panel** -- A collection of small utility widgets that might include: a to-do list or task checklist, a calendar widget showing upcoming events, a quick-entry form for common actions, or a system status indicator (API uptime, server health). These are arranged in a grid below or alongside the activity feed.

## Design Goals

- Establish a clear information hierarchy: KPI cards for at-a-glance metrics, charts for trend analysis, and tables for detailed data inspection. Users should be able to assess overall system health within 5 seconds of loading the page.
- Maintain high information density without visual clutter by using consistent spacing, clear section boundaries, and deliberate use of color only for meaningful data encoding (status, trend direction, alerts).
- Implement a fully functional dark mode as the default or co-equal option; dashboards are frequently used for extended periods, and a well-designed dark theme reduces eye strain.
- Use a restrained color palette: neutral grays for the interface chrome, a single brand accent for navigation active states, and a semantic color scale (green/amber/red) exclusively for data indicators and status.
- Ensure charts and data visualizations are colorblind-accessible by using patterns, labels, or a colorblind-safe palette in addition to color differentiation.
- Design for real-time data: include visual cues for live data updates (subtle pulse animations, "Last updated: X seconds ago" timestamps) without distracting the user.

## UI Requirements

- The sidebar navigation must support keyboard navigation: arrow keys to move between items, Enter to select, and a keyboard shortcut to toggle collapse.
- All chart components must include a loading skeleton state, an empty state with a helpful message, and an error state with a retry option.
- The data table must handle at least 10,000 rows performantly via virtualized scrolling or server-side pagination; never render all rows into the DOM simultaneously.
- Status badges must use both color and text to communicate state (e.g., green badge reading "Active," red badge reading "Overdue") so meaning is not conveyed by color alone.
- Toast notifications must appear for async actions (data saved, export complete, error occurred) with appropriate severity styling (success, info, warning, error).
- Modals and dialogs (for create, edit, and delete confirmations) must trap focus, be dismissible via Escape, and prevent background scroll.
- Number values (revenue, counts, percentages) must animate on load with a counting-up effect for visual engagement, but respect prefers-reduced-motion.
- All timestamps should display relative time ("2 hours ago") with full date/time visible on hover via a tooltip.

## Responsive Behavior

- **Desktop (1280px and above):** Full sidebar visible (240px). Content area uses a multi-column grid: KPI cards in a single row, charts in 2 or 3 columns, data table spanning full width. Activity feed may appear as a right sidebar (300px) or below the table.
- **Tablet (768px to 1279px):** Sidebar auto-collapses to icon-only mode (64px) with a toggle to expand as an overlay. KPI cards wrap to 2 per row. Charts stack to 1 or 2 per row. Data table becomes horizontally scrollable with a fixed first column. Activity feed moves below the main content.
- **Mobile (below 768px):** Sidebar becomes a bottom navigation bar with 5 primary icons or a hamburger-triggered slide-out overlay. KPI cards stack to 1 per row in a horizontal scroll container. Charts render at full width, stacked vertically, with simplified axis labels. Data table switches to a card-based list view where each row becomes a stacked card. All interactive elements meet the 44x44px minimum touch target.

## Technology Suggestions

- Next.js 14+ (App Router) with server components for initial data fetching and client components for interactive charts and tables.
- Tailwind CSS 3+ with the `darkMode: 'class'` strategy for seamless light/dark theme switching.
- Recharts or Tremor for chart components: Recharts offers fine-grained control, while Tremor provides pre-built dashboard chart components with Tailwind integration.
- TanStack Table (React Table v8) for the headless, feature-rich data table with sorting, filtering, pagination, row selection, and column visibility built in.
- TanStack Query for server state management with automatic refetching intervals for real-time data display.
- Radix UI or Shadcn/UI for accessible primitives: dialogs, dropdown menus, tooltips, popovers, and toggle components.
- Framer Motion for number counting animations, chart entrance transitions, and sidebar collapse/expand animations.
- next-themes for managing the dark/light mode theme with system preference detection and localStorage persistence.

## Expected Output

### Component Structure

```
Dashboard/
  Layout/
    DashboardLayout.tsx
    Sidebar/
      Sidebar.tsx
      SidebarNavItem.tsx
      SidebarUserProfile.tsx
    TopBar/
      TopBar.tsx
      GlobalSearch.tsx
      NotificationBell.tsx
      ThemeToggle.tsx
      UserDropdown.tsx
  Overview/
    OverviewPage.tsx
    KPICards/
      KPICardRow.tsx
      KPICard.tsx
      Sparkline.tsx
    Charts/
      ChartsSection.tsx
      RevenueChart.tsx
      CategoryBarChart.tsx
      DistributionDonut.tsx
      ChartWrapper.tsx
      DateRangeSelector.tsx
    DataTable/
      DataTableSection.tsx
      DataTable.tsx
      ColumnHeader.tsx
      StatusBadge.tsx
      RowActions.tsx
      BulkActionBar.tsx
      TablePagination.tsx
    ActivityFeed/
      ActivityFeed.tsx
      ActivityItem.tsx
    Widgets/
      WidgetGrid.tsx
      TaskList.tsx
      CalendarWidget.tsx
      SystemStatus.tsx
  Shared/
    ConfirmDialog.tsx
    Toast.tsx
    Skeleton.tsx
    EmptyState.tsx
    RelativeTime.tsx
```

### Page Sections

1. Sidebar Navigation -- collapsible vertical nav with grouped links and user profile
2. Top Header Bar -- breadcrumbs, global search, notifications, theme toggle, user menu
3. KPI Summary Cards -- 4-6 metric cards with values, trends, and sparklines
4. Charts Section -- 2-3 interactive data visualizations with controls
5. Data Table -- sortable, filterable, paginated table with row actions and bulk operations
6. Activity Feed -- chronological event timeline
7. Widget Panel -- utility widgets (tasks, calendar, system status)

### Code Requirements

- Use TypeScript with strict mode; define interfaces for all data models (User, Order, Metric, ChartDataPoint, ActivityEvent, TableRow).
- Implement the dashboard layout as a persistent shell (sidebar + top bar) with a content outlet that renders the active page without re-mounting the navigation on route changes.
- Chart components must accept data via props and render gracefully with zero data points (empty state), partial data (loading skeleton), and error conditions.
- The data table must be built on a headless table library (TanStack Table) with custom cell renderers for dates, currency, status badges, and action menus.
- Dark mode must be a first-class feature: every component, chart, and table must have explicit dark mode styles, not just inverted colors.
- Extract all API calls and data transformation logic into dedicated service files (`lib/api/`) separate from UI components.
- Use React Context or a lightweight store for global UI state (sidebar collapsed, theme, notification count) and TanStack Query for server-derived state.
- Provide a mock data generator (`lib/mock-data.ts`) that produces realistic dashboard data (metrics, chart series, table rows, activity events) so the dashboard is fully functional without a backend.
- Ensure the layout has zero horizontal overflow at any viewport width; use `overflow-x-hidden` on the root only as a last resort, preferring proper responsive containment.
