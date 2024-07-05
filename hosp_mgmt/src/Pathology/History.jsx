import React, { useEffect, useState } from 'react'

const History = () => {
  
  const [data1, setData1] = useState([]);
  useEffect(() => {
    async function fetchPendingReq() {
      await fetch('http://localhost:3000/fetchTest', {
        method: 'POST',
        body: JSON.stringify({ 'send': 'testRes' }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      }).then((res) => res.json())
        .then((data) => setData1(data));
    }
    fetchPendingReq();
  }, []);
  return (
    <div className="flex flex-col space-y-5"> {/*  inset-0 bg-white h-screen bg-opacity-50 */}
      {/* <img src="./src/Common/assets/img-20.jpg" className="absolute w-full h-screen object-fit -z-10" alt="..." /> */}
      <h2 className="text-center text-green-700 font-Nunito font-bold">History page</h2>
      <div className="flex flex-col space-y-3">
        <div className="row-span-1 mx-auto relative overflow-x-auto">
          <table className="w-cover text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-base text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-0 py-3">
                  S/l No.
                </th>
                <th scope="col" className="px-3 py-3">
                  Date
                </th>
                <th scope="col" className="px-3 py-3">
                  Patient_ID
                </th>
                <th scope="col" className="px-5 py-3">
                  Test
                </th>
                <th scope="col" className="px-8 py-3">
                  Instruction
                </th>
                <th scope="col" className="px-5 py-3">
                  Sample_no
                </th>
                <th scope="col" className="px-8 py-3">
                  Test_result
                </th>
              </tr>
            </thead>
            <tbody>
              {data1 && data1.map((i, index) => {
                return (
                  <tr key={index}>
                    <td scope="col" className="px-0 py-3">{index += 1}</td>
                    <td scope="col" className="px-3 py-3">{i.date}</td>
                    <td scope="col" className="px-3 py-3">{i.emp_id}</td>
                    <td scope="col" className="px-5 py-3">{i.Test}</td>
                    <td scope="col" className="px-8 py-3">{i.Instruction}</td>
                    <td scope="col" className="px-8 py-3">{i.sampleno}</td>
                    <td scope="col" className="px-5 py-3">{i.Test_result}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  )
}

export default History
