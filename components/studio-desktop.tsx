"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Hand,
  User,
  Sparkles,
  Briefcase,
  ListChecks,
  Quote,
  AtSign,
  Play,
  Check,
  ArrowRight,
} from "lucide-react"

/* ---------------- data ---------------- */

type ThemeKey = "organic" | "midnight" | "garden"

const THEME_LABELS: { key: ThemeKey; label: string; dot: string }[] = [
  { key: "organic", label: "Organic", dot: "#c67139" },
  { key: "midnight", label: "Midnight", dot: "#f6a06b" },
  { key: "garden", label: "Garden", dot: "#b2622d" },
]

type WindowId =
  | "hello"
  | "about"
  | "services"
  | "work"
  | "process"
  | "words"
  | "contact"

type IconDef = {
  id: WindowId | "video"
  label: string
  Icon: typeof Hand
  color: string
  shape: string
  href?: string
}

const ICONS: IconDef[] = [
  { id: "hello", label: "Hello", Icon: Hand, color: "var(--ac)", shape: "50%" },
  { id: "about", label: "About", Icon: User, color: "var(--ac2)", shape: "40% 60% 55% 45%" },
  { id: "services", label: "Services", Icon: Sparkles, color: "var(--ac)", shape: "18px" },
  { id: "work", label: "Work", Icon: Briefcase, color: "var(--ac2)", shape: "50%" },
  { id: "process", label: "Process", Icon: ListChecks, color: "var(--ac)", shape: "60% 40% 45% 55%" },
  { id: "words", label: "Kind words", Icon: Quote, color: "var(--ac2)", shape: "18px" },
  { id: "contact", label: "Contact", Icon: AtSign, color: "var(--ink)", shape: "50%" },
  { id: "video", label: "Video", Icon: Play, color: "var(--ac)", shape: "45% 55% 60% 40%", href: "/video-social" },
]

const STEPS = [
  { title: "We talk it through", body: "Your business, in plain words." },
  { title: "I shape the structure", body: "AI drafts it in minutes, and I tune it." },
  { title: "We make it yours", body: "Color, type and voice, refined together." },
  { title: "Launch, then care", body: "Tested, shipped and looked after." },
]

const WORK = [
  { tag: "E-commerce", title: "Skincare shop relaunch", shot: "storefront" },
  { tag: "Non-profit", title: "Volunteer hub", shot: "dashboard" },
  { tag: "Government", title: "Compliance portal", shot: "portal" },
  { tag: "Weddings", title: "Planner booking site", shot: "wedding site" },
]

const QUOTES = [
  {
    text: "Tiana turned my rambling voice memo into a site that sounds more like me than I do.",
    who: "Client name",
    role: "Founder, small business",
  },
  {
    text: "We launched in three weeks. Our old agency quoted us four months.",
    who: "Client name",
    role: "Director, non-profit",
  },
  {
    text: "She was patient with every question and still delivered early.",
    who: "Client name",
    role: "Owner, wedding studio",
  },
]

type WinState = { x: number; y: number; z: number; open: boolean }

const LAYOUT: Record<WindowId, WinState> = {
  hello: { x: 150, y: 76, z: 10, open: true },
  work: { x: 740, y: 120, z: 11, open: true },
  process: { x: 330, y: 420, z: 12, open: true },
  words: { x: 1010, y: 470, z: 13, open: true },
  about: { x: 240, y: 130, z: 14, open: false },
  services: { x: 600, y: 90, z: 15, open: false },
  contact: { x: 820, y: 150, z: 16, open: false },
}

const WINDOW_ORDER: WindowId[] = [
  "hello",
  "work",
  "process",
  "words",
  "about",
  "services",
  "contact",
]

const cloneLayout = (): Record<WindowId, WinState> =>
  Object.fromEntries(
    WINDOW_ORDER.map((id, i) => [id, { ...LAYOUT[id], z: 10 + i }]),
  ) as Record<WindowId, WinState>

