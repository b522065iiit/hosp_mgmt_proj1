import React from 'react'
import { useState, useEffect } from 'react'

const RequisitionApproval = () => {

  const [data1, setData1] = useState();
  const [data2, setData2] = useState();
  useEffect(()=>{
    async function fetchPendingReq(){
    await fetch('http://localhost:3000/disp_stock', {
      method: 'POST',
      body: JSON.stringify({ 'send': 'req_app' }),// requisitions to be approved
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res)=> res.json())
    .then((data)=>{setData1(data.stock);});
    }
    fetchPendingReq();
  },[]);

  async function approveRequisition() {
    for (let i = 0; i < data1.length; i++) {
        data1[i].status = 'pending';
        await fetch("http://localhost:3000/approveRequisition", {
          method: 'POST',
          body: JSON.stringify({med_code: data1[i].medicine_code, stat: data1[i].status, req_n: data1[i].req_no}),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            "Access-Control-Allow-Origin": "*"
          }
        }).then((res) => res.json())
          .then((dta) => { 
            if(!dta.updated){return alert(`Requisition not approved for medicine with code ${dta.medicine_code}`);}
            console.log(dta); })
    }
    window.location.reload();
  }

  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-center text-green-700 font-Nunito font-bold">Requisition Approval page</h2>
      <div className="flex flex-col space-y-3">
        <p className="row-span-1 text-base text-center text-red-700 font-Nunito w-full">Pending requisitions
          <span className="px-3" /><button id="appReq" onClick={approveRequisition} className="py-1 px-2 text-white bg-red-500 rounded-lg font-medium dark:text-white">Approve</button>
        </p>
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    S/l No.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Requisition Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Medicine/Aid Code
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Medicine/Aid Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Requisition Qty.
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
            </thead>
            <tbody className='text-black font-Nunito'>
              {data1 && data1.map((i, index) => {
                return (
                  <tr key={index}>
                    <td scope="col" className="px-0 py-3">{index + 1}</td>
                    <td scope="col" className="px-3 py-3">{i.req_no}</td>
                    <td scope="col" className="px-8 py-3">{i.medicine_code}</td>
                    <td scope="col" className="px-5 py-3">{i.name}</td>
                    <td scope="col" className="px-8 py-3">{i.type}</td>
                    <td scope="col" className="px-5 py-3">{i.req_qty}</td>
                    <td scope="col" className="px-6 py-3">{i.status || 'Approve'}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-1 flex flex-col space-y-3">
        <p className="row-span-1 text-center text-green-500 font-Nunito w-full">Requisitions approved</p>
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S/l No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Requisition Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Medicine/Aid Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Medicine/Aid Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Requisition Qty.
                </th>
              </tr>
            </thead>
            <tbody>

            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default RequisitionApproval
