import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useWorkflowBuilder } from "@/contexts/WorkflowBuilderContext"
import { useToast } from "@/hooks/use-toast"
import { 
  Plus, 
  Workflow,
  Clock,
  CheckCircle
} from "lucide-react"

interface AddWorkflowStepProps {
  systemName: string
  systemIcon: React.ComponentType<any>
  suggestedActions?: string[]
  presetActions: string[]
}

export const AddWorkflowStep: React.FC<AddWorkflowStepProps> = ({ 
  systemName, 
  systemIcon,
  suggestedActions = [],
  presetActions
}) => {
  const { isBuilding, addStep, draftWorkflow } = useWorkflowBuilder()
  const { toast } = useToast()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [stepForm, setStepForm] = useState({
    name: '',
    action: '',
    additionalInfo: '',
    duration: 2000
  })

  if (!isBuilding) {
    return null
  }

  const handleAddStep = () => {
    if (stepForm.name && stepForm.action) {
      const stepData = stepForm.additionalInfo 
        ? `${stepForm.action} (${stepForm.additionalInfo})`
        : stepForm.action
        
      addStep({
        name: stepForm.name,
        system: systemName,
        icon: systemIcon,
        data: stepData,
        duration: stepForm.duration
      })
      
      setStepForm({
        name: '',
        action: '',
        additionalInfo: '',
        duration: 2000
      })
      
      setDialogOpen(false)
      
      toast({
        title: "Step Added",
        description: `Added "${stepForm.name}" to workflow "${draftWorkflow?.title}"`,
      })
    }
  }

  const handleSuggestedAction = (action: string) => {
    setStepForm(prev => ({
      ...prev,
      name: action,
      action: action,
      additionalInfo: ''
    }))
  }

  // Define which actions need additional information
  const getAdditionalInfoConfig = (action: string, systemName: string) => {
    const configs = {
      // Guest-related actions
      'Check-in guest': { type: 'guest', label: 'Guest Name/ID' },
      'Check-out guest': { type: 'guest', label: 'Guest Name/ID' },
      'Update guest profile': { type: 'guest', label: 'Guest Name/ID' },
      'Update guest profile information': { type: 'guest', label: 'Guest Name/ID' },
      'Send welcome email to guest': { type: 'guest', label: 'Guest Name/Email' },
      'Process guest payment': { type: 'guest-payment', label: 'Guest Name & Amount' },
      'Generate guest folio': { type: 'guest', label: 'Guest Name/ID' },
      'Handle no-show guest': { type: 'guest', label: 'Guest Name/ID' },
      'Upgrade guest room': { type: 'guest-room', label: 'Guest Name & New Room' },
      'Transfer guest to another room': { type: 'guest-room', label: 'Guest Name & New Room' },
      
      // Room-related actions
      'Assign room to guest': { type: 'room', label: 'Room Number' },
      'Schedule room cleaning task': { type: 'room', label: 'Room Number' },
      'Update room status to clean': { type: 'room', label: 'Room Number' },
      'Prepare room for arrival': { type: 'room', label: 'Room Number' },
      'Complete checkout cleaning': { type: 'room', label: 'Room Number' },
      'Mark room out of order': { type: 'room-reason', label: 'Room Number & Reason' },
      'Update room status': { type: 'room-status', label: 'Room Number & Status' },
      'Assign cleaning staff to room': { type: 'room-staff', label: 'Room Number & Staff Name' },
      
      // Payment-related actions
      'Process payment': { type: 'payment', label: 'Amount & Method' },
      'Process cash payment': { type: 'amount', label: 'Amount' },
      'Process credit card payment': { type: 'amount', label: 'Amount' },
      'Add tip to transaction': { type: 'amount', label: 'Tip Amount' },
      'Apply discount to order': { type: 'discount', label: 'Discount % or Amount' },
      'Apply discount to reservation': { type: 'discount', label: 'Discount % or Amount' },
      'Process refund': { type: 'amount', label: 'Refund Amount' },
      'Add charges to folio': { type: 'charge', label: 'Charge Type & Amount' },
      'Charge order to guest room': { type: 'room', label: 'Room Number' },
      
      // Rate/Price related
      'Update room rates and pricing': { type: 'rate', label: 'Rate Type & Amount' },
      'Sync rates across all channels': { type: 'rate', label: 'Rate Type & Amount' },
      'Sync promotional rates': { type: 'rate', label: 'Promo Rate & Dates' },
      
      // Date/Time related
      'Set wake-up call': { type: 'time', label: 'Wake-up Time' },
      'Update arrival/departure dates': { type: 'dates', label: 'Check-in & Check-out Dates' },
      'Schedule deep cleaning': { type: 'datetime', label: 'Scheduled Date & Time' },
      'Manage blackout dates': { type: 'dates', label: 'Blackout Date Range' },
      'Update minimum stay requirements': { type: 'number', label: 'Minimum Nights' },
      
      // User/Staff related
      'Create new user account': { type: 'user', label: 'Username & Role' },
      'Update user permissions': { type: 'user', label: 'Username & New Permissions' },
      
      // Communication related
      'Send promotional email campaign': { type: 'campaign', label: 'Campaign Name & Target Audience' },
      'Send birthday/anniversary offer': { type: 'guest', label: 'Guest Name/ID' },
      'Process guest complaint': { type: 'complaint', label: 'Guest Name & Issue Description' },
      'Send post-stay survey request': { type: 'guest', label: 'Guest Name/Email' },
      
      // Maintenance related
      'Report maintenance issue': { type: 'maintenance', label: 'Issue Description & Priority' },
      'Complete maintenance work order': { type: 'workorder', label: 'Work Order ID' },
      
      // Inventory/Menu related
      'Update menu availability': { type: 'menu', label: 'Menu Item & Status' },
      'Update inventory levels': { type: 'inventory', label: 'Item & Quantity' },
      'Restock room amenities': { type: 'room-items', label: 'Room Number & Items' },
      
      // Table/Order related (POS)
      'Transfer order to another table': { type: 'table', label: 'From Table & To Table' },
      'Close check/table': { type: 'table', label: 'Table Number' },
      'Split bill between guests': { type: 'split', label: 'Number of Ways to Split' },
      
      // OTA/Channel related
      'Process new booking from OTA': { type: 'booking', label: 'OTA Name & Booking ID' },
      'Handle booking cancellation': { type: 'booking', label: 'Booking ID & Reason' },
      'Process booking modification': { type: 'booking', label: 'Booking ID & Changes' },
    }

    return configs[action] || null
  }

  return (
    <>
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Workflow className="h-5 w-5" />
            Add to Workflow: {draftWorkflow?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-blue-700">
            Add a step to your workflow from this {systemName} page. This provides system-specific context and data for accurate workflow configuration.
          </p>
          
          {suggestedActions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-blue-800">Common Actions</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleSuggestedAction(action)
                      setDialogOpen(true)
                    }}
                    className="text-xs border-blue-200 hover:bg-blue-100"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          <Button
            onClick={() => setDialogOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add {systemName} Step
          </Button>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {systemName} Step</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="stepName">Step Name</Label>
              <Input
                id="stepName"
                placeholder={`e.g., Update guest profile in ${systemName}`}
                value={stepForm.name}
                onChange={(e) => setStepForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="stepAction">Step Action</Label>
              <Select
                value={stepForm.action}
                onValueChange={(value) => setStepForm(prev => ({ ...prev, action: value, additionalInfo: '' }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${systemName} action...`} />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {presetActions.map((action, index) => (
                    <SelectItem key={index} value={action}>
                      {action}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Additional Information Field */}
            {stepForm.action && getAdditionalInfoConfig(stepForm.action, systemName) && (
              <div>
                <Label htmlFor="additionalInfo">
                  {getAdditionalInfoConfig(stepForm.action, systemName)?.label}
                </Label>
                {(() => {
                  const config = getAdditionalInfoConfig(stepForm.action, systemName)
                  
                  switch (config?.type) {
                    case 'guest':
                      return (
                        <Select
                          value={stepForm.additionalInfo}
                          onValueChange={(value) => setStepForm(prev => ({ ...prev, additionalInfo: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select guest..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="John Smith (Room 101)">John Smith (Room 101)</SelectItem>
                            <SelectItem value="Sarah Johnson (Room 205)">Sarah Johnson (Room 205)</SelectItem>
                            <SelectItem value="Michael Brown (Room 312)">Michael Brown (Room 312)</SelectItem>
                            <SelectItem value="Emily Davis (Room 408)">Emily Davis (Room 408)</SelectItem>
                            <SelectItem value="David Wilson (Room 156)">David Wilson (Room 156)</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    
                    case 'room':
                    case 'room-status':
                    case 'room-reason':
                    case 'room-staff':
                    case 'room-items':
                      return (
                        <Select
                          value={stepForm.additionalInfo}
                          onValueChange={(value) => setStepForm(prev => ({ ...prev, additionalInfo: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select room..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="101 - Standard King">101 - Standard King</SelectItem>
                            <SelectItem value="205 - Deluxe Queen">205 - Deluxe Queen</SelectItem>
                            <SelectItem value="312 - Junior Suite">312 - Junior Suite</SelectItem>
                            <SelectItem value="408 - Executive Suite">408 - Executive Suite</SelectItem>
                            <SelectItem value="156 - Standard Double">156 - Standard Double</SelectItem>
                          </SelectContent>
                        </Select>
                      )
                    
                    case 'table':
                      return (
                        <Select
                          value={stepForm.additionalInfo}
                          onValueChange={(value) => setStepForm(prev => ({ ...prev, additionalInfo: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select table..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Table 1">Table 1</SelectItem>
                            <SelectItem value="Table 2">Table 2</SelectItem>
                            <SelectItem value="Table 3">Table 3</SelectItem>
                            <SelectItem value="Table 4">Table 4</SelectItem>
                            <SelectItem value="Table 5">Table 5</SelectItem>
                            <SelectItem value="Bar Counter">Bar Counter</SelectItem>
                          </SelectContent>
                        </Select>
                      )

                    case 'user':
                      return (
                        <Select
                          value={stepForm.additionalInfo}
                          onValueChange={(value) => setStepForm(prev => ({ ...prev, additionalInfo: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select user..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin@hotel.com - Administrator">admin@hotel.com - Administrator</SelectItem>
                            <SelectItem value="manager@hotel.com - Manager">manager@hotel.com - Manager</SelectItem>
                            <SelectItem value="frontdesk@hotel.com - Front Desk">frontdesk@hotel.com - Front Desk</SelectItem>
                            <SelectItem value="housekeeping@hotel.com - Housekeeping">housekeeping@hotel.com - Housekeeping</SelectItem>
                          </SelectContent>
                        </Select>
                      )

                    default:
                      return (
                        <Input
                          id="additionalInfo"
                          placeholder={config?.label || 'Enter additional information...'}
                          value={stepForm.additionalInfo}
                          onChange={(e) => setStepForm(prev => ({ ...prev, additionalInfo: e.target.value }))}
                        />
                      )
                  }
                })()}
              </div>
            )}
            
            <div>
              <Label htmlFor="stepDuration">Duration (milliseconds)</Label>
              <Input
                id="stepDuration"
                type="number"
                min="500"
                max="10000"
                step="500"
                value={stepForm.duration}
                onChange={(e) => setStepForm(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                How long this step takes to complete during workflow playback
              </p>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-blue-800">
                <Clock className="h-4 w-4" />
                <span className="font-medium text-sm">Preview</span>
              </div>
              <div className="mt-2 text-sm text-blue-700">
                <strong>{stepForm.name || 'Step Name'}</strong> in <strong>{systemName}</strong>
                <br />
                <span className="text-blue-600">
                  {stepForm.action || 'Select an action...'}
                  {stepForm.additionalInfo && stepForm.action && (
                    <span className="text-blue-500"> ({stepForm.additionalInfo})</span>
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleAddStep}
                disabled={!stepForm.name || !stepForm.action || (getAdditionalInfoConfig(stepForm.action, systemName) && !stepForm.additionalInfo)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Add Step
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
} 