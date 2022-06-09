import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// Client of supabase
import { supabase } from '../supabase'

// Components
import { UserIconMenu } from './UserIconMenu'

// Utilities
import logo from '../favicon.png'
import defaultUser from '../assets/default.png'
import { sidebarItems } from '../utils/DashboardUtilities'

export const SideBar = ({ url, email, signOut }) => {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [menuToggle, setMenuToggle] = useState(false)
  const [listToggle, setListToggle] = useState(false)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setMenuToggle(false)
        setListToggle(false)
      }
    }
    window.addEventListener('keydown', close)
    return () => window.addEventListener('keydown', close)
  }, [])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const floatingStyles = {
    position: 'absolute',
    inset: '0px auto auto 0px',
    margin: '0px',
    transform: 'translate(-154px, 32px)',
  }

  return (
    <div className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-scroll md:flex-row md:flex-nowrap md:overflow-hidden shadow-md bg-yellow-100 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        <button
          className="cursor-pointer text-slate-800 opacity-50 md:hidden px-2 py-2 text-2xl leading-none rounded border border-solid border-transparent focus:ring-4 focus:ring-yellow-300"
          type="button"
          onClick={() => setListToggle((prevState) => !prevState)}
        >
          <i className="bx bx-menu-alt-left"></i>
        </button>

        {/* Logo */}
        <Link
          to="/dashboard"
          className="md:block text-left md:pb-2 text-slate-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0"
        >
          <img
            className="w-8 h-8 inline-block relative -top-1"
            src={logo}
            alt="app logo"
          />
          <span className="ml-2">Estimate App</span>
        </Link>
        {/* Logo */}

        {/* user icon */}
        <ul className="md:hidden items-center flex flex-wrap list-none">
          <li className="inline-block relative mx-2">
            <a className="text-slate-500 block" href="#">
              <div className="items-center flex">
                <span className="w-12 h-12 text-sm inline-flex items-center justify-center rounded-full">
                  <img
                    src={avatarUrl ? avatarUrl : defaultUser}
                    alt={avatarUrl ? 'Avatar' : 'No image'}
                    className="w-full rounded-full align-middle border-none"
                    onClick={() => setMenuToggle((prevState) => !prevState)}
                  />
                </span>
              </div>
            </a>
            {menuToggle && (
              <UserIconMenu
                floatingStyles={floatingStyles}
                email={email}
                signOut={signOut}
              />
            )}
          </li>
        </ul>
        {/* user icon */}

        <div
          className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${
            listToggle ? 'bg-white m-2 py-3 px-6' : 'hidden'
          }`}
        >
          <div className="flex justify-end">
            <button
              type="button"
              className="ml-auto -mx-1.5 -my-1.5 bg-yellow-100 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex h-8 w-8 dark:bg-yellow-200 dark:text-yellow-600 dark:hover:bg-yellow-300 md:hidden"
              onClick={() => setListToggle(false)}
            >
              <span className="sr-only">Close</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Sidebar List */}
          {sidebarItems.map((sidebarItem, index) => (
            <div key={index}>
              <hr className="my-4 md:min-w-full border-yellow-300" />
              <h6 className="md:min-w-full text-slate-900 text-xs capitalize font-bold block pt-1 pb-4">
                {sidebarItem.title}
              </h6>
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                {sidebarItem.links.map((listItem, i) => (
                  <li
                    className="items-center px-4 rounded border border-transparent hover:bg-yellow-50 hover:border-yellow-300 group"
                    key={i}
                  >
                    <Link
                      to={`${listItem.to ? listItem.to: '#'}`}
                      className="text-xs py-3 font-bold block text-slate-800 group-hover:text-slate-900"
                    >
                      <i
                        className={`${listItem.icon} mr-2 text-sm opacity-75 group-hover:text-slate-900`}
                      ></i>
                      {listItem.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <hr className="my-4 md:min-w-full border-yellow-300" />
          {/* Close Session */}
          <a
            href="#"
            className="text-slate-800 text-sm block mb-4 px-4 py-2 font-bold rounded border border-transparent hover:bg-yellow-50 hover:border-yellow-300"
            onClick={() => signOut()}
          >
            <i className="bx bx-log-out mr-2 text-slate-800 group-hover:text-slate-500 text-xl relative top-1"></i>
            Cerrar Sesion
          </a>
        </div>
      </div>
    </div>
  )
}
