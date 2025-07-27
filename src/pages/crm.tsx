import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, TrendingUp, Mail, Phone, Calendar } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const CRMPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Customer Relationship Management</h1>
          <p className="text-muted-foreground">Build lasting guest relationships through personalized experiences and targeted marketing</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="CRM" 
          systemIcon={Users}
          suggestedActions={[
            "Update Guest Profile",
            "Send Welcome Email", 
            "Record Guest Preferences",
            "Send Survey Request"
          ]}
          presetActions={[
            "Update guest profile information",
            "Send welcome email to guest",
            "Record guest preferences",
            "Create targeted marketing campaign",
            "Send post-stay survey request",
            "Generate guest activity report",
            "Track guest interaction history",
            "Update loyalty program status",
            "Send birthday/anniversary offer",
            "Process guest complaint",
            "Create guest feedback summary",
            "Send promotional email campaign",
            "Update guest communication preferences",
            "Generate VIP guest list",
            "Track social media mentions",
            "Send re-engagement campaign",
            "Create guest segmentation",
            "Update guest spending history",
            "Send thank you message",
            "Process guest referral"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Guest Database */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-purple-400" />
                Guest Database & Profiles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Centralized guest database with comprehensive profiles including stay history, preferences, spending patterns, 
                and behavioral insights. Track guest lifecycle from first inquiry to loyalty program member.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Total Guests</h4>
                  <div className="text-2xl font-bold text-primary">12,847</div>
                  <p className="text-sm text-muted-foreground">In database</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Members</h4>
                  <div className="text-2xl font-bold text-primary">3,245</div>
                  <p className="text-sm text-muted-foreground">Loyalty program</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Repeat Rate</h4>
                  <div className="text-2xl font-bold text-primary">42%</div>
                  <p className="text-sm text-muted-foreground">Return guests</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Avg LTV</h4>
                  <div className="text-2xl font-bold text-primary">$2,340</div>
                  <p className="text-sm text-muted-foreground">Lifetime value</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">VIP Guest Activity</h4>
                {[
                  { name: "Emma Thompson", tier: "Platinum", lastStay: "2 weeks ago", spending: "$12,500", status: "Active" },
                  { name: "James Rodriguez", tier: "Gold", lastStay: "Currently in-house", spending: "$8,200", status: "In-House" },
                  { name: "Maria Santos", tier: "Silver", lastStay: "1 month ago", spending: "$4,100", status: "Follow-up" }
                ].map((guest, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-sm text-muted-foreground">{guest.tier} • Last stay: {guest.lastStay}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">{guest.spending}</div>
                        <div className="text-xs text-muted-foreground">Total spent</div>
                      </div>
                      <Badge variant={
                        guest.status === 'In-House' ? 'default' :
                        guest.status === 'Active' ? 'secondary' : 'outline'
                      }>
                        {guest.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Hub */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-400" />
                Communication Center
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Multi-channel communication platform for email campaigns, SMS notifications, 
                and personalized guest messaging throughout their journey.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">Email Campaigns</span>
                  </div>
                  <Badge variant="default">12 Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">SMS Notifications</span>
                  </div>
                  <Badge variant="secondary">847 Sent Today</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-purple-400" />
                    <span className="text-sm font-medium">In-App Messages</span>
                  </div>
                  <Badge variant="outline">23 Pending</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Recent Campaigns</h4>
                {[
                  { name: "Winter Special Offer", type: "Email", sent: "2,340", opened: "42%", status: "Active" },
                  { name: "Check-in Reminder", type: "SMS", sent: "156", opened: "95%", status: "Completed" },
                  { name: "Birthday Promotion", type: "Email", sent: "89", opened: "38%", status: "Draft" }
                ].map((campaign, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{campaign.name}</span>
                      <Badge variant={
                        campaign.status === 'Active' ? 'default' :
                        campaign.status === 'Completed' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {campaign.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{campaign.type} • {campaign.sent} sent • {campaign.opened} open rate</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Analytics Dashboard */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-400" />
                Guest Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Advanced analytics providing insights into guest behavior, segmentation, revenue optimization, 
                and marketing campaign performance. Identify trends and opportunities for personalized experiences.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Booking Conversion</h4>
                  <div className="text-2xl font-bold text-primary">18.3%</div>
                  <p className="text-sm text-muted-foreground">+2.1% vs last month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Email Open Rate</h4>
                  <div className="text-2xl font-bold text-primary">42.8%</div>
                  <p className="text-sm text-muted-foreground">Above industry avg</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Guest Satisfaction</h4>
                  <div className="text-2xl font-bold text-primary">4.7/5</div>
                  <p className="text-sm text-muted-foreground">1,234 reviews</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Revenue per Guest</h4>
                  <div className="text-2xl font-bold text-primary">$287</div>
                  <p className="text-sm text-muted-foreground">+$23 vs last quarter</p>
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

export default CRMPage