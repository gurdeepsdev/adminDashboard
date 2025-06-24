import React, { useState } from "react";

const UserDetailsModal = ({ userId }) => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;


  const fetchUserDetails = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/api/get-user-bank/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch details");
      }

      setUserData(data.details);
      setShowModal(true); // Show modal after fetching data
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center mt-5">
      {/* Fetch Button */}
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        onClick={fetchUserDetails}
      >
        {isLoading ? "Loading..." : "Get User Details"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">User Financial Details</h2>
            
            {userData ? (
              <ul className="space-y-3">
                {userData.map((item, index) => (
                  <li key={index} className="p-3 border rounded-md">
                    <strong className="block text-lg">{item.type} Details</strong>
                    {item.type === "Bank" ? (
                      <>
                        <p><strong>Bank Name:</strong> {item.bank_name}</p>
                        <p><strong>Account Number:</strong> {item.acc_number}</p>
                        <p><strong>Holder Name:</strong> {item.acc_holder_name}</p>
                        <p><strong>IFSC:</strong> {item.ifsc_code}</p>
                      </>
                    ) : (
                      <p><strong>UPI ID:</strong> {item.upi}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No details found.</p>
            )}

            {/* Close Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsModal;
