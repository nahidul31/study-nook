"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const CancelModal = ({ booking, user, onClose, onCancelled }) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    setLoading(true);
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${booking._id}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ userEmail: user?.email }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to cancel");
        return;
      }

      toast.success("Booking cancelled");
      onCancelled(booking._id);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 text-center">
        <Icon
          icon="material-symbols:warning-rounded"
          className="text-5xl text-yellow-400 mx-auto mb-3"
        />
        <h2 className="text-xl font-bold text-slate-800 mb-2">
          Cancel Booking?
        </h2>
        <p className="text-gray-500 text-sm mb-6">
          <span className="font-medium">{booking.roomName}</span> —{" "}
          {booking.date}, {booking.startTime} to {booking.endTime}
          <br />
          This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button
            onPress={onClose}
            className="flex-1 bg-gray-100 text-gray-700 rounded-xl"
          >
            Keep Booking
          </Button>
          <Button
            onPress={handleCancel}
            isLoading={loading}
            className="flex-1 bg-red-500 text-white rounded-xl font-semibold"
          >
            Yes, Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
