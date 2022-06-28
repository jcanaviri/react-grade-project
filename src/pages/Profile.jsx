import { useState } from 'react'

import { supabase } from '../supabase'

import { Avatar, Alert } from '../components'

import { useAuth } from '../context/AuthContext'

import logo from '../favicon.png'

export const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState({
    message: '',
    type: '',
  })

  const {
    user,
    username,
    website,
    avatar_url,
    setUsername,
    setWebsite,
    setAvatarUrl,
  } = useAuth()

  const updateProfile = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal',
      })

      if (error) throw error

      setAlertMessage({
        message: 'Se ha actualizado tus datos correctamente',
        type: 'info',
      })
      setShowAlert(true)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="p-4">
        {showAlert && (
          <Alert
            message={alertMessage.message}
            type={alertMessage.type}
            closeAlert={() => setShowAlert(false)}
          />
        )}

        <form
          className="grid grid-cols-2 gap-4 place-items-center"
          onSubmit={updateProfile}
          autoComplete="off"
        >
          <div className="col-span-1 border rounded-md p-8">
            <div className="flex items-center justify-center my-2">
              <img className="h-12 w-12" src={logo} alt="logo" />
              <span className="text-slate-600 hover:text-slate-700 ml-2 font-medium">
                Estimate App - Mi Perfil
              </span>
            </div>

            <div className="mb-2 grid grid-cols-2">
              <label
                className="text-sm font-semibold text-gray-600 col-span-1 flex justify-end items-center mr-4"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                id="username"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 col-span-1"
                value={username || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2 grid grid-cols-2">
              <label
                className="text-sm font-semibold text-gray-600 col-span-1 flex justify-end items-center mr-4"
                htmlFor="email"
              >
                Correo Electrónico:
              </label>
              <input
                id="email"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 col-span-1"
                value={user.email || ''}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-2 grid grid-cols-2">
              <label
                className="text-sm font-semibold text-gray-600 col-span-1 flex justify-end items-center mr-4"
                htmlFor="website"
              >
                Sitio Web:
              </label>
              <input
                id="website"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500 col-span-1"
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <p className="text-sm font-light text-slate-800 text-right my-4">
              Última actualizacion: {user.updated_at.split('T')[0]}
            </p>

            <div className="flex justify-center mt-4">
              <button
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center"
                disabled={loading}
              >
                {loading ? 'Actualizando...' : 'Actualizar'}
              </button>
            </div>
          </div>
          <div className="col-span-2 md:col-span-1 p-4">
            <Avatar
              url={avatar_url}
              onUpload={(url) => {
                setAvatarUrl(url)
                updateProfile({ username, website, avatar_url: url })
              }}
              isForUpdating={true}
              width={200}
              height={200}
            />
          </div>
        </form>
      </div>
    </>
  )
}
