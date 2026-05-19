import { useState, useEffect } from 'react';
import { Lock } from 'lucide-react';
import bannerImageImport from '../imports/JandelBanner.jpeg';

// Replace with your Google Apps Script deployment URL
const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxypCDPmtHqxyD8jRkIEf9341DSWvcNI30aMmjxusP2E-igP9LYZ3E6-91UOXZ0Hi-j/exec';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const bannerImage = bannerImageImport;

  useEffect(() => {
    const calculateCountdown = () => {
      const eventDate = new Date('2026-06-05T00:00:00').getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', attending: '' });
        setShowForm(false);
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
      console.error('Form submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
            <span className="text-sm">RESPONSE IN {countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</span>
          </div>
          <div className="px-4 py-1 border border-gray-300 rounded text-sm">
            ANNIVERSARY
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">JANDEL 30TH ANNIVERSARY</h1>

          {/* Banner Image */}
          <div className="mb-8">
            <img
              src={bannerImage}
              alt="Jandel 30th Anniversary - The Launch"
              className="w-full rounded-lg object-cover"
            />
          </div>

          {/* Event Info & Form */}
          <div className="space-y-6">
            {/* About Event */}
            <div>
              <h3 className="font-bold mb-3">About Event</h3>
              <p className="text-sm text-gray-600 mb-4">
                Celebrating 30 years of vision and dedication. The Launch marks a significant milestone in our journey, honoring the commitment and partnership that have brought us here. Join us for an evening of celebration with team, partners, and stakeholders.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-amber-400 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Venue</p>
                    <p className="text-sm text-gray-600">Mövenpick Ambassador Hotel Accra</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-700 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Contact</p>
                    <p className="text-sm text-gray-600">
                      <a href="tel:+233551778933" className="text-purple-700 hover:underline">+233 55 177 8933</a>
                      {' '}or{' '}
                      <a href="mailto:Hello@Jandelltd.com" className="text-purple-700 hover:underline">Hello@Jandelltd.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Date</p>
                    <p className="text-sm text-gray-600">Friday, 5th June 2026</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Time</p>
                    <p className="text-sm text-gray-600">4:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-sm">Dress Code</p>
                    <p className="text-sm text-gray-600">Business Casual/Traditional Wear</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Show form or button */}
            {!showForm && !submitted && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 text-sm font-bold hover:underline cursor-pointer"
              >
                <Lock size={16} />
                RESERVE A SEAT
              </button>
            )}

            {/* RSVP Form */}
            {showForm && !submitted && (
              <>
                <hr className="border-gray-200" />
                <form onSubmit={handleSubmit}>
                  <h3 className="font-bold mb-4">Reserve Your Seat</h3>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600 transition-colors disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm mb-1">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600 transition-colors disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm mb-1">Phone:</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-600 transition-colors disabled:bg-gray-100"
                      />
                    </div>

                    <div>
                      <p className="text-sm mb-2">Are you attending?</p>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={formData.attending === 'yes'}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={formData.attending === 'no'}
                            onChange={handleChange}
                            required
                            disabled={loading}
                            className="w-4 h-4"
                          />
                          <span className="text-sm">No</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white px-6 py-2 rounded font-bold transition-colors"
                    >
                      {loading ? 'SUBMITTING...' : 'SUBMIT RSVP'}
                    </button>
                  </div>
                </form>
              </>
            )}

            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="font-bold text-lg mb-2">Thank You!</h4>
                <p className="text-sm text-gray-600">
                  {formData.attending === 'yes'
                    ? 'Your RSVP has been received. We look forward to seeing you at the event.'
                    : 'Your RSVP has been received. Thank you for your response.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}