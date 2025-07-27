import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  CreditCard, 
  Shield, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Smartphone
} from "lucide-react"

export default function PaymentGatewayPage() {
  return (
    <AppShell>
      <div className="space-y-6 bg-background min-h-full">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Payment Gateway & Billing
          </h1>
          <p className="text-muted-foreground">
            Secure payment processing, multi-currency support, and integrated billing for seamless transactions
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Transactions</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+23% from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.7%</div>
              <p className="text-xs text-muted-foreground">Above industry avg</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processing Volume</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$64,820</div>
              <p className="text-xs text-muted-foreground">Today</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Processing Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.3s</div>
              <p className="text-xs text-muted-foreground">-0.4s improvement</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods & Security */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          
          {/* Payment Methods Performance */}
          <Card className="xl:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods & Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { method: "Credit Cards", volume: 65, amount: "$42,130", transactions: 223, success: 99.1 },
                  { method: "Debit Cards", volume: 20, amount: "$12,964", transactions: 68, success: 98.5 },
                  { method: "Digital Wallets", volume: 10, amount: "$6,482", transactions: 34, success: 99.4 },
                  { method: "Bank Transfers", volume: 3, amount: "$1,944", transactions: 12, success: 96.8 },
                  { method: "Crypto", volume: 2, amount: "$1,300", transactions: 5, success: 100 }
                ].map((payment) => (
                  <div key={payment.method} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{payment.method}</span>
                      <Badge variant={payment.success > 98 ? "default" : "secondary"}>
                        {payment.success}% success
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <Progress value={payment.volume} className="h-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{payment.transactions} transactions</span>
                        <span className="font-medium">{payment.amount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-sm font-medium mb-2">Payment Insights</div>
                <div className="text-sm text-muted-foreground">
                  Digital wallet adoption increased 45% this quarter. Consider promoting
                  mobile payment options for faster checkout.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Compliance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security & Compliance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">PCI DSS</span>
                    <Badge variant="default">Compliant</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Level 1 certification valid until Dec 2024
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">3D Secure</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    89% of transactions authenticated
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Fraud Detection</span>
                    <Badge variant="default">Monitoring</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    0.02% fraud rate this month
                  </div>
                </div>

                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">SSL Certificate</span>
                    <Badge variant="default">Valid</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    256-bit encryption active
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Security Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Transaction Monitoring & Multi-Currency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          
          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    id: "TXN-2024-001234",
                    amount: "$289.50",
                    method: "Visa •••• 4532",
                    status: "completed",
                    time: "2 min ago",
                    guest: "Sarah Johnson"
                  },
                  {
                    id: "TXN-2024-001233",
                    amount: "$156.00",
                    method: "Apple Pay",
                    status: "completed",
                    time: "5 min ago",
                    guest: "Michael Chen"
                  },
                  {
                    id: "TXN-2024-001232",
                    amount: "$425.75",
                    method: "Mastercard •••• 8901",
                    status: "pending",
                    time: "8 min ago",
                    guest: "Emma Wilson"
                  },
                  {
                    id: "TXN-2024-001231",
                    amount: "$89.25",
                    method: "Google Pay",
                    status: "completed",
                    time: "12 min ago",
                    guest: "David Kumar"
                  },
                  {
                    id: "TXN-2024-001230",
                    amount: "$345.00",
                    method: "Visa •••• 7788",
                    status: "failed",
                    time: "15 min ago",
                    guest: "Lisa Anderson"
                  }
                ].map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        transaction.status === "completed" ? "bg-green-500" :
                        transaction.status === "pending" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                      <div>
                        <div className="font-medium text-sm">{transaction.guest}</div>
                        <div className="text-xs text-muted-foreground">
                          {transaction.method} • {transaction.time}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{transaction.amount}</div>
                      <Badge 
                        variant={
                          transaction.status === "completed" ? "default" :
                          transaction.status === "pending" ? "secondary" : "destructive"
                        }
                        className="text-xs"
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Multi-Currency & Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Multi-Currency & Fees
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="text-sm font-medium">Supported Currencies</div>
                {[
                  { currency: "USD", volume: 78, amount: "$50,520", rate: "1.00" },
                  { currency: "EUR", volume: 15, amount: "€9,750", rate: "0.92" },
                  { currency: "GBP", volume: 4, amount: "£3,250", rate: "0.81" },
                  { currency: "CAD", volume: 3, amount: "C$1,950", rate: "1.25" }
                ].map((curr) => (
                  <div key={curr.currency} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{curr.currency}</div>
                      <div className="text-sm text-muted-foreground">
                        Rate: {curr.rate}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{curr.amount}</div>
                      <div className="text-sm text-muted-foreground">{curr.volume}%</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Processing Fees</div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Total Fees (Today)</span>
                    <span className="font-medium">$194.46</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>Average Rate</span>
                    <span className="font-medium">2.8%</span>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Currency Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  )
} 