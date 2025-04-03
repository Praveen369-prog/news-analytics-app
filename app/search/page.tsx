"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, SearchIcon, X, Sparkles, Loader2, SlidersHorizontal, Tag, MapPin, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Command, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

// Sample data for suggestions
const suggestions = {
  news: [
    "Climate Policy",
    "Election Reform",
    "Economic Summit",
    "Healthcare Initiative",
    "AI Breakthrough",
    "Renewable Energy",
  ],
  persons: ["John Smith", "Sarah Johnson", "Michael Brown", "Emily Chen", "David Wilson", "Dr. James Wilson"],
  organizations: [
    "Green Party",
    "Progressive Party",
    "Conservative Alliance",
    "Tech Alliance",
    "Community Alliance",
    "Global Health Institute",
  ],
  locations: ["Washington DC", "New York", "London", "Berlin", "Tokyo", "Beijing", "San Francisco", "Geneva", "Boston"],
}

// Sample news categories
const newsCategories = [
  { value: "all", label: "All Categories" },
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
]

// Sample news types
const newsTypes = [
  { value: "all", label: "All Types" },
  { value: "article", label: "Article" },
  { value: "breaking", label: "Breaking News" },
  { value: "feature", label: "Feature Story" },
  { value: "opinion", label: "Opinion/Editorial" },
  { value: "interview", label: "Interview" },
  { value: "investigation", label: "Investigation" },
]

