import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  KeyRound, 
  Smartphone, 
  Shield,
  Clock,
  Users,
  MapPin,
  Settings,
  AlertTriangle
} from "lucide-react"

export default function AccessControlPage() {
  return (
    <AppShell>
      <div className="space-y-6 bg-background min-h-full">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Access Control & Mobile Key Systems
          </h1>
          <p className="text-muted-foreground">
            Secure NFC and BLE-based room access via smartphones, integrated with PMS for seamless guest experience
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Mobile Keys</CardTitle>
              <Smartphone className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">184</div>
              <p className="text-xs text-muted-foreground">89% of current guests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Access Success Rate</CardTitle>
              <Shield className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">99.2%</div>
              <p className="text-xs text-muted-foreground">Excellent reliability</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Accesses</CardTitle>
              <KeyRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+15% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Security Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Low risk level</p>
            </CardContent>
          </Card>
        </div>

        {/* Mobile Key Management & Room Access */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Mobile Key Status */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5" />
                Mobile Key Management & Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-green-600">184</div>
                  <div className="text-sm text-muted-foreground">Active Keys</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-blue-600">23</div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-bold text-red-600">3</div>
                  <div className="text-sm text-muted-foreground">Deactivated</div>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { room: "301", guest: "Sarah Johnson", keyType: "NFC", status: "active", lastUsed: "2 min ago", battery: 95 },
                  { room: "458", guest: "Michael Chen", keyType: "BLE", status: "active", lastUsed: "15 min ago", battery: 87 },
                  { room: "522", guest: "Emma Wilson", keyType: "NFC", status: "pending", lastUsed: "Never", battery: null },
                  { room: "234", guest: "David Kumar", keyType: "BLE", status: "active", lastUsed: "1 hour ago", battery: 78 },
                  { room: "687", guest: "Lisa Anderson", keyType: "NFC", status: "deactivated", lastUsed: "Yesterday", battery: null }
                ].map((key, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        key.status === "active" ? "bg-green-500" :
                        key.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                      <div>
                        <div className="font-medium text-sm">
                          Room {key.room} - {key.guest}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {key.keyType} • Last used: {key.lastUsed}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {key.battery && (
                        <div className="text-xs text-muted-foreground">
                          {key.battery}% battery
                        </div>
                      )}
                      <Badge 
                        variant={
                          key.status === "active" ? "default" :
                          key.status === "pending" ? "secondary" : "destructive"
                        }
                      >
                        {key.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Access Control Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Access Control Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Auto Key Generation</span>
                    <Badge variant="default">Enabled</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Keys generated on successful payment
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Key Expiration</span>
                    <Badge variant="outline">Checkout + 2h</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automatic deactivation policy
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Common Area Access</span>
                    <Badge variant="default">Restricted</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Gym, pool require staff override
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Emergency Override</span>
                    <Badge variant="destructive">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Master key system operational
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Configure Access Rules
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Security Monitoring & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Security Monitoring */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Monitoring & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Security Level</span>
                    <Badge variant="default">High</Badge>
                  </div>
                  <Progress value={92} className="h-2 mb-1" />
                  <div className="text-sm text-muted-foreground">All systems operational</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Failed Access Attempts</span>
                    <span className="text-sm font-bold">7</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Today • All investigated</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Unauthorized Areas</span>
                    <span className="text-sm font-bold">2 alerts</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Staff areas accessed by guests</div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Key Duplication Attempts</span>
                    <span className="text-sm font-bold">0</span>
                  </div>
                  <div className="text-sm text-muted-foreground">No suspicious activity</div>
                </div>
              </div>

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <div className="text-sm font-medium text-yellow-800">
                    Medium Priority Alert
                  </div>
                </div>
                <div className="text-sm text-yellow-700 mt-1">
                  Multiple failed attempts detected at Room 345. Guest may need assistance.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Access Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Access Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    room: "301",
                    guest: "Sarah Johnson",
                    action: "Room Access",
                    time: "2 min ago",
                    method: "NFC",
                    status: "success"
                  },
                  {
                    room: "Pool Area",
                    guest: "Michael Chen",
                    action: "Common Area",
                    time: "8 min ago",
                    method: "BLE",
                    status: "success"
                  },
                  {
                    room: "458",
                    guest: "Emma Wilson",
                    action: "Room Access",
                    time: "15 min ago",
                    method: "NFC",
                    status: "failed"
                  },
                  {
                    room: "Gym",
                    guest: "David Kumar",
                    action: "Common Area",
                    time: "23 min ago",
                    method: "BLE",
                    status: "success"
                  },
                  {
                    room: "234",
                    guest: "Lisa Anderson",
                    action: "Room Access",
                    time: "31 min ago",
                    method: "NFC",
                    status: "success"
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === "success" ? "bg-green-500" : "bg-red-500"
                      }`} />
                      <div>
                        <div className="font-medium text-sm">
                          {activity.room} - {activity.guest}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {activity.action} via {activity.method} • {activity.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Badge 
                        variant={activity.status === "success" ? "default" : "destructive"}
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                View Access Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
} 