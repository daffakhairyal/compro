import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { RiProfileFill } from "react-icons/ri";
import { RiGalleryLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import { FaPager } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdOutlineTipsAndUpdates } from "react-icons/md";


const GalleryMenu = () => {
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
          <h1 className="text-xl font-bold text-gray-800">Gallery</h1>
          <div className='flex justify-between'>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
              className="bg-red-500 text-white px-4 py-2 m-1 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
            <button className='bg-yellow-500 text-white px-4 py-2 m-1 rounded-lg' onClick={() => navigate('/dashboard')} >
              Back
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-20 p-6">
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {data ? (  // Memperbarui kondisi rendering untuk memeriksa data
          <div>
          
            <div className='grid grid-cols-2 gap-2 m-3'>
              <button onClick={buttonA} className="bg-blue-500 text-white p-4 md:p-[70px] duration-300 rounded-lg hover:bg-blue-600">
                <div className='flex flex-col items-center'>
                <FaPager className='text-6xl'/> Hero Section
                </div>
              </button>
              <button className="bg-green-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-green-600" >
              <div className='flex flex-col items-center'>
                <FaQuestionCircle className='text-6xl'/> About
                </div>
              </button>
              <button className="bg-yellow-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-yellow-600"  onClick={() => navigate('/dashboard/menu/gallery')} >
              <div className='flex flex-col items-center'>
                <GrGallery className='text-6xl'/> Gallery
                </div>
              </button>
              <button className="bg-red-500 text-white p-4 md:p-[70px] rounded-lg duration-300 hover:bg-red-600">
              <div className='flex flex-col items-center'>
                <MdOutlineTipsAndUpdates className='text-6xl'/> Update
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

export default GalleryMenu;
