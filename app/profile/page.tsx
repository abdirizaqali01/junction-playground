'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MainButton } from '@/components/attachables/main-button'
import { Footer } from "@/components/footer"
import { colors, spaceGrotesk, box, font, perf } from '@/styles/design-system'
import { 
  countryOptions, 
  languageOptions, 
  themeOptions, 
  roleOptions, 
  skillOptions, 
  experienceOptions, 
  expertiseOptions 
} from '@/lib/registrationOptions'

interface ProfileData {
  profile: {
    title: string
    personalInfo: {
      firstName: string
      lastName: string
      emailAddress: string
      emailDescription: string
      phoneNumber: string
      countryCode: string
      phoneDescription: string
      dateOfBirth: string
      day: string
      month: string
      year: string
      gender: string
    }
    profileDetails: {
      title: string
      description: string
      headline: string
      headlineDescription: string
      biography: string
      biographyDescription: string
      countryOfResidence: string
      nationality: string
      spokenLanguages: string
      themesOfInterest: string
      industriesOfInterest: string
    }
    education: {
      title: string
      description: string
      levelOfEducation: string
    }
    skills: {
      title: string
      description: string
      levelOfExpertise: string
      levels: string[]
    }
    professionalRoles: {
      title: string
      description: string
      yearsOfExperience: string
      experienceRanges: string[]
    }
    recruitmentPreferences: {
      title: string
      description: string
    }
    additionalLinks: {
      title: string
      description: string
      cv: string
      cvDescription: string
      portfolio: string
      portfolioDescription: string
      github: string
      githubDescription: string
      linkedin: string
      linkedinDescription: string
    }
  }
}

// Define interfaces for form data types
interface Skill {
  id: string
  skill: string
  expertise: string
}

interface Role {
  id: string
  role: string
  experience: string
}

interface FormDataType {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  countryCode: string
  dateOfBirth: { day: string; month: string; year: string }
  gender: string
  headline: string
  biography: string
  countryOfResidence: string
  nationality: string
  spokenLanguages: string[]
  themesOfInterest: string[]
  industriesOfInterest: string
  levelOfEducation: string
  skills: Skill[]
  professionalRoles: Role[]
  recruitmentPreferences: string
  cv: string
  portfolio: string
  github: string
  linkedin: string
}

