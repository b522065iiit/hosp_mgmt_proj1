import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function LoginPage() {
    const [form, setForm] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        form.designation === 'supadmin' ? setIsAdmin(true) : setIsAdmin(false);
    }

    const validatePassword = (password) => {
        return {
            length: password.length >= 8,
            number: /[0-9]/.test(password),
            specialCharacter: /[\!\@\#\$\%\^\&\*\(\)\-\=\+\`\~\,\.\/\<\>\?\:\;\'\"]/.test(password),
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password)
        };
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const criteria = validatePassword(form["password"]);
        const isValidPassword = criteria.length && criteria.number && criteria.specialCharacter && criteria.uppercase && criteria.lowercase;

        if (!isValidPassword) {
            setShowPasswordCriteria(true);
        } else {
            setShowPasswordCriteria(false);

            fetch("http://localhost:3000/login", {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.loggedIn) {
                        window.sessionStorage.setItem('isLoggedIn', data.loggedIn);
                        window.sessionStorage.setItem('userType', data.user);// encrypt it
                        window.sessionStorage.setItem('user', data.emp_id);
                        window.sessionStorage.setItem('usernm', data.usrname);
                        // document.getElementsByTagName('title').innerHTML = data.user+" page";// Ineffective, means won't work
                        alert("Login successful!");
                        window.location.reload();
                        return window.location.reload();// reload the page to 
                    }
                    else {
                        alert('Invalid credentials');
                        return window.location.reload();// reload the page to 
                    }

                })
            // .catch(() => {alert('Something went wrong'); window.location.reload();});
        }
    }

    return (
        <div className="w-full h-screen text-center font-semibold text-2xl bg-white bg-opacity-50">
            <img src="./src/Common/assets/bcg_common1.jpg" className="absolute block w-full h-full object-cover -z-10" alt="..." />
            <div className="flex flex-col items-center justify-center px-6 py-4 lg:pt-40">
                <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white items-center">
                            <p className='font-LoraFont text-3xl'>Welcome to Care+</p>
                        </h1>
                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div className="flex flex-row">
                                <div className='col-span-1'>
                                    <input type="radio" name="designation" required value="supadmin" onChange={handleForm} id="admin" />
                                    <label htmlFor="designation" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Super Admin</label>
                                </div>
                                <div className='col-span-1 px-7'>
                                    <input type="radio" name="designation" required value="other" onChange={handleForm} id="other" />
                                    <label htmlFor="designation" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Other</label>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="employee_id" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID<span className="required"> *</span></label>
                                <input type="number" name="emp_id" min='70007101' max='70007200' onChange={handleForm} id="employee_id" placeholder="employee_id" required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            <div className="flex flex-col relative">
                                <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Password<span className="required"> *</span></label>
                                <div className="flex">
                                    <input
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        onChange={handleForm}
                                        required
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter your password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="bg-gray-300 border border-gray-300 rounded-lg px-2 py-1 ml-2 focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <FaEye />
                                        ) : (
                                            <FaEyeSlash />
                                        )}
                                    </button>
                                </div>
                                {showPasswordCriteria && (
                                    <div className="text-xs text-gray-600 mt-1">
                                        <ul>
                                            <li style={{ color: validatePassword(form["password"]).length ? 'green' : 'red' }}>At least 8 characters</li>
                                            <li style={{ color: validatePassword(form["password"]).number ? 'green' : 'red' }}>At least 1 number</li>
                                            <li style={{ color: validatePassword(form["password"]).specialCharacter ? 'green' : 'red' }}>At least 1 special character</li>
                                            <li style={{ color: validatePassword(form["password"]).uppercase ? 'green' : 'red' }}>At least 1 uppercase</li>
                                            <li style={{ color: validatePassword(form["password"]).lowercase ? 'green' : 'red' }}>At least 1 lowercase</li>
                                        </ul>
                                    </div>
                                )}
                            </div>
                            {
                                isAdmin && (
                                    <>
                                        <label htmlFor="supkey" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Secret key<span className="required"> *</span></label>
                                        <input
                                            name="supkey"
                                            type='password'
                                            onChange={handleForm}
                                            required
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="secret key"
                                        />
                                    </>
                                )
                            }
                            <div>
                                <button type="submit" className="relative text-left inline-flex w-full justify-center gap-x-1.5 font-bold rounded-md bg-blue-900 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 focus:bg-blue-950 cursor-pointer">
                                    LOG IN
                                </button>
                            </div>
                            {/* <div className="p-2">
                                <p id="remarks" className="block mb-2 text-sm font-medium text-red-500 justify-center"></p>
                            </div> */}
                        </form>
                        <div className='flex col-span-2 place-content-between'>
                            <a href="/forgotpassword" className='flex col-span-1 text-sm text-blue-500 underline'>
                                Forgot password?
                            </a>
                            <a href="/register" className='flex col-span-1 text-sm text-blue-500 underline'>
                                Register
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}









// // LoginPage
// import React, { useState, useRef } from 'react'
// import { redirectDocument } from 'react-router-dom'

