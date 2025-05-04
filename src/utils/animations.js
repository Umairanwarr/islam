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

  // Set all elements to be visible by default
  ensureVisibility();

  // Use simpler fade-in animations that won't hide content
  addSimpleFadeEffects();
};

// Ensure all elements are visible by default
const ensureVisibility = () => {
  // Make sure all elements that might be animated are visible by default
  gsap.set([
    '.hero-content',
    '.hero-content h1',
    '.hero-content p',
    '.hero-content a',
    '.prayer-time-item',
    '.about-image',
    '.about-content',
    '.quran-container',
    '.resources-card',
    '.donation-container',
    '.testimonial-item',
    '.subscribe-title',
    '.subscribe-text',
    '.subscribe-form',
    '.contact-info',
    '.contact-form',
    '.footer-content'
  ], {
    opacity: 1,
    y: 0,
    x: 0,
    visibility: 'visible'
  });
};

// Add simple fade effects that won't hide content
const addSimpleFadeEffects = () => {
  // Only apply subtle enhancements to elements as they scroll into view
  // These won't hide elements if animations fail to trigger

  // Simple fade for prayer time items
  ScrollTrigger.batch('.prayer-time-item', {
    start: 'top 85%',
    onEnter: batch => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out'
      });
    },
    once: true
  });

  // Simple fade for resources cards
  ScrollTrigger.batch('.resources-card', {
    start: 'top 85%',
    onEnter: batch => {
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power1.out'
      });
    },
    once: true
  });

  // Simple fade for other sections
  const sections = [
    '.about-section',
    '.quran-section',
    '.donation-container',
    '.subscribe-container',
    '.contact-container',
    '.footer-container'
  ];

  sections.forEach(section => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(section, {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out'
        });
      },
      once: true
    });
  });
};