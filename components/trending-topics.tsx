"use client"

import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const trendingTopics = [
  {
    id: 1,
    topic: "Election Reform",
    category: "Political",
    percentage: 85,
  },
  {
    id: 2,
    topic: "Climate Policy",
    category: "Political",
    percentage: 72,
  },
  {
    id: 3,
    topic: "Economic Summit",
    category: "Organization",
    percentage: 68,
  },
  {
    id: 4,
    topic: "Healthcare Initiative",
    category: "Public",
    percentage: 65,
  },
  {
    id: 5,
    topic: "Tech Regulation",
    category: "Organization",
    percentage: 60,
  },
]

export function TrendingTopics() {
  return (
    <div className="space-y-4">
      {trendingTopics.map((topic) => (
        <div key={topic.id} className="flex flex-col space-y-1">
          <div className="flex justify-between">
            <span className="text-sm font-medium">{topic.topic}</span>
            <Badge variant="outline" className="text-xs">
              {topic.category}
            </Badge>
          </div>
          <Progress value={topic.percentage} className="h-2" />
          <span className="text-xs text-muted-foreground text-right">{topic.percentage}% engagement</span>
        </div>
      ))}
    </div>
  )
}

