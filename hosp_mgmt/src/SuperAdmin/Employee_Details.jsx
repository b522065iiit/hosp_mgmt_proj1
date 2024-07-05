import React, { useState, useEffect } from 'react';

export default function Employee_Details() {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState('');
  const [updatedEmp, setUpdatedEmp] = useState({});
  const [newEmployee, setNewEmployee] = useState({
    emp_id: '', name: '', designation: '', date_of_birth: '', age: '', gender: '', address: '', email: '', phone: ''
  });
  // const userid = window.sessionStorage.getItem('user');

  useEffect(() => {// add initial employees
    async function fetchEmpData(){
    await fetch("http://localhost:3000/emp_det", {
      method: 'POST',
      body: JSON.stringify({'send':true}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data);
        setUpdatedEmp(data);
      })
    }
    fetchEmpData();
  },[]);

  const calculateAge = (date_of_birth) => {
    const birthDate = new Date(date_of_birth);
    const difference = Date.now() - birthDate.getTime();
    const ageDate = new Date(difference);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  // Adding new employee details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'date_of_birth') {
      const age = calculateAge(value);
      setNewEmployee({ ...newEmployee, date_of_birth: value, age: age.toString() });
    } else {
      setNewEmployee({ ...newEmployee, [name]: value });
    }
  };

  function dd_mm_yyyy(dt){
    return (dt.slice(8,10) + "/" + dt.slice(5,7)+ "/" + dt.slice(0,4));
  }
  const addEmployee = () => {
    if(!(newEmployee.emp_id && newEmployee.email)){
      return alert("Employee ID and email are MUST for new entries");
    }
    if(newEmployee.date_of_birth){
      newEmployee.date_of_birth = dd_mm_yyyy(newEmployee.date_of_birth);
    }
    async function addNewEmp() {
      await fetch("http://localhost:3000/add_emp", {
        method: 'POST',
        body: JSON.stringify(newEmployee),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((new_emp) => {
          if(new_emp.added === true){
            setNewEmployee({ emp_id: '', name: '', designation: '',
               date_of_birth: '', age: '', address: '', 
               email: '', phone: '' });
            window.location.reload();
          }
          else if(new_emp.added === null){
            alert('duplicate employee id or email.');
          }
          else{alert('Something went wrong.');}
          return window.location.reload();
        })
    }
    addNewEmp();
  };

  // deleting an existing employee
  const deleteEmployee = (emp_id) => {
    async function delEmp() {
      await fetch("http://localhost:3000/del_emp", {
        method: 'POST',
        body: JSON.stringify({emp_id: emp_id}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((del_emp) => {
          if (del_emp === false) {
            alert('Something went wrong.');
          }
          return window.location.reload();
        })
    }
    delEmp();
  };

  // editing an existing employee details
  const editEmployee = (emp_id) => {
    setIsEditing(emp_id);
  };


  const handleEditChange = (e, emp_id) => {
    const { name, value } = e.target;
    setUpdatedEmp(updatedEmp.map((emp) => {
      if (emp.emp_id === emp_id) {
        if (name === 'date_of_birth') {
          const age = calculateAge(value);
          return { ...emp, date_of_birth: value, age: age.toString() };
        }
        else {
          return { ...emp, [name]: value };
        }
      }
    })
  );
    // setEmployees(updatedEmployees);
  };

  // updating existing details
  async function updateEmp(){
    await fetch("http://localhost:3000/update_emp", {
      method: 'POST',
      body: JSON.stringify(updatedEmp),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => {res.json()})
      .then((result) => { if(!result.updated){alert('No update done.');} return window.location.reload(); })
  }
  const saveEdit = (emp_id) => {
    // e.preventDefault();
    for(let i in employees){
      if (i.emp_id === emp_id){
        setUpdatedEmp(i);
        break;
      }
    }
    if (updatedEmp){
      updateEmp();
    }
    // setIsEditing(null);
    
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="row-span-1 text-6xl text-center text-teal-500 font-bold">EMPLOYEE DETAILS</h2>
      <h1 className="text-2xl font-bold mb-4">Employee Table</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Designation</th>
            <th className="py-2 px-4 border-b">DOB</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Gender</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.emp_id}>
              {isEditing === employee.emp_id ? (
                <>
                  <td className="py-2 px-4 border-b"><input type="text" name="emp_id" value={employee.emp_id} readOnly className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="text" name="name" value={employee.name} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="text" name="designation" value={employee.designation} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="date" name="date_of_birth" value={employee.date_of_birth} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="number" name="age" value={employee.age} readOnly className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="radio" name="gender" value='male' onChange={(e) => handleEditChange(e, employee.emp_id)} /><label>M  </label><input type="radio" name="gender" value='female' onChange={(e) => handleEditChange(e, employee.emp_id)} /><label>F</label></td>
                  <td className="py-2 px-4 border-b"><input type="text" name="address" value={employee.address} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="email" name="email" value={employee.email} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b"><input type="tel" name="phone" minLength='10' value={employee.phone} onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full" /></td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => saveEdit(employee.emp_id)} className="bg-green-500 text-white py-1 px-2 rounded">Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{employee.emp_id}</td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b">{employee.designation}</td>
                  <td className="py-2 px-4 border-b">{employee.date_of_birth}</td>
                  <td className="py-2 px-4 border-b">{employee.age}</td>
                  <td className="py-2 px-4 border-b">{employee.gender}</td>
                  <td className="py-2 px-4 border-b">{employee.address}</td>
                  <td className="py-2 px-4 border-b">{employee.email}</td>
                  <td className="py-2 px-4 border-b">{employee.phone}</td>
                  <td className="py-2 px-4 border-b">
                    {/* <button onClick={() => editEmployee(employee.emp_id)} className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button> */}
                    <button onClick={() => deleteEmployee(employee.emp_id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <td className="py-2 px-4 border-b"><input type="text" name="emp_id" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="text" name="name" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="text" name="designation" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="date" name="date_of_birth" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="number" name="age" value={newEmployee.age} readOnly className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="radio" name="gender" onChange={handleInputChange} value='male' /><label>M  </label><input type="radio" name="gender" onChange={handleInputChange} value='female' /><label>F</label></td>
            <td className="py-2 px-4 border-b"><input type="text" name="address" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="email" name="email" onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b"><input type="tel" name="phone" min='1000000000' onChange={handleInputChange} className="w-full" /></td>
            <td className="py-2 px-4 border-b">
              <button onClick={addEmployee} className="bg-green-500 text-white py-1 px-2 rounded">Add</button>
          </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}