export default function ProfilePage() {
  const router = useRouter()

  // Generate days (1-31)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  
  // Generate months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  
  // Generate years (current year back to 1950)
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i)

  // Gender options
  const genderOptions = [
    'Male', 'Female', 'Non-binary', 'Prefer not to say', 'Other'
  ]

  // Education levels
  const educationLevels = [
    'Some High School',
    'High School / GED',
    'Some College',
    'Trade School',
    'Associate Degree',
    'Bachelor\'s Degree',
    'Master\'s Degree',
    'Doctoral Degree',
    'Other'
  ]

  // Recruitment preferences
  const recruitmentOptions = [
    'I am actively looking for work',
    'I am not looking for work, but open to hear about opportunities',
    'I am not looking for work',
    'I am looking for internship opportunities',
    'Other'
  ]

  // Industries (expanding themes for more career-focused options)
  const industryOptions = [
    'Technology/Software',
    'Healthcare/Medical',
    'Finance/Banking',
    'Education',
    'Manufacturing',
    'Automotive',
    'Aerospace',
    'Energy/Utilities',
    'Retail/E-commerce',
    'Media/Entertainment',
    'Real Estate',
    'Construction',
    'Agriculture',
    'Transportation/Logistics',
    'Government/Public Sector',
    'Non-profit',
    'Consulting',
    'Legal',
    'Marketing/Advertising',
    'Gaming',
    'Cryptocurrency/Blockchain',
    'AI/Machine Learning',
    'Cybersecurity',
    'Sustainability/Clean Tech',
    'Biotechnology',
    'Other'
  ]

  // Extract countries without country codes for residence/nationality
  const countries = countryOptions.map(option => {
    const match = option.match(/^(.+?)\s+\(\+\d+\)$/)
    return match ? match[1] : option
  })

  // Static data dictionary
  const profileData: ProfileData = {
    profile: {
      title: "Profile",
      personalInfo: {
        firstName: "First name",
        lastName: "Last name",
        emailAddress: "Email address",
        emailDescription: "Your contact email address, where you want to receive necessary notifications related to your activity on the Junction app. Your email address will never be shared with any 3rd parties.",
        phoneNumber: "Phone number",
        countryCode: "Country code",
        phoneDescription: "Your phone number will only be used to contact you in urgent matters, and will never be shared with any 3rd parties.",
        dateOfBirth: "Date of Birth",
        day: "Day",
        month: "Month",
        year: "Year",
        gender: "Gender"
      },
      profileDetails: {
        title: "Profile details",
        description: "When you register to events on the Junction app, the below details will be pre-filled into your registrations, and updated from your latest registration. In case you have opted in for recruitment functionality, these details will also be shown to select Junction partners who are looking to hire. Please see our privacy policy at https://www.hackjunction.com/privacy-policy for more details on how your data is used.",
        headline: "Headline",
        headlineDescription: "In one sentence, who are you / what do you do?",
        biography: "Biography",
        biographyDescription: "Add a bit of personal touch to your profile by writing a few more words about yourself and what you do. Keep it short and simple, you have a chance to tell about your motivation later on in the application!",
        countryOfResidence: "Country of residence",
        nationality: "Nationality",
        spokenLanguages: "Spoken Languages",
        themesOfInterest: "Themes of Interest",
        industriesOfInterest: "Industries of Interest"
      },
      education: {
        title: "Education",
        description: "Your most recent education",
        levelOfEducation: "Level of education"
      },
      skills: {
        title: "Skills",
        description: "Enter up to 10 skills you consider yourself proficient at",
        levelOfExpertise: "Level of expertise",
        levels: ["Basic proficiency", "Novice", "Intermediate", "Advanced", "Expert"]
      },
      professionalRoles: {
        title: "Professional roles",
        description: "Enter up to 5 roles you have working experience in",
        yearsOfExperience: "Years of experience",
        experienceRanges: ["Under 1 year", "1-2 years", "3-4 years", "5-7 years", "8+ years"]
      },
      recruitmentPreferences: {
        title: "Recruitment preferences",
        description: "What is your current professional situation?"
      },
      additionalLinks: {
        title: "Additional links",
        description: "You can link additional links related you in here.",
        cv: "CV",
        cvDescription: "Do you have curriculum vitae for us to look over the studies and experiences that you find most relevant when reviewing your application?",
        portfolio: "Link to Portfolio",
        portfolioDescription: "Have a portfolio website or some other place where we can see the cool things you've done in the past? Please provide a valid link beginning with http(s):// or ftp://",
        github: "Link to GitHub",
        githubDescription: "Do you have a public GitHub/GitLab/BitBucket other profile you wouldn't mind us taking a look at when reviewing your application?",
        linkedin: "LinkedIn Profile",
        linkedinDescription: "Do you have a LinkedIn or similar online profile to showcase your professional experience?"
      }
    }
  }

  const [formData, setFormData] = useState<FormDataType>({
    firstName: 'test',
    lastName: 'test',
    email: 'test_participant@test.com',
    phoneNumber: '',
    countryCode: 'Select...',
    dateOfBirth: { day: 'Select...', month: 'Select...', year: 'Select...' },
    gender: 'Select...',
    headline: '',
    biography: '',
    countryOfResidence: 'Select...',
    nationality: 'Select...',
    spokenLanguages: [],
    themesOfInterest: [],
    industriesOfInterest: 'Select...',
    levelOfEducation: 'Choose one',
    skills: [],
    professionalRoles: [],
    recruitmentPreferences: 'Choose one',
    cv: '',
    portfolio: '',
    github: '',
    linkedin: ''
  })

  const [newSkill, setNewSkill] = useState('')
  const [newSkillExpertise, setNewSkillExpertise] = useState('')
  const [newRole, setNewRole] = useState('')
  const [newRoleExperience, setNewRoleExperience] = useState('')

  const handleBackToHome = () => {
    router.push('/dash')
  }

  const handleSaveProfile = () => {
    console.log('Saving profile:', formData)
    alert('Profile saved successfully!')
  }

  // Helper functions for managing arrays
  const addToArray = (field: keyof FormDataType, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), value]
    }))
  }

  const removeFromArray = (field: keyof FormDataType, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter(item => item !== value)
    }))
  }

  const addSkill = () => {
    if (newSkill && newSkillExpertise && formData.skills.length < 10) {
      const newSkillObj: Skill = {
        id: Date.now().toString(), 
        skill: newSkill, 
        expertise: newSkillExpertise 
      }
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkillObj]
      }))
      setNewSkill('')
      setNewSkillExpertise('')
    }
  }

  const addRole = () => {
    if (newRole && newRoleExperience && formData.professionalRoles.length < 5) {
      const newRoleObj: Role = {
        id: Date.now().toString(), 
        role: newRole, 
        experience: newRoleExperience 
      }
      setFormData(prev => ({
        ...prev,
        professionalRoles: [...prev.professionalRoles, newRoleObj]
      }))
      setNewRole('')
      setNewRoleExperience('')
    }
  }

  const removeSkill = (id: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const removeRole = (id: string) => {
    setFormData(prev => ({
      ...prev,
      professionalRoles: prev.professionalRoles.filter(role => role.id !== id)
    }))
  }

  // Multi-select component for themes and languages
  const MultiSelectField = ({ 
    label, 
    options, 
    value, 
    onChange, 
    maxSelections = null 
  }: {
    label: string
    options: string[]
    value: string[]
    onChange: (value: string) => void
    maxSelections?: number | null
  }) => {
    return (
      <div>
        <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{label}</label>
        <div className="space-y-2 max-h-40 overflow-y-auto border border-[#333] rounded-lg p-3 bg-[${colors.white.opacity5}]">
          {options.map(option => (
            <label key={option} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value.includes(option)}
                onChange={() => onChange(option)}
                disabled={maxSelections && !value.includes(option) && value.length >= maxSelections}
                className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186] disabled:opacity-50"
              />
              <span className={`text-sm ${value.includes(option) ? `text-[${colors.light.opacity100}]` : `text-[${colors.light.opacity60}]`}`}>
                {option}
              </span>
            </label>
          ))}
        </div>
        {maxSelections && (
          <p className={`text-xs mt-1 text-[${colors.light.opacity40}]`}>
            Selected: {value.length}/{maxSelections}
          </p>
        )}
      </div>
    )
  }

  // Input component with design system styles
  const InputField = ({ 
    type = "text", 
    value, 
    onChange, 
    placeholder, 
    onFocus, 
    onBlur, 
    rows,
    disabled 
  }: {
    type?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    placeholder?: string
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
    rows?: number
    disabled?: boolean
  }) => {
    const baseClasses = `w-full bg-[${colors.white.opacity5}] border border-[${colors.white.opacity15}] rounded-lg px-3 py-2 text-[${colors.light.opacity100}] focus:outline-none focus:border-[${colors.primary.opacity50}] ${perf.transition.fast} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
    
    if (type === 'textarea') {
      return (
        <textarea
          rows={rows || 4}
          value={value}
          onChange={onChange}
          className={`${baseClasses} resize-none`}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled || false}
        />
      )
    }
    
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={baseClasses}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled || false}
      />
    )
  }

  const SelectField = ({ 
    value, 
    onChange, 
    children, 
    onFocus, 
    onBlur,
    disabled 
  }: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    children: React.ReactNode
    onFocus?: (e: React.FocusEvent<HTMLSelectElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void
    disabled?: boolean
  }) => (
    <select 
      value={value}
      onChange={onChange}
      className={`w-full bg-[${colors.white.opacity5}] border border-[${colors.white.opacity15}] rounded-lg px-3 py-2 text-[${colors.light.opacity100}] focus:outline-none focus:border-[${colors.primary.opacity50}] ${perf.transition.fast} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled || false}
    >
      {children}
    </select>
  )

  return (
    <div className={`min-h-screen ${spaceGrotesk.variable} bg-[${colors.dark.opacity100}]`}>
      {/* Back to Home Button - Far Left */}
      <div className="px-6 pt-8 pb-4">
        <div className="justify-start items-center flex">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-2 text-[${colors.white.opacity40}]`}>
            <path d="M19 12H5"/>
            <path d="M12 19l-7-7 7-7"/>
          </svg>
          <MainButton 
            variant="ghost"
            size="none"
            onClick={handleBackToHome}
            showIcon={false}
            className={`text-[${colors.white.opacity40}] hover:text-[${colors.white.opacity60}]`}
          >
            Back To Home
          </MainButton>
        </div>
      </div>

      {/* Centered Container */}
      <div className="max-w-4xl mx-auto px-6 pb-8">

        {/* Profile Header */}
        <div className="mb-8 flex items-center space-x-8">
          {/* Profile Picture */}
          <div 
            className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${colors.primary.opacity100}, ${colors.primary.opacity60})`
            }}
          >
            <span className={`text-2xl ${font.grotesk.main} text-[${colors.light.opacity100}]`}>TE</span>
          </div>
          
          <div>
            <h1 className={`text-4xl ${font.grotesk.heavy} mb-2 text-[${colors.light.opacity100}]`}>
              {profileData.profile.title}
            </h1>
            <p className={`text-lg text-[${colors.light.opacity60}]`}>Manage your personal information and preferences</p>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* First Name */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.firstName}</label>
              <InputField
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>

            {/* Last Name */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.lastName}</label>
              <InputField
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>

            {/* Email Address */}
            <div className="md:col-span-2">
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.emailAddress}</label>
              <InputField
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <p className={`text-xs mt-1 text-[${colors.light.opacity40}]`}>{profileData.profile.personalInfo.emailDescription}</p>
            </div>

            {/* Phone Number */}
            <div className="md:col-span-2">
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.phoneNumber}</label>
              <div className="flex space-x-2">
                <SelectField
                  value={formData.countryCode}
                  onChange={(e) => setFormData({...formData, countryCode: e.target.value})}
                >
                  <option value="Select...">Select...</option>
                  {countryOptions.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </SelectField>
                <InputField
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                />
              </div>
              <p className={`text-xs mt-1 text-[${colors.light.opacity40}]`}>{profileData.profile.personalInfo.phoneDescription}</p>
            </div>

            {/* Date of Birth */}
            <div className="md:col-span-2">
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.dateOfBirth}</label>
              <div className="grid grid-cols-12 gap-2">
                <div className="col-span-3">
                  <SelectField
                    value={formData.dateOfBirth.day}
                    onChange={(e) => setFormData({...formData, dateOfBirth: {...formData.dateOfBirth, day: e.target.value}})}
                  >
                    <option value="Select...">Day</option>
                    {days.map(day => (
                      <option key={day} value={day.toString()}>{day}</option>
                    ))}
                  </SelectField>
                </div>
                <div className="col-span-6">
                  <SelectField
                    value={formData.dateOfBirth.month}
                    onChange={(e) => setFormData({...formData, dateOfBirth: {...formData.dateOfBirth, month: e.target.value}})}
                  >
                    <option value="Select...">Month</option>
                    {months.map(month => (
                      <option key={month} value={month}>{month}</option>
                    ))}
                  </SelectField>
                </div>
                <div className="col-span-3">
                  <SelectField
                    value={formData.dateOfBirth.year}
                    onChange={(e) => setFormData({...formData, dateOfBirth: {...formData.dateOfBirth, year: e.target.value}})}
                  >
                    <option value="Select...">Year</option>
                    {years.map(year => (
                      <option key={year} value={year.toString()}>{year}</option>
                    ))}
                  </SelectField>
                </div>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.personalInfo.gender}</label>
              <SelectField
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
              >
                <option value="Select...">Select...</option>
                {genderOptions.map(gender => (
                  <option key={gender} value={gender}>{gender}</option>
                ))}
              </SelectField>
            </div>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.profileDetails.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.description}</p>
          
          <div className="space-y-6">
            {/* Headline */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.headline}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.profileDetails.headlineDescription}</p>
              <InputField
                value={formData.headline}
                onChange={(e: any) => setFormData({...formData, headline: e.target.value})}
              />
            </div>

            {/* Biography */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.biography}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.profileDetails.biographyDescription}</p>
              <InputField
                type="textarea"
                rows={4}
                value={formData.biography}
                onChange={(e: any) => setFormData({...formData, biography: e.target.value})}
              />
            </div>

            {/* Location & Demographics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.countryOfResidence}</label>
                <SelectField
                  value={formData.countryOfResidence}
                  onChange={(e: any) => setFormData({...formData, countryOfResidence: e.target.value})}
                >
                  <option value="Select...">Select...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </SelectField>
              </div>
              
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.nationality}</label>
                <SelectField
                  value={formData.nationality}
                  onChange={(e: any) => setFormData({...formData, nationality: e.target.value})}
                >
                  <option value="Select...">Select...</option>
                  {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </SelectField>
              </div>
            </div>

            {/* Languages and Interests */}
            <div className="grid grid-cols-1 gap-6">
              <MultiSelectField
                label={profileData.profile.profileDetails.spokenLanguages}
                options={languageOptions}
                value={formData.spokenLanguages}
                onChange={(lang) => {
                  if (formData.spokenLanguages.includes(lang)) {
                    removeFromArray('spokenLanguages', lang)
                  } else {
                    addToArray('spokenLanguages', lang)
                  }
                }}
              />
              
              <MultiSelectField
                label={profileData.profile.profileDetails.themesOfInterest}
                options={themeOptions}
                value={formData.themesOfInterest}
                onChange={(theme) => {
                  if (formData.themesOfInterest.includes(theme)) {
                    removeFromArray('themesOfInterest', theme)
                  } else {
                    addToArray('themesOfInterest', theme)
                  }
                }}
                maxSelections={3}
              />
              
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.profileDetails.industriesOfInterest}</label>
                <SelectField
                  value={formData.industriesOfInterest}
                  onChange={(e: any) => setFormData({...formData, industriesOfInterest: e.target.value})}
                >
                  <option value="Select...">Select...</option>
                  {industryOptions.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </SelectField>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.education.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.education.description}</p>
          
          <div>
            <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.education.levelOfEducation}</label>
            <SelectField
              value={formData.levelOfEducation}
              onChange={(e: any) => setFormData({...formData, levelOfEducation: e.target.value})}
            >
              <option value="Choose one">Choose one</option>
              {educationLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </SelectField>
          </div>
        </div>

        {/* Skills Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.skills.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.skills.description}</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>Choose a skill</label>
                <SelectField
                  value={newSkill}
                  onChange={(e: any) => setNewSkill(e.target.value)}
                >
                  <option value="">Select a skill...</option>
                  {skillOptions.sort().map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </SelectField>
              </div>
              
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.skills.levelOfExpertise}</label>
                <div className="space-y-2">
                  {expertiseOptions.map(option => (
                    <label key={option.value} className={`flex items-center space-x-2 text-sm text-[${colors.light.opacity60}]`}>
                      <input
                        type="radio"
                        name="newSkillExpertise"
                        value={option.value}
                        checked={newSkillExpertise === option.value}
                        onChange={(e) => setNewSkillExpertise(e.target.value)}
                        className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <MainButton 
              variant="primary" 
              size="sm" 
              showIcon={false}
              onClick={addSkill}
              disabled={!newSkill || !newSkillExpertise || formData.skills.length >= 10}
            >
              ADD
            </MainButton>

            {formData.skills.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.skills.map(skill => (
                  <div key={skill.id} className={`flex items-center justify-between bg-[${colors.white.opacity5}] rounded-lg px-4 py-2 border border-[${colors.white.opacity15}]`}>
                    <span className={`text-[${colors.light.opacity100}]`}>
                      {skill.skill} - {expertiseOptions.find(opt => opt.value === skill.expertise)?.label}
                    </span>
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className={`text-[#FF8383] hover:text-[${colors.light.opacity100}] ${perf.transition.fast}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18"/>
                        <path d="M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Professional Roles Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.professionalRoles.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.professionalRoles.description}</p>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>Choose a role</label>
                <SelectField
                  value={newRole}
                  onChange={(e: any) => setNewRole(e.target.value)}
                >
                  <option value="">Select a role...</option>
                  {roleOptions.sort().map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </SelectField>
              </div>
              
              <div>
                <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.professionalRoles.yearsOfExperience}</label>
                <div className="space-y-2">
                  {experienceOptions.map(option => (
                    <label key={option.value} className={`flex items-center space-x-2 text-sm text-[${colors.light.opacity60}]`}>
                      <input
                        type="radio"
                        name="newRoleExperience"
                        value={option.value}
                        checked={newRoleExperience === option.value}
                        onChange={(e) => setNewRoleExperience(e.target.value)}
                        className="w-4 h-4 text-[#55D186] border-[#FFFFFF33] focus:ring-[#55D186]"
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <MainButton 
              variant="primary" 
              size="sm" 
              showIcon={false}
              onClick={addRole}
              disabled={!newRole || !newRoleExperience || formData.professionalRoles.length >= 5}
            >
              ADD
            </MainButton>

            {formData.professionalRoles.length > 0 && (
              <div className="mt-4 space-y-2">
                {formData.professionalRoles.map(role => (
                  <div key={role.id} className={`flex items-center justify-between bg-[${colors.white.opacity5}] rounded-lg px-4 py-2 border border-[${colors.white.opacity15}]`}>
                    <span className={`text-[${colors.light.opacity100}]`}>
                      {role.role} - {experienceOptions.find(opt => opt.value === role.experience)?.label}
                    </span>
                    <button
                      onClick={() => removeRole(role.id)}
                      className={`text-[#FF8383] hover:text-[${colors.light.opacity100}] ${perf.transition.fast}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6L6 18"/>
                        <path d="M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recruitment Preferences Section */}
        <div className={`${box.gray.bottom} p-6 mb-6`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.recruitmentPreferences.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.recruitmentPreferences.description}</p>
          
          <SelectField
            value={formData.recruitmentPreferences}
            onChange={(e: any) => setFormData({...formData, recruitmentPreferences: e.target.value})}
          >
            <option value="Choose one">Choose one</option>
            {recruitmentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </SelectField>
        </div>

        {/* Additional Links Section */}
        <div className={`${box.gray.bottom} p-6 mb-8`}>
          <h2 className={`text-2xl ${font.grotesk.main} mb-4 text-[${colors.light.opacity100}]`}>
            {profileData.profile.additionalLinks.title}
          </h2>
          <p className={`text-sm mb-6 text-[${colors.light.opacity60}]`}>{profileData.profile.additionalLinks.description}</p>
          
          <div className="space-y-6">
            {/* CV */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.additionalLinks.cv}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.additionalLinks.cvDescription}</p>
              <InputField
                type="url"
                value={formData.cv}
                onChange={(e: any) => setFormData({...formData, cv: e.target.value})}
              />
            </div>

            {/* Portfolio */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.additionalLinks.portfolio}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.additionalLinks.portfolioDescription}</p>
              <InputField
                type="url"
                value={formData.portfolio}
                onChange={(e: any) => setFormData({...formData, portfolio: e.target.value})}
              />
            </div>

            {/* GitHub */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.additionalLinks.github}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.additionalLinks.githubDescription}</p>
              <InputField
                type="url"
                value={formData.github}
                onChange={(e: any) => setFormData({...formData, github: e.target.value})}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label className={`block text-sm mb-2 text-[${colors.light.opacity60}]`}>{profileData.profile.additionalLinks.linkedin}</label>
              <p className={`text-xs mb-2 text-[${colors.light.opacity40}]`}>{profileData.profile.additionalLinks.linkedinDescription}</p>
              <InputField
                type="url"
                value={formData.linkedin}
                onChange={(e: any) => setFormData({...formData, linkedin: e.target.value})}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end mb-8">
          <MainButton 
            variant="primary" 
            size="lg" 
            showIcon={false}
            onClick={handleSaveProfile}
          >
            Save Profile
          </MainButton>
        </div>
      </div>
    </div>
  )
}