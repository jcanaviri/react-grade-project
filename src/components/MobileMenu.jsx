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
            className="text-slate-600 hover:text-slate-700  block px-3 py-2 rounded-md text-base font-medium"
          >
            {currLink.title}
          </Link>
        ))}
      </div>
      {/* Navigation Links */}

      <div className="pt-3 pb-3">
        <div className="px-2 py-2">
          <div className="block">
            <Link
              to="/login"
              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Ingresar
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
