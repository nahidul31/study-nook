import Image from "next/image";
import { Card, Button, Chip } from "@heroui/react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Icon } from "@iconify/react";
import DeleteOperation from "@/components/DeleteOperation/DeleteOperation";
import EditOperation from "@/components/EditOperation/EditOperation";
import BookingButton from "@/components/BookingAction/BookingButton";

const RoomDetailsPage = async ({ params }) => {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const logInUser = session?.user?.email;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${id}`, {
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
    userEmail,
    bookingCount = 0,
  } = info;

  //
  const isOwner = logInUser && userEmail && logInUser === userEmail;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <Card className="overflow-hidden rounded-3xl bg-white border border-teal-100 shadow-xl">
        <div className="grid lg:grid-cols-2">
          {/* IMAGE */}
          <div className="relative h-[350px] lg:h-auto min-h-[450px]">
            <Image
              src={image}
              alt={roomName}
              fill
              priority
              className="object-cover"
            />
            {/* Floor badge */}
            <div className="absolute top-4 left-4 bg-[#064E4E]/80 text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm">
              <Icon icon="material-symbols:layers-rounded" />
              Floor {floor}
            </div>
            {/* Price badge */}
            <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl font-bold text-teal-600 shadow-lg text-sm">
              ${hourlyRate}
              <span className="text-xs text-slate-400">/hr</span>
            </div>
          </div>

          {/* DETAILS */}
          <div className="p-8 flex flex-col">
            <h1 className="text-4xl font-bold text-slate-800">{roomName}</h1>
            <p className="mt-4 text-slate-500 leading-7">{description}</p>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Icon
                    icon="material-symbols:group"
                    className="text-[#22C7C8] text-lg"
                  />
                  Capacity
                </div>
                <p className="text-xl font-bold mt-1 text-slate-800">
                  {capacity} Seats
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Icon
                    icon="material-symbols:bookmark"
                    className="text-[#22C7C8] text-lg"
                  />
                  Bookings
                </div>
                <p className="text-xl font-bold mt-1 text-slate-800">
                  {bookingCount}
                </p>
              </div>
            </div>

            {/* AMENITIES */}
            <div className="mt-6">
              <p className="font-semibold text-slate-700 mb-3">Amenities</p>
              <div className="flex flex-wrap gap-2 ">
                {amenities?.map((item, index) => (
                  <Chip key={index} variant="solid" size="sm">
                    <div className="flex items-center gap-1">
                      <Icon
                        icon="material-symbols:check-circle-outline"
                        className="text-sm"
                      />
                      {item}
                    </div>
                  </Chip>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            {/* BUTTONS */}
            <div className="mt-auto pt-10 flex gap-3 flex-wrap items-center">
              {/* <Button className="bg-[#22C7C8] text-white rounded-xl font-semibold px-6">
                <Icon icon="material-symbols:calendar-month" width={18} />
                Book Now
              </Button> */}
              <BookingButton info={info} user={session?.user} />
              {isOwner && (
                <div className="flex gap-2">
                  <EditOperation info={info}></EditOperation>

                  <DeleteOperation info={info}></DeleteOperation>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RoomDetailsPage;
