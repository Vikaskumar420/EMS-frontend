import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const { id } = useParams()
    const [department, setDepartment] = useState([])
    const [deptLoading, setDeptLoading] = useState(false)
    const navigate= useNavigate()

    useEffect(() => {

        const fetchDepartments = async () => {
            setDeptLoading(true)
            try {
                const response = await axios.get(`http://localhost:3000/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (response.data.success) {
                    setDepartment(response.data.department)
                }
            }
            catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error || "Something went wrong")
                }
            } finally {
                setDeptLoading(false)
            }
        };
        fetchDepartments();
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}`,
                 department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.data.success) {
                navigate("/admin-dashboard/departments")
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data)
            }
        }
    }

    return (
        <>{deptLoading ? <div>Loading...</div> :
            <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
                <h2 className='text-2xl font-bold mb-6'>Edit Department</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="dept_name"
                            className='font-medium text-sm text-gray-700'
                        >
                            Department Name
                        </label>
                        <input
                            onChange={handleChange}
                            type="text"
                            required
                            value={department.dept_name || ""}
                            name='dept_name'
                            placeholder='Enter Dept Name'
                            className='mt-1 w-full p-2 border border-gray-300 rounded'
                        />
                    </div>
                    <div className='mt-3'>
                        <label
                            htmlFor="description"
                            className='block text-sm font-medium text-gray-700'
                        >
                            Description
                        </label>
                        <textarea
                            onChange={handleChange}
                            value={department.description || ""}
                            name="description"
                            placeholder='Description'
                            className='mt-1 p-2 w-full block  border border-gray-300 rounded'
                            rows="4"
                        ></textarea>
                    </div>
                    <button
                        type='submit'
                        className='w-full bg-teal-600 mt-6 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded '
                    >
                        Edit Department
                    </button>
                </form>
            </div>
        }</>
    )
}

export default EditDepartment
