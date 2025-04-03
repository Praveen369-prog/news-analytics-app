"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Sparkles, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"

// Sample data for persons
const persons = [
  {
    id: 1,
    name: "John Smith",
    role: "Political Figure",
    affiliation: "Green Party",
    image: "/placeholder.svg?height=100&width=100",
    bio: "John Smith is a seasoned politician with over 20 years of experience in environmental policy and advocacy.",
    activities: [
      {
        id: 1,
        title: "New Climate Policy Announced",
        date: new Date(2023, 3, 15),
        description: "Announced a new climate policy aimed at reducing carbon emissions by 50% by 2030.",
      },
      {
        id: 2,
        title: "International Climate Summit",
        date: new Date(2023, 2, 10),
        description: "Represented the country at the International Climate Summit in Geneva.",
      },
      {
        id: 3,
        title: "Green Energy Initiative",
        date: new Date(2023, 1, 5),
        description: "Launched a new initiative to promote green energy solutions in urban areas.",
      },
    ],
  },
  {
    id: 2,
    name: "Sarah Johnson",
    role: "Tech Executive",
    affiliation: "Tech Alliance",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Sarah Johnson is a former tech executive who now leads the Tech Alliance, focusing on technology policy and digital rights.",
    activities: [
      {
        id: 1,
        title: "AI Ethics Coalition",
        date: new Date(2023, 3, 14),
        description: "Formed a coalition with major tech companies to establish ethical guidelines for AI development.",
      },
      {
        id: 2,
        title: "Digital Privacy Bill",
        date: new Date(2023, 2, 8),
        description: "Advocated for a new digital privacy bill to enhance consumer protections online.",
      },
      {
        id: 3,
        title: "Tech Education Program",
        date: new Date(2023, 1, 20),
        description: "Launched a program to improve tech education in underserved communities.",
      },
    ],
  },
  {
    id: 3,
    name: "Michael Brown",
    role: "Healthcare Advocate",
    affiliation: "Progressive Party",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Michael Brown is a long-time advocate for healthcare reform and social justice issues.",
    activities: [
      {
        id: 1,
        title: "Healthcare Reform Bill",
        date: new Date(2023, 3, 13),
        description: "Successfully guided the healthcare reform bill through its first reading in parliament.",
      },
      {
        id: 2,
        title: "Social Justice Conference",
        date: new Date(2023, 2, 25),
        description: "Organized a conference on social justice and equality in the modern era.",
      },
      {
        id: 3,
        title: "Universal Basic Income Proposal",
        date: new Date(2023, 1, 15),
        description: "Presented a proposal for a universal basic income pilot program.",
      },
    ],
  },
  {
    id: 4,
    name: "Emily Chen",
    role: "Community Organizer",
    affiliation: "Community Alliance",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Emily Chen is a dedicated community organizer focused on urban development and environmental justice.",
    activities: [
      {
        id: 1,
        title: "Urban Green Spaces Initiative",
        date: new Date(2023, 3, 12),
        description: "Launched a new initiative to increase urban green spaces in the city center.",
      },
      {
        id: 2,
        title: "Community Clean-up Drive",
        date: new Date(2023, 2, 18),
        description: "Organized a community-wide clean-up drive that removed over 2 tons of waste.",
      },
      {
        id: 3,
        title: "Youth Empowerment Workshop",
        date: new Date(2023, 1, 25),
        description: "Led a workshop series focused on empowering youth through civic engagement.",
      },
    ],
  },
  {
    id: 5,
    name: "Dr. James Wilson",
    role: "Medical Researcher",
    affiliation: "Global Health Institute",
    image: "/placeholder.svg?height=100&width=100",
    bio: "Dr. James Wilson is a renowned medical researcher specializing in infectious diseases and global health initiatives.",
    activities: [
      {
        id: 1,
        title: "Breakthrough Research Publication",
        date: new Date(2023, 3, 10),
        description:
          "Published groundbreaking research on a new treatment approach for antibiotic-resistant infections.",
      },
      {
        id: 2,
        title: "Global Health Summit",
        date: new Date(2023, 2, 15),
        description: "Keynote speaker at the Global Health Summit discussing pandemic preparedness.",
      },
      {
        id: 3,
        title: "Research Grant Awarded",
        date: new Date(2023, 1, 8),
        description: "Received a $5 million grant to continue research on emerging infectious diseases.",
      },
    ],
  },
]

