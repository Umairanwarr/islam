import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS credentials
const SERVICE_ID = 'service_bp4fnk7';
const TEMPLATE_ID = 'template_fio1jwe'; // Using the same template as Contact form
const PUBLIC_KEY = 'c6Aywq8By48mjZGcU';

function Subscribe() {
  const form = useRef();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
   
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('Starting subscription process...');
    console.log('Email:', email);

    // Prepare template parameters
    const templateParams = {
      user_email: email,
      message: `${email} has subscribed to newsletter`,
      subject: 'New Newsletter Subscription'
    };

    // Send email notification to admin
    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
      publicKey: PUBLIC_KEY,
    })
      .then((result) => {
        console.log('Subscription notification sent successfully:', result.text);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after submission
        setEmail('');

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Subscription notification failed:', error);
        console.error('Error details:', error.text || 'No error text available');

        setIsSubmitting(false);
        setError(`Failed to subscribe: ${error.text || 'Unknown error'}. Please try again later.`);
      });
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 subscribe-container">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 subscribe-title">Stay Updated</h2>
        <p className="text-lg text-gray-600 mb-8 subscribe-text">
          Subscribe to receive weekly Islamic reminders, new recitations, and updates on upcoming events.
        </p>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center max-w-lg mx-auto">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Subscription Successful</h3>
            <p className="text-green-700">
              Thank you for subscribing to our newsletter. You'll start receiving updates soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto subscribe-form">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-grow py-3 px-4 rounded-md border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                disabled={isSubmitting}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#08948c] text-white py-3 px-6 rounded-md shadow hover:bg-[#067a73] transition duration-300 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-center">
                {error}
              </div>
            )}
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to receive emails from us. You can unsubscribe at any time.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Subscribe;
