import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {useAuth} from '../../context/AuthContext'
import axios from 'axios'
const MyLeaves = () => {

  const [leaves, setLeaves] = useState([]);
  const {id} = useParams();
  

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`https://ems-server-bnxh.onrender.com/api/leave/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      
      
      if (response.data.success) {
        setLeaves(response.data.leave);
      }

    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    
      fetchLeaves();
    
  }, []);

  const {user} = useAuth();

  return (
    <div>
      <div className='p-6'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold mb-5'
          >
            Manage Leaves
          </h3>
        </div>

        {user?.role === "employee" && (
  <div className='flex justify-end items-center mb-5 '>
    

    <Link
      to="/employee-dashboard/add-leave"
      className='px-4 py-1 bg-teal-600 rounded-lg text-white hover:bg-teal-700'
    >
      Add New Leave
    </Link>
  </div>
)}


        {/* List of Leaves */}
        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200 '>
            <tr>
              <th className='px-6 py-3'>SNO</th>
              <th className='px-6 py-3'>LeaveType</th>
              <th className='px-6 py-3'>From</th>
              <th className='px-6 py-3'>To</th>
              <th className='px-6 py-3'>reason</th>
              <th className='px-6 py-3'>status</th>

            </tr>
          </thead>
          <tbody>
            {leaves.length > 0 ? (
              leaves.map((leave, index) => (
                <tr
                  key={leave._id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <td className='px-6 py-3'>{index + 1}</td>
                  <td className='px-6 py-3'>{leave.leaveType}</td>
                  <td className='px-6 py-3'>
                    {new Date(leave.startDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-3'>
                    {new Date(leave.endDate).toLocaleDateString()}
                  </td>
                  <td className='px-6 py-3'>{leave.reason}</td>
                  <td className='px-6 py-3'>{leave.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No leaves found
                </td>
              </tr>
            )}
          </tbody>

        </table>

      </div>
    </div>
  )
}

export default MyLeaves
