import React, { useEffect, useState } from 'react'
import { fetchDepartments } from '../../utils/EmployeeHelper'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const [employee, setEmployee] = useState({
        name: '',
        maritalStatus: '',
        salary: '',
        designation: '',
        department: '',
        image: null

    })
    const [departments, setDepartments] = useState(null)
    // const [formData, setFormData] = useState({})
    const [empLoading, setEmpLoading] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();

    // fetch employee
    useEffect(() => {
        const fetchEmployee = async () => {
            setEmpLoading(true)

            try {
                const response = await axios.get(`https://ems-server-bnxh.onrender.com/api/employee/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {

                    const employee = response.data.employee;
                    setEmployee((pre) => ({
                        ...pre,
                        name: employee.userId.name,
                        maritalStatus: employee.maritalStatus,
                        salary: employee.salary,
                        designation: employee.designation,
                        department: employee.department
                    }))
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
        fetchEmployee();
    }, []);

    // fetch department
    useEffect(() => {
        const getDepartment = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
        }
        getDepartment();
    }, [])

    // Handle changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((preData) => ({ ...preData, [name]: value }))
    }


    // Handle submit
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const formData = new FormData();

        formData.append("name", employee.name);
        formData.append("maritalStatus", employee.maritalStatus);
        formData.append("salary", employee.salary);
        formData.append("designation", employee.designation);
        formData.append("department", employee.department);

        if (employee.image) {
            formData.append("image", employee.image);
        }

        const response = await axios.put(
            `https://ems-server-bnxh.onrender.com/api/employee/${id}`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data"
                }
            }
        );

        if (response.data.success) {
            navigate("/admin-dashboard/employees");
        }

    } catch (error) {
        if (error.response && !error.response.data.success) {
            alert(error.response.data.error);
        }
    }
};

    return (
        <>{departments && employee ? (
            <div className='max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg shadow-black'>
                <h2 className='text-2xl font-bold mb-6'>Update Employee</h2>
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
                                value={employee.name}
                                placeholder='Employee Name'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>

                        {/* Marital status */}
                        <div>
                            <label className='block font-medium text-sm text-gray-700'>
                                Marital Status
                            </label>
                            <select
                                onChange={handleChange}
                                name='maritalStatus'
                                value={employee.maritalStatus}
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
                                value={employee.designation}
                                placeholder='Designation'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
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
                                value={employee.salary}
                                placeholder='Salare'
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>
                        {/* Department */}
                        <div className='col-span-2'>
                            <label className='block font-medium text-sm text-gray-700'>
                                Department
                            </label>
                            <select
                                onChange={handleChange}
                                name="department"
                                value={employee.department}
                                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                                required
                            >
                                <option value="">Select Department</option>
                                {departments.map(dept => (
                                    <option key={dept._id} value={dept._id}>{dept.dept_name}</option>
                                ))}

                            </select>
                        </div>

                        {/* Image Upload */}
                        <div className='col-span-2'>
                            <label className='block font-medium text-sm text-gray-700'>
                                Profile Image
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setEmployee({ ...employee, image: e.target.files[0] })
                                }
                                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                            />
                        </div>

                    </div>


                    <button
                        type='submit'
                        className='w-full bg-teal-600 mt-6 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded '
                    >
                        Edit Employee
                    </button>
                </form>
            </div>
        ) : <div>Loading...</div>}</>
    );
}

export default Edit
