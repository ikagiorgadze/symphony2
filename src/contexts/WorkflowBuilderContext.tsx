import React, { createContext, useContext, useState, ReactNode } from 'react'

interface WorkflowStep {
  name: string
  system: string
  icon: React.ComponentType<any>
  data: string
  duration: number
}

interface DraftWorkflow {
  id?: number
  title: string
  description: string
  steps: WorkflowStep[]
}

interface WorkflowBuilderContextType {
  isBuilding: boolean
  draftWorkflow: DraftWorkflow | null
  startWorkflow: (title: string, description: string) => void
  addStep: (step: WorkflowStep) => void
  removeStep: (index: number) => void
  updateStep: (index: number, step: WorkflowStep) => void
  finalizeWorkflow: () => DraftWorkflow | null
  cancelWorkflow: () => void
  getStepCount: () => number
}

const WorkflowBuilderContext = createContext<WorkflowBuilderContextType | undefined>(undefined)

export const useWorkflowBuilder = () => {
  const context = useContext(WorkflowBuilderContext)
  if (!context) {
    throw new Error('useWorkflowBuilder must be used within a WorkflowBuilderProvider')
  }
  return context
}

interface WorkflowBuilderProviderProps {
  children: ReactNode
}

export const WorkflowBuilderProvider: React.FC<WorkflowBuilderProviderProps> = ({ children }) => {
  const [isBuilding, setIsBuilding] = useState(false)
  const [draftWorkflow, setDraftWorkflow] = useState<DraftWorkflow | null>(null)

  const startWorkflow = (title: string, description: string) => {
    setDraftWorkflow({
      title,
      description,
      steps: []
    })
    setIsBuilding(true)
  }

  const addStep = (step: WorkflowStep) => {
    if (draftWorkflow) {
      setDraftWorkflow(prev => ({
        ...prev!,
        steps: [...prev!.steps, step]
      }))
    }
  }

  const removeStep = (index: number) => {
    if (draftWorkflow) {
      setDraftWorkflow(prev => ({
        ...prev!,
        steps: prev!.steps.filter((_, i) => i !== index)
      }))
    }
  }

  const updateStep = (index: number, step: WorkflowStep) => {
    if (draftWorkflow) {
      setDraftWorkflow(prev => ({
        ...prev!,
        steps: prev!.steps.map((s, i) => i === index ? step : s)
      }))
    }
  }

  const finalizeWorkflow = (): DraftWorkflow | null => {
    if (draftWorkflow && draftWorkflow.steps.length > 0) {
      const finalWorkflow = { ...draftWorkflow }
      setDraftWorkflow(null)
      setIsBuilding(false)
      return finalWorkflow
    }
    return null
  }

  const cancelWorkflow = () => {
    setDraftWorkflow(null)
    setIsBuilding(false)
  }

  const getStepCount = () => {
    return draftWorkflow?.steps.length || 0
  }

  const value: WorkflowBuilderContextType = {
    isBuilding,
    draftWorkflow,
    startWorkflow,
    addStep,
    removeStep,
    updateStep,
    finalizeWorkflow,
    cancelWorkflow,
    getStepCount
  }

  return (
    <WorkflowBuilderContext.Provider value={value}>
      {children}
    </WorkflowBuilderContext.Provider>
  )
} 