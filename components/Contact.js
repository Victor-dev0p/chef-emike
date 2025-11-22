// components/Contact.jsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contact() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredTime: '',
    preferredMethod: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('✅ Message sent successfully!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredTime: '',
          preferredMethod: '',
          subject: '',
          message: '',
        });

        setTimeout(() => {
          setStatus('');
          setShowForm(false);
        }, 3000);
      } else {
        setStatus(`❌ ${data.error || 'Failed to send message.'}`);
      }
    } catch (err) {
      setStatus('❌ An error occurred.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-amber-900 to-orange-500 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-amber-800 mb-8">
            Ready to create your next culinary experience?
          </p>
        </div>

        {/* Say Hello Button */}
        <motion.button
          onClick={() => setShowForm(!showForm)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-lg text-white px-8 py-3 rounded-full font-bold transition-all duration-300 cursor-pointer"
        >
          {showForm ? 'Close Form' : 'Say Hello'}
        </motion.button>

        {/* Animated Form Dropdown */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              key="contactForm"
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden mt-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-orange-500">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <label
                        htmlFor="fullName"
                        className="block text-amber-900 font-semibold text-sm mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 focus:outline-none bg-white text-sm text-gray-900"
                        placeholder="Your name"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                    >
                      <label
                        htmlFor="email"
                        className="block text-amber-900 font-semibold text-sm mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 focus:outline-none bg-white text-sm text-gray-900"
                        placeholder="your@email.com"
                      />
                    </motion.div>
                  </div>

                  {/* Phone */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="phone"
                      className="block text-amber-900 font-semibold text-sm mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 focus:outline-none bg-white text-sm text-gray-900"
                      placeholder="+1 (555) 000-0000"
                    />
                  </motion.div>

                  {/* Preferred Time and Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.25 }}
                    >
                      <label
                        htmlFor="preferredTime"
                        className="block text-amber-900 font-semibold text-sm mb-2"
                      >
                        Preferred Time to Contact *
                      </label>

                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm text-gray-900 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b45309' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="">Select time...</option>
                        <option value="Morning (8am - 12pm)">Morning (8am - 12pm)</option>
                        <option value="Afternoon (12pm - 5pm)">Afternoon (12pm - 5pm)</option>
                        <option value="Evening (5pm - 9pm)">Evening (5pm - 9pm)</option>
                        <option value="Flexible">Flexible</option>
                      </select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <label
                        htmlFor="preferredMethod"
                        className="block text-amber-900 font-semibold text-sm mb-2"
                      >
                        Preferred Contact Method *
                      </label>

                      <select
                        id="preferredMethod"
                        name="preferredMethod"
                        value={formData.preferredMethod}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm text-gray-900 appearance-none cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b45309' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 0.5rem center',
                          backgroundSize: '1.5em 1.5em',
                          paddingRight: '2.5rem',
                        }}
                      >
                        <option value="">Select method...</option>
                        <option value="Phone Call">Phone Call</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                        <option value="SMS">SMS</option>
                      </select>
                    </motion.div>
                  </div>

                  {/* Subject */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <label
                      htmlFor="subject"
                      className="block text-amber-900 font-semibold text-sm mb-2"
                    >
                      Subject (Service Interest) *
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm text-gray-900 appearance-none cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23b45309' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 0.5rem center',
                        backgroundSize: '1.5em 1.5em',
                        paddingRight: '2.5rem',
                      }}
                    >
                      <option value="">Select a service...</option>
                      <option value="Bespoke Celebrations">Bespoke Celebrations</option>
                      <option value="Meal Preparation">Meal Preparation</option>
                      <option value="Culinary Consulting">Culinary Consulting</option>
                    </select>
                  </motion.div>

                  {/* Message */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-amber-900 font-semibold text-sm mb-2"
                    >
                      Message *
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2.5 rounded-lg border-2 border-orange-200 focus:border-orange-500 bg-white text-sm text-gray-900 resize-none"
                      placeholder="Tell me about your event or inquiry..."
                    />
                  </motion.div>

                  {/* Status Messages */}
                  <AnimatePresence>
                    {status && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 rounded-lg text-sm font-semibold text-center ${
                          status.includes('✅')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {status}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer text-sm"
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Contact Info */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl mb-2">📧</p>
            <p className="text-amber-900 font-semibold text-sm mb-1">Email</p>
            <p className="text-orange-600 text-sm">euchariaemike@gmail.com</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl mb-2">📱</p>
            <p className="text-amber-900 font-semibold text-sm mb-1">Phone</p>
            <p className="text-orange-600 text-sm">+234 (070) 686-13-265</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className="text-3xl mb-2">📍</p>
            <p className="text-amber-900 font-semibold text-sm mb-1">Location</p>
            <p className="text-orange-600 text-sm">Benin City, Nigeria</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
