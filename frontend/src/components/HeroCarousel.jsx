import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import { motion } from "framer-motion"; // Untuk animasi loading

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [profile, setProfile] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);
    const [isLoading, setIsLoading] = useState(true); // Untuk state loading

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/hero");
                setSlides(response.data); // Menggunakan axios untuk fetch data
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/profile");
                setProfile(response.data);
                setIsLoading(false); // Set loading selesai setelah data diambil
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;

        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
                setFade(true);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [slides.length]);

    // Loading screen estetik
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <motion.div
                    className="w-16 h-16 border-4 border-t-4 border-gray-300 rounded-full animate-spin"
                    style={{ borderTopColor: "#3498db" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                ></motion.div>
                <motion.div
                    className="mt-4 text-gray-600 text-xl font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    Loading...
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="w-full h-screen bg-gray-900 overflow-hidden">
                {slides.map((slide, index) => {
                    const fullImageUrl = `http://localhost:5000${slide.image_url}`;

                    return (
                        <div
                            key={slide.id}
                            className={`absolute inset-0 transition-opacity duration-500 ${
                                index === currentSlide ? "opacity-100 z-20" : "opacity-0 z-10"
                            }`}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${fullImageUrl})` }}
                            >
                                <div className="h-full bg-black bg-opacity-50 p-5">
                                    <div className="h-full mt-8 md:mt-0 flex flex-col-reverse md:flex-row items-center justify-center md:justify-around">
                                        <div className="text-center text-white px-4 m-2">
                                            <h2 className="text-4xl md:text-6xl font-bold mb-4">
                                                {slide.title}
                                            </h2>
                                            <p className="text-lg md:text-2xl">
                                                {slide.description}
                                            </p>
                                            <button
                                                className="m-3 py-3 px-5 rounded-full text-md font-semibold bg-gradient-to-r from-teal-400 to-blue-500 duration-300 transform hover:bg-red-600 hover:scale-110"
                                            >
                                                GET STARTED
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <img src={`http://localhost:5000${profile.image}`} className="rounded w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full object-cover" alt="Profile" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default HeroCarousel;
