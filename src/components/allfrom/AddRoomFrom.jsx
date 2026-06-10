"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Form, Input } from "@heroui/react";

import { createAuthClient } from "better-auth/react";
import toast from "react-hot-toast";

const AddRoomForm = () => {
  const {
    data: session,
    isPending,
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const user = session?.user;
  const handleSubmit = async (formData) => {
    const roomData = {
      roomName: formData.get("roomName"),
      description: formData.get("description"),
      image: formData.get("image"),
      floor: formData.get("floor"),
      capacity: formData.get("capacity"),
      hourlyRate: formData.get("hourlyRate"),
      amenities: formData.getAll("amenities"),
      userEmail: user?.email,
    };
    const { data: tokenData } = await authClient.token();
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${tokenData?.token}`,
      },
      body: JSON.stringify(roomData),
    });

    const data = await res.json();

    // console.log(data);
    if (data.acknowledged) {
      toast.success("Add your data successfully !");
    } else {
      toast.error("Failed to add data. Please try again!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <Form action={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Room Name */}
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Room Name
              </p>
              <input
                type="text"
                name="roomName"
                placeholder="Room Name"
                required
                className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
              />
            </div>

            {/* Floor */}
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Floor</p>
              <input
                type="text"
                name="floor"
                placeholder="Floor (e.g. 3rd Floor)"
                className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
              />
            </div>

            {/* Capacity */}
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">Capacity</p>
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
              />
            </div>

            {/* Hourly Rate */}
            <div>
              <p className="mb-1 text-sm font-medium text-gray-700">
                Hourly Rate
              </p>
              <input
                type="number"
                name="hourlyRate"
                placeholder="Hourly Rate ($)"
                className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">
              Description
            </p>
            <textarea
              name="description"
              placeholder="Room Description..."
              rows="4"
              required
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />
          </div>

          {/* Image */}
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">Image URL</p>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />
          </div>

          {/* Amenities */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="font-semibold mb-3">Amenities</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              {[
                "Whiteboard",
                "Projector",
                "Wi-Fi",
                "Power Outlets",
                "Quiet Zone",
                "Air Conditioning",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Input
                    type="checkbox"
                    name="amenities"
                    value={item}
                    className="accent-black"
                  />
                  {item}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-linear-to-r from-teal-400 via-cyan-500 to-sky-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Submit Room
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default AddRoomForm;
