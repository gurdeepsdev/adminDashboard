import { createContext, useState, useEffect } from "react";
import { FiHome, FiShoppingCart, FiSettings, FiUsers } from "react-icons/fi";

const Sidebar = ({ setSelectedTable }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin");
    window.location.href = "/"; // Change to your actual dashboard route

  };
  return (
    <div className="h-screen w-64 bg-blue-900 text-white flex flex-col p-4">
      {/* Logo */}
      <div className="text-2xl font-bold mb-6">Step to Sale</div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-4">
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
          <FiHome /> <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
          <FiShoppingCart /> <span             onClick={() => setSelectedTable("coupons")}
          >Coupons</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
          <FiUsers /> <span             onClick={() => setSelectedTable("withdraw")}
          >Withdraw</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
          <FiUsers /> <span             onClick={() => setSelectedTable("AllUsers")}
          >All-Users</span>
        </a>
        <a href="#" className="flex items-center space-x-2 p-2 hover:bg-blue-700 rounded">
          <FiSettings /> <span  onClick={() => setSelectedTable("add-coupon")} >Add Coupon</span>
        </a>
      </nav>
      
      {/* Logout */}
      <div className="mt-auto">
        <button className="flex items-center space-x-2 p-2 hover:bg-red-700 w-full text-left rounded" onClick={logout}>
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