// Sample data for organizations
const organizations = [
  {
    id: 1,
    name: "Green Party",
    founded: "1990",
    type: "Political Party",
    focus: "Environmentalism, Social Justice",
    image: "/placeholder.svg?height=100&width=100",
    description: "The Green Party focuses on environmental protection, social justice, and grassroots democracy.",
    keyMembers: ["John Smith", "Emma Wilson", "Robert Chen"],
    activities: [
      {
        id: 1,
        title: "Climate Policy Announcement",
        date: new Date(2023, 3, 15),
        description: "Announced a comprehensive climate policy aimed at achieving carbon neutrality by 2040.",
      },
      {
        id: 2,
        title: "Renewable Energy Bill",
        date: new Date(2023, 2, 20),
        description: "Introduced a bill to increase investment in renewable energy infrastructure.",
      },
      {
        id: 3,
        title: "Environmental Protection Rally",
        date: new Date(2023, 1, 10),
        description: "Organized a nationwide rally for environmental protection and awareness.",
      },
    ],
  },
  {
    id: 2,
    name: "Progressive Party",
    founded: "1985",
    type: "Political Party",
    focus: "Social Democracy, Progressive Reforms",
    image: "/placeholder.svg?height=100&width=100",
    description: "The Progressive Party advocates for social democracy, healthcare reform, and economic equality.",
    keyMembers: ["Michael Brown", "Jennifer Lee", "David Rodriguez"],
    activities: [
      {
        id: 1,
        title: "Healthcare Reform Initiative",
        date: new Date(2023, 3, 13),
        description: "Launched a major initiative for comprehensive healthcare reform.",
      },
      {
        id: 2,
        title: "Economic Equality Summit",
        date: new Date(2023, 2, 5),
        description: "Hosted a summit on economic equality and wealth distribution.",
      },
      {
        id: 3,
        title: "Education Funding Proposal",
        date: new Date(2023, 1, 25),
        description: "Proposed increased funding for public education and teacher salaries.",
      },
    ],
  },
  {
    id: 3,
    name: "Tech Alliance",
    founded: "2010",
    type: "Industry Association",
    focus: "Digital Rights, Innovation",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "The Tech Alliance focuses on digital rights, technological innovation, and bridging the digital divide.",
    keyMembers: ["Sarah Johnson", "Alex Kim", "Priya Patel"],
    activities: [
      {
        id: 1,
        title: "AI Ethics Framework",
        date: new Date(2023, 3, 14),
        description: "Developed a comprehensive ethical framework for artificial intelligence development.",
      },
      {
        id: 2,
        title: "Digital Inclusion Initiative",
        date: new Date(2023, 2, 18),
        description: "Launched an initiative to provide internet access to underserved communities.",
      },
      {
        id: 3,
        title: "Tech Policy Conference",
        date: new Date(2023, 1, 8),
        description: "Organized a conference on technology policy and regulation.",
      },
    ],
  },
  {
    id: 4,
    name: "Global Health Institute",
    founded: "2005",
    type: "Research Organization",
    focus: "Medical Research, Public Health",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "The Global Health Institute conducts cutting-edge research on global health challenges and develops innovative solutions.",
    keyMembers: ["Dr. James Wilson", "Dr. Maria Rodriguez", "Dr. Aiden Patel"],
    activities: [
      {
        id: 1,
        title: "Pandemic Preparedness Report",
        date: new Date(2023, 3, 8),
        description: "Published a comprehensive report on global pandemic preparedness and response strategies.",
      },
      {
        id: 2,
        title: "Vaccine Development Grant",
        date: new Date(2023, 2, 12),
        description: "Received a major grant to accelerate vaccine development for emerging infectious diseases.",
      },
      {
        id: 3,
        title: "Public Health Conference",
        date: new Date(2023, 1, 15),
        description: "Hosted an international conference on public health challenges in the 21st century.",
      },
    ],
  },
  {
    id: 5,
    name: "Community Alliance",
    founded: "2015",
    type: "Non-Profit Organization",
    focus: "Community Development, Social Services",
    image: "/placeholder.svg?height=100&width=100",
    description:
      "The Community Alliance works to improve quality of life in urban communities through grassroots initiatives and advocacy.",
    keyMembers: ["Emily Chen", "Marcus Johnson", "Sophia Williams"],
    activities: [
      {
        id: 1,
        title: "Urban Green Spaces Project",
        date: new Date(2023, 3, 12),
        description: "Launched a project to create and maintain green spaces in urban neighborhoods.",
      },
      {
        id: 2,
        title: "Youth Mentorship Program",
        date: new Date(2023, 2, 22),
        description: "Established a mentorship program connecting at-risk youth with community leaders.",
      },
      {
        id: 3,
        title: "Housing Advocacy Campaign",
        date: new Date(2023, 1, 18),
        description: "Initiated a campaign advocating for affordable housing policies in metropolitan areas.",
      },
    ],
  },
]

