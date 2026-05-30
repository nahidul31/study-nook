import RoomCart from "@/components/home-pages/allRooms/RoomCart";
import Image from "next/image";

import jp from "@/assets/img2/px1.jpg";
const AllRoomDataPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
  const info = await res.json();
  return (
    <div className=" ">
      <div className="relative w-full h-40 sm:h-44 overflow-hidden ">
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
            All Room
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {info.map((room) => (
          <RoomCart key={room._id} room={room}></RoomCart>
        ))}
      </div>
    </div>
  );
};

export default AllRoomDataPage;