// Sample news data
const newsData = [
  {
    id: 1,
    title: "AI Breakthrough Enables Real-Time Language Translation in AR Glasses",
    category: "technology",
    type: "feature",
    date: new Date(2023, 3, 15),
    snippet:
      "Researchers at TechFusion Labs have developed a groundbreaking AI model that enables real-time language translation in augmented reality glasses. The technology, which processes over 100 languages with 98% accuracy, could revolutionize global communication and travel.",
    persons: ["Dr. Sophia Chen"],
    organizations: ["TechFusion Labs"],
    location: "San Francisco",
    tags: ["AI", "Augmented Reality", "Translation", "Technology"],
    relevanceScore: 9,
    isBreaking: false,
    isExclusive: true,
  },
  {
    id: 2,
    title: "New Study Reveals Promising Treatment for Chronic Fatigue Syndrome",
    category: "health",
    type: "article",
    date: new Date(2023, 3, 14),
    snippet:
      "A groundbreaking clinical trial has shown remarkable results in treating Chronic Fatigue Syndrome (CFS), a condition that affects millions worldwide. The study, published in the Journal of Medical Innovations, demonstrates that a combination therapy approach reduced symptoms in 72% of participants.",
    persons: ["Dr. Marcus Johnson"],
    organizations: ["Global Health Institute", "Journal of Medical Innovations"],
    location: "Boston",
    tags: ["Chronic Fatigue Syndrome", "Medical Research", "Clinical Trial", "Healthcare"],
    relevanceScore: 8,
    isBreaking: false,
    isExclusive: false,
  },
  {
    id: 3,
    title: "Global Climate Summit Reaches Historic Agreement on Emissions Reduction",
    category: "environment",
    type: "breaking",
    date: new Date(2023, 3, 13),
    snippet:
      "In a landmark decision, representatives from 195 countries have reached a binding agreement to reduce global carbon emissions by 60% by 2035. The unprecedented deal includes financial commitments to support developing nations in their transition to renewable energy sources.",
    persons: ["John Smith", "Maria Rodriguez"],
    organizations: ["United Nations", "Green Alliance"],
    location: "Geneva",
    tags: ["Climate Change", "Global Summit", "Emissions", "International Agreement"],
    relevanceScore: 10,
    isBreaking: true,
    isExclusive: false,
  },
  {
    id: 4,
    title: "Community-Led Urban Farming Initiative Transforms City Neighborhoods",
    category: "environment",
    type: "feature",
    date: new Date(2023, 3, 12),
    snippet:
      "A grassroots urban farming project has successfully transformed vacant lots into productive community gardens across five city neighborhoods. The initiative has not only increased access to fresh produce but has also strengthened community bonds and reduced urban heat island effects.",
    persons: ["Emily Chen", "Marcus Johnson"],
    organizations: ["Community Alliance", "Urban Green Spaces Coalition"],
    location: "Chicago",
    tags: ["Urban Farming", "Community Development", "Sustainability", "Food Security"],
    relevanceScore: 7,
    isBreaking: false,
    isExclusive: false,
  },
  {
    id: 5,
    title: "Quantum Computing Breakthrough Could Revolutionize Drug Discovery",
    category: "science",
    type: "article",
    date: new Date(2023, 3, 10),
    snippet:
      "Scientists have achieved a significant breakthrough in quantum computing that could dramatically accelerate the drug discovery process. The new quantum algorithm can simulate molecular interactions with unprecedented accuracy, potentially reducing the time to develop new medications from years to months.",
    persons: ["Dr. James Wilson", "Dr. Aiden Patel"],
    organizations: ["Quantum Research Institute", "PharmaTech Innovations"],
    location: "Cambridge",
    tags: ["Quantum Computing", "Drug Discovery", "Scientific Breakthrough", "Medical Research"],
    relevanceScore: 9,
    isBreaking: false,
    isExclusive: true,
  },
  {
    id: 6,
    title: "Major Economic Reform Package Passes Legislative Vote",
    category: "politics",
    type: "breaking",
    date: new Date(2023, 3, 8),
    snippet:
      "After months of negotiation, lawmakers have passed a comprehensive economic reform package aimed at reducing inflation and stimulating job growth. The legislation includes tax reforms, infrastructure investments, and new regulations for the financial sector.",
    persons: ["Sarah Johnson", "David Wilson"],
    organizations: ["Treasury Department", "Economic Policy Institute"],
    location: "Washington DC",
    tags: ["Economic Reform", "Legislation", "Inflation", "Jobs"],
    relevanceScore: 8,
    isBreaking: true,
    isExclusive: false,
  },
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState(newsData)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  })
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedPerson, setSelectedPerson] = useState<string>("")
  const [selectedOrganization, setSelectedOrganization] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState<string>("")
  const [relevanceRange, setRelevanceRange] = useState<[number, number]>([1, 10])
  const [showBreakingOnly, setShowBreakingOnly] = useState(false)
  const [showExclusiveOnly, setShowExclusiveOnly] = useState(false)
  const [isGeneratingInsights, setIsGeneratingInsights] = useState(false)
  const [insights, setInsights] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    setIsLoading(true)

    // Simulate API delay
    setTimeout(() => {
      // Filter news based on search criteria
      const filtered = newsData.filter((news) => {
        // Search query filter
        const matchesQuery =
          searchQuery === "" ||
          news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.snippet.toLowerCase().includes(searchQuery.toLowerCase())

        // Category filter
        const matchesCategory = selectedCategory === "all" || news.category === selectedCategory

        // Type filter
        const matchesType = selectedType === "all" || news.type === selectedType

        // Person filter
        const matchesPerson =
          selectedPerson === "" ||
          news.persons.some((person) => person.toLowerCase().includes(selectedPerson.toLowerCase()))

        // Organization filter
        const matchesOrganization =
          selectedOrganization === "" ||
          news.organizations.some((org) => org.toLowerCase().includes(selectedOrganization.toLowerCase()))

        // Location filter
        const matchesLocation =
          selectedLocation === "" || news.location.toLowerCase().includes(selectedLocation.toLowerCase())

        // Tags filter
        const matchesTags =
          selectedTags.length === 0 ||
          selectedTags.every((tag) => news.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase())))

        // Date range filter
        const matchesDateRange =
          (!dateRange.from || news.date >= dateRange.from) && (!dateRange.to || news.date <= dateRange.to)

        // Relevance score filter
        const matchesRelevance = news.relevanceScore >= relevanceRange[0] && news.relevanceScore <= relevanceRange[1]

        // Breaking news filter
        const matchesBreaking = !showBreakingOnly || news.isBreaking

        // Exclusive story filter
        const matchesExclusive = !showExclusiveOnly || news.isExclusive

        return (
          matchesQuery &&
          matchesCategory &&
          matchesType &&
          matchesPerson &&
          matchesOrganization &&
          matchesLocation &&
          matchesTags &&
          matchesDateRange &&
          matchesRelevance &&
          matchesBreaking &&
          matchesExclusive
        )
      })

      setSearchResults(filtered)
      setIsLoading(false)

      // Clear insights when search results change
      setInsights(null)
    }, 800)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setDateRange({ from: undefined, to: undefined })
    setSelectedCategory("all")
    setSelectedType("all")
    setSelectedPerson("")
    setSelectedOrganization("")
    setSelectedLocation("")
    setSelectedTags([])
    setRelevanceRange([1, 10])
    setShowBreakingOnly(false)
    setShowExclusiveOnly(false)
    setSearchResults(newsData)
    setInsights(null)
  }

  const addTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput])
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter((t) => t !== tag))
  }

  const generateInsights = () => {
    if (searchResults.length === 0) return

    setIsGeneratingInsights(true)

    // Simulate AI analysis
    setTimeout(() => {
      // Generate insights based on search results
      const topCategories = [...new Set(searchResults.map((item) => item.category))]
        .slice(0, 3)
        .map((cat) => newsCategories.find((c) => c.value === cat)?.label || cat)

      const topPersons = [...new Set(searchResults.flatMap((item) => item.persons))].slice(0, 3)

      const topOrgs = [...new Set(searchResults.flatMap((item) => item.organizations))].slice(0, 3)

      const avgRelevance = searchResults.reduce((sum, item) => sum + item.relevanceScore, 0) / searchResults.length

      const breakingCount = searchResults.filter((item) => item.isBreaking).length
      const exclusiveCount = searchResults.filter((item) => item.isExclusive).length

      const insightText = `
        ## AI-Generated Insights

        Based on your search criteria, I've analyzed ${searchResults.length} news articles and found some interesting patterns:

        ${topCategories.length > 0 ? `- The dominant categories are ${topCategories.join(", ")}` : ""}
        ${topPersons.length > 0 ? `- Key persons mentioned include ${topPersons.join(", ")}` : ""}
        ${topOrgs.length > 0 ? `- Most active organizations are ${topOrgs.join(", ")}` : ""}
        - The average relevance score is ${avgRelevance.toFixed(1)} out of 10
        ${breakingCount > 0 ? `- ${breakingCount} breaking news articles found` : ""}
        ${exclusiveCount > 0 ? `- ${exclusiveCount} exclusive stories identified` : ""}

        **Recommendation:** Focus on the intersection of ${topCategories[0] || "technology"} and ${topCategories[1] || "health"} for the most impactful stories.
      `

      setInsights(insightText)
      setIsGeneratingInsights(false)
    }, 2000)
  }

  // Run search when filters change
  useEffect(() => {
    handleSearch()
  }, [selectedCategory, selectedType, dateRange, showBreakingOnly, showExclusiveOnly])

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Discover & Filter News</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
            {viewMode === "grid" ? "List View" : "Grid View"}
          </Button>
          <Button
            onClick={generateInsights}
            disabled={isGeneratingInsights || searchResults.length === 0}
            size="sm"
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isGeneratingInsights ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Insights
              </>
            )}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Advanced Search</CardTitle>
          <CardDescription>Search and filter news articles with AI-powered suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="space-y-4">
            <TabsList>
              <TabsTrigger value="basic">Basic Search</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Filters</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <div className="relative">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search news articles..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSuggestions(e.target.value.length > 0)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                        setShowSuggestions(false)
                      }
                    }}
                    onFocus={() => setShowSuggestions(searchQuery.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                </div>

                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg">
                    <Command>
                      <CommandList>
                        <CommandGroup heading="News Topics">
                          {suggestions.news
                            .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item) => (
                              <CommandItem
                                key={item}
                                onSelect={() => {
                                  setSearchQuery(item)
                                  setShowSuggestions(false)
                                  handleSearch()
                                }}
                              >
                                {item}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Persons">
                          {suggestions.persons
                            .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item) => (
                              <CommandItem
                                key={item}
                                onSelect={() => {
                                  setSelectedPerson(item)
                                  setShowSuggestions(false)
                                  handleSearch()
                                }}
                              >
                                <Users className="mr-2 h-4 w-4" />
                                {item}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                        <CommandGroup heading="Organizations">
                          {suggestions.organizations
                            .filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map((item) => (
                              <CommandItem
                                key={item}
                                onSelect={() => {
                                  setSelectedOrganization(item)
                                  setShowSuggestions(false)
                                  handleSearch()
                                }}
                              >
                                {item}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsCategories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">News Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      {newsTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Select date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="range" selected={dateRange} onSelect={setDateRange} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quick Filters</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="breaking"
                        checked={showBreakingOnly}
                        onCheckedChange={(checked) => setShowBreakingOnly(checked as boolean)}
                      />
                      <label htmlFor="breaking" className="text-sm">
                        Breaking News Only
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="exclusive"
                        checked={showExclusiveOnly}
                        onCheckedChange={(checked) => setShowExclusiveOnly(checked as boolean)}
                      />
                      <label htmlFor="exclusive" className="text-sm">
                        Exclusive Stories Only
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch} disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="mr-2 h-4 w-4" />
                      Search
                    </>
                  )}
                </Button>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Person</label>
                    <div className="relative">
                      <Users className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Filter by person name"
                        className="pl-8"
                        value={selectedPerson}
                        onChange={(e) => setSelectedPerson(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch()
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Organization</label>
                    <Input
                      placeholder="Filter by organization name"
                      value={selectedOrganization}
                      onChange={(e) => setSelectedOrganization(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSearch()
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Filter by location"
                        className="pl-8"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSearch()
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Add tag to filter"
                          className="pl-8"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addTag()
                            }
                          }}
                        />
                      </div>
                      <Button type="button" size="sm" onClick={addTag}>
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          #{tag}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => removeTag(tag)}
                          >
                            <span className="sr-only">Remove</span>
                            <span aria-hidden="true">×</span>
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Relevance Score</label>
                      <span className="text-sm text-muted-foreground">
                        {relevanceRange[0]} - {relevanceRange[1]}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[1, 10]}
                      min={1}
                      max={10}
                      step={1}
                      value={relevanceRange}
                      onValueChange={(value) => setRelevanceRange(value as [number, number])}
                    />
                  </div>

                  <Button onClick={handleSearch} className="w-full mt-6" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Applying Filters...
                      </>
                    ) : (
                      <>
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        Apply Advanced Filters
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Active filters */}
          {(selectedCategory !== "all" ||
            selectedType !== "all" ||
            selectedPerson ||
            selectedOrganization ||
            selectedLocation ||
            selectedTags.length > 0 ||
            dateRange.from ||
            dateRange.to ||
            showBreakingOnly ||
            showExclusiveOnly) && (
            <div className="flex flex-wrap gap-2 pt-4 border-t mt-4">
              <div className="text-sm text-muted-foreground mr-2">Active filters:</div>
              {selectedCategory !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Category: {newsCategories.find((c) => c.value === selectedCategory)?.label || selectedCategory}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedCategory("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedType !== "all" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Type: {newsTypes.find((t) => t.value === selectedType)?.label || selectedType}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedType("all")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedPerson && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Person: {selectedPerson}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedPerson("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedOrganization && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Organization: {selectedOrganization}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedOrganization("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedLocation && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Location: {selectedLocation}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setSelectedLocation("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  Tag: {tag}
                  <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeTag(tag)}>
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
              {(dateRange.from || dateRange.to) && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Date: {dateRange.from ? format(dateRange.from, "LLL dd, y") : "Any"} -{" "}
                  {dateRange.to ? format(dateRange.to, "LLL dd, y") : "Any"}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setDateRange({ from: undefined, to: undefined })}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {showBreakingOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Breaking News Only
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setShowBreakingOnly(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {showExclusiveOnly && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Exclusive Stories Only
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => setShowExclusiveOnly(false)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {insights && (
        <Card className="bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border-indigo-200 dark:border-indigo-800">
          <CardHeader className="pb-2">
            <div className="flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
              <CardTitle>AI Insights</CardTitle>
            </div>
            <CardDescription>AI-generated analysis of your search results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {insights.split("\n\n").map((paragraph, i) => {
                if (paragraph.startsWith("##")) {
                  return (
                    <h3 key={i} className="text-lg font-bold mt-0">
                      {paragraph.replace("##", "").trim()}
                    </h3>
                  )
                } else if (paragraph.startsWith("-")) {
                  return (
                    <ul key={i} className="my-2 pl-5 list-disc">
                      {paragraph.split("\n").map((item, j) => (
                        <li key={j}>{item.replace("-", "").trim()}</li>
                      ))}
                    </ul>
                  )
                } else if (paragraph.startsWith("**")) {
                  return (
                    <p key={i} className="font-bold">
                      {paragraph.replace(/\*\*/g, "")}
                    </p>
                  )
                } else {
                  return <p key={i}>{paragraph}</p>
                }
              })}
            </div>
          </CardContent>
        </Card>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Search Results ({searchResults.length})</h3>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Sort by date (newest first)
                const sorted = [...searchResults].sort((a, b) => b.date.getTime() - a.date.getTime())
                setSearchResults(sorted)
              }}
            >
              Sort by Date
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Sort by relevance (highest first)
                const sorted = [...searchResults].sort((a, b) => b.relevanceScore - a.relevanceScore)
                setSearchResults(sorted)
              }}
            >
              Sort by Relevance
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : searchResults.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-[200px]">
              <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">
                Clear All Filters
              </Button>
            </CardContent>
          </Card>
        ) : viewMode === "grid" ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((news) => (
              <Card key={news.id} className="overflow-hidden transition-all hover:bg-accent/50 hover:shadow-md">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {newsCategories.find((c) => c.value === news.category)?.label || news.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {newsTypes.find((t) => t.value === news.type)?.label || news.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{format(news.date, "PPP")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {news.isBreaking && (
                        <Badge variant="destructive" className="text-xs">
                          Breaking
                        </Badge>
                      )}
                      {news.isExclusive && (
                        <Badge variant="secondary" className="text-xs">
                          Exclusive
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold line-clamp-2">{news.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">{news.snippet}</p>

                    <div className="flex flex-wrap gap-1 pt-2">
                      {news.tags.slice(0, 3).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {news.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{news.tags.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={news.persons[0] || "Author"} />
                          <AvatarFallback>
                            {news.persons[0]
                              ?.split(" ")
                              .map((n) => n[0])
                              .join("") || "AU"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="text-sm">
                          <p className="font-medium line-clamp-1">{news.persons[0] || "Unknown Author"}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {news.organizations[0] || "Independent"}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {news.location}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 border-t flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-xs text-muted-foreground">Relevance: </span>
                    <div className="w-24 bg-secondary h-1.5 rounded-full ml-2">
                      <div
                        className="bg-primary h-1.5 rounded-full"
                        style={{ width: `${news.relevanceScore * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {searchResults.map((news) => (
              <Card key={news.id} className="overflow-hidden transition-all hover:bg-accent/50">
                <CardContent className="p-4">
                  <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {newsCategories.find((c) => c.value === news.category)?.label || news.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {newsTypes.find((t) => t.value === news.type)?.label || news.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{format(news.date, "PPP")}</span>
                        {news.isBreaking && (
                          <Badge variant="destructive" className="text-xs">
                            Breaking
                          </Badge>
                        )}
                        {news.isExclusive && (
                          <Badge variant="secondary" className="text-xs">
                            Exclusive
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-lg">{news.title}</h3>
                      <p className="text-sm text-muted-foreground">{news.snippet}</p>

                      <div className="flex flex-wrap gap-1 pt-1">
                        {news.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{news.persons.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{news.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Relevance:</span>
                        <Badge variant={news.relevanceScore >= 8 ? "default" : "outline"}>
                          {news.relevanceScore}/10
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm" className="mt-4">
                        Read Full Article
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

