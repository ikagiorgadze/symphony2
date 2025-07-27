import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  DollarSign, 
  Calendar,
  Target,
  BarChart3,
  AlertCircle,
  Settings,
  Zap
} from "lucide-react"

export default function RevenueManagementPage() {
  return (
    <AppShell>
      <div className="space-y-6 bg-background min-h-full">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Revenue Management System
          </h1>
          <p className="text-muted-foreground">
            Automatically adjust prices based on demand, competition, and events to maximize RevPAR
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$142.50</div>
              <p className="text-xs text-muted-foreground">+12.3% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">ADR</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$185.40</div>
              <p className="text-xs text-muted-foreground">+8.2% optimization</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">76.8%</div>
              <p className="text-xs text-muted-foreground">Target: 78%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Changes</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">34</div>
              <p className="text-xs text-muted-foreground">Auto-adjustments today</p>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Analytics & Pricing Strategy */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Revenue Performance */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Performance & Forecasting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-green-600">$48,250</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-blue-600">$52,100</div>
                  <div className="text-sm text-muted-foreground">Forecasted</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-purple-600">$194,800</div>
                  <div className="text-sm text-muted-foreground">This Month</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm font-medium">Revenue by Room Type</div>
                {[
                  { type: "Standard Room", revenue: 45, amount: "$87,400", rooms: 120 },
                  { type: "Deluxe Suite", revenue: 25, amount: "$48,750", rooms: 40 },
                  { type: "Executive Room", revenue: 20, amount: "$38,900", rooms: 30 },
                  { type: "Presidential Suite", revenue: 10, amount: "$19,750", rooms: 8 }
                ].map((room) => (
                  <div key={room.type} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{room.type}</span>
                      <span className="font-medium">{room.amount}</span>
                    </div>
                    <Progress value={room.revenue} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {room.rooms} rooms • {room.revenue}% of total revenue
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Pricing Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Pricing Strategy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Auto Pricing</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    AI-driven price optimization based on 15+ factors
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Competition Monitor</span>
                    <Badge variant="default">Tracking</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Monitoring 12 competitor properties
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Event-Based Pricing</span>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    3 upcoming events detected
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Length of Stay</span>
                    <Badge variant="default">Optimized</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Minimum stay requirements active
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Configure Pricing Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Market Intelligence & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Market Intelligence */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Market Intelligence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Market Penetration</span>
                    <span className="text-sm font-bold">+3.2%</span>
                  </div>
                  <Progress value={68} className="h-2 mb-2" />
                  <div className="text-sm text-muted-foreground">
                    68% vs competitive set
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Rate Position</span>
                    <Badge variant="default">Premium</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    15% above market average
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Demand Forecast</span>
                    <span className="text-sm font-bold text-green-600">High</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Next 7 days: Strong corporate demand
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Pickup Pace</span>
                    <span className="text-sm font-bold">+8.5%</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    vs same period last year
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    type: "opportunity",
                    title: "Increase Weekend Rates",
                    description: "Low inventory + high demand = 15% rate increase potential",
                    impact: "+$2,400 revenue",
                    action: "Apply Now"
                  },
                  {
                    type: "warning",
                    title: "Competitor Rate Drop",
                    description: "Similar property reduced rates by 8% for next week",
                    impact: "Monitor closely",
                    action: "Review"
                  },
                  {
                    type: "info",
                    title: "Length of Stay Optimization",
                    description: "Implement 3-night minimum for peak periods",
                    impact: "+$1,800 revenue",
                    action: "Configure"
                  }
                ].map((rec, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{rec.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {rec.description}
                        </div>
                        <div className="text-xs font-medium text-green-600 mt-1">
                          {rec.impact}
                        </div>
                      </div>
                      <Badge 
                        variant={rec.type === "opportunity" ? "default" : 
                                rec.type === "warning" ? "destructive" : "secondary"}
                        className="ml-2"
                      >
                        {rec.type}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      {rec.action}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
} 