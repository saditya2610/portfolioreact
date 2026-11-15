import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import ParticleCanvas from '../component/ParticleCanvas';
import ChatbotWidget from '../component/ChatbotWidget';
import ScrollReveal from '../component/ScrollReveal';
import { getExperienceData, getEducationData, getProjectsData, getServicesData, getPublicationsData } from '../utils/data';

// Static data moved to utils/data.js


// Optimized components with React.memo
const StatCard = React.memo(({ icon, number, description, delay }) => (
    <div className="reveal" style={{ transitionDelay: `${delay}ms` }}>
        <i className={`${icon} stat-icon text-3xl text-gold mb-4`} aria-hidden="true"></i>
        <h3 className="text-3xl text-white mb-2">{number}</h3>
        <div className="w-8 h-1 bg-gold mx-auto mb-4"></div>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
));

const ServiceCard = React.memo(({ icon, title, description, delay }) => (
    <div className="text-center reveal" style={{ transitionDelay: `${delay}ms` }}>
        <div className="love-details p-6 border border-gold/30 hover:border-gold transition-all duration-300">
            <i className={`${icon} love-icon text-3xl text-gold mb-4`} aria-hidden="true"></i>
            <h3 className="text-xl text-white mb-2">{title}</h3>
            <div className="w-8 h-1 bg-gold mx-auto mb-4"></div>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
));

