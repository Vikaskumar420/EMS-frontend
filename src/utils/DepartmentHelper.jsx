import { useNavigate } from "react-router-dom"
import axios from 'axios'


export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        center:true
    },
    {
        name: "Department Name",
        selector: (row) => row.dept_name,
        sortable:true,
        center:true

    },
    {
        name: "Action",
        selector: (row) => row.action,
        center:true

    }
]

export const DepartmentButton = ({ _id, onDepartmentDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const isConfirm = window.confirm("Do you want to delete?")
        if (isConfirm) {
            try {
                const response = await axios.delete(
                    `https://ems-server-bnxh.onrender.com/api/department/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                if (response.data.success) {
                    onDepartmentDelete()
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data)
                }
            }
        }
    };

    return (
        <div className="flex space-x-3">
            <button
                className="px-5 py-1 bg-teal-600 shadow-lg hover:shadow-teal-500/50  text-white rounded-full hover:bg-teal-800 hover:text-shadow-2xs text-shadow-black"
                onClick={() => navigate(`/admin-dashboard/department/${_id}`)}
            >
                Edit
            </button>
            <button
                className="px-3 py-1 bg-red-600 shadow-lg hover:shadow-red-500/50 text-white rounded-full hover:bg-red-800 hover:text-shadow-2xs text-shadow-black"
                onClick={() => handleDelete(_id)}
            >
                Delete
            </button>
        </div>
    )
}