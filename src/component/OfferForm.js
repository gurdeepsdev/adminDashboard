import React, { useState, useEffect } from 'react';
import API from '../api/api';

function OfferForm() {
  const [brands, setBrands] = useState([]);
  const [form, setForm] = useState({
    brand_id: '',
    title: '',
    url: '',

    description: '',
    offer: '',
    coupon_code: '',
    status: 'active'
  });

  useEffect(() => {
    API.get('/all-brands')
      .then(res => setBrands(res.data))
      .catch(err => console.error('Failed to load brands', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/add-offers', form);
      alert('Offer uploaded');

    // ✅ Reset the form
    setForm({
        brand_id: '',
        title: '',
        url:'',
        description: '',
        offer: '',

        coupon_code: '',
        status: 'active'
      });
    } catch (err) {
      console.error(err);
      alert('Error uploading offer');
    }
  };

  return (
<form
  onSubmit={handleSubmit}
  className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200"
>
  <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Add Offer</h2>

  {/* Brand Dropdown */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Select Brand</label>
    <select
      name="brand_id"
      value={form.brand_id}
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select Brand --</option>
      {brands.map(brand => (
        <option key={brand.id} value={brand.id}>
          {brand.brand_name}
        </option>
      ))}
    </select>
  </div>

  {/* Title */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
    <input
      type="text"
      name="title"
      value={form.title}
      placeholder="Enter Offer Title"
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
    <input
      type="text"
      name="url"
      value={form.url}
      placeholder="Enter Offer URL"
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <input
      type="text"
      name="description"
      value={form.description}
      placeholder="Description (optional)"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Offer */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Offer Details</label>
    <input
      type="text"
      name="offer"
      value={form.offer}
      placeholder="e.g. Flat 50% Off"
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Coupon Code */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code</label>
    <input
      type="text"
      name="coupon_code"
      value={form.coupon_code}
      placeholder="Enter Coupon Code"
      onChange={handleChange}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* Status */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
    <select
      name="status"
      value={form.status}
      onChange={handleChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div>

  {/* Submit Button */}
  <div className="text-center pt-2">
    <button
      type="submit"
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
    >
      Upload Offer
    </button>
  </div>
</form>

  
  );
}

export default OfferForm;
