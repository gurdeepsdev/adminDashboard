import React, { useState } from 'react';
import API from '../api/api';

function BrandForm() {
  const [form, setForm] = useState({
    brand_name: '',
    seo_title: '',
    seo_des: '',
    brand_img: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'brand_img') {
      setForm({ ...form, brand_img: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in form) data.append(key, form[key]);

    try {
      await API.post('/add-brands', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Brand uploaded');
         // Reset form
         setForm({
          brand_name: '',
          seo_title: '',
          seo_des: '',
          brand_img: null
        });
        // Optional: reset file input manually
        e.target.reset();
    } catch (err) {
      console.error(err);
      alert('Error uploading brand');
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200 mb-10"
  >
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Brand</h2>

    {/* Brand Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
      <input
        type="text"
        name="brand_name"
        value={form.brand_name}
        placeholder="Enter Brand Name"
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* SEO Title */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
      <input
        type="text"
        name="seo_title"
        value={form.seo_title}
        placeholder="Enter SEO Title"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* SEO Description */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
      <input
        type="text"
        name="seo_des"
        value={form.seo_des}
        placeholder="Enter SEO Description"
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>

    {/* Brand Image Upload */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Brand Image</label>
      <input
        type="file"
        name="brand_img"
        accept="image/*"
        onChange={handleChange}
        required
        className="w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>

    {/* Submit Button */}
    <div className="text-center pt-2">
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition duration-200 shadow-md"
      >
        Upload Brand
      </button>
    </div>
  </form>
  
  );
}

export default BrandForm;
