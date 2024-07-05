import React from 'react'
// File not linked
export default function About(){
  return (
    <div className="w-full h-screen bg-teal-300 text-center font-semibold text-2xl">
      <h1>John: 3: 16</h1>
      <p>For God so loved the world, that He gave His only begotten Son,
         that whoever believes in Him shall not perish, but have eternal life.</p>
    </div>
  )
}

// export default function About() {
//   fetch("http://localhost:3000/about", {
//     method: 'POST',
//     body: JSON.stringify({"Gospel":"Jesus Christ is the Lord of ALL!"}),
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//       "Access-Control-Allow-Origin": "*"
//     }
//   }).then((res) => res.json())
//     .then((data) => {
//       document.getElementById('ref').innerHTML = data.Reference;
//       document.getElementById('verse').innerHTML = data.Verse;
//     })
//   return (
//     <div>
//       <p id="ref" className='text-sm'></p>
//       <p id="verse" className='text-sm'></p>
//     </div>
//   )
// }
