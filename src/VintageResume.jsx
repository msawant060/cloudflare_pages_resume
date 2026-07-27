import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Box,
  Check,
  Cloud,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Ship,
  X,
} from 'lucide-react';

const experience = [
  {
    period: 'Sep 2024 - Present',
    role: 'Infrastructure Engineer II',
    company: 'Kotak Mahindra Bank, Thane',
    detail: 'SME for VMware Tanzu and Cloud Foundry, strengthening RBAC, operational automation, and compliance controls.',
  },
  {
    period: 'Nov 2022 - Sep 2024',
    role: 'Platform Engineer',
    company: 'Voya India (formerly VFI SLK), Pune',
    detail: 'Operated OpenShift and Azure Red Hat OpenShift (ARO), automated Azure infrastructure with Terraform, and supported a Chennai-to-Hyderabad DR migration.',
  },
  {
    period: 'Sep 2018 - Nov 2022',
    role: 'Consultant',
    company: 'Capgemini, Pune',
    detail: 'Administered Pivotal Cloud Foundry on AWS through upgrades, compliance scaling, and Wavefront observability.',
  },
];

const skills = [
  'OpenShift / ARO',
  'Kubernetes',
  'Azure & AWS',
  'Terraform IaC',
  'RBAC & Governance',
  'Disaster Recovery',
  'Cloud Foundry',
  'Observability',
];

const platforms = [
  { label: 'OpenShift & ARO', Icon: Ship, note: 'Production platform operations' },
  { label: 'Terraform IaC', Icon: Box, note: 'Azure and AWS automation' },
  { label: 'Multi-cloud', Icon: Cloud, note: 'Azure, AWS, and hybrid estates' },
];

const EMAIL = 'msawant060@gmail.com';

