# Handoff: Tiana Horn personal site redesign (+ Cloudflare Pages migration)

## Overview
A redesign of Tiana Horn's personal/agency site (favored.digital). It exists to **win freelance clients for AI-powered website builds**, so the site itself has to act as a showpiece: interactive, warm and personal. It covers:

- **Homepage**, in two alternative directions (the owner will pick one; build that one as `/`):
  - **A. Scroll Story**: a long-scroll page with a cursor-reactive hero, a scroll-pinned "sentence to site" story and a live theme switcher.
  - **B. Studio Desktop**: the homepage as a desktop, with draggable, closable windows for each section, a dock and a theme switcher.
- **Video & Social** (`/video-social`): a dedicated page for video editing and social content services.

The target repo is **favored-digital/favored-digital.github.io** (Next.js 16 App Router, React 19, Tailwind v4, lucide-react). Hosting is **moving from GitHub Pages to Cloudflare Pages** (see "Deployment" below).

## About the design files
The files in `designs/` are **design references built in HTML**: prototypes that show the intended look and behavior. They are **not production code to copy**. They run on a small preview runtime (`support.js`) and use inline styles. Recreate them in the existing Next.js codebase using its patterns (App Router pages, React components in `components/`, Tailwind classes or CSS variables). To view a file, open it in a browser from the `designs/` folder, keeping `support.js` and `assets/` next to it.

## Fidelity
**High-fidelity.** Colors, type, radii, copy and interactions are final-intent. Recreate them closely. Exceptions (placeholders):
- Case-study titles, testimonial quotes and "Client name" attributions are **placeholders**. Get real ones from the owner.
- Striped boxes (`repeating-linear-gradient`) are **image/video slots** (project screenshots, reels).
- Mobile layouts were not designed. See "Responsive" below.

---

## Design tokens

### Themes (CSS custom properties)
Both homepages switch between three themes at runtime by setting these variables on the page root. Transition `background-color`/`color` over **0.6s ease**.

| Var | Organic (default) | Midnight | Garden | Role |
|---|---|---|---|---|
| `--bg` | `#f5ead8` | `#2e2b25` | `#f0fae1` | page ground |
| `--sf` | `#ebddc5` | `#474238` | `#e1eecc` | surface / chrome |
| `--card` | `#f9f4ed` | `#3a362f` | `#f9fcf2` | cards, inputs |
| `--ink` | `#201e1d` | `#f9f4ed` | `#272e1b` | text |
| `--mut` | `#645c50` | `#c0b6a5` | `#56633f` | secondary text |
| `--ac` | `#c67139` | `#f6a06b` | `#b2622d` | primary accent (terracotta) |
| `--ac2` | `#7a8a5e` | `#aebf92` | `#56633f` | second accent (sage) |
| `--acsoft` | `#ffe1d0` | `#643312` | `#ffe1d0` | accent tint fill |
| `--ac2soft` | `#e1eecc` | `#3d472b` | `#ccdbb2` | sage tint fill |
| `--onac` | `#201e1d` | `#2e2b25` | `#fff2eb` | text on `--ac` |
| `--r` | `28px` | `14px` | `48px` | container radius |

The Video & Social page uses Organic values hard-coded (no switcher).

Extra ramp colors used: `#dcd3c4 #c0b6a5 #a19786 #eee7db` (neutral wireframe greys), `#fff2eb #ffc6a5 #8c491a #643312 #402310` (accent ramp), `#8fa073 #ccdbb2 #3d472b` (sage ramp).

### Typography
- **Headings:** `Bebas Neue` (Google Fonts, 400), all display text. Letter-spacing about `.005–.01em`, line-height `.98–1.1`.
- **Body/UI:** `Cardo` (Google Fonts, 400/700 plus italic 400). Base `16px / 1.55`. Labels and buttons use weight 700 (600 in the mocks, rendered as 700).
- **Mono accents:** `JetBrains Mono` 400/500 for the prompt box, URL bar, timecodes and placeholder labels.
- Load them with `next/font/google` in `app/layout.tsx` (replacing Inter/Playfair).

| Use | Size |
|---|---|
| H1 hero | `clamp(48px, 6.6vw, 104px)` |
| H2 section | `clamp(36px, 4vw, 60px)` |
| Contact H2 | `clamp(40px, 5vw, 76px)` |
| Card title | `26px` |
| Lead paragraph | `20px`, color `--mut` |
| Eyebrow | `15px`, 700, color `--ac2` |

