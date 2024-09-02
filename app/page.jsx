
"use client";
import React from 'react'
import Hero from '@/components/Hero'

import SearchBar from '@/components/SearchBar'
export default function page() {
  return (
   <main>


   <Hero />
   <h1 className ="font-bold  text-4xl  text-black  text-center mt-20 ">Enter a Destination </h1>
   <SearchBar/>
   </main>
  )
}