const washed: CSSProperties = {
  filter: "saturate(.6) contrast(.85) brightness(1.1) opacity(.94)",
}

/* ---------------- responsive hook ---------------- */

function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 899px)")
    const onChange = () => setMobile(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  return mobile
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setReduced(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])
  return reduced
}

/* ---------------- section content (shared) ---------------- */

function HelloContent({
  onStart,
  onWork,
}: {
  onStart: () => void
  onWork: () => void
}) {
  return (
    <div
      style={{
        padding: 32,
        display: "grid",
        gridTemplateColumns: "150px 1fr",
        gap: 28,
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 150,
          height: 150,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 0 0 8px var(--ac2soft)",
        }}
      >
        <Image
          src="/headshot.jpg"
          alt="Tiana Horn"
          width={150}
          height={150}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "cover", ...washed }}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: 40,
            lineHeight: 1,
            letterSpacing: ".01em",
          }}
        >
          Hey, I&apos;m Tiana.
        </div>
        <div style={{ color: "var(--mut)", fontSize: 16, textWrap: "pretty" }}>
          I build custom websites with AI and a lot of heart. This desktop is
          yours, so open things, drag them around and make yourself at home.
        </div>
      </div>
      <div style={{ gridColumn: "1 / 3", display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={onStart} style={pillBtn("var(--ac)", "var(--onac)")}>
          Start a project
        </button>
        <button onClick={onWork} style={pillBtn("var(--sf)", "var(--ink)")}>
          See my work
        </button>
      </div>
    </div>
  )
}

function WorkContent() {
  return (
    <div
      style={{
        padding: 20,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
      }}
    >
      {WORK.map((p) => (
        <div
          key={p.title}
          className="sd-work-tile"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            padding: 8,
            borderRadius: 20,
            transition: "background-color .2s, transform .25s",
          }}
        >
          <div
            style={{
              aspectRatio: "4 / 3",
              borderRadius: 16,
              background:
                "repeating-linear-gradient(135deg,var(--sf) 0 10px,var(--bg) 10px 20px)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--mut)",
            }}
          >
            {p.shot}
          </div>
          <div style={{ fontWeight: 700 }}>{p.title}</div>
          <div
            style={{
              alignSelf: "flex-start",
              fontSize: 12,
              fontWeight: 700,
              background: "var(--ac2soft)",
              padding: "2px 10px",
              borderRadius: 999,
            }}
          >
            {p.tag}
          </div>
        </div>
      ))}
    </div>
  )
}

function ProcessContent({
  checked,
  toggle,
}: {
  checked: boolean[]
  toggle: (i: number) => void
}) {
  const done = checked.filter(Boolean).length
  const progressLabel =
    done === 4
      ? "All done. Your site is live!"
      : `${done} of 4 · you're ${
          ["just starting", "on your way", "halfway there", "almost live"][done]
        }`
  return (
    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 6 }}>
      {STEPS.map((s, i) => (
        <button
          key={s.title}
          onClick={() => toggle(i)}
          style={{
            border: 0,
            cursor: "pointer",
            textAlign: "left",
            display: "grid",
            gridTemplateColumns: "30px 1fr",
            gap: 12,
            padding: 12,
            borderRadius: 18,
            background: checked[i] ? "var(--ac2soft)" : "transparent",
            color: "var(--ink)",
            font: "15px var(--font-cardo), Georgia, serif",
            transition: "background-color .3s",
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              border: "2.5px solid var(--ac2)",
              background: checked[i] ? "var(--ac2)" : "transparent",
              display: "grid",
              placeItems: "center",
              color: "var(--card)",
              transition: "background-color .3s",
            }}
          >
            {checked[i] && <Check size={15} strokeWidth={2.75} />}
          </span>
          <span>
            <span style={{ display: "block", fontWeight: 700 }}>{s.title}</span>
            <span style={{ display: "block", color: "var(--mut)", fontSize: 14 }}>
              {s.body}
            </span>
          </span>
        </button>
      ))}
      <div
        style={{
          padding: "8px 12px 2px",
          fontWeight: 700,
          color: "var(--ac2)",
          fontSize: 14,
        }}
      >
        {progressLabel}
      </div>
    </div>
  )
}

