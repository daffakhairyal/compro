import React, { useState, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    motto: "",
    vision: "",
    mission: "",
    description: "",
    address: "",
    contactPhone: "",
    email: "",
    instagram: "",
    whatsapp: ""
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil token dari local storage atau state global
  const token = localStorage.getItem('token'); // Ganti dengan metode yang sesuai untuk mengambil token

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token di header
          },
        });
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [token]); // Tambahkan token sebagai dependensi

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Sertakan token di header
        },
      });
      console.log('Profile updated:', response.data);
    } catch (err) {
      setError("Failed to update profile data");
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Form Profil Perusahaan</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.keys(formData).map((key) => (
            <ProfileCard 
              key={key} 
              label={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} 
              value={formData[key]} 
              name={key} 
              onChange={handleChange} 
            />
          ))}
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Simpan Profil
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
