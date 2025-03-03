import React, { useState, useEffect } from "react";

const CouponTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/users`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = users.slice(indexOfFirstRecord, indexOfLastRecord);

  const nextPage = () => {
    if (currentPage < Math.ceil(users.length / recordsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            {/* <th className="border p-2">Password</th> */}
            <th className="border p-2">Referral</th>
            <th className="border p-2">Referral-By</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((coupon, index) => (
            <tr key={index} className="text-center">
              <td className="border p-2">{coupon.username}</td>
              <td className="border p-2">{coupon.email}</td>
              <td className="border p-2">{coupon.phone_number}</td>
              {/* <td className="border p-2">{coupon.password}</td> */}
              <td className="border p-2">{coupon.referral_code}</td>
              <td className="border p-2">{coupon.referred_by}</td>
              <td className="border p-2">{coupon.created_at.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white"}`}
        >
          Previous
        </button>
        <p>Page {currentPage} of {Math.ceil(users.length / recordsPerPage)}</p>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(users.length / recordsPerPage)}
          className={`px-4 py-2 rounded-md ${currentPage === Math.ceil(users.length / recordsPerPage) ? "bg-gray-300" : "bg-blue-600 text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouponTable;
