import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Send, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { inquiriesService } from '../services/inquiriesService';

export default function InquiryForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    try {
      await inquiriesService.create(form);
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon.');
    } catch (err) {
      console.error(err);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-10"
      >
        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-7 h-7 text-emerald-700" />
        </div>
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500 text-sm">We'll reply to <strong>{form.email}</strong> within 24 hours.</p>
        <button
          onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
          className="mt-6 px-5 py-2.5 bg-emerald-700 text-white rounded-xl text-sm font-medium hover:bg-emerald-800 transition-colors"
        >
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <User className="w-4 h-4 text-emerald-600" />
          Full Name *
        </label>
        <input
          type="text"
          required
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="Maria Santos"
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white focus:outline-none"
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
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="your@email.com"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white focus:outline-none"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Phone className="w-4 h-4 text-emerald-600" />
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+63 9XX XXX XXXX"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="w-4 h-4 text-emerald-600" />
          Message *
        </label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
          placeholder="Tell us about your event, group size, preferred dates, or any questions..."
          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm input-luxury bg-white focus:outline-none resize-none"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors text-sm flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
        ) : (
          <><Send className="w-4 h-4" /> Send Message</>
        )}
      </motion.button>
    </form>
  );
}
