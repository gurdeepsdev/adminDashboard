import React, { useState } from "react";
import axios from "axios";

const AddCouponForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    offer: "",
    amount: "",
    code: "",
    expiry_date: "",
    seo_title: "",
    seo_description: "",
    slug: "",
    categore:"",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${apiUrl}/api/add-coupon`, formData);
      setSuccess(response.data.message);
      setFormData({
        title: "",
        offer: "",
        amount: "",
        code: "",
        expiry_date: "",
        seo_title: "",
        seo_description: "",
        slug: "",
        categore:"",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add coupon");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add New Coupon</h2>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Coupon Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="offer"
          placeholder="Offer"
          value={formData.offer}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="code"
          placeholder="Coupon Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
  <input
          type="text"
          name="categore"
          placeholder="Add categore"
          value={formData.categore}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          name="expiry_date"
          value={formData.expiry_date}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="seo_title"
          placeholder="SEO Title"
          value={formData.seo_title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          name="seo_description"
          placeholder="SEO Description"
          value={formData.seo_description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        ></textarea>

        <input
          type="text"
          name="slug"
          placeholder="SEO Slug"
          value={formData.slug}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Add Coupon
        </button>
      </form>
    </div>
  );
};

export default AddCouponForm;
