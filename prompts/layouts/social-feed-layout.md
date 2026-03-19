# Social Media Feed Layout Prompt

## Role

You are a senior frontend designer and layout architect specializing in social media platforms and community-driven feed interfaces. You have deep expertise in infinite scroll performance, real-time content updates, user-generated content display, engagement interaction patterns (likes, comments, shares), and the complex UI challenges of notification systems, messaging hints, and profile management. You understand how users interact with social feeds: they scroll rapidly, engage selectively, seek social validation through metrics, and expect real-time responsiveness. You design interfaces that feel alive, personal, and addictively browsable while maintaining clarity and visual consistency across diverse user-generated content.

## Task

Design and build a complete, production-ready social media feed layout that enables users to browse an algorithmically sorted content feed, create and publish posts with rich media, engage with content through reactions and comments, discover new people and trending topics, manage their profile and connections, and receive real-time notifications. The layout must handle the inherent unpredictability of user-generated content (varying text lengths, image aspect ratios, mixed media types) while maintaining a clean, consistent visual rhythm. The experience should feel fast, responsive, and socially engaging.

## Layout Structure

The social media platform is composed of the following structural elements, forming a responsive three-column application shell:

1. **Top Navigation Bar** -- A fixed horizontal bar (height: 56px) spanning the full viewport width with a white/light background (or dark in dark mode) and a subtle bottom shadow (0 1px 3px rgba(0,0,0,0.08)). Contains from left to right: (a) the platform logo/wordmark (28px height, linked to home/feed), (b) a search input (max-width 360px, height 40px, border-radius 20px full-pill, muted background, placeholder "Search people, topics, posts...", magnifying glass icon prefix) that expands on focus and shows a dropdown with recent searches, trending searches, and real-time results grouped by People, Posts, and Topics as the user types (debounced 250ms), (c) navigation icon links centered or right-aligned: Home (house icon, filled when active), Explore/Discover (compass icon), Messages (chat bubble icon with an unread count badge -- red circle with white number, max "99+"), Notifications (bell icon with unread count badge, animated ring/shake when new notification arrives), (d) the user's avatar (32px circle, border: 2px solid transparent, hover: border accent color) as a dropdown trigger for a menu containing: profile link, settings, appearance (light/dark mode toggle), help, and sign out. The dropdown appears on click with a subtle scale-in animation (transform: scale(0.95) to scale(1), opacity 0 to 1, 150ms).

