import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Star, ThumbsUp, MessageCircle, Phone, Mail, Clock, Users } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const GuestExperiencePage = () => {
  const feedbackData = [
    { guest: "Sarah Chen", room: "204", rating: 5, comment: "Exceptional service throughout stay", category: "Service", date: "Dec 15" },
    { guest: "Michael Brown", room: "312", rating: 4, comment: "Great location, room was very clean", category: "Housekeeping", date: "Dec 14" },
    { guest: "Emily Davis", room: "408", rating: 3, comment: "WiFi connectivity issues in room", category: "Technology", date: "Dec 14" },
    { guest: "David Wilson", room: "156", rating: 5, comment: "Staff went above and beyond expectations", category: "Service", date: "Dec 13" },
    { guest: "Lisa Martinez", room: "221", rating: 4, comment: "Comfortable bed, excellent breakfast", category: "F&B", date: "Dec 13" }
  ]

  const serviceRequests = [
    { id: "SR001", guest: "John Smith", room: "101", request: "Extra towels and pillows", status: "Completed", priority: "Low", time: "15 min ago" },
    { id: "SR002", guest: "Anna Taylor", room: "305", request: "Late checkout until 2 PM", status: "Approved", priority: "Medium", time: "32 min ago" },
    { id: "SR003", guest: "Robert Lee", room: "412", request: "Restaurant reservation for 8 PM", status: "Pending", priority: "Medium", time: "1 hr ago" },
    { id: "SR004", guest: "Maria Santos", room: "208", request: "Airport shuttle arrangement", status: "In Progress", priority: "High", time: "2 hrs ago" }
  ]

  const communicationHistory = [
    { type: "Email", recipient: "sarah.chen@email.com", subject: "Welcome to Symphony Hotel", sent: "Dec 15, 2:30 PM", status: "Delivered" },
    { type: "SMS", recipient: "+1-555-0123", subject: "Check-in reminder for today", sent: "Dec 15, 11:00 AM", status: "Delivered" },
    { type: "Email", recipient: "michael.brown@email.com", subject: "Thank you for your stay", sent: "Dec 14, 6:45 PM", status: "Opened" },
    { type: "Push", recipient: "Emily Davis", subject: "Your room is ready for check-in", sent: "Dec 14, 3:15 PM", status: "Delivered" }
  ]

  const satisfactionMetrics = [
    { category: "Overall Satisfaction", score: 4.3, target: 4.5, trend: "+0.2" },
    { category: "Service Quality", score: 4.6, target: 4.5, trend: "+0.1" },
    { category: "Room Cleanliness", score: 4.4, target: 4.3, trend: "+0.3" },
    { category: "Value for Money", score: 4.1, target: 4.2, trend: "-0.1" },
    { category: "Location", score: 4.7, target: 4.6, trend: "+0.2" },
    { category: "WiFi Quality", score: 3.8, target: 4.0, trend: "-0.3" }
  ]

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Guest Experience Management</h1>
          <p className="text-muted-foreground">Comprehensive guest feedback, service requests, and satisfaction tracking for enhanced guest services</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Guest Experience" 
          systemIcon={MessageSquare}
          suggestedActions={[
            "Send Feedback Survey",
            "Process Service Request", 
            "Record Guest Preference",
            "Update Satisfaction Score"
          ]}
          presetActions={[
            "Send post-stay feedback survey",
            "Process guest service request",
            "Record guest preferences and notes",
            "Update guest satisfaction score",
            "Send welcome communication",
            "Handle guest complaint resolution",
            "Create personalized offers",
            "Update loyalty program status",
            "Send birthday/anniversary greetings",
            "Process special accommodation requests",
            "Generate guest experience report",
            "Track communication history",
            "Update guest profile preferences",
            "Send service recovery communication",
            "Create VIP guest recognition",
            "Process feedback escalation",
            "Send targeted promotional offers",
            "Update guest satisfaction metrics",
            "Handle service request escalation",
            "Generate guest experience analytics"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Satisfaction Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Guest Satisfaction Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time satisfaction tracking across key service categories with performance benchmarking and trend analysis.
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">4.3</span>
                  <Badge variant="secondary">Overall Score</Badge>
                </div>
                <div className="space-y-3">
                  {satisfactionMetrics.slice(0, 3).map((metric, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{metric.category}</span>
                        <span className="text-sm text-muted-foreground">{metric.score}/5.0</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(metric.score / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-blue-500" />
                Active Service Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time service request tracking with priority management and automated routing to appropriate departments.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-orange-500">12</p>
                    <p className="text-sm text-muted-foreground">Pending</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-blue-500">8</p>
                    <p className="text-sm text-muted-foreground">In Progress</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">45</p>
                    <p className="text-sm text-muted-foreground">Completed Today</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {serviceRequests.slice(0, 3).map((request, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{request.guest}</span>
                        <Badge variant={
                          request.status === 'Completed' ? 'default' :
                          request.status === 'In Progress' ? 'secondary' :
                          request.status === 'Approved' ? 'outline' : 'secondary'
                        }>
                          {request.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.request}</p>
                      <p className="text-xs text-muted-foreground mt-1">Room {request.room} • {request.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Communication Center */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-500" />
                Guest Communication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Multi-channel communication management including email, SMS, push notifications, and in-app messaging.
              </p>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-500">156</p>
                    <p className="text-sm text-muted-foreground">Messages Sent Today</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-500">94%</p>
                    <p className="text-sm text-muted-foreground">Delivery Rate</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {communicationHistory.slice(0, 3).map((comm, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{comm.type}</span>
                        <Badge variant="outline">{comm.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{comm.subject}</p>
                      <p className="text-xs text-muted-foreground mt-1">{comm.sent}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Feedback */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-purple-500" />
                Recent Guest Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time guest feedback collection and analysis with sentiment tracking and automated response workflows.
              </p>
              <div className="space-y-3">
                {feedbackData.map((feedback, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-medium">{feedback.guest}</span>
                        <span className="text-muted-foreground ml-2">Room {feedback.room}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <Badge variant="outline">{feedback.category}</Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{feedback.comment}</p>
                    <p className="text-xs text-muted-foreground">{feedback.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-500" />
                Response Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Service response time tracking and performance monitoring across all guest touchpoints.
              </p>
              <div className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Avg Response Time</span>
                    <span className="text-sm font-bold text-green-600">2.3 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Resolution Rate</span>
                    <span className="text-sm font-bold text-blue-600">96%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">First Contact Resolution</span>
                    <span className="text-sm font-bold text-purple-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Guest Retention</span>
                    <span className="text-sm font-bold text-orange-600">78%</span>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <Button className="w-full" variant="outline">
                    View Detailed Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Workflow Builder Component */}
      <WorkflowBuilder />
    </AppShell>
  )
}

export default GuestExperiencePage 