export default function ProfilesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("persons")
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  const filteredPersons = persons.filter(
    (person) =>
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.affiliation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredOrganizations = organizations.filter(
    (org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.focus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      org.type.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const generateInsights = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      toast({
        title: "AI Insights Generated",
        description: "AI has analyzed the profiles and generated insights about connections and patterns.",
      })
    }, 2000)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Person & Organization Profiles</h2>
        <Button
          onClick={generateInsights}
          disabled={isGenerating}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate AI Insights
            </>
          )}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, role, affiliation..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="persons" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="persons">Persons</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="persons" className="space-y-4">
          {filteredPersons.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-[200px]">
                <p className="text-muted-foreground">No persons found. Try adjusting your search.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredPersons.map((person) => (
                <Card key={person.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-16 w-16 border-2 border-primary/10">
                      <AvatarImage src={person.image} alt={person.name} />
                      <AvatarFallback>
                        {person.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{person.name}</CardTitle>
                      <CardDescription>{person.role}</CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {person.affiliation}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{person.bio}</p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Recent Activities</h4>
                      <div className="space-y-3">
                        {person.activities.map((activity) => (
                          <div key={activity.id} className="relative pl-6 pb-3 border-l border-primary/20">
                            <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-1/2"></div>
                            <h5 className="text-sm font-medium">{activity.title}</h5>
                            <p className="text-xs text-muted-foreground">{format(activity.date, "PPP")}</p>
                            <p className="text-xs mt-1">{activity.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="organizations" className="space-y-4">
          {filteredOrganizations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center h-[200px]">
                <p className="text-muted-foreground">No organizations found. Try adjusting your search.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredOrganizations.map((org) => (
                <Card key={org.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <Avatar className="h-16 w-16 border-2 border-primary/10">
                      <AvatarImage src={org.image} alt={org.name} />
                      <AvatarFallback>
                        {org.name.split(" ")[0][0]}
                        {org.name.split(" ")[1]?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{org.name}</CardTitle>
                      <CardDescription>Founded: {org.founded}</CardDescription>
                      <Badge variant="outline" className="mt-1">
                        {org.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Badge variant="secondary">{org.focus}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{org.description}</p>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Key Members</h4>
                      <div className="flex flex-wrap gap-2">
                        {org.keyMembers.map((member, index) => (
                          <Badge key={index} variant="outline" className="bg-primary/10">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Recent Activities</h4>
                      <div className="space-y-3">
                        {org.activities.map((activity) => (
                          <div key={activity.id} className="relative pl-6 pb-3 border-l border-primary/20">
                            <div className="absolute left-0 top-0 w-2 h-2 rounded-full bg-primary -translate-x-1/2"></div>
                            <h5 className="text-sm font-medium">{activity.title}</h5>
                            <p className="text-xs text-muted-foreground">{format(activity.date, "PPP")}</p>
                            <p className="text-xs mt-1">{activity.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