2. **Three-Column Layout** -- The main content area below the top nav, structured as three columns with the feed in the center:

   **Left Sidebar (width: 280px, fixed position, scrollable):**
   (a) Profile summary card at the top: user's cover photo (height 80px, full-width, object-fit cover), avatar (64px circle, border 3px white, overlapping the cover photo bottom), display name (16px bold), username/handle (14px muted, e.g., "@username"), a one-line bio (14px, 2-line clamp), and a stats row showing Followers, Following, and Posts counts (each as a clickable link, number bold 15px, label muted 12px).
   (b) Navigation links below the profile card (16px, padding 12px 16px, border-radius 10px, full-width, icon + label): Feed (home icon), Explore (compass icon), Bookmarks (bookmark icon), Lists (list icon), Settings (gear icon). Active state: accent-color background at 10% opacity, semibold text, accent icon. Each link has a hover background tint.
   (c) A "Trending Topics" section below navigation: a heading ("Trending", 14px semibold, muted) followed by 5 trending items, each showing: a category label (12px, muted, e.g., "Technology · Trending"), the topic or hashtag name (15px, semibold, clickable), and the post count (12px, muted, e.g., "12.4K posts"). A "Show More" link at the bottom.
   (d) Footer links at the bottom of the sidebar (12px, muted, wrap): Terms, Privacy, Cookies, Accessibility, About, Careers, Developers, followed by a copyright line.

   **Center Feed Column (flex: 1, min-width: 480px, max-width: 680px, centered):**
   (a) Post Composer at the top (border-radius 12px, border 1px solid 10% opacity, padding 16px, margin-bottom 16px). Contains: the user's avatar (40px circle, left-aligned), a text input area (expandable textarea, placeholder "What's happening?", 16px, min-height 48px growing to fit content up to 280px before scrolling). Below the text area when focused or when content exists: a media attachment bar with icon buttons for Image (gallery icon, opens file picker accepting jpg/png/gif/webp, max 4 images), Video (camera icon, accepts mp4/webm, max 1 video), GIF (gif icon, opens a GIF search panel using Tenor or Giphy API), Poll (chart icon, reveals poll creation UI with 2-4 option inputs and a duration selector), and Emoji (smiley icon, opens an emoji picker grid). Above the post button: a character counter (circular progress indicator, turns red when exceeding the 280-character limit, displays remaining count when under 20). A "Post" button (accent background, text-white, px-6 py-2, rounded-full, font-weight 600, disabled when empty or over limit). When images are attached, show thumbnails below the text area in a grid (1 image: full-width, 2 images: side by side, 3-4 images: 2x2 grid with one spanning) with individual remove buttons (small x circle overlay, top-right of each thumbnail).

   (b) Feed -- an infinite-scrolling list of posts. Each post is an `<article>` element (border-bottom 1px, 8% opacity, padding 16px) containing:
   - **Author row:** avatar (40px circle, clickable), display name (15px bold, clickable, hover underline), username (14px muted, e.g., "@handle"), a middle dot separator, timestamp (14px muted, relative time: "2m", "3h", "1d", with full date on hover tooltip), and a three-dot options menu button (far right, opens a dropdown: Follow/Unfollow, Mute, Block, Report, Copy Link, Share via DM, Embed).
   - **Content body:** post text (15px, line-height 1.5, white-space pre-wrap to preserve line breaks) with: @mentions styled as clickable accent-colored links, #hashtags styled as clickable accent-colored links, URLs auto-linked and truncated with a preview (link preview cards: image thumbnail, site name, title, description, border-radius 12px, border 1px). Text that exceeds 280 characters or 5 lines shows a "Show more" expand button.
   - **Media attachments:** images in a responsive grid layout (1 image: full-width 16:9, border-radius 12px; 2 images: side by side 1:1 each, 4px gap; 3 images: one tall left + two stacked right; 4 images: 2x2 grid; video: full-width player with controls, muted autoplay on scroll-into-view, click to unmute). All images are clickable to open a lightbox with navigation. GIFs play inline with a "GIF" badge overlay.
   - **Engagement action bar:** four action buttons spaced evenly (each with an icon and count): Reply (chat bubble icon, comment count), Repost/Retweet (retweet arrows icon, repost count, green color when user has reposted), Like (heart icon, like count, red color and fill animation when liked -- scale bounce from 1 to 1.3 to 1 with a brief particle burst effect), Share/Bookmark (share icon or bookmark icon, opens share options). Counts abbreviate above 1000 (e.g., "2.4K", "1.2M"). Each button has a circular hover background tint in its corresponding action color.
   - **Comment preview section (collapsed by default):** if the post has comments, show "View all X comments" link that expands to reveal the top 2-3 comments inline (each with avatar 28px, name bold, text, timestamp, like button), and a reply input at the bottom (avatar 28px, input field "Post your reply...", send button). Full comment thread is accessible via the post detail modal.

   Feed loading: show skeleton placeholder cards (3-4) on initial load and when fetching more content. Infinite scroll triggers when the user is within 500px of the bottom. A "New posts available" pill notification (sticky, top of feed, accent background, "See new posts" text, click to scroll to top and prepend new posts) appears when new content is pushed via real-time updates (WebSocket or SSE) rather than automatically inserting to prevent scroll jump.

   **Right Sidebar (width: 320px, fixed position, scrollable):**
   (a) "Who to Follow" section: heading (16px semibold) followed by 3-5 suggested user cards, each showing avatar (44px circle), display name (14px bold), username (13px muted), a one-line bio snippet (13px, 1-line truncate), and a "Follow" button (outlined pill, 12px semibold, hover: filled accent). A "Show More" link at the bottom. The Follow button changes to "Following" (filled, muted) on click with an optimistic update.
   (b) "Trending Hashtags" section: heading (16px semibold) followed by 5-8 hashtag items, each showing the hashtag name (15px semibold, accent color, clickable), post count (12px muted), and an optional small sparkline or trend indicator. Hashtags link to a search results page filtered to that tag.
   (c) Footer links (same as left sidebar footer, repeated for convenience): 12px, muted, terms/privacy/etc.

