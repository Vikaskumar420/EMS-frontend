import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import { columns, LeaveButton } from '../../utils/LeaveHelper'

const List = () => {

  const[leaves, setLeaves] = useState([])
  const[filteredLeaves, setFilteredLeaves] = useState([])

  const fetchLeaves = async ()=>{
    try {
        const response = await axios.get(
          "https://ems-server-bnxh.onrender.com/api/leave",
           {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          let sno = 1;
          const data = response.data.leaves.map((leave) => (
            {
              _id: leave._id,
              sno: sno++,
              employeeId:leave.employeeId?.employeeId,
              dept_name: leave.department?.dept_name,
              name: leave.userId?.name,
              leaveType:leave.leaveType,
              days:
                new Date(leave.endDate).getDate()-
                new Date(leave.startDate).getDate(),
                status:leave.status,
              action: (<LeaveButton Id={leave._id} />)

            }
          ))
          setLeaves(data);
          setFilteredLeaves(data)

        }
      }
      catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } 
  }

useEffect(()=>{

   fetchLeaves()

},[]);

const filterByInput = (e)=>{
   const data = leaves.filter((leave)=>
    leave.employeeId
   .toLowerCase()
   .includes(e.target.value.toLowerCase())
  );
  setFilteredLeaves(data);
};

const filterByButton = (status)=>{
  const data = leaves.filter((leave)=>
    leave.status
   .toLowerCase()
   .includes(status.toLowerCase())
  );
  setFilteredLeaves(data);
}

  return (
    <>
    {filteredLeaves ?(
    <div className='py-6 px-10'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'
        >
          Manage Leaves
        </h3>
      </div>
      <div className='flex justify-between items-center mb-3 '>
        <input
          type="text"
          placeholder='Search By emp Id'
          className='px-4 py-0.5 bg-white rounded-lg border'
          onChange={filterByInput}

        />

        <div className='space-x-3 '>
          <button className='px-2 py-1 text-white bg-teal-600 hover:bg-teal-700 rounded-md'
          onClick={()=>filterByButton("Pending")}
          >Pending</button>
        <button className='px-2 py-1 text-white bg-teal-600 hover:bg-teal-700 rounded-md'
        onClick={()=>filterByButton("Approved")}
        >Approved</button>
        <button className='px-2 py-1 text-white bg-teal-600 hover:bg-teal-700 rounded-md'
        onClick={()=>filterByButton("Rejected")}
        >Rejected</button>
        </div>
      </div>

      <div className='mt-3'>
        <DataTable columns={columns} data={filteredLeaves} pagination />
      </div>
    </div>
    ):<div>Lodding...</div>}
    </>
  )
}

export default List
