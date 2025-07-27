import { useState } from "react"
import { Outlet } from "react-router-dom"
import { LeftRail } from "./left-rail"
import { TopBar } from "./top-bar"
import { MobileNav } from "./mobile-nav"
import { cn } from "@/lib/utils"

interface AppShellProps {
  children?: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isRailCollapsed, setIsRailCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Left Navigation Rail */}
      <div className="hidden md:block">
        <LeftRail 
          isCollapsed={isRailCollapsed}
          onToggleCollapse={() => setIsRailCollapsed(!isRailCollapsed)}
        />
      </div>
      
      {/* Mobile Navigation Overlay */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <TopBar 
          onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isRailCollapsed={isRailCollapsed}
          onToggleCollapse={() => setIsRailCollapsed(!isRailCollapsed)}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-3 sm:p-4 md:p-6">
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  )
}