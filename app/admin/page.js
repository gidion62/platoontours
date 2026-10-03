import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Inquiry from '@/models/Inquiry';
import AdminDashboard from '@/components/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
  robots: { index: false, follow: false },
};

// Server Component — queries MongoDB directly (no extra API round-trip for
// the initial load) and hands the data to the client dashboard for the
// interactive bits (status changes, filtering, deleting).
export const dynamic = 'force-dynamic';

function serialize(doc) {
  const obj = doc.toObject();
  return {
    ...obj,
    _id: obj._id.toString(),
    createdAt: obj.createdAt?.toISOString(),
    updatedAt: obj.updatedAt?.toISOString(),
  };
}

export default async function Page() {
  await connectDB();
  const [bookings, inquiries] = await Promise.all([
    Booking.find().sort({ createdAt: -1 }).limit(200),
    Inquiry.find().sort({ createdAt: -1 }).limit(200),
  ]);

  return (
    <AdminDashboard
      initialBookings={bookings.map(serialize)}
      initialInquiries={inquiries.map(serialize)}
    />
  );
}
