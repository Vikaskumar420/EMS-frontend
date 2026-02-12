import React from 'react'
import SummaryCard from './SummaryCard'
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaMoneyBillWave, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const AdminSummary = () => {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  const fetchDashboardData = async (req, res) => {
    try {
      const response = await axios.get('https://ems-server-bnxh.onrender.com/api/adminDashboard/summaryData', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(response.data);

      if (response.data.success) {
        setDashboard(response.data.data)
      }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  }

  useEffect(() => {
    fetchDashboardData();

  }, [])

  if (!dashboard) return <p>Loading...</p>

  return (
    <div className='p-6'>
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>

      <div 
      className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-6 '>
        <div 
        className='cursor-pointer'
        onClick={()=>navigate('/admin-dashboard/employees')}>
        <SummaryCard icon={<FaUsers />}
          text="Total Employees"
          number={dashboard.totalEmployees}
          color="bg-teal-600"
        />
        </div>
        <div
        className='cursor-pointer'
         onClick={()=>navigate('/admin-dashboard/departments')}>
        <SummaryCard icon={<FaBuilding />}
          text="Total Department"
          number={dashboard.totalDepartments}
          color="bg-yellow-600"
        />
        </div>
        <div>
        <SummaryCard icon={<FaMoneyBillWave />}
          text="Total Salary"
          number={`₹ ${dashboard.totalSalary}`}
          color="bg-red-600"
        />
        </div>
      </div>

      <div className='mt-12'>
        <h4 className='text-2xl text-center font-bold'>Leave Details</h4>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-6'>
          <div 
          className='cursor-pointer'
          onClick={()=> navigate('/admin-dashboard/leaves')}>
            <SummaryCard icon={<FaFileAlt />}
            text="Leave Applied"
            number={dashboard.leaveApplied}
            color="bg-teal-600"
          />
          </div>
          <SummaryCard icon={<FaCheckCircle />}
            text="Leave Approved"
            number={dashboard.leaveApproved}
            color="bg-green-600"
          />
          <SummaryCard icon={<FaHourglassHalf />}
            text="Leave Pending"
            number={dashboard.leavePending}
            color="bg-yellow-600"
          />
          <SummaryCard icon={<FaTimesCircle />}
            text="Leave Rejected"
            number={dashboard.leaveRejected}
            color="bg-red-600"
          />
        </div>
      </div>
    </div>
  )
}

export default AdminSummary
