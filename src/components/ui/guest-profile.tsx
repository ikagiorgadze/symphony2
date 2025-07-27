import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { 
  User, 
  Star, 
  Calendar, 
  DollarSign, 
  Heart, 
  MessageSquare, 
  CheckCircle, 
  AlertTriangle,
  Phone,
  Mail,
  MapPin,
  Award,
  TrendingUp,
  Clock
} from "lucide-react"

interface GuestProfileProps {
  guest: {
    id: string
    name: string
    email: string
    phone: string
    vipStatus: string
    lastStay: string
    totalStays: number
    lifetimeValue: number
    preferences: string[]
    complaints: Array<{
      id: string
      type: string
      severity: string
      date: string
      status: string
      resolution: string | null
    }>
    npsScore: number
    recoveryScore: number
    nextBooking: string | null
    tags: string[]
  }
}

export function GuestProfile({ guest }: GuestProfileProps) {
  const { toast } = useToast()

  const handleMarkResolved = (complaintId: string) => {
    toast({
      title: "Complaint Resolved",
      description: "The complaint has been marked as resolved and logged in the audit trail.",
    })
  }

  const handleAddNote = () => {
    toast({
      title: "Note Added",
      description: "Your note has been added to the guest's profile.",
    })
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-700 border-green-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      case 'open': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">{guest.name}</h2>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={guest.vipStatus === 'Platinum' ? 'default' : 'secondary'}>
                <Award className="w-3 h-3 mr-1" />
                {guest.vipStatus}
              </Badge>
              <Badge variant="outline">
                Guest ID: {guest.id}
              </Badge>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{guest.npsScore}/10</div>
          <div className="text-sm text-muted-foreground">NPS Score</div>
        </div>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{guest.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{guest.phone}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-blue-500" />
              <div>
                <div className="text-lg font-semibold">{guest.totalStays}</div>
                <div className="text-xs text-muted-foreground">Total Stays</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-500" />
              <div>
                <div className="text-lg font-semibold">${guest.lifetimeValue.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Lifetime Value</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-pink-500" />
              <div>
                <div className="text-lg font-semibold">{guest.recoveryScore}%</div>
                <div className="text-xs text-muted-foreground">Recovery Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-purple-500" />
              <div>
                <div className="text-lg font-semibold">
                  {guest.nextBooking ? new Date(guest.nextBooking).toLocaleDateString() : 'None'}
                </div>
                <div className="text-xs text-muted-foreground">Next Booking</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Guest Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {guest.preferences.map((preference, index) => (
              <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                {preference}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guest Tags */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Guest Profile Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {guest.tags.map((tag, index) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Complaints & Issues */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Complaints & Service Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {guest.complaints.map((complaint) => (
              <div key={complaint.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">{complaint.type}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(complaint.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getSeverityColor(complaint.severity)}>
                      {complaint.severity === 'critical' && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {complaint.severity}
                    </Badge>
                    <Badge className={getStatusColor(complaint.status)}>
                      {complaint.status === 'resolved' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {complaint.status}
                    </Badge>
                  </div>
                </div>
                
                {complaint.resolution && (
                  <div className="bg-green-50 border border-green-200 rounded p-3 mt-3">
                    <p className="text-sm text-green-700">
                      <strong>Resolution:</strong> {complaint.resolution}
                    </p>
                  </div>
                )}
                
                {complaint.status === 'pending' && (
                  <div className="flex justify-end mt-3">
                    <Button 
                      size="sm" 
                      onClick={() => handleMarkResolved(complaint.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Mark Resolved
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={handleAddNote}>
          Add Note
        </Button>
        <Button>
          Update Profile
        </Button>
      </div>
    </div>
  )
} 