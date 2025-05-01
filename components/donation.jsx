import React from 'react';

function Donation() {
  return (
    <div id="donation" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto donation-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Support Our Mission</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Your donations help us continue providing Islamic education and resources to the community.
            Every contribution makes a difference, no matter how small.
          </p>
        </div>

        {/* Donation Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-2 bg-teal-600 w-full"></div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Donate via PayPal</h3>
                <p className="text-gray-600 mb-4">
                  Your generosity allows us to continue our work in spreading authentic Islamic knowledge
                  and supporting the community with valuable resources.
                </p>
                <div className="flex flex-wrap gap-5 justify-center md:justify-start mb-6">
                  <div className="flex items-center bg-teal-50 px-5 py-3 rounded-md hover:bg-teal-100 cursor-pointer transition duration-300">
                    <span className="text-teal-700 font-medium">£5</span>
                  </div>
                  <div className="flex items-center bg-teal-50 px-5 py-3 rounded-md hover:bg-teal-100 cursor-pointer transition duration-300">
                    <span className="text-teal-700 font-medium">£10</span>
                  </div>
                  <div className="flex items-center bg-teal-50 px-5 py-3 rounded-md hover:bg-teal-100 cursor-pointer transition duration-300">
                    <span className="text-teal-700 font-medium">£25</span>
                  </div>
                  <div className="flex items-center bg-teal-50 px-5 py-3 rounded-md hover:bg-teal-100 cursor-pointer transition duration-300">
                    <span className="text-teal-700 font-medium">£50</span>
                  </div>
                  <div className="flex items-center bg-teal-50 px-5 py-3 rounded-md hover:bg-teal-100 cursor-pointer transition duration-300">
                    <span className="text-teal-700 font-medium">£100</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
                {/* PayPal Button with proper branding */}
                <a
                  href="#"
                  className="inline-flex items-center px-8 py-4 bg-[#0070ba] text-white rounded-md hover:bg-[#003087] transition duration-300 shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://www.paypal.com/donate', '_blank');
                  }}
                >
                  <div className="flex items-center">
                    <svg className="w-6 h-6 mr-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-1.384-1.028-3.42-1.129-5.895-1.129h-5.46c-.187 0-.365.122-.398.304L6.31 17.76c-.02.098.04.187.132.187h3.368c.188 0 .366-.122.398-.304l.535-3.39c.032-.183.21-.304.398-.304h1.028c3.41 0 6.06-1.385 6.827-5.397.366-1.9.143-3.388-.774-4.636z"
                        fill="currentColor" fillRule="evenodd"/>
                    </svg>
                    <div className="flex flex-col items-start">
                      <span className="text-xs leading-none mb-1">Donate with</span>
                      <div className="flex items-center">
                        <span className="font-semibold text-base">Pay</span><span className="font-normal text-base">Pal</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">
              <p>Donations are secure and encrypted. You can also donate by direct bank transfer. Contact us for details.</p>
              <p className="mt-2">For tax deduction information or other donation methods, please email <span className="text-teal-600">donate@imamwebsite.com</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donation;
