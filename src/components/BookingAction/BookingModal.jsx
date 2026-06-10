"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { authClient } from "@/lib/auth-client";

const TIME_SLOTS = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const BookingModal = ({ info, user, onClose }) => {
  const room = info;
  // console.log("roomModal=", room);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [specialNote, setSpecialNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const endTimeOptions = TIME_SLOTS.filter((t) => startTime && t > startTime);

  // FIXED
  const getHour = (time) => Number(time.split(":")[0]);

  const totalCost =
    startTime && endTime
      ? (getHour(endTime) - getHour(startTime)) * room.hourlyRate
      : 0;

  const handleBooking = async () => {
    setError("");

    if (!date || !startTime || !endTime) {
      setError("Please fill in all fields.");
      return;
    }
    const bookingData = {
      roomId: room._id,
      roomName: room.roomName,
      date,
      startTime,
      endTime,
      totalCost,
      specialNote,
      userEmail: user?.email,
      userName: user?.displayName || user?.name,
      image: room.image,
    };
    // console.log(room);
    // console.log(room.image);
    const { data: tokenData } = await authClient.token();
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },

          body: JSON.stringify(bookingData),
        },
      );
      console.log(bookingData);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Booking failed!");
        return;
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 text-center max-w-sm w-full mx-4">
          <Icon
            icon="material-symbols:check-circle"
            className="text-green-500 text-6xl mx-auto mb-4"
          />

          <h2 className="text-xl font-bold mb-2">Booking Confirmed!</h2>

          <p className="text-gray-500 mb-6">
            {room.roomName} — {date}, {startTime} to {endTime}
          </p>

          <Button
            onPress={onClose}
            className="bg-[#22C7C8] text-white w-full rounded-xl"
          >
            Done
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 relative">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-800">
            Book — {room.roomName}
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon icon="material-symbols:close" className="text-2xl" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date
            </label>

            <input
              type="date"
              min={today}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Start Time
            </label>

            <select
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value);
                setEndTime("");
              }}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-400"
            >
              <option value="">Select start time</option>

              {TIME_SLOTS.slice(0, -1).map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              End Time
            </label>

            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!startTime}
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-400 disabled:opacity-50"
            >
              <option value="">Select end time</option>

              {endTimeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-teal-50 rounded-xl px-4 py-3 flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Cost</span>

            <span className="font-bold text-teal-600 text-lg">
              ${totalCost}
            </span>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Special Note
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>

            <textarea
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              rows={3}
              placeholder="Any special requirements..."
              className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-400 resize-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg flex items-center gap-2">
              <Icon icon="material-symbols:error-outline" />
              {error}
            </div>
          )}

          <Button
            onPress={handleBooking}
            isLoading={loading}
            className="bg-[#22C7C8] text-white w-full rounded-xl font-semibold"
          >
            Confirm Booking
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
