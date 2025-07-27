import { Link, useLocation } from "react-router-dom"
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  ShoppingCart, 
  Wifi,
  Sparkles,
  Calculator,
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  Globe,
  TrendingUp,
  MessageSquare,
  KeyRound,
  Shuffle,
  Brain,
  CreditCard,
  DollarSign,
  Shield
} from "lucide-react"
import { IconButton } from "@/components/ui/icon-button"
import { cn } from "@/lib/utils"


interface LeftRailProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, color: "text-blue-400" },
  { name: "Workflows", href: "/workflows", icon: Shuffle, color: "text-indigo-400" },
  { name: "PMS", href: "/pms", icon: Calendar, color: "text-green-400" },
  { name: "Guest Intelligence", href: "/guest-intelligence", icon: Brain, color: "text-pink-500" },
  { name: "CRM", href: "/crm", icon: Users, color: "text-purple-400" },
  { name: "Booking Engine", href: "/booking-engine", icon: Globe, color: "text-blue-500" },
  { name: "Revenue Management", href: "/revenue-management", icon: TrendingUp, color: "text-green-500" },
  { name: "Channel Manager", href: "/channel-manager", icon: Shuffle, color: "text-indigo-400" },
  { name: "POS", href: "/pos", icon: ShoppingCart, color: "text-orange-400" },
  { name: "Payment Gateway", href: "/payment-gateway", icon: CreditCard, color: "text-emerald-500" },
  { name: "OTA", href: "/ota", icon: Wifi, color: "text-cyan-400" },
  { name: "Access Control", href: "/access-control", icon: KeyRound, color: "text-red-500" },
  { name: "Housekeeping", href: "/housekeeping", icon: Sparkles, color: "text-pink-400" },
  { name: "Guest Experience", href: "/guest-experience", icon: MessageSquare, color: "text-violet-400" },
  { name: "Finance", href: "/finance", icon: Calculator, color: "text-emerald-400" },
  { name: "Analytics", href: "/analytics", icon: BarChart3, color: "text-indigo-400" },
  { name: "Admin", href: "/admin", icon: Settings, color: "text-gray-400" },
]

export function LeftRail({ isCollapsed, onToggleCollapse }: Readonly<LeftRailProps>) {
  const location = useLocation()

  return (
    <nav className={cn(
      "bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 h-full",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center">
            <img 
              src="/symphony-logo.svg" 
              alt="Symphony" 
              className="h-8 w-auto"
            />
          </div>
        )}
        <IconButton
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand navigation" : "Collapse navigation"}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </IconButton>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-6 overflow-y-auto" style={{
        scrollbarWidth: 'thin',
        scrollbarColor: 'hsl(var(--sidebar-border)) hsl(var(--sidebar-background))'
      }}>
        <ul className="space-y-2 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname.startsWith(item.href)
            const Icon = item.icon
            
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "group flex items-center rounded-sm px-3 py-2 text-sm font-medium transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                      : "text-sidebar-foreground"
                  )}
                >
                  <Icon 
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-sidebar-primary-foreground" : item.color
                    )} 
                  />
                  {!isCollapsed && (
                    <span className="ml-3 truncate">{item.name}</span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="text-xs text-sidebar-foreground/60">
            Hospitality Platform v2.0
          </div>
        )}
      </div>
    </nav>
  )
}