import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Key, Shield, Settings, Plus, Edit, Trash2 } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const AdminPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">System Administration</h1>
          <p className="text-muted-foreground">Manage user accounts, security policies, system integrations, and platform configuration</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Admin" 
          systemIcon={Settings}
          suggestedActions={[
            "Create User Account",
            "Update System Settings", 
            "Backup Database",
            "Generate Security Report"
          ]}
          presetActions={[
            "Create new user account",
            "Update user permissions",
            "Backup system database",
            "Generate security audit report",
            "Update system configuration",
            "Monitor system performance",
            "Install software updates",
            "Configure user access levels",
            "Create system backup schedule",
            "Review security logs",
            "Update password policies",
            "Configure integration settings",
            "Manage API access keys",
            "Monitor system health metrics",
            "Create user activity reports",
            "Configure notification settings",
            "Update compliance settings",
            "Manage data retention policies",
            "Configure disaster recovery",
            "Generate system usage analytics"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  User Management & Role Permissions
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Comprehensive staff account management with role-based access control. Define custom roles, assign permissions, 
                and manage user lifecycle from onboarding to offboarding. Track login activity and enforce security policies.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Users</h4>
                  <div className="text-2xl font-bold text-primary">47</div>
                  <p className="text-sm text-muted-foreground">Across all departments</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Role Types</h4>
                  <div className="text-2xl font-bold text-primary">8</div>
                  <p className="text-sm text-muted-foreground">Custom permission sets</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Login Sessions</h4>
                  <div className="text-2xl font-bold text-primary">23</div>
                  <p className="text-sm text-muted-foreground">Currently active</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Recent User Activity</h4>
                {[
                  { name: "Sarah Chen", role: "Front Desk Manager", action: "Logged in", time: "2 min ago", status: "active" },
                  { name: "Mike Rodriguez", role: "Housekeeping Supervisor", action: "Password changed", time: "1 hour ago", status: "active" },
                  { name: "Emma Thompson", role: "Revenue Manager", action: "Permissions updated", time: "3 hours ago", status: "pending" }
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.role} • {user.action}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{user.time}</span>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-gray-400" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Enterprise-grade security controls including multi-factor authentication, session management, 
                audit logging, and compliance monitoring for PCI DSS and data protection regulations.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-sm text-muted-foreground">Required for all admin users</div>
                  </div>
                  <Badge variant="default">Enabled</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-sm text-muted-foreground">Auto-logout after inactivity</div>
                  </div>
                  <Badge variant="secondary">30 minutes</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Audit Logging</div>
                    <div className="text-sm text-muted-foreground">All user actions tracked</div>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Failed Login Attempts</div>
                    <div className="text-sm text-muted-foreground">Last 24 hours</div>
                  </div>
                  <Badge variant="outline">3</Badge>
                </div>
              </div>
              
              <Button variant="outline" className="w-full">
                View Security Logs
              </Button>
            </CardContent>
          </Card>

          {/* API Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-gray-400" />
                API & Integration Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Manage third-party integrations, API keys, webhooks, and data synchronization. 
                Monitor API usage, configure rate limits, and maintain connection health with external systems.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold">Active Integrations</h4>
                {[
                  { name: "Booking.com", type: "OTA Channel", status: "Connected", lastSync: "2 min ago" },
                  { name: "Stripe", type: "Payment Gateway", status: "Connected", lastSync: "5 min ago" },
                  { name: "Mailchimp", type: "Email Marketing", status: "Warning", lastSync: "2 hours ago" },
                  { name: "Salesforce", type: "CRM System", status: "Connected", lastSync: "15 min ago" }
                ].map((integration, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{integration.name}</div>
                      <div className="text-sm text-muted-foreground">{integration.type}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">{integration.lastSync}</div>
                      <Badge variant={
                        integration.status === 'Connected' ? 'default' : 
                        integration.status === 'Warning' ? 'secondary' : 'destructive'
                      }>
                        {integration.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Integration
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  View API Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Workflow Builder Component */}
      <WorkflowBuilder />
    </AppShell>
  )
}

export default AdminPage