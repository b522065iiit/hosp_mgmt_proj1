import React, { useState, useEffect } from 'react';


export default function Pathology() {
    const [employees, setEmployees] = useState([]);
    const tests = [
        'Complete Blood Count',
        'Liver Function Test',
        'Kidney Function Test',
        'Blood Sugar',
        'Lipid Profile',
        'Thyroid Function Test',
        'Urine Analysis',
        'Stool Analysis',
        'Electrolyte Panel',
        'Calcium Test'];

    useEffect(() => {
        async function fetchDocData() {
            await fetch("http://localhost:3000/emp_det", {
                method: 'POST',
                body: JSON.stringify({ 'send': 'pathologists' }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    setEmployees(data);
                })
        }
        fetchDocData();
    }, []);


    return (
        <div className="container mx-auto p-4">
            <h2 className="row-span-1 text-6xl text-center text-teal-500 font-bold">PATHOLOGISTS</h2><br />
            <table className="min-w-full bg-white mx-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Sl.No.</th>
                        <th className="py-2 px-4 border-b">Employee ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{employee.emp_id}</td>
                            <td className="py-2 px-4 border-b">{employee.name}</td>
                            <td className="py-2 px-4 border-b">{employee.designation}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <h3 className="row-span-1  text-5xl text-center text-teal-500 font-bold">Tests conducted in our pathology</h3><br />
            <table className="min-w-max bg-white mx-auto">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Sl.No.</th>
                        <th className="py-2 px-4 border-b">Test Name</th>
                    </tr>
                </thead>
                <tbody>
                    {tests.map((test, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border-b">{index + 1}</td>
                            <td className="py-2 px-4 border-b">{test}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    );
}
