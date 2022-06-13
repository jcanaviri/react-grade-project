import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

import { Avatar } from './Avatar'
import { UserIconMenu } from './UserIconMenu'

export const Pannel = () => {
  const [menuToggle, setMenuToggle] = useState(false)

  const { user, username, avatar_url, signOut } = useAuth()

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setMenuToggle(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.addEventListener('keydown', close)
  }, [])

  const floatingStyles = {
    position: 'absolute',
    inset: '0px 0px auto auto',
    margin: '0px',
    transform: 'translate(-50px, 64px)',
  }

  return (
    <div className="md:ml-64 shadow-sm relative top-0 left-0 z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start hidden md:flex items-center p-4">
      <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <form>
          <div className="relative group">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none text-gray-400 group-focus:text-yellow-500 group-hover:text-yellow-500 group-active:text-yellow-500">
              <i className="bx bx-search-alt"></i>
            </div>
            <input
              type="search"
              className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 pl-10 focus:outline-none focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
              placeholder="Buscar un Proyecto..."
            />
          </div>
        </form>

        <div
          className="flex items-center cursor-pointer"
          onClick={() => setMenuToggle((prevState) => !prevState)}
        >
          <span className="mx-2 text-slate-800 font-semibold text-sm">
            ¡Bienvenido, {username}!
          </span>
          <Avatar url={avatar_url} isForUpdating={false} />
          {menuToggle && (
            <UserIconMenu
              floatingStyles={floatingStyles}
              email={user.email}
              signOut={signOut}
            />
          )}
        </div>
      </div>
    </div>
  )
}
