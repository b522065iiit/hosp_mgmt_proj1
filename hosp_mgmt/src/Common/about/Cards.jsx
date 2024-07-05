import React, { useState } from 'react';
import FacilityBox from './Facility';

const facilitiesData = [
  { id: 1, name: 'Emergency Room', description: '24/7 Emergency services', image: './src/Common/assets/img-6.jpg', desp:'Our Emergency Room (ER) is equipped to provide immediate, high-quality care for urgent medical conditions, 24/7. Our skilled team of doctors, nurses, and specialists is ready to handle everything from minor injuries to life-threatening emergencies with speed and compassion. Utilizing the latest technology and diagnostic tools, we ensure rapid assessment and treatment to stabilize patients and provide the best possible outcomes. Your health and safety are our top priorities, and we are here to support you in critical times.'},

  { id: 2, name: 'ICU', description: 'Intensive Care Unit', image: './src/Common/assets/img-7.jpg', desp:'Our Intensive Care Unit (ICU) delivers specialized, round-the-clock care for critically ill patients. Staffed by a dedicated team of highly trained doctors, nurses, and specialists, our ICU is equipped with advanced monitoring and life-support technology to provide the highest level of medical care. We focus on stabilizing patients, managing complex health conditions, and supporting recovery with a compassionate, patient-centered approach. Your health and well-being are our utmost priorities in the ICU.' },

  { id: 3, name: 'Radiology', description: 'Advanced imaging services', image: './src/Common/assets/img-8.jpg',desp:'Our Radiology Department offers advanced imaging services to accurately diagnose and monitor a wide range of medical conditions. Utilizing state-of-the-art equipment, including MRI, CT scans, X-rays, and ultrasound, our experienced radiologists provide precise and timely results. We are committed to delivering high-quality care in a comfortable and safe environment, ensuring the best possible outcomes for our patients.' },

  { id: 4, name: 'Laboratory', description: 'Full-service lab', image: './src/Common/assets/img-9.jpg',desp:'Our Laboratory Services provide essential diagnostic testing to support accurate and timely medical care. Equipped with advanced technology, our lab performs a wide range of tests, including blood work, tissue analysis, and microbiology. Our skilled technicians and pathologists ensure precise results, aiding in the diagnosis and treatment of various health conditions. We are dedicated to maintaining high standards of quality and efficiency to support patient care.' },

  { id: 5, name: 'Pharmacy', description: 'On-site pharmacy', image: './src/Common/assets/img-10.jpg',desp:'Our Pharmacy offers comprehensive medication services to support your healthcare needs. Staffed by knowledgeable pharmacists, we provide prescription fulfillment, medication counseling, and personalized care to ensure safe and effective treatment. Our team works closely with healthcare providers to manage and optimize your medication regimen, prioritizing your health and well-being.' },

  { id: 6, name: 'Maternity Ward', description: 'Comprehensive maternity care', image: './src/Common/assets/img-11.jpg',desp:'Our Maternity Ward provides comprehensive care for expectant mothers and their newborns. We offer a range of services, from prenatal check-ups and birthing plans to postnatal care and support. Our experienced team of obstetricians, midwives, and nurses is dedicated to ensuring a safe and comfortable birthing experience. With state-of-the-art facilities and a compassionate approach, we support you every step of the way, from pregnancy through to early parenthood.' },

  { id: 7, name: 'Pediatrics', description: 'Children care unit', image: './src/Common/assets/img-12.avif',desp:'Our Pediatric Services are dedicated to providing specialized care for infants, children, and adolescents. With a focus on compassionate and family-centered care, our team of pediatricians and nurses offers comprehensive medical services, including wellness check-ups, vaccinations, acute illness management, and chronic disease care. We are committed to promoting the health and development of young patients through personalized treatment plans and a supportive environment that prioritizes their well-being.' },

  { id: 8, name: 'Cardiology', description: 'Heart care center', image: './src/Common/assets/img-13.jpg',desp:'Our Cardiology Services specialize in the diagnosis, treatment, and prevention of heart-related conditions. Led by experienced cardiologists and supported by state-of-the-art technology, we offer a comprehensive range of cardiac care, including diagnostic tests like ECGs and echocardiograms, as well as interventional procedures such as angioplasty and pacemaker implantation. Our goal is to provide personalized care focused on improving heart health and enhancing quality of life for our patients.' },
];

const Facilitydesc =[
  {id:1, description:''}
]

const HospitalFacilities = () => {
  const [selectedFacility, setSelectedFacility] = useState(null);

  const handleFacilityClick = (id) => {
    setSelectedFacility(id);
  };

  return (
    <div>
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {facilitiesData.map((facility) => (
          <FacilityBox key={facility.id} facility={facility} onClick={handleFacilityClick}/>
        ))}
      </div>
    </div>
    <div>
    {selectedFacility && (
        <div className="mt-8 p-4 border rounded-lg bg-sky-50">
          <h2 className="text-2xl font-bold mb-2">
            {facilitiesData.find((facility) => facility.id === selectedFacility).name}
          </h2>
          <p>
            {facilitiesData.find((facility) => facility.id === selectedFacility).desp}
          </p>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default HospitalFacilities;