function WordsContent({
  quoteIndex,
  next,
}: {
  quoteIndex: number
  next: () => void
}) {
  const q = QUOTES[quoteIndex]
  return (
    <div
      style={{
        padding: "12px 22px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div style={{ fontFamily: "var(--font-bebas)", fontSize: 21, lineHeight: 1.2 }}>
        &ldquo;{q.text}&rdquo;
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontWeight: 700, fontSize: 13 }}>
          {q.who}
          <br />
          <span style={{ fontWeight: 400, color: "var(--mut)" }}>{q.role}</span>
        </span>
        <button
          onClick={next}
          style={{
            border: 0,
            cursor: "pointer",
            background: "var(--ink)",
            color: "var(--bg)",
            font: "700 13px var(--font-cardo), Georgia, serif",
            padding: "8px 14px",
            borderRadius: 999,
          }}
        >
          Next →
        </button>
      </div>
    </div>
  )
}

function AboutContent() {
  return (
    <div style={{ padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontFamily: "var(--font-bebas)", fontSize: 30, lineHeight: 1.05 }}>
        Seven years of code, one very human approach.
      </div>
      <div style={{ color: "var(--mut)", textWrap: "pretty" }}>
        I&apos;ve built software for e-commerce brands, non-profits, government
        agencies and wedding businesses. Now I run favored.digital, where AI does
        the heavy lifting and I bring the taste, the questions and the
        follow-through.
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <a
          href="https://www.linkedin.com/in/tiana-horn/"
          target="_blank"
          rel="noopener noreferrer"
          style={smallPill}
        >
          LinkedIn ↗
        </a>
        <a
          href="https://favored.digital"
          target="_blank"
          rel="noopener noreferrer"
          style={smallPill}
        >
          favored.digital ↗
        </a>
      </div>
    </div>
  )
}

function ServicesContent() {
  return (
    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ padding: "14px 16px", borderRadius: 18, background: "var(--acsoft)" }}>
        <div style={{ fontWeight: 700 }}>AI-powered site builds</div>
        <div style={{ color: "var(--mut)", fontSize: 14 }}>
          Custom sites designed and coded with AI, then refined by hand.
        </div>
      </div>
      <div style={{ padding: "14px 16px", borderRadius: 18, background: "var(--ac2soft)" }}>
        <div style={{ fontWeight: 700 }}>Brand &amp; UI design</div>
        <div style={{ color: "var(--mut)", fontSize: 14 }}>
          Interfaces that feel intuitive and look like you.
        </div>
      </div>
      <div style={{ padding: "14px 16px", borderRadius: 18, background: "var(--sf)" }}>
        <div style={{ fontWeight: 700 }}>Care &amp; growth</div>
        <div style={{ color: "var(--mut)", fontSize: 14 }}>
          Updates, security and new features, handled for you.
        </div>
      </div>
      <Link
        href="/video-social"
        className="sd-services-video"
        style={{
          padding: "14px 16px",
          borderRadius: 18,
          background: "var(--ac)",
          color: "var(--onac)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          <span style={{ display: "block", fontWeight: 700 }}>
            Video &amp; social content
          </span>
          <span style={{ fontSize: 14 }}>Short-form edits that stop the scroll</span>
        </span>
        <span style={{ fontWeight: 700 }}>Open →</span>
      </Link>
    </div>
  )
}

