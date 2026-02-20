import axios from "axios";
import { useNavigate } from "react-router-dom";



export const columns = [
  {
    name: "S No",
    selector: (row) => row.sno,
    width:"70px",
    center:true
  },
  {
    name: " Name ",
    selector: (row) => row.name,
    sortable: true,
    width:"100px",
    center:true
  },
  {
    name: " Image ",
    selector: (row) => row.profileImage,
    width:"100px",
    center:true
    
  },
  {
    name: " Department ",
    selector: (row) => row.dept_name,
    width:"150px",
    center:true
    
  },
  {
    name: " DOB ",
    selector: (row) => row.dob,
    sortable:true,
    width:"150px",
    center:true
    
    
  },
  {
    name: "Action",
    selector: (row) => row.action,
    center:true
  }
]



export const fetchDepartments = async () => {
  let departments
  try {
    const response = await axios.get("https://ems-server-bnxh.onrender.com/api/department", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (response.data.success) {
      departments = response.data.departments

    }
  }
  catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return departments
};

// employees for salary form
export const getEmployees = async (id) => {
  let employees
  try {
    const response = await axios.get(`https://ems-server-bnxh.onrender.com/api/employee/department/${id}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    });
        
    if (response.data.success) {
      employees = response.data.employees
       
    }
  }
  catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error)
    }
  }
  return employees
};


export const EmployeeButton = ({ Id }) => {
  

  const navigate = useNavigate();


  return (
    <div className="flex space-x-3">
      <button
        className="px-5 w-18 py-1 bg-teal-600 text-white rounded-full hover:bg-teal-800 hover:text-shadow-2xs text-shadow-black"
        onClick={() => navigate(`/admin-dashboard/employee/${Id}`)}
      >
        View
      </button>
      <button
        className="px-5 w-18 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-800 hover:text-shadow-2xs text-shadow-black"
        onClick={()=> navigate(`/admin-dashboard/employee/edit/${Id}`)}
      >
        Edit
      </button>
      <button
        className="px-5 w-18 py-1 bg-yellow-600 text-white rounded-full hover:bg-yellow-800 hover:text-shadow-2xs text-shadow-black"
        onClick={() => navigate(`/admin-dashboard/employee/salary/${Id}`)}
      >
        Salary
      </button>
      <button
        className="px-5 w-18 py-1 bg-red-600 text-white rounded-full hover:bg-red-800 hover:text-shadow-2xs text-shadow-black "
        onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}
      >
        Leave
      </button>
    </div>
  )
}