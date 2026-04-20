"use client";
import React, { useEffect, useState, useRef } from "react";
const servicesData = [
  {
    title: "Hematology (Blood Studies)",
    items: [
      "Full Blood Count (FBC) / Complete Blood Count (CBC): Measures red cells, white cells, and platelets.",
      "Hemoglobin (Hb) / Anemia Screening: To check for low blood levels.",
      "Erythrocyte Sedimentation Rate (ESR): Measures inflammation.",
      "Blood Grouping and Cross-matching: For safe blood transfusion.",
      "Sickle Cell Screening (Hb Electrophoresis): Diagnosing hemoglobinopathies.",
      "Coagulation Profile / PT/INR: Blood clotting times."
    ]
  },
  {
    title: "Clinical Chemistry / Biochemistry (Chemical Analysis)",
    items: [
      "Liver Function Tests (LFTs): ALT, AST, ALP, Bilirubin, Albumin.",
      "Renal/Kidney Function Tests (RFTs): Urea, Creatinine, Electrolytes (U&E).",
      "Lipid Profile: Total Cholesterol, HDL, LDL, Triglycerides.",
      "Blood Glucose Tests: Fasting Blood Sugar (FBS), Random Blood Sugar (RBS), Oral Glucose Tolerance Test (OGTT).",
      "HbA1c: Long-term diabetes monitoring.",
      "Cardiac Markers: Troponins, CK-MB.",
      "Uric Acid Test: For gout screening."
    ]
  },
  {
    title: "Microbiology & Parasitology (Infections)",
    items: [
      "Malaria Parasite (MP) Test: Thick and thin blood film.",
      "Urinalysis/Urine Routine Exam (R/E): Dipstick and microscopic analysis.",
      "Culture and Sensitivity (C&S): Urine, stool, wound, and blood cultures to identify bacteria and effective antibiotics.",
      "Widal Test / Typhoid Test: For Salmonella typhi.",
      "Stool Routine Examination (R/E): For parasites/ova.",
      "H. Pylori Test: Stool antigen or breath test."
    ]
  },
  {
    title: "Immunology & Serology (Immune System/Virus)",
    items: [
      "HIV Screening / Viral Load:",
      "Hepatitis Screening: HBsAg (Hep B), HCV (Hep C).",
      "Pregnancy Test (hCG): Urine or serum.",
      "Syphilis Test (VDRL):",
      "COVID-19 Testing: PCR and Rapid Antigen tests."
    ]
  },
  {
    title: "Hormone Studies (Endocrinology)",
    items: [
      "Thyroid Function Test: TSH, T3, T4.",
      "Reproductive Hormones: Progesterone, Prolactin, FSH, LH, Testosterone.",
      "Tumor Markers (Cancer Screening): PSA (Prostate), AFP (Liver), CA-125 (Ovary)."
    ]
  },
  {
    title: "Special Investigations",
    items: [
      "Histopathology/Biopsy: Tissue sample analysis for cancer.",
      "Cytology: PAP smear.",
      "DNA Paternity Testing:",
      "Genetic Testing:"
    ]
  }
];

