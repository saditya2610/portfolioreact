import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ParticleCanvas from '../component/ParticleCanvas';
import ScrollReveal from '../component/ScrollReveal';

const Projects = () => {
    const { t, language } = useLanguage();
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [revealKey, setRevealKey] = useState(0);

    const projects = useMemo(() => [
        {
            id: 1,
            title: t('projects.p1_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/gamedev.jpeg",
            description: t('projects.p1_desc'),
            link: "https://gamedevpku.vercel.app/"
        },
        {
            id: 2,
            title: t('projects.p2_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/webtif.png",
            description: t('projects.p2_desc'),
            link: "https://tif.uin-suska.ac.id/"
        },
        {
            id: 3,
            title: t('projects.p3_title'),
            category: t('projects.categories.ecommerce'),
            image: "/assets/img/blog/tokogame.png",
            description: t('projects.p3_desc'),
            link: "https://saditya2610.github.io/tokogame.github.io/"
        },
        {
            id: 4,
            title: t('projects.p4_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/sispol.png",
            description: t('projects.p4_desc'),
            link: "https://github.com/saditya2610/sispol"
        },
        {
            id: 5,
            title: t('projects.p5_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/visitlab.png",
            description: t('projects.p5_desc'),
            link: "https://visitlab.univrab.ac.id/"
        },
        {
            id: 6,
            title: t('projects.p6_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/silabo.png",
            description: t('projects.p6_desc'),
            link: "https://silabo.univrab.ac.id/"
        },
        {
            id: 7,
            title: t('projects.p7_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/bumdeslaporan.png",
            description: t('projects.p7_desc'),
            link: "#"
        },
        {
            id: 8,
            title: t('projects.p8_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/univrabweb.png",
            description: t('projects.p8_desc'),
            link: "https://univrab.ac.id/"
        },
        {
            id: 9,
            title: t('projects.p9_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/webti.jpeg",
            description: t('projects.p9_desc'),
            link: "https://teknik-informatika.univrab.ac.id/"
        },
        {
            id: 10,
            title: t('projects.p10_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/Web_Fakul.png",
            description: t('projects.p10_desc'),
            link: "https://fakultas-teknik.univrab.ac.id/"
        },
        {
            id: 11,
            title: t('projects.p11_title'),
            category: t('projects.categories.mobileDev'),
            image: "/assets/img/blog/mobile.png",
            description: t('projects.p11_desc'),
            link: "https://github.com/saditya2610/univrabmobile"
        },
        {
            id: 12,
            title: t('projects.p12_title'),
            category: t('projects.categories.webApp'),
            image: "/assets/img/blog/kalkulator.png",
            description: t('projects.p12_desc'),
            link: "https://saditya2610.github.io/kalkulator/"
        },
        {
            id: 13,
            title: t('projects.p13_title'),
            category: t('projects.categories.cms'),
            image: "/assets/img/blog/saditadityawordpress.png",
            description: t('projects.p13_desc'),
            link: "https://saditaditya.wordpress.com/"
        },
    ], [t]);

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
                        <span className="text-gold text-xs tracking-[0.4em] uppercase">{t('projects.tag')}</span>
                        <div className="h-[1px] w-10 bg-gold/50"></div>
                    </div>
                    <h2 className="text-3xl md:text-5xl text-white drop-shadow-lg">
                        <span className="text-gradient-gold">{t('projects.title1')}</span> {t('projects.title2')}
                    </h2>
                    <p className="mt-4 max-w-2xl mx-auto text-gray-400 text-sm md:text-base">
                        {t('projects.desc')}
                    </p>
                </div>

                <div className="max-w-4xl mx-auto space-y-8 reveal">
                    {/* Search and Filter Container */}
                    <div className="projects-search-wrapper">
                        {/* Search Bar */}
                        <div className="search-input-container">
                            {/* Glowing background effect */}
                            <div className="search-input-glow"></div>
                            <input
                                type="text"
                                placeholder={t('projects.search')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input-field"
                            />
                            <div className="search-icon-left">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                            </div>
                            {searchTerm && (
                                <button 
                                    onClick={() => setSearchTerm('')}
                                    className="search-clear-btn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            )}
                        </div>

                        {/* Filter Tabs */}
                        <div className="filter-tabs-wrapper">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setFilter(cat)}
                                    className={`filter-tab-btn ${filter === cat ? 'active' : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
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
                                                {project.link === '#' ? t('projects.locked') : t('projects.viewProject')}
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
                            <h3 className="text-xl text-white mb-2">{t('projects.noProjects')}</h3>
                            <p className="text-gray-500">{t('projects.noProjectsDesc')}</p>
                            <button 
                                onClick={() => {setSearchTerm(''); setFilter('All');}}
                                className="mt-6 text-gold text-xs tracking-widest uppercase border border-gold/40 px-6 py-2 hover:bg-gold hover:text-black transition-all"
                            >
                                {t('projects.reset')}
                            </button>
                        </div>
                    )}

                    {/* Total Count */}
                    <p className="text-center text-gray-600 text-[10px] tracking-widest uppercase mt-12 reveal">
                        {t('projects.showing').replace('{count}', filtered.length).replace('{total}', projects.length)}
                    </p>
                </div>
            </section>

            <ScrollReveal key={revealKey} />
        </>
    );
};

export default Projects;
