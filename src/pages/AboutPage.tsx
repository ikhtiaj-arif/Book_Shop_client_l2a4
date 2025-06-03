

import { BookOpen, Users, Award, Heart, Target, Eye, Lightbulb } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"

const stats = [
  { icon: BookOpen, label: "Books in Collection", value: "50,000+" },
  { icon: Users, label: "Happy Customers", value: "25,000+" },
  { icon: Award, label: "Years in Business", value: "15+" },
  { icon: Heart, label: "Customer Satisfaction", value: "98%" },
]

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "We carefully curate our collection to ensure every book meets our high standards for content and condition.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "Your reading experience is our priority. We're here to help you find your next great read.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously improve our platform and services to make book discovery easier and more enjoyable.",
  },
  {
    icon: Heart,
    title: "Passion for Reading",
    description: "We're book lovers ourselves, and we're passionate about sharing the joy of reading with everyone.",
  },
]

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Former librarian with 20+ years of experience in the book industry.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Michael Chen",
    role: "Head of Curation",
    bio: "Literature professor and bestselling author with expertise in contemporary fiction.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "Emily Davis",
    role: "Customer Experience Director",
    bio: "Dedicated to ensuring every customer has an exceptional experience.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
  {
    name: "David Wilson",
    role: "Technology Lead",
    bio: "Building innovative solutions to connect readers with their perfect books.",
    avatar: "/placeholder.svg?height=100&width=100",
  },
]

const timeline = [
  {
    year: "2009",
    title: "The Beginning",
    description: "Started as a small local bookstore with a passion for connecting readers with great books.",
  },
  {
    year: "2012",
    title: "Going Digital",
    description: "Launched our online platform to reach book lovers everywhere.",
  },
  {
    year: "2015",
    title: "Expanding Horizons",
    description: "Added international shipping and expanded our collection to 25,000+ titles.",
  },
  {
    year: "2018",
    title: "Community Focus",
    description: "Introduced book clubs, author events, and reading recommendations.",
  },
  {
    year: "2021",
    title: "Innovation Era",
    description: "Launched AI-powered book recommendations and mobile app.",
  },
  {
    year: "2024",
    title: "Today",
    description: "Serving 25,000+ customers with 50,000+ books and growing every day.",
  },
]

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Book Shop</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          For over 15 years, we've been passionate about connecting readers with the books they love. From humble
          beginnings as a local bookstore to becoming a trusted online destination for book lovers worldwide, our
          mission remains the same: to make great books accessible to everyone.
        </p>
      </section>

      {/* Stats */}
      <section className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To democratize access to knowledge and stories by providing an exceptional book-buying experience that
                connects readers with the perfect books for their interests, needs, and passions.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Our Vision
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed">
                To become the world's most trusted and beloved destination for book discovery, where every reader can
                find their next great read and every author can reach their ideal audience.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Journey</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="relative flex items-start gap-8">
                  <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm z-10">
                    {item.year}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <Badge variant="secondary" className="mb-3">
                  {member.role}
                </Badge>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center bg-muted/50 rounded-lg p-12">
        <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Become part of our growing community of book lovers. Discover new authors, share recommendations, and never
          run out of great books to read.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/books"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-md font-medium hover:bg-primary/90 transition-colors"
          >
            Start Shopping
          </a>
          <a
            href="/contact"
            className="border border-border px-8 py-3 rounded-md font-medium hover:bg-muted transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}
