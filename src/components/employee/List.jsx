import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns, EmployeeButton } from '../../utils/EmployeeHelper'
import DataTable from 'react-data-table-component'
import axios from 'axios'

const List = () => {

  const [employees, setEmployees] = useState([])
  const [emploading, setEmpLoading] = useState(false)
  const [filteredEmployees, setFilteredEmployees] = useState([])



  useEffect(() => {

    const fetchEmployees = async () => {
      setEmpLoading(true)
      try {
        const response = await axios.get("https://ems-server-bnxh.onrender.com/api/employee", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        // console.log(response.data);
        // console.log(response.data.employees);
          const fallbackImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeJTV8m0GWJQy9CxYQpyaS7sLU6bcjDsow0A&s";

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => (
            {
              _id: emp?._id || "N/A",
              sno: sno++,
              dept_name: emp?.department?.dept_name || "N/A",
              name: emp?.userId?.name || "N/A",
              dob: new Date(emp?.dob).toLocaleDateString() || "N/A",
              profileImage: <img
                className='rounded-full w-12 h-12 object-cover'
                src={emp?.userId?.profileImage
                  ? emp?.userId?.profileImage
                  : fallbackImage}
                alt={emp?.userId?.name || "Profile"}
              />,
              action: (<EmployeeButton Id={emp?._id || "N/A"} />)

            }
          ))
          setEmployees(data)
          setFilteredEmployees(data)

        }
      }
      catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setEmpLoading(false)
      }
    };
    fetchEmployees();
  }, [])

  const handleFilter = (e) => {
    const records = employees.filter((emp) => (
      emp.name.toLowerCase().includes(e.target.value.toLowerCase())
    ));
    setFilteredEmployees(records);
  }




  return (
    <div className='p-6'>
      <div className='text-center'>
        <h3 className='text-2xl font-bold'
        >
          Manage Employees
        </h3>
      </div>
      <div className='flex justify-between items-center '>
        <input
          onChange={handleFilter}
          type="text"
          placeholder='Search By emp name'
          className='px-4 py-0.5 bg-white rounded-lg border' />

        <Link to="/admin-dashboard/add-employee"
          className='px-4 py-1 bg-teal-600 rounded-lg text-white hover:bg-teal-700'
        >
          Add New Employee
        </Link>
      </div>
      <div className='mt-6'>
        <DataTable columns={columns} data={filteredEmployees} pagination />
      </div>
    </div>
  )
}

export default List
