 

import React, { useEffect, useState } from "react";
import axios from "axios";

function Address() {
  const [addAddress, setAddAddress] = useState([]);

  const [newStreet, setNewStreet] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newArea, setNewArea] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPincode, setNewPincode] = useState("");
  const [newCity, setNewCity] = useState("");

  const [editingId, setEditingId] = useState(null); // Track if editing

  // Fetch addresses on mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get("https://ecommerce-backend-xveu.onrender.com/api/address");
      setAddAddress(res.data);
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // ✅ Edit address
        await axios.put(`https://ecommerce-backend-xveu.onrender.com/api/address/${editingId}`, {
          newStreet,
          newLandmark,
          newArea,
          newAddress,
          newPincode,
          newCity,
        });
        setEditingId(null); // Reset editing mode
      } else {
        // ✅ Add new address
        await axios.post("https://ecommerce-backend-xveu.onrender.com/api/address", {
          newStreet,
          newLandmark,
          newArea,
          newAddress,
          newPincode,
          newCity,
        });
      }

      // Refresh address list
      fetchAddresses();

      // Clear form
      setNewStreet("");
      setNewLandmark("");
      setNewArea("");
      setNewAddress("");
      setNewPincode("");
      setNewCity("");
    } catch (err) {
      console.error("Error saving address:", err);
    }
  };

  const handleEdit = (address) => {
    setEditingId(address._id);
    setNewStreet(address.newStreet);
    setNewLandmark(address.newLandmark);
    setNewArea(address.newArea);
    setNewAddress(address.newAddress);
    setNewPincode(address.newPincode);
    setNewCity(address.newCity);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ecommerce-backend-xveu.onrender.com/api/address/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error("Error deleting address:", err);
    }
  };

  return (
    <div className="p-5 bg-yellow-100 min-h-screen">
  <form onSubmit={handleSubmit} className="flex justify-center">
    <div className="flex flex-col gap-y-5 justify-center items-center mt-10 bg-yellow-300 shadow-2xl border border-yellow-400 w-full max-w-md p-8 rounded-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800">
        {editingId ? "Edit Address" : "Add Your Delivery Address"}
      </h1>

      <input
        type="text"
        placeholder="Enter your street"
        value={newStreet}
        onChange={(e) => setNewStreet(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <input
        type="text"
        placeholder="Landmark"
        value={newLandmark}
        onChange={(e) => setNewLandmark(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <input
        type="text"
        placeholder="Enter your Area"
        value={newArea}
        onChange={(e) => setNewArea(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <textarea
        placeholder="Full Address"
        value={newAddress}
        onChange={(e) => setNewAddress(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full h-24 resize-none focus:ring-2 focus:ring-yellow-500 outline-none"
      ></textarea>

      <input
        type="text"
        placeholder="Pin Code"
        value={newPincode}
        onChange={(e) => setNewPincode(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <input
        type="text"
        placeholder="City"
        value={newCity}
        onChange={(e) => setNewCity(e.target.value)}
        className="p-3 rounded-lg border border-yellow-400 w-full focus:ring-2 focus:ring-yellow-500 outline-none"
      />

      <button
        type="submit"
        className="bg-black text-yellow-50 px-6 py-2 rounded-xl mt-4 hover:bg-yellow-700 hover:text-white transition-all duration-300"
      >
        {editingId ? "Update Address" : "Add Address"}
      </button>
    </div>
  </form>

  {/* Address List */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4 mt-10">
    {addAddress.length > 0 ? (
      addAddress.map((detail) => (
        <div
          key={detail._id}
          className="p-6 bg-yellow-200 shadow-lg border border-yellow-400 rounded-xl text-gray-800 hover:shadow-2xl transition-all duration-300"
        >
          <h3 className="font-semibold text-xl mb-2 text-yellow-900">
            {detail.newStreet}
          </h3>
          <p>{detail.newLandmark}</p>
          <p>{detail.newArea}</p>
          <p>{detail.newAddress}</p>
          <p>{detail.newCity}</p>
          <p>{detail.newPincode}</p>

          {/* Edit & Delete Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => handleEdit(detail)}
              className="bg-yellow-600 text-white px-4 py-1 rounded-lg hover:bg-yellow-700 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(detail._id)}
              className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-center text-gray-600 col-span-full">
        No addresses found.
      </p>
    )}
  </div>
</div>

  );
}

export default Address;
