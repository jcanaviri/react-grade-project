import { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Custom authentication hook
import { useAuth } from '../context/AuthContext'

// Components
import { Navbar } from '../components/Navbar'

export const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const { user, signIn } = useAuth()

  const linkItems = []

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const { error } = await signIn({ email })
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {user ? (
        <Navigate to="/account" />
      ) : (
        <>
          <Navbar linkItems={linkItems} />
          <h1>Supabase + React</h1>
          <p>Sign in via magic link with your email below</p>
          {loading ? (
            'Sending magic link...'
          ) : (
            <form onSubmit={handleLogin}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button>Send magic link</button>
            </form>
          )}
        </>
      )}
    </>
  )
}
