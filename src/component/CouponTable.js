import React, { useState,useEffect,useContext } from "react";



const CouponTable = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [coupon, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
console.log("apiUrl",apiUrl)
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/get-campains`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCoupons(data.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);
console.log("coupons",coupon)
  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Coupon</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Search coupon"
            className="border p-2 rounded-md"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Filter</button>
        </div>
      </div>

       <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
          <th className="border p-2">ID</th>

            <th className="border p-2">Coupon Title</th>
            <th className="border p-2">Payout</th>
            <th className="border p-2">Payout Model</th>
            <th className="border p-2">Currency</th>
          </tr>
        </thead>
        <tbody>
          {coupon.map((coupon, index) => (
            <tr key={index} className="text-center">
                            <td className="border p-2">{coupon.id}</td>

              <td className="border p-2">{coupon.title}</td>
              <td className="border p-2">{coupon.payout}</td>
              <td className="border p-2">{coupon.payout_model}</td>
              <td className="border p-2">{coupon.currency
              }</td>
            </tr>
          ))}
        </tbody>
      </table> 
    </div>
  );
};

export default CouponTable;
