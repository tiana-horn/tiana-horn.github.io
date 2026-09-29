"use client"

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react"
import Image from "next/image"
import Link from "next/link"

/* ---- Organic theme, hard-coded (no switcher on this page) ---- */
const C = {
  bg: "#f5ead8",
  sf: "#ebddc5",
  card: "#f9f4ed",
  ink: "#201e1d",
  mut: "#645c50",
  ac: "#c67139",
  ac2: "#7a8a5e",
  acsoft: "#ffe1d0",
  ac2soft: "#e1eecc",
}

const bebas: CSSProperties = { fontFamily: "var(--font-bebas)", fontWeight: 400 }
const mono: CSSProperties = { fontFamily: "var(--font-mono)" }

const SEGS = [
  {
    name: "Hook",
    from: 0,
    to: 0.1,
    time: "0:00 – 0:03",
    bg: "#c67139",
    fg: "#201e1d",
    caption: "Your website is losing you clients. Here is why.",
    why: "The first three seconds decide everything. I open on tension, like a question, a bold claim or movement, so thumbs stop.",
  },
  {
    name: "Story",
    from: 0.1,
    to: 0.6,
    time: "0:03 – 0:18",
    bg: "#f5ead8",
    fg: "#201e1d",
    caption: "Last month a bakery owner came to me with…",
    why: "Real people and real moments. Jump cuts keep the pace up, and captions carry the message for people watching on mute.",
  },
  {
    name: "Payoff",
    from: 0.6,
    to: 0.87,
    time: "0:18 – 0:26",
    bg: "#7a8a5e",
    fg: "#201e1d",
    caption: "Bookings doubled in the first two weeks.",
    why: "Deliver on the hook. The before and after lands here, and it is what gets shared and saved.",
  },
  {
    name: "Call to action",
    from: 0.87,
    to: 1,
    time: "0:26 – 0:30",
    bg: "#ffe1d0",
    fg: "#201e1d",
    caption: "Link in bio for a free site audit.",
    why: "One clear, warm ask that points back to your website, so views become leads.",
  },
]

const REELS = [
  { kind: "Reel", title: "Day in the studio", slot: "reel video", cat: "Behind the scenes" },
  { kind: "Short", title: "Before / after redesign", slot: "reel video", cat: "Brand stories" },
  { kind: "TikTok", title: "3 homepage fixes", slot: "reel video", cat: "Tips" },
  { kind: "Reel", title: "Meet the founder", slot: "reel video", cat: "Brand stories" },
  { kind: "Reel", title: "Packing orders ASMR", slot: "reel video", cat: "Behind the scenes" },
  { kind: "Short", title: "Why your site feels slow", slot: "reel video", cat: "Tips" },
  { kind: "TikTok", title: "Wedding week recap", slot: "reel video", cat: "Brand stories" },
  { kind: "Reel", title: "Launch day", slot: "reel video", cat: "Behind the scenes" },
]

const TINTS = [
  ["#ffc6a5", "#ffe1d0"],
  ["#ccdbb2", "#e1eecc"],
  ["#dcd3c4", "#eee7db"],
]
const CATS = ["All", "Brand stories", "Behind the scenes", "Tips"]

