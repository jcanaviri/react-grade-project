import { useState } from 'react'
import { Navigate } from 'react-router-dom'

// Custom authentication hook
import { useAuth } from '../context/AuthContext'

// Components
import { Navbar, Alert } from '../components'

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
            <div className="max-w-md w-full space-y-8 border rounded-lg shadow-sm p-8">
              {showAlert && (
                <Alert
                  message="Un email ha sido enviado a tu correo"
                  type="info"
                  closeAlert={() => setShowAlert(false)}
                />
              )}

              <div>
                <div className="flex items-center justify-center">
                  <img className="h-12 w-12" src={logo} alt="logo" />
                  <span className="text-slate-600 hover:text-slate-700 ml-2 font-medium">
                    Estimate App
                  </span>
                </div>
                <h2 className="mt-6 text-center text-2xl text-slate-900">
                  Ingresa mediante un link mágico
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  <a
                    href="#"
                    className="font-medium text-yellow-400 hover:text-yellow-500"
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
                      placeholder="Tu email..."
                      required
                    />
                  </div>
                </div>

                <p className="text-sm text-justify font-extralight">
                  <i className="bx bx-question-mark"></i> Un link mágico se
                  enviara a tu correo electrónico mediante este podrás acceder a
                  tus datos almacenados, si no posees datos almacenados
                  estos se comenzaran a almacenar inmediatamente los uses.
                </p>

                <div>
                  <button
                    type="submit"
                    className={`focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 w-full disabled:bg-opacity-70 flex items-center justify-center ${
                      loading && 'cursor-wait'
                    }`}
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

          {/* Footer */}
          <footer className="fixed bottom-0 left-0 right-0 bg-gray-200 text-center lg:text-left">
            <div className="text-slate-800 text-center p-2 text-sm">
              © 2022 Todos los derechos estan reservados -
              <a className="text-slate-800 ml-2" href="">
                jcanaviri20@gmail.com
              </a>
            </div>
          </footer>
          {/* Footer */}
        </>
      )}
    </>
  )
}
