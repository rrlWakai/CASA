import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Check,
  Loader2,
  Moon,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { format, addDays, differenceInDays } from "date-fns";
import { reservationsService } from "../services/reservationsService";
import { useAvailability } from "../hooks/useAvailability";

export default function BookingForm() {
  const { isDateBooked, checkAvailability } = useAvailability();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: null as Date | null,
    checkOut: null as Date | null,
    guests: 2,
    specialRequests: "",
  });

  const nights =
    form.checkIn && form.checkOut
      ? differenceInDays(form.checkOut, form.checkIn)
      : 0;

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!form.checkIn || !form.checkOut) {
      toast.error("Please select your check-in and check-out dates.");
      return;
    }
    if (form.guests < 1) {
      toast.error("Please select at least 1 guest.");
      return;
    }

    setLoading(true);
    try {
      const checkInStr = format(form.checkIn, "yyyy-MM-dd");
      const checkOutStr = format(form.checkOut, "yyyy-MM-dd");

      const available = await checkAvailability(checkInStr, checkOutStr);
      if (!available) {
        toast.error(
          "Sorry, those dates are already booked. Please choose different dates.",
        );
        setLoading(false);
        return;
      }

      await reservationsService.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        check_in: checkInStr,
        check_out: checkOutStr,
        guests: form.guests,
        special_requests: form.specialRequests,
      });

      setSuccess(true);
      toast.success("Booking request sent! We'll confirm within 24 hours.");
    } catch (err) {
      console.error(err);
      toast.error(
        "Something went wrong. Please try again or contact us via WhatsApp.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-16 px-8"
      >
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10 text-emerald-700" />
        </div>
        <h3 className="font-display text-3xl font-semibold text-gray-900 mb-3">
          Request Received!
        </h3>
        <p className="text-gray-500 mb-2">
          Thank you, <strong>{form.name}</strong>! Your booking request has been
          submitted.
        </p>
        <p className="text-gray-400 text-sm mb-8">
          We'll confirm your reservation via email or phone within 24 hours.
        </p>
        {form.checkIn && form.checkOut && (
          <div className="inline-flex gap-6 bg-emerald-50 rounded-2xl px-8 py-4 border border-emerald-100 mb-8">
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Check-in
              </div>
              <div className="font-semibold text-gray-900">
                {format(form.checkIn, "MMM d, yyyy")}
              </div>
            </div>
            <div className="w-px bg-emerald-200" />
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Check-out
              </div>
              <div className="font-semibold text-gray-900">
                {format(form.checkOut, "MMM d, yyyy")}
              </div>
            </div>
            <div className="w-px bg-emerald-200" />
            <div className="text-center">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Guests
              </div>
              <div className="font-semibold text-gray-900">{form.guests}</div>
            </div>
          </div>
        )}
        <button
          onClick={() => {
            setSuccess(false);
            setStep(1);
            setForm({
              name: "",
              email: "",
              phone: "",
              checkIn: null,
              checkOut: null,
              guests: 2,
              specialRequests: "",
            });
          }}
          className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-medium hover:bg-emerald-800 transition-colors"
        >
          Make Another Booking
        </button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* Step indicators */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <button
              onClick={() => step > s && setStep(s)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step === s
                  ? "bg-emerald-700 text-white"
                  : step > s
                    ? "bg-emerald-100 text-emerald-700 cursor-pointer"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </button>
            <span
              className={`text-sm font-medium ${step >= s ? "text-gray-700" : "text-gray-400"}`}
            >
              {s === 1 ? "Select Dates" : "Your Details"}
            </span>
            {s < 2 && (
              <div
                className={`w-8 h-px mx-2 ${step > s ? "bg-emerald-300" : "bg-gray-200"}`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Dates & Guests */}
      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Check-in */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Check-in Date
              </label>
              <DatePicker
                selected={form.checkIn}
                onChange={(date) =>
                  setForm((f) => ({
                    ...f,
                    checkIn: date,
                    checkOut:
                      f.checkOut && date && f.checkOut <= date
                        ? null
                        : f.checkOut,
                  }))
                }
                minDate={new Date()}
                filterDate={(date) => !isDateBooked(date)}
                placeholderText="Select check-in"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white"
                dateFormat="MMMM d, yyyy"
              />
            </div>

            {/* Check-out */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Check-out Date
              </label>
              <DatePicker
                selected={form.checkOut}
                onChange={(date) => setForm((f) => ({ ...f, checkOut: date }))}
                minDate={
                  form.checkIn
                    ? addDays(form.checkIn, 1)
                    : addDays(new Date(), 1)
                }
                filterDate={(date) => !isDateBooked(date)}
                placeholderText="Select check-out"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white"
                dateFormat="MMMM d, yyyy"
                disabled={!form.checkIn}
              />
            </div>
          </div>

          {/* Nights summary */}
          {nights > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl"
            >
              <span className="text-emerald-800 font-medium text-sm flex items-center gap-1">
                <Moon className="w-4 h-4" /> {nights} night
                {nights > 1 ? "s" : ""}
              </span>
              <span className="text-emerald-600 text-sm">
                {form.checkIn && format(form.checkIn, "MMM d")} →{" "}
                {form.checkOut && format(form.checkOut, "MMM d, yyyy")}
              </span>
            </motion.div>
          )}

          {/* Guests */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Users className="w-4 h-4 text-emerald-600" />
              Number of Guests
            </label>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, guests: Math.max(1, f.guests - 1) }))
                }
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors font-semibold text-lg"
              >
                −
              </button>
              <span className="font-display text-2xl font-semibold text-gray-900 w-8 text-center">
                {form.guests}
              </span>
              <button
                onClick={() =>
                  setForm((f) => ({ ...f, guests: Math.min(20, f.guests + 1) }))
                }
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:border-emerald-300 hover:text-emerald-700 transition-colors font-semibold text-lg"
              >
                +
              </button>
              <span className="text-gray-400 text-sm">(Max 20 guests)</span>
            </div>
          </div>

          <button
            onClick={() => {
              if (!form.checkIn || !form.checkOut) {
                toast.error("Please select both check-in and check-out dates.");
                return;
              }
              setStep(2);
            }}
            className="w-full py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-colors text-sm tracking-wide"
          >
            Continue to Details →
          </button>
        </motion.div>
      )}

      {/* Step 2: Guest Details */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 text-emerald-600" />
              Full Name *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="e.g. Maria Santos"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-emerald-600" />
                Email *
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Phone *
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm((f) => ({ ...f, phone: e.target.value }))
                }
                placeholder="+63 9XX XXX XXXX"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              Special Requests (Optional)
            </label>
            <textarea
              rows={3}
              value={form.specialRequests}
              onChange={(e) =>
                setForm((f) => ({ ...f, specialRequests: e.target.value }))
              }
              placeholder="Any special arrangements, occasion details, dietary needs, etc."
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white resize-none"
            />
          </div>

          {/* Summary */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm">
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Dates</span>
              <span className="font-medium text-gray-800">
                {form.checkIn && format(form.checkIn, "MMM d")} –{" "}
                {form.checkOut && format(form.checkOut, "MMM d, yyyy")}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium text-gray-800">
                {nights} night{nights !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium text-gray-800">
                {form.guests} guest{form.guests !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(1)}
              className="flex-1 py-4 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-[2] py-4 bg-emerald-700 text-white font-semibold rounded-xl hover:bg-emerald-800 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                </>
              ) : (
                <>
                  Send Booking Request <MapPin className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          <p className="text-center text-gray-400 text-xs">
            Your booking is a request — we'll confirm availability and send
            rates within 24 hours.
          </p>
        </motion.div>
      )}
    </div>
  );
}
