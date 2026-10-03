import mongoose from 'mongoose';

// Mirrors the fields collected by components/contact/BookingEngine.jsx.
// `status` is what the admin dashboard filters/manages by — new bookings
// land as "new" and the admin moves them along as they're actioned.
const BookingSchema = new mongoose.Schema(
  {
    packageName: { type: String, default: '' },
    month: { type: String, default: '' },
    groupSize: { type: String, default: '' },
    tier: { type: String, default: '' },
    interests: { type: [String], default: [] },
    name: { type: String, required: true },
    email: { type: String, required: true },
    whatsapp: { type: String, default: '' },
    country: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'cancelled'],
      default: 'new',
    },
    // Free-text notes the admin can leave on a booking (call notes, follow-up
    // reminders, etc.) — kept separate from the traveler's own message.
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
