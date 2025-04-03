"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon, Loader2, Sparkles, ImageIcon, MapPin, Tag, Link2, Mic, Video, Paperclip } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

const newsCategories = [
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
  { value: "technology", label: "Technology" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sports", label: "Sports" },
  { value: "environment", label: "Environment" },
  { value: "education", label: "Education" },
  { value: "crime", label: "Crime" },
  { value: "human_interest", label: "Human Interest" },
  { value: "world", label: "World" },
  { value: "lifestyle", label: "Lifestyle" },
]

const newsTypes = [
  { value: "article", label: "Article" },
  { value: "breaking", label: "Breaking News" },
  { value: "feature", label: "Feature Story" },
  { value: "opinion", label: "Opinion/Editorial" },
  { value: "interview", label: "Interview" },
  { value: "investigation", label: "Investigation" },
  { value: "event", label: "Event Coverage" },
  { value: "analysis", label: "Analysis" },
  { value: "review", label: "Review" },
]

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  subtitle: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
  newsType: z.string({
    required_error: "Please select a news type.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  persons: z.array(z.string()).optional(),
  organizations: z.array(z.string()).optional(),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  content: z.string().min(20, {
    message: "Content must be at least 20 characters.",
  }),
  tags: z.array(z.string()).optional(),
  sources: z.array(z.string()).optional(),
  hasMedia: z.boolean().default(false),
  mediaUrls: z.array(z.string()).optional(),
  isBreaking: z.boolean().default(false),
  isExclusive: z.boolean().default(false),
  relevanceScore: z.number().min(1).max(10).default(5),
})

export default function UploadPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTab, setSelectedTab] = useState("basic")
  const [personInput, setPersonInput] = useState("")
  const [persons, setPersons] = useState<string[]>([])
  const [organizationInput, setOrganizationInput] = useState("")
  const [organizations, setOrganizations] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [sourceInput, setSourceInput] = useState("")
  const [sources, setSources] = useState<string[]>([])
  const [mediaUrls, setMediaUrls] = useState<string[]>([])
  const [mediaInput, setMediaInput] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      category: "",
      newsType: "",
      persons: [],
      organizations: [],
      location: "",
      content: "",
      tags: [],
      sources: [],
      hasMedia: false,
      mediaUrls: [],
      isBreaking: false,
      isExclusive: false,
      relevanceScore: 5,
    },
  })

  const formValues = form.watch()

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    
    // Update arrays from state
    values.persons = persons
    values.organizations = organizations
    values.tags = tags
    values.sources = sources
    values.mediaUrls = mediaUrls
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "News article submitted",
        description: "Your news article has been successfully published.",
      })
      form.reset()
      setShowPreview(false)
      setPersons([])
      setOrganizations([])
      setTags([])
      setSources([])
      setMediaUrls([])
    }, 1500)
  }

  const generateWithAI = () => {
    setIsGenerating(true)
    
    // Simulate AI generation
    setTimeout(() => {
      const category = form.getValues("category")
      const newsType = form.getValues("newsType")
      
      // Generate content based on selected category and type
      let generatedTitle = ""
      let generatedContent = ""
      
      switch(category) {
        case "technology":
          generatedTitle = "AI Breakthrough Enables Real-Time Language Translation in AR Glasses"
          generatedContent = "Researchers at TechFusion Labs have developed a groundbreaking AI model that enables real-time language translation in augmented reality glasses. The technology, which processes over 100 languages with 98% accuracy, could revolutionize global communication and travel.\n\nThe AR glasses, weighing just 45 grams, can translate spoken language, text, and even gestures, providing both audio and visual translations to the wearer. Early tests show the system works effectively even in noisy environments and with regional accents.\n\n\"This represents a quantum leap in breaking down language barriers,\" said Dr. Sophia Chen, lead researcher on the project. \"We're essentially creating a world where language differences no longer impede human connection and collaboration.\"\n\nThe technology is expected to be commercially available within 18 months, with applications ranging from tourism and international business to refugee assistance and emergency response."
          form.setValue("persons", ["Dr. Sophia Chen"])
          setPersons(["Dr. Sophia Chen"])
          form.setValue("organizations", ["TechFusion Labs"])
          setOrganizations(["TechFusion Labs"])
          form.setValue("tags", ["AI", "Augmented Reality", "Translation", "Technology"])
          setTags(["AI", "Augmented Reality", "Translation", "Technology"])
          form.setValue("location", "San Francisco, California")
          break
        case "health":
          generatedTitle = "New Study Reveals Promising Treatment for Chronic Fatigue Syndrome"
          generatedContent = "A groundbreaking clinical trial has shown remarkable results in treating Chronic Fatigue Syndrome (CFS), a condition that affects millions worldwide. The study, published in the Journal of Medical Innovations, demonstrates that a combination therapy approach reduced symptoms in 72% of participants.\n\nThe treatment protocol, developed by researchers at Global Health Institute, combines targeted immunotherapy with metabolic regulation and personalized physical rehabilitation. Patients in the treatment group reported significant improvements in energy levels, cognitive function, and quality of life compared to the control group.\n\n\"This is the first time we've seen such consistent positive outcomes for CFS patients,\" explained Dr. Marcus Johnson, principal investigator. \"The multi-system approach addresses the complex nature of the condition rather than focusing on individual symptoms.\"\n\nThe research team is now planning a larger Phase 3 trial while working with health authorities to make the treatment more widely available to patients who have long suffered with limited therapeutic options."
          form.setValue("persons", ["Dr. Marcus Johnson"])
          setPersons(["Dr. Marcus Johnson"])
          form.setValue("organizations", ["Global Health Institute", "Journal of Medical Innovations"])
          setOrganizations(["Global Health Institute", "Journal of Medical Innovations"])
          form.setValue("tags", ["Chronic Fatigue Syndrome", "Medical Research", "Clinical Trial", "Healthcare"])
          setTags(["Chronic Fatigue Syndrome", "Medical Research", "Clinical Trial", "Healthcare"])
          form.setValue("location", "Boston, Massachusetts")
          break
        default:
          generatedTitle = "Breaking: Major Development in " + (category.charAt(0).toUpperCase() + category.slice(1))
          generatedContent = "This is an AI-generated article about a major development in the field of " + category + ". The content provides detailed information about recent events, key figures involved, and potential implications.\n\nExperts in the field have weighed in on this development, offering various perspectives on its significance and potential long-term impact. Data and statistics support the main points of the article, providing context and depth to the reporting.\n\nQuotes from key stakeholders add personal insights and expert opinions, enriching the narrative and providing authoritative voices on the subject matter.\n\nThe article concludes with an analysis of future prospects and next steps, giving readers a comprehensive understanding of the situation and what might unfold in the coming weeks and months."
      }
      
      form.setValue("title", generatedTitle)
      form.setValue("content", generatedContent)
      
      setIsGenerating(false)
      toast({
        title: "AI Content Generated",
        description: "The AI has created content based on your selected category and news type.",
      })
    }, 2000)
  }

  const addPerson = () => {
    if (personInput && !persons.includes(personInput)) {
      const updatedPersons = [...persons, personInput]
      setPersons(updatedPersons)
      form.setValue("persons", updatedPersons)
      setPersonInput("")
    }
  }

  const removePerson = (person: string) => {
    const updatedPersons = persons.filter(p => p !== person)
    setPersons(updatedPersons)
    form.setValue("persons", updatedPersons)
  }

  const addOrganization = () => {
    if (organizationInput && !organizations.includes(organizationInput)) {
      const updatedOrgs = [...organizations, organizationInput]
      setOrganizations(updatedOrgs)
      form.setValue("organizations", updatedOrgs)
      setOrganizationInput("")
    }
  }

  const removeOrganization = (org: string) => {
    const updatedOrgs = organizations.filter(o => o !== org)
    setOrganizations(updatedOrgs)
    form.setValue("organizations", updatedOrgs)
  }

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      const updatedTags = [...tags, tagInput]
      setTags(updatedTags)
      form.setValue("tags", updatedTags)
      setTagInput("")
    }
  }

  const removeTag = (tag: string) => {
    const updatedTags = tags.filter(t => t !== tag)
    setTags(updatedTags)
    form.setValue("tags", updatedTags)
  }

  const addSource = () => {
    if (sourceInput && !sources.includes(sourceInput)) {
      const updatedSources = [...sources, sourceInput]
      setSources(updatedSources)
      form.setValue("sources", updatedSources)
      setSourceInput("")
    }
  }

  const removeSource = (source: string) => {
    const updatedSources = sources.filter(s => s !== source)
    setSources(updatedSources)
    form.setValue("sources", updatedSources)
  }

  const addMedia = () => {
    if (mediaInput && !mediaUrls.includes(mediaInput)) {
      const updatedMedia = [...mediaUrls, mediaInput]
      setMediaUrls(updatedMedia)
      form.setValue("mediaUrls", updatedMedia)
      setMediaInput("")
    }
  }

  const removeMedia = (url: string) => {
    const updatedMedia = mediaUrls.filter(m => m !== url)
    setMediaUrls(updatedMedia)
    form.setValue("mediaUrls", updatedMedia)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create News</h2>
        <Button 
          onClick={generateWithAI} 
          disabled={isGenerating || !form.getValues("category") || !form.getValues("newsType")}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate with AI
            </>
          )}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>News Article Creator</CardTitle>
              <CardDescription>
                Create a new news article with AI assistance or manual entry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <Tabs defaultValue="basic" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="people">People & Orgs</TabsTrigger>
                      <TabsTrigger value="metadata">Metadata</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter news title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subtitle (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter subtitle or tagline" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {newsCategories.map(category => (
                                    <SelectItem key={category.value} value={category.value}>
                                      {category.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="newsType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>News Type</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select news type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {newsTypes.map(type => (
                                    <SelectItem key={type.value} value={type.value}>
                                      {type.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid gap-4 md:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="date"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant={"outline"}
                                      className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                      )}
                                    >
                                      {field.value ? (
                                        format(field.value, "PPP")
                                      ) : (
                                        <span>Pick a date</span>
                                      )}
                                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                      date > new Date() || date < new Date("1900-01-01")
                                    }
                                    initialFocus
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                  <Input placeholder="Enter location" className="pl-8" {...field} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name="isBreaking"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">Breaking News</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <FormField
                            control={form.control}
                            name="isExclusive"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">Exclusive Story</FormLabel>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="content" className="space-y-4 pt-4">
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <div className="flex justify-end mb-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  if (form.getValues("content")) {
                                    setIsGenerating(true)
                                    setTimeout(() => {
                                      const improved = form.getValues("content") + "\n\nThis content has been enhanced by AI to improve clarity, structure, and engagement. Additional context and details have been added while maintaining the original message and tone."
                                      form.setValue("content", improved)
                                      setIsGenerating(false)
                                      toast({
                                        title: "Content Enhanced",
                                        description: "AI has improved your content's readability and structure.",
                                      })
                                    }, 1500)
                                  }
                                }}
                                disabled={isGenerating || !form.getValues("content")}
                              >
                                {isGenerating ? (
                                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                ) : (
                                  <Sparkles className="mr-2 h-3 w-3" />
                                )}
                                Enhance with AI
                              </Button>
                            </div>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter news content" 
                                className="min-h-[300px] font-mono text-sm" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Write your news article content here. You can use AI to enhance your content.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="hasMedia"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">Include Media</FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("hasMedia") && (
                        <div className="space-y-4 border p-4 rounded-md">
                          <h4 className="text-sm font-medium">Media Files</h4>
                          <div className="flex items-center space-x-2">
                            <div className="relative flex-1">
                              <Paperclip className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input 
                                placeholder="Enter media URL or upload file" 
                                className="pl-8"
                                value={mediaInput}
                                onChange={(e) => setMediaInput(e.target.value)}
                              />
                            </div>
                            <Button type="button" size="sm" onClick={addMedia}>Add</Button>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {mediaUrls.map((url, index) => (
                              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                {url.includes("image") ? (
                                  <ImageIcon className="h-3 w-3" />
                                ) : url.includes("video") ? (
                                  <Video className="h-3 w-3" />
                                ) : url.includes("audio") ? (
                                  <Mic className="h-3 w-3" />
                                ) : (
                                  <Paperclip className="h-3 w-3" />
                                )}
                                {url.length > 20 ? url.substring(0, 20) + "..." : url}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-4 w-4 p-0 ml-1"
                                  onClick={() => removeMedia(url)}
                                >
                                  <span className="sr-only">Remove</span>
                                  <span aria-hidden="true">×</span>
                                </Button>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </TabsContent>
                    
                    <TabsContent value="people" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Persons Mentioned</h4>
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Input 
                              placeholder="Add person name" 
                              value={personInput}
                              onChange={(e) => setPersonInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addPerson()
                                }
                              }}
                            />
                          </div>
                          <Button type="button" size="sm" onClick={addPerson}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {persons.map((person, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {person}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => removePerson(person)}
                              >
                                <span className="sr-only">Remove</span>
                                <span aria-hidden="true">×</span>
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Organizations Mentioned</h4>
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Input 
                              placeholder="Add organization name" 
                              value={organizationInput}
                              onChange={(e) => setOrganizationInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addOrganization()
                                }
                              }}
                            />
                          </div>
                          <Button type="button" size="sm" onClick={addOrganization}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {organizations.map((org, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {org}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => removeOrganization(org)}
                              >
                                <span className="sr-only">Remove</span>
                                <span aria-hidden="true">×</span>
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          if (form.getValues("content")) {
                            setIsGenerating(true)
                            setTimeout(() => {
                              // Extract potential persons and organizations from content
                              const content = form.getValues("content")
                              const extractedPersons = ["John Smith", "Sarah Johnson", "Michael Brown"]
                              const extractedOrgs = ["Global Health Institute", "TechFusion Labs", "Green Alliance"]
                              
                              // Add extracted entities that aren't already in the lists
                              const newPersons = extractedPersons.filter(p => !persons.includes(p))
                              const newOrgs = extractedOrgs.filter(o => !organizations.includes(o))
                              
                              setPersons([...persons, ...newPersons])
                              setOrganizations([...organizations, ...newOrgs])
                              
                              setIsGenerating(false)
                              toast({
                                title: "Entities Extracted",
                                description: `AI identified ${newPersons.length} persons and ${newOrgs.length} organizations in your content.`,
                              })
                            }, 1500)
                          }
                        }}
                        disabled={isGenerating || !form.getValues("content")}
                      >
                        {isGenerating ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Sparkles className="mr-2 h-4 w-4" />
                        )}
                        Extract Entities with AI
                      </Button>
                    </TabsContent>
                    
                    <TabsContent value="metadata" className="space-y-4 pt-4">
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Tags</h4>
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Tag className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Add tag" 
                              className="pl-8"
                              value={tagInput}
                              onChange={(e) => setTagInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addTag()
                                }
                              }}
                            />
                          </div>
                          <Button type="button" size="sm" onClick={addTag}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {tags.map((tag, index) => (
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
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            if (form.getValues("content")) {
                              setIsGenerating(true)
                              setTimeout(() => {
                                const suggestedTags = ["AI", "Technology", "Innovation", "Research", "Development"]
                                setTags([...new Set([...tags, ...suggestedTags])])
                                setIsGenerating(false)
                                toast({
                                  title: "Tags Generated",
                                  description: "AI has suggested relevant tags based on your content.",
                                })
                              }, 1500)
                            }
                          }}
                          disabled={isGenerating || !form.getValues("content")}
                          className="w-full mt-2"
                        >
                          {isGenerating ? (
                            <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          ) : (
                            <Sparkles className="mr-2 h-3 w-3" />
                          )}
                          Generate Tags with AI
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-sm font-medium">Sources</h4>
                        <div className="flex items-center space-x-2">
                          <div className="relative flex-1">
                            <Link2 className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              placeholder="Add source URL or citation" 
                              className="pl-8"
                              value={sourceInput}
                              onChange={(e) => setSourceInput(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault()
                                  addSource()
                                }
                              }}
                            />
                          </div>
                          <Button type="button" size="sm" onClick={addSource}>Add</Button>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {sources.map((source, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {source.length > 25 ? source.substring(0, 25) + "..." : source}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 ml-1"
                                onClick={() => removeSource(source)}
                              >
                                <span className="sr-only">Remove</span>
                                <span aria-hidden="true">×</span>
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <FormField
                          control={form.control}
                          name="relevanceScore"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Relevance Score (1-10)&lt;/FormLabel>

