import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wifi, Globe, BarChart3, DollarSign, TrendingUp, Calendar } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const OTAPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Online Travel Agency Management</h1>
          <p className="text-muted-foreground">Multi-channel distribution, rate management, and booking optimization across all OTA platforms</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="OTA" 
          systemIcon={Wifi}
          suggestedActions={[
            "Sync Availability",
            "Update Rates", 
            "Process Booking",
            "Send Confirmation"
          ]}
          presetActions={[
            "Sync availability across OTA platforms",
            "Update room rates and pricing",
            "Process new booking from OTA",
            "Handle booking cancellation",
            "Send booking confirmation email",
            "Update inventory allocation",
            "Generate OTA performance report",
            "Manage channel restrictions",
            "Process booking modification",
            "Handle rate disputes",
            "Sync promotional offers",
            "Update minimum stay policies",
            "Manage blackout dates",
            "Process commission payments",
            "Handle guest reviews and ratings",
            "Update property information",
            "Manage photo and content updates",
            "Process refund requests",
            "Handle overbooking compensation",
            "Generate revenue analysis"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Channel Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-cyan-400" />
                Channel Manager & Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Centralized management of all booking channels with real-time inventory synchronization, rate parity monitoring, 
                and automated updates across Booking.com, Expedia, Airbnb, and direct booking engine.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Channels</h4>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">Connected platforms</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Daily Bookings</h4>
                  <div className="text-2xl font-bold text-primary">47</div>
                  <p className="text-sm text-muted-foreground">All channels</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Channel Revenue</h4>
                  <div className="text-2xl font-bold text-primary">$18,435</div>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Commission Rate</h4>
                  <div className="text-2xl font-bold text-primary">14.2%</div>
                  <p className="text-sm text-muted-foreground">Avg across OTAs</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Channel Performance</h4>
                {[
                  { channel: "Booking.com", bookings: 18, revenue: "$6,847", commission: "15%", status: "Active" },
                  { channel: "Expedia", bookings: 12, revenue: "$4,235", commission: "18%", status: "Active" },
                  { channel: "Direct Booking", bookings: 8, revenue: "$3,890", commission: "0%", status: "Optimized" },
                  { channel: "Airbnb", bookings: 9, revenue: "$3,463", commission: "12%", status: "Active" }
                ].map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                        <Globe className="h-4 w-4 text-cyan-600" />
                      </div>
                      <div>
                        <div className="font-medium">{channel.channel}</div>
                        <div className="text-sm text-muted-foreground">{channel.bookings} bookings • {channel.commission} commission</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">{channel.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <Badge variant={channel.status === 'Optimized' ? 'default' : 'secondary'}>
                        {channel.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rate Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-cyan-400" />
                Dynamic Rate Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                AI-powered dynamic pricing with competitor rate monitoring, demand forecasting, 
                and automated rate adjustments to maximize revenue.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Base Rate</div>
                    <div className="text-sm text-muted-foreground">Standard King Room</div>
                  </div>
                  <Badge variant="default">$148</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Weekend Premium</div>
                    <div className="text-sm text-muted-foreground">Friday-Sunday uplift</div>
                  </div>
                  <Badge variant="secondary">+$35</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Competitor Gap</div>
                    <div className="text-sm text-muted-foreground">vs market average</div>
                  </div>
                  <Badge variant="outline">-$12</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Recommended Rate</div>
                    <div className="text-sm text-muted-foreground">AI optimization</div>
                  </div>
                  <Badge variant="default">$165</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Rate Alerts</h4>
                {[
                  { type: "Competitor dropped rates", urgency: "High", action: "Review pricing" },
                  { type: "High demand detected", urgency: "Medium", action: "Increase rates" },
                  { type: "Occupancy forecast up", urgency: "Low", action: "Optimize inventory" }
                ].map((alert, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{alert.type}</span>
                      <Badge variant={
                        alert.urgency === 'High' ? 'destructive' :
                        alert.urgency === 'Medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {alert.urgency}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{alert.action}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Booking Engine & Analytics */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-cyan-400" />
                Direct Booking Engine & Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Optimized direct booking website with conversion tracking, A/B testing capabilities, and comprehensive analytics 
                to reduce OTA dependency and increase direct revenue share.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Direct Bookings</h4>
                  <div className="text-2xl font-bold text-primary">34%</div>
                  <p className="text-sm text-muted-foreground">Of total bookings</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Conversion Rate</h4>
                  <div className="text-2xl font-bold text-primary">3.2%</div>
                  <p className="text-sm text-muted-foreground">Website visitors</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">ADR Lift</h4>
                  <div className="text-2xl font-bold text-primary">+$23</div>
                  <p className="text-sm text-muted-foreground">vs OTA rates</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Abandonment Rate</h4>
                  <div className="text-2xl font-bold text-primary">22%</div>
                  <p className="text-sm text-muted-foreground">Cart abandonment</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Mobile Bookings</h4>
                  <div className="text-2xl font-bold text-primary">67%</div>
                  <p className="text-sm text-muted-foreground">Mobile traffic</p>
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

export default OTAPage