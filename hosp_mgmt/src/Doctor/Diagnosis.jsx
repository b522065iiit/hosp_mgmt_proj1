import React, { useState } from 'react'

export default function Diagnosis() {
  const pres_Abbv = [
    { "abbreviation": "ac", "meaning": "before meals" },
    { "abbreviation": "ad lib", "meaning": "as desired" },
    { "abbreviation": "am", "meaning": "morning" },
    { "abbreviation": "bid", "meaning": "twice a day" },
    { "abbreviation": "cap", "meaning": "capsule" },
    { "abbreviation": "d/c", "meaning": "discontinue" },
    { "abbreviation": "dil", "meaning": "dilute" },
    { "abbreviation": "gtt", "meaning": "drop" },
    { "abbreviation": "h", "meaning": "hour" },
    { "abbreviation": "hs", "meaning": "at bedtime" },
    { "abbreviation": "IM", "meaning": "intramuscular" },
    { "abbreviation": "IV", "meaning": "intravenous" },
    { "abbreviation": "mcg", "meaning": "microgram" },
    { "abbreviation": "mg", "meaning": "milligram" },
    { "abbreviation": "mL", "meaning": "milliliter" },
    { "abbreviation": "npo", "meaning": "nothing by mouth" },
    { "abbreviation": "od", "meaning": "once a day" },
    { "abbreviation": "pc", "meaning": "after meals" },
    { "abbreviation": "po", "meaning": "by mouth" },
    { "abbreviation": "prn", "meaning": "as needed" },
    { "abbreviation": "qid", "meaning": "four times a day" },
    { "abbreviation": "q2h", "meaning": "every 2 hours" },
    { "abbreviation": "q4h", "meaning": "every 4 hours" },
    { "abbreviation": "q6h", "meaning": "every 6 hours" },
    { "abbreviation": "q8h", "meaning": "every 8 hours" },
    { "abbreviation": "qam", "meaning": "every morning" },
    { "abbreviation": "qhs", "meaning": "every night at bedtime" },
    { "abbreviation": "qn", "meaning": "every night" },
    { "abbreviation": "qs", "meaning": "quantity sufficient" },
    { "abbreviation": "Rx", "meaning": "prescription" },
    { "abbreviation": "SC", "meaning": "subcutaneous" },
    { "abbreviation": "sig", "meaning": "write on label" },
    { "abbreviation": "sl", "meaning": "sublingual" },
    { "abbreviation": "stat", "meaning": "immediately" },
    { "abbreviation": "supp", "meaning": "suppository" },
    { "abbreviation": "susp", "meaning": "suspension" },
    { "abbreviation": "tab", "meaning": "tablet" },
    { "abbreviation": "tid", "meaning": "three times a day" },
    { "abbreviation": "tsp", "meaning": "teaspoon" },
    { "abbreviation": "tbsp", "meaning": "tablespoon" },
    { "abbreviation": "ud", "meaning": "as directed" },
    { "abbreviation": "ung", "meaning": "ointment" },
    { "abbreviation": "ut dict", "meaning": "as directed" },
    { "abbreviation": "w", "meaning": "with" },
    { "abbreviation": "wk", "meaning": "week" },
    { "abbreviation": "yr", "meaning": "year" },
    { "abbreviation": "aq", "meaning": "water" },
    { "abbreviation": "bpm", "meaning": "beats per minute" },
    { "abbreviation": "BM", "meaning": "bowel movement" }
  ];

  const you = window.sessionStorage.getItem('user');
  const [patient, setPatient] = useState({});
  const [patientid, setPatientid] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [medHist, setMedHist] = useState([]);
  const [testHist, setTestHist] = useState([]);
  const [prescription, setPrescription] = useState({
    medPres: [],
    testPres: []
  });



  const [medicines, setMedicines] = useState([]);
  const [newMedicine, setNewMedicine] = useState({});
  const [repeatMedicines, setRepeatMedicines] = useState([]);

  const [tests, setTests] = useState([]);
  const [newTest, setNewTest] = useState({});
  const avatar = 'https://via.placeholder.com/150';

  // encounterid functions
  function ddmmyyyy(encdt) {// check the validity of encounterid
    let today = new Date();
    today = today.toLocaleDateString();
    let today_ddmmyyyy = today.slice(0, 2) + today.slice(3, 5) + today.slice(6, 10);
    return today_ddmmyyyy === encdt.slice(0, 8);
  }
  function encounter(e) {
    e.preventDefault();
    if (!patientid) { return alert('enter a valid encounter id'); }
    if (!ddmmyyyy(patientid)) {
      alert('INVALID Encounter ID');
      return window.location.reload();
    }
    // if encounterid valid, then...
    // setPatientid(patientid);
    // window.sessionStorage.setItem('id', patientid.encounterid);
    async function fetchUserData() {
      await fetch("http://localhost:3000/checkenc", {
        method: 'POST',
        body: JSON.stringify({ encid: patientid }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.invalid) {
            alert('INVALID Encounter ID');
            return window.location.reload();
          }
          // if encid valid, then
          setPatient(data.patdata);
          setMedHist(data.medHist);
          setTestHist(data.testHist);
          setRepeatMeds(data.medHist);
          setShowPanel(true);
        })
        .catch((error) => { console.log(error); alert('Something went wrong'); })
    }
    fetchUserData();
  }

  function handleEncid(e) {
    e.preventDefault();
    setPatientid(e.target.value);
  }

  // Prescription issue functions
  const handleAddField = (field) => {
    setPrescription({
      ...prescription,
      [field]: [...prescription[field], {}]
    });
  };

  const handleDeleteField = (index, field) => {
    const values = [...prescription[field]];
    values.splice(index, 1);
    setPrescription({
      ...prescription,
      [field]: values
    });
  };

  const handleMultiInputChange = (e, index, field) => {
    const values = [...prescription[field]];
    values[index][e.target.name] = e.target.value;
    setPrescription({
      ...prescription,
      [field]: values
    });
  }
  // from patient history to new prescription: repeat medicines
  const setRepeatMeds = (medList) => {
    let repeat = [];
    medList.forEach(p => {
      if (p.Repeat === 'Yes') {
        repeat.push(p);
      }
    })
    setRepeatMedicines(repeat);
  }

  const SavePres = (e) => {
    e.preventDefault();
    console.log(prescription);
    async function uploadPres() {
      await fetch("http://localhost:3000/doc_pres", {
        method: 'POST',
        body: JSON.stringify({
          doc_id: you,
          pat_id: patient.emp_id, pat_name: patient.name,
          medicinePres: prescription.medPres, testPres: prescription.testPres
        }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      }).then((res) => res.json())
        .then((data) => {
          if (data.stat === 'success') {
            alert("Prescripton uploaded successfully");
            return window.location.reload();
          } else {
            alert('Something went wrong, try again');
          }
        })
    }
    uploadPres();
  }



  return (
    <div>

      {!showPanel && <form onSubmit={encounter}>
        <div className='py-2 px-2'>
          <label htmlFor="encounterid">Encounter ID: </label>
          <input
            id="encounterid"
            name="encounterid"
            type="number"
            onChange={handleEncid}
            className='rounded-lg border-black'
          />
          <button type="submit" className=" text-black hover:bg-gradient-to-br from-green-400  border border-spacing-1 focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2 "> Submit </button>
        </div>
      </form>}
      {showPanel &&
        <div> {/* className='bg-gradient-to-b from-emerald-300 to-emerald-400' */}
          <div className='py-8'>{/*Patient biodata*/}
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
              <div className="flex items-center space-x-6 mb-4">
                <img className="w-32 h-32 rounded-full" src={avatar} alt={patient.name} />
                <div>
                  <h2 className="text-3xl font-bold">{patient.name}</h2>
                  <h3 className="text-xl text-gray-600">ID:{patient.emp_id}</h3>
                  <h3 className="text-xl text-gray-600">{patient.designation}</h3>
                </div>
              </div>
              <div className="mb-4">
                <h4 className="text-2xl font-bold mb-2">Bio</h4>
                <p className="text-gray-700">Age: {patient.age}</p>
                <p className="text-gray-700">Date of Birth: {patient.date_of_birth}</p>
                <p className="text-gray-700">Address: {patient.address}</p>
              </div>
              <div className="mb-4">
                <h4 className="text-2xl font-bold mb-2">Contact Information</h4>
                <p className="text-gray-700"><strong>Email:</strong> {patient.email}</p>
                <p className="text-gray-700"><strong>Phone:</strong> {patient.phone}</p>
              </div>
            </div>
          </div>
          <form onSubmit={SavePres}>
          <div className='flex-col px-16 place-content-center'>
            <div> {/* Patient medical history */}
              <div className="container mx-auto p-4">
                {/* <h2 className="row-span-1 text-4xl text-center text-teal-500 font-bold">Prescription Issue</h2> */}
                <h1 className="text-2xl font-bold mb-4">Medical History</h1>
                <h2 className="text-2xl font-medium mb-4">Medicines Issued</h2>
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
                    {medHist && medHist.map((medicine, index) => (
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
              <div className="container mx-auto p-4 scroll-smooth">
                <h1 className="caption-top text-2xl font-medium mb-4">Tests Performed</h1>
                <table className="table-auto min-w-max border bg-white">
                  <thead>
                    <tr>
                      <th className="border px-4 py-2">Sl.No</th>
                      <th className="border px-4 py-2">Date</th>
                      <th className="border px-4 py-2">Test Name</th>
                      <th className="border px-4 py-2">Instruction</th>
                      <th className="border px-4 py-2">Result</th>
                      <th className="border px-4 py-2">Prescribed Doctor Name </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testHist && testHist.map((test, t_ind) => (
                      <tr key={t_ind}>
                        <td className="border px-4 py-2">{t_ind + 1}</td>
                        <td className="border px-4 py-2">{test.date}</td>
                        <td className="border px-4 py-2">{test.Test}</td>
                        <td className="border px-4 py-2">{test.Instruction}</td>
                        <td className="border px-4 py-2">{test.Test_result}</td>
                        <td className="border px-4 py-2">{test.Doctor}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="container mx-auto p-4 scroll-smooth">
                <h1 className="caption-top text-2xl font-medium mb-4">Repeat medicines</h1>
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
                    {repeatMedicines && repeatMedicines.map((medicine, index) => (
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
            </div>
            {/* New Prescription */}
              <div>
                {/* Medicines */}
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Medicine Issue</h1>
                  <table className='bg-white'>
                    <thead>
                      <tr className='mb-4'>
                        <th className="border px-4 py-2">Sl.No</th>
                        <th className="border px-4 py-2">Medicine</th>
                        <th className="border px-4 py-2">Order Qty</th>
                        <th className="border px-4 py-2">Frequency</th>
                        <th className="border px-4 py-2">Duration</th>
                        <th className="border px-4 py-2">Instruction</th>
                        <th className="border px-4 py-2">Repeat</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.medPres && prescription.medPres.map((medicine, index) => (
                        <tr key={index} className='mb-4'>
                          <td className="border px-4 py-2">{index + 1}</td>
                          <td><select name="Medicine" value={medicine.Medicine} required="_" onChange={(e) => handleMultiInputChange(e, index, 'medPres')} className="border p-1 mr-1">
                            <option value="">Medicine</option>
                            <option value="Losartan">Losartan(Antihypertensive)</option>
                            <option value="Amoxicillin">Amoxicillin(Antibiotic)</option>
                            <option value="Omeprazole">Omeprazole</option>
                            <option value="Clopidogrel">Clopidogrel(Antiplatelet)</option>
                            <option value="Cetirizine">Cetirizine(Antihistamine)</option>
                            <option value="Atorvastatin">Atorvastatin(B.P.)</option>
                            <option value="Aspirin">Aspirin(Heart)</option>
                            <option value="Paracetamol">Paracetamol(Pain killer)</option>
                            <option value="Simvastatin">Simvastatin(B.P.)</option>
                            <option value="Metformin">Metformin(Sugar)</option>
                          </select>
                          </td>
                          <td>
                            <input
                              type="number"
                              name="order_qty"
                              value={medicine.order_qty}
                              required
                              placeholder="order_qty"
                              onChange={(e) => handleMultiInputChange(e, index, 'medPres')}
                              className="border p-1 mr-1"
                            />
                          </td>
                          <td>
                            <select name="frequency" required="_" value={medicine.frequency} onChange={(e) => handleMultiInputChange(e, index, 'medPres')} className="border p-1 mr-1">
                              <option value="">frequency</option>
                              {pres_Abbv && pres_Abbv.map((ele) =>
                                <option key={ele.abbreviation} value={ele.meaning}>{ele.abbreviation}</option>
                              )}
                            </select>
                          </td>
                          <td>
                            {/* <select name="duration" required="_" value={medicine.duration} onChange={(e) => handleMultiInputChange(e, index, 'medPres')} className="border p-1 mr-1">
                              <option value="">days</option>
                              <option value="1 day">days</option>
                              {true && (for(let i=1; i <= 30; i++){
                                <option value={`${i} days`}>{i} days</option>
                              })}
                            </select> */}
                            <input
                              type="text"
                              name="duration"
                              value={medicine.duration}
                              placeholder="duration"
                              onChange={(e) => handleMultiInputChange(e, index, 'medPres')}
                              className="border p-1 mr-1"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Instruction"
                              value={medicine.Instruction}
                              placeholder="instruction"
                              onChange={(e) => handleMultiInputChange(e, index, 'medPres')}
                              className="border p-1 mr-1"
                            />
                          </td>
                          <td><select name="Repeat" required="_" value={medicine.Repeat} onChange={(e) => handleMultiInputChange(e, index, 'medPres')} className="border p-1 mr-1">
                            <option value="">Repeat</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteField(index, 'medPres')}
                              className="bg-red-500 text-white p-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="border px-4 py-2">
                          <button type="button" onClick={() => handleAddField('medPres')} className="bg-blue-500 text-white p-2 rounded">Add</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Tests */}
              <div>
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold mb-4">Test</h1>
                  <table className='bg-white'>
                    <thead>
                      <tr className='mb-4'>
                        <th className="border px-4 py-2">Sl.No</th>
                        <th className="border px-4 py-2">Test</th>
                        <th className="border px-4 py-2">Instruction</th>
                        <th className="border px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.testPres && prescription.testPres.map((t, ind) => (
                        <tr key={ind} className="mb-4">
                          <td className="border px-4 py-2">{ind + 1}</td>
                          <td><select name="Test" required="_" value={t.Test} onChange={(e) => handleMultiInputChange(e, ind, 'testPres')} className="border p-1 mr-1">
                            <option value="">Test</option>
                            <option value="Complete Blood Count">Complete Blood Count</option>
                            <option value="Liver Function Test">Liver Function Test</option>
                            <option value="Kidney Function Test">Kidney Function Test</option>
                            <option value="Blood Sugar">Blood Sugar</option>
                            <option value="Lipid Profile">Lipid Profile</option>
                            <option value="Thyroid Function Test">Thyroid Function Test</option>
                            <option value="Urine Analysis">Urine Analysis</option>
                            <option value="Stool Analysis">Stool Analysis</option>
                            <option value="Electrolyte Panel">Electrolyte Panel</option>
                            <option value="Calcium Test">Calcium Test</option>
                          </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              name="Instruction"
                              value={t.Instruction}
                              placeholder="instruction"
                              onChange={(e) => handleMultiInputChange(e, ind, 'testPres')}
                              className="border p-1 mr-1"
                            />
                          </td>
                          <td className="border px-4 py-2">
                            <button
                              type="button"
                              onClick={() => handleDeleteField(ind, 'testPres')}
                              className="bg-red-500 text-white p-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="border px-4 py-2">
                          <button type="button" onClick={() => handleAddField('testPres')} className="bg-blue-500 text-white p-2 rounded">Add</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
          </div>
          <div className='p-16'>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Save</button>
          </div>
        </form>
        </div>}
    </div >
  )
}
