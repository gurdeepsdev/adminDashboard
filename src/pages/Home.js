import React, { useState } from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import CouponTable from "../component/CouponTable";
import Withdraw from "../component/Withdraw";
import AddCouponDetails from "../component/AddCouponDetails";

import AllUsers from "../component/AllUsers";

const Dashboard = () => {
  const [selectedTable, setSelectedTable] = useState("coupons"); // Default table
 

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Pass the function to update the selected table */}
      <Sidebar setSelectedTable={setSelectedTable} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6">
          {/* Render table based on selection */}
          {selectedTable === "coupons" && <CouponTable />}
          {selectedTable === "withdraw" && <Withdraw />}
          {selectedTable === "add-coupon" && <AddCouponDetails />} 
          {selectedTable === "AllUsers" && <AllUsers />}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
