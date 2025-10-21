import { useState } from 'react'

export function useSearch(initialQuery: string = '') {
  const [searchQuery, setSearchQuery] = useState(initialQuery)

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  return {
    searchQuery,
    handleSearchChange,
    clearSearch,
  }
}