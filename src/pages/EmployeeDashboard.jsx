import React from 'react'
import Sidebar from '../components/employeeDashboard/Sidebar'
import {Outlet} from "react-router-dom"
import Navbar from "../components/dashboard/Navbar"
const EmployeeDashboard = () => {
  return (
    <div className="flex">
       <Sidebar />
       <div className="flex-1 h-12 ml-64 bg-gray-100 ">
        <Navbar />
        <Outlet />
       </div>
    </div>
  )
}

export default EmployeeDashboard
