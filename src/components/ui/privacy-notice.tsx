import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Check, Lock, Eye, Trash2, FileText } from "lucide-react"

export function PrivacyNotice() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Shield className="w-4 h-4 mr-2" />
          Privacy & Compliance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Privacy & Data Compliance
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Compliance Status */}
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Check className="w-5 h-5 text-green-600" />
                <span className="font-semibold text-green-800">Fully Compliant</span>
                <Badge variant="default" className="bg-green-100 text-green-700">
                  GDPR • PCI DSS • CCPA
                </Badge>
              </div>
              <p className="text-sm text-green-700 mt-2">
                All guest data processing meets international privacy standards
              </p>
            </CardContent>
          </Card>

          {/* Data Collection Notice */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              Data Collection & Usage
            </h3>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What We Collect</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Basic contact information (name, email, phone)</li>
                <li>• Booking and stay history</li>
                <li>• Service preferences and requests</li>
                <li>• Feedback and communication records</li>
                <li>• Payment information (securely encrypted)</li>
              </ul>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-medium text-purple-900 mb-2">How We Use It</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Personalize your stay experience</li>
                <li>• Improve service quality and resolve issues</li>
                <li>• Send relevant offers and communications (with consent)</li>
                <li>• Ensure security and prevent fraud</li>
                <li>• Comply with legal and regulatory requirements</li>
              </ul>
            </div>
          </div>

          {/* Guest Rights */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Your Privacy Rights
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Access & Portability</h4>
                <p className="text-sm text-muted-foreground">
                  Request a copy of all your personal data in a portable format
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Correction & Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Update or correct any inaccurate personal information
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Deletion Right</h4>
                <p className="text-sm text-muted-foreground">
                  Request deletion of your data (subject to legal requirements)
                </p>
              </div>
              
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-2">Consent Withdrawal</h4>
                <p className="text-sm text-muted-foreground">
                  Withdraw consent for marketing communications anytime
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Security Measures
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Lock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <h4 className="font-medium">Encryption</h4>
                  <p className="text-xs text-muted-foreground">
                    AES-256 encryption for all data
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h4 className="font-medium">Access Control</h4>
                  <p className="text-xs text-muted-foreground">
                    Role-based staff access limits
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h4 className="font-medium">Audit Trail</h4>
                  <p className="text-xs text-muted-foreground">
                    Complete access logging
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Retention */}
          <div className="bg-gray-50 border rounded-lg p-4">
            <h4 className="font-medium flex items-center mb-2">
              <Trash2 className="w-4 h-4 mr-2" />
              Data Retention Policy
            </h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>• Guest profiles: Retained for 7 years after last stay</p>
              <p>• Payment data: Automatically deleted after 3 years</p>
              <p>• Marketing preferences: Retained until consent withdrawn</p>
              <p>• Complaint records: Retained for 5 years for quality assurance</p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Privacy Questions?</h4>
            <p className="text-sm text-muted-foreground">
              Contact our Data Protection Officer at{" "}
              <a href="mailto:privacy@hotel.com" className="text-primary hover:underline">
                privacy@hotel.com
              </a>{" "}
              or call +1 (555) 123-4567
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 