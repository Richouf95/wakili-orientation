import React, { createContext, useContext, useState } from "react";

const CarouselContext = createContext();

export const useCarousel = () => {
  return useContext(CarouselContext);
};

export const CarouselProvider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = (length) => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? length - 1 : prevIndex - 1));
  };

  const nextSlide = (length) => {
    setCurrentIndex((prevIndex) => (prevIndex === length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <CarouselContext.Provider value={{ currentIndex, prevSlide, nextSlide }}>
      {children}
    </CarouselContext.Provider>
  );
};
