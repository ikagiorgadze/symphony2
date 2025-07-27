import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface CardMetricProps {
  title: string
  value: string | number
  change?: {
    value: string
    trend: 'up' | 'down' | 'flat'
  }
  icon?: LucideIcon
  className?: string
}

export function CardMetric({ title, value, change, icon: Icon, className }: CardMetricProps) {
  return (
    <Card className={cn("transition-all hover:shadow-layer-2", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {Icon && (
          <Icon className="h-4 w-4 text-muted-foreground" />
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={cn(
            "text-xs",
            change.trend === 'up' ? "text-success" : 
            change.trend === 'down' ? "text-destructive" : 
            "text-muted-foreground"
          )}>
            {change.value}
          </p>
        )}
      </CardContent>
    </Card>
  )
}