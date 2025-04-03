"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatDistanceToNow } from "date-fns"

const recentNews = [
  {
    id: 1,
    title: "New Climate Policy Announced by Government",
    category: "Political",
    date: new Date(2023, 3, 15),
    snippet: "The government has announced a new climate policy aimed at reducing carbon emissions by 50% by 2030.",
    leader: "John Smith",
    party: "Green Party",
  },
  {
    id: 2,
    title: "Tech Giants Announce Collaboration on AI Ethics",
    category: "Organization",
    date: new Date(2023, 3, 14),
    snippet:
      "Major tech companies have formed a coalition to establish ethical guidelines for artificial intelligence development.",
    leader: "Sarah Johnson",
    party: "Tech Alliance",
  },
  {
    id: 3,
    title: "Healthcare Reform Bill Passes First Reading",
    category: "Political",
    date: new Date(2023, 3, 13),
    snippet:
      "The healthcare reform bill has passed its first reading in parliament with strong support from both sides.",
    leader: "Michael Brown",
    party: "Progressive Party",
  },
  {
    id: 4,
    title: "Community Launches Initiative for Urban Green Spaces",
    category: "Public",
    date: new Date(2023, 3, 12),
    snippet: "Local community groups have launched a new initiative to increase urban green spaces in the city center.",
    leader: "Emily Chen",
    party: "Community Alliance",
  },
]

export function RecentNews() {
  return (
    <div className="space-y-4">
      {recentNews.map((news) => (
        <Card key={news.id} className="overflow-hidden transition-all hover:bg-accent/50">
          <CardContent className="p-4">
            <div className="grid gap-2 md:grid-cols-[1fr_auto]">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {news.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(news.date, { addSuffix: true })}
                  </span>
                </div>
                <h3 className="font-semibold">{news.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{news.snippet}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Leader: {news.leader}</span>
                  <span>•</span>
                  <span>Party: {news.party}</span>
                </div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={news.leader} />
                  <AvatarFallback>
                    {news.leader
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

