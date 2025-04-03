"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample topics with weights
const topics = [
  { text: "AI", weight: 25 },
  { text: "Climate", weight: 18 },
  { text: "Politics", weight: 22 },
  { text: "Health", weight: 20 },
  { text: "Technology", weight: 24 },
  { text: "Economy", weight: 19 },
  { text: "Sports", weight: 16 },
  { text: "Entertainment", weight: 15 },
  { text: "Science", weight: 17 },
  { text: "Education", weight: 14 },
  { text: "Security", weight: 13 },
  { text: "Innovation", weight: 21 },
  { text: "Space", weight: 12 },
  { text: "Environment", weight: 18 },
  { text: "Finance", weight: 16 },
  { text: "Medicine", weight: 15 },
  { text: "Energy", weight: 14 },
  { text: "Quantum", weight: 11 },
  { text: "Robotics", weight: 13 },
  { text: "Blockchain", weight: 12 },
]

export function TopicCloud() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Position topics randomly but avoid overlaps
    const placedTopics: Array<{
      text: string
      weight: number
      x: number
      y: number
      width: number
      height: number
      color: string
      velocity: { x: number; y: number }
    }> = []

    // Generate random color in blue/cyan spectrum
    const getRandomColor = () => {
      const h = Math.floor(180 + Math.random() * 60) // Blue to cyan hue
      const s = Math.floor(70 + Math.random() * 30) // High saturation
      const l = Math.floor(50 + Math.random() * 30) // Medium to high lightness
      return `hsl(${h}, ${s}%, ${l}%)`
    }

    // Initialize topics with positions and velocities
    topics.forEach((topic) => {
      const fontSize = 10 + topic.weight
      ctx.font = `${fontSize}px Inter, sans-serif`
      const textMetrics = ctx.measureText(topic.text)

      const width = textMetrics.width + 20
      const height = fontSize + 10

      // Random position
      const x = Math.random() * (canvas.width - width)
      const y = Math.random() * (canvas.height - height)

      // Random velocity
      const velocity = {
        x: (Math.random() - 0.5) * 0.5,
        y: (Math.random() - 0.5) * 0.5,
      }

      placedTopics.push({
        text: topic.text,
        weight: topic.weight,
        x,
        y,
        width,
        height,
        color: getRandomColor(),
        velocity,
      })
    })

    // Animation loop
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background with grid
      ctx.fillStyle = "rgba(13, 17, 23, 0.8)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = "rgba(64, 128, 255, 0.1)"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let i = 0; i < canvas.width; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let i = 0; i < canvas.height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Update and draw topics
      placedTopics.forEach((topic) => {
        // Update position
        topic.x += topic.velocity.x
        topic.y += topic.velocity.y

        // Bounce off walls
        if (topic.x <= 0 || topic.x + topic.width >= canvas.width) {
          topic.velocity.x *= -1
        }

        if (topic.y <= 0 || topic.y + topic.height >= canvas.height) {
          topic.velocity.y *= -1
        }

        // Draw topic
        const fontSize = 10 + topic.weight
        ctx.font = `${fontSize}px Inter, sans-serif`

        // Draw glow
        ctx.shadowColor = topic.color
        ctx.shadowBlur = 10

        // Draw text
        ctx.fillStyle = topic.color
        ctx.fillText(topic.text, topic.x + 10, topic.y + fontSize)

        // Reset shadow
        ctx.shadowBlur = 0
      })

      requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Card className="col-span-full md:col-span-2">
      <CardHeader>
        <CardTitle>Trending Topics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </CardContent>
    </Card>
  )
}

