import React, { useEffect, useRef, useState } from 'react';
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

const experience = [
  {
    title: 'Infrastructure Engineer II',
    organization: 'Kotak Mahindra Bank, Thane',
    start: { year: 2024, month: 9 },
    summary: 'SME for VMware Tanzu/Cloud Foundry. Enforced RBAC, embedded compliance controls, and led automated operational strategies.',
  },
  {
    title: 'Platform Engineer',
    organization: 'Voya India (formerly VFI SLK), Pune',
    start: { year: 2022, month: 11 },
    end: { year: 2024, month: 9 },
    summary: 'Supported OpenShift & ARO cluster operations at Voya India for approximately one year before transitioning focus to Kubernetes. Automated Azure cloud infrastructure using Terraform and PowerShell.',
  },
  {
    title: 'Consultant',
    organization: 'Capgemini, Pune',
    start: { year: 2018, month: 9 },
    end: { year: 2022, month: 11 },
    summary: 'Administered Pivotal Cloud Foundry on AWS. Executed platform upgrades, compliance scaling, and Wavefront monitoring.',
  },
];

const formatMonthYear = ({ year, month }) =>
  new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(year, month));

const getMonthDifference = (start, end = new Date()) =>
  Math.max(0, (end.getFullYear() - start.year) * 12 + (end.getMonth() - start.month));

const formatDuration = (months) => {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;
  const parts = [];

  if (years) parts.push(`${years} yr${years === 1 ? '' : 's'}`);
  if (remainingMonths) parts.push(`${remainingMonths} mo${remainingMonths === 1 ? '' : 's'}`);

  return parts.join(' ') || 'Less than a month';
};

const MAX_MOTION_OFFSET = 20;

const clampOffset = (value) =>
  Math.max(-MAX_MOTION_OFFSET, Math.min(MAX_MOTION_OFFSET, value));

