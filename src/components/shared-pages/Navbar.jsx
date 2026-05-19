"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";

// Gravity UI icons — npm install @gravity-ui/icons
import {
  House,
  CopyChevronRight,
  Person,
  ArrowRightFromSquare,
  ArrowRightToSquare,
  PersonPlus,
  Bars,
  Xmark,
  ChevronDown,
  BookOpen,
  CirclePlus,
} from "@gravity-ui/icons";
// import { authClient } from "@/lib/auth-client";
// import { toast } from "react-toastify";
import { Avatar, Separator } from "@heroui/react";

const NAV_LINKS = [
  { href: "/", label: "Home", Icon: House },
  { href: "/Room", label: "Room", Icon: CopyChevronRight },
  { href: "/add-room", label: "Add Room", Icon: CirclePlus },
];

export default function Navbar() {
  const pathname = usePathname();
  // toggle for demo
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // const {
  //   data: session,
  //   isPending,
  //   error, //error object
  //   refetch, //refetch the session
  // } = authClient.useSession();
  const user = "";
  // console.log(session);

  const handleLogOut = async () => {
    // await authClient.signOut();
    // toast.success("Log Out Successfully");
    // redirect("/signin");
  };

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className=" top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-amber-100 shadow-sm shadow-amber-50">
      {/* ── Main bar ───────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
          {/* <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-teal-200 to-teal-600 shadow-md bg-[#bff7f5] group-hover:scale-105 group-hover:-rotate-6 transition-all duration-200">
            <BookOpen className="w-[18px] h-[18px] text-white" />
          </span> */}
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Study<span className="text-[#22C7C8]">Nook</span>
          </span>
        </Link>

        <div className="flex  gap-7">
          {" "}
          {/* ── Desktop nav links ── */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {NAV_LINKS.map(({ href, label, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-150 no-underline
                  ${
                    isActive(href)
                      ? "bg-teal-100 text-shadow-teal-700 font-semibold shadow-sm"
                      : "text-slate-500 hover:bg-teal-50 hover:text-teal-400"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                  {isActive(href) && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          <div className="w-px  bg-gray-500/50" />
          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {user ? (
              /* ── Logged IN — Avatar + Dropdown ── */
              <div className="relative hidden md:block">
                <button
                  onClick={() => setDropdownOpen((p) => !p)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-slate-200 bg-white hover:border-amber-400 hover:shadow-md hover:shadow-amber-100 transition-all duration-150 cursor-pointer"
                >
                  <div className="relative w-8 h-8 flex items-center">
                    {user?.image?.startsWith("https") ? (
                      <Image
                        src={user.image}
                        alt="profile"
                        fill
                        sizes="40px"
                        className="rounded-full object-cover border border-green-500"
                      />
                    ) : (
                      <Avatar className="w-8 h-8 rounded-full border border-orange-200">
                        <Avatar.Fallback className="flex items-center justify-center w-full h-full">
                          <Person className="w-5 h-5 text-orange-500" />
                        </Avatar.Fallback>
                      </Avatar>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-slate-800 hidden lg:block max-w-[100px] truncate">
                    {user?.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-200/60 py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-1">
                      <p className="text-sm font-semibold text-slate-800 truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 mx-1 px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-xl transition-colors no-underline"
                    >
                      <Person className="w-4 h-4 text-slate-400" />
                      My Profile
                    </Link>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogOut();
                      }}
                      className="flex items-center gap-2.5 w-[calc(100%-8px)] mx-1 px-3 py-2.5 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border-none bg-transparent"
                    >
                      <ArrowRightFromSquare className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* ── Logged OUT — Login / Register ── -----------------*/
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-150 no-underline"
                >
                  <ArrowRightToSquare className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-teal-400 to-sky-500 text-sm font-semibold text-white shadow-md shadow-teal-200 hover:shadow-lg hover:shadow-teal-200 hover:-translate-y-0.5 transition-all duration-150 no-underline"
                >
                  <PersonPlus className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <Xmark className="w-5 h-5" />
              ) : (
                <Bars className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-amber-100 bg-white px-4 pb-5 pt-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 no-underline
                ${
                  isActive(href)
                    ? "bg-teal-100 text-teal-700 font-semibold"
                    : "text-slate-600 hover:bg-teal-50 hover:text-teal-600"
                }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {isActive(href) && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-500" />
              )}
            </Link>
          ))}

          <div className="h-px bg-slate-100 my-2" />

          {user ? (
            <>
              <div className="flex items-center gap-3 px-4 py-2">
                {/* <Image
                  src={MOCK_USER.avatar}
                  alt={MOCK_USER.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full border-2 border-amber-200"
                /> */}
                <div>
                  <p className="text-sm font-semibold text-slate-800 m-0">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-400 m-0">{user.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileOpen(false);
                }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-colors cursor-pointer border-none bg-transparent w-full"
              >
                <ArrowRightFromSquare className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <Link
                href="/signin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors no-underline"
              >
                <ArrowRightToSquare className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-linear-to-r from-teal-400 to-sky-500 text-sm font-semibold text-white shadow-md shadow-teal-200 transition-colors no-underline"
              >
                <PersonPlus className="w-4 h-4" />
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
