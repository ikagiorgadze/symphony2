import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { ScrollArea } from "./scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { GitBranch, Play, Pause, RotateCcw, Settings, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface RoutingRule {
  id: string
  name: string
  trigger: string
  actions: string[]
  status: "active" | "paused" | "error"
  success_rate: number
}

interface ActiveFlow {
  id: string
  guest_name: string
  room: string
  intent: string
  current_step: string
  progress: number
  timestamp: string
}

export function RoutingVisualizer() {
  const { toast } = useToast()
  const [selectedRule, setSelectedRule] = useState<string | null>(null)

  const routingRules: RoutingRule[] = [
    {
      id: "rule_1",
      name: "Late Checkout Request",
      trigger: "Intent: Late Checkout",
      actions: ["Check PMS availability", "Update folio", "Notify housekeeping"],
      status: "active",
      success_rate: 94
    },
    {
      id: "rule_2", 
      name: "Room Service Order",
      trigger: "Intent: Food & Beverage",
      actions: ["Create POS order", "Charge to room", "Dispatch to kitchen"],
      status: "active",
      success_rate: 89
    },
    {
      id: "rule_3",
      name: "Maintenance Request",
      trigger: "Intent: Room Issue",
      actions: ["Create work order", "Assign technician", "Update room status"],
      status: "paused",
      success_rate: 76
    }
  ]

  const activeFlows: ActiveFlow[] = [
    {
      id: "flow_1",
      guest_name: "Sarah Chen",
      room: "204",
      intent: "Late Checkout",
      current_step: "Updating PMS",
      progress: 66,
      timestamp: "2 min ago"
    },
    {
      id: "flow_2",
      guest_name: "Mike Johnson", 
      room: "312",
      intent: "Room Service",
      current_step: "Kitchen Preparation",
      progress: 85,
      timestamp: "5 min ago"
    }
  ]

  const handleToggleRule = (ruleId: string) => {
    const rule = routingRules.find(r => r.id === ruleId)
    toast({
      title: `Rule ${rule?.status === 'active' ? 'Paused' : 'Activated'}`,
      description: `${rule?.name} has been ${rule?.status === 'active' ? 'paused' : 'activated'}`,
    })
  }

  const handleResetFlow = (flowId: string) => {
    const flow = activeFlows.find(f => f.id === flowId)
    toast({
      title: "Flow Reset",
      description: `${flow?.guest_name}'s request has been reset and will retry automatically`,
    })
  }

  const getMermaidDiagram = () => {
    return `
    graph TD
      A[Guest Chat Input] --> B[Intent Detection]
      B --> C{Intent Type}
      C -->|Late Checkout| D[Check PMS Availability]
      C -->|Room Service| E[Create POS Order]
      C -->|Maintenance| F[Create Work Order]
      
      D --> G[Update Folio]
      G --> H[Notify Housekeeping]
      
      E --> I[Charge to Room]
      I --> J[Dispatch to Kitchen]
      
      F --> K[Assign Technician]
      K --> L[Update Room Status]
      
      H --> M[Send Confirmation]
      J --> M
      L --> M
      
      M --> N[Complete]
      
      style A fill:#e1f5fe
      style N fill:#e8f5e8
      style C fill:#fff3e0
    `
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            Symphony Routing Visualizer
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              Live
            </Badge>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="flows" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
            <TabsTrigger value="flows">Active Flows</TabsTrigger>
            <TabsTrigger value="rules">Routing Rules</TabsTrigger>
            <TabsTrigger value="diagram">Flow Diagram</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flows" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Live Guest Request Flows</h3>
              <Badge variant="secondary">{activeFlows.length} Active</Badge>
            </div>
            
            <ScrollArea className="h-[300px] sm:h-[400px]">
              <div className="space-y-3">
                {activeFlows.map((flow) => (
                  <div key={flow.id} className="p-4 border border-border rounded-lg bg-background/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{flow.guest_name} - Room {flow.room}</h4>
                        <p className="text-sm text-muted-foreground">{flow.intent}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{flow.timestamp}</Badge>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleResetFlow(flow.id)}
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Current Step:</span>
                        <span className="font-medium">{flow.current_step}</span>
                      </div>
                      
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${flow.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{flow.progress}% Complete</span>
                        <span>Est. 2 min remaining</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="rules" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Automation Rules</h3>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
            
            <div className="space-y-3">
              {routingRules.map((rule) => (
                <div key={rule.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge 
                          variant={rule.status === 'active' ? 'default' : rule.status === 'paused' ? 'secondary' : 'destructive'}
                        >
                          {rule.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.trigger}</p>
                    </div>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToggleRule(rule.id)}
                      className="gap-2"
                    >
                      {rule.status === 'active' ? (
                        <>
                          <Pause className="h-4 w-4" />
                          Pause
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Actions:</p>
                      <div className="flex flex-wrap gap-1">
                        {rule.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Success Rate:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-secondary rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full" 
                            style={{ width: `${rule.success_rate}%` }}
                          ></div>
                        </div>
                        <span className="font-medium">{rule.success_rate}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="diagram" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Request Flow Diagram</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Zap className="h-4 w-4 mr-2" />
                  Simulate
                </Button>
              </div>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-background/50">
              <div className="text-center text-muted-foreground">
                <GitBranch className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h4 className="text-lg font-medium mb-2">Interactive Flow Diagram</h4>
                <p className="text-sm mb-4">
                  Visual representation of how guest requests flow through the Symphony system
                </p>
                <div className="bg-muted/50 p-4 rounded-lg text-left max-w-2xl mx-auto">
                  <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
                    {getMermaidDiagram()}
                  </pre>
                </div>
                <p className="text-xs mt-4 text-muted-foreground">
                  Mermaid diagram - in production, this would render as an interactive visual diagram
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}