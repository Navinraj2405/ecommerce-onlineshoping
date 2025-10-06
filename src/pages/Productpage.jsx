 // src/pages/Productpage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Productpage() {
  const [productlist, setProductlist] = useState([]);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products`)
      .then((res) => res.json())
      .then((data) => setProductlist(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
      {productlist.map((item) => (
        <Link key={item.id} to={`/productdetails/${item.id}`}>
          <div className="flex flex-col items-center shadow-md border rounded-lg p-4 hover:scale-105 transition-transform">
              <img
                src={item.images?.[0] || "https://via.placeholder.com/150"}
                alt={item.title}
                className="w-32 h-32 object-contain mx-auto transition-opacity duration-300"
              />

              {/* Optional: Show second image on hover */}
              {item.images?.[1] && (
                <img
                  src={item.images[1]}
                  alt={item.title}
                  className="w-32 h-32 object-contain mx-auto absolute top-4 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />)}
             
            <p className="font-semibold text-center">{item.title}</p>
            <p className="text-green-700">${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Productpage;
