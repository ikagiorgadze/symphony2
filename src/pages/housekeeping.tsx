import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, CheckCircle, AlertTriangle, Clock, Users, Wrench } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const HousekeepingPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Housekeeping Management</h1>
          <p className="text-muted-foreground">Streamlined room operations, task management, and maintenance coordination for optimal guest experiences</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Housekeeping" 
          systemIcon={Sparkles}
          suggestedActions={[
            "Schedule Room Cleaning",
            "Update Room Status", 
            "Report Maintenance Issue",
            "Complete Inspection"
          ]}
          presetActions={[
            "Schedule room cleaning task",
            "Update room status to clean",
            "Report maintenance issue",
            "Complete room inspection",
            "Assign cleaning staff to room",
            "Mark room out of order",
            "Update maintenance status",
            "Schedule deep cleaning",
            "Prepare room for arrival",
            "Complete checkout cleaning",
            "Restock room amenities",
            "Replace linens and towels",
            "Clean and sanitize bathroom",
            "Vacuum and mop floors",
            "Check and replenish minibar",
            "Test room equipment and appliances",
            "Report damaged or missing items",
            "Complete maintenance work order",
            "Update cleaning checklist",
            "Generate housekeeping report"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Task Management Dashboard */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-pink-400" />
                Task Management & Room Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time room status tracking with automated task assignments, cleaning checklists, and quality control workflows. 
                Coordinate between housekeeping teams, maintenance, and front desk for seamless operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Rooms to Clean</h4>
                  <div className="text-2xl font-bold text-primary">23</div>
                  <p className="text-sm text-muted-foreground">Pending checkout</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">In Progress</h4>
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">Currently cleaning</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Inspection</h4>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <p className="text-sm text-muted-foreground">Quality check</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Ready</h4>
                  <div className="text-2xl font-bold text-primary">164</div>
                  <p className="text-sm text-muted-foreground">Available for sale</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Active Assignments</h4>
                {[
                  { room: "2047", housekeeper: "Maria Garcia", task: "Deep Clean", priority: "VIP", eta: "45 min", status: "In Progress" },
                  { room: "1205", housekeeper: "James Wilson", task: "Standard Clean", priority: "Normal", eta: "30 min", status: "In Progress" },
                  { room: "3021", housekeeper: "Sarah Kim", task: "Maintenance Clean", priority: "High", eta: "1 hour", status: "Inspection" },
                  { room: "1847", housekeeper: "Auto-Assigned", task: "Standard Clean", priority: "Normal", eta: "35 min", status: "Pending" }
                ].map((task, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <Sparkles className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium">Room {task.room} - {task.task}</div>
                        <div className="text-sm text-muted-foreground">{task.housekeeper} • ETA: {task.eta}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        task.priority === 'VIP' ? 'default' :
                        task.priority === 'High' ? 'destructive' : 'outline'
                      } className="text-xs">
                        {task.priority}
                      </Badge>
                      <Badge variant={
                        task.status === 'In Progress' ? 'secondary' :
                        task.status === 'Inspection' ? 'default' : 'outline'
                      }>
                        {task.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Staff Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-pink-400" />
                Staff Coordination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time staff tracking, performance monitoring, and workload optimization. 
                Manage schedules and ensure proper coverage across all areas.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Staff On Duty</span>
                  <Badge variant="default">12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Available</span>
                  <Badge variant="secondary">4</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Busy</span>
                  <Badge variant="outline">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Completion</span>
                  <Badge variant="secondary">28 min</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Team Performance</h4>
                {[
                  { name: "Maria Garcia", rooms: 8, rating: 4.9, status: "Working" },
                  { name: "James Wilson", rooms: 6, rating: 4.7, status: "Available" },
                  { name: "Sarah Kim", rooms: 7, rating: 4.8, status: "Break" },
                  { name: "Chen Liu", rooms: 5, rating: 4.6, status: "Working" }
                ].map((staff, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={
                        staff.status === 'Working' ? 'secondary' :
                        staff.status === 'Available' ? 'default' : 'outline'
                      } className="text-xs">
                        {staff.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{staff.rooms} rooms today • {staff.rating}★ rating</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Requests */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-pink-400" />
                Maintenance Coordination & Issue Tracking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Integrated maintenance request system with priority management, vendor coordination, and quality assurance. 
                Track issues from identification to resolution with automated notifications and status updates.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Open Requests</h4>
                  <div className="text-2xl font-bold text-primary">14</div>
                  <p className="text-sm text-muted-foreground">Pending resolution</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">In Progress</h4>
                  <div className="text-2xl font-bold text-primary">7</div>
                  <p className="text-sm text-muted-foreground">Being worked on</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">High Priority</h4>
                  <div className="text-2xl font-bold text-primary">3</div>
                  <p className="text-sm text-muted-foreground">Urgent repairs</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Avg Resolution</h4>
                  <div className="text-2xl font-bold text-primary">4.2h</div>
                  <p className="text-sm text-muted-foreground">Time to fix</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Completed Today</h4>
                  <div className="text-2xl font-bold text-primary">9</div>
                  <p className="text-sm text-muted-foreground">Issues resolved</p>
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

export default HousekeepingPage