function ContactContent() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("https://formspree.io/f/mvzvgrzb", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      if (response.ok) setSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setFormData({ ...formData, [e.target.name]: e.target.value })

  if (submitted) {
    return (
      <div style={{ padding: "8px 24px 24px" }}>
        <div style={{ padding: "28px 0", display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ fontFamily: "var(--font-bebas)", fontSize: 30 }}>
            Message sent!
          </div>
          <div style={{ opacity: 0.8 }}>
            Thank you. I&apos;ll get back to you within 24 hours.
          </div>
        </div>
      </div>
    )
  }

  const field: CSSProperties = {
    font: "15px var(--font-cardo), Georgia, serif",
    padding: "12px 18px",
    borderRadius: 999,
    border: 0,
    background: "var(--bg)",
    color: "var(--ink)",
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: "8px 24px 24px",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        userSelect: "text",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-bebas)",
          fontSize: 28,
          lineHeight: 1.05,
          marginBottom: 4,
        }}
      >
        Let&apos;s make something that feels like you.
      </div>
      <input
        name="name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        required
        style={field}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={field}
      />
      <textarea
        name="message"
        rows={3}
        placeholder="Tell me about your project…"
        value={formData.message}
        onChange={handleChange}
        required
        style={{ ...field, borderRadius: 22, resize: "none" }}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          border: 0,
          cursor: "pointer",
          background: "var(--ac)",
          color: "var(--onac)",
          font: "700 15px var(--font-cardo), Georgia, serif",
          padding: 13,
          borderRadius: 999,
        }}
      >
        {isSubmitting ? "Sending…" : "Send it over"}
      </button>
      <div style={{ fontSize: 13, opacity: 0.7 }}>
        tiana@favored.digital · I reply within 24 hours
      </div>
    </form>
  )
}

/* ---------------- small style helpers ---------------- */

function pillBtn(bg: string, fg: string): CSSProperties {
  return {
    border: 0,
    cursor: "pointer",
    background: bg,
    color: fg,
    font: "700 15px var(--font-cardo), Georgia, serif",
    padding: "12px 22px",
    borderRadius: 999,
  }
}

const smallPill: CSSProperties = {
  background: "var(--sf)",
  padding: "8px 16px",
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 14,
}

/* ---------------- window chrome ---------------- */

function WindowFrame({
  id,
  title,
  win,
  width,
  dark,
  sticky,
  onClose,
  onFocus,
  onDragStart,
  children,
}: {
  id: WindowId
  title: string
  win: WinState
  width: number
  dark?: boolean
  sticky?: boolean
  onClose: () => void
  onFocus: () => void
  onDragStart: (e: ReactPointerEvent) => void
  children: ReactNode
}) {
  const closeDot = (
    <button
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        onClose()
      }}
      aria-label={`Close ${title}`}
      style={{
        width: 14,
        height: 14,
        borderRadius: "50%",
        border: 0,
        padding: 0,
        background: "var(--ac)",
        cursor: "pointer",
      }}
    />
  )

  if (sticky) {
    // Kind-words sticky note variant
    return (
      <div
        onPointerDown={onFocus}
        style={{
          position: "absolute",
          left: win.x,
          top: win.y,
          zIndex: win.z,
          width,
          background: "var(--acsoft)",
          borderRadius: "var(--r)",
          boxShadow: "0 12px 32px rgba(46,43,37,.22)",
          transform: "rotate(3deg)",
          transition: "background-color .6s, border-radius .6s",
        }}
      >
        <div
          onPointerDown={onDragStart}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 18px 0",
            cursor: "grab",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 13, color: "var(--mut)" }}>
            {title}
          </span>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            aria-label="Close Kind words"
            style={{
              border: 0,
              background: "transparent",
              cursor: "pointer",
              font: "700 16px var(--font-cardo), Georgia, serif",
              color: "var(--mut)",
            }}
          >
            ×
          </button>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div
      onPointerDown={onFocus}
      style={{
        position: "absolute",
        left: win.x,
        top: win.y,
        zIndex: win.z,
        width,
        background: dark ? "var(--ink)" : "var(--card)",
        color: dark ? "var(--bg)" : undefined,
        borderRadius: "var(--r)",
        boxShadow: dark
          ? "0 12px 32px rgba(46,43,37,.3)"
          : "0 12px 32px rgba(46,43,37,.22)",
        overflow: "hidden",
        transition: "background-color .6s, border-radius .6s",
      }}
    >
      <div
        onPointerDown={onDragStart}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 16px",
          cursor: "grab",
          background: dark ? "transparent" : "var(--sf)",
          transition: "background-color .6s",
        }}
      >
        {closeDot}
        <span
          style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--ac2)" }}
        />
        <span
          style={{
            flex: 1,
            textAlign: "center",
            fontWeight: 700,
            fontSize: 13,
            color: dark ? undefined : "var(--mut)",
            opacity: dark ? 0.7 : 1,
          }}
        >
          {title}
        </span>
        <span style={{ width: 36 }} />
      </div>
      {children}
    </div>
  )
}

