import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../component/ParticleCanvas';
import ScrollReveal from '../component/ScrollReveal';

// Static data moved outside component
const SKILLS_DATA = [
    { name: "HTML / CSS", percentage: 97 },
    { name: "UI / UX", percentage: 92 },
    { name: "React JS", percentage: 90 },
    { name: "PHP (Laravel)", percentage: 80 },
    { name: "MySQL", percentage: 95 },
];

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

const Home = () => {
    const [scrollY, setScrollY] = useState(0);
    const heroBgRef = useRef(null);
    const heroContentRef = useRef(null);
    const charBgTextRef = useRef(null);
    {
        id: 1,
            company: "Universitas Abdurrab Pekanbaru",
                role: "IT, Programmer (Full Time)",
                    period: "Jan 2024 - Present",
                        desc: "As Mobile Flutter Developer Programmer"
    },
    {
        id: 2,
            company: "Koni Provinsi Riau",
                role: "IT, Application Implementor (Contract)",
                    period: "Aug 2023 - Dec 2023",
                        desc: "As IT support and Implementor Application/System Website Monitor Sports"
    },
    {
        id: 3,
            company: "Dinas Perhubungan Provinsi Riau",
                role: "Publication Service, Programmer",
                    period: "2022-2022",
                        desc: "Internship as a Publication Service and Programmer"
    },
    {
        id: 4,
            company: "Youtube Channel",
                role: "Content Creator",
                    period: "2017-Present",
                        desc: "As a Content Creator on youtube Channel Sadit Aditya"
    }
];

const educationData = [
    {
        institution: "UIN SUSKA RIAU",
        degree: "Graduation (Learning and Management Science)",
        period: "2019 - 2023",
        desc: "Pekanbaru, Riau, Indonesia."
    },
    {
        institution: "Digitalent Scholarship (Kominfo)",
        degree: "Frontend Web Development (FGA)",
        period: "2022",
        desc: "Learning React JS Web Development."
    },
    {
        institution: "SMAN 4 Pekanbaru",
        degree: "Senior High School",
        period: "2016 - 2018",
        desc: "Science Major"
    }
];

const projectsData = [
    {
        id: 1,
        category: "Web App",
        title: "Sistem Polling (SISPOL)",
        description: "Sistem polling Untuk Melakukan Penilaian dari Berbagai Perusahaan yang bekerja sama dengan Dishub Provinsi Riau.",
        image: "/assets/img/blog/sispol.png",
        link: "https://github.com/saditya2610/sispol",
        delay: 0
    },
    {
        id: 2,
        category: "Mobile App",
        title: "Univrab Mobile",
        description: "Aplikasi Absensi Universitas Abdurrab berbasis Mobile.",
        image: "/assets/img/blog/mobile.png",
        link: "https://github.com/saditya2610/univrabmobile",
        delay: 100
    },
    {
        id: 3,
        category: "Web Design",
        title: "Web Fakultas Teknik",
        description: "Web CMS Fakultas Teknik Universitas Abdurrab.",
        image: "/assets/img/blog/Web_Fakul.png",
        link: "https://fakultas-teknik.univrab.ac.id/",
        delay: 200
    },
    {
        id: 4,
        category: "E-Commerce",
        title: "Toko Game",
        description: "Toko game yang dikenal di berbagai komunitas gamer di Indonesia karena layanannya yang selalu mengutamakan kepuasan pelanggan.",
        image: "/assets/img/blog/tokogame.png",
        link: "https://saditya2610.github.io/tokogame.github.io/",
        delay: 300
    },
    {
        id: 5,
        category: "Tools",
        title: "Kalkulator Sederhana",
        description: "Menggunakan Javascript berbasis HTML untuk perhitungan sederhana.",
        image: "/assets/img/blog/kalkulator.png",
        link: "https://saditya2610.github.io/kalkulator/",
        delay: 400
    },
    {
        id: 6,
        category: "Blog",
        title: "Wordpress | Sadit Aditya",
        description: "Membahas seputar SADIT ADITYA dan portofolio personal.",
        image: "/assets/img/blog/saditadityawordpress.png",
        link: "https://saditaditya.wordpress.com/",
        delay: 500
    }
];

