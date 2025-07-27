import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  Star, 
  AlertTriangle, 
  Gift, 
  Coffee, 
  Wifi, 
  Car,
  Clock,
  Heart,
  CheckCircle,
  X
} from "lucide-react"

// Mock guest data for check-in demo
const checkingInGuest = {
  id: "G001",
  name: "Sarah Johnson",
  roomNumber: "405",
  vipStatus: "Platinum",
  arrivalTime: "3:00 PM",
  nights: 3,
  preferences: ["High floor", "King bed", "Late checkout"],
  lastComplaint: {
    type: "Room cleanliness",
    severity: "critical",
    recoveryScore: 85,
    suggestedAction: "Complimentary spa treatment"
  },
  insights: [
    {
      icon: Gift,
      action: "Upgrade to suite",
      reason: "Platinum member arriving on birthday",
      priority: "high"
    },
    {
      icon: Coffee,
      action: "Welcome amenity",
      reason: "Preferred coffee blend from previous stay",
      priority: "medium"
    },
    {
      icon: Clock,
      action: "Late checkout approved",
      reason: "Preference noted in profile",
      priority: "low"
    }
  ]
}

export function GuestCheckinModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [completedActions, setCompletedActions] = useState<string[]>([])
  const { toast } = useToast()

  const handleActionComplete = (action: string) => {
    setCompletedActions(prev => [...prev, action])
    toast({
      title: "Action Completed",
      description: `${action} has been processed for ${checkingInGuest.name}`,
    })
  }

  const handleDismissInsight = (action: string) => {
    toast({
      title: "Insight Dismissed",
      description: "This suggestion will not be shown again for this stay.",
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50'
      case 'medium': return 'border-yellow-200 bg-yellow-50'
      case 'low': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700'
      case 'medium': return 'bg-yellow-100 text-yellow-700'
      case 'low': return 'bg-blue-100 text-blue-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90">
          <User className="w-4 h-4 mr-2" />
          Simulate Check-in
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <User className="w-5 h-5 mr-2" />
            Guest Check-in: {checkingInGuest.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Guest Summary */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{checkingInGuest.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="default">
                        <Star className="w-3 h-3 mr-1" />
                        {checkingInGuest.vipStatus}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Room {checkingInGuest.roomNumber} • {checkingInGuest.nights} nights
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Expected</div>
                  <div className="font-semibold">{checkingInGuest.arrivalTime}</div>
                </div>
              </div>

              {/* Preferences */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Preferences</h4>
                <div className="flex flex-wrap gap-2">
                  {checkingInGuest.preferences.map((pref, index) => (
                    <Badge key={index} variant="outline" className="bg-white/50">
                      {pref}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Recovery Alert */}
              {checkingInGuest.lastComplaint && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-yellow-800">
                        Previous Issue: {checkingInGuest.lastComplaint.type}
                      </div>
                      <div className="text-xs text-yellow-700 mt-1">
                        Recovery Score: {checkingInGuest.lastComplaint.recoveryScore}% • 
                        Suggested: {checkingInGuest.lastComplaint.suggestedAction}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Insights & Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Heart className="w-5 h-5 mr-2 text-pink-500" />
                AI-Powered Service Insights
                <Badge variant="secondary" className="ml-2">3 suggestions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {checkingInGuest.insights.map((insight, index) => {
                  const Icon = insight.icon
                  const isCompleted = completedActions.includes(insight.action)
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        isCompleted 
                          ? 'bg-green-50 border-green-200 opacity-75' 
                          : getPriorityColor(insight.priority)
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`p-2 rounded-lg ${
                            isCompleted 
                              ? 'bg-green-100 text-green-600'
                              : 'bg-white text-primary'
                          }`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {insight.action}
                              </h4>
                              <Badge className={getPriorityBadge(insight.priority)}>
                                {insight.priority}
                              </Badge>
                            </div>
                            <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                              {insight.reason}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          {!isCompleted && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDismissInsight(insight.action)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleActionComplete(insight.action)}
                                className="bg-primary hover:bg-primary/90"
                              >
                                Complete
                              </Button>
                            </>
                          )}
                          {isCompleted && (
                            <Badge variant="default" className="bg-green-100 text-green-700">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Action Summary */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-muted-foreground">
              {completedActions.length} of {checkingInGuest.insights.length} suggestions completed
            </div>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 