const VintageResume = () => {
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [motionPermissionRequired, setMotionPermissionRequired] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(false);
  const [motionError, setMotionError] = useState('');
  const headerRef = useRef(null);
  const totalExperience = formatDuration(
    experience.reduce(
      (totalMonths, role) => totalMonths + getMonthDifference(role.start, role.end && new Date(role.end.year, role.end.month)),
      0,
    ),
  );

  const getLayerTransform = (depth) =>
    `translate3d(${parallaxOffset.x * depth}px, ${parallaxOffset.y * depth}px, 0)`;

  const updateParallaxOffset = (clientX, clientY) => {
    if (!headerRef.current) return;
    const rect = headerRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width - 0.5) * MAX_MOTION_OFFSET;
    const y = ((clientY - rect.top) / rect.height - 0.5) * MAX_MOTION_OFFSET;
    setParallaxOffset({ x: clampOffset(x), y: clampOffset(y) });
  };

  const handleMouseMove = (e) => {
    updateParallaxOffset(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return undefined;

    const requiresPermission = typeof window.DeviceOrientationEvent.requestPermission === 'function';
    setMotionPermissionRequired(requiresPermission);

    if (requiresPermission && !motionEnabled) return undefined;

    const handleOrientation = (event) => {
      if (typeof event.beta !== 'number' || typeof event.gamma !== 'number') return;

      setParallaxOffset({
        x: clampOffset((event.gamma / 90) * MAX_MOTION_OFFSET),
        y: clampOffset((event.beta / 180) * MAX_MOTION_OFFSET),
      });
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [motionEnabled]);

  const enableMotionEffects = async () => {
    if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

    try {
      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await window.DeviceOrientationEvent.requestPermission();
        if (permission !== 'granted') {
          setMotionError('Motion permission was not granted.');
          return;
        }
      }

      setMotionError('');
      setMotionEnabled(true);
    } catch {
      setMotionError('Motion effects could not be enabled.');
    }
  };

  // Core competencies are presented as areas of practice, not subjective scores.
  const skills = [
    'Platform Engineering',
    'Kubernetes Transition & OpenShift',
    'Cloud Infrastructure',
    'Infrastructure as Code',
    'Observability',
    'Platform Security',
  ];

  // Source-backed operational metrics replace subjective proficiency scores.
  const tools = [
    {
      name: 'OpenShift & ARO',
      metricValue: '~1 Yr',
      source: 'Production operations at Voya India during platform transition',
      Icon: Container,
    },
    {
      name: 'Kubernetes',
      metricValue: 'Transitioning',
      source: 'Certified Kubernetes Administrator track - In Progress',
      Icon: Ship,
    },
    {
      name: 'AWS Cloud Infrastructure',
      metricValue: 'Certified',
      source: 'AWS Solutions Architect Associate (2019)',
      Icon: Cloud,
    },
    {
      name: 'Terraform & IaC',
      metricValue: '4+ Yrs',
      source: 'Enterprise Azure & AWS automation pipelines',
      Icon: Box,
    },
    {
      name: 'VMware Tanzu / Cloud Foundry',
      metricValue: '8 Yrs SME',
      source: 'Capgemini STAR Award (Dec 2021)',
      Icon: LineChart,
    },
    {
      name: 'IT Service Governance',
      metricValue: 'Certified',
      source: 'ITIL 4 Foundation (2024)',
      Icon: Terminal,
    },
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
          transform: getLayerTransform(0.5),
          transition: 'transform 0.15s ease-out',
          willChange: 'transform',
        }}
      />

      <nav
        aria-label="Resume sections"
        className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-[#f2efe9]/95 backdrop-blur"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <a href="#about" className="text-xs font-bold tracking-widest hover:text-yellow-600 transition-colors" style={{ color: '#222222' }}>
            ABOUT
          </a>
          <a href="#experience" className="text-xs font-bold tracking-widest hover:text-yellow-600 transition-colors" style={{ color: '#222222' }}>
            EXPERIENCE
          </a>
          <a href="#skills" className="text-xs font-bold tracking-widest hover:text-yellow-600 transition-colors" style={{ color: '#222222' }}>
            SKILLS
          </a>
          <a href="#architecture" className="text-xs font-bold tracking-widest hover:text-yellow-600 transition-colors" style={{ color: '#222222' }}>
            ARCHITECTURE
          </a>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-24 pb-6 sm:px-6 sm:pt-28 sm:pb-12 lg:px-8">
        {/* Layered parallax header */}
        <header
          ref={headerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="mb-10 sm:mb-16 relative"
        >
          <h1
            className="text-4xl sm:text-7xl lg:text-9xl break-words font-serif font-bold tracking-tight leading-none"
            style={{
              color: '#222222',
              letterSpacing: '0.05em',
              transform: getLayerTransform(1),
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          >
            Mihir Sawant
          </h1>
          <p
            className="mt-3 text-sm sm:text-lg tracking-widest uppercase"
            style={{ color: '#888888' }}
          >
            Platform Engineering &middot; Cloud Infrastructure &amp; Kubernetes Transition
          </p>
          <div className="h-1 w-24 sm:w-32 mt-4" style={{ backgroundColor: '#d4af37' }} />
          <div
            className="mt-5 inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-bold tracking-widest"
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              borderColor: 'rgba(212, 175, 55, 0.65)',
              color: '#222222',
              transform: getLayerTransform(1.5),
              transition: 'transform 0.15s ease-out',
              willChange: 'transform',
            }}
          >
            CKA IN PROGRESS
          </div>
          {motionPermissionRequired && !motionEnabled && (
            <div className="mt-4">
              <button
                type="button"
                onClick={enableMotionEffects}
                className="rounded border px-3 py-1.5 text-xs font-bold tracking-wide transition-colors hover:bg-[#d4af37]/15"
                style={{ borderColor: 'rgba(34, 34, 34, 0.25)', color: '#444444' }}
              >
                Enable Motion Effects
              </button>
              {motionError && (
                <p className="mt-2 text-xs" style={{ color: '#888888' }}>
                  {motionError}
                </p>
              )}
            </div>
          )}
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
                  style={{
                    lineHeight: '1.8',
                    transform: getLayerTransform(0.5),
                    transition: 'transform 0.15s ease-out',
                    willChange: 'transform',
                  }}
                >
                  PLATFORM &bull; CLOUD &bull; DEVOPS &bull; INFRASTRUCTURE
                </div>
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
            <div id="about" className="scroll-mt-24">
              <h2 className="text-sm font-bold tracking-widest mb-4" style={{ color: '#222222' }}>
                ABOUT
              </h2>
              <p className="text-base leading-relaxed" style={{ color: '#444444' }}>
                8 years of experience in Platform Engineering, Cloud Infrastructure, and DevOps.
                Production OpenShift and Azure Red Hat OpenShift (ARO) experience at Voya India,
                with an active transition into Kubernetes through the CKA track. Specialized in
                automating deployments, enforcing RBAC and security governance, and maintaining
                highly reliable, compliant infrastructure in regulated financial environments.
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

        <section
          aria-label="Operational highlights"
          className="mb-12 grid grid-cols-1 gap-4 sm:mb-16 sm:grid-cols-3"
        >
          <article
            className="rounded-lg border p-5 shadow-sm backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.38)',
              borderColor: 'rgba(212, 175, 55, 0.45)',
            }}
          >
            <p className="text-3xl font-bold font-serif" style={{ color: '#d4af37' }}>{totalExperience}</p>
            <h2 className="mt-2 text-sm font-bold tracking-widest uppercase" style={{ color: '#222222' }}>
              Total Experience
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#444444' }}>
              Platform Engineering &amp; Cloud Infrastructure
            </p>
          </article>
          <article
            className="rounded-lg border p-5 shadow-sm backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.38)',
              borderColor: 'rgba(212, 175, 55, 0.45)',
            }}
          >
            <p className="text-3xl font-bold font-serif" style={{ color: '#d4af37' }}>3</p>
            <h2 className="mt-2 text-sm font-bold tracking-widest uppercase" style={{ color: '#222222' }}>
              Major Platforms
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#444444' }}>
              OpenShift, ARO, Tanzu &amp; Cloud Foundry
            </p>
          </article>
          <article
            className="rounded-lg border p-5 shadow-sm backdrop-blur-sm"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.38)',
              borderColor: 'rgba(212, 175, 55, 0.45)',
            }}
          >
            <p className="text-3xl font-bold font-serif" style={{ color: '#d4af37' }}>Multi-Cloud</p>
            <h2 className="mt-2 text-sm font-bold tracking-widest uppercase" style={{ color: '#222222' }}>
              Infrastructure Scope
            </h2>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: '#444444' }}>
              Azure &amp; AWS Infrastructure Provisioning
            </p>
          </article>
        </section>

        {/* Body: 2-Column Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16">
          {/* Left Column: Education, Work, Languages */}
          <div className="space-y-12 sm:space-y-16">
            {/* Work Experience */}
            <article id="experience" className="animate-fadeInUp scroll-mt-24" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-6 uppercase" style={{ color: '#222222' }}>
                Work Experience
              </h2>
              <div className="space-y-6 border-l-2 border-gray-300 pl-6">
                {experience.map((role) => {
                  const endDate = role.end && new Date(role.end.year, role.end.month);
                  const tenure = formatDuration(getMonthDifference(role.start, endDate));

                  return (
                    <div key={`${role.organization}-${role.title}`}>
                      <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                        {role.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm" style={{ color: '#888888' }}>
                        <span>
                          {role.organization} &middot; {formatMonthYear(role.start)} - {role.end ? formatMonthYear(role.end) : 'Present'}
                        </span>
                        <span
                          className="rounded-full border px-2 py-0.5 text-xs font-bold"
                          style={{ borderColor: 'rgba(212, 175, 55, 0.6)', color: '#9a7711' }}
                        >
                          {tenure}
                        </span>
                      </div>
                      <p className="text-sm mt-2" style={{ color: '#444444' }}>
                        {role.summary}
                      </p>
                    </div>
                  );
                })}
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
                    Higher Secondary Certificate
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Sanjeevan, Panhala, Maharashtra &middot; 2013 - 2014
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Secondary School Certificate
                  </h3>
                  <p className="text-sm" style={{ color: '#888888' }}>
                    Don Bosco, Sindhudurg, Maharashtra &middot; 2011 - 2012
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: '#222222' }}>
                    Certifications
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <article
                      className="rounded-lg border p-4"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.32)', borderColor: 'rgba(34, 34, 34, 0.15)' }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#9a7711' }}>
                        In Progress
                      </p>
                      <h4 className="mt-2 font-bold" style={{ color: '#222222' }}>
                        Certified Kubernetes Administrator
                      </h4>
                      <p className="mt-1 text-xs" style={{ color: '#888888' }}>CKA</p>
                    </article>
                    <article
                      className="rounded-lg border p-4"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)', borderColor: 'rgba(212, 175, 55, 0.5)' }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#9a7711' }}>
                        Completed &middot; 2019
                      </p>
                      <h4 className="mt-2 font-bold" style={{ color: '#222222' }}>
                        AWS Solutions Architect Associate
                      </h4>
                      <a
                        href="https://cp.certmetrics.com/amazon/en/public/verify/credential"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs font-bold underline underline-offset-4 hover:text-yellow-600"
                        style={{ color: '#444444' }}
                      >
                        Validate with AWS
                      </a>
                    </article>
                    <article
                      className="rounded-lg border p-4"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.45)', borderColor: 'rgba(212, 175, 55, 0.5)' }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#9a7711' }}>
                        Completed &middot; 2024
                      </p>
                      <h4 className="mt-2 font-bold" style={{ color: '#222222' }}>
                        ITIL 4 Foundation
                      </h4>
                      <a
                        href="https://www.credly.com/org/peoplecert/badge/itil-4-foundation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-block text-xs font-bold underline underline-offset-4 hover:text-yellow-600"
                        style={{ color: '#444444' }}
                      >
                        View on Credly
                      </a>
                    </article>
                    <article
                      className="rounded-lg border p-4"
                      style={{ backgroundColor: 'rgba(255, 255, 255, 0.32)', borderColor: 'rgba(34, 34, 34, 0.15)' }}
                    >
                      <p className="text-xs font-bold tracking-widest uppercase" style={{ color: '#888888' }}>
                        Professional Training
                      </p>
                      <h4 className="mt-2 font-bold" style={{ color: '#222222' }}>
                        Red Hat Container Administration
                      </h4>
                    </article>
                  </div>
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
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Gujarati</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Learning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Kannada</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Learning</span>
                </div>
                <div className="flex justify-between items-center">
                  <span style={{ color: '#222222' }}>Telugu</span>
                  <span className="text-sm" style={{ color: '#888888' }}>Learning</span>
                </div>
              </div>
            </article>
          </div>

          {/* Right Column: Skills & Tools */}
          <div className="space-y-12 sm:space-y-16">
            {/* Core Skills */}
            <section id="skills" className="animate-fadeInUp scroll-mt-24" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-8 uppercase" style={{ color: '#222222' }}>
                Core Competencies
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-3 py-2 text-sm font-medium"
                    style={{ borderColor: 'rgba(212, 175, 55, 0.5)', backgroundColor: 'rgba(212, 175, 55, 0.08)', color: '#222222' }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            {/* Tools Bento Grid */}
            <section id="architecture" className="animate-fadeInUp scroll-mt-24" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-sm font-bold tracking-widest mb-8 uppercase" style={{ color: '#222222' }}>
                Tools &amp; Platforms
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {tools.map((tool) => (
                  <article
                    key={tool.name}
                    className="group flex flex-col rounded-lg p-4 text-center transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
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
                    <span className="mx-auto w-fit rounded-full border border-amber-300 bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-900">
                      {tool.metricValue}
                    </span>
                    <p className="mt-3 text-[11px] leading-relaxed font-mono" style={{ color: '#6b6258' }}>
                      {tool.source}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 sm:mt-20 pt-8 border-t-2 border-gray-300 text-center" style={{ color: '#888888' }}>
          <p className="text-sm">
            &copy; 2026 Mihir Sawant. Cloud Infrastructure &amp; Platform Engineering.
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