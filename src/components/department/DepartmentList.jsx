import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'
import { columns, DepartmentButton } from '../../utils/DepartmentHelper'
import axios from 'axios'
import API from '../../api/api'

const DepartmentList = () => {

  const [departments, setDepartments] = useState([])
  const [deptLoading, setDeptLoading] = useState(false)
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const onDepartmentDelete =  () => {
    fetchDepartments()
  };

  const fetchDepartments = async () => {
      setDeptLoading(true)
      try {
        const response = await axios.get("http://localhost:3000/api/department", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.data.success) {
          let sno = 1;
          const data = await response.data.departments.map((dept) => (
            {
              _id: dept._id,
              sno: sno++,
              dept_name: dept.dept_name,
              action: (<DepartmentButton _id={dept._id} onDepartmentDelete={onDepartmentDelete} />)

            }
          ))
          setDepartments(data)
          setFilteredDepartments(data)

        }
      }
      catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error)
        }
      } finally {
        setDeptLoading(false)
      }
    };

  useEffect(() => {

    
    fetchDepartments();
  }, [])

  const filterDepartments = (e) => {
    const records = departments.filter((dept) =>
      dept.dept_name.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredDepartments(records)
  }

  return (
    <>{deptLoading ? <div>Lodeing...</div> :
      <div className='p-5'>
        <div className='text-center'>
          <h3 className='text-2xl font-bold'
          >
            Manage Departments
          </h3>
        </div>
        <div className='flex justify-between items-center'>
          <input type="text"
            onChange={filterDepartments}
            placeholder='Search By Department'
            className='px-4 py-0.5 bg-white rounded-lg border' />
          <Link to="/admin-dashboard/add-department"
            className='px-4 py-1 bg-teal-600 rounded-lg text-white hover:bg-teal-700'
          >
            Add New Department
          </Link>
        </div>
        <div className='mt-5'>
          <DataTable
            columns={columns}
            data={filteredDepartments}
            pagination
          />
        </div>
      </div>
    }</>
  )
}

export default DepartmentList
