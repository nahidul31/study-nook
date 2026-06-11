import { Icon } from "@iconify/react";

const features = [
  {
    icon: "material-symbols:event-busy-rounded",
    bg: "bg-teal-50",
    text: "text-teal-700",
    title: "No double bookings",
    desc: "Conflict detection blocks overlapping reservations instantly.",
  },
  {
    icon: "mdi:shield-lock",
    bg: "bg-purple-50",
    text: "text-purple-700",
    title: "Secure authentication",
    desc: "JWT + HTTP-only cookies for maximum security.",
  },
  {
    icon: "material-symbols:tune-rounded",
    bg: "bg-amber-50",
    text: "text-amber-800",
    title: "Smart filters",
    desc: "Filter by amenities, floor, name and pricing.",
  },
  {
    icon: "material-symbols:dashboard-rounded",
    bg: "bg-blue-50",
    text: "text-blue-700",
    title: "Personal dashboard",
    desc: "Manage bookings and listings from one place.",
  },
  {
    icon: "material-symbols:apartment-rounded",
    bg: "bg-orange-50",
    text: "text-orange-700",
    title: "List your room",
    desc: "Add your study room and start accepting bookings.",
  },
  {
    icon: "material-symbols:devices-rounded",
    bg: "bg-green-50",
    text: "text-green-700",
    title: "Fully responsive",
    desc: "Optimized for mobile, tablet and desktop.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="max-w-7xl mx-auto px-10 py-20 bg-teal-50 mb-12 rounded-2xl">
      <div className="grid lg:grid-cols-2 gap-14 items-start">
        {/* Left */}
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 text-xs font-medium mb-5">
            <Icon icon="material-symbols:auto-awesome-rounded" width={14} />
            Why choose StudyNook
          </span>

          <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-4">
            Everything you need{" "}
            <span className="text-teal-600">to book smarter</span>
          </h2>

          <p className="text-slate-500 text-sm leading-relaxed max-w-md">
            StudyNook provides a fast, secure and reliable way to discover and
            reserve study spaces — designed to make room booking simple and
            hassle-free.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
              <h3 className="text-3xl font-bold text-teal-600">500+</h3>
              <p className="text-slate-500 text-sm mt-1">Rooms listed</p>
            </div>
            <div className="rounded-2xl bg-slate-50 border border-slate-100 p-5">
              <h3 className="text-3xl font-bold text-teal-600">10K+</h3>
              <p className="text-slate-500 text-sm mt-1">Bookings made</p>
            </div>
          </div>
        </div>

        {/* Right — 2 column feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="flex gap-3 items-start bg-white border border-slate-100 rounded-2xl p-4 shadow-sm"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${f.bg} ${f.text}`}
              >
                <Icon icon={f.icon} width={20} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm mb-1">
                  {f.title}
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
