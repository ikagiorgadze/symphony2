import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, PieChart, FileText, TrendingUp, DollarSign, CreditCard } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const FinancePage = () => {
  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Financial Management</h1>
          <p className="text-muted-foreground">Comprehensive accounting, revenue analytics, and financial reporting for data-driven decisions</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Finance" 
          systemIcon={Calculator}
          suggestedActions={[
            "Process Payment",
            "Generate Invoice", 
            "Record Transaction",
            "Generate Financial Report"
          ]}
          presetActions={[
            "Process guest payment",
            "Generate daily revenue report",
            "Record expense transaction",
            "Create invoice for corporate client",
            "Reconcile credit card transactions",
            "Process refund request",
            "Update budget allocations",
            "Generate profit and loss statement",
            "Calculate tax obligations",
            "Process vendor payments",
            "Create monthly financial summary",
            "Track department expenses",
            "Process payroll transactions",
            "Generate cash flow analysis",
            "Update general ledger",
            "Create audit trail documentation",
            "Process bank reconciliation",
            "Generate variance reports",
            "Track commission payments",
            "Create year-end financial reports"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Analytics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                Revenue Analytics & Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Real-time revenue tracking with detailed breakdowns by revenue center, channel, and guest segment. 
                Advanced forecasting and variance analysis to optimize financial performance.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Today's Revenue</h4>
                  <div className="text-2xl font-bold text-primary">$28,467</div>
                  <p className="text-sm text-muted-foreground">+12% vs forecast</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">MTD Revenue</h4>
                  <div className="text-2xl font-bold text-primary">$547,890</div>
                  <p className="text-sm text-muted-foreground">+8% vs last month</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">YTD Growth</h4>
                  <div className="text-2xl font-bold text-primary">+15.3%</div>
                  <p className="text-sm text-muted-foreground">vs last year</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">GOP Margin</h4>
                  <div className="text-2xl font-bold text-primary">34.2%</div>
                  <p className="text-sm text-muted-foreground">Gross operating profit</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold">Revenue Breakdown</h4>
                {[
                  { center: "Room Revenue", amount: "$18,245", percentage: "64%", change: "+8%" },
                  { center: "F&B Revenue", amount: "$6,890", percentage: "24%", change: "+15%" },
                  { center: "Spa & Wellness", amount: "$2,340", percentage: "8%", change: "+3%" },
                  { center: "Other Revenue", amount: "$992", percentage: "4%", change: "+22%" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-emerald-600" />
                      </div>
                      <div>
                        <div className="font-medium">{item.center}</div>
                        <div className="text-sm text-muted-foreground">{item.percentage} of total • {item.change} growth</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{item.amount}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Accounting Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-emerald-400" />
                General Ledger & Accounting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                        Automated accounting with real-time GL updates, expense tracking, and journal entry management.
        Direct integration with PMS and POS systems.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Cash Position</div>
                    <div className="text-sm text-muted-foreground">All accounts</div>
                  </div>
                  <Badge variant="default">$247,890</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">A/R Outstanding</div>
                    <div className="text-sm text-muted-foreground">Accounts receivable</div>
                  </div>
                  <Badge variant="secondary">$34,567</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">A/P Current</div>
                    <div className="text-sm text-muted-foreground">Accounts payable</div>
                  </div>
                  <Badge variant="outline">$18,923</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">Expense YTD</div>
                    <div className="text-sm text-muted-foreground">Operating expenses</div>
                  </div>
                  <Badge variant="secondary">$2,456,789</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Recent Transactions</h4>
                {[
                  { type: "Credit Card Fees", amount: "-$147", status: "Posted" },
                  { type: "F&B Supplier Payment", amount: "-$2,340", status: "Pending" },
                  { type: "Room Revenue", amount: "+$18,245", status: "Posted" }
                ].map((transaction, index) => (
                  <div key={index} className="p-2 border rounded text-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{transaction.type}</span>
                      <Badge variant={transaction.status === 'Posted' ? 'default' : 'outline'} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                    <div className="text-muted-foreground">{transaction.amount}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Reports */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-400" />
                Financial Reports & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Automated financial statement generation, tax reporting, and compliance monitoring. 
                Customizable reports for management, investors, and regulatory requirements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">P&L Current Month</h4>
                  <div className="text-2xl font-bold text-primary">$89,456</div>
                  <p className="text-sm text-muted-foreground">Net income</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Balance Sheet</h4>
                  <div className="text-2xl font-bold text-primary">$2.4M</div>
                  <p className="text-sm text-muted-foreground">Total assets</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Cash Flow</h4>
                  <div className="text-2xl font-bold text-primary">+$67,890</div>
                  <p className="text-sm text-muted-foreground">Operating CF</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Budget Variance</h4>
                  <div className="text-2xl font-bold text-primary">+3.2%</div>
                  <p className="text-sm text-muted-foreground">vs budget</p>
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

export default FinancePage