/* ---------------- main component ---------------- */

export function StudioDesktop() {
  const rootRef = useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()
  const reduced = usePrefersReducedMotion()

  const [theme, setTheme] = useState<ThemeKey>("organic")
  const [windows, setWindows] = useState<Record<WindowId, WinState>>(cloneLayout)
  const topZ = useRef(20)
  const [checked, setChecked] = useState([true, true, false, false])
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [clock, setClock] = useState("")

  const dragging = useRef<{ id: WindowId; ox: number; oy: number } | null>(null)

  // theme init: localStorage, else prefers-color-scheme dark -> midnight
  useEffect(() => {
    const saved = localStorage.getItem("tiana-theme") as ThemeKey | null
    if (saved && ["organic", "midnight", "garden"].includes(saved)) {
      setTheme(saved)
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("midnight")
    }
  }, [])

  const pickTheme = useCallback((key: ThemeKey) => {
    setTheme(key)
    localStorage.setItem("tiana-theme", key)
  }, [])

  // live clock
  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      )
    tick()
    const id = setInterval(tick, 20000)
    return () => clearInterval(id)
  }, [])

  // drag listeners
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return
      const { id, ox, oy } = dragging.current
      const x = Math.max(-200, e.clientX - ox)
      const y = Math.max(44, e.clientY - oy)
      setWindows((w) => ({ ...w, [id]: { ...w[id], x, y } }))
    }
    const onUp = () => {
      dragging.current = null
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [])

  const raise = useCallback((id: WindowId, patch: Partial<WinState> = {}) => {
    const nextZ = topZ.current + 1
    topZ.current = nextZ
    setWindows((w) => ({ ...w, [id]: { ...w[id], ...patch, z: nextZ } }))
  }, [])

  const openWindow = useCallback(
    (id: WindowId) => raise(id, { open: true }),
    [raise],
  )
  const focusWindow = useCallback(
    (id: WindowId) => {
      if (windows[id].z !== topZ.current) raise(id)
    },
    [windows, raise],
  )
  const closeWindow = useCallback(
    (id: WindowId) =>
      setWindows((w) => ({ ...w, [id]: { ...w[id], open: false } })),
    [],
  )

  const startDrag = useCallback(
    (id: WindowId) => (e: ReactPointerEvent) => {
      if ((e.target as HTMLElement).tagName === "BUTTON") return
      dragging.current = { id, ox: e.clientX - windows[id].x, oy: e.clientY - windows[id].y }
    },
    [windows],
  )

  const tidyUp = useCallback(() => {
    setWindows(cloneLayout())
    topZ.current = 20
  }, [])

  const toggleStep = useCallback(
    (i: number) => setChecked((c) => c.map((v, j) => (j === i ? !v : v))),
    [],
  )
  const nextQuote = useCallback(
    () => setQuoteIndex((q) => (q + 1) % QUOTES.length),
    [],
  )

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduced) return
      const el = rootRef.current
      if (!el) return
      el.style.setProperty("--cx", e.clientX + "px")
      el.style.setProperty("--cy", e.clientY + "px")
      el.style.setProperty("--mx", ((e.clientX / window.innerWidth - 0.5) * 2).toFixed(3))
      el.style.setProperty("--my", ((e.clientY / window.innerHeight - 0.5) * 2).toFixed(3))
    },
    [reduced],
  )

  const contentFor = (id: WindowId): ReactNode => {
    switch (id) {
      case "hello":
        return (
          <HelloContent
            onStart={() => openWindow("contact")}
            onWork={() => openWindow("work")}
          />
        )
      case "work":
        return <WorkContent />
      case "process":
        return <ProcessContent checked={checked} toggle={toggleStep} />
      case "words":
        return <WordsContent quoteIndex={quoteIndex} next={nextQuote} />
      case "about":
        return <AboutContent />
      case "services":
        return <ServicesContent />
      case "contact":
        return <ContactContent />
    }
  }

  const titleFor: Record<WindowId, string> = {
    hello: "hello.txt",
    work: "Work — 4 items",
    process: "Our process — tap to tick",
    words: `Kind words · ${quoteIndex + 1}/${QUOTES.length}`,
    about: "About Tiana",
    services: "Services",
    contact: "New message to Tiana",
  }
  const widthFor: Record<WindowId, number> = {
    hello: 560,
    work: 500,
    process: 380,
    words: 300,
    about: 460,
    services: 440,
    contact: 420,
  }

  /* ---------- mobile fallback ---------- */
  if (isMobile) {
    return <MobileStack contentFor={contentFor} titleFor={titleFor} theme={theme} pickTheme={pickTheme} />
  }

  /* ---------- desktop ---------- */
  return (
    <div
      ref={rootRef}
      onMouseMove={onMove}
      className={`theme-${theme}`}
      style={
        {
          "--cx": "60vw",
          "--cy": "50vh",
          "--mx": 0,
          "--my": 0,
          position: "relative",
          width: "100vw",
          height: "100vh",
          minHeight: 720,
          overflow: "hidden",
          background: "var(--bg)",
          color: "var(--ink)",
          fontFamily: "var(--font-cardo), Georgia, serif",
          fontSize: 15,
          lineHeight: 1.5,
          transition: "background-color .6s, color .6s",
          userSelect: "none",
        } as CSSProperties
      }
    >
      {/* wallpaper */}
      <div
        style={{
          position: "absolute",
          width: 640,
          height: 640,
          borderRadius: "50%",
          left: "calc(var(--cx) - 320px)",
          top: "calc(var(--cy) - 320px)",
          background: "radial-gradient(circle,var(--acsoft),transparent 65%)",
          transition:
            "left .9s cubic-bezier(.2,.8,.2,1), top .9s cubic-bezier(.2,.8,.2,1)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: -120,
          top: -80,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "var(--ac)",
          opacity: 0.9,
          transform: "translate(calc(var(--mx) * -30px),calc(var(--my) * -30px))",
          transition: "transform .6s, background-color .6s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "34%",
          bottom: -160,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "var(--ac2)",
          transform: "translate(calc(var(--mx) * 40px),calc(var(--my) * 40px))",
          transition: "transform .7s, background-color .6s",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "4vw",
          bottom: 92,
          fontFamily: "var(--font-bebas)",
          fontSize: "clamp(90px,13vw,210px)",
          lineHeight: 0.85,
          color: "var(--sf)",
          textAlign: "right",
          transform: "translate(calc(var(--mx) * 16px),calc(var(--my) * 10px))",
          transition: "transform .6s, color .6s",
          pointerEvents: "none",
        }}
      >
        Tiana
        <br />
        Horn
      </div>

      {/* menu bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 44,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px 0 20px",
          background: "color-mix(in srgb,var(--card) 80%,transparent)",
          backdropFilter: "blur(14px)",
          fontWeight: 600,
          fontSize: 14,
          transition: "background-color .6s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <span style={{ fontFamily: "var(--font-bebas)", fontSize: 18 }}>tiana.os</span>
          <span style={{ color: "var(--mut)" }}>AI-powered websites, made with care</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "var(--mut)", marginRight: 4 }}>Restyle</span>
          {THEME_LABELS.map((t) => (
            <button
              key={t.key}
              onClick={() => pickTheme(t.key)}
              style={{
                border: 0,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 7,
                font: "700 13px var(--font-cardo), Georgia, serif",
                padding: "5px 12px",
                borderRadius: 999,
                background: t.key === theme ? "var(--ink)" : "transparent",
                color: t.key === theme ? "var(--bg)" : "var(--ink)",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: t.dot,
                }}
              />
              {t.label}
            </button>
          ))}
          <button
            onClick={tidyUp}
            className="sd-tidy"
            style={{
              border: 0,
              cursor: "pointer",
              font: "700 13px var(--font-cardo), Georgia, serif",
              padding: "5px 12px",
              borderRadius: 999,
              background: "transparent",
              color: "var(--ink)",
              marginLeft: 8,
            }}
          >
            Tidy up
          </button>
          <span
            style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 13 }}
          >
            {clock}
          </span>
        </div>
      </div>

      {/* desktop icons */}
      <div
        style={{
          position: "absolute",
          top: 68,
          left: 20,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {ICONS.map((ic) => (
          <IconButton key={ic.id} ic={ic} variant="desktop" onOpen={openWindow} />
        ))}
      </div>

      {/* windows */}
      {WINDOW_ORDER.map((id) =>
        windows[id].open ? (
          <WindowFrame
            key={id}
            id={id}
            title={titleFor[id]}
            win={windows[id]}
            width={widthFor[id]}
            dark={id === "contact"}
            sticky={id === "words"}
            onClose={() => closeWindow(id)}
            onFocus={() => focusWindow(id)}
            onDragStart={startDrag(id)}
          >
            {contentFor(id)}
          </WindowFrame>
        ) : null,
      )}

      {/* dock */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          display: "flex",
          gap: 6,
          padding: 8,
          borderRadius: 999,
          background: "color-mix(in srgb,var(--card) 82%,transparent)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 12px 32px rgba(46,43,37,.2)",
          transition: "background-color .6s",
        }}
      >
        {ICONS.map((ic) => (
          <IconButton
            key={ic.id}
            ic={ic}
            variant="dock"
            onOpen={openWindow}
            openDot={ic.id !== "video" && windows[ic.id as WindowId]?.open ? 0.7 : 0}
          />
        ))}
      </div>
    </div>
  )
}

