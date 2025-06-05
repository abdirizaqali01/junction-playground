"use client"

import type React from "react"

import { useState } from "react"
import { MinimalCard } from "@/components/ui/minimal-card"
import { MinimalButton } from "@/components/ui/minimal-button"
import { Upload, LinkIcon, Github, FileCode, Check, Clock } from "lucide-react"

interface EventSubmissionSectionProps {
  eventId: string
}

export function EventSubmissionSection({ eventId }: EventSubmissionSectionProps) {
  const [submissionStep, setSubmissionStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    repoUrl: "",
    demoUrl: "",
    challenges: [] as string[],
    teamMembers: [] as string[],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStep(submissionStep + 1)
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  // Submission deadline info
  const deadlineDate = "June 17, 2025"
  const deadlineTime = "3:00 PM PDT"
  const timeRemaining = "1 day, 5 hours"

  return (
    <div className="space-y-6">
      <MinimalCard>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-medium mb-1">Project Submission</h2>
            <div className="flex items-center gap-2 text-sm text-white/70">
              <Clock className="h-4 w-4" />
              <span>
                Deadline: {deadlineDate} at {deadlineTime}
              </span>
            </div>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded text-sm">
            <span>{timeRemaining} remaining</span>
          </div>
        </div>

        {submissionStep === 1 && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium">
                Project Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                placeholder="Enter your project title"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Project Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={4}
                className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm focus:outline-none focus:border-white/20"
                placeholder="Describe your project, the problem it solves, and how it works"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label htmlFor="repo-url" className="block text-sm font-medium">
                Repository URL
              </label>
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  id="repo-url"
                  value={formData.repoUrl}
                  onChange={(e) => updateFormData("repoUrl", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                  placeholder="https://github.com/yourusername/project"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="demo-url" className="block text-sm font-medium">
                Demo URL (optional)
              </label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <input
                  type="text"
                  id="demo-url"
                  value={formData.demoUrl}
                  onChange={(e) => updateFormData("demoUrl", e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded px-10 py-2 text-sm focus:outline-none focus:border-white/20"
                  placeholder="https://your-demo-url.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Challenges</label>
              <p className="text-xs text-white/70 mb-2">Select the challenges your project addresses</p>
              <div className="space-y-2">
                {["Main Challenge: AI Innovation", "Best Use of Computer Vision", "Sustainability Impact"].map(
                  (challenge) => (
                    <div key={challenge} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`challenge-${challenge}`}
                        checked={formData.challenges.includes(challenge)}
                        onChange={(e) => {
                          const updatedChallenges = e.target.checked
                            ? [...formData.challenges, challenge]
                            : formData.challenges.filter((c) => c !== challenge)
                          updateFormData("challenges", updatedChallenges)
                        }}
                        className="w-4 h-4 rounded border-white/30 bg-white/5 focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor={`challenge-${challenge}`} className="ml-2 text-sm">
                        {challenge}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <MinimalButton type="submit" className="flex items-center gap-2">
                <span>Continue</span>
                <Upload className="h-4 w-4" />
              </MinimalButton>
            </div>
          </form>
        )}

        {submissionStep === 2 && (
          <div className="space-y-6">
            <div className="p-4 rounded bg-white/5 border border-white/10">
              <h3 className="font-medium mb-4">Project Details</h3>
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm font-medium w-32">Title:</span>
                  <span className="text-sm text-white/70">{formData.title}</span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-sm font-medium w-32">Description:</span>
                  <span className="text-sm text-white/70">{formData.description}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-sm font-medium w-32">Repository:</span>
                  <a href={formData.repoUrl} className="text-sm text-white underline" target="_blank" rel="noreferrer">
                    {formData.repoUrl}
                  </a>
                </div>
                {formData.demoUrl && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm font-medium w-32">Demo:</span>
                    <a
                      href={formData.demoUrl}
                      className="text-sm text-white underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {formData.demoUrl}
                    </a>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-2">
                  <span className="text-sm font-medium w-32">Challenges:</span>
                  <div className="flex flex-wrap gap-2">
                    {formData.challenges.map((challenge) => (
                      <span key={challenge} className="bg-white/10 px-2 py-0.5 rounded text-xs">
                        {challenge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <MinimalButton variant="outline" onClick={() => setSubmissionStep(1)}>
                Edit
              </MinimalButton>
              <MinimalButton onClick={() => setSubmissionStep(3)} className="flex items-center gap-2">
                <span>Submit Project</span>
                <FileCode className="h-4 w-4" />
              </MinimalButton>
            </div>
          </div>
        )}

        {submissionStep === 3 && (
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <Check className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-medium mb-2">Submission Complete!</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              Your project has been successfully submitted. You can edit your submission until the deadline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MinimalButton onClick={() => setSubmissionStep(1)}>Edit Submission</MinimalButton>
              <MinimalButton variant="outline" asChild>
                <a href={`/event/${eventId}`}>Back to Event</a>
              </MinimalButton>
            </div>
          </div>
        )}
      </MinimalCard>

      <MinimalCard>
        <h3 className="text-lg font-medium mb-4">Submission Guidelines</h3>
        <div className="space-y-3 text-sm text-white/70 font-space-mono">
          <p>
            Your submission should include a clear description of your project, the problem it solves, and how it works.
            Make sure to include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>A link to your code repository (GitHub, GitLab, etc.)</li>
            <li>A demo link or video if available</li>
            <li>Instructions on how to run your project</li>
            <li>Any additional resources or documentation</li>
          </ul>
          <p>
            Projects will be judged based on innovation, technical implementation, design, and alignment with the
            challenge criteria.
          </p>
        </div>
      </MinimalCard>
    </div>
  )
}
