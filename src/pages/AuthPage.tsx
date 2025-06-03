
/* eslint-disable @typescript-eslint/no-explicit-any */

import type React from "react"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react"

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { useLoginMutation, useRegistrationMutation } from "../redux/features/auth/authApi"
import { setUser, type TUser } from "../redux/features/auth/authSlice"
import { useAppDispatch } from "../redux/hooks"
import { verifyToken } from "../utils/verifyToken"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Checkbox } from "../components/ui/checkbox"

const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  // RTK Query hooks
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  const [register, { isLoading: isRegisterLoading }] = useRegistrationMutation()

  // Form state
  const [loginForm, setLoginForm] = useState({
    email: "user3..user.com",
    password: "user",
  })

  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // Handle login form input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle register form input changes
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegisterForm((prev) => ({ ...prev, [name]: value }))
  }

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const toastId = toast.loading("Logging in")

    try {
      const userInfo = {
        email: loginForm.email,
        password: loginForm.password,
      }

      const res = await login(userInfo).unwrap()
      console.log("Login response:", res)

      if (res.success && res.data?.accessToken) {
        const user = verifyToken(res.data.accessToken) as TUser

        if (user) {
          localStorage.setItem("accessToken", res.data.accessToken)
          dispatch(setUser({ user: user, token: res.data.accessToken }))

          navigate("/")
          toast.success("Logged in successfully", { id: toastId })
        } else {
          toast.error("Invalid token received", { id: toastId })
        }
      } else {
        toast.error(res.message || "Login failed", { id: toastId })
      }
    } catch (err: any) {
      console.error("Login error:", err)
      const errorMessage = err?.data?.message || "Invalid email or password"
      toast.error(errorMessage, { id: toastId })
    }
  }

  // Handle register form submission
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (registerForm.password.length < 6) {
      toast.error("Password must be at least 6 characters long")
      return
    }

    const toastId = toast.loading("Creating your account")

    try {
      const userInfo = {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        role: "user", // Default role
      }

      const res = await register(userInfo).unwrap()
      console.log("Registration response:", res)

      if (res.success) {
        toast.success("Account created successfully", { id: toastId })
        setActiveTab("login")
        setLoginForm({
          email: registerForm.email,
          password: registerForm.password,
        })
        // Reset register form
        setRegisterForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        })
      } else {
        toast.error(res.message || "Registration failed", { id: toastId })
      }
    } catch (err: any) {
      console.error("Registration error:", err)
      const errorMessage = err?.data?.message || "Registration failed"
      toast.error(errorMessage, { id: toastId })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-2">
              <Lock className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Welcome to Book Shop</h1>
          <p className="text-muted-foreground">Sign in to your account or create a new one</p>
        </div>

        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name..example.com"
                        value={loginForm.email}
                        onChange={handleLoginChange}
                        className="pl-10"
                        required
                        disabled={isLoginLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs"
                        onClick={() => navigate("/forgot-password")}
                        type="button"
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={loginForm.password}
                        onChange={handleLoginChange}
                        className="pl-10"
                        required
                        disabled={isLoginLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoginLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="flex gap-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-1/2"
                      onClick={() => {
                        setLoginForm({
                          email: "admin@gmail.com",
                          password: "111111",
                        })
                      }}
                    >
                      Admin Login
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-1/2"
                      onClick={() => {
                        setLoginForm({
                          email: "user@gmail.com",
                          password: "111111",
                        })
                      }}
                    >
                      User Login
                    </Button>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoginLoading}>
                    {isLoginLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" onClick={() => setActiveTab("register")}>
                  Don't have an account? Sign up
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Create an Account</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={registerForm.name}
                        onChange={handleRegisterChange}
                        className="pl-10"
                        required
                        disabled={isRegisterLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-email"
                        name="email"
                        type="email"
                        placeholder="name..example.com"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
                        className="pl-10"
                        required
                        disabled={isRegisterLoading}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="register-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        className="pl-10"
                        required
                        disabled={isRegisterLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-10 w-10"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isRegisterLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={registerForm.confirmPassword}
                        onChange={handleRegisterChange}
                        className="pl-10"
                        required
                        disabled={isRegisterLoading}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Button variant="link" className="h-auto p-0" onClick={() => navigate("/terms")} type="button">
                        Terms of Service
                      </Button>{" "}
                      and{" "}
                      <Button variant="link" className="h-auto p-0" onClick={() => navigate("/privacy")} type="button">
                        Privacy Policy
                      </Button>
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isRegisterLoading}>
                    <UserPlus className="mr-2 h-4 w-4" />
                    {isRegisterLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button variant="link" onClick={() => setActiveTab("login")}>
                  Already have an account? Sign in
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default AuthPage