// export default function LoginPage() {
//     const [form, setForm] = useState({});
//     const inputRef = useRef(null);
//     const handleForm = (e) => {
//         // console.log(e.target.value, e.target.name)
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value
//         })
//     }
//     function validate(){
//         var pass = document.getElementById('password');
//         var pslen = document.getElementById('atl_8');
//         var num = document.getElementById('atl_1n');
//         var sp_char = document.getElementById('atl_1sc');
//         var upper = document.getElementById('atl_1u');
//         var lower = document.getElementById('atl_1l');
//         /* Check if password contains a number */
//         pass.value.match(/[0-9]/) ? num.style.color = 'green' : num.style.color = 'red';
//         /* Check if password contains a uppercase alphabet */
//         pass.value.match(/[A-Z]/) ? upper.style.color = 'green' : upper.style.color = 'red';
//         /* Check if password contains a lowerase alphabet */
//         pass.value.match(/[a-z]/) ? lower.style.color = 'green' : lower.style.color = 'red';
//         /* Check if password contains a special character */
//         pass.value.match(/[\!\@\#\$\%\^\&\*\(\)\-\=\+\`\~\,\.\/\<\>\?\:\;\'\"]/) ? sp_char.style.color = 'green' : sp_char.style.color = 'red';
//         /* Check if password is of 8 or more characters */
//         pass.value.length < 8 ? pslen.style.color = 'red' : pslen.style.color = 'green';
//     }
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (typeof form["emp_id"] === 'undefined'){
//           document.getElementById('remarks').innerHTML = "Please enter the Employee id.";
//           return null;
//         }
//         else if (typeof form["password"] === 'undefined'){
//           document.getElementById('remarks').innerHTML = "Please enter the password.";
//           return null;
//         }
//         else if (typeof form["LOGIN_AS"] === 'undefined') {
//           document.getElementById('remarks').innerHTML = "Please select your designation.";
//           return null;
//         }
//         document.getElementById('remarks').innerHTML = "";// Clear out remarks when information is already entered.
//         console.log(form);
//         // console.log(JSON.stringify(form));
//         fetch("http://localhost:8050/authenticate", {
//             method: 'POST',
//             body: JSON.stringify(form),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//                 "Access-Control-Allow-Origin": "*"
//             }
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 console.log(data);

//                 // const data = await response.json();
//                 // console.log(data);
//                 // if(data.error === 'undefined'){
//                 //   alert("Login Successful");
//                 //   window.localStorage.setItem("token",'123');
//                 //   switch(form["LOGIN_AS"]){
//                 //     case 'superadmin':
//                 //       return redirectDocument('./SuperAdmin/main');
//                 //     case 'doctor':
//                 //       return redirectDocument('./Doctor/main');
//                 //     case 'dispensary':
//                 //       return redirectDocument('./Dispensary/main');
//                 //     case 'pathology':
//                 //       return redirectDocument('./Pathology/main');
//                 //     case 'medstore':
//                 //       return window.location.href('./MedStore/main.jsx');
//                 //     default:
//                 //       return redirectDocument('./Employee/main');
//                 //   }
//                 // }
//                 // else{
//                 //   document.getElementById('remarks').innerHTML = "Invalid credentials.";
//                 //   return window.location.href('./main');
//                 // }
//             })
//     }

//     return (
//         <div className="w-full h-screen bg-teal-300 text-center font-semibold text-2xl">
//             <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//                 <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
//                     <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                         <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                             Welcome to our health care portal
//                         </h1>
//                         <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//                             <div className="flex col-span-2">
//                                 <label htmlFor="employee_id" className="flex col-span-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">Employee ID</label>
//                                 <input type="number" name="emp_id" min='00007101' onChange={handleForm} id="employee_id" placeholder="employee_id" required="" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                             </div>
//                             <div className="flex col-span-2">
//                                 <label htmlFor="password" className="flex col-span-1 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
//                                 <div>
//                                     <input type="password" name="password" minLength='8' onKeyUp={validate} onChange={handleForm} id="password" placeholder="••••••••" required="" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
//                                     <span id="toggleBtn" className='flex justify-center align-center absolute top-8 right-10px w-34px h-34px bg-gray-300 border-radius-50% cursor-pointer'>A</span>
//                                 </div>
//                             </div>
//                             <div id="psconstraints" className="col-span-2 text-sm ">
//                                 <ul>
//                                     <li id="atl_8">Atleast 8 characters</li>
//                                     <li id="atl_1n">Atleast 1 number</li>
//                                     <li id="atl_1sc">Atleast 1 special character</li>
//                                     <li id="atl_1u">Atleast 1 uppercase</li>
//                                     <li id="atl_1l">Atleast 1 lowercase</li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <select onChange={handleForm} name="LOGIN_AS" required="" className="relative text-left inline-flex w-50 justify-center gap-x-1.5 font-bold rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" >
//                                     <option value="">LOGIN AS</option>
//                                     <option value="SuperAdmin">SuperAdmin</option>
//                                     <option value="employee">Employee</option>
//                                     <option value="doctor">Doctor</option>
//                                     <option value="medstore">MedStore</option>
//                                     <option value="dispensary">Dispensary</option>
//                                     <option value="pathology">Pathology</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <button type="submit" required="" className="relative text-left inline-flex w-full justify-center gap-x-1.5 font-bold rounded-md bg-blue-900 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 focus:bg-blue-950 cursor-pointer">
//                                     LOG IN
//                                 </button>
//                             </div>
//                             <div className="p-2">
//                                 <p id="remarks" className="block mb-2 text-sm font-medium text-red-500 justify-center"></p>
//                             </div>
//                         </form>
//                         {/* <div className='flex col-span-2 place-content-between'>
//                             <a href="/forgotpassword" className='flex col-span-1 text-sm text-blue-500 underline'>
//                                 Forgot password?
//                             </a>
//                             <a href="/register" className='flex col-span-1 text-sm text-blue-500 underline'>
//                                 Register
//                             </a>
//                         </div> */}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )

// }