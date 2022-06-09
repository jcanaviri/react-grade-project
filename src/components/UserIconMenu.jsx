export const UserIconMenu = ({ floatingStyles, email, signOut }) => {
  return (
    <div
      className="block bg-white border text-base z-50 float-left list-none text-left rounded shadow-lg min-w-48"
      style={floatingStyles}
    >
      <a
        href="#"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700"
      >
        {email}
      </a>
      <a
        href="#"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50"
      >
        Another action
      </a>
      <a
        href="#"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50"
      >
        Something else here
      </a>
      <hr className="md:min-w-full border-yellow-300" />
      <a
        href="#"
        className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700 hover:bg-yellow-50 pb-4"
        onClick={() => signOut()}
      >
        <i className="bx bx-log-out mr-2 text-xl relative top-1"></i>
        Cerrar Session
      </a>
    </div>
  )
}
