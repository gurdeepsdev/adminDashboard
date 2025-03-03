import React, { useState, useEffect } from "react";
import axios from "axios";
import UserDtailsModal from "./UserDtailsModal";


const CouponTable = () => {
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({});
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const apiUrl = process.env.REACT_APP_API_URL;


  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/get-withdrow`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDetails(data.data);
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

  const handleStatusChange = (id, value) => {
    setStatus((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (withdrawId) => {
    if (!status[withdrawId]) {
      alert("Please select a status.");
      return;
    }


    try {
      const response = await axios.post(`${apiUrl}/api/update-withdrow-details`, {
        withdrawId,
        status: status[withdrawId],
      });

      alert("Success: " + response.data.message);
      
      // Update status in the UI without reloading
      setDetails((prevDetails) =>
        prevDetails.map((item) =>
          item.id === withdrawId ? { ...item, status: status[withdrawId] } : item
        )
      );
      
      setMessage(response.data.message);
    } catch (error) {
      alert("Failed: " + (error.response?.data?.error || "Something went wrong"));
    }
  };



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = details.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Withdraw Requests</h2>
      {message && <p className="text-green-500 mb-2">{message}</p>}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Created At</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((withdraw) => (
            <tr key={withdraw.id} className="text-center">
              <td className="border p-2">{withdraw.user_id}</td>
              <td className="border p-2">{withdraw.amount}</td>
              <td className="border p-2">{withdraw.type}</td>
              <td className="border p-2">{withdraw.status}</td>
              <td className="border p-2">      <UserDtailsModal userId={withdraw.user_id} />
              </td>
              <td className="border p-2">
                <select
                  className="p-2 border rounded"
                  value={status[withdraw.id] || ""}
                  onChange={(e) => handleStatusChange(withdraw.id, e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button
                  onClick={() => handleSubmit(withdraw.id)}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (indexOfLastItem < details.length ? prev + 1 : prev))}
          disabled={indexOfLastItem >= details.length}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CouponTable;
