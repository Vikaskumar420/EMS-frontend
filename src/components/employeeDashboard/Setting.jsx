import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Setting = () => {

    const { user } = useAuth();
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const [setting, setSetting] = useState({
        userId: user._id,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSetting({ ...setting, [name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault()
        if (setting.newPassword !== setting.confirmPassword) {
            setError('Password not matched')
        } else {
            try {
                const response = await axios.put(
        'https://ems-server-bnxh.onrender.com/api/setting/change-password',
        setting,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
                if (response.data.success) {
                    {user.role === "employee" ?
                    navigate(`/employee-dashboard/profile/${user._id}`)
                    :navigate(`/admin-dashboard`)
                    }
                    setError('')
                }

            } catch (error) {
                if (error.response && !error.response.data.success) {
                    setError(error.response.data.error);
                } else {
                    setError("Server Error!");
                }

            }
        }
    }

    return (

        <div className='max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-lg shadow-black w-96'>
            <h2 className='text-2xl font-bold mb-6'>Change Password</h2>
            <p className='text-red-500'>{error}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label className=' text-sm font-medium  text-gray-700'>
                        Old Password</label>
                    <input
                        type="password"
                        name='oldPassword'
                        className='w-full p-2 mt-1 border border-gray-300 rounded-md'
                        placeholder='Old Password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className=' text-sm font-medium  text-gray-700'>
                        New Password</label>
                    <input
                        type="password"
                        name='newPassword'
                        className='w-full p-2 mt-1 border border-gray-300 rounded-md'
                        placeholder='New Password'
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label className=' text-sm font-medium  text-gray-700'>
                        Confirm Password</label>
                    <input
                        type="password"
                        name='confirmPassword'
                        className='w-full p-2 mt-1 border border-gray-300 rounded-md'
                        placeholder='Confirm Password'
                        onChange={handleChange}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 hover:text-shadow-2xs text-shadow-black hover:shadow-lg shadow-black p-2 text-white font-bold py-2 px-4 rounded-md cursor-pointer'>
                    Change Password
                </button>
            </form>
        </div>

    )
}

export default Setting
