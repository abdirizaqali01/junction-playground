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

  return {
    loading,
    error,
    createEvent,
    updateEvent,
    deleteEvent,
    createTeam,
    createProject,
    mutate // Generic mutate function
  }
}