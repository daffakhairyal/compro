import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiProfileFill } from "react-icons/ri";
import { RiGalleryLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import ImageSlider from './ImageSlider';

const Dashboard = () => {
  const [data, setData] = useState(null); // Set awal ke null
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return; // Hentikan eksekusi jika tidak ada token
      }

      try {
        const response = await axios.get('http://localhost:5000/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
        // Menangani kesalahan jika terjadi, misalnya jika token tidak valid
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchData();
  }, [navigate]);

  // Fungsi yang akan dijalankan ketika tombol "A" diklik
  const buttonA = () => {
    console.log('Button A clicked');
    // Tambahkan logika tambahan di sini
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <nav className="bg-white shadow-md p-4 fixed top-0 w-screen z-20">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </nav>

      <main className="container mx-auto mt-20 p-6">
        <h2 className="text-2xl font-bold mb-4">Welcome {data ? data.name : 'User'}!</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {data ? (  // Memperbarui kondisi rendering untuk memeriksa data
          <div>
            <ImageSlider />
            <div className='grid grid-cols-2 gap-2 m-3'>
              <button onClick={buttonA} className="bg-blue-500 text-white p-4 md:p-[70px] duration-300 rounded-lg hover:bg-blue-600">
                <div className='flex flex-col items-center'>
                <RiProfileFill className='text-6xl'/> Profile
                </div>
              </button>
              <button className="bg-green-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-green-600">
              <div className='flex flex-col items-center'>
                <RiGalleryLine className='text-6xl'/> Gallery
                </div>
              </button>
              <button className="bg-yellow-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-yellow-600"  onClick={() => navigate('/dashboard/account')} >
              <div className='flex flex-col items-center'>
                <MdAccountCircle className='text-6xl'/> Account
                </div>
              </button>
              <button className="bg-red-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-red-600">
              <div className='flex flex-col items-center'>
                <IoMdInformationCircle className='text-6xl'/> Job
                </div>
              </button>
            </div>
            </div>
          ) : (
            <p>Loading...</p> // Mengubah pesan saat data sedang dimuat
          )}

        </div>
      </main>

      <p className='p-3'>Created by Daffa Khairy Almayrizq</p>
    </div>
  );
};

export default Dashboard;
