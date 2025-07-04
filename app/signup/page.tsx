'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Github, Mail } from 'lucide-react'
import { MinimalCard } from '@/components/ui/minimal-card'
import { MinimalButton } from '@/components/ui/minimal-button'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic (e.g., API call or Auth0)
    console.log('Signup submitted:', formData)
  }

  const handleSocialSignup = (provider: 'github' | 'google') => {
    // Handle OAuth logic
    console.log(`${provider} signup clicked`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-md">
          {/* Back to Home Button */}
          <button
            onClick={() => router.push("/")}
            className="absolute top-20 left-6 z-10 flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </button>


          <MinimalCard className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-3">Join Junction</h1>
              <p className="text-slate-400 text-sm leading-relaxed">
                Create your account and start organizing hackathons
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialSignup('github')}
                className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Continue with GitHub</span>
              </button>

              <button
                onClick={() => handleSocialSignup('google')}
                className="w-full flex items-center justify-center space-x-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Continue with Google</span>
              </button>
            </div>

            <div className="relative mb-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-black text-white/50">or create account with email</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 transition-colors"
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="pt-2">
                <p className="text-xs text-white/50 mb-4">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="text-white/70 hover:text-white underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-white/70 hover:text-white underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>

              <MinimalButton type="submit" className="w-full mt-6">
                Create Account
              </MinimalButton>
            </form>

            <div className="mt-6 text-center text-sm text-white/70">
              Already have an account?{' '}
              <Link href="/login" className="text-white hover:underline transition-colors">
                Sign in
              </Link>
            </div>
          </MinimalCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}