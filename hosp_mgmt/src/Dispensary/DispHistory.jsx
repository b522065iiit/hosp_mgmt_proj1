import React, { useEffect, useState } from 'react'

export default function DispHistory() {
  const [hist, setHist] = useState([]);

  async function fetchHist(){
    const dispH = await fetch("http://localhost:3000/disp_stock", {
      method: 'POST',
      body: JSON.stringify({'send':'hist'}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    });
    const lst = dispH.json();
    setHist(lst.disp_hist);
  }

  useEffect(() => {
    fetchHist();
  },[]);
  
  return (
    <div>
       <h1 className="text-center text-2xl font-bold mt-4">Medicines Issued</h1>
      <div className="container mx-auto p-4">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Sl.No.</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Patient Name</th>
              <th className="py-2 px-4 border-b">Patient ID</th>
              <th className="py-2 px-4 border-b">Medicine</th>
              <th className="py-2 px-4 border-b">Issued Qty</th>
            </tr>
          </thead>
          <tbody>
            {hist && hist.map((row, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{row.date}</td>
                <td className="border px-4 py-2">{row.name}</td>
                <td className="border px-4 py-2">{row.emp_id}</td>
                <td className="border px-4 py-2">{row.Medicine}</td>
                <td className="border px-4 py-2">{row.Issue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
