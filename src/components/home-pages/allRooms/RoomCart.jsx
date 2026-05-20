import React from "react";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

const RoomCart = ({ room }) => {
  const {
    _id,
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  return (
    <Card className="group h-full flex flex-col w-full  border border-teal-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden shrink-0">
        <Image
          src={image}
          alt={roomName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Price */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#22C7C8] font-bold text-sm px-3 py-1.5 rounded-xl shadow-md border border-[#22C7C8]/20">
          ${hourlyRate}
          <span className="text-slate-400 font-normal text-xs">/hr</span>
        </div>

        {/* Floor */}
        <div className="absolute top-3 left-3 bg-[#064E4E]/80 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Icon
            icon="material-symbols:layers-rounded"
            className="w-3.5 h-3.5"
          />
          Floor {floor}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-4 flex flex-col flex-grow">
        {/* Title + capacity */}
        <div className="flex items-start justify-between gap-2 min-h-[55px]">
          <h3 className="text-base font-bold text-slate-800 line-clamp-2">
            {roomName}
          </h3>

          <div className="flex items-center gap-1 text-slate-500 text-xs shrink-0 bg-white px-2 py-1 rounded-lg">
            <Icon
              icon="material-symbols:group-rounded"
              className="w-3.5 h-3.5 text-[#22C7C8]"
            />
            {capacity} seats
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 min-h-[48px] mt-2">
          {description}
        </p>

        <div className="h-px bg-slate-200 my-4" />

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 min-h-[72px]">
          {amenities?.slice(0, 4).map((amenity, i) => (
            <span
              key={i}
              className="text-xs bg-white text-teal-700 border border-teal-100 px-2.5 py-1 rounded-lg h-fit"
            >
              {amenity}
            </span>
          ))}
        </div>

        {/* Push footer bottom */}
        <div className="mt-auto pt-5">
          <Link href={`/all-room/${_id}`}>
            <Button
              className="w-full bg-[#22C7C8] text-white font-semibold rounded-xl hover:bg-[#1ab3b4] transition-all duration-150 shadow-md shadow-teal-100"
              endContent={
                <Icon
                  icon="material-symbols:arrow-forward-rounded"
                  className="w-4 h-4"
                />
              }
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default RoomCart;
