import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize animations for each section on page load
export const initAnimations = () => {
  // Enable GSAP debugging in console
  gsap.config({
    nullTargetWarn: false
  });

  console.log('Initializing animations...');
  
  // Animate hero section
  animateHero();
  
  // Animate sections on scroll
  animatePrayerTime();
  animateAbout();
  animateQuran();
  animateResources();
  animateDonation();
  animateTestimonials();
  animateSubscribe();
  animateContact();
  animateFooter();

  // Debug
  console.log('All animations initialized!');
};

// Hero section animations (runs immediately)
const animateHero = () => {
  // Make sure all hero elements are visible first
  gsap.set('.hero-content a', { opacity: 1, y: 0 });
  
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  
  heroTl
    .from('.hero-content h1', { opacity: 0, y: 50, duration: 1 })
    .from('.hero-content p', { opacity: 0, y: 30, duration: 0.8 }, '-=0.6');
    // Removed button animation to ensure they're always visible
};

// PrayerTime section animations
const animatePrayerTime = () => {
  gsap.from('.prayer-time-item', {
    scrollTrigger: {
      trigger: '.prayer-time-container',
      start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    stagger: 0.2,
    duration: 0.8
  });
};

// About section animations
const animateAbout = () => {
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.about-section',
      start: 'top 70%',
    }
  });
  
  aboutTl
    .from('.about-image', { opacity: 0, x: -50, duration: 1 })
    .from('.about-content', { opacity: 0, x: 50, duration: 1 }, '-=0.7');
};

// Quran section animations
const animateQuran = () => {
  gsap.from('.quran-container', {
    scrollTrigger: {
      trigger: '.quran-section',
      start: 'top 70%',
    },
    opacity: 0,
    y: 40,
    duration: 1
  });
};

// Resources section animations
const animateResources = () => {
  gsap.from('.resources-card', {
    scrollTrigger: {
      trigger: '.resources-container',
      start: 'top 75%',
    },
    opacity: 0,
    y: 50,
    stagger: 0.15,
    duration: 0.7
  });
};

// Donation section animations
const animateDonation = () => {
  gsap.from('.donation-container', {
    scrollTrigger: {
      trigger: '.donation-container',
      start: 'top 75%',
    },
    opacity: 0,
    y: 40,
    duration: 0.8
  });
};

// Testimonials section animations
const animateTestimonials = () => {
  console.log('Testimonials animation is now handled within the component');
  // Animation is now directly in the component for better control
};

// Subscribe section animations
const animateSubscribe = () => {
  const subscribeTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.subscribe-container',
      start: 'top 75%',
    }
  });
  
  subscribeTl
    .from('.subscribe-title', { opacity: 0, y: 30, duration: 0.7 })
    .from('.subscribe-text', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.subscribe-form', { opacity: 0, y: 20, duration: 0.7 }, '-=0.4');
};

// Contact section animations
const animateContact = () => {
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: '.contact-container',
      start: 'top 70%',
    }
  });
  
  contactTl
    .from('.contact-info', { opacity: 0, x: -40, duration: 0.8 })
    .from('.contact-form', { opacity: 0, x: 40, duration: 0.8 }, '-=0.6');
};

// Footer animations
const animateFooter = () => {
  gsap.from('.footer-content', {
    scrollTrigger: {
      trigger: '.footer-container',
      start: 'top 90%',
    },
    opacity: 0,
    y: 20,
    duration: 0.8
  });
}; 