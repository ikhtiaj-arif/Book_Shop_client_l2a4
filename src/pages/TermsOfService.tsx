

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  Scale,
  ShoppingCart,
  CreditCard,
  Truck,
  RotateCcw,
  Shield,
  AlertTriangle,
  Calendar,
  ArrowLeft,
  Mail,
  ExternalLink,
  User,
  Ban,
} from "lucide-react"
import { useNavigate } from "react-router-dom"

const TermsOfService: React.FC = () => {
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
              <Scale className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Terms of Service</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Please read these terms carefully before using our services. By using BookStore, you agree to be bound by
              these terms.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>
        </div>

        {/* Important Notice */}
        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Important:</strong> These terms constitute a legally binding agreement between you and BookStore. If
            you do not agree to these terms, please do not use our services.
          </AlertDescription>
        </Alert>

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
              <a href="#acceptance" className="text-primary hover:underline">
                Acceptance of Terms
              </a>
              <a href="#account" className="text-primary hover:underline">
                Account Registration
              </a>
              <a href="#purchases" className="text-primary hover:underline">
                Purchases & Payment
              </a>
              <a href="#shipping" className="text-primary hover:underline">
                Shipping & Delivery
              </a>
              <a href="#returns" className="text-primary hover:underline">
                Returns & Refunds
              </a>
              <a href="#user-conduct" className="text-primary hover:underline">
                User Conduct
              </a>
              <a href="#intellectual-property" className="text-primary hover:underline">
                Intellectual Property
              </a>
              <a href="#limitation-liability" className="text-primary hover:underline">
                Limitation of Liability
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Acceptance of Terms */}
          <Card id="acceptance">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                Acceptance of Terms
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Welcome to BookStore ("we," "our," or "us"). These Terms of Service ("Terms") govern your use of our
                website, mobile application, and services (collectively, the "Service") operated by BookStore.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part
                of these terms, then you may not access the Service.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Note:</strong> We reserve the right to modify these Terms at any time. Changes will be
                  effective immediately upon posting. Your continued use of the Service constitutes acceptance of the
                  modified Terms.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Account Registration */}
          <Card id="account">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Registration and Responsibilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Account Creation</h3>
                <ul className="space-y-2 ml-4">
                  <li>• You must be at least 18 years old to create an account</li>
                  <li>• You must provide accurate, current, and complete information</li>
                  <li>• You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>• You may not create multiple accounts or share your account with others</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Account Security</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600">You Must:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Use a strong, unique password</li>
                      <li>• Keep your login credentials secure</li>
                      <li>• Notify us immediately of unauthorized access</li>
                      <li>• Log out from shared devices</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-red-600">You Must Not:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Share your account with others</li>
                      <li>• Use another person's account</li>
                      <li>• Create accounts with false information</li>
                      <li>• Attempt to access other users' accounts</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Account Termination:</strong> We reserve the right to suspend or terminate accounts that
                  violate these Terms or engage in fraudulent, abusive, or illegal activities.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Purchases and Payment */}
          <Card id="purchases">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Purchases and Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Terms
                </h3>
                <ul className="space-y-2 ml-4">
                  <li>• All prices are listed in USD and include applicable taxes</li>
                  <li>• Payment is due at the time of purchase</li>
                  <li>• We accept major credit cards, debit cards, and PayPal</li>
                  <li>• Payment processing is handled by secure third-party providers</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Order Processing</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold">Order Confirmation</h4>
                    <p className="text-sm text-muted-foreground">
                      You will receive an email confirmation once your order is placed and payment is processed.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <h4 className="font-semibold">Inventory Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      All orders are subject to product availability. We reserve the right to cancel orders if items
                      become unavailable.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold">Pricing Errors</h4>
                    <p className="text-sm text-muted-foreground">
                      We reserve the right to correct pricing errors and cancel orders placed at incorrect prices.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Accepted Payment Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Credit Cards</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-green-600" />
                    <p className="text-sm font-medium">Debit Cards</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                    <p className="text-sm font-medium">PayPal</p>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <CreditCard className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                    <p className="text-sm font-medium">Digital Wallets</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping and Delivery */}
          <Card id="shipping">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping and Delivery
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Shipping Options</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-green-600">Standard Shipping</h4>
                    <p className="text-sm text-muted-foreground">5-7 business days</p>
                    <p className="text-sm">Free on orders over $50</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-blue-600">Express Shipping</h4>
                    <p className="text-sm text-muted-foreground">2-3 business days</p>
                    <p className="text-sm">$9.99 flat rate</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-purple-600">Overnight Shipping</h4>
                    <p className="text-sm text-muted-foreground">1 business day</p>
                    <p className="text-sm">$19.99 flat rate</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Delivery Terms</h3>
                <ul className="space-y-2 ml-4">
                  <li>• Delivery times are estimates and not guaranteed</li>
                  <li>• You must provide a valid shipping address</li>
                  <li>• Someone must be available to receive the package</li>
                  <li>• We are not responsible for packages stolen after delivery</li>
                  <li>• International shipping may be subject to customs fees</li>
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Shipping Restrictions:</strong> We currently ship within the United States and select
                  international locations. Some items may have shipping restrictions based on local laws.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Returns and Refunds */}
          <Card id="returns">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5" />
                Returns and Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Return Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-2">Eligible for Return</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Items in original condition</li>
                      <li>• Returned within 30 days of delivery</li>
                      <li>• Books without writing or damage</li>
                      <li>• Items with original packaging</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Not Eligible for Return</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Digital/downloadable products</li>
                      <li>• Personalized or custom items</li>
                      <li>• Items damaged by customer</li>
                      <li>• Items returned after 30 days</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">Refund Process</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      1
                    </Badge>
                    <div>
                      <h4 className="font-medium">Initiate Return</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact customer service or use our online return portal
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      2
                    </Badge>
                    <div>
                      <h4 className="font-medium">Ship Items Back</h4>
                      <p className="text-sm text-muted-foreground">
                        Package items securely and ship using provided return label
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      3
                    </Badge>
                    <div>
                      <h4 className="font-medium">Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        We inspect returned items within 3-5 business days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Badge variant="outline" className="mt-1">
                      4
                    </Badge>
                    <div>
                      <h4 className="font-medium">Refund Issued</h4>
                      <p className="text-sm text-muted-foreground">
                        Refunds processed to original payment method within 5-10 business days
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Return Shipping:</strong> Customers are responsible for return shipping costs unless the item
                  was damaged or defective upon arrival.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* User Conduct */}
          <Card id="user-conduct">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Ban className="h-5 w-5" />
                User Conduct and Prohibited Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Acceptable Use</h3>
                <p className="mb-4">
                  You agree to use our Service only for lawful purposes and in accordance with these Terms. You are
                  responsible for your conduct and any content you submit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Prohibited Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Security Violations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Attempting to hack or breach security</li>
                      <li>• Using automated tools to access the Service</li>
                      <li>• Interfering with Service functionality</li>
                      <li>• Accessing other users' accounts</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Content Violations</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Posting illegal or harmful content</li>
                      <li>• Infringing intellectual property rights</li>
                      <li>• Spreading false or misleading information</li>
                      <li>• Harassing or threatening other users</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">Commercial Misuse</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Reselling products without authorization</li>
                      <li>• Using the Service for commercial purposes</li>
                      <li>• Fraudulent payment activities</li>
                      <li>• Creating fake reviews or ratings</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-600 mb-2">System Abuse</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Overloading our servers</li>
                      <li>• Distributing malware or viruses</li>
                      <li>• Reverse engineering our software</li>
                      <li>• Circumventing access restrictions</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Enforcement:</strong> Violation of these terms may result in account suspension, termination,
                  and legal action. We reserve the right to investigate and take appropriate action.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card id="intellectual-property">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Intellectual Property Rights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Our Content</h3>
                <p className="mb-4">
                  The Service and its original content, features, and functionality are owned by BookStore and are
                  protected by international copyright, trademark, patent, trade secret, and other intellectual property
                  laws.
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Website design, layout, and graphics</li>
                  <li>• BookStore trademarks and logos</li>
                  <li>• Software and technology</li>
                  <li>• Product descriptions and reviews</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-semibold mb-3">User-Generated Content</h3>
                <p className="mb-4">
                  By submitting content to our Service (reviews, comments, etc.), you grant us a non-exclusive,
                  worldwide, royalty-free license to use, modify, and display such content.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-green-600">You Retain</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Ownership of your original content</li>
                      <li>• Right to remove your content</li>
                      <li>• Control over personal information</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold text-blue-600">You Grant Us</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Right to display your content</li>
                      <li>• Right to moderate content</li>
                      <li>• Right to use for promotional purposes</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Copyright Infringement</h3>
                <p className="mb-4">
                  We respect intellectual property rights and expect our users to do the same. If you believe your
                  copyright has been infringed, please contact us with:
                </p>
                <ul className="space-y-1 ml-4 text-sm">
                  <li>• Description of the copyrighted work</li>
                  <li>• Location of the infringing material</li>
                  <li>• Your contact information</li>
                  <li>• Statement of good faith belief</li>
                  <li>• Statement of accuracy and authorization</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card id="limitation-liability">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Limitation of Liability and Disclaimers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Service Disclaimers</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm">
                    <strong>AS IS BASIS:</strong> Our Service is provided "as is" and "as available" without warranties
                    of any kind, either express or implied, including but not limited to merchantability, fitness for a
                    particular purpose, and non-infringement.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Limitation of Liability</h3>
                <p className="mb-4">
                  To the maximum extent permitted by law, BookStore shall not be liable for any indirect, incidental,
                  special, consequential, or punitive damages, including but not limited to:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <ul className="space-y-1 text-sm">
                    <li>• Loss of profits or revenue</li>
                    <li>• Loss of data or information</li>
                    <li>• Business interruption</li>
                    <li>• Loss of goodwill</li>
                  </ul>
                  <ul className="space-y-1 text-sm">
                    <li>• Personal injury or property damage</li>
                    <li>• Third-party claims</li>
                    <li>• Unauthorized access to accounts</li>
                    <li>• Service interruptions</li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Maximum Liability</h3>
                <p className="text-sm">
                  Our total liability to you for any claims arising from or related to these Terms or the Service shall
                  not exceed the amount you paid to us in the twelve (12) months preceding the claim, or $100, whichever
                  is greater.
                </p>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm">
                  <strong>Important:</strong> Some jurisdictions do not allow the exclusion or limitation of certain
                  damages, so some of the above limitations may not apply to you.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Governing Law */}
          <Card>
            <CardHeader>
              <CardTitle>Governing Law and Dispute Resolution</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Governing Law</h3>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the State of [Your
                  State], without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Dispute Resolution</h3>
                <p className="mb-4">
                  Any disputes arising from these Terms or the Service shall be resolved through binding arbitration in
                  accordance with the rules of the American Arbitration Association.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Arbitration Process</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Single arbitrator</li>
                      <li>• Location: [Your City, State]</li>
                      <li>• English language proceedings</li>
                      <li>• Final and binding decision</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold">Exceptions</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Intellectual property disputes</li>
                      <li>• Small claims court matters</li>
                      <li>• Injunctive relief requests</li>
                      <li>• Emergency situations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>Termination</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by You</h3>
                <p>
                  You may terminate your account at any time by contacting customer service or using the account
                  deletion feature in your profile settings.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Termination by Us</h3>
                <p className="mb-4">
                  We may terminate or suspend your account immediately, without prior notice, for any reason, including
                  but not limited to:
                </p>
                <ul className="space-y-1 ml-4 text-sm">
                  <li>• Violation of these Terms</li>
                  <li>• Fraudulent or illegal activity</li>
                  <li>• Abuse of the Service</li>
                  <li>• Non-payment of fees</li>
                  <li>• Extended inactivity</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Effect of Termination</h3>
                <p>
                  Upon termination, your right to use the Service will cease immediately. We may retain certain
                  information as required by law or for legitimate business purposes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Miscellaneous */}
          <Card>
            <CardHeader>
              <CardTitle>Miscellaneous</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Entire Agreement</h4>
                  <p className="text-sm text-muted-foreground">
                    These Terms constitute the entire agreement between you and BookStore regarding the Service.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Severability</h4>
                  <p className="text-sm text-muted-foreground">
                    If any provision is found unenforceable, the remaining provisions will remain in full force.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Waiver</h4>
                  <p className="text-sm text-muted-foreground">
                    Our failure to enforce any right or provision does not constitute a waiver of such right.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Assignment</h4>
                  <p className="text-sm text-muted-foreground">
                    You may not assign these Terms without our consent. We may assign our rights and obligations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>If you have any questions about these Terms of Service, please contact us:</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-semibold">Legal Department</h4>
                  <div className="space-y-1 text-sm">
                    <p>Email: legal@bookstore.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Hours: Monday-Friday, 9 AM - 6 PM EST</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Mailing Address</h4>
                  <div className="space-y-1 text-sm">
                    <p>BookStore Legal Department</p>
                    <p>123 Book Street</p>
                    <p>Reading City, RC 12345</p>
                    <p>United States</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Contact Legal Team
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Download PDF Version
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default TermsOfService
