import React, {useEffect} from 'react'
// import 'flowbite'
import HospitalFacilities from './Cards'
import BedDetailsChart from './Chart'
import App from './Anim'
import Calendar from './Calender'
import TimeSchedule from './Timeschedule'
import Saying from './Saying'
import Footer from './Footer'

export default function AAbout() {

  return (
      <div id="default-carousel" className="relative w-full" data-carousel="slide" style={{ height:"20cm"}}>
    <div className="relative h-56 overflow-hidden md:h-96 " style={{ height:"20cm"}}>
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="./src/Common/assets/img-1.jpg" className="absolute block w-full h-full object-cover" alt="..."/>
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50">
            <div className="text-center max-w-3xl">
                <span className='block text-7xl font-LoraFont'>Welcome to Our Hospital</span><br/>
                <span className='text-2xl font-DNFont mt-1 font-medium'>Experience compassionate care and expert medical treatment at our hospital. Welcome to a place where health and healing come first.</span>
            </div>
        </div>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="./src/Common/assets/img-2.webp" className="absolute block w-full h-full object-cover" alt="..."/>
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50">
            <div className="text-center max-w-3xl">
                <span className='block text-7xl font-LoraFont'>Comprehensive Care</span><br/>
                <span className='text-2xl font-DNFont mt-1 font-medium'>From diagnosis to recovery, we provide comprehensive care tailored to your needs, ensuring your health and well-being are our top priorities.</span>
            </div>
        </div>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="./src/Common/assets/img-3.jpeg" className="absolute block w-full h-full object-cover" alt="..."/>
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50">
            <div className="text-center max-w-3xl">
                <span className='block text-7xl font-LoraFont'>Patient-Centered Care</span><br/>
                <span className='text-2xl font-DNFont mt-1 font-medium'>Embrace personalized attention and support with our patient-centered care approach, dedicated to meeting your unique healthcare needs with compassion and expertise.</span>
            </div>
        </div>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="./src/Common/assets/img-4.jpg" className="absolute block w-full h-full object-cover" alt="..."/>
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50">
            <div className="text-center max-w-5xl">
                <span className='block text-7xl font-LoraFont'>Building Trust Together</span><br/>
                <span className='text-2xl font-DNFont mt-1 font-medium'>Through transparency, expertise, and genuine care, we are committed to building trust together with our patients, ensuring your confidence in every step of your healthcare journey.</span>
            </div>
        </div>
        </div>

        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="./src/Common/assets/img-5.avif" className="absolute block w-full h-full object-cover" alt="..."/>
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold bg-black bg-opacity-50">
            <div className="text-center max-w-3xl">
                <span className='block text-7xl font-LoraFont'>Our Dedicated Team</span><br/>
                <span className='text-2xl font-DNFont mt-1 font-medium'>Meet our dedicated team of healthcare professionals, united in their commitment to delivering exceptional care and support to every patient, every day.</span>
            </div>
        </div>
        </div>

    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>
/
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>
<div className="text-center py-5 mx-auto max-w-6xl">
                <span className='text-3xl font-sans mb-2 font-semibold text-cyan-300'>What we do</span>
                <span className='block text-5xl font-LoraFont font-semibold'>Explore Our Advanced Medical Services and Specialties.</span><br/>
                <span className='font-DNFont font-light text-gray-500'>Our hospital offers a comprehensive range of healthcare services and specialties designed to meet the diverse needs of our community. Whether you require emergency care,or maternity services we are here to support you every step of the way on your journey to health and wellness."</span>
            </div>
    <div className='py-3'>
        <HospitalFacilities/>
    </div>
    <div>
        <App/>
    </div>
    <div className='flex flex-row justify-center gap-x-20'>
        <div className='flex flex-col'>
    <div className="App">
      <main className="p-4">
        <BedDetailsChart />
      </main>
    </div>
    <div className='p-4'>
        <Calendar/>
    </div>
        </div>
    <div className='py-16'>
        <TimeSchedule/>
    </div>
    </div>
    <div className='mb-4'>
        <Saying/>
    </div>
    <div className='py-10'>
    <Footer/>
    </div>
    </div>
  )
}