/* ---------------- icon button ---------------- */

function IconButton({
  ic,
  variant,
  onOpen,
  openDot = 0,
}: {
  ic: IconDef
  variant: "desktop" | "dock"
  onOpen: (id: WindowId) => void
  openDot?: number
}) {
  const Icon = ic.Icon
  const inner =
    variant === "desktop" ? (
      <>
        <span
          style={{
            width: 54,
            height: 54,
            borderRadius: ic.shape,
            background: ic.color,
            display: "grid",
            placeItems: "center",
            color: "var(--card)",
            boxShadow: "0 3px 10px rgba(46,43,37,.16)",
            transition: "background-color .6s",
          }}
        >
          <Icon size={24} strokeWidth={2.75} />
        </span>
        {ic.label}
      </>
    ) : (
      <>
        <Icon size={22} strokeWidth={2.75} />
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: -6,
            width: 5,
            height: 5,
            marginLeft: -2.5,
            borderRadius: "50%",
            background: "var(--ink)",
            opacity: openDot,
          }}
        />
      </>
    )

  const handleOpen = () => {
    if (ic.href) window.location.href = ic.href
    else onOpen(ic.id as WindowId)
  }

  if (variant === "desktop") {
    return (
      <button
        onClick={handleOpen}
        className="sd-desktop-icon"
        style={{
          border: 0,
          background: "transparent",
          cursor: "pointer",
          width: 96,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          font: "700 13px var(--font-cardo), Georgia, serif",
          color: "var(--ink)",
          padding: 6,
          borderRadius: 18,
        }}
      >
        {inner}
      </button>
    )
  }

  return (
    <button
      onClick={handleOpen}
      title={ic.label}
      aria-label={ic.label}
      className="sd-dock-icon"
      style={{
        position: "relative",
        border: 0,
        cursor: "pointer",
        width: 46,
        height: 46,
        borderRadius: ic.shape,
        background: ic.color,
        color: "var(--card)",
        display: "grid",
        placeItems: "center",
        transition:
          "transform .25s cubic-bezier(.2,1.5,.4,1), background-color .6s",
      }}
    >
      {inner}
    </button>
  )
}

