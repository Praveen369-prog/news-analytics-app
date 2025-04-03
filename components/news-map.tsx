"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Sample news location data
const locationData = [
  { name: "New York", lat: 40.7128, lng: -74.006, count: 42 },
  { name: "London", lat: 51.5074, lng: -0.1278, count: 38 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503, count: 35 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, count: 30 },
  { name: "Berlin", lat: 52.52, lng: 13.405, count: 28 },
  { name: "Beijing", lat: 39.9042, lng: 116.4074, count: 25 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093, count: 22 },
  { name: "Paris", lat: 48.8566, lng: 2.3522, count: 32 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777, count: 20 },
  { name: "Rio de Janeiro", lat: -22.9068, lng: -43.1729, count: 18 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, count: 15 },
]

export function NewsMap() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Draw world map (simplified)
    ctx.fillStyle = "rgba(32, 32, 64, 0.2)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Function to convert lat/lng to x/y coordinates (simplified)
    const latLngToXY = (lat: number, lng: number) => {
      const x = (lng + 180) * (canvas.width / 360)
      const y = (90 - lat) * (canvas.height / 180)
      return { x, y }
    }

    // Draw news hotspots
    locationData.forEach((location) => {
      const { x, y } = latLngToXY(location.lat, location.lng)

      // Draw glow
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20 + location.count / 2)
      gradient.addColorStop(0, "rgba(64, 196, 255, 0.8)")
      gradient.addColorStop(1, "rgba(64, 196, 255, 0)")

      ctx.beginPath()
      ctx.fillStyle = gradient
      ctx.arc(x, y, 20 + location.count / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw center point
      ctx.beginPath()
      ctx.fillStyle = "rgba(64, 196, 255, 0.9)"
      ctx.arc(x, y, 3, 0, Math.PI * 2)
      ctx.fill()
    })

    // Add pulsing effect
    let pulse = 0
    const animate = () => {
      pulse += 0.02

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Redraw background
      ctx.fillStyle = "rgba(32, 32, 64, 0.2)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw grid lines
      ctx.strokeStyle = "rgba(64, 128, 255, 0.2)"
      ctx.lineWidth = 0.5

      // Vertical grid lines
      for (let i = 0; i < canvas.width; i += 30) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, canvas.height)
        ctx.stroke()
      }

      // Horizontal grid lines
      for (let i = 0; i < canvas.height; i += 30) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(canvas.width, i)
        ctx.stroke()
      }

      // Draw pulsing hotspots
      locationData.forEach((location) => {
        const { x, y } = latLngToXY(location.lat, location.lng)
        const pulseSize = Math.sin(pulse) * 5

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20 + location.count / 2 + pulseSize)
        gradient.addColorStop(0, "rgba(64, 196, 255, 0.8)")
        gradient.addColorStop(1, "rgba(64, 196, 255, 0)")

        ctx.beginPath()
        ctx.fillStyle = gradient
        ctx.arc(x, y, 20 + location.count / 2 + pulseSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw center point
        ctx.beginPath()
        ctx.fillStyle = "rgba(64, 196, 255, 0.9)"
        ctx.arc(x, y, 3, 0, Math.PI * 2)
        ctx.fill()

        // Draw location name
        ctx.font = "10px Inter, sans-serif"
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.textAlign = "center"
        ctx.fillText(location.name, x, y - 10)
        ctx.fillText(`${location.count} stories`, x, y + 15)
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
    <Card className="col-span-full xl:col-span-2">
      <CardHeader>
        <CardTitle>Global News Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <canvas ref={canvasRef} className="h-full w-full" style={{ background: "rgba(13, 17, 23, 0.8)" }} />
        </div>
      </CardContent>
    </Card>
  )
}

