import { Link } from 'react-router-dom'

export const UserIconMenu = ({ floatingStyles, email, signOut }) => {
  return (
    <div
      className="block bg-white border text-base z-50 float-left list-none text-left rounded shadow-lg min-w-48"
      style={floatingStyles}
    >
      <p
        className="text-sm text-slate-500 py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent"
      >
        {email}
      </p>
      <Link
        to="/dashboard/profile"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50"
      >
        <i className="bx bx-user mr-2 text-xl relative top-1"></i>
        Mi Perfil
      </Link>
      <a
        href="#"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50"
      >
        <i className="bx bx-slider-alt mr-2 text-xl relative top-1"></i>
        Ajustes
      </a>
      <hr className="md:min-w-full border-yellow-300" />
      <p
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50 pb-4"
        onClick={() => signOut()}
      >
        <i className="bx bx-log-out mr-2 text-xl relative top-1"></i>
        Cerrar Session
      </p>
    </div>
  )
}
