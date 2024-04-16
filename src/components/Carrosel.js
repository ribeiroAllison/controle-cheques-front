import React, { useState } from 'react';
import styles from "@/styles/landpage/Carrosel.module.css"
import Image from 'next/image';


const TestimonialsCarousel = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className={styles.testimonialCtr}>
      <div className={styles.testimonial}>
        <p>{`"${testimonials[activeIndex].text}"`}</p>
        <div className={styles.signature}>
          <Image
            src={testimonials[activeIndex].image}
            height={50}
            width={50}
            alt="foto de perfil"
          />
          <p className={styles.user}>{`- ${testimonials[activeIndex].user}`}</p>
        </div>
      </div>
      <div className={styles.buttonCtr}>
        <button onClick={handleNext}> Anterior </button>
        <button onClick={handlePrev}> Proximo </button>
      </div>
    </div>
  );
};




export default TestimonialsCarousel;
