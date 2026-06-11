import { Icon } from "@iconify/react";

const steps = [
  {
    num: "01",
    icon: "material-symbols:search-rounded",
    title: "Browse & Filter",
    desc: "Search rooms by amenities, floor, capacity and pricing to find the perfect study space.",
  },
  {
    num: "02",
    icon: "material-symbols:calendar-month-rounded",
    title: "Choose Schedule",
    desc: "Select your preferred date and time slot. Conflicting bookings are blocked automatically.",
  },
  {
    num: "03",
    icon: "material-symbols:check-circle-rounded",
    title: "Confirm Booking",
    desc: "Get instant confirmation and manage all your bookings from your personal dashboard.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="relative overflow-hidden py-10 md:py-12 bg-cover bg-center bg-no-repeat mt-10"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1920")',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/95 via-slate-900/90 to-teal-950/90" />

      {/* Blur Effects */}
      <div className="absolute top-0 left-0 h-80 w-80 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 backdrop-blur-md border border-teal-500/20 text-teal-300 text-sm font-medium">
            <Icon icon="material-symbols:route-rounded" width={18} />
            How It Works
          </span>

          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">
            Reserve Your Space
            <span className="block mt-1 bg-linear-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              In Three Simple Steps
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-3 text-slate-300 text-base md:text-lg">
            Fast, secure and hassle-free room booking designed for students,
            professionals and modern workspaces.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                p-7 md:p-8
                bg-white/[0.05]
                backdrop-blur-xl
                border border-white/10
                hover:border-teal-500/30
                hover:bg-white/[0.08]
                hover:-translate-y-2
                transition-all
                duration-300
              "
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500">
                <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-teal-500/10 blur-3xl" />
              </div>

              {/* Step Number */}
              <div className="relative z-10 text-teal-400 text-sm font-bold tracking-wider mb-5">
                STEP {step.num}
              </div>

              {/* Icon */}
              <div
                className="
                  relative
                  z-10
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  from-teal-500
                  to-emerald-500
                  flex
                  items-center
                  justify-center
                  mb-6
                  shadow-lg
                  shadow-teal-500/30
                  group-hover:scale-110
                  transition-all
                  duration-300
                "
              >
                <Icon icon={step.icon} width={30} className="text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-slate-300 leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom Accent */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  bg-gradient-to-r
                  from-teal-500
                  to-emerald-500
                  group-hover:w-full
                  transition-all
                  duration-500
                "
              />

              {/* Connector */}
              {index !== steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-4 z-20 items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 shadow-lg shadow-teal-500/30 flex items-center justify-center">
                    <Icon
                      icon="material-symbols:arrow-forward-rounded"
                      width={16}
                      className="text-white"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
