'use client'

import { useState, useEffect } from 'react'
import { Footer } from "@/components/footer"
import { JunctionLogo } from '@/components/logo'

interface ProfileData {
  sidebar: {
    navigation: {
      events: {
        title: string
        yourEvents: string
        organizeEvent: string
      }
      profile: string
      logOut: string
    }
  }
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
  const [sidebarWidth, setSidebarWidth] = useState(256)
  const [isResizing, setIsResizing] = useState(false)
  
  // Static data dictionary
  const profileData: ProfileData = {
    sidebar: {
      navigation: {
        events: {
          title: "Events",
          yourEvents: "Your events",
          organizeEvent: "Organize event"
        },
        profile: "Profile",
        logOut: "Log Out"
      }
    },
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

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return
    const newWidth = e.clientX
    if (newWidth >= 200 && newWidth <= 400) {
      setSidebarWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isResizing])

  return (
    <div className="min-h-screen bg-black text-white font-['Inter']">
      <div className="flex">
        {/* Sidebar */}
        <div 
          className="bg-zinc-900 border-r border-white/5 flex-shrink-0 relative"
          style={{ width: `${sidebarWidth}px` }}
        >
          <div className="p-6">
            {/* Logo 1 in sidebar */}
            <div className="mb-8">
              <JunctionLogo />
            </div>
            
            {/* Splitting line above Events */}
            <div className="border-t border-white/10 mb-6"></div>
            
            {/* Navigation */}
            <nav className="space-y-6">
              <div>
                <h3 className="text-white font-['Space_Grotesk'] font-medium mb-3">{profileData.sidebar.navigation.events.title}</h3>
                <div className="space-y-2 ml-4">
                  <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{profileData.sidebar.navigation.events.yourEvents}</a>
                  <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{profileData.sidebar.navigation.events.organizeEvent}</a>
                </div>
              </div>
              
              <div className="space-y-2">
                <a href="#" className="block text-white text-sm font-['Inter'] transition-colors">{profileData.sidebar.navigation.profile}</a>
                <a href="#" className="block text-white/60 hover:text-white text-sm font-['Inter'] transition-colors">{profileData.sidebar.navigation.logOut}</a>
              </div>
            </nav>
          </div>
          
          {/* Resize Handle */}
          <div
            className="absolute top-0 right-0 w-px h-full cursor-col-resize bg-white/5 hover:bg-white/10 transition-colors"
            onMouseDown={handleMouseDown}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar with JunctionLogo */}
          <div className="bg-black border-b border-white/10">
            <div className="px-6 py-4 flex items-center justify-between">
              <JunctionLogo />
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-white/20 rounded-sm"></div>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="px-6 py-8 flex-1 max-w-4xl mx-auto w-full">
            {/* Profile Header */}
            <div className="mb-12 flex items-center space-x-8">
              {/* Profile Picture */}
              <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-white text-4xl font-['Space_Grotesk'] font-bold">TE</span>
              </div>
              
              <div>
                <h1 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-2">{profileData.profile.title}</h1>
              </div>
            </div>

