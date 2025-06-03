

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Eye,
  Lock,
  Database,
  Mail,
  Cookie,
  Users,
  FileText,
  Calendar,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate()
  const lastUpdated = "January 15, 2025"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>

          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your privacy is important to us. This policy explains how we collect, use, and protect your personal
              information.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Navigation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="#information-collection" className="text-primary hover:underline">
                Information We Collect
              </a>
              <a href="#information-use" className="text-primary hover:underline">
                How We Use Information
              </a>
              <a href="#information-sharing" className="text-primary hover:underline">
                Information Sharing
              </a>
              <a href="#data-security" className="text-primary hover:underline">
                Data Security
              </a>
              <a href="#cookies" className="text-primary hover:underline">
                Cookies & Tracking
              </a>
              <a href="#user-rights" className="text-primary hover:underline">
                Your Rights
              </a>
              <a href="#children-privacy" className="text-primary hover:underline">
                Children's Privacy
              </a>
              <a href="#contact" className="text-primary hover:underline">
                Contact Us
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to BookStore ("we," "our," or "us"). We are committed to protecting your privacy and ensuring
                the security of your personal information. This Privacy Policy explains how we collect, use, disclose,
                and safeguard your information when you visit our website and use our services.
              </p>
              <p>
                By using our website and services, you consent to the collection and use of your information as
                described in this Privacy Policy. If you do not agree with our policies and practices, please do not use
                our services.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card id="information-collection">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">Personal Information</Badge>
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong>Account Information:</strong> Name, email address, password, and profile picture
                  </li>
                  <li>
                    • <strong>Contact Information:</strong> Billing and shipping addresses, phone number
                  </li>
                  <li>
                    • <strong>Payment Information:</strong> Credit card details, billing information (processed securely
                    through third-party payment processors)
                  </li>
                  <li>
                    • <strong>Order Information:</strong> Purchase history, order details, preferences
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">Automatically Collected Information</Badge>
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>
                    • <strong>Device Information:</strong> IP address, browser type, operating system, device
                    identifiers
                  </li>
                  <li>
                    • <strong>Usage Information:</strong> Pages visited, time spent on site, click patterns, search
                    queries
                  </li>
                  <li>
                    • <strong>Location Information:</strong> General geographic location based on IP address
                  </li>
                  <li>
                    • <strong>Cookies and Tracking:</strong> Information collected through cookies, web beacons, and
                    similar technologies
                  </li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Badge variant="outline">Information from Third Parties</Badge>
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>• Social media platforms (when you connect your accounts)</li>
                  <li>• Payment processors and financial institutions</li>
                  <li>• Marketing and analytics partners</li>
                  <li>• Public databases and data aggregators</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card id="information-use">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>We use the information we collect for the following purposes:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Service Provision</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Process and fulfill orders</li>
                    <li>• Manage your account</li>
                    <li>• Provide customer support</li>
                    <li>• Send order confirmations and updates</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Communication</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Send promotional emails and newsletters</li>
                    <li>• Notify you about new products and offers</li>
                    <li>• Respond to your inquiries</li>
                    <li>• Send important service announcements</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Personalization</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Recommend books based on your preferences</li>
                    <li>• Customize your shopping experience</li>
                    <li>• Remember your preferences and settings</li>
                    <li>• Show relevant advertisements</li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Analytics & Improvement</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Analyze website usage and performance</li>
                    <li>• Improve our products and services</li>
                    <li>• Conduct research and analytics</li>
                    <li>• Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information Sharing */}
          <Card id="information-sharing">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information
                in the following circumstances:
              </p>

              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Service Providers</h4>
                  <p className="text-sm text-muted-foreground">
                    We share information with trusted third-party service providers who help us operate our business,
                    such as payment processors, shipping companies, and email service providers.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">Legal Requirements</h4>
                  <p className="text-sm text-muted-foreground">
                    We may disclose information when required by law, court order, or government request, or to protect
                    our rights, property, or safety.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">Business Transfers</h4>
                  <p className="text-sm text-muted-foreground">
                    In the event of a merger, acquisition, or sale of assets, your information may be transferred to the
                    new entity, subject to the same privacy protections.
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h4 className="font-semibold">With Your Consent</h4>
                  <p className="text-sm text-muted-foreground">
                    We may share information with your explicit consent or at your direction, such as when you choose to
                    share content on social media.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card id="data-security">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement appropriate technical and organizational security measures to protect your personal
                information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Technical Safeguards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Encrypted data storage</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Secure payment processing</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Administrative Safeguards</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Limited access to personal information</li>
                    <li>• Employee training on data protection</li>
                    <li>• Regular privacy impact assessments</li>
                    <li>• Incident response procedures</li>
                  </ul>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Important:</strong> While we strive to protect your information, no method of transmission
                  over the internet or electronic storage is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies and Tracking */}
          <Card id="cookies">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5" />
                Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze site
                traffic, and personalize content.
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Types of Cookies We Use</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Essential Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Required for basic site functionality and security
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Performance Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Help us understand how visitors interact with our site
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Functional Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Remember your preferences and personalize your experience
                      </p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <h5 className="font-medium">Marketing Cookies</h5>
                      <p className="text-sm text-muted-foreground">
                        Used to deliver relevant advertisements and track campaign effectiveness
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Managing Cookies</h4>
                  <p className="text-sm">
                    You can control cookies through your browser settings. However, disabling certain cookies may affect
                    the functionality of our website. You can also use our cookie preference center to manage your
                    cookie settings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card id="user-rights">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Your Privacy Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Access
                    </Badge>
                    <div>
                      <p className="text-sm">Request a copy of the personal information we hold about you</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Correction
                    </Badge>
                    <div>
                      <p className="text-sm">Request correction of inaccurate or incomplete information</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Deletion
                    </Badge>
                    <div>
                      <p className="text-sm">
                        Request deletion of your personal information (subject to legal requirements)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Portability
                    </Badge>
                    <div>
                      <p className="text-sm">Request transfer of your data to another service provider</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Restriction
                    </Badge>
                    <div>
                      <p className="text-sm">Request restriction of processing under certain circumstances</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Badge variant="outline" className="mt-1">
                      Objection
                    </Badge>
                    <div>
                      <p className="text-sm">Object to processing based on legitimate interests or direct marketing</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  To exercise these rights, please contact us using the information provided in the "Contact Us"
                  section. We will respond to your request within the timeframe required by applicable law.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card id="children-privacy">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Children's Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our services are not intended for children under the age of 13. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected personal information from
                a child under 13, we will take steps to delete such information.
              </p>
              <p>
                If you are a parent or guardian and believe that your child has provided us with personal information,
                please contact us immediately so we can take appropriate action.
              </p>
            </CardContent>
          </Card>

          {/* International Transfers */}
          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure that
                such transfers are conducted in accordance with applicable data protection laws and that appropriate
                safeguards are in place to protect your information.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology,
                legal requirements, or other factors. We will notify you of any material changes by posting the updated
                policy on our website and updating the "Last Updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to stay informed about how we protect your
                information.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card id="contact">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices,
                please contact us:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">General Inquiries</h4>
                  <div className="space-y-1 text-sm">
                    <p>Email: privacy@bookstore.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Mailing Address</h4>
                  <div className="space-y-1 text-sm">
                    <p>BookStore Privacy Team</p>
                    <p>123 Book Street</p>
                    <p>Reading City, RC 12345</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Us
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Data Request Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
