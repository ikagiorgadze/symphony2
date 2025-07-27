import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IconButton } from "@/components/ui/icon-button"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertTriangle, Info, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: 'success' | 'warning' | 'info' | 'error'
  title: string
  message: string
  time: string
  read: boolean
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Housekeeping Delay',
    message: 'Room 2047 cleaning is 30 minutes behind schedule',
    time: '2 min ago',
    read: false
  },
  {
    id: '2', 
    type: 'success',
    title: 'Check-in Complete',
    message: 'David Kim successfully checked into room 1847',
    time: '5 min ago',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Revenue Update',
    message: 'Daily revenue reached $12,847 (+12% vs yesterday)',
    time: '10 min ago',
    read: true
  }
]

interface NotificationsPanelProps {
  notifications?: Notification[]
}

export function NotificationsPanel({ notifications = mockNotifications }: NotificationsPanelProps) {
  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle  
      case 'error': return AlertTriangle
      case 'info': return Info
      default: return Info
    }
  }

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-success'
      case 'warning': return 'text-warning'
      case 'error': return 'text-destructive'
      case 'info': return 'text-primary'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <IconButton
          variant="ghost"
          aria-label="Notifications"
          className="relative"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-[10px] text-destructive-foreground flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </IconButton>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {notifications.map(notification => {
                const Icon = getIcon(notification.type)
                return (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 rounded-lg border transition-colors hover:bg-accent",
                      !notification.read && "bg-primary/5 border-primary/20"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", getIconColor(notification.type))} />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{notification.message}</p>
                      </div>
                      {!notification.read && (
                        <div className="h-2 w-2 bg-primary rounded-full shrink-0" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
        
        {notifications.length > 0 && (
          <div className="p-2 border-t">
            <Button variant="ghost" className="w-full text-sm">
              Mark all as read
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}