import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectFade, Navigation, Pagination, Autoplay } from 'swiper/modules';

const ImageSlider = () => {
  const slides = [
    { id: 1, src: 'https://picsum.photos/1200/400?image=1', alt: 'Slide 1' },
    { id: 2, src: 'https://picsum.photos/1200/400?image=2', alt: 'Slide 2' },
    { id: 3, src: 'https://picsum.photos/1200/400?image=3', alt: 'Slide 3' },
  ];

  return (
    <div className="w-full max-w-8xl mx-auto relative">
       
      <Swiper
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Mengaktifkan autoplay dengan delay 3 detik
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <a href={slide.src} target='_blank'>
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
