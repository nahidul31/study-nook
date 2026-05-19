"use client";

const AddRoomForm = () => {
  const handleSubmit = async (formData) => {
    const data = {
      roomName: formData.get("roomName"),
      description: formData.get("description"),
      image: formData.get("image"),
      floor: formData.get("floor"),
      capacity: formData.get("capacity"),
      hourlyRate: formData.get("hourlyRate"),
      amenities: formData.getAll("amenities"),
    };

    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <form action={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="roomName"
              placeholder="Room Name"
              required
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />

            <input
              type="text"
              name="floor"
              placeholder="Floor (e.g. 3rd Floor)"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />

            <input
              type="number"
              name="capacity"
              placeholder="Capacity"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />

            <input
              type="number"
              name="hourlyRate"
              placeholder="Hourly Rate ($)"
              className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Room Description..."
            rows="4"
            required
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
          />

          {/* Image */}
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            className="w-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/20 outline-none p-3 rounded-xl transition"
          />

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
                  <input
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
          <button
            type="submit"
            className="w-full bg-linear-to-r from-teal-400 via-cyan-500 to-sky-500 hover:bg-teal-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Submit Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomForm;
