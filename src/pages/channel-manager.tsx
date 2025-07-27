import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shuffle, Globe, Clock, CheckCircle, AlertCircle, RefreshCw, Calendar, Users } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const ChannelManagerPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Channel Manager</h1>
          <p className="text-muted-foreground">Centralized distribution management with real-time synchronization across all booking channels</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Channel Manager" 
          systemIcon={Shuffle}
          suggestedActions={[
            "Sync Rates Across Channels",
            "Update Availability", 
            "Process New Booking",
            "Handle Rate Parity"
          ]}
          presetActions={[
            "Sync rates across all channels",
            "Update availability calendar",
            "Process new booking from OTA",
            "Handle rate parity violation",
            "Generate channel performance report",
            "Manage booking restrictions",
            "Update inventory allocation",
            "Handle overbooking situation",
            "Process booking modification",
            "Monitor channel performance",
            "Sync promotional rates",
            "Update minimum stay requirements",
            "Manage blackout dates",
            "Process booking cancellation",
            "Update stop-sell restrictions",
            "Distribute rate changes",
            "Handle channel connectivity issues",
            "Generate revenue analysis",
            "Update room type mapping",
            "Sync guest information"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Incoming Bookings */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  Incoming Bookings Queue
                </div>
                <Button size="sm" variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time booking feed from all connected channels. Monitor new reservations and sync status with PMS for inventory accuracy.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Pending Sync</h4>
                  <div className="text-2xl font-bold text-orange-500">7</div>
                  <p className="text-sm text-muted-foreground">Awaiting PMS</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Synced Today</h4>
                  <div className="text-2xl font-bold text-green-500">34</div>
                  <p className="text-sm text-muted-foreground">Successfully</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Failed Sync</h4>
                  <div className="text-2xl font-bold text-red-500">2</div>
                  <p className="text-sm text-muted-foreground">Requires attention</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Auto-Sync Rate</h4>
                  <div className="text-2xl font-bold text-blue-500">94%</div>
                  <p className="text-sm text-muted-foreground">Success rate</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent Bookings</h4>
                {[
                  { id: "BK-2024-001", guest: "Sarah Johnson", channel: "Booking.com", room: "Deluxe King", dates: "Dec 20-23", amount: "$432", status: "syncing", time: "2 min ago" },
                  { id: "BK-2024-002", guest: "Michael Chen", channel: "Expedia", room: "Standard Queen", dates: "Dec 18-19", amount: "$296", status: "synced", time: "5 min ago" },
                  { id: "BK-2024-003", guest: "Emma Wilson", channel: "Direct", room: "Suite", dates: "Dec 22-25", amount: "$875", status: "synced", time: "8 min ago" },
                  { id: "BK-2024-004", guest: "David Rodriguez", channel: "Airbnb", room: "Standard King", dates: "Dec 19-21", amount: "$348", status: "failed", time: "12 min ago" },
                  { id: "BK-2024-005", guest: "Lisa Thompson", channel: "Booking.com", room: "Deluxe Queen", dates: "Dec 21-24", amount: "$534", status: "pending", time: "15 min ago" }
                ].map((booking, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        booking.status === 'synced' ? 'bg-green-100' :
                        booking.status === 'syncing' ? 'bg-blue-100' :
                        booking.status === 'failed' ? 'bg-red-100' : 'bg-orange-100'
                      }`}>
                        {booking.status === 'synced' ? <CheckCircle className="h-4 w-4 text-green-600" /> :
                         booking.status === 'syncing' ? <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" /> :
                         booking.status === 'failed' ? <AlertCircle className="h-4 w-4 text-red-600" /> :
                         <Clock className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div>
                        <div className="font-medium">{booking.guest}</div>
                        <div className="text-sm text-muted-foreground">{booking.id} • {booking.room} • {booking.dates}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">{booking.amount}</div>
                        <div className="text-xs text-muted-foreground">{booking.channel}</div>
                      </div>
                      <Badge variant={
                        booking.status === 'synced' ? 'default' :
                        booking.status === 'syncing' ? 'secondary' :
                        booking.status === 'failed' ? 'destructive' : 'outline'
                      }>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* PMS Sync Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5 text-blue-400" />
                PMS Sync Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time synchronization status with Property Management System. Monitor connection health and sync performance.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-medium">PMS Connection</span>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Last Sync</div>
                    <div className="text-sm text-muted-foreground">2 minutes ago</div>
                  </div>
                  <Badge variant="secondary">Success</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Sync Frequency</div>
                    <div className="text-sm text-muted-foreground">Every 30 seconds</div>
                  </div>
                  <Badge variant="outline">Auto</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Inventory Updated</div>
                    <div className="text-sm text-muted-foreground">Rooms 101-350</div>
                  </div>
                  <Badge variant="default">Current</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Sync Queue</h4>
                {[
                  { action: "Room availability update", priority: "High", status: "Processing" },
                  { action: "Rate parity check", priority: "Medium", status: "Queued" },
                  { action: "Inventory refresh", priority: "Low", status: "Scheduled" }
                ].map((item, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{item.action}</span>
                      <Badge variant={
                        item.priority === 'High' ? 'destructive' :
                        item.priority === 'Medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Channel Management & Distribution */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shuffle className="h-5 w-5 text-blue-400" />
                Multi-Channel Distribution Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Centralized control over all booking channels with rate synchronization, availability management, and overbooking prevention. 
                Maintain rate parity and optimize distribution strategy across all platforms.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Channels</h4>
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Rate Parity</h4>
                  <div className="text-2xl font-bold text-green-500">98%</div>
                  <p className="text-sm text-muted-foreground">Compliance</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Availability</h4>
                  <div className="text-2xl font-bold text-blue-500">24</div>
                  <p className="text-sm text-muted-foreground">Rooms available</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Overbooking Risk</h4>
                  <div className="text-2xl font-bold text-orange-500">Low</div>
                  <p className="text-sm text-muted-foreground">2% threshold</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Commission</h4>
                  <div className="text-2xl font-bold text-purple-500">14.8%</div>
                  <p className="text-sm text-muted-foreground">Weighted avg</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Direct Booking</h4>
                  <div className="text-2xl font-bold text-green-500">32%</div>
                  <p className="text-sm text-muted-foreground">Share increase</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Channel Performance</h4>
                  {[
                    { channel: "Booking.com", bookings: 142, revenue: "$28,340", commission: "15%", status: "Active", sync: "Real-time" },
                    { channel: "Expedia", bookings: 98, revenue: "$19,760", commission: "18%", status: "Active", sync: "Real-time" },
                    { channel: "Direct Website", bookings: 87, revenue: "$21,750", commission: "0%", status: "Optimized", sync: "Instant" },
                    { channel: "Airbnb", bookings: 64, revenue: "$15,680", commission: "12%", status: "Active", sync: "Real-time" }
                  ].map((channel, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">{channel.channel}</div>
                          <div className="text-sm text-muted-foreground">{channel.bookings} bookings • {channel.sync}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          <div className="text-sm font-medium">{channel.revenue}</div>
                          <div className="text-xs text-muted-foreground">{channel.commission} commission</div>
                        </div>
                        <Badge variant={channel.status === 'Optimized' ? 'default' : 'secondary'}>
                          {channel.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">System Alerts</h4>
                  {[
                    { type: "Rate disparity detected", channel: "Expedia", severity: "High", action: "Auto-corrected" },
                    { type: "Inventory mismatch", channel: "Booking.com", severity: "Medium", action: "Syncing now" },
                    { type: "Channel connection slow", channel: "Airbnb", severity: "Low", action: "Monitoring" },
                    { type: "Overbooking prevented", channel: "Direct", severity: "Info", action: "Stopped at 95%" }
                  ].map((alert, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium text-sm">{alert.type}</span>
                        <Badge variant={
                          alert.severity === 'High' ? 'destructive' :
                          alert.severity === 'Medium' ? 'secondary' : 
                          alert.severity === 'Low' ? 'outline' : 'default'
                        } className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {alert.channel} • {alert.action}
                      </div>
                    </div>
                  ))}
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

export default ChannelManagerPage 