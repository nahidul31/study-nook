"use client";

import { useEffect, useState, useCallback } from "react";
import RoomCart from "../home-pages/allRooms/RoomCart";

const AMENITIES = [
  "Wi-Fi",
  "Projector",
  "Whiteboard",
  "Air Conditioning",
  "Power Outlets",
  "Quiet Zone",
];

export default function RoomFilter({ initialRooms }) {
  const [rooms, setRooms] = useState(initialRooms);
  const [search, setSearch] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [minRate, setMinRate] = useState("");
  const [maxRate, setMaxRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showFilter, setShowFilter] = useState(false); // ← নতুন

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedAmenities.length > 0)
        params.append("amenities", selectedAmenities.join(","));
      if (minRate) params.append("minRate", minRate);
      if (maxRate) params.append("maxRate", maxRate);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?${params.toString()}`, // ✅ fix
      );
      if (!res.ok) throw new Error("Failed to fetch rooms");
      const data = await res.json();
      setRooms(data);
    } catch (err) {
      setError("Could not load rooms. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [search, selectedAmenities, minRate, maxRate]);

  useEffect(() => {
    const timer = setTimeout(() => fetchRooms(), 400);
    return () => clearTimeout(timer);
  }, [fetchRooms]);

  const toggleAmenity = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item],
    );
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedAmenities([]);
    setMinRate("");
    setMaxRate("");
  };

  const FilterPanel = (
    <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-5 ">
      <div>
        <label className="text-sm font-medium">Search</label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search room..."
          className="w-full border p-3 rounded-xl mt-1"
        />
      </div>
      <div>
        <label className="text-sm font-medium">Price Range</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            value={minRate}
            onChange={(e) => setMinRate(e.target.value)}
            placeholder="Min"
            className="border p-2 rounded-xl w-full"
          />
          <input
            type="number"
            value={maxRate}
            onChange={(e) => setMaxRate(e.target.value)}
            placeholder="Max"
            className="border p-2 rounded-xl w-full"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium">Amenities</label>
        <div className="flex flex-col gap-2 mt-2">
          {AMENITIES.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedAmenities.includes(item)}
                onChange={() => toggleAmenity(item)}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={resetFilters}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
      >
        Reset Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 pb-3 ">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-cyan-600">
          Find Your Perfect Room
        </h1>
        <p className="text-gray-500 mt-2">
          Search, filter and book meeting rooms instantly
        </p>
      </div>

      {/* Mobile Filter Toggle Button */}
      <div className="md:hidden mb-4 ">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="w-full bg-cyan-600 text-white py-2 rounded-xl font-medium"
        >
          {showFilter ? "Hide Filters ▲" : "Show Filters ▼"}
        </button>
        {showFilter && <div className="mt-3">{FilterPanel}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-20">{FilterPanel}</div>
        </div>

        {/* Rooms */}
        <div className="md:col-span-3 ">
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-100 rounded-2xl animate-pulse"
                />
              ))}
            </div>
          ) : rooms.length === 0 ? (
            <p className="text-gray-500 text-center mt-10">No rooms found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCart key={room._id} room={room} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
