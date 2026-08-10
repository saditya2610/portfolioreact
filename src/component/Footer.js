import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
    const { t } = useLanguage();
    return (
        <footer className="bg-black pt-20 pb-10 border-t border-gray-900 relative">
            <div className="container mx-auto px-6 text-center">
                <div className="text-gold text-3xl font-bold font-heading mb-8 tracking-widest">
                    SADIT <span className="text-white">ADITYA</span>
                </div>

                <div className="flex justify-center gap-8 mb-12">
                    <a
                        href="https://github.com/saditya2610"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-all rotate-45 group"
                    >
                        <i className="fab fa-github -rotate-45 group-hover:text-gold"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/dirgantaras/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-all rotate-45 group"
                    >
                        <i className="fab fa-instagram -rotate-45 group-hover:text-gold"></i>
                    </a>
                    <a
                        href="https://www.linkedin.com/in/surya-aditya-gd-33306821b/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-all rotate-45 group"
                    >
                        <i className="fab fa-linkedin -rotate-45 group-hover:text-gold"></i>
                    </a>
                    <a
                        href="https://dribbble.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 border border-gray-700 flex items-center justify-center text-gray-500 hover:text-gold hover:border-gold transition-all rotate-45 group"
                    >
                        <i className="fab fa-dribbble -rotate-45 group-hover:text-gold"></i>
                    </a>
                </div>

                {/* ORCID iD */}
                <div className="flex justify-center mb-8">
                    <a
                        id="cy-effective-orcid-url-footer"
                        href="https://orcid.org/0009-0001-6148-4083"
                        target="orcid.widget"
                        rel="me noopener noreferrer"
                        className="inline-flex items-center gap-2 text-gray-500 hover:text-gold transition-colors text-xs tracking-wider"
                        style={{ verticalAlign: 'top' }}
                    >
                        <img
                            src="/assets/img/orcid_16x16.png"
                            style={{ width: '1em', marginInlineStart: '0.5em' }}
                            alt="ORCID iD icon"
                        />
                        https://orcid.org/0009-0001-6148-4083
                    </a>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-widest text-gray-600 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">{t('footer.privacy')}</Link>
                    <Link to="/" className="hover:text-white transition-colors">{t('footer.terms')}</Link>
                    <a href="/#contact" className="hover:text-white transition-colors">{t('footer.contact')}</a>
                </div>

                <p className="text-gray-700 text-[10px] uppercase tracking-wider">
                    © 2025 Surya Aditya GD. {t('footer.rights')}
                </p>
            </div>
        </footer>
    );
};

export default Footer;
