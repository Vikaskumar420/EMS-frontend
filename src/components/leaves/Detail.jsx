import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Detail = () => {

  const { id } = useParams()
  const navigate = useNavigate();
  const [leave, setLeave] = useState(null)
  const [leaveLoading, setLeaveLoading] = useState(false)


  useEffect(() => {

    const fetchLeave = async () => {
      setLeaveLoading(true)

      try {
        const response = await axios.get(`https://ems-server-bnxh.onrender.com/api/leave/detail/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.data.success) {


          setLeave(response.data.leave)

        }
      }
      catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setLeaveLoading(false)
      }
    };
    fetchLeave();
  }, [id])

  const changeStatus = async (id, status) => {
    try {
      const response = await axios.put(`https://ems-server-bnxh.onrender.com/api/leave/${id}`, { status }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });


      if (response.data.success) {

        // alert(`Leave: ${response.data.status}`);
        navigate('/admin-dashboard/leaves');

      }
    }
    catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error)
      }
    }
  }
  return (
    <>
      {leaveLoading ? (
        <div className="text-center mt-10">Loading...</div>
      ) : leave ? (
        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md shadow-black'>
          <h2 className='text-2xl font-bold mb-8 text-center'>
            Leave Details
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div >
              <img
                src={leave?.employeeId?.userId?.profileImage || 'N/A'}
                className='rounded-md border w-60 h-79 object-cover transition-all duration-300 hover:shadow-lg  hover:shadow-black hover:border-black'
              />
            </div>
            <div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Name</p>
                <p className='font-medium'>{leave?.employeeId?.userId?.name || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Employee ID</p>
                <p className='font-medium'>{leave?.employeeId?.employeeId || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Department</p>
                <p className='font-medium'>{leave?.employeeId?.department?.dept_name || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>LeaveType</p>
                <p className='font-medium'>{leave?.leaveType || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Reason</p>
                <p className='font-medium'>{leave?.reason || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>Start Date</p>
                <p className='font-medium'>{new Date(leave?.startDate).toLocaleDateString() || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>End Date</p>
                <p className='font-medium'>{new Date(leave?.endDate).toLocaleDateString() || 'N/A'}</p>
              </div>
              <div className='flex space-x-3 mb-5'>
                <p className='text-lg font-bold'>{leave.status === "Pending" ? "Action" : "Status"}</p>
                {leave.status === "Pending" ? (
                  <div className='flex space-x-2 text-white font-bold'>
                    <button className='bg-green-600 hover:bg-green-800 shadow-md hover:shadow-black py-1 px-2 rounded-md'
                      onClick={() => changeStatus(leave._id, "Approved")}
                    >Approve</button>
                    <button className='bg-red-600 hover:bg-red-800 shadow-md hover:shadow-black py-1 px-4 rounded-md'
                      onClick={() => changeStatus(leave._id, "Rejected")}
                    >Reject</button>
                  </div>
                ) :
                  <p className='font-medium'>{leave?.status || 'N/A'}</p>
                }
              </div>

            </div>
          </div>
        </div>
      ) : <div className=' flex justify-center  mt-52'>Employee not found!</div>}</>
  )

}

export default Detail