const VintageResume = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [jobDescription, setJobDescription] = useState('');
  const [matchMessage, setMatchMessage] = useState('');
  const [copyToast, setCopyToast] = useState(false);
  const toastTimer = useRef(null);

  useEffect(() => {
    let animationFrame = null;

    const updateScrollPosition = () => {
      animationFrame = null;
      setScrollY(window.scrollY);
    };

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScrollPosition);
      }
    };

    updateScrollPosition();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const parallaxStyle = (speed) => ({
    transform: `translate3d(0, ${Math.round(scrollY * speed)}px, 0)`,
    willChange: 'transform',
  });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = EMAIL;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }

    setCopyToast(true);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setCopyToast(false), 2600);
  };

  const reviewMatch = (event) => {
    event.preventDefault();
    setMatchMessage(
      jobDescription.trim()
        ? 'Strong platform fit: OpenShift/ARO operations, Terraform IaC, cloud governance, and DR migration experience align directly with this brief.'
        : 'Paste a job description to receive a focused platform-fit summary.',
    );
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#f2efe9] text-[#222222]">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      >
        <div
          className="absolute -left-[15%] top-16 whitespace-nowrap font-serif text-[19vw] font-bold leading-none tracking-tighter text-[#222222]/[0.045]"
          style={parallaxStyle(0.15)}
        >
          PLATFORM
        </div>
        <div
          className="absolute right-[-8%] top-[36rem] whitespace-nowrap font-serif text-[16vw] font-bold leading-none tracking-tighter text-[#d4af37]/15"
          style={parallaxStyle(0.2)}
        >
          INFRASTRUCTURE
        </div>
        <div className="absolute left-[8%] top-44 h-28 w-80 rounded-full bg-[#d4af37]/10 blur-3xl" />
        <div className="absolute right-[10%] top-[52rem] h-40 w-96 rounded-full bg-[#222222]/5 blur-3xl" />
      </div>

      <nav className="fixed inset-x-0 top-0 z-40 border-b border-[#222222]/10 bg-[#f2efe9]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <a href="#top" className="font-serif text-sm font-bold tracking-[0.2em]">
            MS / 2026
          </a>
          <div className="flex gap-4 text-[10px] font-bold tracking-[0.16em] sm:gap-6 sm:text-xs">
            <a href="#experience" className="transition-colors hover:text-[#9a7711]">EXPERIENCE</a>
            <a href="#skills" className="transition-colors hover:text-[#9a7711]">SKILLS</a>
            <button type="button" onClick={() => setIsMatchModalOpen(true)} className="transition-colors hover:text-[#9a7711]">
              MATCH MY JD
            </button>
          </div>
        </div>
      </nav>

      <section id="top" className="relative min-h-[760px] pt-20 sm:min-h-[820px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-32 z-0 overflow-hidden"
          style={parallaxStyle(0.15)}
        >
          <div className="mx-auto max-w-7xl border-y border-[#222222]/10 py-12 text-center font-serif text-5xl font-bold tracking-[0.3em] text-[#222222]/10 sm:text-8xl">
            OPENSHIFT / KUBERNETES / CLOUD
          </div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="sticky top-24 py-20 sm:top-[24px] sm:py-32">
            <div style={parallaxStyle(0.3)}>
              <p className="mb-5 text-xs font-bold tracking-[0.28em] text-[#9a7711]">
                PLATFORM ENGINEERING EDITION
              </p>
              <h1 className="max-w-5xl font-serif text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
                Mihir Sawant <span className="text-[#d4af37]">—</span>
                <br />
                OpenShift &amp; Kubernetes Administrator
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#444444] sm:text-lg">
                Building resilient, governed cloud platforms across OpenShift, ARO, Azure, AWS, and Terraform-driven infrastructure.
              </p>
            </div>

            <div className="relative z-20 mt-8 flex flex-wrap items-center gap-3" style={parallaxStyle(0.5)}>
              <span className="rounded-full border border-[#d4af37]/70 bg-[#f2efe9]/90 px-4 py-2 text-xs font-bold tracking-[0.12em] shadow-sm">
                🟢 CKA IN PROGRESS
              </span>
              <span className="rounded-full border border-[#222222]/20 bg-[#f2efe9]/90 px-4 py-2 text-xs font-bold tracking-[0.12em] shadow-sm">
                8+ YEARS EXPERIENCE
              </span>
              <button
                type="button"
                onClick={() => setIsMatchModalOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-[#222222] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#f2efe9] transition-transform hover:-translate-y-0.5"
              >
                MATCH MY JD <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-30 bg-[#f2efe9] pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid border-y-2 border-[#222222] py-5 text-center sm:grid-cols-3">
            {[
              ['8+', 'YEARS IN PLATFORM ENGINEERING'],
              ['3', 'CLOUD PLATFORM ENVIRONMENTS'],
              ['1', 'CHENNAI → HYDERABAD DR MIGRATION'],
            ].map(([value, label]) => (
              <div key={label} className="border-[#222222]/15 px-5 py-4 sm:border-r last:sm:border-r-0">
                <p className="font-serif text-4xl font-bold text-[#d4af37]">{value}</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.14em] text-[#444444]">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            <article id="experience" className="scroll-mt-24">
              <p className="text-xs font-bold tracking-[0.22em] text-[#9a7711]">THE RECORD</p>
              <h2 className="mt-3 font-serif text-4xl font-bold">Work Experience</h2>
              <div className="mt-9 border-l-2 border-[#d4af37] pl-6">
                {experience.map((role) => (
                  <div key={`${role.company}-${role.role}`} className="relative pb-9 last:pb-0">
                    <span className="absolute -left-[33px] top-1 h-3 w-3 rounded-full bg-[#d4af37] ring-4 ring-[#f2efe9]" />
                    <p className="text-xs font-bold tracking-wider text-[#9a7711]">{role.period}</p>
                    <h3 className="mt-2 font-serif text-xl font-bold">{role.role}</h3>
                    <p className="mt-1 font-medium text-[#444444]">{role.company}</p>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#444444]">{role.detail}</p>
                  </div>
                ))}
              </div>
            </article>

            <aside id="skills" className="scroll-mt-24">
              <p className="text-xs font-bold tracking-[0.22em] text-[#9a7711]">THE TOOLSHED</p>
              <h2 className="mt-3 font-serif text-4xl font-bold">Skills Matrix</h2>
              <div className="mt-9 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-[#d4af37]/60 bg-white/30 px-4 py-2 text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {platforms.map(({ label, Icon, note }) => (
                  <article key={label} className="border border-[#222222]/15 bg-white/35 p-4">
                    <Icon size={24} className="text-[#d4af37]" />
                    <h3 className="mt-5 text-sm font-bold">{label}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#444444]">{note}</p>
                  </article>
                ))}
              </div>
            </aside>
          </div>

          <section className="grid gap-6 border-t border-[#222222]/20 py-12 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] text-[#9a7711]">CONTACT DESK</p>
              <h2 className="mt-2 font-serif text-3xl font-bold">Let&apos;s build a reliable platform.</h2>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#444444]">
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-[#9a7711]"><Mail size={15} />{EMAIL}</a>
                <a href="tel:+918928283513" className="inline-flex items-center gap-2 hover:text-[#9a7711]"><Phone size={15} />+91 8928283513</a>
                <span className="inline-flex items-center gap-2"><MapPin size={15} />Pune, India</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={copyEmail} className="inline-flex items-center gap-2 border border-[#222222] px-4 py-3 text-xs font-bold tracking-wider transition-colors hover:bg-[#222222] hover:text-[#f2efe9]">
                <Copy size={14} /> COPY EMAIL
              </button>
              <a href="https://wa.me/918928283513" target="_blank" rel="noopener noreferrer" aria-label="Send Mihir Sawant a WhatsApp message" className="inline-flex items-center justify-center bg-[#222222] px-4 text-[#d4af37] transition-transform hover:-translate-y-0.5">
                <MessageCircle size={19} />
              </a>
            </div>
          </section>
        </div>
      </section>

      {isMatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222]/55 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="match-jd-title">
          <form onSubmit={reviewMatch} className="w-full max-w-xl border-2 border-[#222222] bg-[#f2efe9] p-6 shadow-2xl sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] text-[#9a7711]">RECRUITER DESK</p>
                <h2 id="match-jd-title" className="mt-2 font-serif text-3xl font-bold">Match My JD</h2>
              </div>
              <button type="button" onClick={() => setIsMatchModalOpen(false)} className="p-1 text-[#444444] hover:text-[#222222]" aria-label="Close Match My JD dialog">
                <X size={22} />
              </button>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#444444]">
              Share the job description for a concise fit summary focused on OpenShift, Kubernetes, cloud infrastructure, and Terraform.
            </p>
            <label htmlFor="job-description" className="mt-6 block text-xs font-bold tracking-[0.14em]">JOB DESCRIPTION</label>
            <textarea id="job-description" value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} rows={7} className="mt-2 w-full resize-y border border-[#222222]/30 bg-white/50 p-3 text-sm outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]" placeholder="Paste the role requirements here..." />
            {matchMessage && <p className="mt-4 border-l-2 border-[#d4af37] bg-white/35 p-3 text-sm leading-relaxed text-[#444444]">{matchMessage}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="bg-[#222222] px-5 py-3 text-xs font-bold tracking-[0.14em] text-[#f2efe9] transition-colors hover:bg-[#444444]">REVIEW FIT</button>
              <button type="button" onClick={copyEmail} className="border border-[#222222] px-5 py-3 text-xs font-bold tracking-[0.14em] hover:bg-[#d4af37]/20">COPY CONTACT EMAIL</button>
            </div>
          </form>
        </div>
      )}

      {copyToast && (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-2 border border-[#d4af37] bg-[#222222] px-4 py-3 text-sm font-medium text-[#f2efe9] shadow-xl" role="status">
          <Check size={16} className="text-[#d4af37]" /> Email copied to clipboard
        </div>
      )}
    </main>
  );
};

export default VintageResume;
