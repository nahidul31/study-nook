import { ArrowRight } from "@gravity-ui/icons";
import RoomCart from "./RoomCart";
import Link from "next/link";

const AllRooms = async () => {
  const res = await fetch("http://localhost:5000/rooms/latest");
  const info = await res.json();
  //   console.log(info);
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h1 className="text-4xl font-bold text-cyan-500">
        <span className="border-b-2 border-cyan-200">All Room</span>{" "}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {info.map((room) => (
          <RoomCart key={room._id} room={room}></RoomCart>
        ))}
      </div>
      {info.length > 6 && (
        <Link href={"/all-room"}>
          <div className="flex items-center gap-2 justify-end mt-3 text-teal-600">
            <span>Show More</span>
            <ArrowRight />
          </div>
        </Link>
      )}
      {/* <div className="flex items-center gap-2 justify-end mt-3 text-teal-600">
        <span>Show More</span>
        <ArrowRight></ArrowRight>
      </div> */}
    </div>
  );
};

export default AllRooms;
