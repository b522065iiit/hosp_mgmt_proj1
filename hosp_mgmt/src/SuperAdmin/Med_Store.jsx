import React from 'react'
import { useEffect, useState } from 'react'

export default function Med_Store() {
    const [data, setData] = useState();
    const [office, setOffice] = useState({});

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/medstore_Stockrep', {
                method: 'POST',
                body: JSON.stringify({ 'send': true, 'desg': 'medstore' }),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
            const lst = await response.json();
            setData(lst.data);
            setOffice(lst.desg);
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col space-y-5">
            <p>Current Medstore Incharge: {office.name} (ID: {office.emp_id})</p>
            <h2 className="text-center text-red-700 font-Nunito font-bold">Medicine Stock available at MedStore</h2>
            <div className="flex flex-col space-y-3">
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
                            {data && data.map((i, index) => {
                                return (
                                    <tr key={i._id}>
                                        <td scope="col" className="px-0 py-3">{index + 1}</td>
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


