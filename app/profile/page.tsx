'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from '@/components/sidebar'
import { MainButton } from '@/components/attachables/main-button'
import { Footer } from "@/components/footer"
import { colors, spaceGrotesk, initializeCSSVariables } from '@/styles/design-system'

const userProfile = {
  name: 'Junction Hack',
  email: 'ju@hackjunction.com',
  initials: 'JU',
  avatarColor: 'bg-green-600'
}

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

export default function ProfilePage() {
  const router = useRouter()
  
  // Initialize CSS variables on component mount MISSING

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

  const [formData, setFormData] = useState({
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
    spokenLanguages: 'Select...',
    themesOfInterest: 'Select...',
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

  const handleBackToHome = () => {
    router.push('/dash')
  }

  const handleSaveProfile = () => {
    console.log('Saving profile:', formData)
    // TODO: Implement save functionality
    alert('Profile saved successfully!')
  }

  // Define styles using the design system colors
  const styles = {
    background: { backgroundColor: colors.dark.opacity100 },
    text: { color: colors.light.opacity100 },
    textSecondary: { color: colors.light.opacity60 },
    textTertiary: { color: colors.light.opacity40 },
    card: { 
      backgroundColor: colors.white.opacity10,
      borderColor: colors.white.opacity15
    },
    input: {
      backgroundColor: colors.white.opacity5,
      borderColor: colors.white.opacity15,
      color: colors.light.opacity100
    },
    inputFocus: {
      borderColor: colors.primary.opacity50
    },
    avatar: {
      background: `linear-gradient(135deg, ${colors.primary.opacity100}, ${colors.primary.opacity60})`
    }
  }

  return (
    <div className={`min-h-screen ${spaceGrotesk.variable} flex`} style={styles.background}>
      <Sidebar
        userProfile={userProfile}
        backToHomeLabel="Back To Home"
        onBackToHome={handleBackToHome}
        showImagePlaceholder={true}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto flex flex-col transition-all duration-300 ml-[250px]">
        {/* Main Content Area */}
        <div className="flex-1 p-8 pt-[6%]">
          {/* Profile Header */}
          <div className="mb-8 flex items-center space-x-8">
            {/* Profile Picture */}
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center"
              style={styles.avatar}
            >
              <span className="text-2xl font-bold font-[var(--font-space-grotesk)]" style={styles.text}>TE</span>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-2 font-[var(--font-space-grotesk)]" style={styles.text}>
                {profileData.profile.title}
              </h1>
              <p className="text-lg" style={styles.textSecondary}>Manage your personal information and preferences</p>
            </div>
          </div>

          {/* Personal Information Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.firstName}</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.lastName}</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* Email Address */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.emailAddress}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
                <p className="text-xs mt-1" style={styles.textTertiary}>{profileData.profile.personalInfo.emailDescription}</p>
              </div>

              {/* Phone Number */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.phoneNumber}</label>
                <div className="flex space-x-2">
                  <select 
                    className="border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  />
                </div>
                <p className="text-xs mt-1" style={styles.textTertiary}>{profileData.profile.personalInfo.phoneDescription}</p>
              </div>

              {/* Date of Birth */}
              <div className="md:col-span-2">
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.dateOfBirth}</label>
                <div className="grid grid-cols-12 gap-2">
                  <div className="col-span-3">
                    <select 
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                      onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                    >
                      <option>Day</option>
                    </select>
                  </div>
                  <div className="col-span-6">
                    <select 
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                      onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                    >
                      <option>Month</option>
                    </select>
                  </div>
                  <div className="col-span-3">
                    <select 
                      className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                      style={styles.input}
                      onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                      onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                    >
                      <option>Year</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.personalInfo.gender}</label>
                <select 
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                >
                  <option>Select...</option>
                </select>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.profileDetails.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.profileDetails.description}</p>
            
            <div className="space-y-6">
              {/* Headline */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.headline}</label>
                <p className="text-xs mb-2" style={styles.textTertiary}>{profileData.profile.profileDetails.headlineDescription}</p>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({...formData, headline: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* Biography */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.biography}</label>
                <p className="text-xs mb-2" style={styles.textTertiary}>{profileData.profile.profileDetails.biographyDescription}</p>
                <textarea
                  rows={4}
                  value={formData.biography}
                  onChange={(e) => setFormData({...formData, biography: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors resize-none"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* Location & Demographics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.countryOfResidence}</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.nationality}</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                </div>
              </div>

              {/* Languages and Interests */}
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.spokenLanguages}</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.themesOfInterest}</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.profileDetails.industriesOfInterest}</label>
                  <select 
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                    style={styles.input}
                    onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                    onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                  >
                    <option>Select...</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.education.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.education.description}</p>
            
            <div>
              <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.education.levelOfEducation}</label>
              <select 
                className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
              >
                <option>Choose one</option>
              </select>
            </div>
          </div>

          {/* Skills Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.skills.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.skills.description}</p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Type to search for skills"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.skills.levelOfExpertise}</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.profile.skills.levels.map((level, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm" style={styles.textSecondary}>
                      <input 
                        type="radio" 
                        name="skillLevel" 
                        className="focus:ring-2"
                        style={{
                          backgroundColor: colors.white.opacity5,
                          borderColor: colors.white.opacity15,
                          accentColor: colors.primary.opacity100
                        }}
                      />
                      <span>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <MainButton variant="primary" size="sm" showIcon={false}>
                ADD
              </MainButton>
            </div>
          </div>

          {/* Professional Roles Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.professionalRoles.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.professionalRoles.description}</p>
            
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Type to search for roles"
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>
              
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.professionalRoles.yearsOfExperience}</label>
                <div className="flex flex-wrap gap-2">
                  {profileData.profile.professionalRoles.experienceRanges.map((range, index) => (
                    <label key={index} className="flex items-center space-x-2 text-sm" style={styles.textSecondary}>
                      <input 
                        type="radio" 
                        name="experience" 
                        className="focus:ring-2"
                        style={{
                          backgroundColor: colors.white.opacity5,
                          borderColor: colors.white.opacity15,
                          accentColor: colors.primary.opacity100
                        }}
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <MainButton variant="primary" size="sm" showIcon={false}>
                ADD
              </MainButton>
            </div>
          </div>

          {/* Recruitment Preferences Section */}
          <div className="border rounded-xl p-6 mb-6" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.recruitmentPreferences.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.recruitmentPreferences.description}</p>
            
            <select 
              className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
              onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
            >
              <option>Choose one</option>
            </select>
          </div>

          {/* Additional Links Section */}
          <div className="border rounded-xl p-6 mb-8" style={styles.card}>
            <h2 className="text-2xl font-bold mb-4 font-[var(--font-space-grotesk)]" style={styles.text}>
              {profileData.profile.additionalLinks.title}
            </h2>
            <p className="text-sm mb-6" style={styles.textSecondary}>{profileData.profile.additionalLinks.description}</p>
            
            <div className="space-y-6">
              {/* CV */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.additionalLinks.cv}</label>
                <p className="text-xs mb-2" style={styles.textTertiary}>{profileData.profile.additionalLinks.cvDescription}</p>
                <input
                  type="url"
                  value={formData.cv}
                  onChange={(e) => setFormData({...formData, cv: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* Portfolio */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.additionalLinks.portfolio}</label>
                <p className="text-xs mb-2" style={styles.textTertiary}>{profileData.profile.additionalLinks.portfolioDescription}</p>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none transition-colors"
                  style={styles.input}
                  onFocus={(e) => e.target.style.borderColor = colors.primary.opacity50}
                  onBlur={(e) => e.target.style.borderColor = colors.white.opacity15}
                />
              </div>

              {/* GitHub */}
              <div>
                <label className="block text-sm mb-2" style={styles.textSecondary}>{profileData.profile.additionalLinks.github}</label>
                <p className="text-xs mb-2" style={styles.textTertiary}>{profileData.profile.additionalLinks.githubDescription}</p>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => setFormData({...formData, github: e.target.value})}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>

              {/* LinkedIn */}
              <div>
                <label className="block text-white/60 text-sm mb-2">{profileData.profile.additionalLinks.linkedin}</label>
                <p className="text-white/40 text-xs mb-2">{profileData.profile.additionalLinks.linkedinDescription}</p>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-400/50 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
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

        <Footer />
      </div>
    </div>
  )
}