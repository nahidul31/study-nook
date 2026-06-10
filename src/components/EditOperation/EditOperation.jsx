"use client";

import { authClient } from "@/lib/auth-client";
import { Pencil } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const EditOperation = ({ info }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const closeRef = useRef(null);

  const {
    _id,
    roomName,
    floor,
    capacity,
    hourlyRate,
    description,
    image,
    amenities = [],
  } = info;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);

      const amenitiesData = formData.getAll("amenities");

      const room = Object.fromEntries(
        [...formData.entries()].filter(([key]) => key !== "amenities"),
      );

      room.capacity = Number(room.capacity);
      room.hourlyRate = Number(room.hourlyRate);
      room.amenities = amenitiesData;
      const { data: tokenData } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/rooms/${_id}`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify(room),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Room updated successfully!");
        closeRef.current?.click();
        router.refresh();
      } else {
        toast.error("No changes were made.");
      }
    } catch (err) {
      console.error("Edit room error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full border border-gray-200 p-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-400 bg-white";
  const labelClass = "mb-1 text-sm font-medium text-slate-600";

  return (
    <Modal>
      <Modal.Trigger>
        <Button
          variant="outline"
          className="border-teal-400 text-teal-600 rounded-xl"
        >
          <Icon icon="material-symbols:edit-outline" width={18} />
          Edit
        </Button>
      </Modal.Trigger>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="w-full max-w-2xl mx-auto">
            <Modal.CloseTrigger ref={closeRef} />

            <Modal.Header className="px-6 pt-6 pb-2">
              <Modal.Icon className="bg-teal-50 text-teal-600">
                <Pencil />
              </Modal.Icon>
              <Modal.Heading className="text-xl font-bold text-slate-800">
                Edit Room
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="max-h-[65vh] overflow-y-auto px-6 py-4">
              <form
                id="edit-form"
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={labelClass}>Room Name</p>
                    <input
                      defaultValue={roomName}
                      type="text"
                      name="roomName"
                      required
                      placeholder="Enter room name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <p className={labelClass}>Floor</p>
                    <input
                      defaultValue={floor}
                      type="text"
                      name="floor"
                      required
                      placeholder="e.g. 2nd Floor"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <p className={labelClass}>Capacity</p>
                    <input
                      defaultValue={capacity}
                      type="number"
                      name="capacity"
                      required
                      min={1}
                      placeholder="e.g. 10"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <p className={labelClass}>Hourly Rate ($)</p>
                    <input
                      defaultValue={hourlyRate}
                      type="number"
                      name="hourlyRate"
                      required
                      min={1}
                      placeholder="e.g. 15"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <p className={labelClass}>Description</p>
                  <textarea
                    defaultValue={description}
                    name="description"
                    rows={3}
                    required
                    placeholder="Describe the room..."
                    className={inputClass}
                  />
                </div>

                <div>
                  <p className={labelClass}>Image URL</p>
                  <input
                    defaultValue={image}
                    type="text"
                    name="image"
                    required
                    placeholder="https://..."
                    className={inputClass}
                  />
                </div>

                <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl">
                  <p className="font-semibold text-slate-700 mb-3 text-sm">
                    Amenities
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        className="flex items-center gap-2 cursor-pointer text-sm text-slate-600"
                      >
                        <input
                          type="checkbox"
                          name="amenities"
                          value={item}
                          defaultChecked={amenities.includes(item)}
                          className="accent-teal-500 w-4 h-4"
                        />
                        {item}
                      </label>
                    ))}
                  </div>
                </div>
              </form>
            </Modal.Body>

            <Modal.Footer className="px-6 py-4 border-t border-slate-100">
              <Button
                type="submit"
                form="edit-form"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-teal-400 via-cyan-500 to-sky-500 text-white font-semibold rounded-xl py-3"
              >
                <Icon icon="material-symbols:save-outline" width={18} />
                {isSubmitting ? "Saving..." : "Update Room"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditOperation;
