import { useContext, useState } from 'react';
import { AuthContext } from "../App"; // Ensure the correct import path


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const { login } = useContext(AuthContext);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // ✅ Input validation
    if (!email || !password) {
        setError("Both fields are required.");
        return;
    }

    console.log("🔹 Login Attempt:", { email, password });

    try {
        // ✅ Send request to API
        const response = await fetch("http://localhost:5000/api/adminlogin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include", // Include cookies (if applicable)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        console.log("✅ Login Successful!", data);

        // ✅ Store admin data in localStorage
        localStorage.setItem("admin", JSON.stringify(data.admin));

        // ✅ Redirect or update UI state (optional)
        alert("Login Successful!");
        window.location.href = "/home"; // Change to your actual dashboard route

    } catch (error) {
        console.error("❌ Login error:", error);
        setError(error.message || "An error occurred. Please try again.");
    }
};


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    // Simulating authentication
    console.log("Logging in with", { email, password });

    setError(""); // Clear errors
    alert("Login Successful! (Simulated)");
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        
        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        <form onSubmit={handleLogin} className="mt-4">
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Forgot password raise a qury?{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Message
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
