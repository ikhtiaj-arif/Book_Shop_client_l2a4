

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HelpCircle } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Label } from "../components/ui/label"

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support..bookshop.com",
    description: "We'll respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri, 9AM-6PM EST",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Book Street, Reading City, RC 12345",
    description: "Our flagship store location",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Mon-Fri: 9AM-6PM EST",
    description: "Weekend support available",
  },
]

const faqItems = [
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for books in original condition. Return shipping is free for defective items.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 30 countries worldwide. International shipping times vary by location.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You'll receive a tracking number via email once your order ships. You can also track orders in your account.",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Have a question or need help? We're here to assist you with anything book-related!
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="your.email..example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="order">Order Support</SelectItem>
                      <SelectItem value="shipping">Shipping Question</SelectItem>
                      <SelectItem value="return">Return/Refund</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => handleInputChange("subject", e.target.value)}
                    placeholder="Brief description of your inquiry"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: { target: { value: string } }) => handleInputChange("message", e.target.value)}
                    placeholder="Please provide details about your inquiry..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <info.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm font-medium">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-6 w-6" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-16">
        <Card>
          <CardHeader>
            <CardTitle>Find Our Store</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Interactive map would be embedded here</p>
                <p className="text-sm text-muted-foreground mt-2">123 Book Street, Reading City, RC 12345</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
