import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Calendar, 
  Users, 
  ShoppingCart, 
  Wifi,
  LogIn,
  Shuffle,
  Globe,
  TrendingUp,
  Sparkles,
  Calculator,
  MessageSquare,
  BarChart3,
  KeyRound,
  Settings,
  CheckCircle,
  Eye,
  DollarSign,
  Clock,
  Star
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

// Service providers for each system type (only services with open APIs)
const serviceProviders = {
  "PMS": [
    { name: "Cloudbeds", logo: "https://cloudbeds.com/wp-content/uploads/2023/01/cloudbeds-logo-blue.svg", description: "All-in-one hospitality platform" },
    { name: "RoomRaccoon", logo: "https://www.roomraccoon.com/assets/images/logo.svg", description: "Smart hotel management system" },
    { name: "Mews", logo: "https://www.mews.com/hubfs/mews-logo.svg", description: "Cloud-native hotel platform" }
  ],
  "CRM": [
    { name: "Salesforce", logo: "https://logoeps.com/wp-content/uploads/2013/03/salesforce-vector-logo.png", description: "World's #1 CRM platform" },
    { name: "HubSpot", logo: "https://www.hubspot.com/hubfs/HubSpot_Logos/HubSpot-Inversed-Favicon.png", description: "Inbound marketing & sales" },
    { name: "Zoho CRM", logo: "https://www.zoho.com/sites/zweb/images/zoho-logo.svg", description: "Business suite CRM" },
    { name: "Pipedrive", logo: "https://pipedrive-images.s3.amazonaws.com/assets/logo/pipedrive-logo.svg", description: "Sales pipeline management" }
  ],
  "POS": [
    { name: "Square", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNCIgZmlsbD0iIzAwMCIvPgo8cmVjdCB4PSI2IiB5PSI2IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPgo=", description: "Complete commerce platform" },
    { name: "Toast", logo: "https://pos.toasttab.com/toast-logo.svg", description: "Restaurant technology platform" },
    { name: "Clover", logo: "https://www.clover.com/assets/images/clover-logo.svg", description: "Point of sale system" },
    { name: "Stripe", logo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzLjU4NSA5LjQ3NkMxMy41ODUgOC45NzYgMTMuOTc1IDguNzI2IDE0Ljc2NSA4LjcyNkMxNS44NSA4LjcyNiAxNy4zMSA5LjA3NiAxOC4zMTUgOS43MjZWNi43NzZDMTcuMjEgNi4yMjYgMTYuMTA1IDYgMTQuNzY1IDZDMTEuNjQgNiA5LjU4NSA3LjY3NiA5LjU4NSAxMC40NzZDOS41ODUgMTUuNzc2IDE3LjE2IDE0LjY3NiAxNy4xNiAxNy42MjZDMTcuMTYgMTguMzI2IDE2LjY2IDE4LjY3NiAxNS43MiAxOC42NzZDMTQuNDMgMTguNjc2IDEyLjc2IDE4LjEyNiAxMS42NCAxNy4zMjZWMjAuNTI2QzEyLjk3IDIxLjE3NiAxNC4zIDIxLjQyNiAxNS43MiAyMS40MjZDMTguOTcgMjEuNDI2IDIxIDIwLjAyNiAyMSAxNy4wNzZDMjAuOTc1IDExLjA3NiAxMy41ODUgMTIuNzI2IDEzLjU4NSA5LjQ3NloiIGZpbGw9IiM2NzcyRTUiLz4KPC9zdmc+Cg==", description: "Payment processing platform" }
  ],
  "OTA": [
    { name: "Booking.com", logo: "https://cf.bstatic.com/static/img/b25logo/logo_blue_150x50.png", description: "Global booking platform" },
    { name: "Expedia", logo: "https://www.expediagroup.com/content/dam/expedia/graphics/brand/logo/expedia-group-logo.svg", description: "Travel marketplace" },
    { name: "Airbnb", logo: "https://airbnb.design/wp-content/uploads/2016/05/airbnb_vertical_lockup_web.png", description: "Home sharing platform" }
  ],
  "Channel Manager": [
    { name: "SiteMinder", logo: "https://www.siteminder.com/r/img/sm-logo.svg", description: "Hotel distribution platform" },
    { name: "RateGain", logo: "https://www.rategain.com/images/rategain-logo.svg", description: "Revenue optimization" },
    { name: "Cubilis", logo: "https://www.cubilis.com/images/logo.svg", description: "Channel management solution" }
  ],
  "Finance": [
    { name: "QuickBooks", logo: "https://plugin.intuitcdn.net/designsystem/assets/2023/01/12/qb-logo.svg", description: "Small business accounting" },
    { name: "Xero", logo: "https://assets-global.website-files.com/5e0d47f1f1c1a5e0f66d0b0b/xero-logo.svg", description: "Beautiful business accounting" },
    { name: "Sage", logo: "https://www.sage.com/~/media/global/logos/sage-logo.svg", description: "Business management software" },
    { name: "FreshBooks", logo: "https://www.freshbooks.com/wp-content/uploads/2021/03/freshbooks-logo.svg", description: "Cloud accounting software" }
  ],

  "Admin": [
    { name: "Okta", logo: "https://www.okta.com/sites/all/themes/Okta/images/logos/developer/Dev_Logo-02_Large.png", description: "Identity management platform" },
    { name: "Auth0", logo: "https://auth0.com/lib/about/img/logos/img-logo-auth0.svg", description: "Identity platform for developers" },
    { name: "OneLogin", logo: "https://www.onelogin.com/assets/img/headers/onelogin-logo.svg", description: "Secure single sign-on" },
    { name: "Microsoft Azure AD", logo: "https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/media/active-directory-whatis/azure-active-directory.png", description: "Cloud identity service" }
  ],
  "Guest Experience": [
    { name: "TrustYou", logo: "https://www.trustyou.com/wp-content/uploads/2021/01/trustyou-logo.svg", description: "Guest intelligence platform" },
    { name: "Revinate", logo: "https://www.revinate.com/wp-content/uploads/2021/03/revinate-logo.svg", description: "Guest data platform" },
    { name: "Medallia", logo: "https://www.medallia.com/wp-content/uploads/2021/03/medallia-logo.svg", description: "Experience management" }
  ],
  "Analytics": [
    { name: "Tableau", logo: "https://logos-world.net/wp-content/uploads/2021/10/Tableau-Symbol.png", description: "Business intelligence platform" },
    { name: "Power BI", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg", description: "Data analytics and visualization" },
    { name: "Domo", logo: "https://www.domo.com/assets/images/logo-domo.svg", description: "Cloud-based analytics" }
  ],
  "Housekeeping": [
    { name: "Alice", logo: "https://www.alice.com/static/images/alice-logo.svg", description: "Guest request platform" },
    { name: "Optii", logo: "https://optii.ai/wp-content/uploads/2021/01/optii-logo.svg", description: "AI-powered operations" }
  ]
}

// System configurations with all hotel management systems
const systems = [
  { 
    name: "PMS", 
    title: "Property Management System",
    description: "Core hotel operations: reservations, guest profiles, room assignments, and front desk management.",
    icon: Calendar, 
    href: "/pms"
  },
  { 
    name: "CRM", 
    title: "Customer Relationship Management",
    icon: Users, 
    color: "text-purple-400",
    href: "/crm"
  },
  { 
    name: "POS", 
    title: "Point of Sale System",
    description: "Handle restaurant orders, spa bookings, and all revenue-generating services.",
    icon: ShoppingCart, 
    href: "/pos"
  },
  { 
    name: "OTA", 
    title: "Online Travel Agencies",
    description: "Sync rates and availability across booking channels and distribution partners.",
    icon: Wifi, 
    href: "/ota"
  },
  { 
    name: "Channel Manager", 
    title: "Channel Manager",
    description: "Manage rates, availability, and bookings across multiple booking channels.",
    icon: Shuffle, 
    href: "/channel-manager"
  },

  { 
    name: "Housekeeping", 
    title: "Housekeeping",
    description: "Manage room cleaning schedules and inventory.",
    icon: Sparkles, 
    href: "/housekeeping"
  },
  { 
    name: "Finance", 
    title: "Finance",
    description: "Track financial performance, manage budgets, and generate reports.",
    icon: Calculator, 
    href: "/finance"
  },
  { 
    name: "Guest Experience", 
    title: "Guest Experience",
    icon: MessageSquare, 
    color: "text-violet-400",
    href: "/guest-experience"
  },
  {
    name: "Analytics",
    title: "Analytics & Reporting",
    icon: BarChart3,
    color: "text-indigo-400", 
    href: "/analytics"
  },
  { 
    name: "Analytics", 
    title: "Analytics",
    description: "Gain insights into operational performance and guest behavior.",
    icon: BarChart3, 
    href: "/analytics"
  },

  { 
    name: "Admin", 
    title: "Admin",
    description: "Manage system settings, users, and permissions.",
    icon: Settings, 
    href: "/admin"
  },
]

// Sample data for each system type
const getSampleData = (systemName: string): Record<string, string | number> => {
  const dataMap: Record<string, Record<string, string | number>> = {
    "PMS": { bookings: 47, occupancy: "87%", checkins: 23, checkouts: 18 },
    "CRM": { guests: 1247, vips: 12, loyalty: "67%", reviews: 4.8 },
    "POS": { sales: "$3,240", orders: 89, popular: "Caesar Salad", avg: "$36" },
    "OTA": { channels: 8, bookings: 34, revenue: "$18,435", commission: "14.2%" },
    "Channel Manager": { synced: 34, pending: 7, rate: "94%", channels: 8 },
    "Housekeeping": { clean: 156, maintenance: 6, ooo: 3, pending: 12 },
    "Finance": { revenue: "$45,230", expenses: "$28,150", profit: "$17,080", margin: "37.8%" },
    "Guest Experience": { satisfaction: 4.8, requests: 8, responses: "2.3min", nps: 78 },
    "Analytics": { reports: 24, dashboards: 12, exports: "156", accuracy: "99.2%" },
    "Admin": { uptime: "99.8%", users: 42, backups: 3, updates: 1 }
  }
  return dataMap[systemName] || {}
}

export function DashboardPage() {
  const { toast } = useToast()
  const [connectedSystems, setConnectedSystems] = useState<Set<string>>(new Set())
  const [selectedServices, setSelectedServices] = useState<Record<string, {name: string, logo: string}>>({})
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false)
  const [credentialDialogOpen, setCredentialDialogOpen] = useState(false)
  const [currentSystem, setCurrentSystem] = useState<string>("")
  const [credentials, setCredentials] = useState({ username: "", password: "" })

  const handleSystemConnect = (systemName: string) => {
    setCurrentSystem(systemName)
    setServiceDialogOpen(true)
  }

  const handleServiceSelect = (service: {name: string, logo: string}) => {
    setSelectedServices(prev => ({ ...prev, [currentSystem]: service }))
    setServiceDialogOpen(false)
    setCredentialDialogOpen(true)
    setCredentials({ username: "", password: "" })
  }

  const handleLogin = () => {
    // Simulate successful connection regardless of credentials
    setConnectedSystems(prev => new Set([...prev, currentSystem]))
    setCredentialDialogOpen(false)
    const serviceName = selectedServices[currentSystem]?.name || currentSystem
    toast({
      title: `${serviceName} Connected`,
      description: `Successfully connected to ${serviceName}. Sample data is now available.`,
    })
  }

  const connectedCount = connectedSystems.size

  return (
    <>
      {/* Service Selection Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Select {currentSystem} Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p className="text-sm text-muted-foreground">
              Choose which {currentSystem} service you want to connect to:
            </p>
            <div className="grid grid-cols-1 gap-3 max-h-60 overflow-y-auto">
              {serviceProviders[currentSystem as keyof typeof serviceProviders]?.map((service, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-4"
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <img 
                        src={service.logo} 
                        alt={service.name} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                        {service.name.charAt(0)}
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{service.name}</div>
                      <div className="text-sm text-muted-foreground">{service.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Credential Dialog */}
      <Dialog open={credentialDialogOpen} onOpenChange={setCredentialDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect to {selectedServices[currentSystem]?.name || currentSystem}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter username"
                value={credentials.username}
                onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setCredentialDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogin}>
              Connect To
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="flex flex-col h-full bg-background">
      {/* Header - Fixed height */}
      <div className="flex-shrink-0 pb-4">
        <h1 className="text-3xl font-display font-bold text-foreground">
          Symphony Operations Center
        </h1>
        <p className="text-muted-foreground">
          Real-time guest request management, system routing, and operational intelligence
        </p>
      </div>

      {/* System Access Cards - Takes remaining space */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          {systems.map((system) => {
            const Icon = system.icon
            
            return (
              <Card 
                key={system.name} 
                className="bg-primary/10 border-primary/20 transition-all duration-200 hover:shadow-lg hover:border-primary/40 hover:bg-primary/15 flex flex-col h-full"
              >
                <CardHeader className="text-center pb-3 flex-shrink-0">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 rounded-full bg-primary/20 border-2 border-primary/30 shadow-sm">
                      {connectedSystems.has(system.name) && selectedServices[system.name] ? (
                        <>
                          <img 
                            src={selectedServices[system.name].logo} 
                            alt={selectedServices[system.name].name}
                            className="w-8 h-8 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              if (e.currentTarget.nextElementSibling) {
                                e.currentTarget.nextElementSibling.classList.remove('hidden');
                              }
                            }}
                          />
                          <div className="hidden w-6 h-6 bg-gray-200 rounded flex items-center justify-center text-xs font-semibold text-gray-600">
                            {selectedServices[system.name].name.charAt(0)}
                          </div>
                        </>
                      ) : (
                        <Icon className="h-6 w-6 text-primary" />
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-display text-foreground">
                    {connectedSystems.has(system.name) && selectedServices[system.name] 
                      ? selectedServices[system.name].name 
                      : system.title}
                  </CardTitle>
                  <Badge variant="secondary" className="w-fit mx-auto font-medium text-xs bg-primary/20 text-primary border-primary/30">
                    {system.name}
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center flex-1 flex flex-col justify-between py-4">
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {system.description}
                  </p>
                  
                  <div className="space-y-3">
                    {connectedSystems.has(system.name) ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Connected</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {Object.entries(getSampleData(system.name)).slice(0, 4).map(([key, value], index) => (
                            <div key={index} className="bg-primary/5 p-2 rounded">
                              <div className="font-medium capitalize text-foreground">{key}</div>
                              <div className="text-primary font-semibold">{String(value)}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <>
                        <Button 
                          size="default" 
                          className="w-full max-w-xs mx-auto gap-2 shadow-sm"
                          onClick={() => handleSystemConnect(system.name)}
                        >
                          <LogIn className="h-4 w-4" />
                          Connect to {system.name}
                        </Button>
                        
                        <div className="text-xs text-muted-foreground">
                          Status: <span className="text-destructive font-medium">Disconnected</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Integration Status - Fixed at bottom */}
        <Card className="bg-primary/5 border-primary/15 flex-shrink-0">
          <CardContent className="py-4">
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-sm text-foreground/80">
                System Integration Status
              </h3>
              <div className="flex justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${connectedCount > 0 ? 'bg-green-500' : 'bg-destructive'}`}></div>
                  <span className="text-muted-foreground font-medium">{connectedCount}/{systems.length} Systems Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary/60 rounded-full"></div>
                  <span className="text-muted-foreground">Awaiting Authentication</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </>
  )
}