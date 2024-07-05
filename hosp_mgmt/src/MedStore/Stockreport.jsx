import React from 'react'
import { useEffect, useState } from 'react'

export default function StockRep(){
  let index1 = 0,index2 = 0;
  const [data1,setData1] = useState();
  const [data2, setData2] = useState();  

  useEffect(()=>{
    async function fetchData(){
      const response = await fetch('http://localhost:3000/medstore_Stockrep', {
        method: 'POST',
        body: JSON.stringify({'send': true}),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
      const lst = await response.json();
      setData1(lst.data.filter((ele) => {return ele.Qty >= ele.Threshold}));
      setData2(lst.data.filter((ele) => {return ele.Qty < ele.Threshold}));
    }
    fetchData();
  },[]);

  return (
    <div className="flex flex-col space-y-5">
      <h2 className="text-center text-red-700 font-Nunito font-bold">Stock Report with Threshold</h2>
      <div className="flex flex-col space-y-3">
        <p className="row-span-1 text-red-700 text-base text-center  font-Nunito w-full">Medicines suffiently available</p>
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-0 py-3">
                    S/l No.
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Medicine/Aid Code
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Medicine/Aid Name
                  </th>
                  <th scope="col" className="px-8 py-3">
                    Type
                  </th>
                  <th scope="col" className="px-8 py-3">
                    Marketed by
                  </th>
                <th scope="col" className="px-5 py-3">
                  Company Code
                </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-5 py-3">
                    Threshold qty
                  </th>
                </tr>
            </thead>
            <tbody className='text-black font-Nunito'>
              {data1 && data1.map((i) => {
                return (
                  <tr key={i._id}>
                    <td scope="col" className="px-0 py-3">{index1 += 1}</td>
                    <td scope="col" className="px-3 py-3">{i.medicine_code}</td>
                    <td scope="col" className="px-5 py-3">{i.name}</td>
                    <td scope="col" className="px-8 py-3">{i.type}</td>
                    <td scope="col" className="px-8 py-3">{i.company}</td>
                    <td scope="col" className="px-5 py-3">{i.company_code}</td>
                    <td scope="col" className="px-6 py-3">{i.Qty}</td>
                    <td scope="col" className="px-5 py-3">{i.Threshold}</td>
                  </tr>
                )
              })
              }
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-span-1 flex flex-col space-y-3">
        <p className="row-span-1 text-center text-red-700 font-Nunito w-full">Medicines for which requistion is to be applied</p>
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-0 py-3">
                  S.No.
                </th>
                <th scope="col" className="px-3 py-3">
                  Medicine/Aid Code
                </th>
                <th scope="col" className="px-5 py-3">
                  Medicine/Aid Name
                </th>
                <th scope="col" className="px-8 py-3">
                  Type
                </th>
                <th scope="col" className="px-8 py-3">
                  Marketed by
                </th>
                <th scope="col" className="px-5 py-3">
                  Company Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-5 py-3">
                  Threshold qty
                </th>
              </tr>
            </thead>
            <tbody className='text-black font-Nunito'>
              {data2 && data2.map((i) => {
                return (
                  <tr key={i._id}>
                    <td scope="col" className="px-0 py-3">{index2 += 1}</td>
                    <td scope="col" className="px-3 py-3">{i.medicine_code}</td>
                    <td scope="col" className="px-5 py-3">{i.name}</td>
                    <td scope="col" className="px-8 py-3">{i.type}</td>
                    <td scope="col" className="px-8 py-3">{i.company}</td>
                    <td scope="col" className="px-5 py-3">{i.company_code}</td>
                    <td scope="col" className="px-6 py-3">{i.Qty}</td>
                    <td scope="col" className="px-5 py-3">{i.Threshold}</td>
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


