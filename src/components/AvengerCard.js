import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export default function AvengerCard ({avenger, loading}) {
    console.log(avenger);


   

    return (
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : avenger ? (
            avenger.map((item) => (
                <Link to={`/details/${item.id}`}>
              <div className="avengerCard" key={item.id}>
                <h2>{item.id}</h2>
                {item.thumbnail && item.thumbnail.path && (
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
            )}
                <h2>{item.name}</h2>
    
              </div>
              </Link>
            ))
          ) : (
            <h1>No avenger data available</h1>
          )}
        </>
      );
}