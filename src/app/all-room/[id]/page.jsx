import Image from "next/image";
import { Card, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/rooms/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div className="text-center py-20 text-red-500">Room not found</div>;
  }

  const info = await res.json();

  const {
    roomName,
    description,
    image,
    floor,
    capacity,
    hourlyRate,
    amenities,
    bookingCount = 0,
  } = info;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Card className="overflow-hidden rounded-3xl bg-white border border-teal-100 shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-[350px] lg:h-auto min-h-[450px]">
            <Image
              src={image}
              alt={roomName}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute top-4 left-4 bg-[#064E4E]/80 text-white px-4 py-2 rounded-xl flex items-center gap-2">
              <Icon
                icon="material-symbols:layers-rounded"
                className="text-lg"
              />
              Floor {floor}
            </div>

            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl font-bold text-teal-600 shadow-lg">
              ${hourlyRate}
              <span className="text-xs text-slate-400">/hr</span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 flex flex-col">
            <h1 className="text-4xl font-bold text-slate-800">{roomName}</h1>

            <p className="mt-5 text-slate-500 leading-8">{description}</p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:group"
                    className="text-[#22C7C8]"
                  />

                  <span className="text-sm text-slate-500">Capacity</span>
                </div>

                <h2 className="text-xl font-bold mt-2">{capacity} Seats</h2>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Icon
                    icon="material-symbols:bookmark"
                    className="text-[#22C7C8]"
                  />

                  <span className="text-sm text-slate-500">Booking Count</span>
                </div>

                <h2 className="text-xl font-bold mt-2">{bookingCount}</h2>
              </div>
            </div>

            {/* Amenities */}
            <div className="mt-8">
              <h2 className="font-bold mb-4">Amenities</h2>

              <div className="flex flex-wrap gap-2">
                {amenities?.map((item, index) => (
                  <span
                    key={index}
                    className="bg-teal-50 border border-teal-100 px-3 py-2 rounded-xl text-teal-700 text-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-auto pt-10 flex gap-4 flex-wrap">
              <Button
                className="bg-[#22C7C8] text-white rounded-xl font-semibold"
                endContent={<Icon icon="material-symbols:calendar-month" />}
              >
                Book Now
              </Button>
              {/* login user functionality */}
              <div>
                <Button
                  variant="bordered"
                  startContent={<Icon icon="material-symbols:edit" />}
                >
                  Edit
                </Button>

                <Button
                  color="danger"
                  variant="flat"
                  startContent={<Icon icon="material-symbols:delete-outline" />}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoomDetailsPage;
