"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import { CarouselProvider } from "@/context/CarouselContext";

function Introduction() {
  const items = ["info1", "Info2", "Info3"];

  return (
    <div className="bg-[#505958] p-5 rounded-3xl">
      <CarouselProvider>
        <Carousel items={items} />
      </CarouselProvider>
    </div>
  );
}

export default Introduction;
