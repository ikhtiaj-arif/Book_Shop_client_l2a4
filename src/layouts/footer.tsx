
import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Separator } from "../components/ui/separator"

const footerLinks = {
  shop: [
    { name: "All Books", href: "/books" },
    { name: "Categories", href: "/categories" },
    { name: "New Arrivals", href: "/books?filter=new" },
    { name: "Best Sellers", href: "/books?filter=bestsellers" },
    { name: "Sale", href: "/books?filter=sale" },
  ],
  support: [
    { name: "Contact Us", href: "/contact" },
    { name: "FAQ", href: "/contact" },
    // { name: "Shipping Info", href: "/" },
    // { name: "Returns", href: "/returns" },
    // { name: "Track Order", href: "/track-order" },
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/about" },
    { name: "Press", href: "/about" },
 
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Accessibility", href: "/accessibility" },
  ],
}

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://facebook.com" },
  { name: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { name: "Instagram", icon: Instagram, href: "https://instagram.com" },
  { name: "YouTube", icon: Youtube, href: "https://youtube.com" },
]

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/placeholder.svg?height=40&width=40" className="h-10 w-10" alt="Logo" />
              <h3 className="text-xl font-bold">
                <span className="text-primary">Book</span> Shop
              </h3>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Your trusted destination for discovering amazing books. From bestsellers to hidden gems, we help you find
              your next great read.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>support..bookshop.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Book Street, Reading City</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Newsletter Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="font-semibold mb-2">Stay Updated</h4>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for book recommendations and exclusive offers.
            </p>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Enter your email" className="flex-1" />
            <Button>Subscribe</Button>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">© 2024 Book Shop. All rights reserved.</div>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Button key={social.name} variant="ghost" size="icon" asChild>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <social.icon className="h-4 w-4" />
                  <span className="sr-only">{social.name}</span>
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
