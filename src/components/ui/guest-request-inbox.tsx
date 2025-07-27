import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Badge } from "./badge"
import { ScrollArea } from "./scroll-area"
import { Input } from "./input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"
import { Inbox, Search, Filter, Clock, User, MessageSquare, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

interface GuestRequest {
  id: string
  guest_name: string
  room: string
  intent_type: string
  message: string
  timestamp: string
  status: "pending" | "in_progress" | "fulfilled" | "failed"
  assigned_systems: string[]
  priority: "low" | "medium" | "high"
  estimated_completion: string
}

export function GuestRequestInbox() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const requests: GuestRequest[] = [
    {
      id: "req_001",
      guest_name: "Sarah Chen",
      room: "204",
      intent_type: "Late Checkout",
      message: "Could I please have a late checkout until 2 PM? I have a late flight.",
      timestamp: "2 min ago",
      status: "in_progress",
      assigned_systems: ["PMS", "Housekeeping"],
      priority: "medium",
      estimated_completion: "5 min"
    },
    {
      id: "req_002",
      guest_name: "Mike Johnson",
      room: "312",
      intent_type: "Room Service",
      message: "I'd like to order breakfast - scrambled eggs, toast, and coffee please.",
      timestamp: "5 min ago",
      status: "in_progress",
      assigned_systems: ["POS", "Kitchen"],
      priority: "low",
      estimated_completion: "15 min"
    },
    {
      id: "req_003",
      guest_name: "Emily Rodriguez",
      room: "156",
      intent_type: "Maintenance",
      message: "The air conditioning in my room isn't working properly.",
      timestamp: "12 min ago",
      status: "pending",
      assigned_systems: ["Maintenance", "PMS"],
      priority: "high",
      estimated_completion: "30 min"
    },
    {
      id: "req_004",
      guest_name: "David Kim",
      room: "508",
      intent_type: "Spa Booking",
      message: "Can I book a massage for tomorrow at 3 PM?",
      timestamp: "18 min ago",
      status: "fulfilled",
      assigned_systems: ["POS", "CRM"],
      priority: "low",
      estimated_completion: "Completed"
    },
    {
      id: "req_005",
      guest_name: "Lisa Park",
      room: "423",
      intent_type: "Concierge",
      message: "I need restaurant recommendations for tonight, something romantic.",
      timestamp: "25 min ago",
      status: "failed",
      assigned_systems: ["CRM"],
      priority: "medium",
      estimated_completion: "Manual review needed"
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />
      case "in_progress":
        return <ArrowRight className="h-4 w-4 text-primary animate-pulse" />
      case "fulfilled":
        return <CheckCircle className="h-4 w-4 text-success" />
      case "failed":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "secondary"
      case "in_progress":
        return "default"
      case "fulfilled":
        return "outline"
      case "failed":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  const handleViewRequest = (request: GuestRequest) => {
    toast({
      title: `Request Details`,
      description: `Viewing ${request.guest_name}'s ${request.intent_type} request`,
    })
  }

  const handleAssignRequest = (requestId: string) => {
    toast({
      title: "Request Assigned",
      description: "Request has been manually assigned to staff member",
    })
  }

  const handleEscalateRequest = (requestId: string) => {
    toast({
      title: "Request Escalated",
      description: "Request has been escalated to supervisor",
      variant: "default"
    })
  }

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.guest_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.room.includes(searchQuery) ||
                         request.intent_type.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const statusCounts = {
    all: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    in_progress: requests.filter(r => r.status === "in_progress").length,
    fulfilled: requests.filter(r => r.status === "fulfilled").length,
    failed: requests.filter(r => r.status === "failed").length
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Inbox className="h-5 w-5 text-primary" />
            Guest Request Inbox
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              {statusCounts.pending + statusCounts.in_progress} Active
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by guest name, room, or request type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status ({statusCounts.all})</SelectItem>
              <SelectItem value="pending">Pending ({statusCounts.pending})</SelectItem>
              <SelectItem value="in_progress">In Progress ({statusCounts.in_progress})</SelectItem>
              <SelectItem value="fulfilled">Fulfilled ({statusCounts.fulfilled})</SelectItem>
              <SelectItem value="failed">Failed ({statusCounts.failed})</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Request List */}
        <ScrollArea className="h-[400px] sm:h-[500px]">
          <div className="space-y-2 sm:space-y-3">
            {filteredRequests.map((request) => (
              <div 
                key={request.id} 
                className="p-3 sm:p-4 border border-border rounded-lg bg-background/50 hover:bg-background/80 transition-all cursor-pointer group"
                onClick={() => handleViewRequest(request)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {getStatusIcon(request.status)}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium group-hover:text-primary transition-colors">
                          {request.guest_name} - Room {request.room}
                        </h4>
                        <Badge variant={getPriorityColor(request.priority)} className="text-xs">
                          {request.priority}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-primary">{request.intent_type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(request.status) as any} className="text-xs">
                      {request.status.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{request.timestamp}</span>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-muted-foreground italic">
                    "{request.message}"
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Systems:</span>
                    <div className="flex gap-1">
                      {request.assigned_systems.map((system, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {system}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-muted-foreground">
                      ETA: {request.estimated_completion}
                    </span>
                    {request.status === "pending" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAssignRequest(request.id)
                        }}
                      >
                        <User className="h-3 w-3 mr-1" />
                        Assign
                      </Button>
                    )}
                    {request.status === "failed" && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEscalateRequest(request.id)
                        }}
                      >
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Escalate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}