import React, { useState } from 'react';

const AskImamForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    question: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    // Simulate form submission
    setTimeout(() => {
      console.log('Question submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Reset form after submission
      setFormData({
        fullName: '',
        email: '',
        question: ''
      });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
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
              Thank you for your question. You will receive a response via email within 3-5 days, insha'Allah.
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

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
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
                      name="email"
                      value={formData.email}
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
                    name="question"
                    value={formData.question}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full py-3 px-4 bg-white rounded-md border border-gray-300 shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Type your question here. Please be specific and provide context if needed."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#08948c] text-white rounded-md shadow hover:bg-[#067a73] transition duration-300 flex items-center justify-center"
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </>
                  )}
                </button>
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
