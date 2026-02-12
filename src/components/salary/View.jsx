import React, { useEffect, useState } from 'react';
import {useParams} from"react-router-dom";
import axios from "axios";

const View = () => {

  const [salaries, setSalaries] =useState([]);
  const {id} = useParams();
  let sno = 1;


  const fetchSalaries = async ()=>{
    try {
      const response = await axios.get(`http://localhost:3000/api/salary/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      
      if(response.data.success){
        setSalaries(response.data.salary); 
      }
      
    } catch (error) {
      if(error.response && !error.response.data.success){
        alert(error.message);
      }
    }
  };

  useEffect(()=>{
    fetchSalaries();
  },[]);

  

  return (
    <>
    {salaries === 0 ? (<div>Loading...</div>) : (
      <div className='overflow-x-auto p-5'>
        <div className='text-center mb-8'>
          <h2 className='text-2xl font-bold'>Salary History</h2>
        </div>

        

        {salaries.length > 0 ? (
          <table className='w-full text-sm text-left text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200 '>
              <tr>
                <th className='px-6 py-3 text-center'>SNO</th>
                <th className='px-6 py-3 text-center'>Emp Id</th>
                <th className='px-6 py-3 text-center'>Salary</th>
                <th className='px-6 py-3 text-center'>Allowances</th>
                <th className='px-6 py-3 text-center'>Deductions</th>
                <th className='px-6 py-3 text-center'>Total</th>
                <th className='px-6 py-3 text-center'>Pay Date</th>
              </tr>
            </thead>
            <tbody>
              {salaries.map((salary)=>(
                <tr 
                  key= {salary._id}
                  className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                >
                  <td className='text-center' >{sno++}</td>
                  <td className='text-center'>{salary.employeeId.employeeId}</td>
                  <td className='text-center'>{salary.basicSalary}</td>
                  <td className='text-center'>{salary.allowances}</td>
                  <td className='text-center'>{salary.deductions}</td>
                  <td className='text-center'>{salary.netSalary}</td>
                  <td className='text-center'>{new Date(salary.payDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ): <div>No Records</div>}
      </div>
    )}
    </>
  )
};

export default View
