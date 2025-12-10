import React, { useRef } from 'react';
import ParticleCanvas from '../component/ParticleCanvas';
import ScrollReveal from '../component/ScrollReveal';

const Projects = () => {
    const scrollRef = useRef(null);
    const isMouseDown = useRef(false);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);

    const projects = [
        {
            id: 1,
            title: "Sistem Polling (SISPOL)",
            category: "Web App",
            image: "/assets/img/blog/sispol.png",
            description: "Sistem polling untuk melakukan penilaian dari berbagai perusahaan yang bekerja sama dengan Dishub Provinsi Riau.",
            link: "https://github.com/saditya2610/sispol"
        },
        {
            id: 2,
            title: "Wordpress | Sadit Aditya",
            category: "CMS",
            image: "/assets/img/blog/saditadityawordpress.png",
            description: "Blog yang membahas seputar Sadit Aditya.",
            link: "https://saditaditya.wordpress.com/"
        },
        {
            id: 3,
            title: "Toko Game | HTML CSS Bootstrap",
            category: "E-Commerce",
            image: "/assets/img/blog/tokogame.png",
            description: "Toko game dengan harga dan produk yang murah, bersaing, dan terbaik untuk para gamer.",
            link: "https://saditya2610.github.io/tokogame.github.io/"
        },
        {
            id: 4,
            title: "Kalkulator Sederhana",
            category: "Web App",
            image: "/assets/img/blog/kalkulator.png",
            description: "Kalkulator sederhana menggunakan JavaScript berbasis HTML.",
            link: "https://saditya2610.github.io/kalkulator/"
        },
        {
            id: 5,
            title: "Web | Fakultas Teknik",
            category: "Web APP",
            image: "/assets/img/blog/Web_Fakul.png",
            description: "Web CMS Fakultas Teknik Universitas Abdurrab.",
            link: "https://fakultas-teknik.univrab.ac.id/"
        },
        {
            id: 6,
            title: "Univrab Mobile",
            category: "Mobile Dev",
            image: "/assets/img/blog/mobile.png",
            description: "Aplikasi absensi Universitas Abdurrab berbasis mobile.",
            link: "https://github.com/saditya2610/univrabmobile"
        },
        {
            id: 7,
            title: "SILABO Universitas Abdurrab",
            category: "Web App",
            image: "/assets/img/blog/silabo.png",
            description: "Sistem informasi SILABO Universitas Abdurrab untuk pengelolaan perkuliahan.",
            link: "https://silabo.univrab.ac.id/"
        },
        {
            id: 8,
            title: "Teknik Informatika | Univrab",
            category: "Web App",
            image: "/assets/img/blog/webti.jpeg",
            description: "Website resmi Program Studi Teknik Informatika Universitas Abdurrab.",
            link: "https://teknik-informatika.univrab.ac.id/"
        },
        {
            id: 9,
            title: "Universitas Abdurrab",
            category: "Web App",
            image: "/assets/img/blog/univrabweb.png",
            description: "Website resmi Universitas Abdurrab yang memuat informasi kampus, fakultas, dan berita terbaru.",
            link: "https://univrab.ac.id/"
        }
    ];

    return (
        <>
            <ParticleCanvas />

            {/* Header Section */}
            <section className="py-24 px-6 relative z-10">
                <div className="text-center mb-20 reveal">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                        <span className="text-gold text-xs tracking-[0.4em] uppercase">All Projects</span>
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-white drop-shadow-lg">
                        <span className="text-gradient-gold">Complete</span> Portfolio
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-base">
                        Explore my complete collection of projects, from mobile applications to web systems and creative designs.
                    </p>
                </div>
            </section>

            {/* Projects Grid - Horizontal Scroll */}
            <section className="pb-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto relative">
                    {/* Scroll Buttons (desktop only) */}
                    <button
                        type="button"
                        className="hidden md-flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black-80 border border-gold-50 text-gold w-10 h-10 hover:text-white transition-colors"
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                            }
                        }}
                    >
                        <span>{'<'}</span>
                    </button>

                    <button
                        type="button"
                        className="hidden md-flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black-80 border border-gold-50 text-gold w-10 h-10 hover:text-white transition-colors"
                        onClick={() => {
                            if (scrollRef.current) {
                                scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                            }
                        }}
                    >
                        <span>{'>'}</span>
                    </button>

                    <div
                        ref={scrollRef}
                        className="overflow-x-auto no-scrollbar cursor-grab"
                        onMouseDown={(e) => {
                            if (!scrollRef.current) return;

                            isMouseDown.current = true;
                            isDragging.current = false;
                            startX.current = e.pageX - scrollRef.current.offsetLeft;
                            scrollLeft.current = scrollRef.current.scrollLeft;
                        }}
                        onMouseLeave={() => {
                            isMouseDown.current = false;
                        }}
                        onMouseUp={() => {
                            isMouseDown.current = false;
                        }}
                        onMouseMove={(e) => {
                            if (!isMouseDown.current || !scrollRef.current) return;
                            const x = e.pageX - scrollRef.current.offsetLeft;
                            const diff = x - startX.current;

                            // Only consider as drag after small threshold to allow normal clicks
                            if (!isDragging.current && Math.abs(diff) < 5) {
                                return;
                            }

                            isDragging.current = true;
                            const walk = diff * 1.2;
                            scrollRef.current.scrollLeft = scrollLeft.current - walk;
                        }}
                    >
                        <div className="flex gap-4 pb-4" style={{ minWidth: 'max-content' }}>
                            {projects.map((project, index) => (
                                <article
                                    key={project.id}
                                    className="art-deco-card group cursor-pointer reveal flex-shrink-0 w-64"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                    onClick={(e) => {
                                        // Jika baru saja drag, jangan buka link
                                        if (isDragging.current) {
                                            e.preventDefault();
                                            return;
                                        }
                                        window.open(project.link, '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <div className="relative h-56 overflow-hidden border-b border-gold-20">
                                        <img
                                            src={project.image}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
                                            alt={project.title}
                                        />
                                        <div className="absolute top-4 left-4 bg-black-80 border border-gold-50 px-3 py-1 text-10px text-gold uppercase tracking-wider">
                                            {project.category}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-xl text-white mb-3 leading-snug group-hover:text-gold transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-6 line-clamp-3 font-light">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center text-gold text-xs tracking-widest uppercase font-bold group/link">
                                            <span className="flex items-center">
                                                Read More
                                                <span className="ml-2 transform transition-transform group-hover/link:translate-x-2">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ScrollReveal />
        </>
    );
};

export default Projects;
