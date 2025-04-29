import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

// EmailJS credentials
const SERVICE_ID = 'service_lhmpmij';
const TEMPLATE_ID = 'template_l5z7bte'; // Admin notification template ID for Ask Imam form
const PUBLIC_KEY = 'mekVCr_83sqRQIbjD';

const AskImamForm = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    console.log('Starting email submission process...');
    console.log('Form data:', formData);
    console.log('EmailJS credentials:', { SERVICE_ID, TEMPLATE_ID });

    // Send notification email to admin
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, {
      publicKey: PUBLIC_KEY,
    })
      .then((result) => {
        console.log('User confirmation sent successfully:', result.text);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form after submission
        setFormData({
          user_name: '',
          user_email: '',
          message: ''
        });

        // Reset success message after 10 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 10000);
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        console.error('Error details:', error.text || 'No error text available');
        console.error('Error status:', error.status || 'No status available');

        setIsSubmitting(false);
        setError(`Failed to send your question: ${error.text || 'Unknown error'}. Please try again later.`);
      });
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto">
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="flex justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Question Submitted Successfully</h3>
            <p className="text-green-700">
              Thank you for your question. You will receive a response within 3-5 days, insha'Allah.
            </p>
          </div>
        ) : (
          <div className="bg-white">
            <div className="p-6">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z" />
                  </svg>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-[#08948c] mb-2 text-center">Ask the Imam</h2>
              <div className="flex justify-center mb-4">
                <div className="h-1 w-32 bg-yellow-400 rounded"></div>
              </div>
              <p className="text-gray-600 mb-6 text-center">
                Have a question about Islam, life, or the Qur'an? Submit your question here
                and receive a personalized response from me directly, insha'Allah.
              </p>

              <form ref={form} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      required
                      className="w-full py-3 px-4 bg-white rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      required
                      className="w-full py-3 px-4 bg-white rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1">Your Question</label>
                  <textarea
                    id="question"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full py-3 px-4 bg-white rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Type your question here. Please be specific and provide context if needed."
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-2 px-5 bg-[#08948c] text-white rounded-full shadow hover:bg-[#067a73] transition duration-300 flex items-center justify-center"
                  >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Question
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"></path>
                        <path d="M22 2L15 22L11 13L2 9L22 2Z"></path>
                      </svg>
                    </>
                  )}
                </button>
                </div>
                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-center">
                    {error}
                  </div>
                )}
              </form>
            </div>
          </div>
        )}

        {!isSubmitted && (
          <div className="mt-8 text-center text-gray-600">
            <p>You will receive a response via email within 3-5 days, insha'Allah.</p>
            <p className="mt-2">Your email will only be used to respond to your question and will not be shared with third parties.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskImamForm;
