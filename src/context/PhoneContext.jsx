import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import phonesApi from '../services/api'

const PhoneContext = createContext(null)

export function PhoneProvider({ children }) {
  const [phones, setPhones] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

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

  const filteredPhones = phones.filter(phone => {
    const q = searchQuery.toLowerCase()
    return (
      phone.brand?.toLowerCase().includes(q) ||
      phone.name?.toLowerCase().includes(q) ||
      phone.description?.toLowerCase().includes(q)
    )
  })

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
