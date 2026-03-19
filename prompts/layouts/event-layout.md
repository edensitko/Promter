# Conference & Event Website Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in conference, summit, and event websites. You have deep expertise in designing time-sensitive promotional layouts that build anticipation, convey event logistics clearly, and drive ticket sales through urgency and social proof. You understand how to structure complex multi-day agendas, showcase speaker lineups persuasively, and present tiered pricing in a way that nudges visitors toward premium options. You design experiences that feel energetic and professional, matching the prestige of the event itself.

## Task

Design and build a complete, production-ready conference/event website layout that serves as the primary marketing and information hub for a multi-day professional event. The site must create excitement and urgency around the event date, showcase the speaker lineup and agenda with clarity, present venue and logistics details, display sponsor recognition, offer tiered ticket purchasing, and answer common attendee questions. Every section should reinforce the event's brand identity while prioritizing scannability and conversion toward ticket registration.

## Layout Structure

The event website is composed of the following sections, each playing a specific role in the event marketing funnel:

1. **Countdown Hero Section** -- A dramatic, full-viewport (100vh) hero section that immediately communicates the event's identity and urgency. Contains: (a) a high-impact background -- either a looping ambient video, a large-scale photograph of a previous event, or an animated gradient mesh -- with a dark overlay (rgba(0,0,0,0.55)) for text contrast, (b) the event name in bold display typography (56px mobile, 72px tablet, 96px desktop, font-weight 800, letter-spacing -1px, line-height 1.05), (c) a tagline or theme statement below the name (20px, font-weight 400, opacity 0.85, max-width 600px), (d) the event date displayed prominently (e.g., "June 15-17, 2026") in a distinct typographic treatment (24px, uppercase, letter-spacing 3px), (e) the venue name and city (18px, with a small map-pin icon inline), (f) an animated countdown timer showing days, hours, minutes, and seconds in individual digit boxes (each box: 80px x 80px desktop, 56px x 56px mobile, background rgba(255,255,255,0.1), backdrop-filter blur(8px), border-radius 12px, font-size 36px desktop / 24px mobile, monospace or tabular-nums font-feature-setting), with labels ("Days," "Hours," "Minutes," "Seconds") below each unit in 11px uppercase tracking, (g) a primary CTA button ("Get Tickets" or "Register Now", px-10 py-4 text-lg font-bold rounded-full, accent background with hover scale(1.05) and glow shadow), (h) an optional secondary link ("View Schedule" or "Watch Last Year's Highlights") as an underlined text link. The countdown timer digits should animate (flip or slide transition) on each second tick.

2. **Speakers Grid Section** -- A section (padding 96px top and bottom) showcasing the event's speaker lineup. Structure: (a) section header with title ("Speakers" or "Featured Speakers", 40px, centered) and subtitle ("Learn from industry leaders", 18px, muted, centered), (b) a responsive grid of speaker cards (`grid-template-columns: repeat(4, 1fr)` on desktop, gap 32px, max-width 1200px centered). Each speaker card contains: a circular or rounded-square (border-radius 16px) headshot image (240px x 240px, object-fit cover), the speaker's full name (20px, font-weight 600), their job title (14px, muted color), their company name (14px, semibold, brand color or muted), their talk topic title (16px, italic, 2-line clamp), and an expandable bio section triggered by a "Read Bio" button or a click/tap on the card that opens a modal overlay (480px max-width) showing the full headshot, name, title, company, a 2-3 paragraph bio, social links (Twitter, LinkedIn, personal site), and their session time and room. Cards should have a subtle hover elevation (translateY(-4px), box-shadow 0 12px 40px rgba(0,0,0,0.1), transition 300ms ease). Optionally include a filter row above the grid to filter speakers by track or topic tag.

3. **Schedule / Agenda Section** -- A comprehensive, structured agenda for the event (padding 96px vertical, alternate background color). Structure: (a) section header ("Schedule" or "Agenda", 40px, centered), (b) day tabs -- horizontal tab bar (one tab per event day, e.g., "Day 1 - June 15," "Day 2 - June 16," "Day 3 - June 17") with active state indicated by an accent underline or filled background. Tabs use `role="tablist"` with proper ARIA attributes. (c) Timeline content for the active day, displayed as a vertical timeline: each session entry shows the time block (e.g., "9:00 AM - 9:45 AM") in a left column (width 140px, font-weight 600, color muted), a colored track indicator dot/line (e.g., blue for "Engineering," green for "Design," orange for "Business") with the track name, the talk title (20px, font-weight 600, linked to detail), the speaker name (16px, with small avatar 28px inline), the room or location (14px, muted, with a room icon), and an optional "Add to Calendar" icon button. Sessions are separated by subtle horizontal dividers. Break sessions (Registration, Lunch, Coffee) are styled distinctly with an icon, muted background, and centered text. Include a "Download PDF Schedule" link at the bottom of the section. The timeline should support clicking a session to expand an inline detail panel showing the full abstract, speaker bio snippet, and prerequisite tags.

