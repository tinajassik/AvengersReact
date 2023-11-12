import AvengerCard from "./AvengerCard";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

export default function AvengerGallery() {
  const [avengerData, setAvengerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(
    "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189"
  );
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [offset, setOffset] = useState(0); // needed to fetch different characters

  const getAvengers = async () => {
    const prevOffset = Math.max(offset - 20, 0);
    setLoading(true);
    const response = await axios.get(url);
    // console.log(response);
    setNextUrl(
      `https://gateway.marvel.com/v1/public/characters?offset=${
        offset + 20
      }&ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189`
    );

    setPrevUrl(
      `https://gateway.marvel.com/v1/public/characters?offset=${prevOffset}&ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189`
    );
    setAvengerData(response.data.data.results);
    // console.log(response.data.data.results);
    setLoading(false);
  };

  useEffect(() => {
    try {
      getAvengers();
    } catch (error) {
      console.error("Error fetching Avengers:", error);
    }
  }, [url]);

  const handleNextClick = () => {
    setAvengerData([]);
    // Use the functional form of setState to get the updated offset
    setOffset((prevOffset) => {
      const newOffset = prevOffset + 20;
      // Update the URL based on the new offset
      setUrl(
        `https://gateway.marvel.com/v1/public/characters?offset=${newOffset}&ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189`
      );
      return newOffset;
    });
  };

  const handlePrevClick = () => {
    setAvengerData([]);
    // Use the functional form of setState to get the updated offset
    setOffset((prevOffset) => {
      // Make sure not to go below 0 offset
      const newOffset = Math.max(prevOffset - 20, 0);
      // Update the URL based on the new offset
      setUrl(
        `https://gateway.marvel.com/v1/public/characters?offset=${newOffset}&ts=1&apikey=51b6ff3c8aa80048d1b16078ae6e3998&hash=d5c6cb511494e35f2e0bb1f8f7c05189`
      );
      return newOffset;
    });
  };

  return (
    <div className="gallery">
      <AvengerCard avenger={avengerData} loading={loading} />
      <div className="btn-group">
        {prevUrl && (
          <button onClick={handlePrevClick} disabled={offset === 0}>
            Previous
          </button>
        )}
        {nextUrl && <button onClick={handleNextClick}>Next</button>}
      </div>
    </div>
  );
}
