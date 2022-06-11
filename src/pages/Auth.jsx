import { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Custom authentication hook
import { useAuth } from '../context/AuthContext'

// Components
import { Navbar } from '../components/Navbar'
import { Alert } from '../components/Alert'

// Utilities
import logo from '../favicon.png'

export const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [email, setEmail] = useState('')

  const { user, signIn } = useAuth()

  const linkItems = []

  const handleLogin = async (e) => {
    e.preventDefault()

    if (email === '' || email === undefined) return

    try {
      setLoading(true)
      const { error } = await signIn({ email })
      if (error) throw error
      setShowAlert(true)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {user ? (
        <Navigate to="/dashboard" />
      ) : (
        <>
          <Navbar linkItems={linkItems} />

          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              {showAlert && <Alert closeAlert={() => setShowAlert(false)} />}

              <div>
                <img className="mx-auto h-12 w-auto" src={logo} alt="logo" />
                <h2 className="mt-6 text-center text-3xl text-slate-900">
                  Ingresa mediante un link mágico
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-yellow-500 hover:text-yellow-600"
                  >
                    Se enviara un link a tu correo y mediante este podras
                    acceder a tu cuenta
                  </a>
                </p>
              </div>
              <form
                className="mt-8 space-y-6"
                onSubmit={handleLogin}
                autoComplete="off"
              >
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Tu email
                    </label>
                    <input
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                      placeholder="Tu email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full disabled:bg-opacity-70 flex items-center justify-center ${loading && 'cursor-wait'}`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <i className="text-2xl bx bx-mail-send mr-2 relative top-1"></i>{' '}
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="text-2xl bx bx-mail-send mr-2 relative top-1"></i>{' '}
                        Enviar el link mágico
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  )
}
