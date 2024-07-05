import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
// import { isLoggedIn } from './NavBar'

function ProtectedRoute(){
    const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");
    const user = window.sessionStorage.getItem("usernm");
    if(isLoggedIn === 'true'){
        document.getElementById('title').innerHTML = `Welcome, ${user}!`;
    }
    return isLoggedIn === 'true' ? <Outlet /> : <Navigate to = "/" />; 
}

export default ProtectedRoute;