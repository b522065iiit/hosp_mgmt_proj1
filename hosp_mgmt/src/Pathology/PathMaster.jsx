import React, { useState, useEffect } from 'react'

export default function PathologyReportForm() {

    const [data1, setData1] = useState([]);

    useEffect(() => {
        async function fetchPendingReq() {
            await fetch('http://localhost:3000/fetchTest', {
                method: 'POST',
                body: JSON.stringify({ 'send': 'test' }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((res) => res.json())
            .then((data) => setData1(data.tests));
        }
        fetchPendingReq();
    }, []);


    const handleChange = (index, value) => {
        const updatedData = [...data1];
        updatedData[index].Test_result = value;
        setData1(updatedData);
    };

    function saveResult(index) {
        async function setSampleSerial(index) {
            await fetch("http://localhost:3000/setTest", {
                method: 'POST',
                body: JSON.stringify({ save: true, samples: data1[index]}),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            }).then((res) => res.json())
            .then((data) => {
                // if(!data.saved){
                //     alert("test result couldn't be saved");
                // }
                return window.location.reload();
            })
        }
        setSampleSerial(index);
    }
  return (
    <div>
          <h2 className="text-center text-red-700 font-Nunito font-bold">Today's samples</h2>
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
                              <th scope="col" className="px-8 py-3">
                                  Actions
                              </th>
                          </tr>
                      </thead>
                      <tbody className='text-black font-Nunito'>
                          {data1 && data1.map((i, index) => (
                                  <tr key={index}>
                                      <td scope="col" className="px-0 py-3">{index + 1}</td>
                                      <td scope="col" className="px-3 py-3">{i.date}</td>
                                      <td scope="col" className="px-5 py-3">{i.Test}</td>
                                      <td scope="col" className="px-8 py-3">{i.Instruction}</td>
                                      <td scope="col" className="px-8 py-3">{i.sampleno}</td>
                                      <td scope="col" className="px-5 py-3">
                                          <input
                                              type="text"
                                              placeholder="Test_result"
                                              name="Test_result"
                                              onChange={(e) => handleChange(index,e.target.value)}
                                              className="border p-1 mr-1"
                                          />
                                      </td>
                                      <td className="border px-4 py-2">
                                          <button
                                              type="button"
                                              onClick={() => { saveResult(index) }}
                                              className="bg-blue-500 text-white p-1 rounded"
                                          >
                                              Save
                                          </button>
                                      </td>
                                  </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
    </div>
  )
}
