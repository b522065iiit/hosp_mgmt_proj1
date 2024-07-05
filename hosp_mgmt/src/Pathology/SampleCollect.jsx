import React, { useState, useEffect } from 'react'
// import MedicineIssueForm from './Medissue'

export default function SampleCollect() {

  function ddmmyyyy(dy) {
    dy = dy.toLocaleDateString();
    let dy_ddmmyyyy = dy.slice(0, 2) + dy.slice(3, 5) + dy.slice(6, 10);
    return dy_ddmmyyyy;
  }
  let today = new Date();
  today = ddmmyyyy(today);

  const [empID, setEmpID] = useState('');
  const testcodes = {
    "Complete Blood Count": "CBC",
    "Liver Function Test": "LFT",
    "Kidney Function Test": "KFT",
    "Blood Sugar": "BS",
    "Lipid Profile": "LP",
    "Thyroid Function Test": "TFT",
    "Urine Analysis": "UA",
    "Stool Analysis": "SA",
    "Electrolyte Panel": "EP",
    "Calcium Test": "CT"
  };
  const [testDetails, setTestDetails] = useState([]);
  const [updatedTestDetails, setUpdatedTestDetails] = useState([]);
  const [showPres, setShowPres] = useState(false);
  const [patient, setPatient] = useState({});
  const [showIssueBtn, setShowIssueBtn] = useState(false);

  async function fetchTests() {
    await fetch("http://localhost:3000/fetchTest", {
      method: 'POST',
      body: JSON.stringify({ emp_id: empID, day: new Date().getDay() }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => res.json())
      .then((data) => {
        if (data.stat === 'not found') {
          return alert('INVALID Encounter ID.')
        }
        if (data.stat === 'error' || !data) {
          return alert('Something went wrong, try again')
        }
        setTestDetails(data.tests);
        setPatient(data.pat_det);
        // setShowPres(true);
        // PresPrint === 'true' ? setShowIssueBtn(false) : setShowIssueBtn(true);
      }).catch((error) => { console.log(error); });
  }

  function handleInpChange(e){
    const {name, value} = e.target;
    setEmpID(value);
  }

  function getTests(e){
    e.preventDefault();
    // if(empID.parseInt() < 70007101 || empID.parseInt() > 70007200){
    //   return alert('Invalid employee ID.');
    // }
    fetchTests();
  }
  function setSampleNo(index){
    const row = testDetails[index];
    let spno = today + testcodes[row.Test] + row.sampleno;
    row.sampleno = spno;
    setUpdatedTestDetails([...updatedTestDetails, row]);
    testDetails.splice(index, 1);
    setTestDetails(testDetails);
  }
  const SaveSampleCollection = (e) => {
    e.preventDefault();
    setSampleSerial();
  };

  // at refresh, to generate the issued prescription slip
  // useEffect(() => {
  //   if (empID) {
  //     fetchPrescription();
  //   }
  // }, []);

  async function setSampleSerial() {
    await fetch("http://localhost:3000/setTest", {
      method: 'POST',
      body: JSON.stringify({ emp_id: empID, samples: updatedTestDetails }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => res.json())
      .then((data) => {
        if (!data.stat) {
          return alert("Something went wrong");
        }
        // if set successfully
        alert('Samples collected successfully.');
      }).catch((error) => { console.log(error); 
        // return alert("Something went wrong"); 
      })
  }

  return (
      <div>        {/* <div className='inset-0 bg-white h-screen bg-opacity-50'> */}
      {/* <img src="./src/Common/assets/bcg_med2.jpg" className="absolute w-full h-screen object-fit -z-10" alt="..." /> */}
      <div className=' flex justify-center'>
        <div className='flex justify-center px-10'>
          <div className="container  mx-auto p-4">
            <div className="border border-gray-300 rounded-lg p-4 mb-8" style={{ width: '10cm' }}>
              <form onSubmit={getTests} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Employee id</label>
                  <input
                    type="text"
                    name="emp_id"
                    onChange={(e) => handleInpChange(e)}
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={SaveSampleCollection}>
      <div>
        <h2 className="text-2xl font-medium text-center mb-4">Tests</h2>
        <div className='p-4 items-center'>
          <ul className='grid grid-flow-col min-w-max'>
            <li className='col-span-1 border-black'>Patient Name:</li>
            <li className='col-span-1 border-black'>{patient.name}</li>
            <li className='col-span-1 border-black'>Patient ID:</li>
            <li className='col-span-1 border-black'>{empID}</li>
            <li className='col-span-1 border-black'>Gender:</li>
            <li className='col-span-1 border-black'>{patient.gender}</li>
            <li className='col-span-1 border-black'>Age:</li>
            <li className='col-span-1 border-black'>{patient.age} years</li>
          </ul>
        </div>
        <div className='p-4'>
          <table className="table-auto min-w-full border bg-white">
            <thead>
              <tr>
                <th className="border px-4 py-2">Sl.No</th>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Test Name</th>
                <th className="border px-4 py-2">Instruction</th>
                <th className="border px-4 py-2">Prescribed Doctor Name</th>
                <th className="border px-4 py-2">Sample No.</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {updatedTestDetails && updatedTestDetails.map((test, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{test.date}</td>
                  <td className="border px-4 py-2">{test.Test}</td>
                  <td className="border px-4 py-2">{test.Instruction}</td>
                  <td className="border px-4 py-2">{test.Doctor}</td>
                  <td className="border px-4 py-2">{test.sampleno}</td>
                </tr>
              ))}
              {testDetails && testDetails.map((test, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{test.date}</td>
                  <td className="border px-4 py-2">{test.Test}</td>
                  <td className="border px-4 py-2">{test.Instruction}</td>
                  <td className="border px-4 py-2">{test.Doctor}</td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      placeholder="sampleno"
                      name="sampleno"
                      onChange={(e) => testDetails[index].sampleno = e.target.value}
                      className="border p-1 mr-1"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      type="button"
                      onClick={() => {setSampleNo(index)}}
                      className="bg-blue-500 text-white p-1 rounded"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='py-5 px-10'>
          <button
            type="submit"
            
            className="bg-green-500 text-white p-1 rounded"
          >
            Save samples
          </button>
            </div>
        </div>
    </div>
      </form>
    </div>
  )
}

