"use client";

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function SearchBar() {
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [searchType, setSearchType] = useState("restaurants"); // State for search type
  const router = useRouter();
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  }

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  }

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevents the default form submit action

    if (!query) {
      setError("Please enter a destination");
      return;
    }

    try {
      const response = await axios.get('https://api.yelp.com/v3/businesses/search', {
        headers: {
          Authorization: `Bearer ${APIKEY}`,
        },
        params: {
          term: searchType, // Use searchType for the search term
          location: query,
          limit: 15,
        },
      });

      console.log("Data has been fetched", response.data);
      router.push(`/results?query=${encodeURIComponent(query)}&type=${searchType}`); // Pass type to results page
    } catch (error) {
      console.error('There has been an error fetching data:', error);
      setError("There has been an error fetching data");
    }
  }

  return (
    <>
      <form className="flex items-center justify-center mt-5" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          placeholder="Enter destination...."
          className="w-1/2 p-4 rounded-full border-2 border-solid border-black-100"
          onChange={handleInputChange}
        />
        <button
          type="submit" // Ensures the button submits the form
          className="text-white ml-10 font-bold border-2 p-3 rounded-full w-52 bg-red-500 hover:bg-green-200"
        >
          Search
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
      <div className="flex items-center justify-center mt-5">
        <select
          onChange={handleSearchTypeChange}
          value={searchType}
          className="p-2 border rounded"
        >
          <option value="restaurants">Restaurants</option>
          <option value="attractions">Attractions</option>
        </select>
      </div>
    </>
  );
}
