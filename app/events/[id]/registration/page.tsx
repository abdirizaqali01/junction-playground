'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { ChevronRight, ChevronLeft, Check, AlertCircle, Calendar, MapPin, Globe, X, Loader2 } from 'lucide-react'
import {
  steps,
  countryOptions,
  languageOptions,
  dietaryOptions,
  roleOptions,
  skillOptions,
  themeOptions,
  experienceOptions,
  expertiseOptions
} from '../../../../lib/registrationOptions'
import Loading from '@/components/loading'

// Event interface based on your API response
interface Event {
  event_id: number
  name: string
  slug: string
  status: string
  start_date: string
  end_date: string
  location: string
  description: string
  cover_image_url: string
  is_public: boolean
  meta_tags: {
    title: string
    description: string
  }
  created_at: string
  updated_at: string
}

// Form data interface
interface FormData {
  // Basic Details
  firstName: string
  lastName: string
  email: string
  countryCode: string
  phoneNumber: string
  spokenLanguages: string[]
  cityOfResidence: string
  dietaryRestrictions: string[]
  
  // Skills & Interests
  roles: Array<{id: string, role: string, experience: string}>
  skills: Array<{id: string, skill: string, expertise: string}>
  motivation: string
  themes: string[]
  hackathonsAttended: string
  
  // Links
  linkedinProfile: string
  githubProfile: string
  portfolioWebsite: string
  resumeLink: string
  
  // Opportunities
  interestedInMentoring: boolean
  interestedInSponsorOpportunities: boolean
  interestedInJobOpportunities: boolean
  
  // Other
  applyingAsTeam: string
  accessibilityNeeds: string
  emergencyContact: string
  additionalInfo: string
  termsAccepted: boolean
}


