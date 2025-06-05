"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { ArrowLeft, ArrowRight, Check, X, User, Mail, Briefcase, Users } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// This would normally come from a database or API
const getHackathonData = (id: string) => {
  return {
    id,
    title: "AI Innovation Challenge",
  }
}

export default function HackathonRegistrationPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const hackathon = getHackathonData(params.id)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    teamOption: "",
    teamName: "",
    teamSize: "",
    skills: [] as string[],
    experience: "",
    motivation: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const totalSteps = 4

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required"
      if (!formData.email.trim()) newErrors.email = "Email is required"
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Valid email is required"
      if (!formData.role.trim()) newErrors.role = "Role is required"
    }

    if (step === 2) {
      if (!formData.teamOption) newErrors.teamOption = "Please select an option"
      if (formData.teamOption === "create" && !formData.teamName.trim()) {
        newErrors.teamName = "Team name is required"
      }
    }

    if (step === 3) {
      if (formData.skills.length === 0) newErrors.skills = "Select at least one skill"
      if (!formData.experience) newErrors.experience = "Please select your experience level"
    }

    if (step === 4) {
      if (!formData.motivation.trim()) newErrors.motivation = "Please share your motivation"
      if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      // Submit form data
      console.log("Form submitted:", formData)

      // Redirect to success page
      router.push(`/hackathons/${params.id}/register/success`)
    }
  }

  const skillOptions = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "Machine Learning",
    "UI/UX Design",
    "Data Science",
    "Cloud Computing",
    "Blockchain",
    "Mobile Development",
    "DevOps",
    "Product Management",
  ]

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto max-w-3xl">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href={`/hackathons/${params.id}`}
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to hackathon</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Register for {hackathon.title}</h1>
            <p className="text-white/70 font-space-mono">
              Complete the form below to secure your spot in the hackathon.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step > i + 1
                        ? "bg-white text-black"
                        : step === i + 1
                          ? "border-2 border-white"
                          : "border border-white/30 text-white/30"
                    }`}
                  >
                    {step > i + 1 ? <Check className="h-4 w-4" /> : i + 1}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className={`h-0.5 w-full ${step > i + 1 ? "bg-white" : "bg-white/30"}`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-white/70">
              <span>Personal Info</span>
              <span>Team</span>
              <span>Skills</span>
              <span>Finish</span>
            </div>
          </div>

          {/* Form */}
          <MinimalCard>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Personal Information</h2>

                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => updateFormData("name", e.target.value)}
                        className={`w-full bg-white/5 border ${
                          errors.name ? "border-red-500" : "border-white/10"
                        } rounded px-10 py-2 text-sm focus:outline-none focus:border-white/30`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => updateFormData("email", e.target.value)}
                        className={`w-full bg-white/5 border ${
                          errors.email ? "border-red-500" : "border-white/10"
                        } rounded px-10 py-2 text-sm focus:outline-none focus:border-white/30`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="role" className="block text-sm font-medium">
                      Your Role
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                      <input
                        type="text"
                        id="role"
                        value={formData.role}
                        onChange={(e) => updateFormData("role", e.target.value)}
                        className={`w-full bg-white/5 border ${
                          errors.role ? "border-red-500" : "border-white/10"
                        } rounded px-10 py-2 text-sm focus:outline-none focus:border-white/30`}
                        placeholder="e.g. Developer, Designer, Data Scientist"
                      />
                      {errors.role && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Team Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Team Information</h2>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium">Team Preference</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div
                        className={`border ${
                          formData.teamOption === "create" ? "border-white bg-white/5" : "border-white/10"
                        } rounded p-4 cursor-pointer hover:bg-white/5 transition-colors`}
                        onClick={() => updateFormData("teamOption", "create")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Create a team</h3>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              formData.teamOption === "create" ? "border-white" : "border-white/30"
                            } flex items-center justify-center`}
                          >
                            {formData.teamOption === "create" && <div className="w-3 h-3 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Start your own team and invite others to join</p>
                      </div>

                      <div
                        className={`border ${
                          formData.teamOption === "join" ? "border-white bg-white/5" : "border-white/10"
                        } rounded p-4 cursor-pointer hover:bg-white/5 transition-colors`}
                        onClick={() => updateFormData("teamOption", "join")}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium">Join a team</h3>
                          <div
                            className={`w-5 h-5 rounded-full border ${
                              formData.teamOption === "join" ? "border-white" : "border-white/30"
                            } flex items-center justify-center`}
                          >
                            {formData.teamOption === "join" && <div className="w-3 h-3 rounded-full bg-white" />}
                          </div>
                        </div>
                        <p className="text-sm text-white/70">Browse available teams or get matched with one</p>
                      </div>
                    </div>
                    {errors.teamOption && <p className="text-red-500 text-xs mt-1">{errors.teamOption}</p>}
                  </div>

                  {formData.teamOption === "create" && (
                    <div className="space-y-2">
                      <label htmlFor="teamName" className="block text-sm font-medium">
                        Team Name
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                        <input
                          type="text"
                          id="teamName"
                          value={formData.teamName}
                          onChange={(e) => updateFormData("teamName", e.target.value)}
                          className={`w-full bg-white/5 border ${
                            errors.teamName ? "border-red-500" : "border-white/10"
                          } rounded px-10 py-2 text-sm focus:outline-none focus:border-white/30`}
                          placeholder="Enter your team name"
                        />
                        {errors.teamName && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                            <X className="h-4 w-4 text-red-500" />
                          </div>
                        )}
                      </div>
                      {errors.teamName && <p className="text-red-500 text-xs mt-1">{errors.teamName}</p>}
                    </div>
                  )}

                  <div className="space-y-2">
                    <label htmlFor="teamSize" className="block text-sm font-medium">
                      Preferred Team Size
                    </label>
                    <select
                      id="teamSize"
                      value={formData.teamSize}
                      onChange={(e) => updateFormData("teamSize", e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30"
                    >
                      <option value="">Select team size</option>
                      <option value="1">Solo (1 person)</option>
                      <option value="2">2 people</option>
                      <option value="3">3 people</option>
                      <option value="4">4 people</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 3: Skills */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Skills & Experience</h2>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Your Skills</label>
                    <div className="flex flex-wrap gap-2">
                      {skillOptions.map((skill) => (
                        <div
                          key={skill}
                          onClick={() => {
                            const updatedSkills = formData.skills.includes(skill)
                              ? formData.skills.filter((s) => s !== skill)
                              : [...formData.skills, skill]
                            updateFormData("skills", updatedSkills)
                          }}
                          className={`px-3 py-1.5 rounded text-sm cursor-pointer ${
                            formData.skills.includes(skill) ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                    {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Experience Level</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {["Beginner", "Intermediate", "Advanced"].map((level) => (
                        <div
                          key={level}
                          onClick={() => updateFormData("experience", level)}
                          className={`px-4 py-2 rounded text-center text-sm cursor-pointer ${
                            formData.experience === level ? "bg-white text-black" : "bg-white/5 hover:bg-white/10"
                          }`}
                        >
                          {level}
                        </div>
                      ))}
                    </div>
                    {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Final Details */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-medium mb-4">Final Details</h2>

                  <div className="space-y-2">
                    <label htmlFor="motivation" className="block text-sm font-medium">
                      Why do you want to participate?
                    </label>
                    <textarea
                      id="motivation"
                      value={formData.motivation}
                      onChange={(e) => updateFormData("motivation", e.target.value)}
                      rows={4}
                      className={`w-full bg-white/5 border ${
                        errors.motivation ? "border-red-500" : "border-white/10"
                      } rounded px-3 py-2 text-sm focus:outline-none focus:border-white/30`}
                      placeholder="Share your motivation for joining this hackathon..."
                    />
                    {errors.motivation && <p className="text-red-500 text-xs mt-1">{errors.motivation}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          type="checkbox"
                          checked={formData.agreeToTerms}
                          onChange={(e) => updateFormData("agreeToTerms", e.target.checked)}
                          className="w-4 h-4 rounded border-white/30 bg-white/5 focus:ring-0 focus:ring-offset-0"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="text-white/70">
                          I agree to the{" "}
                          <a href="#" className="text-white underline">
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a href="#" className="text-white underline">
                            Code of Conduct
                          </a>
                        </label>
                      </div>
                    </div>
                    {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="flex justify-between pt-4 border-t border-white/10">
                {step > 1 ? (
                  <MinimalButton type="button" subtle onClick={handlePrevious}>
                    Previous
                  </MinimalButton>
                ) : (
                  <div></div>
                )}

                {step < totalSteps ? (
                  <MinimalButton type="button" onClick={handleNext} className="flex items-center gap-2">
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </MinimalButton>
                ) : (
                  <MinimalButton type="submit">Complete Registration</MinimalButton>
                )}
              </div>
            </form>
          </MinimalCard>
        </div>
      </main>

      <Footer />
    </div>
  )
}
