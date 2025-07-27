import { AppShell } from "@/components/layout/app-shell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, DollarSign, Users, Calendar, PieChart, FileText, Download } from "lucide-react"
import { AddWorkflowStep } from "@/components/workflow/AddWorkflowStep"
import { WorkflowBuilder } from "@/components/workflow/WorkflowBuilder"

const AnalyticsPage = () => {
  const revenueMetrics = [
    { period: "Today", amount: "$12,450", change: "+8.2%", trend: "up" },
    { period: "This Week", amount: "$89,320", change: "+12.5%", trend: "up" },
    { period: "This Month", amount: "$342,180", change: "+6.8%", trend: "up" },
    { period: "This Year", amount: "$4,285,600", change: "+15.3%", trend: "up" }
  ]

  const occupancyData = [
    { date: "Dec 10", occupancy: 87, adr: 165, revpar: 143.55 },
    { date: "Dec 11", occupancy: 92, adr: 172, revpar: 158.24 },
    { date: "Dec 12", occupancy: 89, adr: 168, revpar: 149.52 },
    { date: "Dec 13", occupancy: 95, adr: 175, revpar: 166.25 },
    { date: "Dec 14", occupancy: 91, adr: 170, revpar: 154.70 },
    { date: "Dec 15", occupancy: 88, adr: 167, revpar: 146.96 }
  ]

  const channelPerformance = [
    { channel: "Direct Booking", bookings: 145, revenue: "$24,650", percentage: 28.5, growth: "+12%" },
    { channel: "Booking.com", bookings: 132, revenue: "$22,440", percentage: 26.0, growth: "+8%" },
    { channel: "Expedia", bookings: 89, revenue: "$15,130", percentage: 17.5, growth: "+15%" },
    { channel: "Walk-in", bookings: 67, revenue: "$11,390", percentage: 13.2, growth: "-3%" },
    { channel: "Corporate", bookings: 45, revenue: "$7,650", percentage: 8.9, growth: "+22%" },
    { channel: "Other OTAs", bookings: 32, revenue: "$5,440", percentage: 6.3, growth: "+5%" }
  ]

  const departmentRevenue = [
    { department: "Rooms", revenue: "$45,230", percentage: 65.8, target: "$42,000", status: "above" },
    { department: "F&B", revenue: "$15,680", percentage: 22.8, target: "$16,000", status: "below" },
    { department: "Spa/Wellness", revenue: "$4,320", percentage: 6.3, target: "$4,000", status: "above" },
    { department: "Events", revenue: "$2,890", percentage: 4.2, target: "$3,500", status: "below" },
    { department: "Other", revenue: "$620", percentage: 0.9, target: "$800", status: "below" }
  ]

  const kpiMetrics = [
    { name: "Average Daily Rate (ADR)", value: "$168", target: "$165", trend: "+1.8%", status: "good" },
    { name: "Revenue Per Available Room (RevPAR)", value: "$151", target: "$148", trend: "+2.0%", status: "good" },
    { name: "Guest Satisfaction Score", value: "4.3", target: "4.2", trend: "+2.4%", status: "good" },
    { name: "Staff Productivity", value: "87%", target: "85%", trend: "+2.4%", status: "good" },
    { name: "Cost Per Occupied Room", value: "$67", target: "$70", trend: "-4.3%", status: "good" },
    { name: "Energy Cost Per Room", value: "$12", target: "$15", trend: "-20%", status: "excellent" }
  ]

  const recentReports = [
    { name: "Monthly Revenue Report", type: "Financial", generated: "Dec 15, 10:30 AM", size: "2.4 MB" },
    { name: "Guest Satisfaction Analysis", type: "Operations", generated: "Dec 15, 9:15 AM", size: "1.8 MB" },
    { name: "Channel Performance Summary", type: "Marketing", generated: "Dec 14, 5:45 PM", size: "3.1 MB" },
    { name: "Staff Performance Review", type: "HR", generated: "Dec 14, 2:20 PM", size: "1.2 MB" },
    { name: "Energy Consumption Report", type: "Sustainability", generated: "Dec 13, 11:00 AM", size: "0.9 MB" }
  ]

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-display font-bold">Analytics & Reporting</h1>
          <p className="text-muted-foreground">Comprehensive business intelligence, performance tracking, and automated reporting for data-driven decisions</p>
        </div>
        
        {/* Workflow Step Builder */}
        <AddWorkflowStep 
          systemName="Analytics" 
          systemIcon={BarChart3}
          suggestedActions={[
            "Generate Revenue Report",
            "Update KPI Dashboard", 
            "Create Custom Analysis",
            "Schedule Automated Report"
          ]}
          presetActions={[
            "Generate revenue performance report",
            "Update KPI dashboard metrics",
            "Create custom data analysis",
            "Schedule automated reporting",
            "Export financial statements",
            "Generate occupancy analytics",
            "Create channel performance summary",
            "Update forecasting models",
            "Generate guest analytics report",
            "Create operational efficiency analysis",
            "Export departmental metrics",
            "Generate comparative analysis",
            "Create trend analysis report",
            "Update business intelligence dashboard",
            "Generate compliance reports",
            "Create market performance analysis",
            "Export data visualization",
            "Generate predictive analytics",
            "Create performance benchmarking",
            "Update executive summary reports"
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Revenue Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-500" />
                Revenue Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Real-time revenue tracking with performance comparison, trend analysis, and forecasting capabilities.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {revenueMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm text-muted-foreground">{metric.period}</span>
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'}>
                        {metric.change}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{metric.amount}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Metrics */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Occupancy & Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Daily occupancy tracking with ADR and RevPAR analysis for revenue optimization insights.
              </p>
              <div className="space-y-3">
                {occupancyData.slice(-3).map((data, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <span className="font-medium">{data.date}</span>
                      <p className="text-sm text-muted-foreground">Occupancy: {data.occupancy}%</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">ADR: ${data.adr}</p>
                      <p className="text-sm text-muted-foreground">RevPAR: ${data.revpar}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Channel Performance */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-500" />
                Channel Performance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Distribution channel analysis with booking volume, revenue contribution, and growth tracking.
              </p>
              <div className="space-y-3">
                {channelPerformance.map((channel, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-medium">{channel.channel}</span>
                        <Badge variant={channel.growth.startsWith('+') ? 'default' : 'secondary'}>
                          {channel.growth}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{channel.bookings} bookings</span>
                        <span>{channel.revenue} ({channel.percentage}%)</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* KPI Dashboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                Key Performance Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Critical business metrics tracking with target comparison and performance alerts.
              </p>
              <div className="space-y-4">
                {kpiMetrics.slice(0, 4).map((kpi, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{kpi.name}</span>
                      <Badge variant={kpi.status === 'excellent' ? 'default' : 'secondary'}>
                        {kpi.trend}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">{kpi.value}</span>
                      <span className="text-sm text-muted-foreground">Target: {kpi.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Department Revenue */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="h-5 w-5 text-cyan-500" />
                Department Revenue Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Revenue distribution across departments with target comparison and performance tracking.
              </p>
              <div className="space-y-3">
                {departmentRevenue.map((dept, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{dept.department}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{dept.revenue}</span>
                        <Badge variant={dept.status === 'above' ? 'default' : 'secondary'}>
                          {dept.status === 'above' ? 'Above Target' : 'Below Target'}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${dept.status === 'above' ? 'bg-green-500' : 'bg-orange-500'}`}
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{dept.percentage}% of total</span>
                      <span>Target: {dept.target}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reports & Export */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-indigo-500" />
                Reports & Data Export
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Automated report generation and data export capabilities with customizable templates and scheduling.
              </p>
              <div className="space-y-3 mb-4">
                {recentReports.slice(0, 3).map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium text-sm">{report.name}</span>
                      <p className="text-xs text-muted-foreground">{report.type} • {report.generated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{report.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="text-sm">
                  Generate Report
                </Button>
                <Button variant="outline" className="text-sm">
                  Schedule Export
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

export default AnalyticsPage 