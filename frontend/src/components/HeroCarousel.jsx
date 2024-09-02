// HeroCarousel.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HeroCarousel.css'; // Impor CSS khusus untuk efek fade

const HeroCarousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true); // Menambahkan state untuk efek fade

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/hero');
        setSlides(response.data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      }
    };

    fetchSlides();

    const interval = setInterval(() => {
      setFade(false); // Mulai efek fade out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        setFade(true); // Mulai efek fade in
      }, 500); // Durasi fade out sebelum mengubah slide
    }, 5000); // Ganti slide setiap 5 detik

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.length > 0 && (
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${fade ? 'fade-in' : 'fade-out'} hero-background`} // Tambahkan kelas hero-background
          style={{ backgroundImage: `url(http://localhost:5000${slides[currentIndex].image_url})` }} // Tambahkan URL dasar
        >
          <div className="flex flex-col justify-center items-center h-full bg-black bg-opacity-50">
            <h2 className="text-4xl font-bold text-white">{slides[currentIndex].title}</h2>
            <p className="mt-2 text-lg text-gray-300">{slides[currentIndex].description}</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-500'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
