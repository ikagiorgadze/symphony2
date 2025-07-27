import { useLocation, Link } from "react-router-dom"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  LayoutDashboard, 
  Bed, 
  Users, 
  UtensilsCrossed, 
  Wifi, 
  Sparkles, 
  Calculator, 
  Settings,
  X
} from "lucide-react"

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const location = useLocation()
  
  const navigationItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      color: "text-primary",
      description: "Operations center"
    },
    {
      name: "PMS",
      href: "/pms",
      icon: Bed,
      color: "text-blue-400",
      description: "Property management"
    },
    {
      name: "CRM",
      href: "/crm",
      icon: Users,
      color: "text-green-400",
      description: "Guest relations"
    },
    {
      name: "POS",
      href: "/pos",
      icon: UtensilsCrossed,
      color: "text-orange-400",
      description: "Point of sale"
    },
    {
      name: "OTA",
      href: "/ota",
      icon: Wifi,
      color: "text-cyan-400",
      description: "Channel management"
    },
    {
      name: "Housekeeping",
      href: "/housekeeping",
      icon: Sparkles,
      color: "text-purple-400",
      description: "Room operations"
    },
    {
      name: "Finance",
      href: "/finance",
      icon: Calculator,
      color: "text-emerald-400",
      description: "Financial management"
    },
    {
      name: "Admin",
      href: "/admin",
      icon: Settings,
      color: "text-gray-400",
      description: "System settings"
    }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-6 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img 
                src="/symphony-logo.svg" 
                alt="Symphony" 
                className="h-10 w-auto"
              />
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </SheetHeader>
        
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-4">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname.startsWith(item.href)
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 px-3 py-3 rounded-lg transition-all
                    ${isActive 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div className={`p-2 rounded-md ${isActive ? 'bg-primary/20' : 'bg-muted'}`}>
                    <Icon className={`h-4 w-4 ${isActive ? 'text-primary' : item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                  {isActive && (
                    <Badge variant="default" className="text-xs">
                      Active
                    </Badge>
                  )}
                </Link>
              )
            })}
          </div>
        </ScrollArea>
        
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-primary">SC</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Sarah Chen</div>
              <div className="text-xs text-muted-foreground">Hotel Manager</div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}