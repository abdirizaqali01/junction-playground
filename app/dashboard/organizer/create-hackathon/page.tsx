"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MinimalButton } from "@/components/ui/minimal-button"
import { MinimalCard } from "@/components/ui/minimal-card"
import { ArrowLeft, Calendar, MapPin, Clock, Users, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateHackathonPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    location: "",
    mode: "in-person",
    maxParticipants: "",
    registrationDeadline: "",
    tags: [] as string[],
    challenges: [{ title: "", description: "", prizes: [""] }],
    prizes: [{ place: "", reward: "" }],
    resources: [{ title: "", type: "document", url: "" }],
    sponsors: [{ name: "", logo: "" }],
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    router.push("/dashboard/organizer/hackathons")
  }

  const addChallenge = () => {
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, { title: "", description: "", prizes: [""] }],
    }))
  }

  const updateChallenge = (index: number, field: string, value: any) => {
    const updatedChallenges = [...formData.challenges]
    updatedChallenges[index] = { ...updatedChallenges[index], [field]: value }
    updateFormData("challenges", updatedChallenges)
  }

  const removeChallenge = (index: number) => {
    const updatedChallenges = formData.challenges.filter((_, i) => i !== index)
    updateFormData("challenges", updatedChallenges)
  }

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { place: "", reward: "" }],
    }))
  }

  const updatePrize = (index: number, field: string, value: string) => {
    const updatedPrizes = [...formData.prizes]
    updatedPrizes[index] = { ...updatedPrizes[index], [field]: value }
    updateFormData("prizes", updatedPrizes)
  }

  const removePrize = (index: number) => {
    const updatedPrizes = formData.prizes.filter((_, i) => i !== index)
    updateFormData("prizes", updatedPrizes)
  }

  const addResource = () => {
    setFormData((prev) => ({
      ...prev,
      resources: [...prev.resources, { title: "", type: "document", url: "" }],
    }))
  }

  const updateResource = (index: number, field: string, value: string) => {
    const updatedResources = [...formData.resources]
    updatedResources[index] = { ...updatedResources[index], [field]: value }
    updateFormData("resources", updatedResources)
  }

  const removeResource = (index: number) => {
    const updatedResources = formData.resources.filter((_, i) => i !== index)
    updateFormData("resources", updatedResources)
  }

  const addSponsor = () => {
    setFormData((prev) => ({
      ...prev,
      sponsors: [...prev.sponsors, { name: "", logo: "" }],
    }))
  }

  const updateSponsor = (index: number, field: string, value: string) => {
    const updatedSponsors = [...formData.sponsors]
    updatedSponsors[index] = { ...updatedSponsors[index], [field]: value }
    updateFormData("sponsors", updatedSponsors)
  }

  const removeSponsor = (index: number) => {
    const updatedSponsors = formData.sponsors.filter((_, i) => i !== index)
    updateFormData("sponsors", updatedSponsors)
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      const input = e.currentTarget
      const value = input.value.trim()
      if (value && !formData.tags.includes(value)) {
        updateFormData("tags", [...formData.tags, value])
        input.value = ""
      }
    }
  }

  const removeTag = (tag: string) => {
    updateFormData(
      "tags",
      formData.tags.filter((t) => t !== tag),
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/dashboard/organizer"
              className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to dashboard</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Hackathon</h1>
            <p className="text-white/70 font-space-mono">
              Set up your hackathon event by filling out the details below.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {/* Step Indicator */}
            <div className="mb-8">
              <p className="text-sm text-white/70">Step {step} of 4</p>
              <div className="w-full bg-white/10 rounded-full h-1.5 mb-4">
                <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(step / 4) * 100}%` }}></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Left column - Navigation */}
              {/* Right column - Form fields */}
              <div className="lg:col-span-3 space-y-8">
                {/* Basic Info */}
                {step === 1 && (
                  <MinimalCard>
                    <h2 className="text-xl font-medium mb-6">Basic Information</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="title" className="block text-sm font-medium">
                          Hackathon Title
                        </label>
                        <input
                          type="text"
                          id="title"
                          value={formData.title}
                          onChange={(e) => updateFormData("title", e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                          placeholder="Enter hackathon title"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="description" className="block text-sm font-medium">
                          Description
                        </label>
                        <textarea
                          id="description"
                          value={formData.description}
                          onChange={(e) => updateFormData("description", e.target.value)}
                          rows={5}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                          placeholder="Describe your hackathon"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="start-date" className="block text-sm font-medium">
                            Start Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                              type="date"
                              id="start-date"
                              value={formData.startDate}
                              onChange={(e) => updateFormData("startDate", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="end-date" className="block text-sm font-medium">
                            End Date
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                              type="date"
                              id="end-date"
                              value={formData.endDate}
                              onChange={(e) => updateFormData("endDate", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </MinimalCard>
                )}

                {/* Event Details */}
                {step === 2 && (
                  <MinimalCard>
                    <h2 className="text-xl font-medium mb-6">Event Details</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium">Event Mode</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {["in-person", "virtual", "hybrid"].map((mode) => (
                            <div
                              key={mode}
                              onClick={() => updateFormData("mode", mode)}
                              className={`border ${
                                formData.mode === mode ? "border-white bg-white/5" : "border-white/10"
                              } rounded p-4 cursor-pointer hover:bg-white/5 transition-colors text-center`}
                            >
                              <h3 className="font-medium capitalize">{mode}</h3>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="location" className="block text-sm font-medium">
                          Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                          <input
                            type="text"
                            id="location"
                            value={formData.location}
                            onChange={(e) => updateFormData("location", e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                            placeholder={
                              formData.mode === "virtual"
                                ? "Virtual event"
                                : formData.mode === "hybrid"
                                  ? "Primary location + Virtual"
                                  : "Enter venue address"
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="max-participants" className="block text-sm font-medium">
                            Max Participants
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                              type="number"
                              id="max-participants"
                              value={formData.maxParticipants}
                              onChange={(e) => updateFormData("maxParticipants", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                              placeholder="e.g. 500"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="registration-deadline" className="block text-sm font-medium">
                            Registration Deadline
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                            <input
                              type="date"
                              id="registration-deadline"
                              value={formData.registrationDeadline}
                              onChange={(e) => updateFormData("registrationDeadline", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </MinimalCard>
                )}

                {/* Challenges */}
                {step === 3 && (
                  <MinimalCard>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-medium">Challenges & Prizes</h2>
                      <MinimalButton type="button" onClick={addChallenge} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Challenge
                      </MinimalButton>
                    </div>

                    <div className="space-y-6">
                      {formData.challenges.map((challenge, index) => (
                        <div key={index} className="border border-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium">Challenge {index + 1}</h3>
                            {formData.challenges.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeChallenge(index)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </div>

                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-medium">Challenge Title</label>
                              <input
                                type="text"
                                value={challenge.title}
                                onChange={(e) => updateChallenge(index, "title", e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                                placeholder="e.g. Best Use of AI"
                              />
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium">Description</label>
                              <textarea
                                value={challenge.description}
                                onChange={(e) => updateChallenge(index, "description", e.target.value)}
                                rows={3}
                                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                                placeholder="Describe the challenge criteria and requirements"
                              ></textarea>
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-medium">Prizes</label>
                              {challenge.prizes.map((prize, prizeIndex) => (
                                <div key={prizeIndex} className="flex gap-2">
                                  <input
                                    type="text"
                                    value={prize}
                                    onChange={(e) => {
                                      const updatedPrizes = [...challenge.prizes]
                                      updatedPrizes[prizeIndex] = e.target.value
                                      updateChallenge(index, "prizes", updatedPrizes)
                                    }}
                                    className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                                    placeholder="e.g. $5,000 cash prize"
                                  />
                                  {challenge.prizes.length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updatedPrizes = challenge.prizes.filter((_, i) => i !== prizeIndex)
                                        updateChallenge(index, "prizes", updatedPrizes)
                                      }}
                                      className="text-red-400 hover:text-red-300"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <MinimalButton
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  const updatedPrizes = [...challenge.prizes, ""]
                                  updateChallenge(index, "prizes", updatedPrizes)
                                }}
                              >
                                Add Prize
                              </MinimalButton>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </MinimalCard>
                )}

                {/* Review & Create */}
                {step === 4 && (
                  <MinimalCard>
                    <h2 className="text-xl font-medium mb-6">Review & Create</h2>
                    <div className="space-y-6">
                      <p>Review all the information before creating the hackathon.</p>
                      <pre className="bg-white/5 p-4 rounded text-sm">{JSON.stringify(formData, null, 2)}</pre>
                    </div>
                  </MinimalCard>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <MinimalButton type="button" variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1}>
                Previous
              </MinimalButton>
              <MinimalButton
                type="button"
                onClick={() => {
                  if (step < 4) {
                    setStep(step + 1)
                  } else {
                    handleSubmit(new Event("submit"))
                  }
                }}
              >
                {step === 4 ? "Create Hackathon" : "Next"}
              </MinimalButton>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
