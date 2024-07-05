import React from 'react'
import 'flowbite'

export default function Footer() {
  return (
    <div>
      

<footer className="bg-sky-100">
    <div className="mx-auto w-full max-w-screen-xl">
      <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
      <div className="py-28">
            <img src="./src/Common/assets/Screenshot_2024-06-15_152924-removebg-preview.png" className='object-left' style={{width:"5cm"}}></img>
            <ul className="text-gray-500 dark:text-gray-400 font-medium ">
                <li className="mb-4">
                    <a href="#" className="hover:underline">Innovating Care, Simplifying Management</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-1xl font-bold text-gray-900 uppercase dark:text-white font-LoraFont">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="#" className=" hover:underline">About</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Privacy Policy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Terms &amp; Conditions</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Blog</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-1xl font-bold text-gray-900 uppercase dark:text-white font-LoraFont">Services</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">All Services</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Physiotherapy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Diagnosis</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Manual Therapy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Massage Therapy</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">Rehabilitation</a>
                </li>
            </ul>
        </div>
        <div>
            <h2 className="mb-6 text-1xl font-bold text-gray-900 uppercase dark:text-white font-LoraFont">Contact</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                    <a href="#" className="hover:underline">123 Street, 123 city, 123 state</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline"> info@example.com</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline"> info@example.com</a>
                </li>
                <li className="mb-4">
                    <a href="#" className="hover:underline">91+ 1234567890</a>
                </li>
            </ul>
        </div>
    </div>
    </div>
</footer>

    </div>
  )
}