### Radii, shadows, spacing
- Radii: containers `var(--r)`; buttons, inputs and chips `999px` (pills); textarea `24px`; dark contact/edit panels `40px`; small tiles `16–22px`.
- Shadows: sm `0 3px 10px rgba(46,43,37,.12–.16)`, lg `0 12px 32px rgba(46,43,37,.14–.22)`, xl `0 20px 44px rgba(46,43,37,.3)`.
- Section padding: `120px 6vw` (hero `140px 6vw 80px`). Grid gaps: 20px (cards), 40–48px (columns), 6vw (two-column sections).
- Focus: `outline: 2px solid #c67139; outline-offset: 2px`. Selection: `#ffc6a5`.
- Photos use a "washed" filter: `saturate(.6) contrast(.85) brightness(1.1) opacity(.94)`.

---

## Screen A: Home, Scroll Story (`designs/Home Scroll Story.dc.html`)

**Nav** (fixed, `top/left/right:16px`, pill, `--card` at 82% + `backdrop-filter: blur(14px)`): "Tiana Horn" wordmark (22px heading font). Links: Process, Services, Work, About, Video & Social (to `/video-social`). CTA "Book a call" (accent pill, lifts 2px on hover) links to `#contact`.

**Hero** (`min-height:100vh`, 2 columns `1.15fr / 1fr`):
- Status line: 10px sage dot + "Taking 3 new projects this season".
- H1: "Websites that feel like **you**, built at the speed of a conversation." ("you" in `--ac`).
- Lead: "I'm Tiana, a software engineer with 7 years of experience. I pair AI with careful craft, so you get a custom site in weeks instead of months."
- **Prompt box** (card pill, lg shadow): mono "›" + a typewriter cycling through prompts (type about 55ms/char, hold about 2s, delete 2 chars/tick) + blinking caret, and a dark pill "See how it's built ↓" linking to `#process`. Prompts: "a warm, rounded site for my bakery in Austin", "a portfolio that feels like a gallery opening", "a booking site my clients will actually enjoy", "a shop for hand-dyed yarn, cozy but modern".
- **Cursor-reactive visual:** on mousemove over the hero, set `--mx`/`--my` (−1…1, times a `motion` factor of 1) and `--sx`/`--sy` (cursor %). The hero background is `radial-gradient(700px circle at var(--sx) var(--sy), var(--acsoft), transparent 62%)`. Layered circles translate by different multipliers: accent circle (74% wide) −34px, sage circle (36%) +46px, surface circle (18%) +70px, washed headshot circle (56%, 10px `--bg` border) +14px, and a "Hi, I'm Tiana!" pill (rotated −6°) +22px. Transitions: `transform .4–.7s cubic-bezier(.2,.8,.2,1)`. Reset to 0 on mouseleave.

**Process: scroll story** (`#process`, outer height `420vh`, inner `position:sticky; top:0; height:100vh`):
- Progress `p = clamp(-rect.top / (rect.height - innerHeight), 0, 1)`, and `stage = floor(p*4)` (0–3). A progress bar shows `width: p*100%`.
- Left column: eyebrow "How we work together", H2 "One sentence becomes a site. Scroll and watch.", and 4 steps. The active step gets a `--card` background at opacity 1, the others opacity .4.
  1. We talk it through: "You tell me about your business in plain words. No jargon or forms."
  2. I shape the structure: "AI drafts the layout in minutes, and I tune it around what visitors need."
  3. We make it yours: "Color, type and voice, refined together until it feels like you."
  4. Launch, then care: "Tested on every device, launched and looked after."
- Right column: a browser mock (radius `--r`, lg shadow). Its URL bar text by stage: `new-chat`, `draft-01.preview`, `petalandstem.preview`, `petalandstem.com`. Layers crossfade (opacity .5s, scale .96→1→1.04):
  - Stage 0: chat bubbles (a user request for a Brooklyn flower shop, a question back, "Order a same-day bouquet.").
  - Stage 1: grey rounded wireframe (nav, headline bars, CTA pill, dashed image circle, 3 tiles).
  - Stage 2: styled "Petal & Stem" site (see the file for exact copy/colors).
  - Stage 3: stage 2 plus a "Live at petalandstem.com" badge that drops in (`translateY -30→0`, springy `cubic-bezier(.2,1.4,.4,1)`).

**Services** (`#services`): H2 "Everything your online presence needs, from one person who cares." Grid `auto-fit minmax(250px,1fr)` of 4 cards (`--card`, `min-height:300px`, 32px padding, hover `translateY(-8px) rotate(±1deg)`):
- 1 AI-powered site builds / 2 Brand & UI design / 3 Care & growth (numbered 56px tint circles).
- 4 **Video & social content**: an accent-filled card linking to `/video-social`, "Explore the studio →".

