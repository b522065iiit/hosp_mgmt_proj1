import React, { useState, useEffect } from 'react'

function MedicineIssue() {

  let encounterID = window.sessionStorage.getItem('id');
  window.sessionStorage.removeItem('id');
  let PresPrint = window.sessionStorage.getItem('PP');
  window.sessionStorage.removeItem('PP');
  const [prescriptionDetails, setPrescriptionDetails] = useState([]);
  const [showPres, setShowPres] = useState(false);
  const [patient, setPatient] = useState({});
  const [showIssueBtn, setShowIssueBtn] = useState(false);

  function ValidateEncID(encid) {// check the validity of encounterid
    let today = new Date();
    encid = encid.slice(4, 8) + "-" + encid.slice(2, 4) + "-" + encid.slice(0, 2);// yyyy-mm-dd
    let encDate = new Date(encid);
    // console.log(encDate);
    let timediff = today.getTime() - encDate.getTime();
    let daydiff = timediff / (1000 * 60 * 60 * 24);
    // console.log(daydiff);
    return daydiff < 5;
  }
  async function fetchPrescription() {
    await fetch("http://localhost:3000/fetchPres", {
      method: 'POST',
      body: JSON.stringify({ encid: encounterID }),
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
        setPrescriptionDetails(data.pres);
        setPatient(data.pat_det);
        setShowPres(true);
        PresPrint === 'true' ? setShowIssueBtn(false): setShowIssueBtn(true);
      }).catch((error) => { console.log(error); });
  }
  const Prescription = (e) => {
    e.preventDefault();
    if (!ValidateEncID(encounterID)) {
      return alert('Encounter ID invalid or expired');
    }

    fetchPrescription();
  };

  // at refresh, to generate the issued prescription slip
  useEffect(() => {
    if (encounterID) {
      fetchPrescription();
    }
  }, []);

  async function IssueMeds() {
    setShowIssueBtn(false);
    await fetch("http://localhost:3000/IssuePres", {
      method: 'POST',
      body: JSON.stringify({ emp_id: patient.emp_id, date: patient.encdt }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    }).then((res) => res.json())
      .then((data) => {
        if (data.stat) {
          return alert("Something went wrong");
        }
        // if issued successfully
        window.sessionStorage.setItem('id', data.encid);
        window.sessionStorage.setItem('PP', true);
        alert('Available medicines issued successfully');
        return window.location.reload();
      }).catch((error) => { console.log(error); return alert("Something went wrong"); })
  }

  return (
    <div>
      {/* <img src="./src/Common/assets/bcg_med2.jpg" className="absolute w-full h-screen object-fit -z-10" alt="..." /> */}
      {!showPres && <div className=' flex justify-center'>
        <div className='flex justify-center px-10'>
          <div className="container  mx-auto p-4">
            <div className="border border-gray-300 rounded-lg p-4 mb-8" style={{ width: '10cm' }}>
              <form onSubmit={Prescription} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Registration Number</label>
                  <input
                    type="text"
                    onChange={(e) => encounterID = e.target.value}
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
      </div>}

      {showPres && <div>
          <h2 className="text-2xl font-medium text-center mb-4">Prescription Issue</h2>
          <div className='p-4 items-center'>
            <ul className='grid grid-flow-col min-w-max'>
              <li className='col-span-1 border-black'>Patient Name:</li>
              <li className='col-span-1 border-black'>{patient.name}</li>
              <li className='col-span-1 border-black'>Patient ID:</li>
              <li className='col-span-1 border-black'>{patient.emp_id}</li>
              <li className='col-span-1 border-black'>Visit ID:</li>
              <li className='col-span-1 border-black'>{encounterID}</li>
              <li className='col-span-1 border-black'>Date:</li>
              <li className='col-span-1 border-black'>{patient.encdt}</li>
              <li className='col-span-1 border-black'>Patient Age:</li>
              <li className='col-span-1 border-black'>{patient.age} years</li>
            </ul>
          </div>
          <div className='p-4'>
            <table className="table-auto min-w-full border bg-white">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Sl.No</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Medicine</th>
                  <th className="border px-4 py-2">Order Qty</th>
                  <th className="border px-4 py-2">Issued Qty</th>
                  <th className="border px-4 py-2">Frequency</th>
                  <th className="border px-4 py-2">Duration</th>
                  <th className="border px-4 py-2">Instruction</th>
                  <th className="border px-4 py-2">Repeat</th>
                  <th className="border px-4 py-2">Prescribed Doctor Name </th>
                </tr>
              </thead>
              <tbody>
                {prescriptionDetails && prescriptionDetails.map((medicine, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{medicine.date}</td>
                    <td className="border px-4 py-2">{medicine.Medicine}</td>
                    <td className="border px-4 py-2">{medicine.order_qty}</td>
                    <td className="border px-4 py-2">{medicine.Issue || 'N/A'}</td>
                    <td className="border px-4 py-2">{medicine.frequency}</td>
                    <td className="border px-4 py-2">{medicine.duration || ' - '}</td>
                    <td className="border px-4 py-2">{medicine.Instruction}</td>
                    <td className="border px-4 py-2">{medicine.Repeat}</td>
                    <td className="border px-4 py-2">{medicine.Doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        {!showIssueBtn && <div className='flex-row p-3'>
          <h2 className='font-bold'>Prescription note: </h2>
          <p id="note">You are authorized to purchase the drugs which are marked as 'N/A' upto the ordered quantity from MedStore. Else you can also come later to dispensary and purchase if the medicine stock has been updated.</p>
        </div>}
        {showIssueBtn && <div className='grid p-3 place-content-center'>
          <button
            onClick={() => IssueMeds()}
            className="bg-blue-700 text-white p-1 rounded max-w-36"
          >
            Issue Medicines
          </button>
        </div>}
        <div className='grid grid-flow-col gap-x-14 py-5 place-content-center'>
          <button
            onClick={() => { }}
            className="bg-red-500 text-white p-1.5 rounded max-w-24"
          >
            Print
          </button>
          <button
            onClick={() => setShowPres(false)}
            className="bg-red-500 text-white p-1.5 rounded max-w-24"
          >
            Close
          </button>
        </div>
      </div>
      }
    </div>
  )
}

export default MedicineIssue
