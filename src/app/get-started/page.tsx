'use client'

import { useState, useEffect, useRef } from 'react'

const services = [
  {
    title: 'Hematology',
    description: 'Comprehensive blood analysis including complete blood count, coagulation studies, and blood disorder diagnostics.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    title: 'Clinical Chemistry',
    description: 'Advanced biochemical analysis for kidney function, liver function, lipid profile, diabetes screening, and metabolic panels.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  },
  {
    title: 'Microbiology',
    description: 'Bacterial, viral, and fungal culture analysis, antibiotic sensitivity testing, and infectious disease diagnostics.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    title: 'Parasitology',
    description: 'Detection and analysis of parasitic infections including intestinal parasites, malaria, and other vector-borne diseases.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )
  },
  {
    title: 'Toxicology',
    description: 'Drug screening, heavy metal analysis, and toxicology reports for occupational health and safety compliance.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    title: 'Molecular Diagnostics',
    description: 'DNA/RNA analysis for genetic diseases and cancer detection. Comprehensive genetic testing services.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
]

export default function GetStarted() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'inquiry' | 'appointment'>('inquiry')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0])
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    services.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index])
      }, index * 100)
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const targets = [500000, 99.9, 100, 24]
          targets.forEach((target, index) => {
            let current = 0
            const increment = target / 50
            const interval = setInterval(() => {
              current += increment
              if (current >= target) {
                current = target
                clearInterval(interval)
              }
              setAnimatedValues(prev => {
                const newValues = [...prev]
                newValues[index] = current
                return newValues
              })
            }, 30)
          })
        }
      },
      { threshold: 0.5 }
    )
    
    if (statsRef.current) {
      observer.observe(statsRef.current)
    }
    
    return () => observer.disconnect()
  }, [hasAnimated])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Could not access microphone. Please ensure microphone permissions are granted.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const deleteRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
      setAudioUrl(null)
      setAudioBlob(null)
    }
  }

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Inquiry submitted:', formData, audioBlob)
    setSubmitted(true)
  }

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Appointment submitted:', appointmentData, audioBlob)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleAppointmentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAppointmentData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="min-h-screen dna-bg">
      {/* Navigation - Same as Home Page */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className={`relative w-12 h-12 rounded-full overflow-hidden border-2 shadow-lg ${scrolled ? 'border-purple-500/30 bg-white' : 'border-white/30 bg-white/10 backdrop-blur-sm'}`}>
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
              <a href="/" className={`font-medium transition-colors hover:text-white ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>Home</a>
              <a href="#services" className={`font-medium transition-colors hover:text-white ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>Services</a>
              <a href="#technology" className={`font-medium transition-colors hover:text-white ${scrolled ? 'text-slate-600' : 'text-white/90'}`}>Technology</a>
            </div>

            <div className="flex items-center gap-4">
              <button className={`px-5 py-2.5 rounded-full font-semibold transition-all hover:shadow-lg ${scrolled ? 'bg-white text-slate-800 hover:bg-gray-100' : 'bg-white text-slate-800 hover:bg-gray-100'}`}>
                Order Your Kit
              </button>
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className={`w-6 h-6 ${scrolled ? 'text-slate-800' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a href="/" className="block py-2 text-slate-700 font-medium hover:text-purple-600">Home</a>
              <a href="#services" className="block py-2 text-slate-700 font-medium hover:text-purple-600">Services</a>
              <a href="#technology" className="block py-2 text-slate-700 font-medium hover:text-purple-600">Technology</a>
              <a href="#contact" className="block py-2 text-slate-700 font-medium hover:text-purple-600">Contact</a>
              <button className="w-full mt-4 px-5 py-2.5 rounded-full bg-purple-600 text-white font-semibold">
                Order Your Kit
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Dark Purple Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0a20] via-[#36013F] to-[#1a0a20]">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                  Ghana's #1 Diagnostic Center
                </span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 leading-tight">
                Begin Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200">
                  Health Journey
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                Take the first step towards better health with Ghana's most trusted laboratory. 
                Get expert diagnostics, personalized health insights, and world-class care — all in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
                <button 
                  onClick={() => document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-white to-gray-200 text-slate-800 font-semibold text-lg hover:shadow-xl hover:shadow-white/30 transition-all transform hover:scale-105"
                >
                  Explore Services
                </button>
                <button className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all">
                  Order Your Kit
                </button>
              </div>
            </div>

            {/* Hero Images */}
            <div className="hidden lg:block relative">
              <div className="relative w-full h-[400px]">
                <div className="absolute top-0 right-0 w-64 h-64 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img src="/stateOfart1.jpeg" alt="Laboratory Equipment" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-10 left-0 w-56 h-56 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img src="/stateOfart2.jpg" alt="Medical Testing" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
                  <img src="/stateOfArt3.jpg" alt="DNA Analysis" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div id="form-section" className="px-4 sm:px-6 lg:px-8 py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-200">
            <button
              onClick={() => { setActiveTab('inquiry'); setSubmitted(false); }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'inquiry'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Submit Inquiry
            </button>
            <button
              onClick={() => { setActiveTab('appointment'); setSubmitted(false); }}
              className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'appointment'
                  ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg'
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          {submitted ? (
            <div className="bg-white rounded-2xl p-10 text-center shadow-lg border border-slate-200">
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Thank You!</h2>
              <p className="text-slate-600 text-lg mb-6">
                {activeTab === 'inquiry' 
                  ? 'Your inquiry has been submitted successfully. Our team will contact you within 24 hours.'
                  : 'Your appointment has been booked successfully. We look forward to seeing you.'
                }
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-purple-600 hover:text-purple-700 font-medium text-lg"
              >
                Submit another {activeTab === 'inquiry' ? 'inquiry' : 'appointment'}
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-8">
              {/* Services Section - White Cards */}
              <div id="services-section" className="lg:col-span-7">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Our Comprehensive Services</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service, index) => (
                    <div 
                      key={index}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-slate-100 ${
                        visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                      style={{
                        transitionDelay: `${index * 100}ms`,
                        transitionDuration: '400ms'
                      }}
                    >
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center mb-5">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 mb-2">{service.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{service.description}</p>
                    </div>
                  ))}
                </div>

                {/* Stats Section - Dark Purple with White Cards */}
                <div ref={statsRef} className="mt-10 bg-gradient-to-br from-[#1a0a20] via-[#36013F] to-[#1a0a20] rounded-2xl p-8 border border-purple-500/30">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {animatedValues[0] >= 1000 ? `${Math.floor(animatedValues[0] / 1000)}K+` : `${Math.floor(animatedValues[0])}+`}
                      </div>
                      <div className="text-purple-200 font-medium">Lab Samples</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {animatedValues[1].toFixed(1)}%
                      </div>
                      <div className="text-purple-200 font-medium">Accuracy</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        {Math.floor(animatedValues[2])}+
                      </div>
                      <div className="text-purple-200 font-medium">Test Types</div>
                    </div>
                    <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                      <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                        24/7
                      </div>
                      <div className="text-purple-200 font-medium">Support</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Section */}
              <div className="lg:col-span-5">
                {activeTab === 'inquiry' ? (
                  <form onSubmit={handleInquirySubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Send us an Inquiry</h2>
                    
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-slate-700 mb-2 font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-slate-700 mb-2 font-medium">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-slate-700 mb-2 font-medium">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="+233 50 123 4567"
                          />
                        </div>
                      </div>

                      {/* Preferred Communication Method */}
                      <div>
                        <label className="block text-slate-700 mb-2 font-medium">
                          Preferred Communication Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="commMethod" value="phone" className="text-purple-600" defaultChecked />
                            <span className="text-sm">📞 Phone</span>
                          </label>
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="commMethod" value="whatsapp" className="text-purple-600" />
                            <span className="text-sm">💬 WhatsApp</span>
                          </label>
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="commMethod" value="email" className="text-purple-600" />
                            <span className="text-sm">✉️ Email</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="service" className="block text-slate-700 mb-2 font-medium">
                          Service Interested In
                        </label>
                        <select
                          id="service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        >
                          <option value="" className="text-slate-800">Select a service</option>
                          <option value="hematology" className="text-slate-800">Hematology</option>
                          <option value="chemistry" className="text-slate-800">Clinical Chemistry</option>
                          <option value="microbiology" className="text-slate-800">Microbiology</option>
                          <option value="parasitology" className="text-slate-800">Parasitology</option>
                          <option value="toxicology" className="text-slate-800">Toxicology</option>
                          <option value="molecular" className="text-slate-800">Molecular Diagnostics</option>
                          <option value="other" className="text-slate-800">Other</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-slate-700 mb-2 font-medium">
                          Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={3}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      {/* Audio Recording */}
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <label className="block text-slate-700 mb-3 font-medium">
                          Voice Message (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                          {!isRecording && !audioUrl && (
                            <button
                              type="button"
                              onClick={startRecording}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                              </svg>
                              Record
                            </button>
                          )}
                          {isRecording && (
                            <button
                              type="button"
                              onClick={stopRecording}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white animate-pulse"
                            >
                              <span className="w-3 h-3 bg-white rounded-full"></span>
                              Recording...
                            </button>
                          )}
                          {audioUrl && (
                            <div className="flex items-center gap-3 flex-1">
                              <audio controls src={audioUrl} className="flex-1 h-10" />
                              <button
                                type="button"
                                onClick={deleteRecording}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-purple-500/30"
                      >
                        Submit Inquiry →
                      </button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleAppointmentSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Book an Appointment</h2>
                    
                    <div className="space-y-5">
                      <div>
                        <label htmlFor="appt-name" className="block text-slate-700 mb-2 font-medium">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="appt-name"
                          name="name"
                          required
                          value={appointmentData.name}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="appt-email" className="block text-slate-700 mb-2 font-medium">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="appt-email"
                            name="email"
                            required
                            value={appointmentData.email}
                            onChange={handleAppointmentChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="john@example.com"
                          />
                        </div>

                        <div>
                          <label htmlFor="appt-phone" className="block text-slate-700 mb-2 font-medium">
                            Phone *
                          </label>
                          <input
                            type="tel"
                            id="appt-phone"
                            name="phone"
                            required
                            value={appointmentData.phone}
                            onChange={handleAppointmentChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                            placeholder="+233 50 123 4567"
                          />
                        </div>
                      </div>

                      {/* Preferred Communication Method */}
                      <div>
                        <label className="block text-slate-700 mb-2 font-medium">
                          Preferred Communication Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="apptCommMethod" value="phone" className="text-purple-600" defaultChecked />
                            <span className="text-sm">📞 Phone</span>
                          </label>
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="apptCommMethod" value="whatsapp" className="text-purple-600" />
                            <span className="text-sm">💬 WhatsApp</span>
                          </label>
                          <label className="flex items-center gap-2 p-3 rounded-lg border border-slate-200 cursor-pointer hover:bg-purple-50 transition-colors">
                            <input type="radio" name="apptCommMethod" value="email" className="text-purple-600" />
                            <span className="text-sm">✉️ Email</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="appt-service" className="block text-slate-700 mb-2 font-medium">
                          Service Required
                        </label>
                        <select
                          id="appt-service"
                          name="service"
                          value={appointmentData.service}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                        >
                          <option value="" className="text-slate-800">Select a service</option>
                          <option value="hematology" className="text-slate-800">Hematology</option>
                          <option value="chemistry" className="text-slate-800">Clinical Chemistry</option>
                          <option value="microbiology" className="text-slate-800">Microbiology</option>
                          <option value="parasitology" className="text-slate-800">Parasitology</option>
                          <option value="toxicology" className="text-slate-800">Toxicology</option>
                          <option value="molecular" className="text-slate-800">Molecular Diagnostics</option>
                          <option value="consultation" className="text-slate-800">General Consultation</option>
                          <option value="other" className="text-slate-800">Other</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="appt-date" className="block text-slate-700 mb-2 font-medium">
                            Preferred Date *
                          </label>
                          <input
                            type="date"
                            id="appt-date"
                            name="date"
                            required
                            value={appointmentData.date}
                            onChange={handleAppointmentChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          />
                        </div>

                        <div>
                          <label htmlFor="appt-time" className="block text-slate-700 mb-2 font-medium">
                            Preferred Time *
                          </label>
                          <select
                            id="appt-time"
                            name="time"
                            required
                            value={appointmentData.time}
                            onChange={handleAppointmentChange}
                            className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all"
                          >
                            <option value="" className="text-slate-800">Select time</option>
                            <option value="08:00" className="text-slate-800">8:00 AM</option>
                            <option value="09:00" className="text-slate-800">9:00 AM</option>
                            <option value="10:00" className="text-slate-800">10:00 AM</option>
                            <option value="11:00" className="text-slate-800">11:00 AM</option>
                            <option value="12:00" className="text-slate-800">12:00 PM</option>
                            <option value="13:00" className="text-slate-800">1:00 PM</option>
                            <option value="14:00" className="text-slate-800">2:00 PM</option>
                            <option value="15:00" className="text-slate-800">3:00 PM</option>
                            <option value="16:00" className="text-slate-800">4:00 PM</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="appt-notes" className="block text-slate-700 mb-2 font-medium">
                          Additional Notes
                        </label>
                        <textarea
                          id="appt-notes"
                          name="notes"
                          rows={3}
                          value={appointmentData.notes}
                          onChange={handleAppointmentChange}
                          className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                          placeholder="Any additional information..."
                        />
                      </div>

                      {/* Audio Recording for Appointment */}
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <label className="block text-slate-700 mb-3 font-medium">
                          Voice Notes (Optional)
                        </label>
                        <div className="flex items-center gap-4">
                          {!isRecording && !audioUrl && (
                            <button
                              type="button"
                              onClick={startRecording}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.91-3c-.49 0-.9.36-.98.85C16.52 14.2 14.47 16 12 16s-4.52-1.8-4.93-4.15c-.08-.49-.49-.85-.98-.85-.61 0-1.09.54-1 1.14.49 3 2.89 5.35 5.91 5.78V20c0 .55.45 1 1 1s1-.45 1-1v-2.08c3.02-.43 5.42-2.78 5.91-5.78.1-.6-.39-1.14-1-1.14z"/>
                              </svg>
                              Record
                            </button>
                          )}
                          {isRecording && (
                            <button
                              type="button"
                              onClick={stopRecording}
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white animate-pulse"
                            >
                              <span className="w-3 h-3 bg-white rounded-full"></span>
                              Recording...
                            </button>
                          )}
                          {audioUrl && (
                            <div className="flex items-center gap-3 flex-1">
                              <audio controls src={audioUrl} className="flex-1 h-10" />
                              <button
                                type="button"
                                onClick={deleteRecording}
                                className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-purple-500/30"
                      >
                        Book Appointment →
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

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
      </footer>
    </main>
  )
}