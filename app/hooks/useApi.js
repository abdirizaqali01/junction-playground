// hooks/useApi.js
import { useState, useEffect } from 'react'

// Generic API hook
export const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/proxy/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      const result = await response.json()
      
      // Handle both single objects and arrays
      if (Array.isArray(result)) {
        setData(result)
      } else {
        setData([result])
      }
    } catch (err) {
      console.error('API Error:', err)
      setError(err.message)
      setData([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (endpoint) {
      fetchData()
    }
  }, [endpoint])

  return { data: data || [], loading, error, refetch: fetchData }
}

// Specific hooks for each endpoint
export const useEvents = () => useApi('events')
export const useOrganizations = () => useApi('organizations')
export const useTeams = () => useApi('teams')
export const useProjects = () => useApi('projects')

// Single item hooks
export const useEvent = (id) => useApi(id ? `events/${id}` : null)
export const useOrganization = (id) => useApi(id ? `organizations/${id}` : null)
export const useTeam = (id) => useApi(id ? `teams/${id}` : null)
export const useProject = (id) => useApi(id ? `projects/${id}` : null)

// Challenge-specific hooks
export const useEventChallenge = (challengeId) => useApi(challengeId ? `event-challenges/${challengeId}` : null)
export const useEventChallenges = (eventId) => useApi(eventId ? `events/${eventId}/challenges` : null)

// Hook for single challenge with full data (challenge + organization + event)
export const useChallengeWithDetails = (challengeId) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchChallengeWithDetails = async () => {
      if (!challengeId) return

      try {
        setLoading(true)
        setError(null)

        // Fetch challenge details
        const challengeResponse = await fetch(`/api/proxy/event-challenges/${challengeId}`, {
          headers: { 'Content-Type': 'application/json' }
        })

        if (!challengeResponse.ok) {
          throw new Error(`Failed to fetch challenge: ${challengeResponse.status}`)
        }

        const challenge = await challengeResponse.json()

        // Fetch organization details if organization_id exists
        let organization = null
        if (challenge.organization_id) {
          try {
            const orgResponse = await fetch(`/api/proxy/organizations/${challenge.organization_id}`, {
              headers: { 'Content-Type': 'application/json' }
            })
            if (orgResponse.ok) {
              organization = await orgResponse.json()
            }
          } catch (err) {
            console.warn('Failed to fetch organization details:', err)
          }
        }

        // Fetch event details if event_id exists
        let event = null
        if (challenge.event_id) {
          try {
            const eventResponse = await fetch(`/api/proxy/events/${challenge.event_id}`, {
              headers: { 'Content-Type': 'application/json' }
            })
            if (eventResponse.ok) {
              event = await eventResponse.json()
            }
          } catch (err) {
            console.warn('Failed to fetch event details:', err)
          }
        }

        setData({
          challenge,
          organization: organization || { organization_id: 0, name: 'Unknown Organization', slug: '' },
          event: event || { event_id: 0, name: 'Unknown Event' }
        })

      } catch (err) {
        console.error('API Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchChallengeWithDetails()
  }, [challengeId])

  return { data, loading, error }
}

// POST/PUT/DELETE operations
export const useApiMutation = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = async (endpoint, options = {}) => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(`/api/proxy/${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options
      })
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }
      
      return await response.json()
    } catch (err) {
      console.error('API Mutation Error:', err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const createEvent = (eventData) => mutate('events', {
    method: 'POST',
    body: JSON.stringify(eventData)
  })

  const updateEvent = (id, eventData) => mutate(`events/${id}`, {
    method: 'PUT',
    body: JSON.stringify(eventData)
  })

  const deleteEvent = (id) => mutate(`events/${id}`, {
    method: 'DELETE'
  })

  const createTeam = (teamData) => mutate('teams', {
    method: 'POST',
    body: JSON.stringify(teamData)
  })

  const createProject = (projectData) => mutate('projects', {
    method: 'POST',
    body: JSON.stringify(projectData)
  })

  // Challenge-related mutations
  const createChallenge = (challengeData) => mutate('event-challenges', {
    method: 'POST',
    body: JSON.stringify(challengeData)
  })

  const updateChallenge = (id, challengeData) => mutate(`event-challenges/${id}`, {
    method: 'PUT',
    body: JSON.stringify(challengeData)
  })

  const deleteChallenge = (id) => mutate(`event-challenges/${id}`, {
    method: 'DELETE'
  })

  return {
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    createTeam,
    createProject,
    createChallenge,
    updateChallenge,
    deleteChallenge,
    mutate // Generic mutate function
  }
}