import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { redirect } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [otpverf, setOtpverf] = useState(false);
  const [codeotp, setCodeotp] = useState();
  const [passwd, setPasswd] = useState();

  // const [image, setImage] = useState(null);

  // const onInputChange = (e) =>{
  //   console.log(e.target.files[0]);
  //   setImage(e.target.files[0]);
  // }


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
      setPasswd(form["password"]);// passwd = form["password"]
      // form.image = image;
      // console.log(form);
      await fetch("http://localhost:3000/register", {
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
          // console.log(data);
          switch (data.status) {
            case 'invalid': { alert("Invalid employee"); window.location.reload(); break; }
            case 'repeat': { alert("Employee already registered"); window.location.reload(); break; }
            case 'error': { alert("Something went wrong try again"); window.location.reload(); break; }
            default: {
              setCodeotp(data.status);
              alert("OTP for registration sent in the registered email. Verify to continue.");
              setOtpverf(true);
            }
          }
        });
    }
  }

  const handleForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const handleOtp = (e) => {
    setForm({[e.target.name]: e.target.value});
  }
  const SubmitOtp = async (e) => {
    e.preventDefault();
    if(form.otp === codeotp){
    await fetch("http://localhost:3000/otpverf", {
      method: 'POST',
      body: JSON.stringify({'register': true, 'password': passwd}),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success'){ 
          alert('Registration Successful');
          return window.location.reload();}
          // return redirect('http://localhost:5173/login');}
        else { 
          alert('Registration Unsuccessful');
          return window.location.reload(); }
        
      }).catch(() => { alert('Something went wrong'); window.location.reload(); });
  }// If otp doesn't match
  else{
    alert("invalid OTP.");
    window.location.reload();
    await fetch("http://localhost:3000/otpverf", {
      method: 'POST',
      body: JSON.stringify({ 'register': false, 'password': null }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
  }
  }

  return (
    <div className="bg-[url('./src/Common/assets/bcg_common1.jpg')] bg-no-repeat bg-cover w-full h-screen text-center lg:pt-32">
      
      <div className="flex items-center justify-center ">
        <div className="w-full p-8 space-y-6 bg-white rounded-lg shadow-xl" style={{ width: '15cm' }}>
          <h2 className="text-2xl font-bold text-center">Employee Registration</h2>
            
            {!otpverf && (
              <>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="employee-id" className="block text-sm font-medium text-gray-700">Employee ID<span className="required"> *</span></label>
                  <input
                    type="number"
                    id="employee-id"
                    name="emp_id"
                    min='70007101'
                    max='70007200'
                    required
                    onChange={handleForm}
                    placeholder="Enter your employee ID"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email<span className="required"> *</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    onChange={handleForm}
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password<span className="required"> *</span></label>
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      name="password"
                      required
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleForm}
                      className="flex-grow p-2 outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="p-2 focus:outline-none"
                    >
                      {showPassword ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                    </button>
                    {showPasswordCriteria && (
                      <div className="text-sm text-gray-600 mt-1">
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
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Submit
                  </button>
                </div>
              </form>
              </>)
            }
            {
              otpverf && (
                <>
                <form onSubmit={SubmitOtp}>
                  <div className="mb-4">
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">Enter the otp as sent in the email<span className="required"> *</span></label>
                    <input
                      type="number"
                      id="otp"
                      name="otp"
                      length = '6'
                      required
                      onChange={handleOtp}
                      placeholder=""
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                      Verify and Register
                    </button>
                  </div>
                </form>
                </>
              )
            }
          
          <div className='flex text-sm col-span-1 place-content-end space-x-2'>
            <p className='flex text-ms'>Already registered?</p>
            <a href="/login" className='flex text-ms text-blue-500 underline'>Login</a>
          </div>
        </div>
      </div>
    </div>
  )
}
