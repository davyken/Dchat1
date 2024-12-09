import React, { useState } from "react";
import { Link } from "react-router-dom";
import { XIcon } from "@heroicons/react/outline";
import { FaCommentDots, FaShareSquare, FaLock } from "react-icons/fa";
import SignUp from "../signup/SignUp";

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="flex flex-col bg-white text-gray-900">
      <header className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-xl font-bold md:text-4xl text-blue-500">D-Chat</h1>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li><a href="#features" className="text-gray-700 hover:text-blue-500">Features</a></li>
              <li><a href="#testimonials" className="text-gray-700 hover:text-blue-500">Testimonials</a></li>
              <li><a href="#contact" className="text-gray-700 hover:text-blue-500">Contact</a></li>
            </ul>
          </nav>
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
          <Link to="/signup" className="px-6 py-3  text-white rounded hover:bg-blue-700">
          Sign Up
          </Link>
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="bg-white text-gray-900 py-20">
          <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold md:text-6xl mb-6">
                Let's Connect<br/> with Friends and <br/>Family in Real Time
              </h2>
              <p className="text-xl mb-8">
                Our app makes it easy to stay in touch with the people who matter most in a secure manner, giving the impression of being in front of the person.
              </p>
              <Link to="/signup"     className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-700 shake" >

                Get Started
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="/images/WhatsApp Image 2024-09-25 at 18.53.05.jpeg" 
                alt="D-Chat App Preview" 
                className="rounded-lg"
              />
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <FaCommentDots className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">Real-Time Messaging</h3>
                <p>Experience instant messaging with our real-time chat feature.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <FaShareSquare className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">Media Sharing</h3>
                <p>Share photos, videos, and voice messages with loved ones easily.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col items-center">
                <FaLock className="text-blue-500 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-4">Secure and Private</h3>
                <p>Your conversations are encrypted and secure.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center flex flex-col items-center">
            <FaCommentDots className="text-blue-500 text-4xl mb-4" />
                <p className="mb-4">"This app has changed the way I communicate with my family. It's so easy to use and the features are fantastic!"</p>
                <p className="font-bold">- Dr. John</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <FaCommentDots className="text-blue-500 text-4xl mb-4" />
                <p className="mb-4">"I love the real-time messaging feature. It feels like I'm having a face-to-face conversation."</p>
                <p className="font-bold">- Officer Chelsy</p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center flex flex-col items-center">
              <FaCommentDots className="text-blue-500 text-4xl mb-4" />
                <p className="mb-4">"The app is secure and private, which is very important to me. Highly recommend!"</p>
                <p className="font-bold">- User Davy</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="bg-blue-500 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="mb-2">Email: davyken@gmail.com</p>
          <p className="mb-4">Phone: (237) 693230485</p>
          <p>&copy; 2024 D-Chat. All rights reserved.</p>
        </div>
      </footer>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button 
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <XIcon className="h-6 w-6" />
            </button>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;