4. **Venue Section** -- A section (padding 96px vertical) presenting event logistics. Contains: (a) section header ("Venue" or "Location", 40px, centered), (b) a two-column layout on desktop: left column (55%) with an embedded interactive map (Google Maps or Mapbox, height 400px, border-radius 16px, showing the venue marker with a custom icon), right column (45%) with the venue name (24px, semibold), full address with a "Get Directions" link (opens Google Maps in new tab), a brief venue description (16px, 2-3 sentences), key facility highlights (parking, wifi, accessibility, capacity) displayed as an icon + label list, (c) a "Recommended Hotels" subsection below the map with 3-4 hotel cards in a horizontal row: each card shows a hotel image (aspect-ratio 3:2), hotel name, distance from venue (e.g., "0.3 miles"), star rating, price range indicator ($ to $$$$), and a "Book" link to the hotel's website or a group-rate reservation page. Hotel cards scroll horizontally on smaller viewports.

5. **Sponsors Tier Grid** -- A section (padding 80px vertical) showcasing event sponsors organized by tier. Structure: (a) section header ("Sponsors" or "Our Partners", 36px, centered) with subtitle ("Thanks to our generous sponsors"), (b) sponsor tiers displayed vertically in descending order of prominence: Platinum/Title sponsors (largest logos, max-height 80px, 1-2 per row in a centered flex layout with generous spacing), Gold sponsors (medium logos, max-height 56px, 3-4 per row), Silver sponsors (smaller logos, max-height 40px, 4-6 per row), Community partners (smallest logos, max-height 32px, tightly spaced). Each tier has a label above it (14px, uppercase, tracking 2px, muted, with a subtle horizontal rule extending to both sides). All logos are grayscale by default and colorize on hover (filter: grayscale(1) to grayscale(0), transition 400ms). Each logo links to the sponsor's website (target="_blank" rel="noopener"). Optionally include a "Become a Sponsor" CTA button below all tiers.

6. **Ticket Pricing Section** -- A conversion-focused section (padding 96px vertical, visually distinct background such as a dark theme or subtle gradient) displaying ticket options. Structure: (a) section header ("Registration" or "Get Your Ticket", 40px, centered, light text if dark background) with subtitle ("Secure your spot today"), (b) 3 pricing cards side by side (max-width 1000px centered, gap 24px): Early Bird, Standard, and VIP. Each card (border-radius 16px, padding 40px 32px) contains: the tier name (20px, uppercase, tracking 1px), the price in large display type (48px, font-weight 800), a price qualifier ("/person" or billing note), a horizontal divider, a feature checklist (14px, 6-10 items) where each item has a checkmark icon (included) or a muted X icon (not included), and a CTA button at the bottom ("Buy Early Bird," "Buy Standard," "Buy VIP"). The recommended tier (typically Standard or VIP) should be visually emphasized: scaled slightly larger (transform: scale(1.05)), a "Most Popular" or "Best Value" badge ribbon at the top, a colored border or background tint, and the CTA button in the primary accent color while others use outline style. Include a note below the cards about group discounts, student pricing, or refund policy (14px, muted, centered). Early bird pricing should show a strikethrough original price with the savings amount highlighted.

7. **FAQ Accordion Section** -- A section (padding 80px vertical) addressing common attendee questions. Structure: (a) section header ("Frequently Asked Questions", 36px, centered), (b) a single-column accordion (max-width 760px, centered) with 8-12 question items. Each item has: a question text (18px, font-weight 600) as the trigger button, an expand/collapse chevron icon that rotates 180 degrees on toggle (transition 200ms), and an answer panel that animates open (max-height transition or framer-motion layoutId) revealing the answer text (16px, line-height 1.7, muted color, may contain links or lists). Only one item should be open at a time (single-expand mode) or optionally multi-expand. Items are separated by subtle borders (1px solid, 5% opacity). The accordion must be fully keyboard accessible: Enter/Space to toggle, arrow keys to navigate between items, with proper `role="region"` and `aria-expanded` attributes. Include categories of questions covering: General (dates, location, dress code), Tickets (pricing, refunds, transfers), Content (recordings, slides, wifi), Travel (hotels, transport, visa letters), and Accessibility (wheelchair, dietary, childcare).

