import React, { useState } from "react";
import axios from "axios";

const UpdateCampaignImages = () => {
    const [campaignId, setCampaignId] = useState("");
    const [banner, setBanner] = useState(null);
    const [logo, setLogo] = useState(null);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!campaignId) {
            return setError("Campaign ID is required.");
        }

        const formData = new FormData();
        formData.append("id", campaignId);
        if (banner) formData.append("banner_url", banner);
        if (logo) formData.append("logo_url", logo);

        try {
            const res = await axios.put(`${apiUrl}/api/update-campaign-images`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            setMessage(res.data.message);
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Something went wrong while updating images.");
            }
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
            <h2 className="text-xl font-semibold mb-4">Update Campaign Images</h2>
            {message && <p className="text-green-600">{message}</p>}
            {error && <p className="text-red-600">{error}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                <div>
                    <label className="block font-medium">Campaign ID</label>
                    <input
                        type="text"
                        value={campaignId}
                        onChange={(e) => setCampaignId(e.target.value)}
                        className="border rounded w-full p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Banner Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBanner(e.target.files[0])}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block font-medium">Logo Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Update Images
                </button>
            </form>
        </div>
    );
};

export default UpdateCampaignImages;