            {/* Personal Information Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.firstName}</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.lastName}</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* Email Address */}
                <div className="md:col-span-2">
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.emailAddress}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                  <p className="text-white/40 text-xs font-['Inter'] mt-1">{profileData.profile.personalInfo.emailDescription}</p>
                </div>

                {/* Phone Number */}
                <div className="md:col-span-2">
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.phoneNumber}</label>
                  <div className="flex space-x-2">
                    <select className="bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                      className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                    />
                  </div>
                  <p className="text-white/40 text-xs font-['Inter'] mt-1">{profileData.profile.personalInfo.phoneDescription}</p>
                </div>

                {/* Date of Birth */}
                <div className="md:col-span-2">
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.dateOfBirth}</label>
                  <div className="grid grid-cols-12 gap-2">
                    <div className="col-span-3">
                      <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                        <option>Select...</option>
                      </select>
                    </div>
                    <div className="col-span-6">
                      <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                        <option>Select...</option>
                      </select>
                    </div>
                    <div className="col-span-3">
                      <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                        <option>Select...</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.personalInfo.gender}</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                    <option>Select...</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Profile Details Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.profileDetails.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.profileDetails.description}</p>
              
              <div className="space-y-6">
                {/* Headline */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.headline}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.profileDetails.headlineDescription}</p>
                  <input
                    type="text"
                    value={formData.headline}
                    onChange={(e) => setFormData({...formData, headline: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* Biography */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.biography}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.profileDetails.biographyDescription}</p>
                  <textarea
                    rows={4}
                    value={formData.biography}
                    onChange={(e) => setFormData({...formData, biography: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50 resize-none"
                  />
                </div>

                {/* Location & Demographics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.countryOfResidence}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.nationality}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                  </div>
                </div>

                {/* Interests */}
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.spokenLanguages}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.themesOfInterest}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.profileDetails.industriesOfInterest}</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                      <option>Select...</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.education.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.education.description}</p>
              
              <div>
                <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.education.levelOfEducation}</label>
                <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                  <option>Choose one</option>
                </select>
              </div>
            </div>

            {/* Skills Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.skills.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.skills.description}</p>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Type to search for skills"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>
                
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.skills.levelOfExpertise}</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.profile.skills.levels.map((level, index) => (
                      <label key={index} className="flex items-center space-x-2 text-white/60 text-sm font-['Inter']">
                        <input type="radio" name="skillLevel" className="text-green-300" />
                        <span>{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button className="bg-green-300/20 hover:bg-green-300/30 text-green-300 border border-green-300/30 rounded px-4 py-2 text-sm font-['Space_Mono'] transition-colors">
                  ADD
                </button>
              </div>
            </div>

            {/* Professional Roles Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.professionalRoles.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.professionalRoles.description}</p>
              
              <div className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Type to search for roles"
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>
                
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.professionalRoles.yearsOfExperience}</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.profile.professionalRoles.experienceRanges.map((range, index) => (
                      <label key={index} className="flex items-center space-x-2 text-white/60 text-sm font-['Inter']">
                        <input type="radio" name="experience" className="text-green-300" />
                        <span>{range}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <button className="bg-green-300/20 hover:bg-green-300/30 text-green-300 border border-green-300/30 rounded px-4 py-2 text-sm font-['Space_Mono'] transition-colors">
                  ADD
                </button>
              </div>
            </div>

            {/* Recruitment Preferences Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.recruitmentPreferences.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.recruitmentPreferences.description}</p>
              
              <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50">
                <option>Choose one</option>
              </select>
            </div>

            {/* Additional Links Section */}
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-['Space_Grotesk'] font-bold text-white mb-4">{profileData.profile.additionalLinks.title}</h2>
              <p className="text-white/60 text-sm font-['Inter'] mb-6">{profileData.profile.additionalLinks.description}</p>
              
              <div className="space-y-6">
                {/* CV */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.additionalLinks.cv}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.additionalLinks.cvDescription}</p>
                  <input
                    type="url"
                    value={formData.cv}
                    onChange={(e) => setFormData({...formData, cv: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* Portfolio */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.additionalLinks.portfolio}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.additionalLinks.portfolioDescription}</p>
                  <input
                    type="url"
                    value={formData.portfolio}
                    onChange={(e) => setFormData({...formData, portfolio: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* GitHub */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.additionalLinks.github}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.additionalLinks.githubDescription}</p>
                  <input
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>

                {/* LinkedIn */}
                <div>
                  <label className="block text-white/60 text-sm font-['Inter'] mb-2">{profileData.profile.additionalLinks.linkedin}</label>
                  <p className="text-white/40 text-xs font-['Inter'] mb-2">{profileData.profile.additionalLinks.linkedinDescription}</p>
                  <input
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-white font-['Inter'] focus:outline-none focus:border-green-300/50"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button className="bg-green-300 hover:bg-green-400 text-black font-['Space_Mono'] font-medium px-8 py-3 rounded transition-colors">
                Save Profile
              </button>
            </div>
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  )
}