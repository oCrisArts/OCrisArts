import { useEffect, useRef, type PropsWithChildren } from "react"

type ScaledArtifactProps = PropsWithChildren<{
  className?: string
  label: string
}>

function observeViewport(viewport: HTMLElement) {
  const content = viewport.firstElementChild as HTMLElement | null
  if (
    !content ||
    content.matches("img, video, iframe") ||
    viewport.matches(".artifact-carousel")
  )
    return () => {}

  let frame = 0
  let measuring = false

  const measure = () => {
    cancelAnimationFrame(frame)
    frame = requestAnimationFrame(() => {
      if (measuring) return
      measuring = true

      const availableWidth = viewport.clientWidth
      content.style.removeProperty("transform")
      content.style.removeProperty("transform-origin")
      content.style.removeProperty("width")
      viewport.style.removeProperty("height")

      const bounds = content.getBoundingClientRect()
      const originalWidth = Math.max(content.scrollWidth, bounds.width)
      const originalHeight = Math.max(content.scrollHeight, bounds.height)
      const scale =
        originalWidth > 0 ? Math.min(1, availableWidth / originalWidth) : 1

      if (scale < 1) {
        content.style.width = `${originalWidth}px`
        content.style.transformOrigin = "top left"
        content.style.transform = `scale(${scale})`
        viewport.style.height = `${originalHeight * scale}px`
      }

      measuring = false
    })
  }

  const observer = new ResizeObserver(measure)
  const mutationObserver = new MutationObserver(measure)
  observer.observe(viewport)
  mutationObserver.observe(content, {
    childList: true,
    subtree: true,
    characterData: true,
  })
  content.querySelectorAll("img, video").forEach((media) => {
    media.addEventListener("load", measure)
    media.addEventListener("loadedmetadata", measure)
  })
  document.fonts?.ready.then(measure)
  measure()

  return () => {
    cancelAnimationFrame(frame)
    observer.disconnect()
    mutationObserver.disconnect()
    content.querySelectorAll("img, video").forEach((media) => {
      media.removeEventListener("load", measure)
      media.removeEventListener("loadedmetadata", measure)
    })
    content.style.removeProperty("transform")
    content.style.removeProperty("transform-origin")
    content.style.removeProperty("width")
    viewport.style.removeProperty("height")
  }
}

export function observeScaledArtifacts(root: HTMLElement) {
  const cleanups = Array.from(
    root.querySelectorAll<HTMLElement>(".artifact-viewport"),
  ).map(observeViewport)
  return () => cleanups.forEach((cleanup) => cleanup())
}

export default function ScaledArtifact({
  children,
  className = "",
  label,
}: ScaledArtifactProps) {
  const viewportRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!viewportRef.current) return
    return observeViewport(viewportRef.current)
  }, [])

  return (
    <figure
      ref={viewportRef}
      className={`artifact-viewport ${className}`}
      tabIndex={0}
      role="region"
      aria-label={label}
    >
      {children}
    </figure>
  )
}
