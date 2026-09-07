import { useState, useEffect, useCallback } from 'react';
import {
  Github,
  Mail,
  MapPin,
  Phone,
  Tag,
  ExternalLink,
  Code2,
  Zap,
  Layers,
  ArrowRight,
  Download,
  X,
} from 'lucide-react';

type Lang = 'de' | 'en' | 'ru';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const translations = {
  de: {
    nav: { about: 'Über', stack: 'Stack', cases: 'Projekte', skills: 'Kompetenzen', contact: 'Kontakt' },
    hero: {
      name: 'Ihor Kriazhev',
      role: 'Full-Stack Web Developer',
      focus: 'SaaS · CRM · Automatisierung',
      location: 'München, Deutschland',
      rate: 'ab €1.000 / Tag',
      cta: 'Anfrage stellen',
      available: 'Verfügbar für neue Projekte',
    },
    stackTitle: 'Tech-Stack',
    stackSub: 'Werkzeuge, mit denen ich täglich arbeite',
    casesTitle: 'Projekte',
    casesSub: 'Ausgewählte Arbeiten und Produkte',
    cases: [
      {
        title: 'webstudio-muenchen.com',
        desc: 'SaaS-Plattform zur Generierung von Business-Websites mit CRM & Booking. €199/Monat. 22 Nischen.',
        tag: 'SaaS Plattform',
      },
      {
        title: 'webstudio-sdk-muenchen.com',
        desc: 'White-Label Web Engine. Marketplace-Automatisierung. Etsy + Payhip + Vercel Delivery Pipeline.',
        tag: 'White-Label',
      },
      {
        title: 'Freelance Projekte',
        desc: 'MVP, CRM, Dashboard, Automatisierung für Unternehmen. Schlüsselfertig. Dauer: 1–2 Wochen.',
        tag: 'Turnkey',
      },
    ],
    skillsTitle: 'Kompetenzen',
    skillsSub: 'Was ich mache',
    skills: [
      'Full-Stack Web-Apps (React + Node.js + Firebase)',
      'CRM-, Booking- & Dashboard-Lösungen für Business',
      'SaaS MVP schlüsselfertig',
      'Webhook-Integrationen (Stripe, Etsy, Payhip, Telegram, WhatsApp)',
      'Deployment-Automatisierung (Vercel, Render, Cloudflare)',
      'White-Label / Kundenprodukte',
    ],
    contactTitle: 'Kontakt',
    contactSub: 'Lassen Sie uns über Ihr Projekt sprechen',
    footer: '© 2026 Ihor Kriazhev',
    install: 'App installieren',
  },
  en: {
    nav: { about: 'About', stack: 'Stack', cases: 'Projects', skills: 'Skills', contact: 'Contact' },
    hero: {
      name: 'Ihor Kriazhev',
      role: 'Full-Stack Web Developer',
      focus: 'SaaS · CRM · Automation',
      location: 'München, Germany',
      rate: 'from €1,000 / day',
      cta: 'Contact',
      available: 'Available for new projects',
    },
    stackTitle: 'Tech Stack',
    stackSub: 'Tools I work with every day',
    casesTitle: 'Projects',
    casesSub: 'Selected work and products',
    cases: [
      {
        title: 'webstudio-muenchen.com',
        desc: 'SaaS platform for generating business websites with CRM & booking. €199/mo. 22 niches.',
        tag: 'SaaS Platform',
      },
      {
        title: 'webstudio-sdk-muenchen.com',
        desc: 'White-label web engine. Marketplace automation. Etsy + Payhip + Vercel delivery pipeline.',
        tag: 'White-Label',
      },
      {
        title: 'Freelance Projects',
        desc: 'MVP, CRM, Dashboard, Automation for business. Turnkey. Timeline: 1–2 weeks.',
        tag: 'Turnkey',
      },
    ],
    skillsTitle: 'Skills',
    skillsSub: 'What I do',
    skills: [
      'Full-Stack web apps (React + Node.js + Firebase)',
      'CRM, Booking & Dashboards for business',
      'SaaS MVP turnkey delivery',
      'Webhook integrations (Stripe, Etsy, Payhip, Telegram, WhatsApp)',
      'Deployment automation (Vercel, Render, Cloudflare)',
      'White-label / client products',
    ],
    contactTitle: 'Contact',
    contactSub: "Let's talk about your project",
    footer: '© 2026 Ihor Kriazhev',
    install: 'Install App',
  },
  ru: {
    nav: { about: 'О себе', stack: 'Стек', cases: 'Кейсы', skills: 'Услуги', contact: 'Контакт' },
    hero: {
      name: 'Ihor Kriazhev',
      role: 'Full-Stack Web Developer',
      focus: 'SaaS · CRM · Автоматизация',
      location: 'Мюнхен, Германия',
      rate: 'от €1.000 / день',
      cta: 'Написать',
      available: 'Доступен для новых проектов',
    },
    stackTitle: 'Технологии',
    stackSub: 'Инструменты, с которыми я работаю каждый день',
    casesTitle: 'Кейсы',
    casesSub: 'Избранные работы и продукты',
    cases: [
      {
        title: 'webstudio-muenchen.com',
        desc: 'SaaS-платформа генерации бизнес-сайтов с CRM и booking. €199/мес. 22 ниши.',
        tag: 'SaaS Платформа',
      },
      {
        title: 'webstudio-sdk-muenchen.com',
        desc: 'White-label web engine. Автоматизация маркетплейса. Etsy + Payhip + Vercel доставка.',
        tag: 'White-Label',
      },
      {
        title: 'Фриланс проекты',
        desc: 'MVP, CRM, Dashboard, автоматизация для бизнеса. Под ключ. Срок: 1–2 недели.',
        tag: 'Под ключ',
      },
    ],
    skillsTitle: 'Что умею',
    skillsSub: 'Мои услуги',
    skills: [
      'Full-Stack веб-приложения (React + Node.js + Firebase)',
      'CRM, Booking, Dashboard под бизнес',
      'SaaS MVP под ключ',
      'Webhook интеграции (Stripe, Etsy, Payhip, Telegram, WhatsApp)',
      'Deployment автоматизация (Vercel, Render, Cloudflare)',
      'Белый лейбл / клиентские продукты',
    ],
    contactTitle: 'Контакт',
    contactSub: 'Давайте обсудим ваш проект',
    footer: '© 2026 Ihor Kriazhev',
    install: 'Установить приложение',
  },
};