useEffect(() => {
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        setScrollY(currentScrollY);

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
    };

    // Rotating Words Animation
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
        return () => {
            clearInterval(interval);
            window.removeEventListener('scroll', handleScroll);
        };
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
    <>
        <ParticleCanvas />

        {/* Hero Section */}
        <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden expedition-33-accent">
            {/* Background with Parallax */}
            <div className="absolute inset-0 z-[-1]">
                <div
                    ref={heroBgRef}
                    className="w-full h-full bg-cover bg-center opacity-80 grayscale-[30%] scale-110 transition-transform duration-100 ease-out"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1542259681-d2a3297a7a30?q=80&w=2574&auto=format&fit=crop')"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]"></div>
                <div className="expedition-pattern"></div>
                <div className="clair-obscur-overlay"></div>
            </div>

            {/* Expedition Badge */}


            {/* Hero Content */}
            <div ref={heroContentRef} className="relative z-10 px-4 mt-20">
                {/* Animated Title with Word Rotation */}
                <div className="hero-title-wrapper animate-fade-up delay-200">
                    <div className="hero-expedition">SADIT</div>
                    <div className="hero-number">ADITYA</div>
                </div>

                {/* Rotating Words */}
                <div className="text-center mb-8 animate-fade-up delay-400">
                    <span className="text-3xl md:text-4xl font-bold text-gold block">
                        <span id="rotating-word">Developer</span>
                    </span>
                </div>

                {/* Social Icons */}
                <div className="about-social-icon text-center animate-fade-up delay-600">
                    <ul className="about-social flex justify-center items-center gap-6">
                        <li>
                            <a
                                href="https://www.linkedin.com/in/surya-aditya-gd-33306821b/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-white transition-colors text-2xl"
                            >
                                <i className="fa fa-linkedin" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://github.com/saditya2610"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-white transition-colors text-2xl"
                            >
                                <i className="fa fa-github" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.instagram.com/dirgantaras/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-white transition-colors text-2xl"
                            >
                                <i className="fa fa-instagram" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gold hover:text-white transition-colors text-2xl"
                            >
                                <i className="fa fa-twitter" aria-hidden="true"></i>
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Call to Action */}
                <div className="flex justify-center gap-6 mt-12 animate-fade-up delay-800">
                    <Link to="#about" className="btn-gothic-fill">
                        Explore My Work
                        <i className="fas fa-arrow-down ml-2"></i>
                    </Link>
                    <Link to="#contact" className="btn-gothic-outline">
                        Get In Touch
                    </Link>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 relative z-10">
            <div className="text-center mb-20 reveal">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-[1px] w-10 bg-gold/50"></div>
                    <span className="text-gold text-xs tracking-[0.4em] uppercase">Portfolio</span>
                    <div className="h-[1px] w-10 bg-gold/50"></div>
                </div>
                <h2 className="text-3xl md-text-5xl text-white drop-shadow-lg">
                    <span className="text-gradient-gold">Latest</span> Projects
                </h2>
            </div>

            <div className="max-w-7xl mx-auto overflow-x-auto">
                <div className="flex gap-4 md-gap-6 lg-gap-8 pb-4" style={{ minWidth: 'max-content' }}>
                    {projectsData.slice(0, 3).map((project, index) => (
                        <article key={project.id} className="art-deco-card group cursor-pointer reveal flex-shrink-0 w-64 md-w-80 lg-w-96" style={{ transitionDelay: `${index * 100}ms` }}>
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
                    ))}
                </div>
            </div>

            <div className="text-center mt-12 reveal">
                <Link
                    to="/projects"
                    className="btn-gothic-outline inline-block"
                >
                    Lihat Proyek Lainnya
                    <i className="fas fa-arrow-right ml-2"></i>
                </Link>
            </div>
        </section >

        {/* Trailer Section */}
        < section className="py-10 relative expedition-33-accent" >
            <div className="deco-separator">
                <div className="deco-line"></div>
                <div className="deco-symbol"></div>
                <div className="deco-line right"></div>
            </div>

            <div className="relative w-full max-w-6xl mx-auto h-[60vh] mt-10 brush-mask-container group overflow-hidden bg-black reveal">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-80 transition-transform duration-[2s] group-hover:scale-105"
                    style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1533240332313-0db49b459ad6?q=80&w=2574&auto=format&fit=crop')"
                    }}
                />

                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-gold text-xs tracking-[0.5em] uppercase mb-8 drop-shadow-md">Showreel 2025</p>
                    <div className="diamond-btn">
                        <i className="fas fa-play"></i>
                    </div>
                    <h2 className="text-3xl text-white mt-8 tracking-widest uppercase font-bold drop-shadow-md">Visual Experience</h2>
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none border-[20px] border-transparent" style={{ borderImage: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent) 1" }}></div>
            </div>
        </section >

        {/* Skills Section */}
        < section id="skills" className="py-24 bg-[#0a0a0a] border-y border-[#ffffff05] relative z-10 expedition-33-accent" >
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-16 reveal">
                    <h3 className="text-4xl font-serif text-white mb-2">MY <span className="text-gradient-gold">SKILLS</span></h3>
                    <div className="w-16 h-1 bg-gold mx-auto mt-4"></div>
                </div>

                <div className="grid grid-cols-1 md-grid-cols-2 gap-16 items-center">
                    <div className="reveal">
                        <h4 className="text-xl font-serif text-white mb-4">Design & Code</h4>
                        <p className="text-gray-400 leading-loose text-sm font-light text-justify">
                            UI/UX melibatkan perencanaan dan pengulangan struktur dan tata letak situs. Setelah arsitektur informasi yang tepat tersedia, saya mendesain lapisan visual untuk menciptakan keindahan pengalaman pengguna. Menggunakan HTML, CSS, dan Javascript, saya membuat situs web yang cepat dan interaktif.
                        </p>
                    </div>
                    <div className="space-y-6">
                        {skillsData.map((skill, idx) => (
                            <div key={idx} className="reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                                {/* Skill Header */}
                                <div className="flex justify-between items-end mb-3">
                                    <span className="text-white font-medium text-sm uppercase tracking-wider">{skill.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gold font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>{skill.percentage}%</span>
                                        <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Progress Bar Container */}
                                <div className="relative h-3 bg-[#1a1a1a] rounded-full overflow-hidden border border-gold/20">
                                    {/* Background Pattern */}
                                    <div className="absolute inset-0 opacity-10">
                                        <div className="h-full w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
                                    </div>

                                    {/* Progress Bar Fill */}
                                    <div
                                        className="h-full bg-gradient-to-r from-gold via-gold to-[#8a703d] rounded-full relative overflow-hidden transition-all duration-1500 ease-out reveal"
                                        style={{
                                            width: `${skill.percentage}%`,
                                            transitionDelay: `${idx * 150 + 500}ms`
                                        }}
                                    >
                                        {/* Animated Shine Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-shine"></div>

                                        {/* Inner Glow */}
                                        <div className="absolute inset-0 bg-gold/20 blur-sm"></div>

                                        {/* Progress Indicator */}
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] border-2 border-gold">
                                            <div className="absolute inset-0 bg-gold rounded-full scale-50 animate-ping"></div>
                                        </div>
                                    </div>

                                    {/* Percentage Label Inside Bar */}
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-white/60 font-mono">
                                        {skill.percentage}%
                                    </div>
                                </div>

                                {/* Skill Level Badge */}
                                <div className="flex items-center gap-2 mt-2">
                                    <div className={`px-2 py-1 text-xs rounded-full border ${skill.percentage >= 95 ? 'bg-gold/20 border-gold text-gold' :
                                        skill.percentage >= 85 ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' :
                                            skill.percentage >= 75 ? 'bg-green-500/20 border-green-500/50 text-green-400' :
                                                'bg-orange-500/20 border-orange-500/50 text-orange-400'
                                        }`}>
                                        {skill.percentage >= 95 ? 'Expert' :
                                            skill.percentage >= 85 ? 'Advanced' :
                                                skill.percentage >= 75 ? 'Intermediate' : 'Beginner'}
                                    </div>
                                    <div className="flex-1 h-px bg-gradient-to-r from-gold/30 to-transparent"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >

        {/* 4. RESUME (TIMELINE) - ROADMAP STYLE */}
        < section id="resume" className="py-24 px-6 max-w-7xl mx-auto z-10 relative bg-[#080808]" >
            {/* Background decorative elements */}
            < div className="absolute top-0 left-0 w-full h-full opacity-5" >
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-gold rotate-45"></div>
                <div className="absolute bottom-10 right-10 w-24 h-24 border border-gold/50"></div>
                <div className="absolute top-1/2 right-20 w-16 h-16 border border-gold/30 rotate-12"></div>
            </div >

            <div className="text-center mb-20 reveal relative z-10">
                <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold"></div>
                    <span className="text-gold text-xs tracking-[0.4em] uppercase font-serif">Journey</span>
                    <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold"></div>
                </div>
                <h3 className="text-5xl md-text-6xl font-serif text-white mb-4">EDUCATION & <span className="text-gradient-gold">EXPERIENCE</span></h3>
                <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent mx-auto mt-6"></div>
            </div>

            {/* Roadmap Container */}
            <div className="relative z-10">
                {/* Main Road Path */}
                <div className="absolute left-1/2 top-0 bottom-0 w-2 bg-gradient-to-b from-gold via-gold/50 to-gold/20 transform -translate-x-1/2"></div>

                {/* Education Roadmap */}
                <div className="mb-32">
                    <div className="text-center mb-16 reveal">
                        <h4 className="text-3xl font-serif text-white mb-4">
                            <span className="text-gold">01.</span> EDUCATION PATH
                        </h4>
                        <div className="inline-block px-6 py-2 border border-gold/30 bg-[#0a0a0a] rounded-full">
                            <span className="text-gold text-sm tracking-wider">Academic Journey</span>
                        </div>
                    </div>

                    <div className="relative">
                        {educationData.map((edu, idx) => (
                            <div key={idx} className={`relative flex items-center mb-16 reveal ${idx % 2 === 0 ? 'justify-start' : 'justify-end'}`} style={{ transitionDelay: `${idx * 200}ms` }}>
                                {/* Road Node */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="w-8 h-8 bg-[#050505] border-3 border-gold rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                        <div className="w-3 h-3 bg-gold rounded-full"></div>
                                    </div>
                                    {/* Node Glow */}
                                    <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="bg-[#0a0a0a] border border-gold/20 p-6 rounded-lg hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(198,166,101,0.3)] group relative overflow-hidden">
                                        {/* Card Background Pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute top-0 right-0 w-20 h-20 border border-gold rotate-45"></div>
                                        </div>

                                        <div className="relative z-10">
                                            {/* Period Badge */}
                                            <div className={`inline-flex items-center gap-2 mb-4 ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-gold text-xs font-bold tracking-widest uppercase border border-gold/30 px-3 py-1 bg-[#050505]">{edu.period}</span>
                                                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                                            </div>

                                            {/* Content */}
                                            <h5 className="text-white font-bold text-xl font-serif mb-2 group-hover:text-gold transition-colors">{edu.degree}</h5>
                                            <h6 className="text-gold/80 text-sm uppercase tracking-wider mb-3 font-light">{edu.institution}</h6>
                                            <p className="text-gray-400 text-sm leading-relaxed font-light">{edu.desc}</p>

                                            {/* Location Icon */}
                                            <div className={`flex items-center gap-2 mt-4 text-gold/60 text-xs ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                                                <i className="fas fa-map-marker-alt"></i>
                                                <span>{edu.desc.includes('Pekanbaru') ? 'Pekanbaru, Riau' : 'Online'}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connecting Line */}
                                    <div className={`absolute top-1/2 ${idx % 2 === 0 ? 'right-full' : 'left-full'} w-16 h-px bg-gradient-to-r ${idx % 2 === 0 ? 'from-gold to-transparent' : 'from-transparent to-gold'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Roadmap */}
                <div>
                    <div className="text-center mb-16 reveal">
                        <h4 className="text-3xl font-serif text-white mb-4">
                            <span className="text-gold">02.</span> EXPERIENCE PATH
                        </h4>
                        <div className="inline-block px-6 py-2 border border-gold/30 bg-[#0a0a0a] rounded-full">
                            <span className="text-gold text-sm tracking-wider">Professional Journey</span>
                        </div>
                    </div>

                    <div className="relative">
                        {experienceData.map((exp, idx) => (
                            <div key={idx} className={`relative flex items-center mb-16 reveal ${idx % 2 === 1 ? 'justify-start' : 'justify-end'}`} style={{ transitionDelay: `${idx * 200 + 600}ms` }}>
                                {/* Road Node */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                                    <div className="w-8 h-8 bg-[#050505] border-3 border-gold rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                                        <div className="w-3 h-3 bg-gold rounded-full"></div>
                                    </div>
                                    {/* Node Glow */}
                                    <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl animate-pulse"></div>
                                </div>

                                {/* Content Card */}
                                <div className={`w-full md:w-5/12 ${idx % 2 === 1 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                    <div className="bg-[#0a0a0a] border border-gold/20 p-6 rounded-lg hover:border-gold/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(198,166,101,0.3)] group relative overflow-hidden">
                                        {/* Card Background Pattern */}
                                        <div className="absolute inset-0 opacity-5">
                                            <div className="absolute top-0 right-0 w-20 h-20 border border-gold rotate-45"></div>
                                        </div>

                                        <div className="relative z-10">
                                            {/* Period Badge */}
                                            <div className={`inline-flex items-center gap-2 mb-4 ${idx % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-gold text-xs font-bold tracking-widest uppercase border border-gold/30 px-3 py-1 bg-[#050505]">{exp.period}</span>
                                                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                                            </div>

                                            {/* Content */}
                                            <h5 className="text-white font-bold text-xl font-serif mb-2 group-hover:text-gold transition-colors">{exp.role}</h5>
                                            <h6 className="text-gold/80 text-sm uppercase tracking-wider mb-3 font-light">{exp.company}</h6>
                                            <p className="text-gray-400 text-sm leading-relaxed font-light">{exp.desc}</p>

                                            {/* Company Type Badge */}
                                            <div className={`flex items-center gap-2 mt-4 ${idx % 2 === 1 ? 'justify-end' : 'justify-start'}`}>
                                                <span className="text-xs px-2 py-1 border border-gold/30 text-gold/60 rounded">
                                                    {exp.company.includes('Universitas') ? 'Education' :
                                                        exp.company.includes('Koni') ? 'Government' :
                                                            exp.company.includes('Dinas') ? 'Government' :
                                                                exp.company.includes('Youtube') ? 'Content' : 'Company'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Connecting Line */}
                                    <div className={`absolute top-1/2 ${idx % 2 === 1 ? 'right-full' : 'left-full'} w-16 h-px bg-gradient-to-r ${idx % 2 === 1 ? 'from-gold to-transparent' : 'from-transparent to-gold'}`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Roadmap End Marker */}
                <div className="text-center mt-16 reveal">
                    <div className="inline-block relative">
                        <div className="w-12 h-12 bg-gold rounded-full flex items-center justify-center">
                            <i className="fas fa-flag text-black text-xl"></i>
                        </div>
                        <div className="absolute inset-0 bg-gold/30 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <p className="text-gold text-sm tracking-wider mt-4 uppercase">Journey Continues</p>
                </div>
            </div>

            {/* Bottom decorative separator */}
            <div className="flex items-center justify-center gap-8 mt-20 opacity-60">
                <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-gold/50"></div>
                <div className="w-4 h-4 border border-gold/50 rotate-45"></div>
                <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-gold/50"></div>
            </div>
        </section >

        {/* About Section */}
        <section id="about" className="py-32 relative bg-gradient-to-b from-[#050505] to-[#111] overflow-hidden expedition-33-accent">
            <div
                ref={charBgTextRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-heading text-white/[0.02] pointer-events-none select-none transition-transform duration-100 ease-out"
            >
                SADIT
            </div>

            <div className="container mx-auto px-6 relative z-10">
                {/* What I Do Section */}
                <div className="text-center mb-20 reveal">
                    <h3 className="text-4xl font-serif text-white mb-2">What I Do</h3>
                    <div className="w-16 h-1 bg-gold mx-auto mt-4 mb-8"></div>
                    <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        At present time I'm working on a multi-role, as a Web Developer I design and create various websites.
                        And as UI/UX Designer I create many designs for Web Applications and Mobile applications.
                        I create the beauty of the site. I'm responsible for the site's technical aspects, such as its
                        performance and capacity, which are measures of a website's speed and how much traffic the site can handle.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md-grid-cols-4 gap-8 mb-20">
                    <ServiceCard
                        icon="fa fa-pencil-square-o"
                        title="Working Hard"
                        description="Always believe in hard-work with Allah May Great my profession"
                        delay="100"
                    />
                    <ServiceCard
                        icon="fa fa-file-image-o"
                        title="UI/UX Design"
                        description="Senang Melakukan Design UI UX untuk melakukan sebuah Produk(web design)"
                        delay="200"
                    />
                    <ServiceCard
                        icon="fa fa-globe"
                        title="Web Design"
                        description="Menggunakan Figma dan Adobe Photoshop 2020"
                        delay="300"
                    />
                    <ServiceCard
                        icon="fa fa-cog"
                        title="Web Development"
                        description="Membuat Berdasarkan Keinginan Jenis Web Yang dibutuhkan"
                        delay="400"
                    />
                </div>

                {/* Profile Section */}
                <div className="flex flex-col md:flex-row items-center gap-16 mb-20">
                    <div className="w-full md-w-1-2 relative reveal">
                        <div className="relative z-10 border border-gold/30 p-2 group">
                            <div className="cartoon-image">
                                <img
                                    src="/assets/img/surya.png"
                                    className="w-full grayscale transition-all duration-700"
                                    alt="Profile"
                                />
                            </div>
                        </div>
                        <div className="absolute top-6 left-6 w-full h-full border border-gray-800 -z-0"></div>
                    </div>

                    <div className="w-full md-w-1-2 reveal" style={{ transitionDelay: '200ms' }}>
                        <h3 className="text-5xl text-white mb-2 font-heading">Hello! My Name's Surya Aditya</h3>
                        <h4 className="text-gold text-sm tracking-[0.3em] uppercase mb-8">also known as Sadit Aditya</h4>

                        <p className="text-gray-400 leading-loose text-sm font-light mb-8">
                            I am a Frontend Developer or Web Developer From Pekanbaru, Riau, Indonesia. I enjoy
                            building everything from small business sites to rich interactive web apps. if you are a
                            business seeking a web presence or an employer looking to hire, you can get in touch with me
                            <a className="text-gold underline ml-2" href="https://wa.me/6289643119126">here.</a>
                            I design and build digital products with simple and beautiful code. I specialize in custom
                            web theme development and love what I do.
                        </p>

                        <div className="flex gap-4 mb-8">
                            <a href="/assets/cv/Surya Aditya GD CV Update 2024.pdf" target="_blank" className="btn-gothic-outline">
                                See My CV
                            </a>
                            <a href="https://wa.me/6289643119126" className="btn-gothic-fill">
                                Hire Me
                            </a>
                            <a href="/assets/cv/Portfolio Surya Aditya GD.pdf" target="_blank" className="btn-gothic-outline">
                                Short Portfolio
                            </a>
                        </div>
                    </div>
                </div>

                {/* Work Counter */}
                <div className="text-center mb-20">
                    <div className="grid grid-cols-1 md-grid-cols-4 gap-8">
                        <StatCard
                            icon="fa fa-pencil-square-o"
                            number="0007"
                            description="Web Design Completed For Mini Project"
                            delay="100"
                        />
                        <StatCard
                            icon="fa fa-crop"
                            number="0040"
                            description="Graphic Design"
                            delay="200"
                        />
                        <StatCard
                            icon="fa fa-bolt"
                            number="0004"
                            description="Website Created"
                            delay="300"
                        />
                        <StatCard
                            icon="fa fa-coffee"
                            number="0025"
                            description="Cups Coffee Taken"
                            delay="400"
                        />
                    </div>
                </div>
            </div>
        </section>

        <ScrollReveal />
    </>
);
};

export default Home;
