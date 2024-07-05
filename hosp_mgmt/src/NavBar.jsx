import React from 'react'
import './App.css'
import { NavLink } from 'react-router-dom'

// export let isLoggedIn="";
// export let userType="";
// export let userid = "";

const NavBar = ({ isLoggedIn, userType }) => {
    function logout() {
        window.sessionStorage.clear();
        // window.sessionStorage.removeItem('isLoggedIn');
        // window.sessionStorage.removeItem('userType');
        // window.sessionStorage.removeItem('user');
        window.location.reload();// reload the page to successfully logout
        return alert("logged out sucessfully");
    }
    return (
        <div className='relative'>
            <nav className='flex flex-row grow w-full z-100 justify-between mx-auto p-4 bg-white'>
            <ul className="flex flex-row space-x-4 content-start items-center">
                <li className="rounded object-cover">
                    <img src="./src/Common/assets/Screenshot_2024-06-15_152924-removebg-preview.png" className='object-left' style={{ width: "5cm" }}></img>
                </li>
                {/* <li className='font-medium text-2xl'>Care</li> */}
            </ul>
            <ul className="nav-list flex flex-row justify-end gap-7 items-center">
                {
                    isLoggedIn && userType === 'medstore' ? (
                        <>
                            <li className='py-2 px-3 text-gray-900 font-medium hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                                <NavLink to="/StockRep" aria-current="page" >Stock Report</NavLink>
                            </li>
                            <li className='py-2 px-3 text-gray-900 font-medium hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                                <NavLink to="/RequisitionApproval" >Requisition Approval</NavLink>
                            </li>
                            <li className='py-2 px-3 text-gray-900 font-medium hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                                <NavLink to="/MISrep" >MIS Report</NavLink>
                            </li>
                            {/* <li className="grid-rows-1">
                                <input className="min-w-80 h-9 col-span-1 rounded-lg outline-1 bg-slate-100 text-start font-medium" type='text' name='search' placeholder='search Medstore' />
                                <BiSearchAlt className='float-right rounded-lg size-7 bg-white' />
                            </li> */}
                        </>
                    ) : isLoggedIn && userType === 'dispensary' ? (
                        <>
                            <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                                <NavLink to="/MedicineIssue" >Medicine Issue</NavLink>
                            </li>
                            <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                                <NavLink to="/Requisition" >Requisition</NavLink>
                            </li>
                            <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                                <NavLink to="/DispHistory" >History</NavLink>
                            </li>

                        </>
                    ) : isLoggedIn && userType === 'SuperAdmin' ? (
                        <>
                            <li>
                                <NavLink to="/Emp_Details" aria-current="page" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Employees</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Doctor_Details" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Doctors</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Dispensary" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Dispensary</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Med_Store" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Med Store</NavLink>
                            </li>
                            <li>
                                <NavLink to="/Pathology" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Pathology</NavLink>
                            </li>
                        </>
                    ) : isLoggedIn && userType === 'pathologist' ? (
                        <>
                            <li>
                                <NavLink to="/pathreport" aria-current="page" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Tests</NavLink>
                            </li>
                            <li>
                                <NavLink to="/History" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>History</NavLink>
                            </li>
                        </>
                    ) : isLoggedIn && userType === 'asst. pathologist' ? (
                        <>
                            <li>
                                <NavLink to="/samplecollect" aria-current="page" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>Sample collection</NavLink>
                            </li>
                            <li>
                                <NavLink to="/History" className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>History</NavLink>
                            </li>
                        </>
                    ) : isLoggedIn && userType === 'doctor' && (<>
                        <li className='py-2 px-3 text-gray-900 font-medium hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                            <NavLink to="/Diagnosis" aria-current="page" >Diagnosis</NavLink>
                        </li>
                        <li className='py-2 px-3 text-gray-900 font-medium hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                            <NavLink to="/DHistory" >History</NavLink>
                        </li>
                    </>)
                }
                <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                    <NavLink to="/about" >About Care+</NavLink>
                </li>
                {
                    isLoggedIn === 'true' ? (
                        <>
                            <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                                <NavLink to="/" >You</NavLink>
                            </li>
                            <li className='py-2 px-3 text-white bg-red-500 border rounded-lg font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                                <button className='p-2' onClick={logout} >Log out</button>
                            </li>
                        </>
                    ) : (
                        <li className='py-2 px-3 text-black font-medium md:p-0 dark:text-white hover:cursor-pointer'>
                            <NavLink to="/login" >Login</NavLink>
                        </li>
                    )
                }

            </ul>
        </nav>
        </div>
    )
}

export default NavBar;
