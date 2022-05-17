import { useState } from 'react'

// Custom authentication hook
import { useAuth } from '../context/AuthContext'

export default () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const { user, signIn } = useAuth()

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
        <span>You are already logged in</span>
      ) : (
        <div>
          <h1>Supabase + React</h1>
          <p>
            Sign in via magic link with your email below
          </p>
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
              <button>
                Send magic link
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}
