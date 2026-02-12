import { Outlet } from "react-router-dom"
import AdminSidebar from "../components/dashboard/AdminSidebar"
import Navbar from "../components/dashboard/Navbar"


const AdminDashboard = () => {

  
  
  return (
    <div className="flex">
       <AdminSidebar />
       <div className="flex-1 h-12 ml-64 bg-gray-100 ">
        <Navbar />
        <Outlet />
       </div>
    </div>
  )
}

export default AdminDashboard
