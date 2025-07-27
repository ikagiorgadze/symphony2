import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { 
  Calendar, 
  MessageSquare, 
  Star, 
  Gift, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle,
  User,
  Phone,
  Mail,
  Clock
} from "lucide-react"

// Mock timeline data
const timelineEvents = [
  {
    id: "T001",
    type: "booking",
    title: "New Booking Created",
    description: "Direct booking for 3 nights in Suite 405",
    date: "2024-01-25T14:30:00Z",
    icon: Calendar,
    status: "completed",
    details: {
      source: "Direct Website",
      amount: "$1,250",
      room: "Suite 405"
    }
  },
  {
    id: "T002", 
    type: "complaint",
    title: "Service Complaint Received",
    description: "Room cleanliness issue reported via phone",
    date: "2024-01-20T09:15:00Z",
    icon: AlertTriangle,
    status: "resolved",
    severity: "critical",
    resolution: "Immediate housekeeping response + complimentary spa treatment",
    details: {
      channel: "Phone Call",
      staffMember: "Sarah Chen",
      resolutionTime: "2 hours"
    }
  },
  {
    id: "T003",
    type: "feedback",
    title: "Post-Stay Survey Completed",
    description: "NPS Score: 9/10 with positive feedback",
    date: "2024-01-18T11:00:00Z",
    icon: Star,
    status: "completed",
    details: {
      npsScore: 9,
      highlights: ["Excellent location", "Professional staff"],
      improvements: ["Room temperature control"]
    }
  },
  {
    id: "T004",
    type: "stay",
    title: "Stay Completed",
    description: "3-night business stay in Standard King",
    date: "2024-01-17T12:00:00Z",
    icon: CheckCircle,
    status: "completed",
    details: {
      room: "Standard King 302",
      checkIn: "2024-01-15",
      checkOut: "2024-01-17",
      totalSpend: "$890"
    }
  },
  {
    id: "T005",
    type: "communication",
    title: "Welcome Email Sent",
    description: "Pre-arrival email with local recommendations",
    date: "2024-01-14T16:20:00Z",
    icon: Mail,
    status: "completed",
    details: {
      template: "Business Traveler Welcome",
      opened: true,
      clickedLinks: 3
    }
  }
]

export function GuestTimeline() {
  const { toast } = useToast()

  const handleAddNote = (eventId: string) => {
    toast({
      title: "Note Added",
      description: "Your note has been added to this timeline event.",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'resolved': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-blue-500'
      case 'complaint': return 'bg-red-500'
      case 'feedback': return 'bg-yellow-500'
      case 'stay': return 'bg-green-500'
      case 'communication': return 'bg-purple-500'
      default: return 'bg-gray-500'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Guest Activity Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border"></div>
          
          <div className="space-y-6">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const formatted = formatDate(event.date)
              
              return (
                <div key={event.id} className="relative flex items-start space-x-4">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-12 h-12 rounded-full ${getTypeColor(event.type)} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-background border rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-foreground">{event.title}</h3>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(event.status)}>
                            {event.status}
                          </Badge>
                          {event.severity && (
                            <Badge variant={event.severity === 'critical' ? 'destructive' : 'secondary'}>
                              {event.severity}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground mb-3">
                        {formatted.date} at {formatted.time}
                      </div>

                      {/* Event details */}
                      {event.details && (
                        <div className="bg-muted/50 rounded p-3 mb-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            {Object.entries(event.details).map(([key, value]) => (
                              <div key={key} className="flex justify-between">
                                <span className="text-muted-foreground capitalize">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                                </span>
                                <span className="text-foreground font-medium">
                                  {Array.isArray(value) ? value.join(', ') : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Resolution details */}
                      {event.resolution && (
                        <div className="bg-green-50 border border-green-200 rounded p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-green-800">Resolution</div>
                              <div className="text-sm text-green-700">{event.resolution}</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleAddNote(event.id)}
                        >
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 