import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Users, 
  Calendar, 
  ShoppingCart,
  Calculator,
  Settings,
  LayoutDashboard,
  Wifi,
  Sparkles
} from "lucide-react"
import { cn } from "@/lib/utils"

interface CommandItem {
  id: string
  title: string
  subtitle?: string
  icon: any
  action: () => void
  category: string
}

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const [search, setSearch] = useState("")
  const navigate = useNavigate()

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-dashboard",
      title: "Dashboard",
      subtitle: "Hotel overview and metrics",
      icon: LayoutDashboard,
      category: "Navigation",
      action: () => { navigate("/dashboard"); onOpenChange(false) }
    },
    {
      id: "nav-pms",
      title: "Property Management",
      subtitle: "Reservations and guest services",
      icon: Calendar,
      category: "Navigation", 
      action: () => { navigate("/pms"); onOpenChange(false) }
    },
    {
      id: "nav-crm",
      title: "Customer Relations",
      subtitle: "Guest profiles and marketing",
      icon: Users,
      category: "Navigation",
      action: () => { navigate("/crm"); onOpenChange(false) }
    },
    {
      id: "nav-pos",
      title: "Point of Sale",
      subtitle: "Restaurant and retail",
      icon: ShoppingCart,
      category: "Navigation",
      action: () => { navigate("/pos"); onOpenChange(false) }
    },
    {
      id: "nav-finance",
      title: "Financial Management",
      subtitle: "Accounting and reports",
      icon: Calculator,
      category: "Navigation",
      action: () => { navigate("/finance"); onOpenChange(false) }
    },
    {
      id: "nav-admin",
      title: "Administration",
      subtitle: "System settings and users",
      icon: Settings,
      category: "Navigation",
      action: () => { navigate("/admin"); onOpenChange(false) }
    },
    // Quick Actions
    {
      id: "action-checkin",
      title: "Quick Check-in",
      subtitle: "Process guest arrival",
      icon: Users,
      category: "Quick Actions",
      action: () => { console.log("Quick check-in"); onOpenChange(false) }
    },
    {
      id: "action-search-guest",
      title: "Find Guest",
      subtitle: "Search guest profiles",
      icon: Search,
      category: "Quick Actions", 
      action: () => { console.log("Search guest"); onOpenChange(false) }
    }
  ]

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(search.toLowerCase()) ||
    command.subtitle?.toLowerCase().includes(search.toLowerCase())
  )

  const categories = Array.from(new Set(filteredCommands.map(cmd => cmd.category)))

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [open, onOpenChange])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0">
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-left">Command Palette</DialogTitle>
        </DialogHeader>
        
        <div className="px-6 pb-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search commands..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-96 overflow-y-auto pb-6">
          {categories.map(category => {
            const categoryCommands = filteredCommands.filter(cmd => cmd.category === category)
            if (categoryCommands.length === 0) return null

            return (
              <div key={category} className="px-6 mb-4">
                <div className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  {category}
                </div>
                <div className="space-y-1">
                  {categoryCommands.map(command => {
                    const Icon = command.icon
                    return (
                      <button
                        key={command.id}
                        onClick={command.action}
                        className={cn(
                          "w-full flex items-center gap-3 p-3 rounded-lg text-left",
                          "hover:bg-accent transition-colors"
                        )}
                      >
                        <Icon className="h-5 w-5 text-primary" />
                        <div className="flex-1">
                          <div className="font-medium">{command.title}</div>
                          {command.subtitle && (
                            <div className="text-sm text-muted-foreground">{command.subtitle}</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
          
          {filteredCommands.length === 0 && (
            <div className="px-6 py-8 text-center text-muted-foreground">
              No commands found for "{search}"
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}