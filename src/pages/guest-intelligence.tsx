import { AppShell } from "@/components/layout/app-shell"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GuestProfile } from "@/components/ui/guest-profile"
import { GuestCheckinModal } from "@/components/ui/guest-checkin-modal"
import { GuestTimeline } from "@/components/ui/guest-timeline"
import { PrivacyNotice } from "@/components/ui/privacy-notice"
import { TelegramCommunication } from "@/components/ui/telegram-communication"
import { 
  Search, 
  User, 
  Star, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Shield,
  Brain,
  Eye,
  Clock,
  Award,
  Heart,
  Filter
} from "lucide-react"
import { useState } from "react"

// Mock data for demonstration
const guestProfiles = [
  {
    id: "G001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 555-0123",
    vipStatus: "Platinum",
    lastStay: "2024-01-15",
    totalStays: 12,
    lifetimeValue: 18500,
    preferences: ["High floor", "King bed", "Late checkout"],
    complaints: [
      {
        id: "C001",
        type: "Room cleanliness",
        severity: "critical",
        date: "2024-01-10",
        status: "resolved",
        resolution: "Complimentary spa treatment provided"
      }
    ],
    npsScore: 9,
    recoveryScore: 85,
    nextBooking: "2024-02-20",
    tags: ["Business traveler", "Spa enthusiast", "Direct booker"]
  },
  {
    id: "G002", 
    name: "Michael Chen",
    email: "m.chen@company.com",
    phone: "+1 555-0456",
    vipStatus: "Gold",
    lastStay: "2024-01-20",
    totalStays: 8,
    lifetimeValue: 12300,
    preferences: ["Ground floor", "Twin beds", "Early checkout"],
    complaints: [
      {
        id: "C002",
        type: "Noise complaint",
        severity: "moderate", 
        date: "2024-01-18",
        status: "pending",
        resolution: null
      }
    ],
    npsScore: 7,
    recoveryScore: 65,
    nextBooking: null,
    tags: ["Family traveler", "Price sensitive", "OTA booker"]
  }
]

const insights = [
  {
    title: "Guest Satisfaction Trending Up",
    value: "+12%",
    description: "Average NPS increased this month",
    icon: TrendingUp,
    trend: "positive"
  },
  {
    title: "Active Guest Profiles", 
    value: "2,847",
    description: "Unified profiles across all channels",
    icon: Users,
    trend: "neutral"
  },
  {
    title: "Open Complaints",
    value: "23",
    description: "Requiring immediate attention",
    icon: AlertTriangle,
    trend: "negative"
  },
  {
    title: "Recovery Actions",
    value: "156",
    description: "Successful resolutions this month",
    icon: Heart,
    trend: "positive"
  }
]

export default function GuestIntelligencePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedGuest, setSelectedGuest] = useState(null)

  const filteredGuests = guestProfiles.filter(guest => {
    const matchesSearch = guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         guest.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "vip" && ["Platinum", "Gold"].includes(guest.vipStatus)) ||
                         (filterStatus === "complaints" && guest.complaints.some(c => c.status === "pending"))
    return matchesSearch && matchesFilter
  })

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-foreground">
                Guest Intelligence
              </h1>
              <p className="text-muted-foreground">
                Unified guest profiles with AI-powered insights for personalized service
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Brain className="w-3 h-3 mr-1" />
                AI Enabled
              </Badge>
              <PrivacyNotice />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search guests by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter guests" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Guests</SelectItem>
                <SelectItem value="vip">VIP Members</SelectItem>
                <SelectItem value="complaints">Active Complaints</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        insight.trend === 'positive' ? 'bg-green-100 text-green-600' :
                        insight.trend === 'negative' ? 'bg-red-100 text-red-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">
                          {insight.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {insight.title}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* WhatsApp Communication - Central Feature */}
                 <div className="my-8">
           <div className="mb-4">
             <h2 className="text-2xl font-bold text-foreground mb-2">
               Live Guest Communication
             </h2>
             <p className="text-muted-foreground">
               Real-time Telegram messaging with guests. Messages appear here instantly when guests text your hotel bot.
             </p>
           </div>
           <TelegramCommunication />
         </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profiles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="profiles">Guest Profiles</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="timeline">Activity Timeline</TabsTrigger>
            <TabsTrigger value="compliance">Privacy & Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="profiles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Guest Profiles ({filteredGuests.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredGuests.map((guest) => (
                    <div
                      key={guest.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                      onClick={() => setSelectedGuest(guest)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-foreground">{guest.name}</h3>
                            <Badge variant={guest.vipStatus === 'Platinum' ? 'default' : 'secondary'}>
                              {guest.vipStatus}
                            </Badge>
                            {guest.complaints.some(c => c.status === 'pending') && (
                              <Badge variant="destructive" className="animate-pulse">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Open Issue
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{guest.email}</p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                            <span>{guest.totalStays} stays</span>
                            <span>${guest.lifetimeValue.toLocaleString()} LTV</span>
                            <span>NPS: {guest.npsScore}/10</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Profile
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <GuestProfile guest={guest} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI-Powered Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">Sentiment Analysis Active</h3>
                    <p className="text-blue-700 text-sm">
                      Our AI monitors guest feedback across all touchpoints, automatically categorizing sentiment and flagging critical issues for immediate attention.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <h3 className="font-semibold text-green-900 mb-2">Recovery Predictor</h3>
                    <p className="text-green-700 text-sm">
                      When a guest's recovery score drops below 70, our system automatically suggests personalized compensation and gestures to rebuild trust.
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                    <h3 className="font-semibold text-purple-900 mb-2">Duplicate Detection</h3>
                    <p className="text-purple-700 text-sm">
                      Real-time matching merges OTA bookings with direct reservations, ensuring a unified guest profile across all channels.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <GuestTimeline />
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Privacy & Compliance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">GDPR Compliance</h3>
                      <p className="text-sm text-muted-foreground">Data processing with explicit consent</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Compliant
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">PCI DSS</h3>
                      <p className="text-sm text-muted-foreground">Payment data security standards</p>
                    </div>
                    <Badge variant="default" className="bg-green-100 text-green-700">
                      Certified
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Data Retention</h3>
                      <p className="text-sm text-muted-foreground">Automatic deletion after 7 years</p>
                    </div>
                    <Badge variant="outline">
                      <Clock className="w-3 h-3 mr-1" />
                      Active
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Check-in Modal Demo */}
        <Card>
          <CardHeader>
            <CardTitle>Front Desk Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Test the check-in experience with our AI-powered guest insights modal.
            </p>
            <GuestCheckinModal />
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
} 