import { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import phonesApi from '../services/api'
import { useDebounce } from '../hooks/useDebounce'

const PhoneContext = createContext(null)

export function PhoneProvider({ children }) {
  const [phones, setPhones] = useState([])
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

  const filteredPhones = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase()
    if (q.length < 2) return phones
    const words = q.split(/\s+/).filter(w => w.length >= 2)
    if (words.length === 0) return phones
    return phones.filter(phone => {
      const brand = phone.brand?.toLowerCase() ?? ''
      const name = phone.name?.toLowerCase() ?? ''
      return words.every(w => brand.includes(w) || name.includes(w))
    })
  }, [phones, debouncedQuery])

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
