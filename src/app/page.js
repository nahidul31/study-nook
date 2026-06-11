import AllRooms from "@/components/home-pages/allRooms/AllRooms";
import Banner from "@/components/home-pages/Banner";
import PlatformStats from "@/components/home-pages/Stats";
import HowItWorks from "@/components/home-pages/uiIdea";
import WhyChooseUs from "@/components/home-pages/WhyChooseUs";

import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <div>
        <AllRooms></AllRooms>
        <HowItWorks></HowItWorks>
        <PlatformStats></PlatformStats>
        <WhyChooseUs></WhyChooseUs>
      </div>
    </div>
  );
}
