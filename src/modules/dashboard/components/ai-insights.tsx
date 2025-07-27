import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, TrendingUp, AlertTriangle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface Insight {
  id: string
  type: 'optimization' | 'alert' | 'recommendation'
  title: string
  description: string
  impact: 'high' | 'medium' | 'low'
  action?: string
}

const mockInsights: Insight[] = [
  {
    id: '1',
    type: 'optimization',
    title: 'Revenue Opportunity Detected',
    description: 'Based on demand patterns, you could increase rates by 15% for weekend bookings next month.',
    impact: 'high',
    action: 'Adjust Rates'
  },
  {
    id: '2', 
    type: 'alert',
    title: 'Housekeeping Bottleneck',
    description: '3 VIP rooms are ready for checkout but housekeeping is behind schedule.',
    impact: 'high',
    action: 'Reassign Staff'
  },
  {
    id: '3',
    type: 'recommendation',
    title: 'Guest Satisfaction Boost',
    description: 'James Rodriguez (Room 2047) mentioned he loves wine. Consider a complimentary bottle.',
    impact: 'medium',
    action: 'Send Amenity'
  }
]

export function AIInsights() {
  const handleAction = (insight: Insight) => {
    switch (insight.id) {
      case '1':
        toast({
          title: "Rate Adjustment Initiated",
          description: "Weekend rates have been increased by 15% for next month.",
        })
        break
      case '2':
        toast({
          title: "Staff Reassigned",
          description: "Additional housekeeping staff assigned to VIP rooms.",
        })
        break
      case '3':
        toast({
          title: "Amenity Sent",
          description: "Complimentary wine sent to James Rodriguez in Room 2047.",
        })
        break
      default:
        toast({
          title: "Action Completed",
          description: "Your request has been processed.",
        })
    }
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI Insights
          <Badge variant="outline" className="bg-lavender-100 text-primary border-primary/20">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInsights.map((insight) => {
          const Icon = insight.type === 'optimization' ? TrendingUp :
                      insight.type === 'alert' ? AlertTriangle : Sparkles
          
          return (
            <div
              key={insight.id}
              className={cn(
                "p-4 rounded-lg border transition-all hover:shadow-layer-1",
                insight.type === 'alert' ? "bg-destructive/5 border-destructive/20" :
                insight.type === 'optimization' ? "bg-success/5 border-success/20" :
                "bg-primary/5 border-primary/20"
              )}
            >
              <div className="flex items-start gap-3">
                <Icon className={cn(
                  "h-5 w-5 mt-0.5 shrink-0",
                  insight.type === 'alert' ? "text-destructive" :
                  insight.type === 'optimization' ? "text-success" :
                  "text-primary"
                )} />
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{insight.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs",
                        insight.impact === 'high' ? "border-destructive/50 text-destructive" :
                        insight.impact === 'medium' ? "border-warning/50 text-warning" :
                        "border-muted text-muted-foreground"
                      )}
                    >
                      {insight.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                  {insight.action && (
                    <Button 
                      size="sm" 
                      variant={insight.type === 'alert' ? 'destructive' : 'default'}
                      className="text-xs"
                      onClick={() => handleAction(insight)}
                    >
                      {insight.action}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
        
        <div className="text-center pt-2">
          <Button variant="ghost" size="sm" className="text-primary">
            View All Insights
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}