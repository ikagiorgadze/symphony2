import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  Wifi, 
  TrendingUp, 
  Users,
  MousePointer,
  CreditCard,
  Globe,
  Smartphone,
  DollarSign
} from "lucide-react"

export default function BookingEnginePage() {
  return (
    <AppShell>
      <div className="space-y-6 bg-background min-h-full">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Booking Engine (IBE)
          </h1>
          <p className="text-muted-foreground">
            Direct booking system for your website to reduce OTA commissions and increase direct revenue
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Direct Bookings</CardTitle>
              <Wifi className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">+0.4% improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Direct Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$42,850</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Daily Rate</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$173</div>
              <p className="text-xs text-muted-foreground">+$12 vs OTAs</p>
            </CardContent>
          </Card>
        </div>

        {/* Booking Performance & Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Booking Funnel Analysis */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer className="h-5 w-5" />
                Booking Funnel Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { stage: "Website Visitors", count: 12450, percentage: 100, color: "bg-blue-500" },
                  { stage: "Room Search", count: 3820, percentage: 31, color: "bg-green-500" },
                  { stage: "Room Selection", count: 1890, percentage: 15, color: "bg-yellow-500" },
                  { stage: "Guest Details", count: 890, percentage: 7, color: "bg-orange-500" },
                  { stage: "Payment", count: 520, percentage: 4, color: "bg-red-500" },
                  { stage: "Completed Bookings", count: 398, percentage: 3.2, color: "bg-purple-500" }
                ].map((step, index) => (
                  <div key={step.stage} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{step.stage}</span>
                      <div className="text-right">
                        <span className="font-bold">{step.count.toLocaleString()}</span>
                        <span className="text-sm text-muted-foreground ml-2">({step.percentage}%)</span>
                      </div>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${step.color}`}
                        style={{ width: `${step.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-2">Conversion Insights</div>
                <div className="text-sm text-muted-foreground">
                  Biggest drop-off occurs at payment stage. Consider simplifying checkout process
                  or offering more payment options to improve conversion.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Traffic Sources & Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Traffic Sources
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { source: "Direct", percentage: 35, bookings: 86, revenue: "$14,920" },
                  { source: "Google Organic", percentage: 28, bookings: 69, revenue: "$11,850" },
                  { source: "Google Ads", percentage: 18, bookings: 44, revenue: "$7,650" },
                  { source: "Social Media", percentage: 12, bookings: 29, revenue: "$5,120" },
                  { source: "Email Marketing", percentage: 7, bookings: 17, revenue: "$3,310" }
                ].map((source) => (
                  <div key={source.source} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{source.source}</span>
                      <span className="text-sm text-muted-foreground">{source.percentage}%</span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {source.bookings} bookings • {source.revenue}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Performance & Upsells */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Mobile vs Desktop Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Device Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">68%</div>
                    <div className="text-sm text-muted-foreground">Mobile Traffic</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion</span>
                      <span className="font-medium">2.8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Booking</span>
                      <span className="font-medium">$168</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold">32%</div>
                    <div className="text-sm text-muted-foreground">Desktop Traffic</div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Conversion</span>
                      <span className="font-medium">4.1%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Booking</span>
                      <span className="font-medium">$185</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium">Recommendation</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Optimize mobile checkout experience to improve conversion rate
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upsells & Add-ons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Upsells & Add-ons
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { item: "Room Upgrade", acceptance: 23, revenue: "$3,450" },
                  { item: "Breakfast Package", acceptance: 45, revenue: "$2,880" },
                  { item: "Spa Services", acceptance: 18, revenue: "$2,160" },
                  { item: "Late Checkout", acceptance: 31, revenue: "$1,240" },
                  { item: "Parking", acceptance: 67, revenue: "$2,010" }
                ].map((upsell) => (
                  <div key={upsell.item} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{upsell.item}</div>
                      <div className="text-sm text-muted-foreground">
                        {upsell.acceptance}% acceptance rate
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{upsell.revenue}</div>
                      <div className="text-sm text-muted-foreground">This month</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">
                Configure Upsells
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
} 