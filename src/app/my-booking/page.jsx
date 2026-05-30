import MyBookingsClient from "@/components/MyBookings/MyBookingsClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function MyBookingsPage({}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const email = session?.user?.email;

  let bookings = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${email}`,
      {
        cache: "no-store",
      },
    );

    if (res.ok) {
      bookings = await res.json();
    }
  } catch (error) {
    console.error("Failed to load bookings:", error);
  }

  return <MyBookingsClient bookings={bookings} user={{ email }} />;
}
