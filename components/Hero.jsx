


import React from 'react'

export default function Hero() {
  return (
    <>
       <section
    className="h-[60vh] bg-cover bg-center flex items-center justify-center text-center"
    style={{ backgroundImage: 'url(/newHero.jpg.jpg)' }}
  >
    <div className="bg-inherit bg-opacity-50 p-8 rounded mt-20">
      <h1 className="text-white text-6xl font-black mb-4">Discover the Best Spots Near You</h1>
      <p className="text-white text-4xl mb-6 font-black  z-10">Find the best spots around you .</p>
      
    </div>
  </section>
    </>
  )
}
