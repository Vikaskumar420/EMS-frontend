import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Add = () => {
    const [departments, setDepartments] = useState([])
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        const getDepartment = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartment();
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData((preData) => ({ ...preData, [name]: files[0] }))
        } else {
            setFormData((preData) => ({ ...preData, [name]: value }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formDataObj = new FormData()
        Object.keys(formData).forEach((key) => {
            formDataObj.append(key, formData[key])
        })

        try {
            const response = await axios.post(
                "https://ems-server-bnxh.onrender.com/api/employee/add",
                formDataObj, {
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
        <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-xl shadow-black'>
            <h2 className='text-2xl font-bold mb-6'>Add New Employee</h2>
            <form onSubmit={handleSubmit} >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {/* Name */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            name='name'
                            placeholder='Employee Name'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            name='email'
                            placeholder='Email'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Employee Id */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Employee ID
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            name='employeeId'
                            placeholder='Employee ID'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Date of birth */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Date of Birth
                        </label>
                        <input
                            onChange={handleChange}
                            type="date"
                            required
                            name='dob'
                            placeholder='DOB'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Gender
                        </label>
                        <select
                            onChange={handleChange}
                            name='gender'
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    {/* Marital status */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Marital Status
                        </label>
                        <select
                            onChange={handleChange}
                            name='maritalStatus'
                            placeholder="MaritalStatus"
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                        </select>
                    </div>

                    {/* Designation */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Designation
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            name='designation'
                            placeholder='Designation'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Department */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Department
                        </label>
                        <select
                        onChange={handleChange}
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

                    {/* Salary */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Salary
                        </label>
                        <input
                            onChange={handleChange}
                            type="number"
                            required
                            name='salary'
                            placeholder='Salare'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            type="password"
                            required
                            name='password'
                            placeholder='******'
                            className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className='block font-medium text-sm text-gray-700'>
                            Role
                        </label>
                        <select
                            onChange={handleChange}
                            name="role"
                            className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="employee">Employee</option>

                        </select>
                    </div>

                    {/* Image Upload */}
                    <div>
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
                    </div>

                </div>


                <button
                    type='submit'
                    className='w-full bg-teal-600 mt-6 hover:bg-teal-700 hover:text-shadow-2xs text-shadow-black hover:shadow-lg shadow-black text-white font-bold py-2 px-4 rounded '
                >
                    Add Employee
                </button>
            </form>
        </div>
    )
}

export default Add