8. **Footer** -- A full-width footer (padding 48px top, 24px bottom, dark background) containing: (a) the event logo or name, (b) quick links (Schedule, Speakers, Venue, Tickets, FAQ, Code of Conduct), (c) contact information (email, phone), (d) social media icon links (Twitter/X, LinkedIn, Instagram, YouTube), (e) links to previous event editions (e.g., "2025 Edition," "2024 Edition"), (f) an "Organized by" section crediting the organizing company with their logo, (g) a copyright line and legal links (Privacy Policy, Terms, Cookie Policy). Footer uses a 4-column layout on desktop, stacking to 2 columns on tablet and 1 column on mobile.

## Design Goals

- Create a sense of excitement and urgency that drives ticket sales, using the countdown timer, limited-availability messaging, and compelling speaker photography.
- Establish a strong, cohesive event brand identity through consistent use of the event's color palette, typography, and imagery throughout every section.
- Ensure the schedule/agenda is the most usable section on the site: attendees should be able to quickly find sessions by day, track, or speaker without frustration.
- Build trust and prestige through high-quality speaker headshots, recognizable sponsor logos, and professional design execution.
- Optimize for performance so the page loads fast even with numerous high-resolution images (speakers, venue, sponsors): target a Lighthouse performance score above 85.
- Design for accessibility and inclusivity: ensure all interactive elements are keyboard navigable, all images have alt text, and color is never the sole means of conveying information.

## UI Requirements

- The countdown timer must handle the event passing gracefully: when the countdown reaches zero, replace it with a "Happening Now" badge or "Event in Progress" state, and after the event ends, switch to a "Thanks for attending" message or redirect to a recap page.
- Speaker cards must handle missing data gracefully: if no headshot is provided, show a branded placeholder with the speaker's initials; if no talk topic is assigned, hide that field rather than showing empty space.
- The schedule timeline must support sessions of varying lengths (15-minute lightning talks to 90-minute workshops) and visually represent duration proportionally or through time labels.
- Pricing cards must support a "Sold Out" state that disables the CTA button, grays out the card, and shows a "Sold Out" badge, as well as a "Coming Soon" state for tiers not yet on sale.
- All external links (sponsor logos, hotel booking, speaker social links) must open in new tabs with `rel="noopener noreferrer"`.
- Form elements (ticket purchase, newsletter) must include proper validation, loading states on submission, and error/success feedback.
- Toast notifications should confirm actions like "Added to Calendar" or "Link Copied."
- The entire page should use smooth scroll behavior for in-page anchor links from the navigation.

## Responsive Behavior

- **Desktop (1280px and above):** Full 4-column speaker grid. Schedule timeline with left time column and full session details. Venue section in 2-column map + info layout. Pricing cards in a 3-column row. Sponsor logos in multi-row grid per tier. Hero countdown boxes at 80px.
- **Tablet (768px to 1279px):** Speaker grid collapses to 3 columns (or 2 with larger cards). Schedule timeline condenses but maintains left time column. Venue stacks map above venue details. Pricing cards remain in a row but reduce padding. Sponsor logos adjust to fewer per row. Countdown boxes at 64px. Navigation may condense into a horizontally scrollable link bar.
- **Mobile (below 768px):** Speaker grid becomes 1-2 columns. Schedule timeline becomes a single-column card list: each session is a card with time, title, speaker, and room stacked vertically. Venue stacks fully, map at full width. Pricing cards stack vertically with the recommended tier first. Sponsor logos reflow to 2-3 per row for all tiers. Countdown boxes at 56px, arranged in a 2x2 grid or single row. Hero section reduces to 80vh minimum. FAQ accordion runs full width. Navigation collapses to hamburger menu. All tap targets meet the minimum 44x44px accessibility guideline.

## Technology Suggestions

