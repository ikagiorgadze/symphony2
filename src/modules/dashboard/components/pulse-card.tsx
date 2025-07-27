import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CardMetric } from "@/components/ui/card-metric"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Users, Calendar, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

export function PulseCard() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const alerts = [
    { type: "warning", message: "Room 204 - Maintenance required", count: 3, priority: "high" },
    { type: "success", message: "All VIP arrivals processed", count: 8, priority: "low" },
    { type: "info", message: "Late checkouts pending", count: 5, priority: "medium" }
  ]

  const handleRefreshMetrics = async () => {
    setIsRefreshing(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
    toast({
      title: "Metrics Updated",
      description: "Live data refreshed successfully",
    })
  }

  const handleViewAlert = (alert: any) => {
    toast({
      title: "Alert Details",
      description: alert.message,
      variant: alert.type === "warning" ? "destructive" : "default"
    })
  }

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-display flex items-center gap-2">
            <div className="h-2 w-2 bg-success rounded-full animate-pulse" />
            Hotel Pulse - Live Overview
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefreshMetrics}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <CardMetric
            title="Occupancy Today"
            value="87%"
            change={{ value: "+5% vs yesterday", trend: "up" }}
            icon={Users}
          />
          <CardMetric
            title="Arrivals Remaining"
            value="23"
            change={{ value: "12 checked in", trend: "flat" }}
            icon={Calendar}
          />
          <CardMetric
            title="Revenue Today"
            value="$12,847"
            change={{ value: "+12% vs last week", trend: "up" }}
            icon={DollarSign}
          />
          <CardMetric
            title="ADR"
            value="$148"
            change={{ value: "+$8 vs last month", trend: "up" }}
            icon={TrendingUp}
          />
        </div>

        {/* System Health & Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              System Alerts & Tasks
            </h4>
            <Badge variant="outline" className="text-xs">
              {alerts.filter(a => a.type === "warning").length} Priority
            </Badge>
          </div>
          
          <div className="grid gap-3">
            {alerts.map((alert, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between p-3 border border-border rounded-lg bg-background/30 hover:bg-background/50 transition-colors cursor-pointer group"
                onClick={() => handleViewAlert(alert)}
              >
                <div className="flex items-center gap-3">
                  {alert.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-success" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                  <div className="space-y-1">
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {alert.message}
                    </span>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={alert.priority === "high" ? "destructive" : alert.priority === "medium" ? "secondary" : "outline"} 
                        className="text-xs"
                      >
                        {alert.priority} priority
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {alert.count}
                  </Badge>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-border">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">System Performance</span>
              <span className="font-medium text-success">Excellent</span>
            </div>
            <Progress value={94} className="h-2" />
            <p className="text-xs text-muted-foreground">94% uptime today</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Response Time</span>
              <span className="font-medium text-primary">Fast</span>
            </div>
            <Progress value={78} className="h-2" />
            <p className="text-xs text-muted-foreground">Avg 120ms response</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Task Completion</span>
              <span className="font-medium text-success">On Track</span>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-muted-foreground">85% completed on time</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}