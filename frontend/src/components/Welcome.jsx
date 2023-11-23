import React, { useState } from 'react';
import './Welcome.css';

const Welcome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const slides = [
    { id: 1, image: 'pic1.jpg', alt: 'Slide 1' },
    { id: 2, image: 'logo.jpg', alt: 'Slide 2' },
    // Add more slides as needed
  ];

  return (
        <>
    <div className="welcome-page">
      <div className="blur-bg"></div>
      <div className="black-overlay"></div> 
      <div className="top">
        <h1>Welcome to MonageX</h1>
        <p>Your one-stop destination for all transaction tracking.</p>
      </div>
{/* 
      <div className="slideshow-container">
        <div className="slides" style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={slide.id} className="slide">
              <img
                src={process.env.PUBLIC_URL + `/images/${slide.image}`}
                alt={slide.alt}
              />
            </div>
          ))}
        </div>

        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div> */}

    </div>
        <div className="video-container">
          <p className='demo-heading'>Demo Video</p>
         <video controls width="80%">
          <source src={process.env.PUBLIC_URL + '/images/MonageX_DemoVideo.mp4'} type="video/mp4" />
           Your browser does not support the video tag.
         </video>
       </div>
  </>
  );
};

export default Welcome;
