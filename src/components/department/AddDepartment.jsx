import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dept_name: '',
        description: ''
    });

    const handleChange=(e)=>{
        const {name,value}= e.target;
        setDepartment({...department, [name]:value})
    }

    const navigate = useNavigate();

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try{
            const response = await axios.post("http://localhost:3000/api/department/add", department,{
                headers:{
                    "Authorization":`Bearer ${localStorage.getItem("token")}`
                }
            });
            if(response.data.success){
                navigate("/admin-dashboard/departments")
            }
        } catch(error){
            if(error.response && !error.response.data.success){
                alert(error.response.data.error)
            }
        }
    }

    return (

        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96'>
            <h2 className='text-2xl font-bold mb-6'>Add Department</h2>
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
                    Add Department
                </button>
            </form>
        </div>

    )
}

export default AddDepartment