/* ---------------- mobile fallback ---------------- */

function MobileStack({
  contentFor,
  titleFor,
  theme,
  pickTheme,
}: {
  contentFor: (id: WindowId) => ReactNode
  titleFor: Record<WindowId, string>
  theme: ThemeKey
  pickTheme: (k: ThemeKey) => void
}) {
  return (
    <div
      className={`theme-${theme}`}
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--ink)",
        fontFamily: "var(--font-cardo), Georgia, serif",
        fontSize: 15,
        lineHeight: 1.5,
        transition: "background-color .6s, color .6s",
        paddingBottom: 88,
      }}
    >
      {/* top bar */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8,
          padding: "10px 16px",
          background: "color-mix(in srgb,var(--card) 90%,transparent)",
          backdropFilter: "blur(14px)",
        }}
      >
        <span style={{ fontFamily: "var(--font-bebas)", fontSize: 20 }}>tiana.os</span>
        <div style={{ display: "flex", gap: 6 }}>
          {THEME_LABELS.map((t) => (
            <button
              key={t.key}
              onClick={() => pickTheme(t.key)}
              aria-label={`${t.label} theme`}
              style={{
                border: t.key === theme ? "2px solid var(--ink)" : "2px solid transparent",
                cursor: "pointer",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: t.dot,
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 16px 0", display: "flex", flexDirection: "column", gap: 16 }}>
        {WINDOW_ORDER.map((id) => (
          <div
            key={id}
            id={`m-${id}`}
            style={{
              scrollMarginTop: 64,
              background: id === "contact" ? "var(--ink)" : "var(--card)",
              color: id === "contact" ? "var(--bg)" : undefined,
              borderRadius: "var(--r)",
              boxShadow: "0 12px 32px rgba(46,43,37,.16)",
              overflow: "hidden",
              transition: "background-color .6s, border-radius .6s",
            }}
          >
            <div
              style={{
                padding: "12px 18px",
                background: id === "contact" ? "transparent" : "var(--sf)",
                fontWeight: 700,
                fontSize: 13,
                color: id === "contact" ? undefined : "var(--mut)",
                opacity: id === "contact" ? 0.7 : 1,
              }}
            >
              {titleFor[id]}
            </div>
            {contentFor(id)}
          </div>
        ))}
      </div>

      {/* bottom tab bar */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: 4,
          padding: "10px 8px",
          background: "color-mix(in srgb,var(--card) 92%,transparent)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 -6px 20px rgba(46,43,37,.12)",
          overflowX: "auto",
        }}
      >
        {ICONS.map((ic) => {
          const Icon = ic.Icon
          const content = (
            <span
              style={{
                width: 38,
                height: 38,
                borderRadius: ic.shape,
                background: ic.color,
                color: "var(--card)",
                display: "grid",
                placeItems: "center",
                flex: "0 0 auto",
              }}
            >
              <Icon size={18} strokeWidth={2.75} />
            </span>
          )
          return ic.href ? (
            <Link key={ic.id} href={ic.href} aria-label={ic.label}>
              {content}
            </Link>
          ) : (
            <a key={ic.id} href={`#m-${ic.id}`} aria-label={ic.label}>
              {content}
            </a>
          )
        })}
      </div>
    </div>
  )
}
