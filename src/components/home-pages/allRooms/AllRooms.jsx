import { ArrowRight } from "@gravity-ui/icons";
import RoomCart from "./RoomCart";
import Link from "next/link";
import RoomFilter from "@/components/filtter/RoomFilter";

export default async function AllRooms() {
  const res = await fetch("http://localhost:5000/rooms/latest", {
    cache: "no-store",
  });

  const info = await res.json();

  return (
    <div className="max-w-7xl mx-auto mt-12">
      {/* <h1 className="text-4xl font-bold text-cyan-500">
        <span className="border-b-2 border-cyan-200">All Room</span>
      </h1> */}

      <div className="mt-6">
        <RoomFilter initialRooms={info} />
      </div>

      {info.length >= 6 && (
        <Link href="/all-rooms">
          <div className="flex items-center gap-2 justify-end mt-3 text-teal-600">
            <span>Show More</span>
            <ArrowRight />
          </div>
        </Link>
      )}
    </div>
  );
}
