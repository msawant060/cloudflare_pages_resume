import React, { useState, useRef } from 'react';

const VintageResume = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [qrScanning, setQrScanning] = useState(false);
  const headerRef = useRef(null);

  // Handle parallax effect on header
  const handleMouseMove = (e) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallaxOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  // Skills data
  const skills = [
    { name: 'UI Design', level: 9 },
    { name: 'Illustration', level: 8 },
    { name: 'Branding', level: 9 },
    { name: 'Art Direction', level: 8 },
    { name: 'Animation', level: 7 },
    { name: 'Web Design', level: 9 },
  ];

  // Tools data
  const tools = [
    { name: 'Figma', percentage: 95 },
    { name: 'Adobe XD', percentage: 90 },
    { name: 'Sketch', percentage: 85 },
    { name: 'After Effects', percentage: 88 },
    { name: 'Illustrator', percentage: 92 },
    { name: 'Photoshop', percentage: 93 },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ backgroundColor: '#f2efe9' }}>
      {/* Noise Texture Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-5 mix-blend-overlay z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header with Parallax */}
        <header
          ref={headerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mb-16 cursor-none relative"
        >
          <div
            className="transition-transform duration-300 ease-out"
            style={{
              transform: `translate(${parallaxOffset.x}px, ${parallaxOffset.y}px)`,
            }}
          >
            <h1
              className="text-8xl sm:text-9xl font-serif font-bold tracking-tight"
              style={{ color: '#222222', letterSpacing: '0.15em' }}
            >
              Mihir Sawant Resume
            </h1>
            <div className="h-1 w-32 mt-4" style={{ backgroundColor: '#d4af37' }} />
          </div>
        </header>

        {/* Hero Section */}
        <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Portrait */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              {/* Portrait Background */}
              <div
                className="aspect-square bg-gradient-to-b from-gray-300 to-gray-400 flex items-end justify-center relative"
                style={{
                  backgroundImage: `linear-gradient(135deg, rgba(100,100,100,0.1) 0%, rgba(50,50,50,0.2) 100%)`,
                }}
              >
                {/* Placeholder for grayscale portrait */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 font-serif text-2xl">
                  [Portrait]
                </div>

                {/* Faded Typography Background */}
                <div
                  className="absolute inset-0 opacity-10 text-gray-600 font-serif text-3xl overflow-hidden"
                  style={{
                    lineHeight: '1.8',
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  DESIGN • CREATIVE • VISUAL • ART • BRAND
                </div>
              </div>

              {/* Name Overlay with Cursive */}
              <div className="absolute bottom-8 left-8 right-8">
                <p
                  className="text-4xl sm:text-5xl font-bold text-center transform group-hover:scale-105 transition-transform duration-300"
                  style={{
                    color: '#f4c430',
                    fontFamily: "'Brush Script MT', cursive",
                    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  }}
                >
                  Alex Morgan
                </p>
              </div>
            </div>
          </div>

          {/* Right: Bio & Contact */}
          <div className="flex flex-col justify-between space-y-8 animate-fadeIn">
            {/* Bio */}
            <div>
              <h2 className="text-sm font-bold tracking-widest mb-4" style={{ color: '#222222' }}>
                ABOUT
              </h2>
              <p
                className="text-base leading-relaxed"
                style={{ color: '#444444' }}
              >
                Award-winning creative director and designer with 10+ years of experience
                crafting compelling visual narratives. Specializing in brand identity, UI/UX
                design, and motion graphics. Passionate about pushing creative boundaries and
                delivering exceptional user experiences.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-widest mb-4" style={{ color: '#222222' }}>
                CONTACT
              </h3>
              <div className="space-y-2 text-sm" style={{ color: '#444444' }}>
                <p>📧 alex.morgan@example.com</p>
                <p>📱 +1 (555) 123-4567</p>
                <p>🌐 www.alexmorgan.design</p>
                <p>📍 New York, NY</p>
              </div>
            </div>

            {/* Interactive QR Code */}
            <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg group cursor-pointer" style={{ borderColor: '#222222', backgroundColor: 'rgba(34, 34, 34, 0.02)' }}>
              <div
                className="relative w-32 h-32 mb-4 group-hover:scale-110 transition-transform duration-300"
                onClick={() => setQrScanning(!qrScanning)}
              >
                {/* QR Code Placeholder */}
                <div
                  className="w-full h-full flex items-center justify-center font-mono text-2xl font-bold rounded-lg"
                  style={{ backgroundColor: '#222222', color: '#f2efe9' }}
                >
                  QR
                </div>

                {/* Scan Animation */}
                {qrScanning && (
                  <div
                    className="absolute inset-0 animate-scan"
                    style={{
                      background: 'linear-gradient(to bottom, transparent, rgba(212, 175, 55, 0.4), transparent)',
                      animation: 'scan 2s infinite',
                    }}
                  />
                )}
              </div>
              <p className="text-xs font-bold tracking-widest" style={{ color: '#222222' }}>
                SCAN FOR DETAILS
              </p>
              <p className="text-xs mt-2" style={{ color: '#888888' }}>
                {qrScanning ? 'Scanning...' : 'Click to scan'}
              </p>
            </div>
          </div>
        </section>

        {/* Body: 2-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Education, Work, Languages */}
          <div className="space-y-16">
            {/* Education */}
            <article className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Education
              </h2>
              <div className="space-y-6 border-l-2 border-gray-300 pl-6">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Master of Fine Arts
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Rhode Island School of Design (RISD) • 2018
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    Focused on digital design and interactive media
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Bachelor of Arts in Graphic Design
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Massachusetts College of Art • 2016
                  </p>
                </div>
              </div>
            </article>

            {/* Work Experience */}
            <article className="animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Work Experience
              </h2>
              <div className="space-y-6 border-l-2 border-gray-300 pl-6">
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Senior Creative Director
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Innovative Design Studio • 2020 - Present
                  </p>
                  <p className="text-sm mt-2" style={{ color: '#444444' }}>
                    Led design strategy and creative direction for Fortune 500 clients
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Designer & Motion Graphics Specialist
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Creative Agency NYC • 2018 - 2020
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Junior Designer
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Design Studio Boston • 2016 - 2018
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
                  <span className="text-sm" style={{ color: '#888888' }}>Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Spanish</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Fluent</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>French</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Intermediate</span>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Skills & Tools */}
          <div className="space-y-16">
            {/* Creative Skills */}
            <section className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-8 uppercase" style={{ color: '#222222' }}>
                Creative At
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
                Tools Using
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {tools.map((tool, idx) => (
                  <div
                    key={idx}
                    className="group p-4 rounded-lg text-center transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                    style={{
                      backgroundColor: 'rgba(212, 175, 55, 0.08)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                    }}
                  >
                    <div className="mb-3 text-2xl">
                      {getToolIcon(tool.name)}
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
        <footer className="mt-20 pt-8 border-t-2 border-gray-300 text-center" style={{ color: '#888888' }}>
          <p className="text-sm">
            © 2024 Alex Morgan. Designed with precision and creativity.
          </p>
        </footer>
      </div>

      {/* Tailwind Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scan {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }

        .animate-scan {
          animation: scan 2s infinite;
        }

        /* Serif font fallback */
        h1, h2, h3, .font-serif {
          font-family: Georgia, 'Times New Roman', serif;
        }
      `}</style>
    </div>
  );
};

// Helper function to get tool icons
const getToolIcon = (toolName) => {
  const icons = {
    'Figma': '✏️',
    'Adobe XD': '🎨',
    'Sketch': '⚡',
    'After Effects': '🎬',
    'Illustrator': '🖌️',
    'Photoshop': '📷',
  };
  return icons[toolName] || '🔧';
};

export default VintageResume;
