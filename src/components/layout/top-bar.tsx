import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { NotificationsPanel } from "@/components/ui/notifications-panel"
import { CommandPalette } from "@/components/ui/command-palette"
import { 
  Search, 
  // Bell, 
  Settings, 
  LogOut, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Menu,
  // X
} from "lucide-react"
import { LanguageSwitcher } from "@/components/ui/language-switcher";

interface TopBarProps {
  onMobileMenuToggle?: () => void
  isRailCollapsed?: boolean
  onToggleCollapse?: () => void
}

export function TopBar({ onMobileMenuToggle, isRailCollapsed, onToggleCollapse }: Readonly<TopBarProps>) {
  const [showCommandPalette, setShowCommandPalette] = useState(false)

  const handleSearch = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setShowCommandPalette(true)
    }
  }

  return (
    <>
      <header className="h-14 sm:h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center justify-between h-full px-3 sm:px-4 md:px-6">
          {/* Left Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden h-8 w-8 p-0"
              onClick={onMobileMenuToggle}
            >
              <Menu className="h-4 w-4" />
            </Button>

            {/* Logo for mobile when sidebar is hidden */}
            <div className="md:hidden flex items-center">
              <img 
                src="/symphony-logo.svg" 
                alt="Symphony" 
                className="h-6 w-auto"
              />
            </div>

            {/* Desktop Rail Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:flex h-8 w-8 p-0"
              onClick={onToggleCollapse}
            >
              {isRailCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>

            {/* Search - Hide on small mobile */}
            <div className="hidden sm:block relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search"
                className="pl-10 pr-4 h-9 bg-muted/50 border-0 focus:bg-background transition-colors"
                onKeyDown={handleSearch}
                onClick={() => setShowCommandPalette(true)}
              />
            </div>

            {/* Mobile Search Icon */}
            <Button
              variant="ghost"
              size="sm"
              className="sm:hidden h-8 w-8 p-0"
              onClick={() => setShowCommandPalette(true)}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            <LanguageSwitcher />
            {/* Notifications */}
            <NotificationsPanel />

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 gap-2 px-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback className="text-xs">SC</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm font-medium">Sarah Chen</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">Sarah Chen</div>
                  <div className="text-muted-foreground">Hotel Manager</div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette 
        open={showCommandPalette} 
        onOpenChange={setShowCommandPalette} 
      />
    </>
  )
}