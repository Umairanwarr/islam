import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { db } from '../src/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { getFileUrl } from '../src/appwrite';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const [customTestimonials, setCustomTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default testimonials that will always be shown
  const defaultTestimonials = [
    {
      quote: "Your recitations helped me reconnect with the Qur'an. JazakAllah Khair.",
      name: "Aisha",
      location: "UK",
      image: "female.jpeg"
    },
    {
      quote: "I learned more in one short video than in weeks of study. May Allah bless your work.",
      name: "Yasir",
      location: "Canada",
      image: "yasir.jpeg"
    }
  ];

  // Fetch custom testimonials from Firebase
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const testimonialsQuery = query(
          collection(db, 'testimonials'),
          orderBy('createdAt', 'desc')
        );
        const testimonialSnapshot = await getDocs(testimonialsQuery);
        const testimonialList = testimonialSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            quote: data.quote,
            name: data.name,
            location: data.location,
            image: data.image,
            createdAt: data.createdAt ?
              (data.createdAt.toDate ? data.createdAt.toDate().toISOString() : data.createdAt)
              : new Date().toISOString()
          };
        });
        setCustomTestimonials(testimonialList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Set up component-specific animation
  useEffect(() => {
   

    // Make sure all items start invisible
    if (itemsRef.current.length > 0) {
      gsap.set(itemsRef.current, { opacity: 0, y: 50 });

      // Create animation for testimonial items
      gsap.to(itemsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        }
      });
    }

    return () => {
      // Clean up ScrollTrigger when component unmounts
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [customTestimonials]); // Re-run when custom testimonials are loaded

  return (
    <div
      id="testimonials-section"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto testimonials-container">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Community Testimonials</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See how Islamic knowledge and guidance has impacted the lives of our community members.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Default testimonials */}
          {defaultTestimonials.map((testimonial, index) => (
            <div
              key={`default-${index}`}
              className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100 transform transition duration-300 hover:shadow-md hover:-translate-y-1 testimonial-item"
              ref={el => itemsRef.current[index] = el}
            >
              <div className="flex flex-col sm:flex-row items-center">
                <div className="sm:mr-6 mb-4 sm:mb-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
                    <img
                      src={testimonial.image}
                      alt={`${testimonial.name} from ${testimonial.location}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <svg className="w-8 h-8 text-teal-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10,8L4,19h6v5h7V13h-7V8z M21,8l-6,11h6v5h7V13h-7V8z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                  <div className="flex items-center">
                    <span className="font-semibold text-teal-700">{testimonial.name}</span>
                    <span className="mx-2 text-gray-400">•</span>
                    <span className="text-gray-600">{testimonial.location}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Custom testimonials from Firebase */}
          {customTestimonials.map((testimonial, index) => {
            // Calculate the actual index for the ref, after the default testimonials
            const refIndex = defaultTestimonials.length + index;

            return (
              <div
                key={`custom-${testimonial.id}`}
                className="bg-green-50 rounded-lg p-6 shadow-sm border border-green-100 transform transition duration-300 hover:shadow-md hover:-translate-y-1 testimonial-item"
                ref={el => itemsRef.current[refIndex] = el}
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <div className="sm:mr-6 mb-4 sm:mb-0">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-sm">
                      {testimonial.image ? (
                        <img
                          src={testimonial.image.startsWith('http')
                            ? testimonial.image
                            : `https://cloud.appwrite.io/v1/storage/buckets/680f87410012f15bc221/files/${testimonial.image}/view?project=680f7c57002f9ac7662d`}
                          alt={`${testimonial.name} from ${testimonial.location}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <svg className="w-8 h-8 text-teal-500 opacity-50" fill="currentColor" viewBox="0 0 32 32">
                        <path d="M10,8L4,19h6v5h7V13h-7V8z M21,8l-6,11h6v5h7V13h-7V8z"></path>
                      </svg>
                    </div>
                    <p className="text-gray-700 italic mb-4">{testimonial.quote}</p>
                    <div className="flex items-center">
                      <span className="font-semibold text-teal-700">{testimonial.name}</span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-gray-600">{testimonial.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
