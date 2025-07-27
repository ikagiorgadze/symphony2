import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"

interface Arrival {
  id: string
  guest: {
    name: string
    avatar?: string
    vip: boolean
  }
  room: string
  time: string
  status: 'pending' | 'ready' | 'checked-in'
  notes?: string
}

const mockArrivals: Arrival[] = [
  {
    id: '1',
    guest: { name: 'James Rodriguez', vip: true },
    room: '2047',
    time: '2:30 PM',
    status: 'ready',
    notes: 'Early check-in requested'
  },
  {
    id: '2', 
    guest: { name: 'Maria Santos', vip: false },
    room: '1205',
    time: '3:15 PM',
    status: 'pending'
  },
  {
    id: '3',
    guest: { name: 'David Kim', vip: false },
    room: '1847',
    time: '4:00 PM', 
    status: 'checked-in'
  },
  {
    id: '4',
    guest: { name: 'Emma Thompson', vip: true },
    room: '3021',
    time: '4:30 PM',
    status: 'ready',
    notes: 'Welcome amenities prepared'
  }
]

export function ArrivalsTimeline() {
  const handleCheckIn = (arrival: Arrival) => {
    toast({
      title: "Check-in Complete",
      description: `${arrival.guest.name} has been checked into room ${arrival.room}.`,
    })
  }

  const handlePrepareRoom = (arrival: Arrival) => {
    toast({
      title: "Room Preparation Started",
      description: `Room ${arrival.room} is being prepared for ${arrival.guest.name}.`,
    })
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Today's Arrivals
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockArrivals.map((arrival, index) => (
          <div
            key={arrival.id}
            className={cn(
              "flex items-center gap-4 p-3 rounded-lg border transition-colors",
              arrival.status === 'checked-in' ? "bg-success/10 border-success/20" :
              arrival.status === 'ready' ? "bg-warning/10 border-warning/20" :
              "bg-muted/50"
            )}
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={arrival.guest.avatar} />
              <AvatarFallback>
                {arrival.guest.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{arrival.guest.name}</span>
                {arrival.guest.vip && (
                  <Badge variant="secondary" className="text-xs bg-lavender-100 text-primary">
                    VIP
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Room {arrival.room}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {arrival.time}
                </div>
              </div>
              {arrival.notes && (
                <p className="text-sm text-muted-foreground">{arrival.notes}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant={
                arrival.status === 'checked-in' ? 'default' :
                arrival.status === 'ready' ? 'secondary' :
                'outline'
              }>
                {arrival.status === 'checked-in' ? 'Checked In' :
                 arrival.status === 'ready' ? 'Ready' :
                 'Pending'}
              </Badge>
              
              {arrival.status !== 'checked-in' && (
                <Button
                  size="sm"
                  variant={arrival.status === 'ready' ? 'default' : 'outline'}
                  onClick={() => arrival.status === 'ready' ? handleCheckIn(arrival) : handlePrepareRoom(arrival)}
                  className="text-xs"
                >
                  {arrival.status === 'ready' ? 'Check In' : 'Prepare Room'}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}