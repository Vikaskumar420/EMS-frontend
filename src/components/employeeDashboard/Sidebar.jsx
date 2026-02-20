import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaCalendarAlt, FaCogs, FaMoneyBillWave, FaTachometerAlt, FaUser, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'
const Sidebar = () => {

    const { user } = useAuth()
    

    return (
        <div className='bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64'>
            <div className='bg-teal-600 h-12 flex items-center justify-center'>
                <h3 className='text-3xl italic text-center font-bold font-sevillana text-shadow-2xs text-shadow-black'>Employee MS</h3>
            </div>
            <div className='px-4'>
                <NavLink
                    to="/employee-dashboard"
                    className={({ isActive }) =>
                        `${isActive ? "bg-teal-500" : " "
                        } flex items-center space-x-4 px-4 py-2.5 rounded `}
                    end
                >
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </NavLink>
                <NavLink
                    to={`/employee-dashboard/profile/${user._id}`}
                    className={({ isActive }) =>
                        `${isActive ? "bg-teal-500" : " "
                        } flex items-center space-x-4 px-4 py-2.5 rounded `}
                    end
                >
                    <FaUsers />
                    <span>My Profile</span>
                </NavLink>

                <NavLink
                    to={`/employee-dashboard/leaves/${user._id}`}
                    className={({ isActive }) =>
                        `${isActive ? "bg-teal-500" : " "
                        } flex items-center space-x-4 px-4 py-2.5 rounded `}
                >
                    <FaCalendarAlt />
                    <span>Leaves</span>
                </NavLink>
                <NavLink
                    to={`/employee-dashboard/salary/${user._id}`}
                    className={({ isActive }) =>
                        `${isActive ? "bg-teal-500" : " "
                        } flex items-center space-x-4 px-4 py-2.5 rounded `}
                    end
                >
                    <FaMoneyBillWave />
                    <span>Salary</span>
                </NavLink>
                <NavLink
                    to="/employee-dashboard/setting"
                    className={({ isActive }) =>
                        `${isActive ? "bg-teal-500" : " "
                        } flex items-center space-x-4 px-4 py-2.5 rounded `}
                >
                    <FaCogs />
                    <span>Setting</span>
                </NavLink>
            </div>
        </div >
    )
}

export default Sidebar