const rotatingMessages = [
  {
    headline1: "Rapid Lab",
    headline2: "Tests & Screenings",
    desc: "Get complete and accurate information about your health in just a few minutes. We process most tests on-site for faster results and can forward the results to your doctor."
  },
  {
    headline1: "Delivery of Clinical Report",
    headline2: "In Record Time",
    desc: "Receive your clinical report securely and quickly. Our streamlined process ensures you get your results when you need them most."
  },
  {
    headline1: "Cutting-Edge Diagnostics",
    headline2: "Trusted by Professionals",
    desc: "We use the latest technology and expert staff to deliver reliable lab results for you and your healthcare provider."
  },
  {
    headline1: "Your Health, Our Priority",
    headline2: "Personalized Service",
    desc: "Experience personalized care and support throughout your testing journey. Your well-being is at the heart of what we do."
  }
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [headline1, setHeadline1] = useState("");
  const [headline2, setHeadline2] = useState("");
  const [descTyped, setDescTyped] = useState("");
  // Modal state for services section
  const [modalService, setModalService] = useState(null);

  // Typewriter animation for each message
  useEffect(() => {
    let h1 = 0, h2 = 0, desc = 0;
    setHeadline1("");
    setHeadline2("");
    setDescTyped("");
    const { headline1: h1Full, headline2: h2Full, desc: descFull } = rotatingMessages[current];

    const h1Interval = setInterval(() => {
      setHeadline1(h1Full.slice(0, h1 + 1));
      h1++;
      if (h1 === h1Full.length) {
        clearInterval(h1Interval);
        const h2Interval = setInterval(() => {
          setHeadline2(h2Full.slice(0, h2 + 1));
          h2++;
          if (h2 === h2Full.length) {
            clearInterval(h2Interval);
            const descInterval = setInterval(() => {
              setDescTyped(descFull.slice(0, desc + 1));
              desc++;
              if (desc === descFull.length) {
                clearInterval(descInterval);
              }
            }, 18);
          }
        }, 28);
      }
    }, 28);

    return () => {
      clearInterval(h1Interval);
    };
  }, [current]);


  // Rotate messages every 9 seconds (9000 ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % rotatingMessages.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main>
      <div className={modalService ? 'filter blur-md pointer-events-none select-none' : ''}>
        {/* Hero Section with Card Overlayed on Large Image */}
        <section className="relative flex items-center min-h-[800px] py-12 px-2 sm:px-6 lg:px-8 w-full overflow-hidden bg-white transition-all duration-300">
          {/* Large Background Image */}
          <img
            src="/lab.jpeg"
            alt="Medical Lab"
            className="absolute inset-0 w-full h-full object-cover object-[70%_40%] scale-100 z-0 animate-fade-in-up"
          />
          {/* Card Overlay - left aligned, not centered */}
          <div className="relative z-20 flex w-full max-w-7xl mx-auto">
            <div className="flex flex-col items-start justify-center min-h-[420px]">
              <div className="bg-slate-500/90 shadow-2xl drop-shadow-2xl p-14 w-full max-w-2xl h-[520px] flex flex-col justify-center items-start animate-fade-in-up ml-0 lg:ml-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 leading-tight min-h-[80px]">
                  <span className="block">{headline1}</span>
                  <span className="block">{headline2}</span>
                </h1>
                <div className="w-16 h-1 bg-white/70 rounded mb-6" />
                <p className="text-lg md:text-2xl text-white/90 mb-8 min-h-[96px]">
                  {descTyped}
                </p>
                <div className="flex gap-4 flex-col sm:flex-row">
                  <a
                    href="#"
                    className="px-7 py-3 rounded-lg font-semibold bg-rose-600 text-white shadow hover:bg-rose-700 transition-all text-center"
                  >
                    Schedule Your Visit
                  </a>
                  <a
                    href="#"
                    className="px-7 py-3 rounded-lg font-semibold border-2 border-lime-400 text-white bg-transparent hover:bg-lime-50 hover:text-lime-700 transition-all text-center flex items-center gap-2"
                  >
                    <span className="relative flex items-center">
                      <svg className="w-5 h-5 text-lime-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.54 6.36l-1.42-1.42M6.34 6.34L4.92 4.92m12.02 0l-1.42 1.42M6.34 17.66l-1.42 1.42" />
                      </svg>
                    </span>
                    Find the Nearest Lab
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="relative w-full flex flex-col items-center justify-center py-12 bg-white overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-extrabold text-blue-700 mb-8">Collaborated Partners</h2>
          <div className="relative w-full max-w-5xl overflow-x-hidden">
            <div className="flex gap-16 items-center animate-partner-scroll w-max">
              <img src="/partner1.png" alt="Partner 1" className="h-16 md:h-20 object-contain" />
              <img src="/partner2.jpeg" alt="Partner 2" className="h-16 md:h-20 object-contain" />
              <img src="/partner3.jpeg" alt="Partner 3" className="h-16 md:h-20 object-contain" />
              {/* Repeat for seamless loop */}
              <img src="/partner1.png" alt="Partner 1" className="h-16 md:h-20 object-contain" />
              <img src="/partner2.jpeg" alt="Partner 2" className="h-16 md:h-20 object-contain" />
              <img src="/partner3.jpeg" alt="Partner 3" className="h-16 md:h-20 object-contain" />
            </div>
          </div>
        </section>

        {/* Services Section with blurred DNA logo background and 2x2 cards */}
        <section className="relative flex flex-col items-center justify-center py-28 px-4 sm:px-8 bg-gradient-to-br from-white via-blue-50 to-lime-50 overflow-hidden min-h-[650px] transition-all duration-300">
          {/* Blurred background layer with DNA logo */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img src="/dna.jpeg" alt="DNA Logo" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] object-contain opacity-40" />
            <div className="absolute inset-0 bg-white/60 backdrop-blur-md" />
          </div>
          <div className="relative z-20 max-w-5xl w-full flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 animate-fade-in-up">Our Services</h2>
            <div className="w-16 h-1 bg-lime-400 rounded mb-6 animate-fade-in-up"></div>
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl text-center animate-fade-in-up">Explore our comprehensive range of laboratory services, designed for accuracy, speed, and your peace of mind.</p>
            <ServicesGrid22 modalService={modalService} setModalService={setModalService} />
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="relative flex flex-col items-center justify-center py-24 px-4 sm:px-8 bg-gradient-to-br from-blue-50 via-white to-lime-50 overflow-hidden min-h-[500px] transition-all duration-300">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-lime-100 rounded-full blur-3xl opacity-40"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
          <div className="relative z-20 max-w-4xl w-full flex flex-col items-center text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-6 animate-fade-in-up">About Us</h2>
            <div className="w-20 h-1 bg-lime-400 rounded mb-8 animate-fade-in-up"></div>
            <p className="text-xl md:text-2xl text-slate-700 mb-8 font-medium animate-fade-in-up max-w-3xl mx-auto">
              <span className="font-bold text-blue-700">DeltaGene Medical Laboratory</span> is dedicated to delivering <span className="text-lime-600 font-semibold">accurate</span>, <span className="text-lime-600 font-semibold">timely</span>, and <span className="text-lime-600 font-semibold">trusted</span> diagnostic results. Our state-of-the-art facility combines advanced technology with a passionate team of experts, ensuring every test is performed with precision and care. We empower patients and healthcare providers with reliable information, supporting better health decisions and peace of mind.
            </p>
            <div className="flex flex-col md:flex-row gap-8 w-full justify-center animate-fade-in-up">
              <div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-lime-400">
                <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><svg className="w-7 h-7 text-lime-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2l4 -4" /></svg>Accuracy</h3>
                <p className="text-lg text-slate-600">Every result is double-checked and validated by our experienced scientists, ensuring you get the most precise answers every time.</p>
              </div>
              <div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-blue-400">
                <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><svg className="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3" /></svg>Speed</h3>
                <p className="text-lg text-slate-600">We know your time matters. Our streamlined processes and on-site analysis deliver fast turnaround—without sacrificing quality.</p>
              </div>
              <div className="flex-1 bg-white/80 rounded-2xl shadow-lg p-8 border-t-4 border-rose-400">
                <h3 className="text-2xl font-bold text-blue-700 mb-3 flex items-center gap-2"><svg className="w-7 h-7 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01" /><circle cx="12" cy="12" r="10" /></svg>Trust</h3>
                <p className="text-lg text-slate-600">DeltaGene is trusted by doctors, clinics, and patients alike. We uphold the highest standards of confidentiality, ethics, and service.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Modal overlays all content, never blurred */}
      {modalService && (
        <ServiceModal service={modalService} onClose={() => setModalService(null)} />
      )}
    </main>
  );






