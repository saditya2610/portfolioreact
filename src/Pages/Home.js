import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import ParticleCanvas from '../component/ParticleCanvas';
import ChatbotWidget from '../component/ChatbotWidget';
import ScrollReveal from '../component/ScrollReveal';

// Static data moved outside component to prevent re-creation
const SKILLS_DATA = [
    { name: "HTML / CSS", percentage: 97 },
    { name: "UI / UX", percentage: 92 },
    { name: "React JS", percentage: 90 },
    { name: "PHP (Laravel)", percentage: 80 },
    { name: "MySQL", percentage: 95 },
];

const EXPERIENCE_DATA = [
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

const EDUCATION_DATA = [
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

const PROJECTS_DATA = [
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
    }
];

const SERVICES_DATA = [
    {
        icon: "fas fa-pencil-alt",
        title: "Working Hard",
        description: "Always believe in hard-work with Allah May Great my profession",
        delay: "100"
    },
    {
        icon: "fas fa-palette",
        title: "UI/UX Design",
        description: "Senang Melakukan Design UI UX untuk melakukan sebuah Produk(web design)",
        delay: "200"
    },
    {
        icon: "fas fa-globe",
        title: "Web Design",
        description: "Menggunakan Figma dan Adobe Photoshop 2020",
        delay: "300"
    },
    {
        icon: "fas fa-code",
        title: "Web Development",
        description: "Membuat Berdasarkan Keinginan Jenis Web Yang dibutuhkan",
        delay: "400"
    }
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
    const [scrollY, setScrollY] = useState(0);
    const heroBgRef = useRef(null);
    const heroContentRef = useRef(null);
    const charBgTextRef = useRef(null);

    // Memoized data to prevent unnecessary re-renders
    const skillsData = useMemo(() => SKILLS_DATA, []);
    const experienceData = useMemo(() => EXPERIENCE_DATA, []);
    const educationData = useMemo(() => EDUCATION_DATA, []);
    const projectsData = useMemo(() => PROJECTS_DATA, []);

    // Optimized scroll handler with useCallback
    const handleScroll = useCallback(() => {
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
                        </ul>
                    </div>

                    <div className="flex justify-center gap-6 mt-12 animate-fade-up delay-800">
                        <Link to="#about" className="btn-gothic-fill">
                            Explore My Work
                            <i className="fas fa-arrow-down ml-2"></i>
                        </Link>
                        <a href="#contact" className="btn-gothic-outline" rel="noopener noreferrer">
                            Get In Touch
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
                            <ProjectCard key={project.id} project={project} index={index} />
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12 reveal">
                    <Link to="/projects" className="btn-gothic-outline inline-block">
                        Lihat Proyek Lainnya
                        <i className="fas fa-arrow-right ml-2"></i>
                    </Link>
                </div>
            </section>

            {/* Resume Section with Experience */}
            <section id="resume" className="py-24 px-6 max-w-7xl mx-auto z-10 relative bg-[#080808]">
                <div className="text-center mb-20 reveal relative z-10">
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-gold"></div>
                        <span className="text-gold text-xs tracking-[0.4em] uppercase font-serif">Journey</span>
                        <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-gold"></div>
                    </div>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">EDUCATION & <span className="text-gradient-gold">EXPERIENCE</span></h3>
                    <div className="w-32 h-1 bg-gradient-to-r from-gold to-transparent mx-auto mt-6"></div>
                </div>

                {/* Education Section */}
                <div className="relative z-10">
                    <div className="text-center mb-16 reveal">
                        <h4 className="text-2xl md:text-3xl font-serif text-white mb-4">
                            <span className="text-gold">01.</span> EDUCATION PATH
                        </h4>
                        <div className="inline-block px-6 py-2 border border-gold/30 bg-[#0a0a0a] rounded-full">
                            <span className="text-gold text-sm tracking-wider">Academic Journey</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {educationData.map((edu, idx) => (
                            <div key={idx} className="reveal" style={{ transitionDelay: `${idx * 200 + 600}ms` }}>
                                <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-gold/20 p-4 md:p-8 rounded-xl hover:border-gold/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(198,166,101,0.15)] hover:shadow-[0_0_60px_rgba(198,166,101,0.1)] group relative overflow-hidden">
                                    {/* Card Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 w-20 h-20 border border-gold rotate-45"></div>
                                    </div>

                                    <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6">
                                        {/* Icon */}
                                        <div className="flex-shrink-0 flex justify-center md:justify-start">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#050505] border-2 border-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <i className="fas fa-graduation-cap text-gold text-lg md:text-xl"></i>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            {/* Period Badge */}
                                            <div className="inline-flex items-center gap-2 mb-4">
                                                <span className="text-gold text-xs font-bold tracking-widest uppercase border border-gold/30 px-3 py-1 bg-[#050505]">{edu.period}</span>
                                                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                                            </div>

                                            {/* Degree and Institution */}
                                            <h5 className="text-white font-bold text-lg md:text-xl font-serif mb-2 group-hover:text-gold transition-colors">{edu.degree}</h5>
                                            <h6 className="text-gold/80 text-xs md:text-sm uppercase tracking-wider mb-3 font-light">{edu.institution}</h6>
                                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">{edu.desc}</p>

                                            {/* Location Badge */}
                                            <div className="flex items-center gap-2 mt-4">
                                                <i className="fas fa-map-marker-alt text-gold/60 text-xs"></i>
                                                <span className="text-xs text-gold/60">
                                                    {edu.desc.includes('Pekanbaru') ? 'Pekanbaru, Riau' : 'Online'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Section */}
                <div className="relative z-10 mb-20">
                    <div className="text-center mb-16 reveal">
                        <h4 className="text-2xl md:text-3xl font-serif text-white mb-4">
                            <span className="text-gold">02.</span> EXPERIENCE PATH
                        </h4>
                        <div className="inline-block px-6 py-2 border border-gold/30 bg-[#0a0a0a] rounded-full">
                            <span className="text-gold text-sm tracking-wider">Professional Journey</span>
                        </div>
                    </div>

                    <div className="space-y-8">
                        {experienceData.map((exp, idx) => (
                            <div key={exp.id} className="reveal" style={{ transitionDelay: `${idx * 200}ms` }}>
                                <div className="bg-[#0a0a0a]/90 backdrop-blur-sm border border-gold/20 p-4 md:p-8 rounded-xl hover:border-gold/50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(198,166,101,0.15)] hover:shadow-[0_0_60px_rgba(198,166,101,0.1)] group relative overflow-hidden">
                                    {/* Card Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 w-20 h-20 border border-gold rotate-45"></div>
                                    </div>

                                    <div className="relative z-10 flex flex-col md:flex-row gap-4 md:gap-6">
                                        {/* Icon */}
                                        <div className="flex-shrink-0 flex justify-center md:justify-start">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-[#050505] border-2 border-gold rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <i className="fas fa-building text-gold text-lg md:text-xl"></i>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-grow">
                                            {/* Period Badge */}
                                            <div className="inline-flex items-center gap-2 mb-4">
                                                <span className="text-gold text-xs font-bold tracking-widest uppercase border border-gold/30 px-3 py-1 bg-[#050505]">{exp.period}</span>
                                                <div className="w-8 h-px bg-gradient-to-r from-gold to-transparent"></div>
                                            </div>

                                            {/* Role and Company */}
                                            <h5 className="text-white font-bold text-lg md:text-xl font-serif mb-2 group-hover:text-gold transition-colors">{exp.role}</h5>
                                            <h6 className="text-gold/80 text-xs md:text-sm uppercase tracking-wider mb-3 font-light">{exp.company}</h6>
                                            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light">{exp.desc}</p>

                                            {/* Company Type Badge */}
                                            <div className="flex items-center gap-2 mt-4">
                                                <span className="text-xs px-2 py-1 border border-gold/30 text-gold/60 rounded">
                                                    {exp.company.includes('Universitas') ? 'Education' :
                                                        exp.company.includes('Koni') ? 'Government' :
                                                            exp.company.includes('Dinas') ? 'Government' :
                                                                exp.company.includes('Youtube') ? 'Content' : 'Company'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom decorative separator */}
                <div className="flex items-center justify-center gap-8 mt-20 opacity-60">
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent to-gold/50"></div>
                    <div className="w-4 h-4 border border-gold/50 rotate-45"></div>
                    <div className="w-24 h-[1px] bg-gradient-to-l from-transparent to-gold/50"></div>
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
                        <h3 className="text-4xl font-serif text-white mb-2">What I Do</h3>
                        <div className="w-16 h-1 bg-gold mx-auto mt-4 mb-8"></div>
                        <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            At present time I'm working on a multi-role, as a Web Developer I design and create various websites.
                            And as UI/UX Designer I create many designs for Web Applications and Mobile applications.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-20">
                            {SERVICES_DATA.map((service, index) => (
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
                        <div id="profile" className="flex flex-col items-center gap-8 md:gap-12 mb-20 text-center">
                            <div className="w-full max-w-[180px] md:max-w-[220px] lg:max-w-[260px] relative reveal">
                                <div className="relative z-10 border border-gold/30 p-2 group mx-auto">
                                    <div className="cartoon-image">
                                        <img
                                            src="/assets/img/surya.png"
                                            className="w-full h-auto max-h-28 md:max-h-36 lg:max-h-44 object-cover rounded-lg grayscale transition-all duration-700"
                                            alt="Profile"
                                        />
                                    </div>
                                </div>
                                <div className="absolute top-2 md:top-4 left-2 md:left-4 w-full h-full border border-gray-800 -z-0 rounded-lg"></div>
                            </div>

                            <div className="w-full max-w-2xl reveal" style={{ transitionDelay: '200ms' }}>
                                <h3 className="text-2xl md:text-3xl lg:text-4xl text-white mb-2 font-heading">Hello! My Name's Surya Aditya</h3>
                                <h4 className="text-gold text-xs md:text-sm tracking-[0.2em] uppercase mb-4 md:mb-6">also known as Sadit Aditya</h4>

                                <p className="text-gray-400 leading-relaxed text-sm md:text-base font-light mb-6 md:mb-8 px-4 md:px-0">
                                    I am a Frontend Developer or Web Developer From Pekanbaru, Riau, Indonesia. I enjoy
                                    building everything from small business sites to rich interactive web apps. if you are a
                                    business seeking a web presence or an employer looking to hire, you can get in touch with me
                                    <a className="text-gold underline ml-2" href="https://wa.me/6289643119126">here.</a>
                                    I design and build digital products with simple and beautiful code. I specialize in custom
                                    web theme development and love what I do.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
                                    <a href="/assets/cv/Surya Aditya GD CV Update 2024.pdf" target="_blank" className="btn-gothic-outline text-center w-full sm:w-auto">
                                        See My CV
                                    </a>
                                    <a href="https://wa.me/6289643119126" className="btn-gothic-fill text-center w-full sm:w-auto">
                                        Hire Me
                                    </a>
                                    <a href="/assets/cv/Portfolio Surya Aditya GD.pdf" target="_blank" className="btn-gothic-outline text-center w-full sm:w-auto">
                                        Short Portfolio
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="text-center mb-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                <StatCard
                                    icon="fas fa-pencil-alt"
                                    number="0007"
                                    description="Web Design Completed For Mini Project"
                                    delay="100"
                                />
                                <StatCard
                                    icon="fas fa-crop-alt"
                                    number="0040"
                                    description="Graphic Design"
                                    delay="200"
                                />
                                <StatCard
                                    icon="fas fa-bolt"
                                    number="0004"
                                    description="Website Created"
                                    delay="300"
                                />
                                <StatCard
                                    icon="fas fa-coffee"
                                    number="0025"
                                    description="Cups Coffee Taken"
                                    delay="400"
                                />
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
                            <span className="text-gold text-xs tracking-[0.4em] uppercase">Contact</span>
                            <div className="h-[1px] w-10 bg-gold/50"></div>
                        </div>
                        <h3 className="text-3xl md:text-4xl text-white mb-4">Get In Touch</h3>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
                            Feel free to reach out to me through any of the channels below.
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
