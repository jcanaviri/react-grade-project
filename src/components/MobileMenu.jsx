import { Link } from 'react-router-dom'

export const MobileMenu = ({ linkItems }) => {
  return (
    <div className="md:hidden">
      {/* Navigation Links */}
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {linkItems.map((currLink, index) => (
          <Link
            to={currLink.to}
            key={index}
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            {currLink.title}
          </Link>
        ))}
      </div>
      {/* Navigation Links */}

      <div className="pt-3 pb-3 border-t border-gray-700">
        <div className="px-2 space-y-1">
          <div className="block">
            <Link
              to="/login"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
