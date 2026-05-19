import Image from "next/image";
import React from "react";
import jp from "@/assets/img2/px2.jpg";
import AddRoomForm from "@/components/allfrom/AddRoomFrom";

const AddRoomPage = () => {
  return (
    <div className="">
      <div className="relative w-full h-52 sm:h-60 overflow-hidden ">
        {/* Background Image */}
        <Image
          src={jp}
          alt="add-section-img"
          fill
          className="object-cover"
          priority
        />

        {/* Black gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>

        {/* Text */}
        <div className="absolute inset-0 z-20 flex items-center pl-20">
          <h1 className="text-3xl md:text-4xl font-bold text-white border-b-2">
            Add Room
          </h1>
        </div>
      </div>
      <div>
        <AddRoomForm></AddRoomForm>
      </div>
    </div>
  );
};

export default AddRoomPage;