3. **Post Detail View (Modal Overlay)** -- Triggered by clicking a post or the reply/comment action. Opens as a centered modal (max-width 640px, max-height 90vh, border-radius 16px, scrollable) overlaid on a semi-transparent backdrop (rgba(0,0,0,0.5), click to dismiss). Contains: the full post (same layout as in feed but without truncation), a horizontal divider, engagement stats row (e.g., "124 Reposts · 38 Quotes · 2.4K Likes" as clickable links opening user lists), another divider, the action bar, and the full comment thread below: each comment with avatar, name, username, timestamp, text, nested replies (indented 48px with a connecting thread line on the left, 2px wide, muted color), and a reply input fixed at the bottom of the modal. The modal traps focus, is dismissible via Escape key, and updates the browser URL (e.g., `/post/123`) without a full navigation so the back button closes the modal.

4. **Profile Page** -- Accessible via clicking a username or navigating to `/@username`. Structure: (a) cover photo (full-width, height 200px desktop / 150px mobile, object-fit cover) with an "Edit Cover" button overlay if viewing own profile, (b) profile info section: avatar (120px circle, border 4px solid background color, positioned to overlap the cover photo bottom by 50%), display name (24px bold), username (16px muted), bio (15px, line-height 1.6, supporting @mentions and #hashtags as links, max 160 characters), metadata row (14px muted, icon + label pairs: location with map pin icon, website URL with link icon, join date with calendar icon), (c) stats row: Posts count, Following count, Followers count (each clickable to view the respective list in a modal), (d) action buttons: "Follow"/"Following" toggle button (or "Edit Profile" if own profile), three-dot options menu, (e) content tabs below: Posts (default, showing the user's posts in reverse chronological order), Replies (posts that are replies), Media (only posts with images or video, displayed in a masonry grid), Likes (posts the user has liked). Each tab loads content in an infinite scroll list using the same post component as the main feed.

5. **Notifications Page** -- Accessible via the bell icon. Structure: (a) page title ("Notifications", 24px bold), (b) filter tabs: All, Mentions, Likes, Reposts, Follows (horizontal tabs with underline active indicator), (c) a scrollable list of notification items, each with: a type icon (heart for like, retweet arrows for repost, user-plus for follow, chat for mention, colored by type), the actor's avatar (36px) and name (bold, clickable), the notification text (14px, e.g., "liked your post", "followed you", "mentioned you in a reply"), a snippet or preview of the related post (13px, muted, 2-line clamp), and the timestamp (13px, muted, relative). Unread notifications have a subtle accent-tinted background. A "Mark all as read" button at the top right clears the unread state.

## Design Goals

- Create an addictively scrollable feed experience where content loads seamlessly, engagement interactions feel instant, and the interface stays out of the way of the content.
- Handle the inherent unpredictability of user-generated content (varying text lengths, image ratios, no images, embedded links, polls) while maintaining a consistent visual rhythm in the feed.
- Make engagement interactions feel rewarding: the like heart animation, repost confirmation, and comment submission should provide satisfying micro-feedback that encourages continued engagement.
- Design for real-time: new posts, likes, comments, and notifications should appear without requiring page refreshes, using WebSocket or SSE connections for live updates.
- Maintain performance with potentially thousands of posts in the feed using virtualized scrolling (rendering only visible posts and a buffer), efficient image lazy loading, and minimal re-renders on state changes.
- Use a clean, content-forward design palette: neutral backgrounds, minimal borders, and the accent color reserved for interactive elements (links, buttons, active states).

## UI Requirements

- The infinite scroll feed must use virtualized rendering (react-window or @tanstack/virtual) to maintain smooth 60fps scrolling regardless of feed length, unmounting off-screen post DOM elements.
- The like button animation must include: icon transition from outline to filled, color change to red, a scale bounce (1 to 1.3 to 1 over 300ms with spring easing), and an optional particle burst effect (small hearts or dots radiating outward). Respect `prefers-reduced-motion` by disabling the animation.
- The post composer textarea must auto-expand in height as the user types, up to a max-height, then switch to scrolling. The character counter must be a circular SVG progress indicator that smoothly animates as the count changes.
- @mention and #hashtag autocomplete must appear in a dropdown as the user types (triggered by "@" or "#" prefix), showing matching users or tags, navigable via arrow keys, selectable via Enter.
- Image uploads in the post composer must show upload progress (circular progress overlay on each thumbnail), support drag-and-drop, and allow reordering before posting.
- The post detail modal must update the browser URL using `history.pushState` so the URL is shareable, and pressing the back button closes the modal instead of navigating away.
- Toast notifications must confirm engagement actions ("Post published," "Repost successful," "Copied to clipboard") with a brief 3-second display and auto-dismiss.
- All relative timestamps must update live (via a `useRelativeTime` hook with a 30-second refresh interval for recent posts, 5-minute for older ones).

## Responsive Behavior

- **Desktop (1280px and above):** Full three-column layout: left sidebar (280px), center feed (480-680px), right sidebar (320px). Post detail opens as a centered modal. Profile page shows all elements at full size. Both sidebars visible and fixed.
- **Tablet (768px to 1279px):** Left sidebar collapses to an icon-only rail (68px) with labels shown as tooltips on hover. Right sidebar hides; "Who to Follow" and "Trending" content moves to the top of the feed as dismissible cards or to an Explore page. Feed expands to fill available width (max 680px, centered). Post detail modal remains centered. Profile cover photo reduces to 160px height.
- **Mobile (below 768px):** Both sidebars collapse entirely. The left sidebar navigation moves to a bottom tab bar (height 52px): Home, Search/Explore, Post (center, accent colored, triggers the composer as a full-screen modal), Notifications, Profile. The top navigation bar simplifies to: logo (left), search icon (opens full-screen search overlay on tap), user avatar (right, opens profile/settings sheet). The feed fills the full viewport width with 0 horizontal margin (edge-to-edge cards). Post composer opens as a full-screen modal with the "Post" button in the top-right corner. Post detail opens as a full-screen page rather than a modal. Profile page stacks all content vertically with a smaller avatar (80px). Image grids in posts use smaller gaps (2px). The post action bar icons enlarge to meet 44x44px touch targets. Pull-to-refresh replaces the "New posts" pill for loading new content. "Who to Follow" suggestions appear as a horizontal scroll row at the top of the feed.

## Technology Suggestions

- Next.js 14+ (App Router) with server components for initial feed rendering and client components for interactive feed, composer, and real-time updates.
- Tailwind CSS 3+ for utility-first styling with a custom theme and `darkMode: 'class'` strategy for light/dark mode toggling.
- Zustand for client-side state management: authenticated user, feed state, notification count, composer state, modal state.
- TanStack Query for server-state management: feed pagination (infinite query), user profiles, notifications, search results, with optimistic mutations for like/repost/follow actions.
- TanStack Virtual (react-virtual) for virtualizing the feed and comment lists, rendering only visible items plus a buffer for smooth scrolling performance.
- Framer Motion for the like heart animation (scale spring + particle burst), modal entrance/exit, composer expand, dropdown menus, and the "New posts" pill entrance.
- Socket.io or SSE (Server-Sent Events) for real-time feed updates, notification pushes, and live comment streaming.
- Radix UI or Shadcn/UI for accessible primitives: dialog (post detail modal, composer modal), dropdown-menu (user menu, post options), tooltip (timestamps, sidebar labels), popover (emoji picker, share options), avatar.
- Tiptap or a custom contenteditable implementation for the post composer, supporting @mention and #hashtag inline tokens with autocomplete.
- Uppy or a custom upload handler for image/video uploads with progress tracking, preview, and drag-and-drop support.

## Expected Output

### Component Structure

```
SocialPlatform/
  Layout/
    AppLayout.tsx
    TopNavBar/
      TopNavBar.tsx
      SearchBar.tsx
      SearchDropdown.tsx
      NotificationBadge.tsx
      UserAvatarMenu.tsx
    LeftSidebar/
      LeftSidebar.tsx
      ProfileSummaryCard.tsx
      SidebarNavLinks.tsx
      TrendingTopics.tsx
      SidebarFooter.tsx
    RightSidebar/
      RightSidebar.tsx
      WhoToFollow.tsx
      SuggestedUserCard.tsx
      TrendingHashtags.tsx
    MobileTabBar.tsx
  Feed/
    FeedPage.tsx
    PostComposer/
      PostComposer.tsx
      ComposerTextArea.tsx
      MediaAttachmentBar.tsx
      MediaPreviewGrid.tsx
      CharacterCounter.tsx
      EmojiPicker.tsx
      GifSearchPanel.tsx
      PollCreator.tsx
      MentionAutocomplete.tsx
    PostList/
      PostList.tsx
      VirtualizedFeed.tsx
      PostCard.tsx
      PostAuthorRow.tsx
      PostContent.tsx
      PostMediaGrid.tsx
      LinkPreviewCard.tsx
      PostActionBar.tsx
      LikeButton.tsx
      CommentPreview.tsx
      NewPostsPill.tsx
    PostDetail/
      PostDetailModal.tsx
      FullCommentThread.tsx
      CommentItem.tsx
      ThreadLine.tsx
      ReplyInput.tsx
    SkeletonPost.tsx
  Profile/
    ProfilePage.tsx
    CoverPhoto.tsx
    ProfileInfo.tsx
    ProfileStats.tsx
    ProfileTabs.tsx
    EditProfileModal.tsx
    FollowersList.tsx
    FollowingList.tsx
  Notifications/
    NotificationsPage.tsx
    NotificationFilterTabs.tsx
    NotificationItem.tsx
  Explore/
    ExplorePage.tsx
    TrendingSection.tsx
    SearchResultsPage.tsx
  Shared/
    Avatar.tsx
    FollowButton.tsx
    RelativeTimestamp.tsx
    Toast.tsx
    Skeleton.tsx
    Badge.tsx
    ConfirmDialog.tsx
    ImageLightbox.tsx
    ContextMenu.tsx
```

### Page Sections

1. Top Navigation Bar -- logo, search with live results, nav icons with badges, user avatar dropdown
2. Left Sidebar -- profile summary card, navigation links, trending topics, footer links
3. Center Feed -- post composer with media attachments, infinite scroll post list with engagement actions
4. Right Sidebar -- suggested follows, trending hashtags, footer links
5. Post Detail Modal -- full post, engagement stats, complete comment thread with nested replies
6. Profile Page -- cover photo, avatar, bio, stats, tabbed content (posts/replies/media/likes)
7. Notifications Page -- filtered notification list with type icons, actors, and post previews

### Code Requirements

- Use TypeScript with strict mode for all components; define interfaces for User, Post, Comment, Notification, MediaAttachment, Poll, Hashtag, and FeedPage types.
- The feed must use infinite query pagination (TanStack Query `useInfiniteQuery`) with cursor-based pagination, fetching 20 posts per page, and prepending real-time posts via a separate query that does not disturb the user's scroll position.
- Engagement mutations (like, repost, follow) must use optimistic updates: immediately update the UI (increment count, change button state) before the API confirms, and revert on error with a toast notification explaining the failure.
- The post composer must enforce character limits client-side, validate media attachments (file type, size, count limits), and submit as `multipart/form-data` for file uploads with progress tracking.
- Virtualized feed rendering must use a dynamic row height estimator (since posts vary in height due to content length and media) with `react-virtual` or `@tanstack/virtual`, measuring elements after render and caching heights.
- The post detail modal must use `history.pushState` to update the URL to `/post/[id]` when opened and `history.back()` when closed, and must handle direct navigation to `/post/[id]` as a full page load (server-rendered post page).
- Real-time notifications must update the unread count badge in the top nav and optionally show a browser Notification API popup (with user permission) for mentions and direct messages.
- All user-generated text must be sanitized against XSS attacks before rendering; use a library like DOMPurify or sanitize-html, and render @mentions and #hashtags via a custom text parser, not `dangerouslySetInnerHTML`.
- Provide a sample data file (`social-data.ts`) with at least 5 users (with avatars, bios, follower counts), 20 posts (mixed text-only, with images, with link previews, with polls), 15 comments across posts, and 10 notifications to demonstrate the full feed, profile, and notification experience.
- Keep individual component files under 150 lines; extract hooks (`useFeed`, `usePostComposer`, `useLikeAnimation`, `useRelativeTime`, `useInfiniteScroll`, `useRealTimeUpdates`) into a dedicated `hooks/` directory.
- Ensure zero ESLint warnings and pass automated accessibility audit (axe-core) with attention to: dynamic content updates announced via aria-live regions, post images with meaningful alt text, action buttons with descriptive aria-labels, and modal focus management.