- Next.js 14+ (App Router) with static site generation for the main event page and on-demand revalidation for schedule updates.
- Tailwind CSS 3+ for utility-first styling with a custom theme encoding the event's brand colors, fonts, and spacing scale.
- Framer Motion for the countdown timer digit animations, speaker card hover effects, accordion expand/collapse, and scroll-triggered section entrance animations.
- Radix UI or Shadcn/UI for accessible primitives: tabs (schedule days), accordion (FAQ), dialog (speaker bio modal), and tooltip components.
- date-fns or Temporal API for countdown calculations, timezone-aware date formatting, and "Add to Calendar" (.ics) file generation.
- Mapbox GL JS or Google Maps Embed for the interactive venue map with a custom-styled pin.
- React Intersection Observer for triggering entrance animations and lazy-loading sponsor logo images as they scroll into view.
- Stripe or a ticketing platform embed (Tito, Eventbrite widget) for the ticket purchase flow.

## Expected Output

### Component Structure

```
EventSite/
  Layout/
    EventLayout.tsx
    EventNavbar/
      EventNavbar.tsx
      MobileMenu.tsx
    Footer/
      Footer.tsx
      FooterColumn.tsx
  Hero/
    CountdownHero.tsx
    CountdownTimer/
      CountdownTimer.tsx
      CountdownDigitBox.tsx
  Speakers/
    SpeakersSection.tsx
    SpeakerGrid.tsx
    SpeakerCard.tsx
    SpeakerModal.tsx
    SpeakerFilterBar.tsx
  Schedule/
    ScheduleSection.tsx
    DayTabs.tsx
    Timeline/
      Timeline.tsx
      SessionEntry.tsx
      BreakEntry.tsx
      SessionDetailPanel.tsx
    AddToCalendarButton.tsx
  Venue/
    VenueSection.tsx
    VenueMap.tsx
    VenueInfo.tsx
    HotelCard.tsx
    HotelCarousel.tsx
  Sponsors/
    SponsorsSection.tsx
    SponsorTier.tsx
    SponsorLogo.tsx
  Tickets/
    TicketPricingSection.tsx
    PricingCard.tsx
    PricingFeatureList.tsx
    TierBadge.tsx
  FAQ/
    FAQSection.tsx
    FAQAccordion.tsx
    FAQAccordionItem.tsx
  Shared/
    SectionHeader.tsx
    Badge.tsx
    Toast.tsx
    Skeleton.tsx
    InitialsAvatar.tsx
```

### Page Sections

1. Countdown Hero -- event identity, countdown timer, primary CTA for tickets
2. Speakers Grid -- speaker cards with photos, titles, expandable bios in modal
3. Schedule / Agenda -- tabbed per-day timeline with session details and calendar export
4. Venue -- interactive map, address, directions, recommended hotels
5. Sponsors Tier Grid -- tiered sponsor logos (platinum/gold/silver/community)
6. Ticket Pricing -- 3-tier pricing cards with feature comparison and purchase CTAs
7. FAQ Accordion -- expandable question-and-answer list covering all attendee concerns
8. Footer -- quick links, social icons, contact info, past editions, legal

### Code Requirements

- Use TypeScript with strict mode for all components; define interfaces for Speaker, Session, Day, Venue, Hotel, Sponsor, Tier, Ticket, and FAQItem types.
- The countdown timer must calculate remaining time using `Date.now()` and a target timestamp, updating via `useEffect` with a 1-second interval that cleans up on unmount to prevent memory leaks.
- Schedule data should be structured as an array of Day objects, each containing an array of Session objects with start/end times, enabling automatic sorting and duration calculation.
- Implement the day tabs with proper `role="tablist"`, `role="tab"`, and `role="tabpanel"` ARIA attributes, supporting keyboard navigation (arrow keys to switch tabs).
- The FAQ accordion must manage open state internally and expose an `allowMultiple` prop; default to single-expand mode.
- Extract all event-specific data (speakers, schedule, venue, sponsors, tickets, FAQs) into a centralized data file (`event-data.ts`) so content updates require no component changes.
- Implement "Add to Calendar" functionality that generates an .ics file with the session title, time, location, and description, triggering a download.
- Keep individual component files under 150 lines; extract sub-components, hooks (e.g., `useCountdown`, `useScrollSpy`), and utility functions into dedicated directories.
- Provide the sample data file with at least 12 speakers, 3 days of schedule with 6+ sessions per day, 10 sponsors across 4 tiers, and 10 FAQ items.
- Ensure zero ESLint warnings and pass automated accessibility audit (axe-core) with no critical violations.