**Work** (`#work`): a horizontal scroll-snap row of 4 cards (`min(440px,80vw)`), each a 4:3 image slot, sage tag, title and one line. Industries: E-commerce, Non-profit, Government, Weddings. Hover lifts 8px. Hint text "Drag or scroll →".

**About** (`#about`, background `--sf`): a blob-masked washed headshot over an offset sage blob (organic `border-radius` percentages), H2 "Hi, I'm Tiana. I love a good brief.", two bio paragraphs (from the current `about.tsx`, rewritten warmer), and pill links LinkedIn / favored.digital.

**Testimonials:** a stacked card deck. The card at offset k is `translate(k*20px, k*20px) rotate(k*2.5deg)`, with backgrounds `--card`, `--acsoft`, `--ac2soft`. Clicking the deck or "Next story →" cycles it (`.55s cubic-bezier(.2,.9,.2,1)`).

**Contact** (`#contact`, dark `--ink` panel, 40px radius, 16px outer margin): H2 "Let's make something that feels like you.", email **tiana@favored.digital**, "Remote, working worldwide". Form card: First/Last name, Email, Message ("Tell me about your project…"), and "Send it over". **Keep the existing Formspree POST** (`https://formspree.io/f/mvzvgrzb`, logic in the current `contact.tsx`). Success state: "Message sent!" plus the 24-hour reply copy.

**Footer:** "© 2026 Tiana Horn · favored.digital" / "This site was designed with AI and refined by hand."

**Theme dock** (fixed bottom-center, dark pill): "Restyle this site" plus Organic / Midnight / Garden buttons, each with an accent dot. The active button inverts. Selecting one sets the theme vars on the root. Persist the choice in `localStorage`, and respect `prefers-color-scheme: dark` → Midnight on first visit (optional).

## Screen B: Home, Studio Desktop (`designs/Home Studio Desktop.dc.html`)
A full-viewport (`100vw × 100vh`, `overflow:hidden`) "desktop":
- **Wallpaper:** a 640px radial `--acsoft` glow that follows the cursor (`.9s` ease), large accent and sage circles with parallax (−30px / +40px), and a giant "Tiana Horn" wordmark in `--sf` at the bottom-right.
- **Menu bar** (44px, blurred card): "tiana.os", tagline, the theme switcher, "Tidy up" (resets the window layout) and a live clock.
- **Desktop icons** (left column, 96px wide) and a **dock** (bottom-center, 46px icons that pop up `translateY(-10px) scale(1.18)` on hover with a springy easing, plus an open-indicator dot). Icons: Hello, About, Services, Work, Process, Kind words, Contact, and Video (links to `/video-social`).
- **Windows:** a card with an `--sf` title bar (grab cursor, a close dot in accent, a sage dot, centered title). They're **draggable** by the title bar (pointer events on `window`, clamp y ≥ 44). Clicking a window brings it to the front (z-index counter). Close hides it, and opening an icon shows it and brings it to the front.
  - Default open: Hello (560px @ 150,76), Work (500px @ 740,120), Process (380px @ 330,420), Kind words (300px sticky note, `--acsoft`, rotated 3° @ 1010,470).
  - Default closed: About (460px), Services (440px), Contact (420px, dark).
  - **Process** is a tickable checklist (the first 2 are checked by default) with a progress label ("2 of 4 · you're halfway there" … "All done. Your site is live!").
- This direction needs a separate **mobile fallback** (stack the windows as full-width cards, with the dock as a bottom tab bar).

