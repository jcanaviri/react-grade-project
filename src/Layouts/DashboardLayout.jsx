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
      </div>
    </>
  )
}
