import { Outlet } from 'react-router-dom'

// Components
import { SideBar } from '../components/SideBar'
import { Pannel } from '../components/Pannel'

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
