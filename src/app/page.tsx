'use client'

import { useState, useEffect } from 'react'

// Technology data for modal
const technologyDetails = [
  {
    title: 'Hematology & Clinical Chemistry',
    description: 'Automated analyzers for Complete Blood Count (CBC) and comprehensive blood component analysis. Our state-of-the-art equipment ensures precise results for patient diagnosis.',
    icon: '🔬'
  },
  {
    title: 'Digital Pathology & Microscopy',
    description: 'Advanced digital systems for blood smears and tissue analysis. High-resolution imaging enables remote consultation and accurate disease detection.',
    icon: '🔍'
  },
  {
    title: 'Molecular Diagnostics & Cytogenetics',
    description: 'Cutting-edge DNA/RNA analysis for genetic diseases and cancer detection. Our laboratory provides comprehensive genetic testing services.',
    icon: '🧬'
  },
  {
    title: 'LabConnect Ghana (LIS)',
    description: 'Our local Laboratory Information System ensures seamless workflow management, accurate sample tracking, and fast result delivery.',
    icon: '💻'
  },
  {
    title: 'Quality Assurance',
    description: 'ISO-compliant processes with rigorous internal and external quality control to ensure every result meets international standards.',
    icon: '✓'
  },
  {
    title: 'Expert Team',
    description: 'Our team of certified laboratory scientists and technicians brings decades of combined experience in medical diagnostics.',
    icon: '👨‍🔬'
  }
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen dna-bg">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                {/* DeltaGene Logo - Image */}
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 backdrop-blur-sm">
                  <img 
                    src="/logo.jpg" 
                    alt="DeltaGene Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className={`text-2xl font-bold font-display transition-colors ${scrolled ? 'text-slate-800' : 'text-white'}`}>
                  Delta<span className={scrolled ? 'text-purple-600' : 'text-white'}>Gene</span>
                </span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {/* Menu items hidden on landing page - shown on get-started page */}
            </div>

            <div className="flex items-center gap-4">
              <a href="/get-started" className={`px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-white/25 ${scrolled ? 'bg-white text-slate-800 hover:bg-gray-100' : 'bg-white text-slate-800 hover:bg-gray-100'}`}>
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a20] via-[#36013F] to-[#1a0a20]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
          <div className="mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              Pioneering Medical Laboratory Services
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
            Unlock Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer">
              Health Potential
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
            Delta Gene offers comprehensive medical laboratory services, from DNA analysis to blood tests, pathology, and personalized health diagnostics to help you live your healthiest life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <a href="/get-started" className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-gray-200 text-slate-800 font-semibold text-lg hover:shadow-xl hover:shadow-white/30 transition-all transform hover:scale-105">
              Start Your Journey
            </a>
            <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all">
              Learn More
            </button>
          </div>

            </div>
            
            {/* DNA Helix Visual - Right Side with Water Splash & Multicolor Animation */}
            <div className="hidden lg:flex justify-center items-center relative">
              {/* Water splash droplets */}
              <div className="absolute inset-0 w-96 h-96">
                {/* Top splash */}
                <div className="absolute top-4 left-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 animate-water-drop-1"></div>
                <div className="absolute top-8 left-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-500 animate-water-drop-2"></div>
                <div className="absolute top-6 right-1/4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 animate-water-drop-3"></div>
                {/* Side splashes */}
                <div className="absolute left-2 top-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-water-drop-4"></div>
                <div className="absolute right-4 top-1/4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-teal-500 to-blue-500 animate-water-drop-5"></div>
                <div className="absolute left-4 bottom-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-water-drop-6"></div>
                <div className="absolute right-6 bottom-1/4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-water-drop-1"></div>
                {/* Bottom splash */}
                <div className="absolute bottom-8 left-1/4 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 animate-water-drop-2"></div>
                <div className="absolute bottom-4 right-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 animate-water-drop-3"></div>
              </div>
              
              <div className="w-80 h-80 relative">
                <svg viewBox="0 0 100 200" className="w-full h-full">
                  <defs>
                    <linearGradient id="helixGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="50%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                    <linearGradient id="helixGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="helixGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#a78bfa" />
                    </linearGradient>
                    <linearGradient id="helixGrad4" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                  </defs>
                  
                  {/* Outer glow */}
                  <ellipse cx="50" cy="100" rx="45" ry="90" fill="none" stroke="url(#helixGrad1)" strokeWidth="1" opacity="0.2" className="animate-pulse" />
                  
                  {/* DNA Helix strands with wave animation */}
                  <g className="animate-helix-spin">
                    <path d="M30 0 Q50 25 70 50 Q90 75 70 100 Q50 125 30 150 Q10 175 30 200" 
                          fill="none" stroke="url(#helixGrad1)" strokeWidth="3" opacity="0.9" />
                    <path d="M70 0 Q50 25 30 50 Q10 75 30 100 Q50 125 70 150 Q90 175 70 200" 
                          fill="none" stroke="url(#helixGrad2)" strokeWidth="3" opacity="0.9" />
                  </g>
                  
                  {/* Connecting lines - multicolor */}
                  {[0, 25, 50, 75, 100, 125, 150, 175].map((y, i) => (
                    <line 
                      key={i}
                      x1={30 + (i % 2 === 0 ? 0 : 40) - (Math.sin(i * Math.PI / 4) * 20)} 
                      y1={y}
                      x2={70 - (i % 2 === 0 ? 0 : 40) + (Math.sin(i * Math.PI / 4) * 20)} 
                      y2={y}
                      stroke={i % 2 === 0 ? '#8b5cf6' : '#06b6d4'}
                      strokeWidth="1.5"
                      opacity="0.6"
                    />
                  ))}
                  
                  {/* Base pairs - multicolor */}
                  {[
                    { y: 25, color: '#f472b6' },
                    { y: 75, color: '#8b5cf6' },
                    { y: 125, color: '#22d3ee' },
                    { y: 175, color: '#34d399' }
                  ].map((bp, i) => (
                    <circle key={i} cx="50" cy={bp.y} r="5" fill={bp.color} opacity="0.9" className="animate-pulse" />
                  ))}
                </svg>
              </div>
              
              {/* Colorful glow effects */}
              <div className="absolute inset-0 w-96 h-96 bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-64 h-64 -left-8 top-1/4 bg-pink-500/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute w-64 h-64 -right-8 bottom-1/4 bg-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500K+', label: 'Lab Samples Processed' },
              { number: '99.9%', label: 'Accuracy Rate' },
              { number: '100+', label: 'Test Types' },
              { number: '24/7', label: 'Support Available' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-slate-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-4">Comprehensive Laboratory Solutions</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              From ancestry analysis to personalized health recommendations, we provide cutting-edge genetic testing services.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
                title: 'Haematology',
                description: 'Comprehensive blood analysis including complete blood count, coagulation studies, and blood disorder diagnostics.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                ),
                title: 'Clinical Chemistry',
                description: 'Advanced biochemical analysis for kidney function, liver function, lipid profile, diabetes screening, and metabolic panels.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: 'Microbiology',
                description: 'Bacterial, viral, and fungal culture analysis, antibiotic sensitivity testing, and infectious disease diagnostics.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                title: 'Parasitology',
                description: 'Detection and analysis of parasitic infections including intestinal parasites, malaria, and other vector-borne diseases.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: 'Toxicology',
                description: 'Drug screening, heavy metal analysis, and toxicology reports for occupational health and safety compliance.'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
                title: 'Laboratory Consultation',
                description: 'Expert consultation with our laboratory specialists to interpret test results and guide your healthcare decisions.'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          {/* View More Services Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold text-lg hover:shadow-xl hover:shadow-slate-500/30 transition-all transform hover:scale-105">
              View All Services
            </button>
            <p className="mt-4 text-slate-600">Including: Vaccination, Pre-marital Screening, Health Screenings for Groups & Corporate Bodies</p>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-slate-600 font-semibold text-sm uppercase tracking-wider">Our Technology</span>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-2 mb-6">State-of-the-Art Laboratory Technology</h2>
              <p className="text-xl text-slate-600 mb-8">
                Our state-of-the-art laboratory combines Hematology, Clinical Chemistry, Digital Pathology, Molecular Diagnostics, and advanced Laboratory Information Systems to deliver accurate and reliable results.
              </p>
              <div className="space-y-4">
                {[
                  'Hematology & Clinical Chemistry: Automated analyzers for CBC and blood component analysis',
                  'Digital Pathology & Microscopy: Advanced digital systems for blood smears and tissue analysis',
                  'Molecular Diagnostics & Cytogenetics: DNA/RNA analysis for genetic diseases and cancer detection',
                  'LabConnect Ghana (LIS): Our local Laboratory Information System for seamless workflow management'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
                      <svg className="w-4 h-4 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* Combined State of Art Images Gallery */}
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                {/* Main large image - stateOfArt3 */}
                <div className="absolute inset-0">
                  <img 
                    src="/stateOfArt3.jpg" 
                    alt="State of Art Laboratory 3" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
                </div>
                
                {/* Overlay images creating layered effect */}
                <div className="absolute bottom-4 left-4 w-32 h-24 rounded-xl overflow-hidden shadow-lg border-2 border-white/50 animate-float">
                  <img 
                    src="/stateOfart1.jpeg" 
                    alt="State of Art Laboratory 1" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="absolute bottom-4 right-4 w-28 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white/50 animate-float-delayed">
                  <img 
                    src="/stateOfart2.jpg" 
                    alt="State of Art Laboratory 2" 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Floating badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                  <span className="text-white text-sm font-semibold">🏥 Advanced Technology</span>
                </div>
                
                {/* Technology overlay text */}
                <div className="absolute bottom-16 left-4 right-4">
                  <p className="text-white font-semibold text-lg">State-of-the-Art Laboratory</p>
                  <p className="text-white/80 text-sm">Advanced equipment for accurate diagnostics</p>
                </div>
              </div>
              
              {/* Button to explore technology */}
              <button 
                aria-label="Explore our laboratory technology"
                onClick={() => setIsModalOpen(true)}
                className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-slate-500/30 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-3 group"
              >
                <span>Explore Our Technology</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              {/* Animated pulse indicator */}
              <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-slate-600 rounded-full animate-pulse"></div>
              <div className="hidden lg:block absolute -right-8 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#1a0a20] to-[#36013F]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Discover Your Health Story?</h2>
          <p className="text-xl text-slate-300 mb-10">
            Join hundreds of thousands who have taken control of their health through our comprehensive laboratory services. Start your journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-gray-200 text-slate-800 font-semibold text-lg hover:shadow-xl hover:shadow-white/30 transition-all transform hover:scale-105">
              Order Your Kit
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all">
              Speak to an Expert
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a0a20] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white/10 backdrop-blur-sm">
                  <img 
                    src="/logo.jpg" 
                    alt="DeltaGene Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-2xl font-bold font-display text-white">
                  Delta<span className="text-white">Gene</span>
                </span>
              </div>
              <p className="text-slate-400 max-w-md">
                DeltaGene delivers comprehensive medical laboratory services with cutting-edge technology. Your health data is secure with us — we prioritize privacy and accuracy in every test.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {['About Us', 'Services', 'Technology', 'Pricing', 'FAQ'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400">
                <li>services.deltaGene@gmail.com</li>
                <li>+233 (020) 319 7001</li>
                <li>Mon-Fri: 9AM - 6PM GMT</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2024 DeltaGene. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a key={link} href="#" className="text-slate-500 hover:text-white text-sm transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      {/* Technology Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-scale-in">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Our Laboratory Technology</h3>
                  <p className="text-slate-300 text-sm mt-1">Discover our state-of-the-art equipment and capabilities</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors flex items-center justify-center"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
              <div className="grid md:grid-cols-2 gap-4">
                {technologyDetails.map((tech, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all hover:shadow-md group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center text-2xl flex-shrink-0">
                        {tech.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 mb-2 group-hover:text-slate-700">{tech.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Additional Info */}
              <div className="mt-8 p-6 bg-gradient-to-r from-slate-100 to-slate-50 rounded-2xl border border-slate-200">
                <h4 className="font-bold text-slate-800 mb-3">Why Choose Our Laboratory?</h4>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-slate-700">99.9%</div>
                    <div className="text-slate-600 text-sm">Accuracy Rate</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-700">500K+</div>
                    <div className="text-slate-600 text-sm">Samples Processed</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-700">24/7</div>
                    <div className="text-slate-600 text-sm">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-center">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      </footer>
    </main>
  )
}
