import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useWorkflowBuilder } from "@/contexts/WorkflowBuilderContext"
import { 
  Workflow, 
  X, 
  CheckCircle, 
  Plus, 
  Eye, 
  EyeOff,
  Save,
  Trash2
} from "lucide-react"

export const WorkflowBuilder: React.FC = () => {
  const { 
    isBuilding, 
    draftWorkflow, 
    cancelWorkflow, 
    finalizeWorkflow, 
    removeStep,
    getStepCount 
  } = useWorkflowBuilder()
  
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  if (!isBuilding || !draftWorkflow) {
    return null
  }

  const handleFinalize = () => {
    const finalized = finalizeWorkflow()
    if (finalized) {
      // You can add logic here to save to the main workflows list
      console.log('Finalized workflow:', finalized)
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-64 bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Building Workflow</span>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="secondary" className="text-xs">
                  {getStepCount()} steps
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(false)}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Card className="w-80 bg-blue-50 border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center gap-2">
                <Workflow className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800">Workflow Builder</span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPreview(true)}
                  className="h-6 w-6 p-0"
                >
                  <Eye className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsMinimized(true)}
                  className="h-6 w-6 p-0"
                >
                  <EyeOff className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={cancelWorkflow}
                  className="h-6 w-6 p-0 text-red-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium text-blue-800">{draftWorkflow.title}</h3>
              <p className="text-xs text-blue-600 mt-1">{draftWorkflow.description}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-800">Steps ({getStepCount()})</span>
                {getStepCount() > 0 && (
                  <Button
                    size="sm"
                    onClick={handleFinalize}
                    className="bg-blue-600 hover:bg-blue-700 text-white h-7 px-3 text-xs"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Finalize
                  </Button>
                )}
              </div>
              
              {getStepCount() === 0 ? (
                                        <div className="text-center py-4 text-blue-600 text-sm">
                          <Plus className="h-6 w-6 mx-auto mb-2 opacity-50" />
                          Navigate to system pages to add steps
                        </div>
              ) : (
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {draftWorkflow.steps.map((step, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                      <div className="flex items-center gap-2 min-w-0">
                        <Badge variant="outline" className="text-xs">
                          {index + 1}
                        </Badge>
                        <div className="min-w-0">
                          <div className="text-xs font-medium truncate">{step.name}</div>
                          <div className="text-xs text-muted-foreground truncate">{step.system}</div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeStep(index)}
                        className="h-5 w-5 p-0 text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="text-xs text-blue-600 bg-blue-100 p-2 rounded">
              Navigate to system pages (PMS, CRM, etc.) to add workflow steps with system-specific context
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Workflow Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">{draftWorkflow.title}</h3>
              <p className="text-sm text-muted-foreground">{draftWorkflow.description}</p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Steps ({getStepCount()})</h4>
              {draftWorkflow.steps.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                          No steps added yet. Navigate to system pages to add steps.
                        </p>
              ) : (
                <div className="space-y-2">
                  {draftWorkflow.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Badge variant="outline">{index + 1}</Badge>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{step.name}</div>
                        <div className="text-xs text-muted-foreground">{step.system} • {step.data}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowPreview(false)}>
                Close
              </Button>
              {getStepCount() > 0 && (
                <Button onClick={handleFinalize} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Finalize Workflow
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 