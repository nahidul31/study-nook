"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Chip, Button } from "@heroui/react";
import CancelModal from "./CancelModal";
import Image from "next/image";
import jp from "@/assets/img2/px4.jpg";
const MyBookingsClient = ({ bookings, user }) => {
  const [bookingList, setBookingList] = useState(bookings);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const today = new Date().toISOString().split("T")[0];

  const canCancel = (booking) =>
    booking.status === "confirmed" && booking.date >= today;

  const handleCancelled = (id) => {
    setBookingList((prev) =>
      prev.map((b) => (b._id === id ? { ...b, status: "cancelled" } : b)),
    );
    setSelectedBooking(null);
  };

  if (bookingList.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <Icon
          icon="material-symbols:calendar-month"
          className="text-6xl text-gray-300 mx-auto mb-4"
        />
        <p className="text-gray-400 text-lg">You have no bookings yet.</p>
      </div>
    );
  }

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
            My List
          </h1>
        </div>
      </div>

      <div className="space-y-4  mt-8 mb-8 max-w-6xl mx-auto">
        {bookingList.map((booking) => (
          <div
            key={booking._id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
          >
            {/* IMAGE ADDED HERE */}
            <div className="relative w-full sm:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0">
              <Image
                src={booking.image || "/placeholder.jpg"}
                alt={booking.roomName}
                fill
                sizes="(max-width: 640px) 100vw, 160px"
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-semibold text-slate-800 text-lg">
                  {booking.roomName}
                </h2>

                <Chip
                  size="sm"
                  className={
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-600"
                  }
                >
                  {booking.status}
                </Chip>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Icon icon="material-symbols:calendar-today" />
                  {booking.date}
                </span>

                <span className="flex items-center gap-1">
                  <Icon icon="material-symbols:schedule" />
                  {booking.startTime} — {booking.endTime}
                </span>

                <span className="flex items-center gap-1">
                  <Icon icon="material-symbols:payments" />${booking.totalCost}
                </span>
              </div>

              {booking.specialNote && (
                <p className="text-xs text-gray-400 mt-2 italic">
                  Note: {booking.specialNote}
                </p>
              )}
            </div>

            {/* Cancel button */}
            {canCancel(booking) && (
              <Button
                onPress={() => setSelectedBooking(booking)}
                className="bg-red-50 text-red-600 rounded-xl font-semibold border border-red-100"
                size="sm"
              >
                <Icon icon="material-symbols:cancel-outline" />
                Cancel
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* Cancel Modal */}
      {selectedBooking && (
        <CancelModal
          booking={selectedBooking}
          user={user}
          onClose={() => setSelectedBooking(null)}
          onCancelled={handleCancelled}
        />
      )}
    </div>
  );
};

export default MyBookingsClient;
