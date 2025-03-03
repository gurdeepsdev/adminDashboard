import { createContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from './context/ProtectedRoute';
import Sidebar from './component/Sidebar';
import Dashboard from './pages/Dashboard';
import ManageAdmins from './pages/ManageAdmins';
import Home from "./pages/Home"; 
import Login from "./pages/Login";

// Create AuthContext
export const AuthContext = createContext();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ✅ Check session storage on app load
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("admin", JSON.stringify({ loggedIn: true }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin");
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Login />} />

          {/* Protected Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/manage-admins" element={<ProtectedRoute><ManageAdmins /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
