import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle, 
  Clock,
  Wifi,
  Calendar,
  ShoppingCart,
  Users,
  CreditCard,
  Smartphone,
  Sparkles,
  MessageSquare,
  BarChart3,
  Mail,
  Plus,
  Trash2,
  Edit,
  Save,
  X
} from "lucide-react"
import React, { useState, useEffect } from "react"
import { useWorkflowBuilder } from "@/contexts/WorkflowBuilderContext"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

// Available systems for workflow steps
const availableSystems = [
  { name: "Booking.com", icon: Wifi },
  { name: "SiteMinder", icon: ArrowRight },
  { name: "Cloudbeds", icon: Calendar },
  { name: "Alice", icon: Sparkles },
  { name: "Salesforce", icon: Users },
  { name: "Stripe", icon: CreditCard },
  { name: "Toast POS", icon: ShoppingCart },
  { name: "QuickBooks", icon: BarChart3 },
  { name: "Google Analytics", icon: BarChart3 },
  { name: "Email Campaign", icon: Mail },
  { name: "Mobile Key", icon: Smartphone },
  { name: "Survey Tool", icon: MessageSquare }
]

// Workflow definitions
const workflows: Workflow[] = [
  {
    id: 1,
    title: "Online Booking → Check-In → Room Access",
    description: "Complete guest journey from online booking through digital room access",
    systems: ["Channel Manager", "PMS", "Housekeeping", "CRM", "Payment Gateway", "Mobile Key"],
    steps: [
      { 
        name: "Guest Books Online", 
        system: "Booking.com", 
        icon: Wifi, 
        data: "Guest: John Smith, Room: Deluxe King, Dates: Dec 20-23",
        duration: 2000 
      },
      { 
        name: "Sync to Channel Manager", 
        system: "SiteMinder", 
        icon: ArrowRight, 
        data: "Booking ID: BK-2024-001, Status: Confirmed",
        duration: 1500 
      },
      { 
        name: "Update PMS", 
        system: "Cloudbeds", 
        icon: Calendar, 
        data: "Room 2047 assigned, Folio created",
        duration: 2000 
      },
      { 
        name: "Schedule Housekeeping", 
        system: "Alice", 
        icon: Sparkles, 
        data: "Room prep scheduled for Dec 20 2PM",
        duration: 1500 
      },
      { 
        name: "CRM Profile Update", 
        system: "Salesforce", 
        icon: Users, 
        data: "Guest profile updated, preferences loaded",
        duration: 1800 
      },
      { 
        name: "Process Payment", 
        system: "Stripe", 
        icon: CreditCard, 
        data: "Deposit $150 collected successfully",
        duration: 2200 
      },
      { 
        name: "Send Mobile Key", 
        system: "Mobile Key", 
        icon: Smartphone, 
        data: "Digital key sent via SMS/App",
        duration: 1000 
      }
    ]
  },
  {
    id: 2,
    title: "Restaurant Billing → Room Charge → Checkout",
    description: "Guest dining experience with seamless room charging and checkout",
    systems: ["POS", "PMS", "Billing", "Payment Gateway", "CRM"],
    steps: [
      { 
        name: "Guest Orders Food", 
        system: "Toast POS", 
        icon: ShoppingCart, 
        data: "Table 12: Caesar Salad, Steak, Wine - $78.50",
        duration: 3000 
      },
      { 
        name: "Charge to Room", 
        system: "Toast POS", 
        icon: Calendar, 
        data: "Room 2047 charged, Guest: John Smith",
        duration: 1500 
      },
      { 
        name: "Update Guest Folio", 
        system: "Cloudbeds", 
        icon: Calendar, 
        data: "F&B charge $78.50 added to folio",
        duration: 2000 
      },
      { 
        name: "Billing System Sync", 
        system: "QuickBooks", 
        icon: BarChart3, 
        data: "Revenue posted to F&B department",
        duration: 1800 
      },
      { 
        name: "Checkout Process", 
        system: "Cloudbeds", 
        icon: CheckCircle, 
        data: "Total: Room $432 + F&B $78.50 = $510.50",
        duration: 2500 
      },
      { 
        name: "Final Payment", 
        system: "Stripe", 
        icon: CreditCard, 
        data: "Payment processed successfully",
        duration: 2000 
      },
      { 
        name: "Send Receipt", 
        system: "Salesforce", 
        icon: Mail, 
        data: "Digital receipt emailed to guest",
        duration: 1000 
      }
    ]
  },
  {
    id: 3,
    title: "Post-Stay Feedback → Retargeting Campaign",
    description: "Guest feedback collection and automated marketing follow-up",
    systems: ["PMS", "CRM", "Analytics", "Email Marketing"],
    steps: [
      { 
        name: "Checkout Complete", 
        system: "Cloudbeds", 
        icon: CheckCircle, 
        data: "Guest checked out, stay data compiled",
        duration: 2000 
      },
      { 
        name: "Export to CRM", 
        system: "Salesforce", 
        icon: Users, 
        data: "Stay details, preferences, spend data",
        duration: 1500 
      },
      { 
        name: "Send Thank You", 
        system: "Salesforce", 
        icon: Mail, 
        data: "Thank you email with feedback survey link",
        duration: 2000 
      },
      { 
        name: "Guest Completes Survey", 
        system: "Survey Tool", 
        icon: MessageSquare, 
        data: "Rating: 4.5/5, Comments: Great service!",
        duration: 4000 
      },
      { 
        name: "Analytics Update", 
        system: "Google Analytics", 
        icon: BarChart3, 
        data: "Guest satisfaction score updated",
        duration: 1800 
      },
      { 
        name: "Generate Retargeting", 
        system: "Salesforce", 
        icon: Users, 
        data: "VIP upgrade offer for return visit",
        duration: 2200 
      },
      { 
        name: "Send Promo Email", 
        system: "Email Campaign", 
        icon: Mail, 
        data: "Personalized offer: 20% off suite upgrade",
        duration: 1500 
      }
    ]
  }
]

