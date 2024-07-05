import React, { useEffect, useState } from 'react'
import Registration from './Registration'

export default function You() {
  
  const [user, setUser] = useState({});
  const [medicineHist, setMedicineHist] = useState([]);
  const [testHist, setTestHist] = useState([]);

  function titleCase() {
    let s = user.designation.slice(0,1).toUpperCase() + user.designation.slice(1,);
    return s;
  }
  useEffect(() => {
    const userid = window.sessionStorage.getItem('user');
    async function fetchUserData() {
      await fetch("http://localhost:3000/you", {
        method: 'POST',
        body: JSON.stringify({ id: userid }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          "Access-Control-Allow-Origin": "*"
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setUser(data.patdata);
          setMedicineHist(data.medHist);
          setTestHist(data.testHist);
        }).catch((error) => { console.log(error); alert('Something went wrong.'); })
    }
    fetchUserData();

  }, []);
  const avatar = 'https://via.placeholder.com/150';
  return (
    <div>
      {/* <img src="./src/Common/assets/img-18.jpg" className="absolute w-full h-screen object-fit -z-10" alt="..." /> */}

      {/* <div className="inset-0 bg-white h-screen bg-opacity-50"> */}
        <div className='py-8'>
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
            <div className="flex items-center space-x-6 mb-4">
              <img className="w-32 h-32 rounded-full" src={avatar} alt={user.name} />
              <div>
                <h2 className="text-3xl font-bold">{user.name}</h2>
                <h3 className="text-xl text-gray-800">ID:{user.emp_id}</h3>
                <h3 className="text-xl text-gray-800">{user.designation}</h3>
                {user.designation === 'doctor' ? 
                  <h3 className="text-xl text-gray-800">Specialist in {user.specialization}</h3>
                  : <p></p>
                }
              </div>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold mb-2">Bio</h4>
              <p className="text-gray-700">Age: {user.age}</p>
              <p className="text-gray-700">Date of Birth: {user.date_of_birth}</p>
              <p className="text-gray-700">Address: {user.address}</p>
            </div>
            <div className="mb-4">
              <h4 className="text-2xl font-bold mb-2">Contact Information</h4>
              <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-700"><strong>Phone:</strong> {user.phone}</p>
            </div>
          </div>
        </div>
        <div>
          <Registration />
        </div>
        <div className='p-6'>
          <div className="col-span-1 flex flex-col space-y-3">
            <h1 className="text-2xl font-bold text-center mb-6">Medical Visit History</h1>
            <h3 className="text-2xl font-bold text-center mb-4">Medicines Issued</h3>
            <div className="row-span-1 mx-auto relative overflow-x-auto">
              <table className="w-cover text-base text-left rtl:text-right text-black dark:text-gray-200">
                <thead className="text-base text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S/l Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Medicine
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Order Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Issue Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Frequency
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instruction
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Prescribed Doctor Name
                      </th>
                    </tr>
                </thead>
                <tbody>
                  {medicineHist && medicineHist.map((medicine, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
                      <td className="border px-4 py-2">{medicine.date}</td>
                      <td className="border px-4 py-2">{medicine.Medicine}</td>
                      <td className="border px-4 py-2">{medicine.order_qty}</td>
                      <td className="border px-4 py-2">{medicine.Issue || 'N/A'}</td>
                      <td className="border px-4 py-2">{medicine.frequency}</td>
                      <td className="border px-4 py-2">{medicine.duration || ' - '}</td>
                      <td className="border px-4 py-2">{medicine.Instruction}</td>
                      <td className="border px-4 py-2">{medicine.Doctor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4">Tests Conducted</h3>
            <div className="row-span-1 mx-auto relative overflow-x-auto">
              <table className="w-cover text-base text-left rtl:text-right text-black dark:text-gray-200">
                <thead className="text-base text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S/l Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Test
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Instruction
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Test Result
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Doctor
                      </th>
                    </tr>
                </thead>
                <tbody>
                  {testHist && testHist.map((test, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{index + 1}</td>
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
          </div>
        </div>

    </div>
  )
}

// const [formData, setFormData] = useState({
//   patientName: '',
//   dob: '',
//   allergies: [],
//   medications: [],
//   numberOfTests: '',
//   pastSurgeries: '',
//   doctorVisits: [],
// });

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value,
//   });
// };

// const handleAddField = (field) => {
//   setFormData({
//     ...formData,
//     [field]: [...formData[field], ''],
//   });
// };

// const handleFieldChange = (e, index, field) => {
//   const newFieldData = [...formData[field]];
//   newFieldData[index] = e.target.value;
//   setFormData({
//     ...formData,
//     [field]: newFieldData,
//   });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   console.log(formData);
// };

{/* <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Patient Medical History</h1>
        <form onSubmit={handleSubmit}>

          <div>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">Any of the below diseases</h3>
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="vue-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="vue-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Thyroid</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="react-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="react-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Asthama</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="angular-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="angular-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Diabetes</label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="laravel-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="laravel-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Cancer</label>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Allergies:</label>
            {formData.allergies.map((allergy, index) => (
              <input
                key={index}
                type="text"
                value={allergy}
                onChange={(e) => handleFieldChange(e, index, 'allergies')}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddField('allergies')}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Allergy
            </button>
          </div>

          <div>
            <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">Heart Disease</h3>
            <ul className="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="vue-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="vue-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Heart Attack</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="react-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="react-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Stent</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="angular-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="angular-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pacemaker</label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input id="laravel-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                  <label htmlFor="laravel-checkbox" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">None</label>
                </div>
              </li>
            </ul>
          </div>

          <div className="mb-4 p-2">
            <label className="block text-gray-700">Current Medications:</label>
            {formData.medications.map((medication, index) => (
              <input
                key={index}
                type="text"
                value={medication}
                onChange={(e) => handleFieldChange(e, index, 'medications')}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddField('medications')}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Medication
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Number of Tests Performed:</label>
            <input
              type="number"
              name="numberOfTests"
              value={formData.numberOfTests}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Past Surgeries:</label>
            <textarea
              name="pastSurgeries"
              value={formData.pastSurgeries}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Specific Doctor Visits:</label>
            {formData.doctorVisits.map((visit, index) => (
              <input
                key={index}
                type="text"
                value={visit}
                onChange={(e) => handleFieldChange(e, index, 'doctorVisits')}
                className="w-full px-3 py-2 mb-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              />
            ))}
            <button
              type="button"
              onClick={() => handleAddField('doctorVisits')}
              className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Add Doctor Visit
            </button>
          </div>

          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Submit
          </button>
        </form>
      </div> */}