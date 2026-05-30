"use client";
import { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import BookingModal from "./BookingModal";

const BookingButton = ({ info, user }) => {
  const [showModal, setShowModal] = useState(false);
  // console.log("info bookingbtn e=", info);
  // console.log("user=", user);

  return (
    <>
      <Button
        onPress={() => setShowModal(true)}
        className="bg-[#22C7C8] text-white rounded-xl font-semibold px-6"
      >
        <Icon icon="material-symbols:calendar-month" width={18} />
        Book Now
      </Button>

      {showModal && (
        <BookingModal
          info={info}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default BookingButton;
