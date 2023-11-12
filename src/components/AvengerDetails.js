import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

export default function AvengerDetails() {
  const { avengerId } = useParams();
  const [avengerDetails, setAvengerDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/characters/${avengerId}?ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189`
        );
        console.log(response);
        setAvengerDetails(response.data.data.results[0]);
      } catch (error) {
        console.error("Error fetching Avenger details:", error);
      }
    };

    fetchData();
  }, [avengerId]);


   

  // Conditionally render content based on avengerDetails
  if (!avengerDetails) {
    return <p>Loading...</p>;
  }

  // Secure the URL
  const originalUrl = avengerDetails.urls[0]?.url;
  const secureUrl = originalUrl?.replace(/^http:\/\//i, 'https://');
  return (
    <>
      <div className="avengerDetails">
        <Link to="/">
          <button className=""> Back Home</button>{" "}
        </Link>
        <h1> {avengerDetails.name}</h1>
        <img
          src={`${avengerDetails.thumbnail.path}.${avengerDetails.thumbnail.extension}`}
          alt=""
        />
        {/* description not always available */}
        {avengerDetails.description ? (
          <p>{avengerDetails.description}</p>
        ) : (
          <p>No description found.</p>
        )}
        <div>
          <h2>Appears in comics:</h2>
          {avengerDetails.comics.items.length > 0 ? (
            <ul style={{ listStyleType: "none" }}>
              {avengerDetails.comics.items.map((comic) => (
                <li key={comic.name}>{comic.name}</li>
              ))}
            </ul>
          ) : (
            <p>No comics found for this character.</p>
          )}
        </div>

        {/* // embedding a marvel website for comics where the character appears 
        // however, some urls from the API are outdated so it does not always work  */}
        <iframe
          src={secureUrl}
          title="Embedded Marvel Website for a given character"
          width="800"
          height="600"
        ></iframe>
      </div>
    </>
  );
}
