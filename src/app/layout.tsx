"use client";

import React, { useState } from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* Navigation Bar */}
        <nav className="w-full z-50 bg-white/90 backdrop-blur-md shadow fixed top-0 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <a href="/" className="flex items-center gap-2">
                <img src="/dna.jpeg" alt="DeltaGene Logo" className="w-10 h-10 rounded-full border-2 border-blue-200 shadow" />
                <span className="text-xl font-bold text-blue-800 font-display">Delta<span className="text-rose-600">Gene</span></span>
              </a>
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-8">
                <a href="/" className="font-medium text-blue-900 hover:text-rose-600 transition-colors">Home</a>
                <a href="#services" className="font-medium text-blue-900 hover:text-rose-600 transition-colors">Services</a>
                <a href="#about" className="font-medium text-blue-900 hover:text-rose-600 transition-colors">About</a>
                <a href="#book" className="ml-6 px-5 py-2 rounded-lg font-semibold bg-lime-500 text-white shadow hover:bg-lime-600 transition-all border-2 border-lime-400">Book Test</a>
              </div>
              {/* Hamburger for mobile */}
              <button className="md:hidden flex items-center px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => setNavOpen(!navOpen)} aria-label="Open navigation menu">
                <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                </svg>
              </button>
            </div>
            {/* Mobile Nav Drawer */}
            {navOpen && (
              <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col items-center gap-6 py-8 z-50 animate-fade-in-up">
                <a href="/" className="font-medium text-blue-900 hover:text-rose-600 transition-colors text-lg" onClick={() => setNavOpen(false)}>Home</a>
                <a href="#services" className="font-medium text-blue-900 hover:text-rose-600 transition-colors text-lg" onClick={() => setNavOpen(false)}>Services</a>
                <a href="#about" className="font-medium text-blue-900 hover:text-rose-600 transition-colors text-lg" onClick={() => setNavOpen(false)}>About</a>
                <a href="#book" className="px-5 py-2 rounded-lg font-semibold bg-lime-500 text-white shadow hover:bg-lime-600 transition-all border-2 border-lime-400 text-lg" onClick={() => setNavOpen(false)}>Book Test</a>
              </div>
            )}
          </div>
        </nav>
        <div className="pt-16 flex flex-col min-h-screen">{/* Spacer for fixed navbar */}
          <div className="flex-1">
            {children}
          </div>
          {/* Footer */}
          <footer className="w-full bg-gradient-to-br from-blue-50 via-white to-lime-50 border-t border-blue-100 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
              <div className="flex flex-col items-center md:items-start gap-2">
                <a href="/" className="flex items-center gap-2 mb-2">
                  <img src="/dna.jpeg" alt="DeltaGene Logo" className="w-10 h-10 rounded-full border-2 border-blue-200 shadow" />
                  <span className="text-xl font-bold text-blue-800 font-display">Delta<span className="text-rose-600">Gene</span></span>
                </a>
                <p className="text-slate-500 text-sm">Accurate. Timely. Trusted.</p>
                <p className="text-slate-400 text-xs">&copy; {new Date().getFullYear()} DeltaGene Medical Laboratory. All rights reserved.</p>
              </div>
              <div className="flex flex-col gap-2 text-center md:text-left">
                <span className="text-blue-800 font-semibold mb-1">Quick Links</span>
                <a href="/" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">Home</a>
                <a href="#services" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">Services</a>
                <a href="#about" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">About</a>
                <a href="#book" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">Book Test</a>
              </div>
              <div className="flex flex-col gap-2 text-center md:text-left">
                <span className="text-blue-800 font-semibold mb-1">Contact</span>
                <span className="text-slate-600 text-sm">1st Street Tanoso Anwiankwanta, Kumasi, Ghana</span>
                <a href="tel:+233248589563" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">+233 (24) 858 9563</a>
                <a href="mailto:info.deltagene@gmail.com" className="text-slate-600 hover:text-lime-600 transition-colors text-sm">info.deltagene@gmail.com</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
