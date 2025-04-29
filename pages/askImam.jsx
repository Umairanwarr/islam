import React from 'react';
import AskImamForm from '../components/askImamForm';
import Footer from '../components/footer';

const AskImam = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background with image */}
      <div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/askImam.jpg')" }}>
        {/* Content - no overlay */}
        <div className="relative py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-xl sm:max-w-2xl w-full bg-white rounded-lg shadow-2xl overflow-hidden">
            <AskImamForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AskImam;