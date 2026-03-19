# Dashboard Example

> Generated using the **ai-dashboard** preset.

## Overview

This example demonstrates an AI analytics dashboard generated using the `ai-dashboard` preset, which combines `futuristic-ui`, `dashboard-layout`, `3d-dashboard`, and `scroll-animations` prompts.

## Generated Sections

### 1. Sidebar Navigation
A collapsible dark sidebar with icon + text navigation items. Sections include Dashboard, Models, Datasets, Training, Experiments, Deployments, and Settings. Active item has a glowing accent indicator. Sidebar collapses to icon-only view on smaller screens with smooth width transition.

### 2. Top Bar
A horizontal top bar with breadcrumb navigation, global search, notification bell with badge, and user avatar dropdown. Includes a dark/light theme toggle.

### 3. KPI Overview Cards
A row of 4 key metric cards: Active Models, Training Accuracy, API Calls Today, Avg Response Time. Each card has a large number, trend indicator (up/down with percentage), and a sparkline mini-chart. Cards feature a futuristic glow border effect.

### 4. 3D Performance Globe
An interactive 3D globe visualization showing real-time API requests by geographic region. Built with Three.js/React Three Fiber. Connection arcs animate between data centers. Globe rotates slowly and responds to mouse drag. Data points pulse with activity.

### 5. Model Performance Chart
A large area chart showing model accuracy/loss over training epochs. Multiple model lines with different colors. Interactive tooltip on hover showing exact values. Smooth line drawing animation on load.

### 6. Real-Time Activity Feed
A live-updating activity log showing recent events: model deployments, training completions, error alerts. Each entry has a timestamp, icon, and description. New entries slide in from the top with a fade animation.

### 7. Resource Usage Panel
A panel showing CPU, GPU, Memory, and Storage utilization as animated circular progress gauges. Each gauge fills to its current value with a smooth animation. Color shifts from green to yellow to red as usage increases.

### 8. Data Table
A sortable, filterable data table showing recent experiments with columns for Name, Model, Dataset, Accuracy, Status, and Date. Row hover highlights. Sortable column headers. Pagination with smooth page transitions.

### 9. 3D Model Comparison
A 3D bar chart or scatter plot comparing model performance across multiple dimensions. Interactive rotation and zoom. Data points are selectable for drill-down details. Built with Three.js.

## Technologies Used

- **React** with Next.js App Router
- **Tailwind CSS** for utility styling
- **Three.js** / **React Three Fiber** for 3D visualizations
- **Recharts** or **D3.js** for 2D charts
- **Framer Motion** for UI animations
- **TypeScript** for type safety

## Component Count

Approximately 30–35 components including chart widgets, 3D visualizations, data tables, and navigation elements.
