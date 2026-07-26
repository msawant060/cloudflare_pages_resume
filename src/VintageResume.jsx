import React, { useState, useRef } from 'react';
import {
  Mail,
  Phone,
  Link,
  MapPin,
  Code2,
  Box,
  Ship,
  LineChart,
  Cloud,
  Container,
  Terminal,
} from 'lucide-react';

const VintageResume = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);

  const updateParallaxOffset = (clientX, clientY) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseMove = (e) => {
    updateParallaxOffset(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Skills data
  const skills = [
    { name: 'Platform Engineering', level: 9 },
    { name: 'Kubernetes/OpenShift', level: 9 },
    { name: 'Cloud Infrastructure', level: 8 },
    { name: 'Infrastructure as Code', level: 9 },
    { name: 'Observability', level: 8 },
    { name: 'Platform Security', level: 8 },
  ];

  // Tools data, now paired with real icon components (improvement #4)
  const tools = [
    { name: 'Terraform', percentage: 95, Icon: Box },
    { name: 'Helm', percentage: 90, Icon: Ship },
    { name: 'Prometheus', percentage: 85, Icon: LineChart },
    { name: 'Azure/AWS', percentage: 90, Icon: Cloud },
    { name: 'Docker', percentage: 92, Icon: Container },
    { name: 'Git/Bash', percentage: 95, Icon: Terminal },
  ];

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden"
      style={{ backgroundColor: '#f2efe9' }}
    >
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Header with Parallax (mouse only — improvement #1: no jank on touch) */}
        <header
          ref={headerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mb-10 sm:mb-16 relative"
        >
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
            }}
          >
            <h1
              className="text-4xl sm:text-7xl lg:text-9xl break-words font-serif font-bold tracking-tight leading-none"
              style={{ color: '#222222', letterSpacing: '0.05em' }}
            >
              Mihir Sawant
            </h1>
            <p
              className="mt-3 text-sm sm:text-lg tracking-widest uppercase"
              style={{ color: '#888888' }}
            >
              Platform Engineering &middot; Kubernetes &amp; Cloud Infrastructure
            </p>
            <div className="h-1 w-24 sm:w-32 mt-4" style={{ backgroundColor: '#d4af37' }} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-12 sm:mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Left: Profile image with monogram */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <div
                className="aspect-square flex items-center justify-center relative"
                style={{
                  backgroundColor: '#2b2b2b',
                }}
              >
                <img
                  src="/profile.jpg"
                  alt="Mihir Sawant"
                  className="absolute inset-0 h-full w-full object-cover grayscale"
                />

                {/* Faded Typography Background */}
                <div
                  className="absolute inset-0 z-10 opacity-[0.2] text-gray-100 font-serif text-2xl sm:text-3xl overflow-hidden pointer-events-none flex items-center justify-center text-center px-6"
                  style={{ lineHeight: '1.8' }}
                >
                  PLATFORM &bull; CLOUD &bull; DEVOPS &bull; INFRASTRUCTURE
                </div>

                {/* Monogram */}
                <p
                  className="relative z-20 text-7xl sm:text-8xl lg:text-9xl font-bold transition-transform duration-300 group-hover:scale-105"
                  style={{
                    color: '#d4af37',
                    fontFamily: 'Georgia, serif',
                    letterSpacing: '0.05em',
                  }}
                >
                  MS
                </p>
              </div>

              {/* Role strip */}
              <div
                className="absolute bottom-0 left-0 right-0 py-3 px-6 text-center"
                style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
              >
                <p className="text-xs sm:text-sm tracking-widest uppercase" style={{ color: '#f2efe9' }}>
                  Lead Platform Engineer
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio & Contact */}
          <div className="flex flex-col justify-between space-y-6 sm:space-y-8 animate-fadeIn">
            {/* Bio */}
            <div>
              <h2 className="text-sm font-bold tracking-widest mb-4" style={{ color: '#222222' }}>
                ABOUT
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#444444' }}>
                8 years of experience in Platform Engineering, Cloud Infrastructure, and DevOps.
                Hands-on administrator of OpenShift, Azure Red Hat OpenShift (ARO), Kubernetes, and
                VMware Tanzu platforms. Specialized in automating deployments, enforcing RBAC and
                security governance, and maintaining highly reliable, compliant infrastructure in
                regulated financial environments.
              </p>
            </div>

            {/* Contact Info — improvement #5: real, working hyperlinks */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest mb-4" style={{ color: '#222222' }}>
                CONTACT
              </h3>
              <div className="space-y-3 text-sm" style={{ color: '#444444' }}>
                <a
                  href="mailto:msawant060@gmail.com"
                  className="flex items-center gap-3 hover:text-yellow-600 transition-colors w-fit"
                >
                  <Mail size={16} style={{ color: '#d4af37' }} />
                  <span className="break-all">msawant060@gmail.com</span>
                </a>
                <a
                  href="tel:+918928283513"
                  className="flex items-center gap-3 hover:text-yellow-600 transition-colors w-fit"
                >
                  <Phone size={16} style={{ color: '#d4af37' }} />
                  <span>+91 8928283513</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/mihir-sawant-b646b012b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-600 transition-colors w-fit"
                >
                  <Link size={16} style={{ color: '#d4af37' }} />
                  <span className="break-all">linkedin.com/in/mihir-sawant-b646b012b</span>
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-yellow-600 transition-colors w-fit"
                >
                  <Code2 size={16} style={{ color: '#d4af37' }} />
                  <span>MicroFoundry (GitHub)</span>
                </a>
                <div className="flex items-center gap-3">
                  <MapPin size={16} style={{ color: '#d4af37' }} />
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Body: 2-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column: Education, Work, Languages */}
          <div className="space-y-12 sm:space-y-16">
            {/* Work Experience */}
            <article className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Work Experience
              </h2>
              <div className="space-y-6 border-l-2 border-gray-300 pl-6">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Infrastructure Engineer II
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Kotak Mahindra Bank, Thane &middot; Oct 2024 - Jul 2026
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    SME for VMware Tanzu/Cloud Foundry. Enforced RBAC, embedded compliance controls,
                    and led automated operational strategies.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Platform Engineer
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Voya India (formerly VFI SLK), Pune &middot; Dec 2022 - Oct 2024
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    Administered OpenShift &amp; ARO clusters. Automated secure Azure cloud
                    infrastructure using Terraform and PowerShell.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Consultant
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Capgemini, Pune &middot; Oct 2018 - Dec 2022
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    Administered Pivotal Cloud Foundry on AWS. Executed platform upgrades, compliance
                    scaling, and Wavefront monitoring.
                  </p>
                </div>
              </div>
            </article>

            {/* Education */}
            <article className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Education &amp; Certifications
              </h2>
              <div className="space-y-6 border-l-2 border-gray-300 pl-6">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Bachelor of Engineering
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Pillai College of Engineering &middot; 2014 - 2018
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Certifications
                  </h3>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    &bull; Certified Kubernetes Administrator (CKA) - In Progress<br />
                    &bull; AWS Solutions Architect Associate (2019)<br />
                    &bull; ITIL 4 Foundation (2024)<br />
                    &bull; Redhat Container Administration
                  </p>
                </div>
              </div>
            </article>

            {/* Languages */}
            <article className="animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Languages
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>English</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Professional</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Hindi</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Fluent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Marathi</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Fluent</span>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Skills & Tools */}
          <div className="space-y-12 sm:space-y-16">
            {/* Core Skills */}
            <section className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-8 uppercase" style={{ color: '#222222' }}>
                Core Competencies
              </h2>
              <div className="space-y-6">
                {skills.map((skill, idx) => (
                  <div key={idx} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-medium" style={{ color: '#222222' }}>
                        {skill.name}
                      </label>
                      <span
                        className="text-xs font-bold transition-all duration-500 group-hover:text-yellow-600"
                        style={{ color: '#d4af37' }}
                      >
                        {skill.level}/10
                      </span>
                    </div>
                    <div className="relative h-2 bg-gray-300 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out"
                        style={{
                          width: `${skill.level * 10}%`,
                          backgroundColor: '#d4af37',
                          boxShadow: '0 0 10px rgba(212, 175, 55, 0.5)',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Tools Bento Grid */}
            <section className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-8 uppercase" style={{ color: '#222222' }}>
                Tools &amp; Platforms
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="group p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <div className="mb-3 flex items-center justify-center">
                      <tool.Icon size={26} style={{ color: '#d4af37' }} strokeWidth={1.75} />
                    </div>
                    <p className="text-xs font-bold mb-2" style={{ color: '#222222' }}>
                      {tool.name}
                    </p>
                    <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${tool.percentage}%`,
                          backgroundColor: '#d4af37',
                        }}
                      />
                    </div>
                    <p
                      className="text-xs mt-2 font-semibold transition-all duration-300 group-hover:text-yellow-600"
                      style={{ color: '#888888' }}
                    >
                      {tool.percentage}%
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-20 pt-8 border-t-2 border-gray-300 text-center" style={{ color: '#888888' }}>
          <p className="text-sm">
            &copy; 2026 Mihir Sawant. OpenShift &amp; Kubernetes Platform Administrator.
          </p>
        </footer>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out; }
        h1, h2, h3, .font-serif { font-family: Georgia, 'Times New Roman', serif; }
        @media (max-width: 640px) {
          body { -webkit-text-size-adjust: 100%; }
        }
      `}</style>
    </div>
  );
};

export default VintageResume;