export function VideoSocial() {
  const heroRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const [head, setHead] = useState(4)
  const [hover, setHover] = useState(-1)
  const [cat, setCat] = useState("All")
  const [heroProg, setHeroProg] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) {
      setHeroProg(60)
      return
    }
    const t = setInterval(() => setHeroProg((p) => (p + 0.8) % 100), 60)
    return () => clearInterval(t)
  }, [])

  const seek = useCallback((x: number) => {
    const r = trackRef.current?.getBoundingClientRect()
    if (!r) return
    setHead(Math.min(100, Math.max(0, ((x - r.left) / r.width) * 100)))
  }, [])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (dragging.current) seek(e.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [seek])

  const onHeroMove = (e: React.MouseEvent) => {
    const el = heroRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--mx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3))
    el.style.setProperty("--my", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3))
  }
  const onHeroLeave = () => {
    const el = heroRef.current
    if (!el) return
    el.style.setProperty("--mx", "0")
    el.style.setProperty("--my", "0")
  }

  const p = head / 100
  const idx = Math.max(0, SEGS.findIndex((s) => p >= s.from && p <= s.to))
  const clip = SEGS[idx]
  const list = REELS.filter((r) => cat === "All" || r.cat === cat)

  const onTrackDown = (e: ReactPointerEvent) => {
    dragging.current = true
    seek(e.clientX)
  }

  return (
    <div
      style={{
        background: C.bg,
        color: C.ink,
        fontFamily: "var(--font-cardo), Georgia, serif",
        fontSize: 16,
        lineHeight: 1.55,
        overflowX: "clip",
        minHeight: "100vh",
      }}
    >
      {/* nav */}
      <nav
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          right: 16,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "10px 12px 10px 24px",
          background: "rgba(249,244,237,.85)",
          backdropFilter: "blur(14px)",
          borderRadius: 999,
          boxShadow: "0 3px 10px rgba(46,43,37,.12)",
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ ...bebas, fontSize: 22 }}>
          Tiana Horn
        </Link>
        <div style={{ display: "flex", gap: 26, fontWeight: 700, fontSize: 15, flexWrap: "wrap" }}>
          <Link href="/">← Websites</Link>
          <a href="#edit">How I edit</a>
          <a href="#reels">Reels</a>
          <a href="#offers">Offers</a>
        </div>
        <a
          href="#book"
          className="vs-cta"
          style={{
            background: C.ac,
            color: C.ink,
            padding: "10px 20px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          Book a content call
        </a>
      </nav>

      {/* hero */}
      <section
        ref={heroRef}
        onMouseMove={onHeroMove}
        onMouseLeave={onHeroLeave}
        className="vs-hero"
        style={
          {
            "--mx": 0,
            "--my": 0,
            minHeight: "100vh",
            display: "grid",
            gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
            gap: 40,
            alignItems: "center",
            padding: "140px 6vw 80px",
          } as CSSProperties
        }
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 26, maxWidth: 680 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Instagram Reels", "TikTok", "YouTube Shorts", "LinkedIn"].map((chip) => (
              <span
                key={chip}
                style={{
                  background: C.ac2soft,
                  fontWeight: 700,
                  fontSize: 13,
                  padding: "5px 14px",
                  borderRadius: 999,
                }}
              >
                {chip}
              </span>
            ))}
          </div>
          <h1
            style={{
              ...bebas,
              fontSize: "clamp(48px,6.6vw,104px)",
              lineHeight: 0.98,
              letterSpacing: ".005em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Stories that <span style={{ color: C.ac }}>stop</span> the scroll.
          </h1>
          <p style={{ margin: 0, fontSize: 20, color: C.mut, maxWidth: 540, textWrap: "pretty" }}>
            Video editing and social content for brands that want to feel human
            online. Send me the raw footage and I&apos;ll send back posts people
            actually watch to the end.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="#book"
              style={{
                background: C.ink,
                color: C.bg,
                padding: "14px 24px",
                borderRadius: 999,
                fontWeight: 700,
              }}
            >
              Start a content plan
            </a>
            <a
              href="#reels"
              style={{ background: C.sf, padding: "14px 24px", borderRadius: 999, fontWeight: 700 }}
            >
              Watch the reels ↓
            </a>
          </div>
        </div>

        {/* fanned phones */}
        <div className="vs-phones" style={{ position: "relative", height: 600 }}>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 250,
              aspectRatio: "9 / 16",
              margin: "-222px 0 0 -125px",
              borderRadius: 32,
              background: "repeating-linear-gradient(135deg,#ccdbb2 0 12px,#e1eecc 12px 24px)",
              boxShadow: "0 12px 32px rgba(46,43,37,.2)",
              transform:
                "translate(calc(-150px + var(--mx) * -40px),calc(30px + var(--my) * -20px)) rotate(calc(-12deg + var(--mx) * -4deg))",
              transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
              display: "grid",
              placeItems: "center",
              ...mono,
              fontSize: 12,
              color: "#56633f",
            }}
          >
            reel · behind the scenes
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 250,
              aspectRatio: "9 / 16",
              margin: "-222px 0 0 -125px",
              borderRadius: 32,
              background: "repeating-linear-gradient(135deg,#ffc6a5 0 12px,#ffe1d0 12px 24px)",
              boxShadow: "0 12px 32px rgba(46,43,37,.2)",
              transform:
                "translate(calc(150px + var(--mx) * 40px),calc(30px + var(--my) * 20px)) rotate(calc(12deg + var(--mx) * 4deg))",
              transition: "transform .6s cubic-bezier(.2,.8,.2,1)",
              display: "grid",
              placeItems: "center",
              ...mono,
              fontSize: 12,
              color: "#8c491a",
            }}
          >
            reel · product demo
          </div>
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 270,
              aspectRatio: "9 / 16",
              margin: "-240px 0 0 -135px",
              borderRadius: 34,
              background: C.ink,
              padding: 10,
              boxShadow: "0 20px 44px rgba(46,43,37,.3)",
              transform: "translate(calc(var(--mx) * 12px),calc(var(--my) * 12px))",
              transition: "transform .4s cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: 26,
                overflow: "hidden",
              }}
            >
              <Image
                src="/headshot.jpg"
                alt=""
                fill
                sizes="270px"
                style={{
                  objectFit: "cover",
                  filter: "saturate(.6) contrast(.85) brightness(1.1) opacity(.94)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  bottom: 18,
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <div
                  style={{
                    alignSelf: "flex-start",
                    background: C.card,
                    color: C.ink,
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "6px 12px",
                    borderRadius: 12,
                  }}
                >
                  3 things I&apos;d fix on your homepage
                </div>
                <div
                  style={{
                    height: 4,
                    borderRadius: 999,
                    background: "rgba(249,244,237,.4)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${heroProg.toFixed(1)}%`,
                      background: "#f6a06b",
                      transition: "width .1s linear",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* how I edit */}
      <section
        id="edit"
        className="vs-edit"
        style={{
          padding: "100px 6vw",
          background: C.ink,
          color: C.bg,
          borderRadius: 40,
          margin: "0 16px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          scrollMarginTop: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
            <div style={{ fontWeight: 700, color: "#aebf92", fontSize: 15 }}>How I edit</div>
            <h2
              style={{
                ...bebas,
                fontSize: "clamp(36px,4vw,60px)",
                lineHeight: 1.02,
                letterSpacing: ".01em",
                margin: 0,
                textWrap: "balance",
              }}
            >
              Every second has a job. Drag the playhead to see each one.
            </h2>
          </div>
        </div>
        <div
          className="vs-edit-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,300px) minmax(0,1fr)",
            gap: 48,
            alignItems: "center",
          }}
        >
          <div
            style={{
              aspectRatio: "9 / 16",
              borderRadius: 30,
              background: clip.bg,
              color: clip.fg,
              padding: 28,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "background-color .35s",
            }}
          >
            <div style={{ ...mono, fontSize: 13 }}>{clip.time}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ ...bebas, fontSize: 34, lineHeight: 1 }}>{clip.name}</div>
              <div style={{ fontWeight: 700, textWrap: "pretty" }}>&ldquo;{clip.caption}&rdquo;</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ fontSize: 20, lineHeight: 1.5, maxWidth: 560, textWrap: "pretty", opacity: 0.9 }}>
              {clip.why}
            </div>
            <div
              ref={trackRef}
              onPointerDown={onTrackDown}
              style={{
                position: "relative",
                height: 96,
                cursor: "ew-resize",
                touchAction: "none",
                userSelect: "none",
              }}
            >
              <div style={{ position: "absolute", inset: "18px 0 0", display: "flex", gap: 6 }}>
                {SEGS.map((s, i) => (
                  <div
                    key={s.name}
                    style={{
                      flex: Math.round((s.to - s.from) * 100),
                      borderRadius: 16,
                      background: s.bg,
                      color: s.fg,
                      padding: "12px 14px",
                      fontWeight: 700,
                      fontSize: 14,
                      opacity: i === idx ? 1 : 0.45,
                      transition: "opacity .25s",
                    }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: -6,
                  left: `${head}%`,
                  width: 4,
                  marginLeft: -2,
                  background: "#f9f4ed",
                  borderRadius: 999,
                  pointerEvents: "none",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -4,
                    left: "50%",
                    width: 22,
                    height: 22,
                    marginLeft: -11,
                    borderRadius: "50%",
                    background: "#f9f4ed",
                    boxShadow: "0 3px 10px rgba(0,0,0,.4)",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                ...mono,
                fontSize: 13,
                opacity: 0.6,
              }}
            >
              <span>0:00</span>
              <span>0:15</span>
              <span>0:30</span>
            </div>
          </div>
        </div>
      </section>

      {/* reels */}
      <section
        id="reels"
        style={{
          padding: "120px 6vw",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          scrollMarginTop: 90,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 640 }}>
            <div style={{ fontWeight: 700, color: C.ac2, fontSize: 15 }}>Reels</div>
            <h2
              style={{
                ...bebas,
                fontSize: "clamp(36px,4vw,60px)",
                lineHeight: 1.02,
                letterSpacing: ".01em",
                margin: 0,
              }}
            >
              Hover to play.
            </h2>
          </div>
          <div style={{ display: "flex", gap: 6, background: C.sf, padding: 5, borderRadius: 999, flexWrap: "wrap" }}>
            {CATS.map((c) => (
              <button
                key={c}
                onClick={() => {
                  setCat(c)
                  setHover(-1)
                }}
                style={{
                  border: 0,
                  cursor: "pointer",
                  font: "700 14px var(--font-cardo), Georgia, serif",
                  padding: "9px 16px",
                  borderRadius: 999,
                  background: c === cat ? C.card : "transparent",
                  color: C.ink,
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))",
            gap: 20,
          }}
        >
          {list.map((r, i) => {
            const on = i === hover
            const t = TINTS[i % 3]
            return (
              <div
                key={`${r.title}-${i}`}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(-1)}
                style={{
                  position: "relative",
                  aspectRatio: "9 / 16",
                  borderRadius: 28,
                  overflow: "hidden",
                  background: `repeating-linear-gradient(135deg,${t[0]} 0 12px,${t[1]} 12px 24px)`,
                  transform: on ? "translateY(-10px) scale(1.03)" : "none",
                  boxShadow: on
                    ? "0 20px 40px rgba(46,43,37,.25)"
                    : "0 3px 10px rgba(46,43,37,.1)",
                  transition: "transform .35s cubic-bezier(.2,1.2,.4,1), box-shadow .35s",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "grid",
                    placeItems: "center",
                    ...mono,
                    fontSize: 12,
                    color: C.mut,
                  }}
                >
                  {r.slot}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    background: C.card,
                    fontWeight: 700,
                    fontSize: 12,
                    padding: "4px 10px",
                    borderRadius: 999,
                  }}
                >
                  {r.kind}
                </div>
                <div
                  style={{
                    position: "absolute",
                    left: 14,
                    right: 14,
                    bottom: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      background: "rgba(249,244,237,.92)",
                      padding: "8px 12px",
                      borderRadius: 14,
                    }}
                  >
                    {r.title}
                  </div>
                  <div
                    style={{
                      height: 4,
                      borderRadius: 999,
                      background: "rgba(32,30,29,.15)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: on ? "100%" : "0%",
                        background: C.ac,
                        transition: `width ${on ? "6s" : ".3s"} linear`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* offers */}
      <section
        id="offers"
        style={{
          padding: "40px 6vw 120px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
          scrollMarginTop: 90,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 680 }}>
          <div style={{ fontWeight: 700, color: C.ac2, fontSize: 15 }}>Offers</div>
          <h2
            style={{
              ...bebas,
              fontSize: "clamp(36px,4vw,60px)",
              lineHeight: 1.02,
              letterSpacing: ".01em",
              margin: 0,
              textWrap: "balance",
            }}
          >
            Pick how much you want off your plate.
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
            gap: 20,
          }}
        >
          <div className="vs-offer" style={offerCard(C.card)}>
            <div style={{ ...bebas, fontSize: 28 }}>Edit only</div>
            <div style={{ color: C.mut }}>
              You film it, and I turn it into polished short-form edits with
              captions, pacing and hooks.
            </div>
            <div style={offerList(false)}>
              <span>✓ Raw footage to finished reels</span>
              <span>✓ Captions &amp; sound design</span>
              <span>✓ Platform-ready formats</span>
            </div>
          </div>
          <div
            className="vs-offer vs-offer-loved"
            style={{
              ...offerCard(C.ac),
              color: C.ink,
              boxShadow: "0 12px 32px rgba(46,43,37,.2)",
            }}
          >
            <div
              style={{
                alignSelf: "flex-start",
                background: C.ink,
                color: C.bg,
                fontWeight: 700,
                fontSize: 12,
                padding: "4px 12px",
                borderRadius: 999,
              }}
            >
              Most loved
            </div>
            <div style={{ ...bebas, fontSize: 28 }}>Content studio</div>
            <div style={{ fontWeight: 700 }}>
              We plan together, you film with my shot lists, and I edit and
              schedule everything.
            </div>
            <div style={offerList(true)}>
              <span>✓ Monthly content calendar</span>
              <span>✓ Shot lists &amp; scripts</span>
              <span>✓ Editing + scheduling</span>
            </div>
          </div>
          <div className="vs-offer" style={offerCard(C.card)}>
            <div style={{ ...bebas, fontSize: 28 }}>Full channel care</div>
            <div style={{ color: C.mut }}>
              Strategy, editing, posting and community replies, tied into your
              website so followers become clients.
            </div>
            <div style={offerList(false)}>
              <span>✓ Everything in Studio</span>
              <span>✓ Community management</span>
              <span>✓ Monthly insights call</span>
            </div>
          </div>
        </div>
      </section>

      {/* book CTA */}
      <section
        id="book"
        className="vs-book"
        style={{
          margin: "0 16px 16px",
          padding: "100px 6vw",
          borderRadius: 40,
          background: C.ac2,
          color: C.ink,
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1fr)",
          gap: "6vw",
          alignItems: "center",
          scrollMarginTop: 90,
        }}
      >
        <h2
          style={{
            ...bebas,
            fontSize: "clamp(40px,5vw,76px)",
            lineHeight: 1,
            letterSpacing: ".01em",
            margin: 0,
            textWrap: "balance",
          }}
        >
          Got footage sitting in your camera roll?
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "flex-start" }}>
          <p style={{ margin: 0, fontSize: 19, fontWeight: 700, maxWidth: 460 }}>
            Let&apos;s turn it into a month of content. Book a free 20-minute call
            and bring your favorite clip.
          </p>
          <Link
            href="/"
            style={{
              background: C.ink,
              color: C.bg,
              padding: "15px 26px",
              borderRadius: 999,
              fontWeight: 700,
            }}
          >
            Book a content call →
          </Link>
          <div style={{ fontWeight: 700 }}>tiana@favored.digital</div>
        </div>
      </section>
    </div>
  )
}

function offerCard(bg: string): CSSProperties {
  return {
    background: bg,
    borderRadius: 28,
    padding: 32,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    transition: "transform .3s",
  }
}

function offerList(bold: boolean): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    fontWeight: bold ? 700 : 600,
    marginTop: 6,
  }
}