const ProjectCard = React.memo(({ project, index }) => (
    <article
        key={project.id}
        className="art-deco-card group cursor-pointer reveal flex-shrink-0 w-64 md-w-80 lg-w-96"
        style={{ transitionDelay: `${index * 100}ms` }}
    >
        <div className="relative h-40 md-h-48 lg-h-56 overflow-hidden border-b border-gold-20">
            <img
                src={project.image}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
                alt={project.title}
            />
            <div className="absolute top-2 md-top-4 left-2 md-left-4 bg-black-80 border border-gold-50 px-2 py-1 md-px-3 text-8px md-text-10px text-gold uppercase tracking-wider">
                {project.category}
            </div>
        </div>
        <div className="p-4 md-p-6 lg-p-8">
            <h3 className="text-sm md-text-lg lg-text-xl text-white mb-2 md-mb-3 leading-snug group-hover:text-gold transition-colors">{project.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed mb-4 md-mb-6 line-clamp-3 font-light">
                {project.description}
            </p>
            <div className="flex items-center text-gold text-xs tracking-widest uppercase font-bold group/link">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    View Project
                    <span className="ml-2 transform transition-transform group-hover/link:translate-x-2">→</span>
                </a>
            </div>
        </div>
    </article>
));

const Home = () => {
    const { t } = useLanguage();
    const heroBgRef = useRef(null);
    const heroContentRef = useRef(null);
    const charBgTextRef = useRef(null);

    // Memoized data to prevent unnecessary re-renders
    const experienceData = useMemo(() => getExperienceData(t), [t]);
    const educationData = useMemo(() => getEducationData(t), [t]);
    const projectsData = useMemo(() => getProjectsData(t), [t]);
    const servicesData = useMemo(() => getServicesData(t), [t]);
    const publicationsData = useMemo(() => getPublicationsData(t), [t]);

    // Optimized scroll handler with useCallback
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Hero Parallax
        if (heroBgRef.current && currentScrollY < window.innerHeight) {
            heroBgRef.current.style.transform = `translateY(${currentScrollY * 0.4}px) scale(1.1)`;
        }
        if (heroContentRef.current && currentScrollY < window.innerHeight) {
            heroContentRef.current.style.transform = `translateY(${currentScrollY * 0.2}px)`;
        }

        // Character Background Text Parallax
        const aboutSection = document.getElementById('about');
        if (charBgTextRef.current && aboutSection) {
            const charSectionTop = aboutSection.offsetTop;
            if (currentScrollY + window.innerHeight > charSectionTop) {
                const distance = currentScrollY - charSectionTop;
                charBgTextRef.current.style.transform = `translate(-50%, calc(-50% + ${distance * 0.15}px))`;
            }
        }
    }, []);

    // Optimized rotating words animation
    useEffect(() => {
        const words = ['Designer', 'Developer', 'Creator'];
        let wordIndex = 0;
        const rotatingWord = document.getElementById('rotating-word');

        if (rotatingWord) {
            const rotateWord = () => {
                rotatingWord.style.opacity = '0';
                setTimeout(() => {
                    wordIndex = (wordIndex + 1) % words.length;
                    rotatingWord.textContent = words[wordIndex];
                    rotatingWord.style.opacity = '1';
                }, 500);
            };

            const interval = setInterval(rotateWord, 3000);
            window.addEventListener('scroll', handleScroll);

            return () => {
                clearInterval(interval);
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    return (
        <>
            <ParticleCanvas />

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden">
                {/* Background with Parallax */}
                <div className="absolute inset-0 z-0">
                    <div
                        ref={heroBgRef}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundImage: "url('/assets/img/blog/sispol.png')",
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            opacity: 1,
                            zIndex: 0
                        }}
                    />
                    {/* Overlays removed here so the background image is clearly visible */}
                </div>

                {/* Hero Content */}
                <div ref={heroContentRef} className="relative z-10 px-4 mt-20">
                    <div className="hero-title-wrapper animate-fade-up delay-200">
                        <div className="hero-expedition">SADIT</div>
                        <div className="hero-number">ADITYA</div>
                    </div>

                    <div className="text-center mb-8 animate-fade-up delay-400">
                        <span className="text-3xl md:text-4xl font-bold text-gold block">
                            <span id="rotating-word">Developer</span>
                        </span>
                    </div>

                    <div className="about-social-icon text-center animate-fade-up delay-600">
                        <ul className="about-social flex justify-center items-center gap-6">
                            <li>
                                <a href="https://www.linkedin.com/in/surya-aditya-gd-33306821b/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors text-2xl">
                                    <i className="fab fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://github.com/saditya2610" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors text-2xl">
                                    <i className="fab fa-github" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/dirgantaras/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-white transition-colors text-2xl">
                                    <i className="fab fa-instagram" aria-hidden="true"></i>
                                </a>
                            </li>
                            <li>
                                <a
                                    id="cy-effective-orcid-url"
                                    href="https://orcid.org/0009-0001-6148-4083"
                                    target="orcid.widget"
                                    rel="me noopener noreferrer"
                                    title="ORCID iD: 0009-0001-6148-4083"
                                    className="text-gold hover:text-white transition-colors flex items-center"
                                    style={{ verticalAlign: 'top' }}
                                >
                                    <img
                                        src="/assets/img/orcid_16x16.png"
                                        alt="ORCID iD icon"
                                        style={{ width: '1.5rem', height: '1.5rem' }}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-center gap-6 mt-12 animate-fade-up delay-800">
                        <a href="/#projects" className="btn-gothic-fill">
                            {t('home.hero.explore')}
                            <i className="fas fa-arrow-down ml-2"></i>
                        </a>
                        <a href="/#contact" className="btn-gothic-outline" rel="noopener noreferrer">
                            {t('home.hero.contact')}
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-6 relative z-10">
                <div className="text-center mb-20 reveal">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                        <span className="text-gold text-xs tracking-[0.4em] uppercase">{t('home.portfolio.tag')}</span>
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                    </div>
                    <h2 className="text-3xl md-text-5xl text-white drop-shadow-lg">
                        <span className="text-gradient-gold">{t('home.portfolio.title1')}</span> {t('home.portfolio.title2')}
                    </h2>
                </div>

                <div className="max-w-7xl mx-auto overflow-x-auto">
                    <div className="flex gap-4 md-gap-6 lg-gap-8 pb-4" style={{ minWidth: 'max-content' }}>
                        {projectsData.slice(0, 3).map((project, index) => (
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12 reveal">
                    <Link to="/projects" className="btn-gothic-outline inline-block">
                        {t('home.portfolio.more')}
                        <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </div>
            </section>

            {/* Resume Section with Journey Timeline */}
            <section id="resume" className="journey-section">
                <div className="journey-container">
                    <div className="journey-header reveal">
                        <div className="journey-tag-row">
                            <div className="journey-tag-line"></div>
                            <span className="journey-tag-text">{t('home.experience.tag')}</span>
                            <div className="journey-tag-line reverse"></div>
                        </div>
                        <h3 className="journey-main-title">
                            {t('home.experience.title1')}
                            <span className="text-gradient-gold">{t('home.experience.title2')}</span>
                        </h3>
                        <div className="journey-title-bar"></div>
                    </div>

                    {/* Education Section */}
                    <div className="journey-block">
                        <div className="journey-sub-header reveal">
                            <h4 className="journey-sub-title">
                                <span>01.</span> {t('home.experience.eduPath')}
                            </h4>
                            <div className="journey-sub-pill">{t('home.experience.academic')}</div>
                        </div>

                        <div className="journey-timeline">
                            {educationData.map((edu, idx) => (
                                <div key={idx} className="journey-item reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="journey-node">
                                        <i className="fas fa-graduation-cap" aria-hidden="true"></i>
                                    </div>

                                    <div className="journey-card">
                                        <div className="journey-card-header">
                                            <span className="journey-period-badge">
                                                <i className="far fa-calendar-alt" aria-hidden="true"></i>
                                                {edu.period}
                                            </span>
                                            <span className="journey-meta-pill">
                                                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                                                {edu.desc.includes('Pekanbaru') || edu.institution.includes('Pekanbaru') || edu.institution.includes('UIN SUSKA')
                                                    ? 'Pekanbaru, Riau'
                                                    : 'Online'}
                                            </span>
                                        </div>

                                        <h5 className="journey-card-title">{edu.degree}</h5>
                                        <h6 className="journey-card-subtitle">{edu.institution}</h6>
                                        <p className="journey-card-desc">{edu.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Experience Section */}
                    <div className="journey-block">
                        <div className="journey-sub-header reveal">
                            <h4 className="journey-sub-title">
                                <span>02.</span> {t('home.experience.expPath')}
                            </h4>
                            <div className="journey-sub-pill">{t('home.experience.professional')}</div>
                        </div>

                        <div className="journey-timeline">
                            {experienceData.map((exp, idx) => (
                                <div key={exp.id} className="journey-item reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="journey-node">
                                        <i className={exp.company.includes('Youtube') ? 'fab fa-youtube' : 'fas fa-briefcase'} aria-hidden="true"></i>
                                    </div>

                                    <div className="journey-card">
                                        <div className="journey-card-header">
                                            <span className="journey-period-badge">
                                                <i className="far fa-clock" aria-hidden="true"></i>
                                                {exp.period}
                                            </span>
                                            <span className="journey-meta-pill">
                                                {exp.company.includes('Universitas') ? 'Education' :
                                                    exp.company.includes('Koni') ? 'Government' :
                                                        exp.company.includes('Dinas') ? 'Government' :
                                                            exp.company.includes('Youtube') ? 'Content' : 'Company'}
                                            </span>
                                        </div>

                                        <h5 className="journey-card-title">{exp.role}</h5>
                                        <h6 className="journey-card-subtitle">{exp.company}</h6>
                                        <p className="journey-card-desc">{exp.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Publications Section */}
                    <div id="publications" className="journey-block">
                        <div className="journey-sub-header reveal">
                            <h4 className="journey-sub-title">
                                <span>03.</span> {t('home.publications.pubPath')}
                            </h4>
                            <div className="journey-sub-pill">{t('home.publications.academicPub')}</div>
                        </div>

                        <div className="journey-timeline">
                            {publicationsData.map((pub, idx) => (
                                <div key={pub.id} className="journey-item reveal" style={{ transitionDelay: `${idx * 150}ms` }}>
                                    <div className="journey-node">
                                        <i className="fas fa-book-open" aria-hidden="true"></i>
                                    </div>

                                    <div className="journey-card">
                                        <div className="journey-card-header">
                                            <span className="journey-period-badge">
                                                <i className="far fa-calendar-check" aria-hidden="true"></i>
                                                {pub.year}
                                            </span>
                                            <span className="journey-meta-pill">DOI: {pub.doi}</span>
                                        </div>

                                        <h5 className="journey-card-title">
                                            <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                                {pub.title}
                                            </a>
                                        </h5>
                                        <p className="journey-card-authors">{pub.authors}</p>
                                        <p className="journey-card-journal">{pub.journal}</p>
                                        <p className="journey-card-desc">{pub.desc}</p>

                                        <div className="journey-card-footer">
                                            <a
                                                href={pub.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="journey-card-link"
                                            >
                                                {t('home.publications.readPaper')}
                                                <span>→</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12 reveal">
                            <a
                                href="https://scholar.google.co.id/citations?hl=id&view_op=list_works&gmla=AN_4Zu9VbtpQ2M48GQsACqBPB6r9XEroHGqNfAKiDOxNZpvF0atvG_GnVNoxDK6KvJQ6e19zHGMeldISPa0fBeBU7S7MvzYp1u-UJg&user=QQ-mLNAAAAAJ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-gothic-outline inline-block"
                            >
                                <i className="fas fa-graduation-cap mr-2"></i>
                                {t('home.publications.scholarProfile')}
                            </a>
                        </div>
                    </div>

                    {/* Bottom decorative separator */}
                    <div className="journey-divider">
                        <div className="journey-divider-line"></div>
                        <div className="journey-divider-diamond"></div>
                        <div className="journey-divider-line reverse"></div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-32 relative bg-gradient-to-b from-[#050505] to-[#111] overflow-hidden expedition-33-accent">
                <div
                    ref={charBgTextRef}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading text-white/[0.02] pointer-events-none select-none transition-transform duration-100 ease-out"
                >
                    SADIT
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center mb-20 reveal">
                        <h3 className="text-4xl font-serif text-white mb-2">{t('home.services.title')}</h3>
                        <div className="w-16 h-1 bg-gold mx-auto mt-4 mb-8"></div>
                        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {t('home.services.desc')}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
                            {servicesData.map((service, index) => (
                                <ServiceCard
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    delay={service.delay}
                                />
                            ))}
                        </div>

                        {/* Profile Section */}
                        <style>{`
                            .profile-container {
                                display: flex;
                                flex-direction: column;
                                align-items: center;
                                gap: 2.5rem;
                                margin-bottom: 5rem;
                                text-align: center;
                                padding: 0 1.5rem;
                                margin-top: 3rem;
                            }
                            @media (min-width: 768px) {
                                .profile-container {
                                    gap: 3.5rem;
                                    padding: 0;
                                }
                            }
                            .profile-img-wrapper {
                                width: 220px;
                                margin: 0 auto;
                                display: block;
                                position: relative;
                                z-index: 10;
                            }
                            .profile-img-inner {
                                position: relative;
                                width: 100%;
                                border: 2px solid #c6a665;
                                border-radius: 1.5rem;
                                padding: 8px;
                                z-index: 10;
                                background: linear-gradient(145deg, #111, #050505);
                                box-shadow: 0 10px 30px -5px rgba(198, 166, 101, 0.3);
                                transition: all 0.5s ease;
                                animation: floatProfile 6s ease-in-out infinite;
                            }
                            @keyframes floatProfile {
                                0%, 100% { transform: translateY(0); box-shadow: 0 10px 30px -5px rgba(198, 166, 101, 0.3); }
                                50% { transform: translateY(-10px); box-shadow: 0 20px 40px -5px rgba(198, 166, 101, 0.5); }
                            }
                            .profile-img-inner:hover {
                                border-color: #ebd6a4;
                                box-shadow: 0 15px 50px -5px rgba(198, 166, 101, 0.8);
                                transform: translateY(-10px) scale(1.02);
                                animation-play-state: paused;
                            }
                            .profile-img-inner img {
                                width: 100%;
                                height: auto;
                                display: block;
                                border-radius: 1rem;
                                transition: all 0.7s ease;
                                filter: grayscale(15%) contrast(110%);
                            }
                            .profile-img-inner:hover img {
                                filter: grayscale(0%) contrast(100%);
                            }
                            .profile-text-wrapper {
                                width: 100%;
                                max-width: 800px;
                                margin: 0 auto;
                            }
                            .profile-greeting {
                                font-size: 1.8rem;
                                color: white;
                                margin-bottom: 0.5rem;
                                font-family: 'Cinzel', serif;
                            }
                            @media (min-width: 768px) {
                                .profile-greeting { font-size: 2.5rem; }
                            }
                            @media (min-width: 1024px) {
                                .profile-greeting { font-size: 3rem; }
                            }
                            .profile-buttons {
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                align-items: center;
                                gap: 1rem;
                                margin-top: 2.5rem;
                            }
                            .profile-buttons a {
                                width: 100%;
                            }
                            @media (min-width: 640px) {
                                .profile-buttons {
                                    flex-direction: row;
                                }
                                .profile-buttons a {
                                    width: auto;
                                }
                            }
                        `}</style>
                        <div id="profile" className="profile-container reveal">
                            <div className="profile-img-wrapper reveal" style={{ transitionDelay: '100ms' }}>
                                <div className="profile-img-inner cartoon-image">
                                    <img
                                        src="/assets/img/surya.png"
                                        alt="Profil Surya Aditya"
                                    />
                                </div>
                            </div>

                            <div className="profile-text-wrapper reveal" style={{ transitionDelay: '300ms' }}>
                                <h3 className="profile-greeting">{t('home.about.greeting')}</h3>
                                <h4 style={{ color: '#c6a665', fontSize: '0.875rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1.5rem', fontWeight: 'bold' }}>{t('home.about.aka')}</h4>

                                <p style={{ color: '#9ca3af', lineHeight: '1.8', fontWeight: '300', marginBottom: '2rem', fontSize: '1rem' }}>
                                    {t('home.about.desc1')}<span style={{ color: '#e5e7eb', fontWeight: '500' }}>{t('home.about.desc1_1')}</span>{t('home.about.desc1_2')}<span style={{ color: '#e5e7eb', fontWeight: '500' }}>{t('home.about.desc1_3')}</span>{t('home.about.desc1_4')}
                                    <br/><br/>
                                    {t('home.about.desc2')}
                                    <a style={{ color: '#c6a665', textDecoration: 'underline', marginLeft: '0.5rem', fontWeight: '500' }} href="https://wa.me/6289643119126">{t('home.about.desc2_link')}</a>
                                    <br/><br/>
                                    {t('home.about.desc3')}
                                </p>

                                <div className="profile-buttons">
                                    <a href="/assets/cv/Surya Aditya GD CV Update 2024.pdf" target="_blank" rel="noreferrer" className="btn-gothic-outline text-center">
                                        {t('home.about.btn_cv')}
                                    </a>
                                    <a href="https://wa.me/6289643119126" target="_blank" rel="noreferrer" className="btn-gothic-fill text-center">
                                        {t('home.about.btn_hire')}
                                    </a>
                                    <a href="/assets/cv/Portfolio Surya Aditya GD.pdf" target="_blank" rel="noreferrer" className="btn-gothic-outline text-center">
                                        {t('home.about.btn_portfolio')}
                                    </a>
                                </div>

                                {/* ORCID iD */}
                                <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <a
                                        id="cy-effective-orcid-url"
                                        href="https://orcid.org/0009-0001-6148-4083"
                                        target="orcid.widget"
                                        rel="me noopener noreferrer"
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.4rem',
                                            color: '#c6a665',
                                            textDecoration: 'underline',
                                            fontSize: '0.85rem',
                                            verticalAlign: 'top',
                                            transition: 'color 0.3s'
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#c6a665'}
                                    >
                                        <img
                                            src="/assets/img/orcid_16x16.png"
                                            style={{ width: '1em', marginInlineStart: '0' }}
                                            alt="ORCID iD icon"
                                        />
                                        https://orcid.org/0009-0001-6148-4083
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <StatCard
                                    icon="fas fa-pencil-alt"
                                    number="0007"
                                    description={t('home.about.stats.stat1')}
                                    delay="100"
                                />
                                <StatCard
                                    icon="fas fa-crop-alt"
                                    number="0040"
                                    description={t('home.about.stats.stat2')}
                                    delay="200"
                                />
                                <StatCard
                                    icon="fas fa-bolt"
                                    number="0004"
                                    description={t('home.about.stats.stat3')}
                                    delay="300"
                                />
                                <StatCard
                                    icon="fas fa-coffee"
                                    number="0025"
                                    description={t('home.about.stats.stat4')}
                                    delay="400"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Creator Section */}
            <section id="content-creator" className="creator-section-wrapper">
                {/* Decorative background elements */}
                <div className="creator-bg-glow-left"></div>
                <div className="creator-bg-glow-right"></div>

                <div className="container relative z-10">
                    <div className="creator-header reveal">
                        <div className="creator-tag">
                            <div className="creator-tag-line"></div>
                            <i className="fab fa-youtube text-lg"></i> {t('home.creator.tag')}
                            <div className="creator-tag-line reverse"></div>
                        </div>
                        <h3 className="creator-title">
                            {t('home.creator.title1')} <span>{t('home.creator.title2')}</span>
                        </h3>
                        <div className="creator-separator"></div>
                        <p className="creator-desc">
                            {t('home.creator.desc')}
                        </p>
                    </div>

                    <div className="creator-grid reveal">
                        {/* Channel 1: Sadit Aditya */}
                        <div className="creator-card group">
                            <div className="creator-card-bg-hover"></div>
                            
                            {/* YouTube Video Embed */}
                            <div className="creator-video-wrapper">
                                <iframe 
                                    src="https://www.youtube.com/embed/9FTrWk9wAhE" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                ></iframe>
                                <div className="creator-badge">
                                    {t('home.creator.featured')}
                                </div>
                            </div>

                            <div className="creator-content">
                                <div className="creator-avatar">
                                    <img src="https://yt3.googleusercontent.com/ytc/AIdro_mYGbACZd4_GGuM4vDUumFxEWsvS4Kg-358gFI_9Ae5BSE=s160-c-k-c0x00ffffff-no-rj" alt="Sadit Aditya" />
                                </div>
                                <h4 className="creator-name">Sadit Aditya</h4>
                                <div className="creator-role">
                                    <i className="fas fa-gamepad"></i> {t('home.creator.channel1.badge')}
                                </div>
                                <p className="creator-card-desc">
                                    {t('home.creator.channel1.desc')}
                                </p>

                                {/* Stats & Action */}
                                <div className="creator-stats-container">
                                    <div className="creator-stats">
                                        <div className="creator-stat-item">
                                            <span className="creator-stat-value">2.73K</span>
                                            <span className="creator-stat-label">{t('home.creator.subscribers')}</span>
                                        </div>
                                        <div className="creator-stat-divider"></div>
                                        <div className="creator-stat-item">
                                            <span className="creator-stat-value">33K</span>
                                            <span className="creator-stat-label">{t('home.creator.views')}</span>
                                        </div>
                                    </div>

                                    <a href="https://www.youtube.com/@SaditAditya" target="_blank" rel="noopener noreferrer" className="creator-btn-primary">
                                        <i className="fab fa-youtube text-xl"></i> {t('home.creator.visit')}
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Channel 2: SADIT ID */}
                        <div className="creator-card group">
                            <div className="creator-card-bg-hover"></div>
                            
                            {/* YouTube Video Embed */}
                            <div className="creator-video-wrapper">
                                <iframe 
                                    src="https://www.youtube.com/embed/KmEVEi-XXws" 
                                    title="YouTube video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                ></iframe>
                                <div className="creator-badge">
                                    {t('home.creator.featured')}
                                </div>
                            </div>

                            <div className="creator-content">
                                <div className="creator-avatar">
                                    <img src="https://yt3.googleusercontent.com/AGf4CUq8fZIxONiZoGNBVznGjUiXCkk0_Koj1EjxzJU2OVfBP8ZdkLhywoxDGw4e2Fn6DNi5X9U=s160-c-k-c0x00ffffff-no-rj" alt="SADIT ID" />
                                </div>
                                <h4 className="creator-name">SADIT ID</h4>
                                <div className="creator-role">
                                    <i className="fas fa-headset"></i> {t('home.creator.channel2.badge')}
                                </div>
                                <p className="creator-card-desc">
                                    {t('home.creator.channel2.desc')}
                                </p>

                                {/* Stats & Action */}
                                <div className="creator-stats-container">
                                    <div className="creator-stats">
                                        <div className="creator-stat-item">
                                            <span className="creator-stat-value">1.59K</span>
                                            <span className="creator-stat-label">{t('home.creator.subscribers')}</span>
                                        </div>
                                        <div className="creator-stat-divider"></div>
                                        <div className="creator-stat-item">
                                            <span className="creator-stat-value">17K</span>
                                            <span className="creator-stat-label">{t('home.creator.views')}</span>
                                        </div>
                                    </div>

                                    <a href="https://www.youtube.com/@SADITID" target="_blank" rel="noopener noreferrer" className="creator-btn-secondary">
                                        <i className="fab fa-youtube text-xl"></i> {t('home.creator.visit')}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 bg-[#050505] relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16 reveal">
                        <div className="flex items-center justify-center gap-4 mb-4">
                            <div className="h-[1px] w-10 bg-gold/50"></div>
                            <span className="text-gold text-xs tracking-[0.4em] uppercase">{t('nav.contact')}</span>
                            <div className="h-[1px] w-10 bg-gold/50"></div>
                        </div>
                        <h3 className="text-3xl md:text-4xl text-white mb-4">{t('home.contact.title')}</h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                            {t('home.contact.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 reveal">
                        <div className="bg-[#0a0a0a] border border-gold/20 p-6 text-center">
                            <i className="fa fa-map-marker contact-icon text-gold text-3xl mb-4" aria-hidden="true"></i>
                            <h3 className="text-white text-lg mb-2">Address</h3>
                            <p className="text-gray-400 text-sm">Pekanbaru, Riau, Indonesia</p>
                        </div>

                        <div className="bg-[#0a0a0a] border border-gold/20 p-6 text-center">
                            <i className="fa fa-envelope contact-icon text-gold text-3xl mb-4" aria-hidden="true"></i>
                            <h3 className="text-white text-lg mb-2">Email</h3>
                            <a
                                href="mailto:saditadityagd@gmail.com"
                                className="text-gold text-sm break-all"
                            >
                                saditadityagd@gmail.com
                            </a>
                        </div>

                        <div className="bg-[#0a0a0a] border border-gold/20 p-6 text-center">
                            <i className="fa fa-mobile contact-icon text-gold text-3xl mb-4" aria-hidden="true"></i>
                            <h3 className="text-white text-lg mb-2">Phone (Whatsapp)</h3>
                            <a
                                href="https://wa.me/6289643119126"
                                className="text-gold text-sm"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                +6289643119126
                            </a>
                        </div>

                        <div className="bg-[#0a0a0a] border border-gold/20 p-6 text-center">
                            <i className="fa fa-television contact-icon text-gold text-3xl mb-4" aria-hidden="true"></i>
                            <h3 className="text-white text-lg mb-2">Portfolio</h3>
                            <a href="/#profile" className="text-gold text-sm underline">
                                Click Here
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <ScrollReveal />
            <ChatbotWidget />
        </>
    );
};

export default Home;
