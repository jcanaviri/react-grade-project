import { Outlet } from 'react-router-dom'

// Components
import { SideBar, Pannel } from '../components'

export const DashboardLayout = () => {
  return (
    <>
      {/* Left sidebar */}
      <SideBar />

      {/* Menu Panel */}
      <Pannel />

      <div className="relative md:ml-64">
        <Outlet />
        {/* Footer */}
        <footer className="fixed bottom-0 left-0 md:ml-64 right-0 bg-gray-200 text-center lg:text-left">
          <div className="text-slate-800 text-center p-2 text-sm">
            © 2022 Todos los derechos estan reservados -
            <a className="text-slate-800 ml-2" href="">
              jcanaviri20@gmail.com
            </a>
          </div>
        </footer>
        {/* Footer */}
      </div>
    </>
  )
}
