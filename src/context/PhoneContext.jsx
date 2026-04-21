import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import phonesApi from '../services/api'
import { useDebounce } from '../hooks/useDebounce'

const PhoneContext = createContext(null)

export function PhoneProvider({ children }) {
  const [phones, setPhones] = useState([])
  const [searchResults, setSearchResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const debouncedQuery = useDebounce(searchQuery, 300)

  const fetchPhones = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await phonesApi.getAll()
      setPhones(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPhones()
  }, [fetchPhones])

  useEffect(() => {
    const q = debouncedQuery.trim()
    if (q.length < 2) {
      setSearchResults(null)
      return
    }
    phonesApi
      .getAll(q)
      .then(setSearchResults)
      .catch(err => setError(err.message))
  }, [debouncedQuery])

  const filteredPhones = searchResults ?? phones

  return (
    <PhoneContext.Provider
      value={{ phones, filteredPhones, loading, error, searchQuery, setSearchQuery, fetchPhones }}
    >
      {children}
    </PhoneContext.Provider>
  )
}

PhoneProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function usePhones() {
  const ctx = useContext(PhoneContext)
  if (!ctx) throw new Error('usePhones must be used within PhoneProvider')
  return ctx
}

export default PhoneContext
