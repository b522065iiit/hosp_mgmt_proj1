import React, { useState } from 'react'

const Registration = () => {
  const [encid_today, setEncid_today] = useState("");// Encounter ID for today
  const [bookedEnc, setBookedEnc] = useState(false);
  const [isBooked, setIsBooked] = useState(false);
  const [form, setForm] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);
  const you = window.sessionStorage.getItem('user');

  const today = new Date();
  
  function ddmmyyyy(dt){
    return (dt.slice(0,2)+dt.slice(3,5)+dt.slice(6,10))
  }

  async function bookSlNo(reg_date,emp_id, enc_id, slno){
    await fetch("http://localhost:3000/slnum",{
      method: 'POST',
      body: JSON.stringify({ 'reg_date': reg_date, 'emp_id': emp_id, 'enc_id': enc_id, 'slno': slno }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then((res) => res.json())
    .then((reg) => {
      if(reg.stat && reg_date === today.toLocaleDateString()){// encounter id booked for today
        setEncid_today(enc_id);
      } else if (reg.stat) {// encounter id booked for some other day
        alert(`Encounter ID booked for ${reg_date} successfully.`);
      }else{
        alert('Something went wrong, please try again');
      }
      return window.location.reload();
    })
  }

  async function checkSlNo(reg_date, emp_id, book) {
    let reg_dmy = ddmmyyyy(reg_date);
    // console.log(reg_date);
    // console.log(reg_dmy);
    await fetch("http://localhost:3000/slnum", {
      method: 'POST',
      body: JSON.stringify({ 'reg_date': reg_date,'emp_id': emp_id, 'enc_id': null, 'slno': null }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
    })
      .then((res) => res.json())
      .then((num) => {
        if(today.toLocaleDateString() === reg_date && num.enc){
          return setEncid_today(num.enc);
        }else if (num.enc) {// encounter id already booked for the specified date
          alert(`Encounter ID already booked for ${reg_date}`);
          return window.location.reload();
        }
        else if(book){
          //num.slno latest serial number, if not registered
          const encid = reg_dmy + `${num.slno + 1}`;
          bookSlNo(reg_date, you, encid, num.slno + 1);
        }
      })
  }


  // Check and notify whether encounter id for today is already booked
  useState(() => {
    async function chk_encid_today(){
      await checkSlNo(today.toLocaleDateString(), you, false);
    }
    chk_encid_today();
  },[]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    let reg_date = new Date(form.confirmationDate);
    reg_date = reg_date.toLocaleDateString();
    // console.log(reg_date); dd/mm/yyyy
    setIsFormOpen(false);
    if(reg_date < today.toLocaleDateString()){alert('past date.');
      return form.clear;
    };
    async function chk_encid() {
      await checkSlNo(reg_date, you, true);
    }
    chk_encid();// Check whether booked and notify, else book and notify
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  return (
    <>
    <div className="flex justify-center ">
      <button
        onClick={() => setIsFormOpen(true)}
        className="py-2 px-4 bg-blue-600 text-white rounded-md"
      >
        Book Encounter ID
      </button>
    </div>
    {encid_today !== "" && (
      <div className="flex justify-center ">
        <p className='font-medium'>Encounter ID for you today({today.toLocaleDateString()}) is {encid_today}.</p>
      </div>
    )}
    {/* {bookedEnc && (
      <div className="flex justify-center ">
        <p className='font-medium'>Encounter ID booked for date: {form.confirmationDate}</p>
      </div>
    )}
    {isBooked && (
      <div className="flex justify-center ">
        <p className='font-medium'>Encounter ID for date: {form.confirmationDate} already booked.</p>
      </div>
    )} */}
    {isFormOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Book encounter ID for today or later</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Encounter ID for Date</label>
              <input required
                type="date"
                name="confirmationDate"
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="mr-4 py-2 px-4 bg-gray-300 text-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-blue-600 text-white rounded-md"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  );
};

export default Registration;