// ServicesGrid: 4 cards side by side, long lists cycle within card

// 2x2 grid for services
type ServicesGrid22Props = {
  modalService: any;
  setModalService: (service: any) => void;
};
function ServicesGrid22({ modalService, setModalService }: ServicesGrid22Props) {
  const cards = servicesData.slice(0, 4);
  const icons = [
    <svg key="1" className="w-8 h-8 text-lime-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>,
    <svg key="2" className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>,
    <svg key="3" className="w-8 h-8 text-rose-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v.01" /><circle cx="12" cy="12" r="10" /></svg>,
    <svg key="4" className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
  ];
  return (
    <>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 w-full relative z-50 ${modalService ? 'filter blur-md pointer-events-none select-none' : ''}`}>
        {cards.map((service, idx) => (
          <ServiceCard key={service.title} service={service} onMore={() => setModalService(service)} icon={icons[idx % icons.length]} />
        ))}
      </div>
      {modalService && (
        <ServiceModal service={modalService} onClose={() => setModalService(null)} />
      )}
    </>
  );
}
}

type ServiceCardProps = {
  service: any;
  onMore: () => void;
  icon: React.ReactNode;
};
function ServiceCard({ service, onMore, icon }: ServiceCardProps) {
  const [startIdx, setStartIdx] = useState(0);
  const maxVisible = 4;
  const hasMore = service.items.length > maxVisible;

  useEffect(() => {
    if (!hasMore) return;
    const timer = setInterval(() => {
      setStartIdx((prev) => (prev + 1) % service.items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [hasMore, service.items.length]);

  let visibleItems = service.items;
  if (hasMore) {
    visibleItems = [];
    for (let i = 0; i < maxVisible; i++) {
      visibleItems.push(service.items[(startIdx + i) % service.items.length]);
    }
  }

  return (
    <div className="relative group bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-10 flex flex-col items-start min-h-[400px] min-w-[320px] md:min-w-[380px] max-w-full overflow-hidden border border-blue-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-lime-400">
      <div className="flex items-center gap-4 mb-4">
        <span>{icon}</span>
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 text-left w-full">{service.title}</h3>
      </div>
      <ul className="list-disc pl-6 md:pl-8 text-lg md:text-xl text-gray-700 space-y-3 w-full">
        {visibleItems.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      {hasMore && (
        <button
          className="absolute bottom-4 right-6 text-xs md:text-sm text-white font-semibold bg-lime-500 hover:bg-lime-600 transition-all px-3 py-1.5 rounded-lg shadow animate-pulse focus:outline-none focus:ring-2 focus:ring-lime-300"
          onClick={onMore}
        >
          more
        </button>
      )}
    </div>
  );
}

// Modal for full service details
function ServiceModal({ service, onClose }) {
  const modalRef = useRef();
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-lg w-full relative flex flex-col items-center border-2 border-blue-200" ref={modalRef}>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-blue-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <h3 className="text-2xl md:text-3xl font-bold text-blue-800 mb-6 text-center w-full">{service.title}</h3>
        <ul className="list-disc pl-6 text-base md:text-lg text-gray-700 space-y-2 mb-8 w-full">
          {service.items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <button className="px-7 py-3 rounded-lg font-semibold bg-lime-400 text-white shadow hover:bg-lime-500 transition-all text-center w-full mt-2">
          Book Appointment
        </button>
      </div>
    </div>
  );
}