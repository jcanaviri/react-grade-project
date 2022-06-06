import { useState } from 'react'
import { Link } from 'react-router-dom'

// Components
import { MobileMenu } from './MobileMenu'
import { MobileMenuButton } from './MobileMenuButton'

// Images
import logo from '../favicon.png'

export const Navbar = ({ linkItems }) => {
  const [toggleMenuNav, setToggleMenuNav] = useState(false)

  return (
    <div className="min-h-full sticky top-0 z-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Aplication Logo begins */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-8 w-8"
                    src={logo}
                    alt="logo"
                  />
                  <span className="text-slate-600 hover:text-slate-700 ml-2 font-medium">
                    Estimate App
                  </span>
                </Link>
              </div>
              {/* Aplication Logo ends */}

              {/* Left List of the links begins */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {linkItems.map((currLink, index) => (
                    <Link
                      to={currLink.to}
                      key={index}
                      className="text-slate-600 hover:text-slate-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      {currLink.title}
                    </Link>
                  ))}
                </div>
              </div>
              {/* Left List of the links ends */}
            </div>

            {/* Right menu */}
            <div className="hidden md:block">
              <Link
                to="/login"
                className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Ingresar
              </Link>
            </div>
            {/* Right menu */}

            {/* Mobile Button */}
            <MobileMenuButton
              toggleMenu={() => setToggleMenuNav((prevState) => !prevState)}
            />
            {/* Mobile Button */}
          </div>
        </div>

        {/* Mobile menu */}
        {toggleMenuNav && <MobileMenu linkItems={linkItems} />}
        {/* Mobile menu */}
      </nav>
    </div>
  )
}
