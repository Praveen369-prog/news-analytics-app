"use client"

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    date: "Jan 1",
    political: 24,
    organization: 18,
    public: 12,
  },
  {
    date: "Jan 5",
    political: 30,
    organization: 20,
    public: 15,
  },
  {
    date: "Jan 10",
    political: 28,
    organization: 22,
    public: 18,
  },
  {
    date: "Jan 15",
    political: 32,
    organization: 24,
    public: 20,
  },
  {
    date: "Jan 20",
    political: 36,
    organization: 28,
    public: 24,
  },
  {
    date: "Jan 25",
    political: 40,
    organization: 30,
    public: 28,
  },
  {
    date: "Jan 30",
    political: 38,
    organization: 32,
    public: 30,
  },
]

export function NewsChart() {
  return (
    <ChartContainer
      config={{
        political: {
          label: "Political",
          color: "hsl(var(--chart-1))",
        },
        organization: {
          label: "Organization",
          color: "hsl(var(--chart-2))",
        },
        public: {
          label: "Public",
          color: "hsl(var(--chart-3))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="political"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-political)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-political)",
              opacity: 0.7,
            }}
          />
          <Line
            type="monotone"
            dataKey="organization"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-organization)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-organization)",
              opacity: 0.7,
            }}
          />
          <Line
            type="monotone"
            dataKey="public"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-public)", opacity: 0.8 },
            }}
            style={{
              stroke: "var(--color-public)",
              opacity: 0.7,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

