import React, { useState, useEffect } from 'react'


export default function DHistory() {

  const [history,setHistory] = useState([]);
  const you = window.sessionStorage.getItem('user');


  async function fetchUserData() {
    await fetch("http://localhost:3000/dhistory", {
      method: 'POST',
      body: JSON.stringify({ doc_id: you }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => setHistory(data))
  }
  
  useEffect(()=>{
    fetchUserData();
  },[])

  return (
    <div>
      {/* <img src="./src/Common/assets/img-21.jpg" className="absolute w-full h-screen object-fit -z-10" alt="..." /> */}
      <div className="col-span-1 flex flex-col space-y-3">
        <h1 className="text-2xl font-bold text-center mb-6">Diagnosis History</h1>
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/l Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Patient ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Medicine/Test Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Order Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Frequency
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Instruction
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Repeat
                  </th>
                </tr>
            </thead>
            <tbody>
              {history && history.map((i,index) => {
                return (
                  <tr key={index}>
                    <td scope="col" className="px-0 py-3">{index += 1}</td>
                    <td scope="col" className="px-3 py-3">{i.date}</td>
                    <td scope="col" className="px-5 py-3">{i.PatientID}</td>
                    <td scope="col" className="px-5 py-3">{i.Patient}</td>
                    <td scope="col" className="px-5 py-3">{i.Medicine || i.Test}</td>
                    <td scope="col" className="px-8 py-3">{i.order_qty || ' - '}</td>
                    <td scope="col" className="px-8 py-3">{i.duration || ' - '}</td>
                    <td scope="col" className="px-5 py-3">{i.frequency || ' - '}</td>
                    <td scope="col" className="px-6 py-3">{i.Instruction}</td>
                    <td scope="col" className="px-5 py-3">{i.Repeat || ' - '}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
