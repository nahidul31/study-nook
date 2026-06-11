import { Icon } from "@iconify/react";

const stats = [
  {
    icon: "material-symbols:meeting-room-rounded",
    bg: "bg-teal-50",
    text: "text-teal-700",
    bar: "after:bg-teal-500",
    value: "500+",
    label: "Rooms available",
  },
  {
    icon: "material-symbols:event-available-rounded",
    bg: "bg-purple-50",
    text: "text-purple-700",
    bar: "after:bg-purple-500",
    value: "10K+",
    label: "Bookings completed",
  },
  {
    icon: "material-symbols:groups-rounded",
    bg: "bg-blue-50",
    text: "text-blue-700",
    bar: "after:bg-blue-500",
    value: "5K+",
    label: "Happy students",
  },
  {
    icon: "material-symbols:star-rounded",
    bg: "bg-amber-50",
    text: "text-amber-800",
    bar: "after:bg-amber-500",
    value: "4.9",
    label: "Average rating",
  },
];

export default function PlatformStats() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`relative bg-white border border-slate-100 rounded-2xl p-6 text-center shadow-sm overflow-hidden
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] ${stat.bar}`}
          >
            <div
              className={`w-11 h-11 mx-auto mb-4 rounded-xl flex items-center justify-center ${stat.bg} ${stat.text}`}
            >
              <Icon icon={stat.icon} width={24} />
            </div>
            <h3 className="text-3xl font-bold text-slate-800">{stat.value}</h3>
            <p className="mt-1.5 text-slate-500 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
