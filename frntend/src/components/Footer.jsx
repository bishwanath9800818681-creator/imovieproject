import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Rss } from 'lucide-react';
import FeedbackForm from './FeedbackForm';

const Footer = () => {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <footer className="bg-gray-800 text-white p-6">
      <div className="container mx-auto flex flex-col items-center space-y-4">
        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="h-6 w-6 hover:text-gray-400" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Twitter className="h-6 w-6 hover:text-gray-400" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="h-6 w-6 hover:text-gray-400" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Youtube className="h-6 w-6 hover:text-gray-400" />
          </a>
          <a href="/rss" target="_blank" rel="noopener noreferrer">
            <Rss className="h-6 w-6 hover:text-gray-400" />
          </a>
        </div>

        {/* First row of text links */}
        <div className="flex space-x-4">
          <a href="/about" className="text-sm hover:text-gray-400">About</a>
        </div>

        {/* Second row of text links */}
        <div className="flex space-x-4">
          <a href="/privacy" className="text-sm hover:text-gray-400">Privacy</a>
          <a href="/terms" className="text-sm hover:text-gray-400">Terms of Use</a>
        </div>

        {/* Manage Privacy Settings */}
        <div className="flex space-x-4">
          <a href="/privacy-settings" className="text-sm hover:text-gray-400">Manage Privacy Settings</a>
        </div>

        {/* Give Feedback Button */}
        <button
          onClick={() => setShowFeedback(true)}
          className="text-sm text-gray-300 hover:text-white hover:underline focus:outline-none"
        >
          Give Feedback
        </button>

        {/* Contact Details */}
        <div className="text-center">
          <p>Contact Us</p>
          <p className="text-sm">Phone: +1 (123) 456-7890</p>
          <p className="text-sm">Email: info@example.com</p>
          <p className="text-sm">Address: 123 Example St, Example City, EX 12345</p>
        </div>

        {/* Network icons row */}
        <div className="flex space-x-4">
          {/* Add network icons here if needed */}
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>

      {/* Feedback Form Modal */}
      {showFeedback && <FeedbackForm onClose={() => setShowFeedback(false)} />}
    </footer>
  );
};

export default Footer;
