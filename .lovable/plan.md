## Add "Our Story" Section to Homepage

Insert a new section in `src/routes/index.tsx` between the Hero and the "Where Tradition Awakens" (Highlights) section, styled to match the reference screenshot.

### Layout

- Full-width section with two columns on desktop (stacked on mobile)
- **Left column**: Large Yakshagana performer image (reuse `hero-yakshagana.jpg` or one of the gallery images) — edge-to-edge, no rounded corners, filling the column height
- **Right column**: Dark background with text content:
  - "OUR STORY" label in crimson/red, uppercase, letter-spaced (matching the site's primary red)
  - "The Living Tradition" heading in large serif/display font (Cinzel)
  - Three paragraphs of descriptive text in muted foreground color, with "Kathegaararu" bolded
  - Content adapted from the reference: cultural significance of Yakshagana, the collective's mission, and an invitation

### Styling details

- Background: dark (#0D0D0D or the site's `background` color) to blend seamlessly
- The image should take roughly 45% width on desktop
- Text side has generous padding (py-16 px-12 or similar)
- Framer Motion scroll-reveal animations (fade-in-up) consistent with the rest of the page
- No border or card styling — clean, immersive feel matching the reference
- Responsive: on mobile, image stacks above text, full-width

### Translation

- Add new i18n keys under `about` (e.g., `about.sectionTitle`, `about.livingTitle`, `about.livingBody`) in both English and Kannada in `src/lib/i18n.ts`, or reuse existing `t.about` keys where content overlaps.

### Files changed

1. `src/lib/i18n.ts` — add new translation keys for the homepage about section
2. `src/routes/index.tsx` — insert the new "Our Story" section between Hero and Highlights
