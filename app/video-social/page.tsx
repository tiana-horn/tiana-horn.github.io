import type { Metadata } from "next"
import { VideoSocial } from "@/components/video-social"

export const metadata: Metadata = {
  title: "Video & Social — Tiana Horn",
  description:
    "Short-form video editing and social content that stops the scroll. Send the raw footage, get back reels people watch to the end.",
}

export default function VideoSocialPage() {
  return <VideoSocial />
}
