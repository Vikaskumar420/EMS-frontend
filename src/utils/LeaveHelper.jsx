import { useNavigate } from "react-router-dom";



export const columns = [
    {
        name: "S No",
        selector: (row) => row.sno,
        width: '70px',
        center: true,
    },
    
    {
        name: "Emp ID",
        selector: (row) => row.employeeId,
        width: '120px',
        center: true,
    },
    {
        name: "Name",
        selector: (row) => row.name,
        width: '120px',
        center: true,
    },
    {
        name: "Leave Type",
        selector: (row) => row.leaveType,
        width: '140px',
        center: true,
    },
    {
        name: "Department",
        selector: (row) => row.dept_name,
        width: '120px',
        center: true,
    },
    {
        name: "Days",
        selector: (row) => row.days,
        width: '70px',
        center: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        width: '120px',
        center: true,
    },
    {
        name: "Action",
        selector: (row) => row.action,
        center: true,
    },
];

export const LeaveButton = ({ Id }) => {
    const navigate = useNavigate();

    const handleView = (id)=>{
        navigate(`/admin-dashboard/leaves/${id}`);
    }

    return (
        <div>
            <button
                className="px-5 py-1 bg-teal-500  text-white shadow-lg rounded-md hover:bg-teal-700"
                onClick={() => handleView(Id)}
            >
                View
            </button>

        </div>
    )
}