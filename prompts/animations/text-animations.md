# Animated Typography Prompt

## Role

You are a creative front-end developer and typographic motion designer. You
specialize in bringing text to life through animation — from subtle reveals to
dramatic kinetic typography sequences. You understand the intersection of type
design, timing functions, and performance optimization, and you know how to make
words move in ways that enhance meaning rather than distract from it.

## Task

Build a collection of animated typography components and effects that can be
used as hero headlines, section titles, decorative elements, or interactive text
treatments in any web project. Deliver them as a scrollable showcase page where
each effect is demonstrated with preview and description.

## Design Goals

- **Meaningful motion**: Every animation should reinforce the content's message
  or guide the reader's eye. Motion for its own sake is not the goal.
- **Timing precision**: Easing curves, delays, and durations should feel natural
  and intentional. Stagger patterns should create rhythm, not chaos.
- **Cross-browser reliability**: All effects must work in modern browsers (Chrome,
  Firefox, Safari, Edge) and degrade gracefully in older ones.
- **Performance**: Text animations must not cause layout shifts, paint storms, or
  jank. Stick to `transform` and `opacity` wherever possible.

## Requirements

### Typewriter Effects (minimum 2)

1. **Classic typewriter**: Characters appear one at a time with a blinking cursor.
   Configurable typing speed, pause between words, and optional delete-and-retype
   for cycling through multiple phrases.
2. **Terminal typewriter**: Green-on-black monospace text that types out with a
   block cursor, optional command prompt prefix, and line-by-line output.

### Split Text Animations (minimum 3)

1. **Character split reveal**: Text splits into individual characters that animate
   in from below (or above, left, right) with staggered delay. Each character
   wrapped in a `<span>` with `overflow: hidden` on the parent for a clean mask.
2. **Word split reveal**: Words animate individually — fade, slide, or scale in
   with a stagger. Useful for hero headlines.
3. **Line split reveal**: Multi-line text block where each line slides or fades in
   sequentially. Lines are auto-detected or manually split via data attributes.

### Gradient and Color Text (minimum 2)

1. **Animated gradient text**: Text filled with a moving gradient that shifts hue
   or position over time using `background-clip: text` and animated
   `background-position`.
2. **Color wipe reveal**: Text starts in one color and a color-fill sweeps across
   it (left-to-right or per-character) to reveal a second color. Triggered on
   scroll or on load.

### Reveal and Mask Effects (minimum 3)

1. **Clip-path reveal**: Text is revealed by an animating `clip-path` (rectangle
   expanding, circle growing, or polygon morphing).
2. **Blur-to-sharp reveal**: Text starts fully blurred (`filter: blur()`) and
   sharpens into focus, optionally combined with a scale or slide.
3. **Underline draw**: An animated underline or highlight marker draws itself
   beneath or through the text when it scrolls into view. Uses a pseudo-element
   with `scaleX` animation.

### Kinetic / Decorative Effects (minimum 2)

1. **Bouncing letters**: Individual characters have a physics-inspired bounce
   animation on hover or on load, with staggered timing for a wave effect.
2. **Scramble / decode**: Text starts as random characters and rapidly shuffles
   through the alphabet before resolving into the final message (like a cipher
   decoding). Implemented in JavaScript with `requestAnimationFrame`.

### Technical Requirements for Each Component

1. Each effect is encapsulated as a reusable function or class that accepts a
   target element and an options object (duration, delay, easing, direction).
2. Animations are triggered by Intersection Observer (scroll-based) by default,
   with an option for immediate play or manual trigger.
3. Text splitting logic handles dynamic content — do not hardcode character or
   word spans in HTML. JavaScript splits at runtime.
4. All effects include a `prefers-reduced-motion` fallback that shows the text
   immediately without animation.
5. ARIA: animated text containers use `aria-label` with the full text content so
   screen readers announce the complete message regardless of animation state.

### Showcase Page

1. Full-page vertical scroll through all effects, each in its own viewport-height
   section.
2. Each section includes the effect name, a brief description, and the animated
   text demo that triggers when scrolled into view.
3. A sidebar or floating nav for jumping between effects.
4. A controls panel to adjust speed, easing, and direction for the active effect.

## Technology Suggestions

| Layer         | Recommended                                              |
|---------------|----------------------------------------------------------|
| Markup        | Semantic HTML5, `<span>` wrapping for split text         |
| Styling       | CSS3 keyframes, `clip-path`, `background-clip: text`     |
| Animation     | GSAP (SplitText plugin) or custom vanilla JS splitter    |
| Scroll Trigger| Intersection Observer or GSAP ScrollTrigger              |
| Fonts         | Google Fonts (variable weight for kinetic emphasis)      |
| Framework     | Vanilla JS or lightweight framework (Svelte, Lit)        |
| Build Tool    | Vite                                                     |
| Accessibility | `aria-label`, `prefers-reduced-motion`, `role="text"`    |

## Expected Output Structure

```
text-animations/
  index.html                  # Showcase page
  css/
    variables.css             # Timing tokens, color tokens, font stacks
    base.css                  # Reset, section layout, showcase styles
    typewriter.css            # Cursor blink, typing keyframes
    split-text.css            # Character/word/line reveal styles
    gradient-text.css         # Gradient fill and color wipe styles
    reveal.css                # Clip-path, blur, underline draw
    kinetic.css               # Bounce, scramble visual styles
    reduced-motion.css        # Static fallbacks
  js/
    text-splitter.js          # Utility to split text into spans
    typewriter.js             # Typewriter engine
    scramble.js               # Character scramble/decode engine
    scroll-trigger.js         # Intersection Observer wrapper
    main.js                   # Initialize all effects, controls panel
  assets/
    fonts/                    # Variable fonts if self-hosted
```

## Evaluation Criteria

- Visual impact and variety of text animation techniques.
- Timing, easing, and stagger create a polished, intentional feel.
- Text splitting is dynamic and handles arbitrary content.
- Every effect degrades gracefully with `prefers-reduced-motion`.
- ARIA labels ensure screen-reader users receive the full message.
- Code is modular, well-documented, and easy to integrate into other projects.
- All animations run at 60fps with no layout shifts.
