import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Receipt, CreditCard, Coffee, UtensilsCrossed, Package } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const POSPage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Point of Sale System</h1>
          <p className="text-muted-foreground">Integrated restaurant, bar, and retail operations with real-time inventory and revenue tracking</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="POS" 
          systemIcon={ShoppingCart}
          suggestedActions={[
            "Process Food Order",
            "Charge to Room", 
            "Process Payment",
            "Generate Receipt"
          ]}
          presetActions={[
            "Process food and beverage order",
            "Charge order to guest room",
            "Process cash payment",
            "Process credit card payment",
            "Add tip to transaction",
            "Apply discount to order",
            "Void transaction",
            "Generate receipt",
            "Update inventory levels",
            "Close check/table",
            "Split bill between guests",
            "Apply promotional code",
            "Process refund",
            "Transfer order to another table",
            "Add special instructions",
            "Modify order items",
            "Process group order",
            "Apply happy hour pricing",
            "Send order to kitchen",
            "Update menu availability"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Menu & Inventory Management */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-orange-400" />
                Menu & Inventory Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Digital menu management with real-time inventory tracking, automated stock alerts, and dynamic pricing. 
                Manage multiple outlets including restaurant, room service, bar, and retail with unified reporting.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Active Items</h4>
                  <div className="text-2xl font-bold text-primary">247</div>
                  <p className="text-sm text-muted-foreground">Menu items</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Low Stock</h4>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <p className="text-sm text-muted-foreground">Need reorder</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Today's Sales</h4>
                  <div className="text-2xl font-bold text-primary">$8,467</div>
                  <p className="text-sm text-muted-foreground">All outlets</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Avg Order</h4>
                  <div className="text-2xl font-bold text-primary">$47</div>
                  <p className="text-sm text-muted-foreground">Per transaction</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Popular Items Today</h4>
                {[
                  { item: "Grilled Salmon", category: "Restaurant", sold: 23, revenue: "$575", status: "In Stock" },
                  { item: "Craft Beer Selection", category: "Bar", sold: 47, revenue: "$423", status: "In Stock" },
                  { item: "Room Service Breakfast", category: "Room Service", sold: 18, revenue: "$342", status: "Low Stock" },
                  { item: "Hotel Branded Items", category: "Retail", sold: 8, revenue: "$156", status: "In Stock" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        {item.category === 'Bar' ? <Coffee className="h-4 w-4 text-orange-600" /> :
                         item.category === 'Retail' ? <Package className="h-4 w-4 text-orange-600" /> :
                         <UtensilsCrossed className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div>
                        <div className="font-medium">{item.item}</div>
                        <div className="text-sm text-muted-foreground">{item.category} • {item.sold} sold</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="text-sm font-medium">{item.revenue}</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                      </div>
                      <Badge variant={item.status === 'Low Stock' ? 'destructive' : 'default'}>
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Display & Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5 text-orange-400" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Kitchen display system with order tracking, preparation times, and quality control. 
                Streamline workflow from order to delivery.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Orders in Queue</span>
                  <Badge variant="default">8</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Preparing</span>
                  <Badge variant="secondary">5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Ready for Pickup</span>
                  <Badge variant="outline">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Prep Time</span>
                  <Badge variant="secondary">12 min</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Active Orders</h4>
                {[
                  { order: "#1247", table: "Table 12", items: "2 items", time: "8 min", priority: "Normal" },
                  { order: "#1248", table: "Room 2047", items: "3 items", time: "5 min", priority: "VIP" },
                  { order: "#1249", table: "Bar", items: "1 item", time: "2 min", priority: "Express" }
                ].map((order, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{order.order}</span>
                      <Badge variant={
                        order.priority === 'VIP' ? 'default' :
                        order.priority === 'Express' ? 'destructive' : 'outline'
                      } className="text-xs">
                        {order.priority}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{order.table} • {order.items} • {order.time} ago</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Processing */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-orange-400" />
                Payment Processing & Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Integrated payment processing with support for all major payment methods, split billing, room charging, 
                and comprehensive sales analytics across all F&B outlets and retail operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Daily Revenue</h4>
                  <div className="text-2xl font-bold text-primary">$8,467</div>
                  <p className="text-sm text-muted-foreground">+12% vs yesterday</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Transactions</h4>
                  <div className="text-2xl font-bold text-primary">156</div>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Room Charges</h4>
                  <div className="text-2xl font-bold text-primary">$2,340</div>
                  <p className="text-sm text-muted-foreground">28% of sales</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Tips</h4>
                  <div className="text-2xl font-bold text-primary">$547</div>
                  <p className="text-sm text-muted-foreground">6.5% avg rate</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Comps/Voids</h4>
                  <div className="text-2xl font-bold text-primary">$89</div>
                  <p className="text-sm text-muted-foreground">1.1% of sales</p>
                </div>
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

export default POSPage