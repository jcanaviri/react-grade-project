import { createContext, useContext, useState, useEffect } from 'react'

import { supabase } from '../supabase'

// Declare the context
const AuthContext = createContext()

// Custom Hook
export const useAuth = () => useContext(AuthContext)

// The auth Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(true)
  const [website, setWebsite] = useState('')
  const [avatar_url, setAvatarUrl] = useState('')

  useEffect(() => {
    const session = supabase.auth.session()

    setUser(session?.user ?? null)
    setLoading(false)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => {
      listener?.unsubscribe()
    }
  }, [])

  useEffect(async () => {
    const data = await getProfile()
    setUsername(data.username)
    setWebsite(data.website)
    setAvatarUrl(data.avatar_url)
  }, [user])

  const getProfile = async () => {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      return data
    } catch (error) {
      return error.message
    }
  }

  const value = {
    signUp: (data) => supabase.auth.signUp(data),
    signIn: (data) => supabase.auth.signIn(data),
    signOut: () => supabase.auth.signOut(),
    user,
    username,
    website,
    avatar_url,
    setUsername,
    setWebsite,
    setAvatarUrl,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
