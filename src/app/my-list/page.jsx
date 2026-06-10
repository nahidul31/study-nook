import RoomCart from "@/components/home-pages/allRooms/RoomCart";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";
import jp from "@/assets/img2/px4.jpg";
import Image from "next/image";
const MyListPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <div className="text-center mt-10">Please login first</div>;
  }
  const tokenData = await auth.api.getToken({
    headers: await headers(),
  });
  const token = tokenData?.token;

  const userEmail = session?.user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-rooms/${userEmail}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );

  const info = await res.json();

  return (
    <div className="mb-10">
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
            My List
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {info?.map((room) => (
          <RoomCart key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default MyListPage;
