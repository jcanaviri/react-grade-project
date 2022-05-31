import { useState } from 'react'
import { Link } from 'react-router-dom'

import { MobileMenu } from './MobileMenu'
import { MobileMenuButton } from './MobileMenuButton'

export const Navbar = ({ linkItems }) => {
  const [toggleMenuNav, setToggleMenuNav] = useState(false)

  return (
    <div className="min-h-full sticky top-0 z-50">
      <nav className="bg-gray-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              {/* Aplication Logo begins */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                  <span className="text-gray-300 hover:text-white ml-2 font-bold">
                    Estimate
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
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
