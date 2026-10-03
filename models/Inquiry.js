import mongoose from 'mongoose';

// Mirrors the fields collected by components/home/InquiryForm.jsx (the
// homepage "Start planning" quick-inquiry form — simpler than the full
// multi-step BookingEngine on the Contact page).
const InquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    dates: { type: String, default: '' },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['new', 'contacted', 'confirmed', 'cancelled'],
      default: 'new',
    },
    adminNotes: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
