import React from 'react'
import { useState } from 'react'
import { redirect } from 'react-router-dom';
export default function ForgotPassword() {
  const [form, setForm] = useState({});

  function handleForm(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  }

  function validate() {
    var pass = document.getElementById('password');
    var pslen = document.getElementById('atl_8');
    var num = document.getElementById('atl_1n');
    var sp_char = document.getElementById('atl_1sc');
    var upper = document.getElementById('atl_1u');
    var lower = document.getElementById('atl_1l');
    /* Check if password contains a number */
    pass.value.match(/[0-9]/) ? num.style.color = 'green' : num.style.color = 'red';
    /* Check if password contains a uppercase alphabet */
    pass.value.match(/[A-Z]/) ? upper.style.color = 'green' : upper.style.color = 'red';
    /* Check if password contains a lowerase alphabet */
    pass.value.match(/[a-z]/) ? lower.style.color = 'green' : lower.style.color = 'red';
    /* Check if password contains a special character */
    pass.value.match(/[\!\@\#\$\%\^\&\*\(\)\-\=\+\`\~\,\.\/\<\>\?\:\;\'\"\_]/) ? sp_char.style.color = 'green' : sp_char.style.color = 'red';
    /* Check if password is of 8 or more characters */
    pass.value.length < 8 ? pslen.style.color = 'red' : pslen.style.color = 'green';
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    await fetch("http://localhost:3000/forgot-password", {
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
        if (data.status === 'sent'){
        alert("link for reset password has been sent in the email. Close this window and visit the link to change your password.");
        return redirect('./login');//
        }
        return alert(data.status);
      });
  }
  return (
    <div className="w-full h-screen bg-[url('./src/Common/assets/bcg_common1.jpg')] bg-no-repeat bg-cover text-center font-semibold text-2xl">
      <div className="flex flex-col items-center justify-center px-6 py-4 lg:pt-40">
        <div className="w-full bg-white rounded-lg shadow-xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="flex-col">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input type="email" name="email" onChange={handleForm} id="email" placeholder="xyz@domain.com" required="" className="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
              </div>
              <div>
                <button type="submit" className="relative text-left inline-flex w-full justify-center gap-x-1.5 font-bold rounded-md bg-blue-700 px-3 py-2 text-sm text-white shadow-sm hover:bg-blue-500 cursor-pointer">
                  SUBMIT
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
