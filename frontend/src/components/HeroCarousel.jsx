import React, { useState, useEffect } from "react";

const HeroCarousel = () => {
    const [slides, setSlides] = useState([]);
    const [profile, setProfile] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/hero");
                const data = await response.json();
                setSlides(data);
            } catch (error) {
                console.error("Error fetching slides:", error);
            }
        };

        fetchSlides();
    }, []);

    useEffect(() => {
      const fetchProfile = async () => {
          try {
              const response = await fetch("http://localhost:5000/api/profile");
              const data = await response.json();
              console.log(data)
              setProfile(data);
          } catch (error) {
              console.error("Error fetching slides:", error);
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
    }, [currentSlide, slides.length]);

    if (slides.length === 0) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="relative w-full h-screen bg-gray-900 overflow-hidden">
            {slides.map((slide, index) => {
                const fullImageUrl = `http://localhost:5000${slide.image_url}`;
                console.log("Full Image URL:", fullImageUrl); // Log the full URL

                return (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                            index === currentSlide ? "opacity-100" : "opacity-0"
                        } ${fade ? "fade-in" : "fade-out"}`}
                    >
                        <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${fullImageUrl})` }} // Use the full URL
                        >
                            <div className=" h-screen bg-black bg-opacity-50 p-5">
                              <div className="h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-around">
                                <div className="text-center text-white px-4">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
                                        {slide.title}
                                    </h2>
                                    <p className="text-lg md:text-2xl">
                                        {slide.description}
                                    </p>
                                </div>
                                <div className="relative">
                                <img src={`http://localhost:5000${profile.image}`} className="rounded w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full" alt="" />
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HeroCarousel;
