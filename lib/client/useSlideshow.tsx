'use client'

import { useEffect, useState } from 'react'

export const useSlideshow = (length: number, durationMs: number) => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!length) return undefined

    let frameId = 0
    let start = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start
      const ratio = Math.min(elapsed / durationMs, 1)
      setProgress(ratio)

      if (ratio >= 1) {
        start = now
        setProgress(0)
        setSlideNumber((prev) => (prev + 1) % length)
      }

      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [length, durationMs])

  return { slideNumber, progress }
}