interface WorkflowStep {
  name: string
  system: string
  icon: React.ComponentType<any>
  data: string
  duration: number
}

interface Workflow {
  id: number
  title: string
  description: string
  systems: string[]
  steps: WorkflowStep[]
  isCustom?: boolean
}

const WorkflowsPage = () => {
  const [activeWorkflow, setActiveWorkflow] = useState<number>(1)
  const [isRunning, setIsRunning] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [customWorkflows, setCustomWorkflows] = useState<Workflow[]>([])
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState<Partial<Workflow>>({
    title: "",
    description: "",
    steps: []
  })
  const [currentStepForm, setCurrentStepForm] = useState<Partial<WorkflowStep>>({
    name: "",
    system: "",
    data: "",
    duration: 2000
  })

  const allWorkflows = [...workflows, ...customWorkflows]
  const currentWorkflowData = allWorkflows.find(w => w.id === activeWorkflow)!

  useEffect(() => {
    let interval: NodeJS.Timeout
    
    if (isRunning && currentStep < currentWorkflowData.steps.length) {
      const stepDuration = currentWorkflowData.steps[currentStep].duration
      let elapsed = 0
      
      interval = setInterval(() => {
        elapsed += 100
        const stepProgress = (elapsed / stepDuration) * 100
        setProgress(((currentStep) / currentWorkflowData.steps.length) * 100 + (stepProgress / currentWorkflowData.steps.length))
        
        if (elapsed >= stepDuration) {
          if (currentStep < currentWorkflowData.steps.length - 1) {
            setCurrentStep(prev => prev + 1)
          } else {
            setIsRunning(false)
          }
        }
      }, 100)
    }

    return () => clearInterval(interval)
  }, [isRunning, currentStep, currentWorkflowData])

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const handleWorkflowChange = (workflowId: number) => {
    setActiveWorkflow(workflowId)
    handleReset()
  }

  const { startWorkflow, finalizeWorkflow: finalizeDraftWorkflow } = useWorkflowBuilder()

  const handleCreateWorkflow = () => {
    setNewWorkflow({
      title: "",
      description: "",
      steps: []
    })
    setCreateDialogOpen(true)
  }

  const handleStartDraftWorkflow = () => {
    if (newWorkflow.title && newWorkflow.description) {
      startWorkflow(newWorkflow.title, newWorkflow.description)
      setCreateDialogOpen(false)
      setNewWorkflow({
        title: "",
        description: "",
        steps: []
      })
    }
  }

  const handleAddStep = () => {
    if (currentStepForm.name && currentStepForm.system && currentStepForm.data) {
      const selectedSystem = availableSystems.find(s => s.name === currentStepForm.system)
      const newStep: WorkflowStep = {
        name: currentStepForm.name!,
        system: currentStepForm.system!,
        icon: selectedSystem?.icon || MessageSquare,
        data: currentStepForm.data!,
        duration: currentStepForm.duration || 2000
      }
      
      setNewWorkflow(prev => ({
        ...prev,
        steps: [...(prev.steps || []), newStep]
      }))
      
      setCurrentStepForm({
        name: "",
        system: "",
        data: "",
        duration: 2000
      })
    }
  }

  const handleRemoveStep = (index: number) => {
    setNewWorkflow(prev => ({
      ...prev,
      steps: prev.steps?.filter((_, i) => i !== index) || []
    }))
  }

  const handleSaveWorkflow = () => {
    if (newWorkflow.title && newWorkflow.description && newWorkflow.steps && newWorkflow.steps.length > 0) {
      const workflow: Workflow = {
        id: Date.now(),
        title: newWorkflow.title,
        description: newWorkflow.description,
        systems: [...new Set(newWorkflow.steps.map(s => s.system))],
        steps: newWorkflow.steps,
        isCustom: true
      }
      
      setCustomWorkflows(prev => [...prev, workflow])
      setCreateDialogOpen(false)
      setActiveWorkflow(workflow.id)
      handleReset()
    }
  }

  const handleDeleteWorkflow = (workflowId: number) => {
    setCustomWorkflows(prev => prev.filter(w => w.id !== workflowId))
    if (activeWorkflow === workflowId) {
      setActiveWorkflow(1)
      handleReset()
    }
  }

  return (
    <>
      {/* Create Workflow Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Custom Workflow</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Workflow Details */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Workflow Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Guest Complaint Resolution"
                  value={newWorkflow.title || ""}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of what this workflow accomplishes"
                  value={newWorkflow.description || ""}
                  onChange={(e) => setNewWorkflow(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
            </div>

                         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
               <h3 className="font-semibold text-blue-800 mb-2">New Approach! 🚀</h3>
               <p className="text-sm text-blue-700 mb-3">
                 Create your workflow title and description here, then navigate to individual system pages 
                 (PMS, CRM, POS, etc.) to add steps with real context and data.
               </p>
               <div className="text-xs text-blue-600">
                 ✨ This gives you access to actual system features and realistic step creation
               </div>
             </div>

            {/* Save/Cancel */}
                         <div className="flex justify-end gap-3">
               <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                 Cancel
               </Button>
               <Button
                 onClick={handleStartDraftWorkflow}
                 disabled={!newWorkflow.title || !newWorkflow.description}
                 className="bg-blue-600 hover:bg-blue-700"
               >
                 <Plus className="h-4 w-4 mr-2" />
                 Start Building Workflow
               </Button>
             </div>
          </div>
        </DialogContent>
      </Dialog>

      <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Hotel Integration Workflows</h1>
          <p className="text-muted-foreground">
            Interactive demonstrations of real hotel workflows showing how multiple systems work together seamlessly
          </p>
        </div>

        {/* Workflow Selection */}
        <div className="flex gap-4 overflow-x-auto pb-2">
          {allWorkflows.map((workflow) => (
            <div key={workflow.id} className="flex items-center gap-2">
              <Button
                variant={activeWorkflow === workflow.id ? "default" : "outline"}
                onClick={() => handleWorkflowChange(workflow.id)}
                className="whitespace-nowrap"
              >
                {workflow.title}
              </Button>
              {workflow.isCustom && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="p-2 h-8 w-8"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
          <Button
            variant="outline"
            onClick={handleCreateWorkflow}
            className="whitespace-nowrap"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Workflow
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Workflow Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Workflow Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{currentWorkflowData.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {currentWorkflowData.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-xs text-muted-foreground">
                    Step {Math.min(currentStep + 1, currentWorkflowData.steps.length)} of {currentWorkflowData.steps.length}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleStart}
                    disabled={isRunning || progress >= 100}
                    className="flex-1"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    {progress >= 100 ? "Complete" : "Start"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handlePause}
                    disabled={!isRunning}
                  >
                    <Pause className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleReset}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-sm mb-2">Systems Involved</h4>
                <div className="flex flex-wrap gap-1">
                  {currentWorkflowData.systems.map((system, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workflow Visualization */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                Workflow Steps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentWorkflowData.steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === currentStep && isRunning
                  const isCompleted = index < currentStep || (index === currentStep && progress >= ((index + 1) / currentWorkflowData.steps.length) * 100)
                  const isCurrent = index === currentStep

                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-500 ${
                        isActive ? 'bg-blue-50 border-blue-200 shadow-sm' :
                        isCompleted ? 'bg-green-50 border-green-200' :
                        isCurrent ? 'bg-orange-50 border-orange-200' :
                        'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className={`p-2 rounded-full transition-colors ${
                        isActive ? 'bg-blue-100 text-blue-600 animate-pulse' :
                        isCompleted ? 'bg-green-100 text-green-600' :
                        isCurrent ? 'bg-orange-100 text-orange-600' :
                        'bg-gray-100 text-gray-400'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : isActive ? (
                          <Clock className="h-5 w-5" />
                        ) : (
                          <Icon className="h-5 w-5" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm">{step.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {step.system}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {step.data}
                        </p>
                        {isActive && (
                          <div className="mt-2">
                            <div className="h-1 bg-blue-200 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-500 transition-all duration-100 ease-out"
                                style={{
                                  width: `${((progress - (index / currentWorkflowData.steps.length) * 100) / (100 / currentWorkflowData.steps.length)) * 100}%`
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Seamless Experience</h3>
                <p className="text-sm text-muted-foreground">
                  Guests enjoy frictionless interactions across all touchpoints
                </p>
              </div>
              <div className="text-center p-4">
                <BarChart3 className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Operational Efficiency</h3>
                <p className="text-sm text-muted-foreground">
                  Automated workflows reduce manual tasks and human error
                </p>
              </div>
              <div className="text-center p-4">
                <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Personalized Service</h3>
                <p className="text-sm text-muted-foreground">
                  Data flows enable tailored experiences and targeted offers
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Workflow Builder Component */}
      <WorkflowBuilder />
    </AppShell>
    </>
  )
}

export default WorkflowsPage 