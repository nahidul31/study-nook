"use client";
import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

import "./styles.css";
import b4 from "@/assets/banner-img/b4.jpg";
import b5 from "@/assets/banner-img/b5.jpg";
import b8 from "@/assets/banner-img/b8.jpg";
import b9 from "@/assets/banner-img/b9.jpg";
import b10 from "@/assets/banner-img/b10.jpg";
import b2 from "@/assets/banner-img/b2.jpg";
// import required modules
import { EffectCards } from "swiper/modules";
import Image from "next/image";

export default function SwiperDiv() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Image src={b8} width={300} height={400} alt="banner img"></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={b9} width={300} height={400} alt="banner img"></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={b4} width={300} height={400} alt="banner img"></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={b10} width={300} height={400} alt="banner img"></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={b5} width={300} height={400} alt="banner img"></Image>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
