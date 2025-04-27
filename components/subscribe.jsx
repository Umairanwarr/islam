import React, { useState } from 'react';

function Subscribe() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the subscription logic
    console.log('Subscribing email:', email);
    // Reset form after submission
    setEmail('');
    // Show success message or handle errors
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Stay Updated</h2>
        <p className="text-lg text-gray-600 mb-8">
          Subscribe to receive weekly Islamic reminders, new recitations, and updates on upcoming events.
        </p>

        <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-grow py-3 px-4 rounded-md border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-teal-600 text-white py-3 px-6 rounded-md shadow hover:bg-teal-700 transition duration-300 flex-none"
            >
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            By subscribing, you agree to receive emails from us. You can unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;
