import AllRooms from "@/components/home-pages/allRooms/AllRooms";
import Banner from "@/components/home-pages/Banner";

import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Banner></Banner>
      <div>
        <AllRooms></AllRooms>
      </div>
    </div>
  );
}
