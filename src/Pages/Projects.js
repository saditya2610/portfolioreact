import React, { useState, useMemo, useEffect } from 'react';
import ParticleCanvas from '../component/ParticleCanvas';
import ScrollReveal from '../component/ScrollReveal';

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [revealKey, setRevealKey] = useState(0);

    const projects = useMemo(() => [
        {
            id: 1,
            title: "Game Dev Pekanbaru",
            category: "Web App",
            image: "/assets/img/blog/gamedev.jpeg",
            description: "Website komunitas Game Developer di Pekanbaru untuk berbagi informasi dan proyek game.",
            link: "https://gamedevpku.vercel.app/"
        },
        {
            id: 2,
            title: "Teknik Informatika | UIN Suska Riau",
            category: "Web App",
            image: "/assets/img/blog/webtif.png",
            description: "Website resmi Program Studi Teknik Informatika UIN Sultan Syarif Kasim Riau.",
            link: "https://tif.uin-suska.ac.id/"
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
            title: "Sistem Polling (SISPOL)",
            category: "Web App",
            image: "/assets/img/blog/sispol.png",
            description: "Sistem polling untuk melakukan penilaian dari berbagai perusahaan yang bekerja sama dengan Dishub Provinsi Riau.",
            link: "https://github.com/saditya2610/sispol"
        },
        {
            id: 5,
            title: "Visitlab Univrab",
            category: "Web App",
            image: "/assets/img/blog/visitlab.png",
            description: "Website laboratorium kunjungan Universitas Abdurrab untuk mengelola jadwal dan informasi kunjungan lab.",
            link: "https://visitlab.univrab.ac.id/"
        },
        {
            id: 6,
            title: "SILABO Universitas Abdurrab",
            category: "Web App",
            image: "/assets/img/blog/silabo.png",
            description: "Sistem informasi SILABO Universitas Abdurrab untuk pengelolaan perkuliahan.",
            link: "https://silabo.univrab.ac.id/"
        },
        {
            id: 7,
            title: "Laporan BUMDES",
            category: "Web App",
            image: "/assets/img/blog/bumdeslaporan.png",
            description: "Sistem pelaporan keuangan untuk Badan Usaha Milik Desa (BUMDES) yang membantu mengelola dan memantau laporan keuangan desa.",
            link: "#"
        },
        {
            id: 8,
            title: "Universitas Abdurrab",
            category: "Web App",
            image: "/assets/img/blog/univrabweb.png",
            description: "Website resmi Universitas Abdurrab yang memuat informasi kampus, fakultas, dan berita terbaru.",
            link: "https://univrab.ac.id/"
        },
        {
            id: 9,
            title: "Teknik Informatika | Univrab",
            category: "Web App",
            image: "/assets/img/blog/webti.jpeg",
            description: "Website resmi Program Studi Teknik Informatika Universitas Abdurrab.",
            link: "https://teknik-informatika.univrab.ac.id/"
        },
        {
            id: 10,
            title: "Web | Fakultas Teknik",
            category: "Web App",
            image: "/assets/img/blog/Web_Fakul.png",
            description: "Web CMS Fakultas Teknik Universitas Abdurrab.",
            link: "https://fakultas-teknik.univrab.ac.id/"
        },
        {
            id: 11,
            title: "Univrab Mobile",
            category: "Mobile Dev",
            image: "/assets/img/blog/mobile.png",
            description: "Aplikasi absensi Universitas Abdurrab berbasis mobile.",
            link: "https://github.com/saditya2610/univrabmobile"
        },
        {
            id: 12,
            title: "Kalkulator Sederhana",
            category: "Web App",
            image: "/assets/img/blog/kalkulator.png",
            description: "Kalkulator sederhana menggunakan JavaScript berbasis HTML.",
            link: "https://saditya2610.github.io/kalkulator/"
        },
        {
            id: 13,
            title: "Wordpress | Sadit Aditya",
            category: "CMS",
            image: "/assets/img/blog/saditadityawordpress.png",
            description: "Blog yang membahas seputar Sadit Aditya.",
            link: "https://saditaditya.wordpress.com/"
        },
    ], []);

    // Get unique categories and normalize them
    const categories = useMemo(() => {
        const cats = projects.map(p => p.category);
        return ['All', ...Array.from(new Set(cats))];
    }, [projects]);

    // Combined filtering logic
    const filtered = useMemo(() => {
        return projects.filter(project => {
            const matchesCategory = filter === 'All' || project.category === filter;
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 project.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [filter, searchTerm, projects]);

    // Re-trigger ScrollReveal when the list changes
    useEffect(() => {
        setRevealKey(prev => prev + 1);
    }, [filter, searchTerm]);

    return (
        <>
            <ParticleCanvas />

            {/* Header Section */}
            <section className="py-20 px-6 relative z-10">
                <div className="text-center mb-12 reveal">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                        <span className="text-gold text-xs tracking-[0.4em] uppercase">All Projects</span>
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-white drop-shadow-lg">
                        <span className="text-gradient-gold">Complete</span> Portfolio
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-base">
                        Search and filter through my project collection.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 reveal">
                    {/* Search Bar */}
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search projects by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-black/60 border border-gold/30 p-4 pl-12 text-gold text-sm focus:outline-none focus:border-gold transition-all duration-300 backdrop-blur-md placeholder:text-gold/40"
                            style={{ caretColor: 'var(--color-gold)' }}
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50 group-focus-within:text-gold transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        </div>
                        {searchTerm && (
                            <button 
                                onClick={() => setSearchTerm('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gold/50 hover:text-gold transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        )}
                    </div>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2 text-[10px] tracking-widest uppercase border transition-all duration-300 ${
                                    filter === cat
                                        ? 'bg-gold text-black border-gold font-bold scale-105'
                                        : 'bg-transparent text-gold border-gold/40 hover:border-gold hover:text-white'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {filtered.length > 0 ? (
                        <div
                            className="grid gap-6"
                            style={{
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))'
                            }}
                        >
                            {filtered.map((project, index) => (
                                <article
                                    key={`${project.id}-${revealKey}`}
                                    className="art-deco-card group cursor-pointer reveal"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                    onClick={() => {
                                        if (project.link !== '#') {
                                            window.open(project.link, '_blank', 'noopener,noreferrer');
                                        }
                                    }}
                                >
                                    <div className="relative h-48 overflow-hidden border-b border-gold-20">
                                        <img
                                            src={project.image}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-50 group-hover:grayscale-0"
                                            alt={project.title}
                                            loading="lazy"
                                        />
                                        <div className="absolute top-3 left-3 bg-black/80 border border-gold/50 px-3 py-1 text-[10px] text-gold uppercase tracking-wider">
                                            {project.category}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-base text-white mb-2 leading-snug group-hover:text-gold transition-colors font-semibold">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 font-light">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center text-gold text-xs tracking-widest uppercase font-bold group/link">
                                            <span className="flex items-center">
                                                {project.link === '#' ? 'Locked' : 'View Project'}
                                                <span className="ml-2 transform transition-transform group-hover/link:translate-x-2">→</span>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 reveal">
                            <div className="mb-4 inline-block p-4 rounded-full border border-gold/20">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            <h3 className="text-xl text-white mb-2">No projects found</h3>
                            <p className="text-gray-500">Try adjusting your search term or filter category.</p>
                            <button 
                                onClick={() => {setSearchTerm(''); setFilter('All');}}
                                className="mt-6 text-gold text-xs tracking-widest uppercase border border-gold/40 px-6 py-2 hover:bg-gold hover:text-black transition-all"
                            >
                                Reset Filters
                            </button>
                        </div>
                    )}

                    {/* Total Count */}
                    <p className="text-center text-gray-600 text-[10px] tracking-widest uppercase mt-12 reveal">
                        Showing {filtered.length} of {projects.length} projects
                    </p>
                </div>
            </section>

            <ScrollReveal key={revealKey} />
        </>
    );
};

export default Projects;
