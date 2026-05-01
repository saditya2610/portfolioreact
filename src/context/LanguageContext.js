import React, { createContext, useState, useContext, useEffect } from 'react';
import { translations } from '../utils/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    // Check localStorage for saved language or default to 'id' (Indonesian)
    const [language, setLanguage] = useState(() => {
        const savedLang = localStorage.getItem('appLanguage');
        return savedLang || 'id';
    });

    // Save language to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('appLanguage', language);
    }, [language]);

    const toggleLanguage = () => {
        setLanguage((prevLang) => (prevLang === 'id' ? 'en' : 'id'));
    };

    // Helper function to get translation string by key (e.g. 'home.hero.title')
    const t = (key) => {
        const keys = key.split('.');
        let value = translations[language];
        for (const k of keys) {
            if (value && value[k]) {
                value = value[k];
            } else {
                return key; // return key itself if not found
            }
        }
        return value;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
