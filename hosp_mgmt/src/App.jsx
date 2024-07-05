import React from 'react'
import NavBar from './NavBar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// imports for Common routes
import LoginPage from './LoginPage'
import AAbout from './Common/about/AAbout'
import Register from './Common/Register'
import ForgotPassword from './Common/ForgotPassword'

// imports for protected routes
import ProtectedRoute from './ProtectedRoute'
import You from './LoggedIn/You'
// SuperAdmin
import Employee_Details from './SuperAdmin/Employee_Details'
import Doctor_Details from './SuperAdmin/Doctor_Details'
import Pathology from './SuperAdmin/Pathology'
import Med_Store from './SuperAdmin/Med_Store'
import Dispensary from './SuperAdmin/Dispensary'
// Doctor
import Diagnosis from './Doctor/Diagnosis'
import DHistory from './Doctor/History'
// MedStore
import StockRep from './MedStore/Stockreport'
import RequisitionApproval from './MedStore/RequisitionApproval'
import MISrep from './MedStore/MISreport'
// Dispensary
import MedicineIssue from './Dispensary/MedicineIssue'
import Requisition from './Dispensary/Requisition'
import DispHistory from './Dispensary/DispHistory'
// Pathology
import History from './Pathology/History'
import PathologyReportForm from './Pathology/PathMaster'
import SampleCollect from './Pathology/SampleCollect'
// Login status
// let isLoggedIn = false;
const isLoggedIn = window.sessionStorage.getItem('isLoggedIn');
const userType = window.sessionStorage.getItem('userType');
function App() {
    return (
        <Router>
            <NavBar isLoggedIn={isLoggedIn} userType={userType} />
            <Routes>
                {/* Common routes */}
                {!isLoggedIn && (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/about" element={<AAbout />} />
                        <Route path="/" element={<AAbout />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                    </>
                )
                }
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="login" element={<Navigate to="/" />} />
                    <Route path="register" element={<Navigate to="/" />} />
                    <Route path="/about" element={<AAbout />} />
                    <Route path="/" element={<You />} />
                    {userType === 'doctor' ?
                        (<>
                            <Route path="/Diagnosis" element={<Diagnosis />} />
                            <Route path="/DHistory" element={<DHistory />} />
                        </>
                        ) : userType === 'dispensary' ?
                            (<>
                                <Route path="/MedicineIssue" element={<MedicineIssue />} />
                                <Route path="/Requisition" element={<Requisition />} />
                                <Route path="/DispHistory" element={<DispHistory />} />
                            </>) : userType === 'SuperAdmin' ?
                                (<>
                                    <Route path="/Emp_Details" element={<Employee_Details />} />
                                    <Route path="/Doctor_Details" element={<Doctor_Details />} />
                                    <Route path="/Pathology" element={<Pathology />} />
                                    <Route path="/Dispensary" element={<Dispensary />} />
                                    <Route path="/Med_Store" element={<Med_Store />} />
                                </>) : userType === 'medstore' ?
                                    (<>
                                        <Route path="/StockRep" element={<StockRep />} />
                                        <Route path="/RequisitionApproval" element={<RequisitionApproval />} />
                                        <Route path="/MISrep" element={<MISrep />} />
                                    </>
                                    ) : userType === 'pathologist' ?
                                        (<>
                                            <Route path="/pathreport" element={<PathologyReportForm />} />
                                            <Route path="/History" element={<History />} />
                                        </>) : userType === 'asst. pathologist' &&
                                        (<>
                                            <Route path="/samplecollect" element={<SampleCollect />} />
                                            <Route path="/History" element={<History />} />
                                        </>)
                    }
                </Route>
                {/* If any wrong url passed */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    )
}

export default App;