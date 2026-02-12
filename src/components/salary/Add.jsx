import React, { useEffect, useState } from 'react'
import { fetchDepartments, getEmployees } from '../../utils/EmployeeHelper'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import API from '../../api/api'

const Add = () => {
    const [salary, setSalary] = useState({
        employeeId: null,
        basicSalary: 0,
        deduction: 0,
        designation: 0,
        payDate: null,

    })
    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState([])
    const [empLoading, setEmpLoading] = useState(false)
    const navigate = useNavigate();
    

    
    // fetch department
    useEffect(() => {
        const getDepartment = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartment();
    }, [])

    const handleDepartment = async (e)=>{
        const emps = await getEmployees(e.target.value)
        setEmployees(emps)
    }

    // Handle changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSalary((preData) => ({ ...preData, [name]: value }))
    }


    //Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:3000/api/salary/add`,
                salary, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {

                navigate("/admin-dashboard/employees")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error)


            }
        }
    }

    return (
        <>{departments ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md'>
                <h2 className='text-2xl font-bold mb-6'>Add Salary</h2>
                <form onSubmit={handleSubmit} >
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        {/* Department */}
                        <div >
                            <label className='block font-medium text-sm text-gray-700'>
                                Department
                            </label>
                            <select
                                onChange={handleDepartment}
                                name="department"
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                                ))}

                            </select>
                        </div>
                        {/* Employee */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Employee
                            </label>
                            <select
                                onChange={handleChange}
                                name="employeeId"
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Employee</option>
                                {employees.map(emp => (
                                    <option key={emp._id} value={emp._id}>
                                        {emp.employeeId}
                                    </option>
                                ))}

                            </select>
                        </div>

                        {/* Basic salary */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Basic salary
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                required
                                name='basicSalary'
                                placeholder='Basic salary'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>

                        {/* Allowances */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Allowances
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                required
                                name='allowances'
                                placeholder='Allowances'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>

                         {/* Deductions */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Deductions
                            </label>
                            <input
                                onChange={handleChange}
                                type="number"
                                required
                                name='deductions'
                                placeholder='Deductions'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>

                        {/* Pay Date */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Pay Date
                            </label>
                            <input
                                onChange={handleChange}
                                type="date"
                                required
                                name='payDate'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>


                        {/* Image Upload */}
                        {/* <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Image Upload
                            </label>
                            <input
                                onChange={handleChange}
                                type="file"
                                required
                                name='image'
                                placeholder='Upload Image'
                                accept='image/*'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div> */}

                    </div>


                    <button
                        type='submit'
                        className='w-full bg-teal-600 mt-6 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded '
                    >
                        Add Salary
                    </button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
}

export default Add