const stack = [
  'React', 'TypeScript', 'Node.js', 'Firebase', 'Tailwind CSS',
  'Vite', 'Vercel', 'Render', 'Cloudflare', 'Railway',
  'Webhook Automation', 'CRM Systems', 'Booking Systems', 'White-Label SaaS',
];

const caseLinks = [
  'https://webstudio-muenchen.com',
  'https://webstudio-sdk-muenchen.com',
  null,
];

const EMAIL = 'ihor@webstudio-muenchen.com';
const WHATSAPP = '+4915258400610';
const GITHUB_URL = 'https://github.com/IgorUspehov';

function App() {
  const [lang, setLang] = useState<Lang>('de');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const t = translations[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      setShowInstallBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
    setShowInstallBanner(false);
  }, [installPrompt]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: t.nav.about },
    { id: 'stack', label: t.nav.stack },
    { id: 'cases', label: t.nav.cases },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  const langLabels: Record<Lang, string> = { de: 'DE', en: 'EN', ru: 'RU' };

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-700 antialiased">
      {/* Ambient glow background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-indigo-300/30 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-blue-300/25 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-200/20 blur-[100px]" />
      </div>

      {/* Nav */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#f5f6fa]/80 backdrop-blur-xl border-b border-slate-200/60' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-xs font-extrabold text-white">IK</span>
            <span className="hidden sm:inline">Kriazhev</span>
          </button>

          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white rounded-full p-0.5 border border-slate-200 shadow-sm">
              {(Object.keys(langLabels) as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all ${lang === l ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {langLabels[l]}
                </button>
              ))}
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200 shadow-sm">
              <span className="block w-4 h-0.5 bg-slate-700 relative before:content-[''] before:absolute before:w-4 before:h-0.5 before:bg-slate-700 before:-top-1.5 after:content-[''] after:absolute after:w-4 after:h-0.5 after:bg-slate-700 after:top-1.5" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-5 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-left text-slate-500 hover:text-slate-900 transition-colors py-1">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-sm mb-8 animate-[fadeIn_0.6s_ease]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {t.hero.available}
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-4 animate-[fadeIn_0.7s_ease]">
            {t.hero.name}
          </h1>
          <p className="text-xl sm:text-2xl text-indigo-600 font-semibold mb-3">
            {t.hero.role}
          </p>
          <p className="text-base sm:text-lg text-slate-500 mb-6">{t.hero.focus}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 text-sm">
            <span className="flex items-center gap-1.5 text-slate-600">
              <MapPin className="w-4 h-4 text-indigo-500" />
              {t.hero.location}
            </span>
            <span className="flex items-center gap-1.5 text-slate-600">
              <Tag className="w-4 h-4 text-indigo-500" />
              {t.hero.rate}
            </span>
          </div>

          <a
            href={`mailto:${EMAIL}`}
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition-all"
          >
            <Mail className="w-5 h-5" />
            {t.hero.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Stack */}
      <section id="stack" className="relative px-5 sm:px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 text-center">{t.stackTitle}</h2>
          <p className="text-slate-500 text-center mb-12">{t.stackSub}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {stack.map((tech, i) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-sm text-slate-600 shadow-sm hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all animate-[fadeIn_0.5s_ease_both]"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="relative px-5 sm:px-8 py-24 border-t border-slate-200/60">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 text-center">{t.casesTitle}</h2>
          <p className="text-slate-500 text-center mb-12">{t.casesSub}</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.cases.map((c, i) => {
              const link = caseLinks[i];
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl bg-white border border-slate-200 p-6 shadow-sm hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100 transition-all"
                >
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-semibold mb-4">
                    {c.tag}
                  </span>
                  <h3 className="text-slate-900 font-semibold mb-3 break-words">{c.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{c.desc}</p>
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
                    >
                      {t.nav.about === 'Über' ? 'Besuchen' : t.nav.about === 'О себе' ? 'Открыть' : 'Visit'}
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <a
                      href={`mailto:${EMAIL}`}
                      className="inline-flex items-center gap-1.5 text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
                    >
                      {t.hero.cta}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="relative px-5 sm:px-8 py-24 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 text-center">{t.skillsTitle}</h2>
          <p className="text-slate-500 text-center mb-12">{t.skillsSub}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.skills.map((skill, i) => {
              const icons = [Code2, Layers, Zap, Zap, Layers, Code2];
              const Icon = icons[i] || Code2;
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-indigo-600" />
                  </span>
                  <p className="text-slate-600 text-sm leading-relaxed pt-1.5">{skill}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative px-5 sm:px-8 py-24 border-t border-slate-200/60">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">{t.contactTitle}</h2>
          <p className="text-slate-500 mb-10">{t.contactSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg shadow-indigo-500/25 hover:scale-[1.02] transition-all"
            >
              <Mail className="w-5 h-5" />
              {EMAIL}
            </a>
            <a
              href={`https://wa.me/${WHATSAPP.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Phone className="w-5 h-5 text-emerald-500" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-200/60 px-5 sm:px-8 py-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">{t.footer}</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${EMAIL}`} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* PWA Install Banner */}
      {showInstallBanner && (
        <div className="fixed bottom-5 left-5 right-5 sm:left-auto sm:right-5 sm:w-auto z-50 animate-[slideUp_0.3s_ease]">
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-4 shadow-2xl shadow-slate-300/50">
            <Download className="w-5 h-5 text-indigo-600 shrink-0" />
            <span className="text-sm text-slate-600 whitespace-nowrap">{t.install}</span>
            <button onClick={handleInstall} className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-500 transition-colors">
              OK
            </button>
            <button onClick={() => setShowInstallBanner(false)} className="text-slate-400 hover:text-slate-700">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

export default App;
