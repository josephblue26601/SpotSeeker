"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const type = searchParams.get('type') || 'restaurants'; // Default to 'restaurants'

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const APIKEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    async function fetchResults() {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const endpoint = 'https://api.yelp.com/v3/businesses/search';

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${APIKEY}`,
          },
          params: {
            term: type,
            location: query,
            limit: 15,
          },
        });

        console.log("Data has been fetched", response.data);
        setResults(response.data.businesses || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("There has been an error fetching data.");
        setLoading(false);
      }
    }

    fetchResults();
  }, [query, type, APIKEY]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!results || results.length === 0) return <div>No results found.</div>;
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-4">Results for {query}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => (
          <div key={result.id} className="bg-white shadow-lg rounded-lg p-4 hover:-translate-y-3 scale-110">
            {result.image_url && (
              <img
                src={result.image_url}
                alt={result.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-bold">{result.name}</h3>
              <p className="text-gray-600">{result.location.address1}</p>
              <div className="text-yellow-500 mt-2">
                <span>Rating: {result.rating} ⭐</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
