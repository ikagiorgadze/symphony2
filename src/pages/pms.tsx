import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, Plus, Clock, Star } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const PMSPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Property Management System</h1>
          <p className="text-muted-foreground">Complete reservation management, guest services, and room operations platform</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="PMS" 
          systemIcon={Calendar}
          suggestedActions={[
            "Create New Reservation",
            "Check-in Guest", 
            "Update Guest Profile",
            "Assign Room"
          ]}
          presetActions={[
            "Create new reservation",
            "Check-in guest",
            "Check-out guest", 
            "Update guest profile",
            "Assign room to guest",
            "Process payment",
            "Generate guest folio",
            "Handle no-show guest",
            "Process cancellation",
            "Upgrade guest room",
            "Add charges to folio",
            "Print registration card",
            "Update room status",
            "Set wake-up call",
            "Process group booking",
            "Handle walk-in guest",
            "Transfer guest to another room",
            "Apply discount to reservation",
            "Send confirmation email",
            "Update arrival/departure dates"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reservations Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-green-400" />
                  Reservation Management
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Comprehensive booking engine with real-time availability, rate management, and reservation lifecycle tracking. 
                Handle individual, group, and corporate bookings with advanced pricing rules and inventory control.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Today's Arrivals</h4>
                  <div className="text-2xl font-bold text-primary">23</div>
                  <p className="text-sm text-muted-foreground">12 checked in</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Departures</h4>
                  <div className="text-2xl font-bold text-primary">18</div>
                  <p className="text-sm text-muted-foreground">15 checked out</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">In-House</h4>
                  <div className="text-2xl font-bold text-primary">167</div>
                  <p className="text-sm text-muted-foreground">87% occupancy</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Future Bookings</h4>
                  <div className="text-2xl font-bold text-primary">542</div>
                  <p className="text-sm text-muted-foreground">Next 30 days</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Reservations</h4>
                {[
                  { guest: "James Rodriguez", room: "2047", dates: "Dec 15-18", status: "confirmed", rate: "$148/night", type: "Direct" },
                  { guest: "Maria Santos", room: "1205", dates: "Dec 16-17", status: "checked-in", rate: "$132/night", type: "Booking.com" },
                  { guest: "David Kim", room: "1847", dates: "Dec 14-16", status: "checked-out", rate: "$165/night", type: "Direct" }
                ].map((reservation, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium">{reservation.guest}</div>
                        <div className="text-sm text-muted-foreground">Room {reservation.room} • {reservation.dates}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">{reservation.rate}</div>
                        <div className="text-xs text-muted-foreground">{reservation.type}</div>
                      </div>
                      <Badge variant={
                        reservation.status === 'confirmed' ? 'default' :
                        reservation.status === 'checked-in' ? 'secondary' : 'outline'
                      }>
                        {reservation.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Room Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                Room Status & Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time room status tracking, maintenance scheduling, and housekeeping coordination. 
                Optimize room assignments and manage special requests.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Available Rooms</span>
                  <Badge variant="default">24</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Occupied</span>
                  <Badge variant="secondary">167</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Out of Order</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Maintenance</span>
                  <Badge variant="outline">6</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Priority Actions</h4>
                {[
                  { room: "2045", issue: "AC Repair", priority: "High", eta: "2 hours" },
                  { room: "1203", issue: "Deep Clean", priority: "Medium", eta: "4 hours" },
                  { room: "3021", issue: "Maintenance", priority: "Low", eta: "Tomorrow" }
                ].map((item, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Room {item.room}</span>
                      <Badge variant={
                        item.priority === 'High' ? 'destructive' :
                        item.priority === 'Medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {item.priority}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{item.issue} • ETA: {item.eta}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Guest Services */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-400" />
                Guest Services & Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Comprehensive guest relationship management with preference tracking, service history, and personalized experience delivery. 
                Manage VIP programs, special requests, and guest communication across all touchpoints.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">VIP Guests</h4>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">Currently in-house</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Repeat Guests</h4>
                  <div className="text-2xl font-bold text-primary">67%</div>
                  <p className="text-sm text-muted-foreground">This month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Service Requests</h4>
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">Active today</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Avg Rating</h4>
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <p className="text-sm text-muted-foreground">Guest satisfaction</p>
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

export default PMSPage