export default function HackathonRegistration() {
  const params = useParams()
  const eventId = params?.id as string
  
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Basic Details
    firstName: '',
    lastName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    spokenLanguages: [],
    cityOfResidence: '',
    dietaryRestrictions: [],
    
    // Skills & Interests
    roles: [],
    skills: [],
    motivation: '',
    themes: [],
    hackathonsAttended: '',
    
    // Links
    linkedinProfile: '',
    githubProfile: '',
    portfolioWebsite: '',
    resumeLink: '',
    
    // Opportunities
    interestedInMentoring: false,
    interestedInSponsorOpportunities: false,
    interestedInJobOpportunities: false,
    
    // Other
    applyingAsTeam: '',
    accessibilityNeeds: '',
    emergencyContact: '',
    additionalInfo: '',
    termsAccepted: false
  })

  const [newRole, setNewRole] = useState('')
  const [newRoleExperience, setNewRoleExperience] = useState('')
  const [newSkill, setNewSkill] = useState('')
  const [newSkillExpertise, setNewSkillExpertise] = useState('')

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return
      
      try {
        setLoading(true)
        const response = await fetch(`/api/proxy/events`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch events')
        }
        
        const events: Event[] = await response.json()
        const selectedEvent = events.find(e => e.event_id.toString() === eventId)
        
        if (!selectedEvent) {
          throw new Error('Event not found')
        }
        
        setEvent(selectedEvent)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [eventId])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  // Format date range
  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (start.toDateString() === end.toDateString()) {
      return formatDate(startDate)
    }
    
    const startMonth = start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const endFormatted = end.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    
    return `${startMonth} - ${endFormatted}`
  }

  // Helper functions for managing arrays
  const addToArray = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value]
    }))
  }

  const removeFromArray = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(item => item !== value)
    }))
  }

  const addRole = () => {
    if (newRole && newRoleExperience && formData.roles.length < 5) {
      setFormData(prev => ({
        ...prev,
        roles: [...prev.roles, { 
          id: Date.now().toString(), 
          role: newRole, 
          experience: newRoleExperience 
        }]
      }))
      setNewRole('')
      setNewRoleExperience('')
    }
  }

  const addSkill = () => {
    if (newSkill && newSkillExpertise && formData.skills.length < 10) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, { 
          id: Date.now().toString(), 
          skill: newSkill, 
          expertise: newSkillExpertise 
        }]
      }))
      setNewSkill('')
      setNewSkillExpertise('')
    }
  }

  const removeRole = (id: string) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.filter(role => role.id !== id)
    }))
  }

  const removeSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const handleThemeChange = (theme: string) => {
    setFormData(prev => ({
      ...prev,
      themes: prev.themes.includes(theme)
        ? prev.themes.filter(t => t !== theme)
        : prev.themes.length < 3 
          ? [...prev.themes, theme]
          : prev.themes
    }))
  }

  // Loading state
  if (loading) {
    return (
      <Loading message="Loading Registration" />
    )
  }

  // Error state
  if (error || !event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#FF8383] rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={24} className="text-black" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
          <p className="text-[#FFFFFF99] mb-4">{error || 'The event you\'re looking for could not be found.'}</p>
          <button
            onClick={() => window.history.back()}
            className="bg-[#55D186] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#55D18699] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  const StepIndicator = () => (
    <div className="mb-12">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                step.completed 
                  ? 'bg-[#55D186] text-black' 
                  : step.id === currentStep
                    ? 'bg-white text-black'
                    : 'bg-[#FFFFFF1A] text-[#FFFFFF66] border border-[#FFFFFF33]'
              }`}>
                {step.completed ? (
                  <Check size={20} />
                ) : (
                  <span className="font-bold">{step.id}</span>
                )}
              </div>
              <span className={`text-sm ${
                step.id === currentStep ? 'text-white' : 'text-[#FFFFFF66]'
              }`}>
                {step.name}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-px mx-4 ${
                step.completed ? 'bg-[#55D186]' : 'bg-[#FFFFFF33]'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )

  const ChipInput = ({ 
    label, 
    description, 
    options, 
    value, 
    onChange, 
    placeholder = "Select..." 
  }: {
    label: string
    description?: string
    options: string[]
    value: string[]
    onChange: (value: string) => void
    placeholder?: string
  }) => {
    const [inputValue, setInputValue] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    
    const filteredOptions = options.filter(option => 
      !value.includes(option) && 
      option.toLowerCase().includes(inputValue.toLowerCase())
    )

    return (
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">{label}</h3>
        {description && (
          <p className="text-gray-400 mb-6">{description}</p>
        )}
        
        <div className="relative">
          <div className="bg-[#2a2a2a] border border-[#444] rounded-lg p-3 min-h-[50px] flex flex-wrap gap-2">
            {value.map(item => (
              <div key={item} className="bg-[#3a3a3a] text-white px-3 py-1 rounded-md flex items-center space-x-2 text-sm">
                <span>{item}</span>
                <button 
                  onClick={() => onChange(item)}
                  className="text-[#FF8383] hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsOpen(true)}
              onBlur={() => setTimeout(() => setIsOpen(false), 200)}
              placeholder={value.length === 0 ? placeholder : ""}
              className="bg-transparent border-none outline-none text-white flex-1 min-w-[120px]"
            />
          </div>
          
          {isOpen && filteredOptions.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-[#2a2a2a] border border-[#444] rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
              {filteredOptions.map(option => (
                <button
                  key={option}
                  onClick={() => {
                    onChange(option)
                    setInputValue('')
                    setIsOpen(false)
                  }}
                  className="w-full text-left px-4 py-2 text-white hover:bg-[#3a3a3a] transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderBasicDetails = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Basic Details
        </h1>
        <p className="text-[#FFFFFF99]">
          Let's start with some basic information about you
        </p>
      </div>

      {/* Personal Information */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-6">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-3">First name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
              placeholder="Enter your first name"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-3">Last name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
              placeholder="Enter your last name"
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-3">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
              placeholder="your.email@example.com"
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-6">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-gray-300 mb-3">Country code</label>
            <select 
              value={formData.countryCode}
              onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
            >
              <option value="">Select country</option>
              {countryOptions.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-300 mb-3">Phone number</label>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
              placeholder="40XXXXXXX"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-3">City of residence</label>
          <input
            type="text"
            value={formData.cityOfResidence}
            onChange={(e) => setFormData(prev => ({ ...prev, cityOfResidence: e.target.value }))}
            className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
            placeholder="Which city are you currently living in?"
          />
        </div>
      </div>

      {/* Languages */}
      <ChipInput
        label="Spoken languages"
        description="Select all languages that you speak with working proficiency"
        options={languageOptions}
        value={formData.spokenLanguages}
        onChange={(lang) => {
          if (formData.spokenLanguages.includes(lang)) {
            removeFromArray('spokenLanguages', lang)
          } else {
            addToArray('spokenLanguages', lang)
          }
        }}
        placeholder="Type to search languages..."
      />

      {/* Dietary Restrictions */}
      <ChipInput
        label="Dietary Restrictions"
        description="Please select all dietary restrictions from the below list that apply to you - if none of the available options apply, you can leave this field empty."
        options={dietaryOptions}
        value={formData.dietaryRestrictions}
        onChange={(diet) => {
          if (formData.dietaryRestrictions.includes(diet)) {
            removeFromArray('dietaryRestrictions', diet)
          } else {
            addToArray('dietaryRestrictions', diet)
          }
        }}
        placeholder="Type to search dietary restrictions..."
      />
    </div>
  )

  const renderSkillsAndInterests = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Skills & Interests
        </h1>
        <p className="text-[#FFFFFF99]">
          Tell us about your expertise and what drives you
        </p>
      </div>

      {/* Roles Section */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Roles</h3>
        <p className="text-gray-400 mb-6">
          Add up to 5 roles you have working experience in.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-3">Choose a role</label>
            <select 
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
            >
              <option value="">Select a role...</option>
              {roleOptions.sort().map(role => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-3">Years of experience</label>
            <div className="space-y-2">
              {experienceOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="newRoleExperience"
                    value={option.value}
                    checked={newRoleExperience === option.value}
                    onChange={(e) => setNewRoleExperience(e.target.value)}
                    className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={addRole}
          disabled={!newRole || !newRoleExperience || formData.roles.length >= 5}
          className="bg-[#55D186] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#55D18699] disabled:bg-[#FFFFFF33] disabled:text-[#FFFFFF66] transition-colors"
        >
          Add Role
        </button>
        
        {formData.roles.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.roles.map(role => (
              <div key={role.id} className="flex items-center justify-between bg-[#2a2a2a] rounded-lg px-4 py-2 border border-[#444]">
                <span className="text-white">
                  {role.role} - {experienceOptions.find(opt => opt.value === role.experience)?.label}
                </span>
                <button
                  onClick={() => removeRole(role.id)}
                  className="text-[#FF8383] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Skills</h3>
        <p className="text-gray-400 mb-6">
          Add up to 10 skills you consider yourself to be proficient at.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-300 mb-3">Choose a skill</label>
            <select 
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
            >
              <option value="">Select a skill...</option>
              {skillOptions.sort().map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 mb-3">Level of expertise</label>
            <div className="space-y-2">
              {expertiseOptions.map(option => (
                <label key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="newSkillExpertise"
                    value={option.value}
                    checked={newSkillExpertise === option.value}
                    onChange={(e) => setNewSkillExpertise(e.target.value)}
                    className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <button
          onClick={addSkill}
          disabled={!newSkill || !newSkillExpertise || formData.skills.length >= 10}
          className="bg-[#55D186] text-black px-6 py-2 rounded-lg font-medium hover:bg-[#55D18699] disabled:bg-[#FFFFFF33] disabled:text-[#FFFFFF66] transition-colors"
        >
          Add Skill
        </button>
        
        {formData.skills.length > 0 && (
          <div className="mt-4 space-y-2">
            {formData.skills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between bg-[#2a2a2a] rounded-lg px-4 py-2 border border-[#444]">
                <span className="text-white">
                  {skill.skill} - {expertiseOptions.find(opt => opt.value === skill.expertise)?.label}
                </span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-[#FF8383] hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Motivation Section */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Motivation</h3>
        <p className="text-gray-400 mb-6">
          Why do you want to be accepted to this hackathon, and why should we choose you? 
          <strong className="text-white"> Please note that we regard a well-written letter of motivation very highly when reviewing applications.</strong>
        </p>
        
        <textarea
          value={formData.motivation}
          onChange={(e) => setFormData(prev => ({ ...prev, motivation: e.target.value }))}
          rows={10}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none resize-none transition-colors"
          placeholder="Tell us your story..."
        />
      </div>

      {/* Themes of Interest */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Themes of Interest</h3>
        <p className="text-gray-400 mb-6">
          Choose up to 3 themes that are the most interesting to you
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themeOptions.map(theme => (
            <label key={theme} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.themes.includes(theme)}
                onChange={() => handleThemeChange(theme)}
                disabled={!formData.themes.includes(theme) && formData.themes.length >= 3}
                className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186] disabled:opacity-50"
              />
              <span className={`${
                formData.themes.includes(theme) ? 'text-white' : 'text-[#FFFFFF99]'
              }`}>
                {theme}
              </span>
            </label>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-3">
          Selected: {formData.themes.length}/3
        </p>
      </div>

      {/* Number of Hackathons */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Number of hackathons attended</h3>
        <p className="text-gray-400 mb-6">
          Don't worry if this is your first hackathon ever, your motivation is what matters.
        </p>
        
        <select 
          value={formData.hackathonsAttended}
          onChange={(e) => setFormData(prev => ({ ...prev, hackathonsAttended: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
        >
          <option value="">Select...</option>
          <option value="0">This is my first hackathon</option>
          <option value="1-2">1-2 hackathons</option>
          <option value="3-5">3-5 hackathons</option>
          <option value="6-10">6-10 hackathons</option>
          <option value="10+">10+ hackathons</option>
        </select>
      </div>
    </div>
  )

  const renderLinks = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Links
        </h1>
        <p className="text-[#FFFFFF99]">
          Share your online presence and portfolio
        </p>
      </div>

      {/* LinkedIn Profile */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">LinkedIn Profile</h3>
        <p className="text-gray-400 mb-6">
          Do you have a LinkedIn or similar online profile to showcase your professional experience?
        </p>
        
        <input
          type="url"
          value={formData.linkedinProfile}
          onChange={(e) => setFormData(prev => ({ ...prev, linkedinProfile: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
          placeholder="https://linkedin.com/in/yourprofile"
        />
      </div>

      {/* GitHub Profile */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">GitHub Profile</h3>
        <p className="text-gray-400 mb-6">
          Share your GitHub profile to showcase your coding projects and contributions.
        </p>
        
        <input
          type="url"
          value={formData.githubProfile}
          onChange={(e) => setFormData(prev => ({ ...prev, githubProfile: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
          placeholder="https://github.com/yourusername"
        />
      </div>

      {/* Portfolio Website */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Portfolio Website</h3>
        <p className="text-gray-400 mb-6">
          Do you have a personal website or portfolio you'd like to share?
        </p>
        
        <input
          type="url"
          value={formData.portfolioWebsite}
          onChange={(e) => setFormData(prev => ({ ...prev, portfolioWebsite: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
          placeholder="https://yourportfolio.com"
        />
      </div>

      {/* Resume Link */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Resume/CV</h3>
        <p className="text-gray-400 mb-6">
          Share a link to your resume or CV (Google Drive, Dropbox, etc.)
        </p>
        
        <input
          type="url"
          value={formData.resumeLink}
          onChange={(e) => setFormData(prev => ({ ...prev, resumeLink: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
          placeholder="https://drive.google.com/..."
        />
      </div>
    </div>
  )

  const renderOpportunities = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Opportunities
        </h1>
        <p className="text-[#FFFFFF99]">
          Let us know what opportunities interest you
        </p>
      </div>

      {/* Opportunities Section */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Interest in Opportunities</h3>
        <p className="text-gray-400 mb-6">
          Select any opportunities you'd be interested in learning about or participating in.
        </p>
        
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.interestedInMentoring}
              onChange={(e) => setFormData(prev => ({ ...prev, interestedInMentoring: e.target.checked }))}
              className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
            />
            <div>
              <span className="text-white font-medium">Mentoring Opportunities</span>
              <p className="text-gray-400 text-sm">
                Interested in mentoring other participants or being mentored by industry professionals
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.interestedInSponsorOpportunities}
              onChange={(e) => setFormData(prev => ({ ...prev, interestedInSponsorOpportunities: e.target.checked }))}
              className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
            />
            <div>
              <span className="text-white font-medium">Sponsor Interactions</span>
              <p className="text-gray-400 text-sm">
                Interested in networking with sponsors and learning about their challenges
              </p>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.interestedInJobOpportunities}
              onChange={(e) => setFormData(prev => ({ ...prev, interestedInJobOpportunities: e.target.checked }))}
              className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
            />
            <div>
              <span className="text-white font-medium">Job & Internship Opportunities</span>
              <p className="text-gray-400 text-sm">
                Interested in hearing about job openings and internship programs from our partners
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  )

  const renderOther = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          Other
        </h1>
        <p className="text-[#FFFFFF99]">
          Final details to complete your registration
        </p>
      </div>

      {/* Team Application */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Applying as a team?</h3>
        <p className="text-gray-400 mb-4">
          Do you already have people you want to participate with figured out?
        </p>
        
        <div className="mb-4">
          <h6 className="text-white mb-3">Do you want to apply as a team?</h6>
          <p className="text-gray-400 text-sm mb-4">
            Please note: if you do apply as a team, you must form the team on the event dashboard, 
            which you will be able to access after completing this form.
          </p>
          
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="applyingAsTeam"
                value="yes"
                checked={formData.applyingAsTeam === 'yes'}
                onChange={(e) => setFormData(prev => ({ ...prev, applyingAsTeam: e.target.value }))}
                className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
              />
              <span className="text-white">Yes</span>
            </label>
            
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="applyingAsTeam"
                value="no"
                checked={formData.applyingAsTeam === 'no'}
                onChange={(e) => setFormData(prev => ({ ...prev, applyingAsTeam: e.target.value }))}
                className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
              />
              <span className="text-white">No</span>
            </label>
          </div>
        </div>
      </div>

      {/* Accessibility Needs */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Accessibility Needs</h3>
        <p className="text-gray-400 mb-6">
          Do you have any accessibility requirements we should be aware of to ensure you have the best possible experience?
        </p>
        
        <textarea
          value={formData.accessibilityNeeds}
          onChange={(e) => setFormData(prev => ({ ...prev, accessibilityNeeds: e.target.value }))}
          rows={4}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none resize-none transition-colors"
          placeholder="Please describe any accessibility needs or accommodations..."
        />
      </div>

      {/* Emergency Contact */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Emergency Contact</h3>
        <p className="text-gray-400 mb-6">
          Please provide emergency contact information (name and phone number).
        </p>
        
        <input
          type="text"
          value={formData.emergencyContact}
          onChange={(e) => setFormData(prev => ({ ...prev, emergencyContact: e.target.value }))}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none transition-colors"
          placeholder="Contact Name - Phone Number"
        />
      </div>

      {/* Additional Information */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <h3 className="text-lg font-medium text-white mb-3">Additional Information</h3>
        <p className="text-gray-400 mb-6">
          Is there anything else you'd like us to know about you or any special considerations?
        </p>
        
        <textarea
          value={formData.additionalInfo}
          onChange={(e) => setFormData(prev => ({ ...prev, additionalInfo: e.target.value }))}
          rows={4}
          className="w-full bg-[#2a2a2a] border border-[#444] rounded-lg px-4 py-3 text-white focus:border-[#55D186] focus:outline-none resize-none transition-colors"
          placeholder="Any additional information you'd like to share..."
        />
      </div>

      {/* Terms and Conditions */}
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
        <label className="flex items-start space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData(prev => ({ ...prev, termsAccepted: e.target.checked }))}
            className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186] mt-1"
          />
          <div>
            <span className="text-white">
              I agree to the{' '}
              <a href="#" className="text-[#55D186] hover:text-[#55D18699] underline">
                Terms and Conditions
              </a>
              {' '}and{' '}
              <a href="#" className="text-[#55D186] hover:text-[#55D18699] underline">
                Privacy Policy
              </a>
            </span>
          </div>
        </label>
      </div>
    </div>
  )

  const getNextStepName = () => {
    if (currentStep === 5) return 'Submit'
    const nextStep = steps.find(step => step.id === currentStep + 1)
    return nextStep ? nextStep.name : 'Complete'
  }

  const getPrevStepName = () => {
    const prevStep = steps.find(step => step.id === currentStep - 1)
    return prevStep ? prevStep.name : ''
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-[#FFFFFF33] bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#55D186] rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-xl">{event.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{event.name}</h1>
              <div className="flex items-center space-x-4 text-[#FFFFFF99] text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{formatDateRange(event.start_date, event.end_date)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={14} />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe size={14} />
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                    event.status === 'PUBLISHED' 
                      ? 'bg-[var(--color-light-opacity100)] text-[var(--color-dark-opacity100)]' 
                      : event.status === 'ONGOING'
                        ? 'bg-[var(--color-primary-opacity100)] text-[var(--color-light-opacity100)]'
                        : 'bg-[var(--color-alerts-opacity100)] text-[var(--color-light-opacity100)]'
                  }`}>
                    {event.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <StepIndicator />
        
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && renderBasicDetails()}
          {currentStep === 2 && renderSkillsAndInterests()}
          {currentStep === 3 && renderLinks()}
          {currentStep === 4 && renderOpportunities()}
          {currentStep === 5 && renderOther()}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          {currentStep > 1 ? (
            <button
              onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
              className="flex items-center space-x-2 text-[#FFFFFF99] hover:text-white transition-colors"
            >
              <ChevronLeft size={20} />
              <span>Back: {getPrevStepName()}</span>
            </button>
          ) : (
            <div></div>
          )}
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#FFFFFF99]">{currentStep}/5</span>
              <button className="p-2 rounded-full bg-[#FFFFFF1A] border border-[#FFFFFF33] hover:border-[#FF8383] transition-colors">
                <AlertCircle size={16} className="text-[#FF8383]" />
              </button>
            </div>
            
            <button
              onClick={() => {
                if (currentStep === 5) {
                  // Handle form submission
                  const submissionData = {
                    ...formData,
                    event_id: event.event_id,
                    event_name: event.name
                  }
                  console.log('Form submitted:', submissionData)
                  alert('Registration submitted successfully!')
                } else {
                  setCurrentStep(prev => Math.min(5, prev + 1))
                }
              }}
              disabled={currentStep === 5 && !formData.termsAccepted}
              className="flex items-center space-x-2 bg-[#55D186] text-black px-6 py-3 rounded-lg font-medium hover:bg-[#55D18699] disabled:bg-[#FFFFFF33] disabled:text-[#FFFFFF66] transition-colors"
            >
              <span>{currentStep === 5 ? 'Submit Registration' : `Next: ${getNextStepName()}`}</span>
              {currentStep < 5 && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}