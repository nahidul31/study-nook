import { Button, Input } from "@heroui/react";

export default function Footer() {
  function Logo() {
    return (
      <svg width="42" height="42" viewBox="0 0 38 38" fill="none">
        <rect x="5" y="9" width="28" height="23" rx="3.5" fill="#003c3c" />
        <rect x="5" y="9" width="5.5" height="23" rx="2.5" fill="#22C7C8" />

        <rect
          x="14"
          y="14"
          width="13"
          height="2"
          rx="1"
          fill="#22C7C8"
          opacity=".85"
        />
        <rect
          x="14"
          y="19"
          width="10"
          height="2"
          rx="1"
          fill="#22C7C8"
          opacity=".6"
        />
        <rect
          x="14"
          y="24"
          width="11.5"
          height="2"
          rx="1"
          fill="#22C7C8"
          opacity=".4"
        />

        <path d="M26 9 L31 9 L31 21 L28.5 19 L26 21 Z" fill="#F4A261" />
        <circle cx="28.5" cy="7" r="3.5" fill="#B58CF2" />
        <rect x="25.5" y="5.8" width="6" height="1.8" rx=".6" fill="#fff" />
      </svg>
    );
  }

  return (
    <footer className=" bg-[#064E4E] text-white border-t border-[#22C7C8]/15">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-2xl font-bold">
                Study<span className="text-[#22C7C8]">Nook</span>
              </h2>
            </div>

            <p className="text-white/65 text-sm leading-6">
              Find, list and book study spaces easily. Study smarter with a calm
              and modern booking experience.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#22C7C8]">Navigation</h3>
            <div className="space-y-3 text-white/70 text-sm">
              <p className="hover:text-[#22C7C8] cursor-pointer">Home</p>
              <p className="hover:text-[#22C7C8] cursor-pointer">Rooms</p>
              <p className="hover:text-[#22C7C8] cursor-pointer">My Bookings</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#22C7C8]">Resources</h3>
            <div className="space-y-3 text-white/70 text-sm">
              <p>FAQ</p>
              <p>Privacy Policy</p>
              <p>Terms & Conditions</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-[#22C7C8]">Stay Updated</h3>

            <div className="flex bg-white/5 rounded-2xl p-1 border border-white/10">
              <Input
                placeholder="Enter email"
                className="bg-transparent flex-1 px-4 outline-none text-sm"
              />

              <Button className="px-4 py-2 rounded-xl bg-[#22C7C8] text-[#003c3c] font-semibold hover:scale-105 transition">
                Join
              </Button>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/50">
          <p>© 2026 StudyNook. All rights reserved.</p>

          <div className="flex gap-6">
            <p className="hover:text-[#F4A261] cursor-pointer">Facebook</p>
            <p className="hover:text-[#F4A261] cursor-pointer">GitHub</p>
            <p className="hover:text-[#F4A261] cursor-pointer">LinkedIn</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
