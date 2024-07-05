import React, { useState, useEffect } from 'react';


export default function Doctor_Details() {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [updatedDoc, setUpdatedDoc] = useState({});
  // const [newEmployee, setNewEmployee] = useState({
  //   emp_id: '', name: '', specialization: ''
  // });


  useEffect(()=>{
    async function fetchDocData() {
      await fetch("http://localhost:3000/emp_det", {
        method: 'POST',
        body: JSON.stringify({ 'send': 'doctors' }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
        })
    }
    fetchDocData();
  },[]);

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewEmployee({ ...newEmployee, [name]: value });
  // };

  const handleEditChange = (e, emp_id) => {
    const { name, value } = e.target;
    const updatedEmployees = employees.map((emp) =>
      emp.emp_id === emp_id ? { ...emp, [name]: value } : emp
    );
    setEmployees(updatedEmployees);
  };

  // const addEmployee = () => {
  //   if (newEmployee.emp_id) {
  //     setEmployees([...employees, newEmployee]);
  //     setNewEmployee({ emp_id: '', name: '', specialization: '' });
  //   }
  // };

  // const deleteEmployee = (emp_id) => {
  //   setEmployees(employees.filter((employee) => employee.emp_id !== emp_id));
  // };

  const editEmployee = (emp_id) => {
    setIsEditing(emp_id);
  };


  async function updateDoc() {
    await fetch("http://localhost:3000/update_doc", {
      method: 'POST',
      body: JSON.stringify(updatedDoc),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => res.json())
      .then((data) => { if (!data.updated) { alert('No update done.'); } return window.location.reload(); })
  }

  const saveEdit = (emp_id, spec) => {
    for (let i in employees) {
      if (i.emp_id === emp_id) {
        setUpdatedDoc({emp_id: i.emp_id,specialization: spec});
        break;
      }
    }
    if (updatedDoc) {
      updateDoc();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="row-span-1 text-6xl text-center text-teal-500 font-bold">DOCTOR DETAILS</h2><br />
      {/* <h1 className="text-2xl font-bold mb-4">Doctor's Table</h1> */}
      <table className="min-w-full bg-white mx-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sl.No.</th>
            <th className="py-2 px-4 border-b">Employee ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Specialization</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              {isEditing === employee.emp_id ? (
                <>
                  <td className="py-2 px-4 border-b">{employee.emp_id}</td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b"><input type="text" name="specialization" onChange={(e) => handleEditChange(e, employee.emp_id)} className="w-full"/></td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => saveEdit(employee.emp_id, employee.specialization)} className="bg-green-500 text-white py-1 px-2 rounded">Save</button>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-2 px-4 border-b">{employee.emp_id}</td>
                  <td className="py-2 px-4 border-b">{employee.name}</td>
                  <td className="py-2 px-4 border-b">{employee.specialization}</td>
                  <td className="py-2 px-4 border-b">
                    <button onClick={() => editEmployee(employee.emp_id)} className="bg-blue-500 text-white py-1 px-2 rounded mr-2">Edit</button>
                    {/* <button onClick={() => deleteEmployee(employee.emp_id)} className="bg-red-500 text-white py-1 px-2 rounded">Delete</button> */}
                  </td>
                </>
              )}
            </tr>
          ))}
          {/* <tr>
            <td className="py-2 px-4 border-b"><input type="text" name="emp_id" value={newEmployee.emp_id} onChange={handleInputChange} className="w-full"/></td>
            <td className="py-2 px-4 border-b"><input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} className="w-full"/></td>
            <td className="py-2 px-4 border-b"><input type="text" name="specialization" value={newEmployee.specialization} onChange={handleInputChange} className="w-full"/></td>
            <td className="py-2 px-4 border-b">
              <button onClick={addEmployee} className="bg-green-500 text-white py-1 px-2 rounded">Add</button>
            </td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}












// import React, { useState } from 'react';

// const App = () => {
//   const [employees, setEmployees] = useState([]);
//   const [newEmployee, setNewEmployee] = useState({ emp_id: '', name: '', specialization: '' });
//   const [editingIndex, setEditingIndex] = useState(-1);

//   const handleAdd = () => {
//     setEmployees([...employees, newEmployee]);
//     setNewEmployee({ emp_id: '', name: '', specialization: '' });
//   };

//   const handleEdit = (index) => {
//     setNewEmployee(employees[index]);
//     setEditingIndex(index);
//   };

//   const handleSave = () => {
//     const updatedEmployees = [...employees];
//     updatedEmployees[editingIndex] = newEmployee;
//     setEmployees(updatedEmployees);
//     setNewEmployee({ emp_id: '', name: '', specialization: '' });
//     setEditingIndex(-1);
//   };

//   const handleDelete = (index) => {
//     setEmployees(employees.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="container mx-auto p-4">
//         <h2 className= "row-span-1 text-6xl text-center text-teal-500 font-bold">DOCTOR DETAILS</h2>
//       <h1 className="text-2xl font-bold mb-4">Doctor Table</h1>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="emp_id"
//           value={newEmployee.emp_id}
//           onChange={(e) => setNewEmployee({ ...newEmployee, emp_id: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Name"
//           value={newEmployee.name}
//           onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Specialization"
//           value={newEmployee.specialization}
//           onChange={(e) => setNewEmployee({ ...newEmployee, specialization: e.target.value })}
//           className="border p-2 mr-2"
//         />
//         {editingIndex === -1 ? (
//           <button onClick={handleAdd} className="bg-blue-500 text-white p-2 rounded">Add</button>
//         ) : (
//           <button onClick={handleSave} className="bg-green-500 text-white p-2 rounded">Save</button>
//         )}
//       </div>
//       <table className="min-w-full border">
//         <thead>
//           <tr>
//             <th className="border px-4 py-2">Employee_emp_id</th>
//             <th className="border px-4 py-2">Name</th>
//             <th className="border px-4 py-2">Specialization</th>
//             <th className="border px-4 py-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">{employee.emp_id}</td>
//               <td className="border px-4 py-2">{employee.name}</td>
//               <td className="border px-4 py-2">{employee.specialization}</td>
//               <td className="border px-4 py-2">
//                 <button
//                   onClick={() => handleEdit(index)}
//                   className="bg-yellow-500 text-white p-1 rounded mr-2"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(index)}
//                   className="bg-red-500 text-white p-1 rounded"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;