## Screen C: Video & Social (`designs/Video and Social.dc.html`, route `/video-social`)
- **Nav:** the same pill nav. Links: ← Websites, How I edit, Reels, Offers. CTA "Book a content call".
- **Hero:** platform chips (Instagram Reels, TikTok, YouTube Shorts, LinkedIn), H1 "Stories that **stop** the scroll.", lead copy, and 2 CTAs. On the right, a fanned trio of 9:16 phones: two tinted slots rotated ±12° plus a center dark phone with the washed headshot, a caption chip and an auto-advancing progress bar. The phones react to the cursor (`--mx/--my` shifts ±40px and rotation ±4°).
- **How I edit** (dark 40px panel): H2 "Every second has a job. Drag the playhead to see each one." A **draggable timeline**: 4 segments sized by duration, Hook 0–10% (`#c67139`), Story 10–60% (`#f5ead8`), Payoff 60–87% (`#7a8a5e`), Call to action 87–100% (`#ffe1d0`). Pointer-down plus drag on the track moves a playhead, the active segment is at full opacity (others .45), and a 9:16 preview card on the left shows that segment's color, timecode, name and caption, with an explanation paragraph above the track. The copy for each segment is in the file.
- **Reels:** a filter pill group (All / Brand stories / Behind the scenes / Tips) and a grid `auto-fill minmax(210px,1fr)` of 9:16 cards (28px radius). On hover: lift −10px and scale 1.03, and a bottom progress bar fills over 6s (a stand-in for muted autoplay preview). In production, use `<video muted playsinline loop preload="none">` that plays on hover/in-view and opens a lightbox on click.
- **Offers:** 3 cards: Edit only, Content studio ("Most loved", accent-filled, lg shadow) and Full channel care, each with ✓ lists. Hover `translateY(-8px) rotate(±1deg)`.
- **Book CTA** (sage 40px panel): "Got footage sitting in your camera roll?", linking to the home `#contact` (or a Cal.com/Calendly embed if the owner has one).

---

## State management
- `theme: 'organic' | 'midnight' | 'garden'` (root; applied as CSS vars; persisted).
- Hero: the mouse position goes in CSS vars via a ref (no React re-render per mousemove). Typewriter `{promptIndex, charIndex, direction}`.
- Scroll story: `progress` as a CSS var through a ref, and `stage` in state (update only when it changes). Use a passive scroll listener or `IntersectionObserver` plus rAF.
- Testimonials: `quoteIndex`.
- Desktop: `windows: Record<id,{x,y,z,open}>`, `topZ`, `checkedSteps: boolean[4]`, `quoteIndex`.
- Video page: `playhead (0–100)`, `hoverReel`, `filter`.
- Contact: form fields plus `isSubmitting` / `submitted` (as in the current `contact.tsx`).

## Responsive (not designed; please implement sensibly)
- Below about 900px: two-column sections stack (the visual goes below the text), the nav links collapse into a menu, and the theme dock shrinks to dots only.
- Scroll story on mobile: keep the sticky browser mock on top at about 55vh, with the steps below it.
- Disable the cursor effects on touch devices (`(hover: none)`). Honor `prefers-reduced-motion` by turning off parallax, the typewriter (show the full text) and the springy transitions.

## Assets
- `designs/assets/tiana.jpg`: the owner's headshot (uploaded). The repo also has `public/headshot.jpg`, so use whichever is higher resolution.
- Icons: the mocks use text glyphs (▶ ✓ ✦ @ “). In production, use **lucide-react** (already installed) at `strokeWidth={2.75}`.
- Case-study screenshots and reel videos: **to be supplied by the owner**.

## Files
- `designs/Home Scroll Story.dc.html`: homepage direction A
- `designs/Home Studio Desktop.dc.html`: homepage direction B
- `designs/Video and Social.dc.html`: the video/social page
- `designs/support.js`: the preview runtime (only needed to view the mocks)
- `designs/assets/tiana.jpg`

Repo files to replace/extend: `app/page.tsx`, `app/layout.tsx` (fonts, metadata), `app/globals.css` (theme vars), `components/{header,hero,about,services,process,contact,footer}.tsx`. Add `components/{work,testimonials,theme-dock}.tsx` and `app/video-social/page.tsx`.

---

## Deployment: move from GitHub Pages to Cloudflare Pages
1. Add `next.config.mjs` (the GitHub Pages action currently injects this config automatically):
   ```js
   /** @type {import('next').NextConfig} */
   export default { output: 'export', images: { unoptimized: true }, trailingSlash: true };
   ```
   Do **not** set `basePath` (Cloudflare serves from the root).
2. Delete `.github/workflows/nextjs.yml` and disable GitHub Pages in the repo settings.
3. Remove `@vercel/analytics` (the package and the `<Analytics />` in `layout.tsx`). Use **Cloudflare Web Analytics** instead (toggle it in the Pages project; no code needed).
4. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick the repo. Framework preset **Next.js (Static HTML Export)**, build command `npm run build`, output directory `out`, and env `NODE_VERSION=20`.
5. Custom domains: add `tianahorn.com` and `favored.digital` in the Pages project (moving DNS to Cloudflare is simplest). Every branch/PR gets a preview URL, which is useful for client reviews.
6. Reel videos: don't commit large video files. Use **Cloudflare Stream** (adaptive streaming, poster frames) or **R2** plus `<video>`, and reference them by URL.
7. The contact form keeps working as-is through Formspree. It can later move to a Pages Function if desired.
