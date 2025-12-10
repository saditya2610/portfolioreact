import React, { useState, useRef, useEffect } from 'react';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            sender: 'bot',
            text: 'Hi! How are you today? I\'m your AI assistant for Sadit Aditya\'s portfolio. I\'m here to help you learn about his skills, projects, and experience. What would you like to know?',
            id: Date.now()
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [languageMode, setLanguageMode] = useState('auto'); // auto, en, id_formal, id_gaul
    const messagesEndRef = useRef(null);

    // Suggested questions based on language mode
    const questionSuggestions = {
        en: [
            "What are Sadit's skills?",
            "Tell me about his projects",
            "Show me SISPOL project",
            "How to contact him?"
        ],
        id_formal: [
            "Apa keahlian Sadit?",
            "Ceritakan tentang proyeknya",
            "Tunjukkan proyek SISPOL",
            "Bagaimana cara menghubunginya?"
        ],
        id_gaul: [
            "Skill Sadit apa aja sih?",
            "Project kerennya apa nih?",
            "Bahas dong proyek SISPOL",
            "Gimana cara kontak dia?"
        ]
    };

    // Detect language from input
    const detectLanguage = (text) => {
        const indonesianWords = ['apa', 'bagaimana', 'siapa', 'tolong', 'terima', 'kasih', 'dong', 'nih', 'sih', 'aja'];
        const textLower = text.toLowerCase();

        // Check for Indonesian words
        const hasIndonesian = indonesianWords.some(word => textLower.includes(word));

        // Check for formal vs casual Indonesian
        if (hasIndonesian) {
            const casualIndoWords = ['gue', 'lu', 'elo', 'nih', 'sih', 'dong', 'aja', 'gak', 'kagak'];
            const isCasual = casualIndoWords.some(word => textLower.includes(word));
            return isCasual ? 'id_gaul' : 'id_formal';
        }

        return 'en';
    };

    // Format bot response with personality
    const formatResponse = (text, language) => {
        const greetings = {
            en: ["Hey there! ", "Great question! ", "Awesome! ", "Cool! "],
            id_formal: ["Baik! ", "Pertanyaan yang bagus! ", "Saya akan jelaskan. ", "Berikut informasinya: "],
            id_gaul: ["Wah nanya nih! ", "Keren nih pertanyaannya! ", "Nih gue kasih tau ya! ", "Check this out! "]
        };

        const closings = {
            en: [" Anything else I can help with? 😊", " Need more details?", " What else would you like to know? ✨"],
            id_formal: [" Apakah ada yang lain yang bisa saya bantu? 😊", " Perlu detail lebih lanjut?", " Ada pertanyaan lain?"],
            id_gaul: [" Mau tanya apa lagi nih? 😊", " Ada yang pengen ditanyain lagi?", " Gue bisa bantu yang lain! ✨"]
        };

        const lang = language || languageMode;
        const greeting = greetings[lang] ? greetings[lang][Math.floor(Math.random() * greetings[lang].length)] : '';
        const closing = closings[lang] ? closings[lang][Math.floor(Math.random() * closings[lang].length)] : '';

        // Add emojis based on content
        let emoji = '';
        if (text.toLowerCase().includes('skill') || text.toLowerCase().includes('keahlian')) {
            emoji = ' 💻';
        } else if (text.toLowerCase().includes('project') || text.toLowerCase().includes('proyek')) {
            emoji = ' 🚀';
        } else if (text.toLowerCase().includes('contact') || text.toLowerCase().includes('kontak')) {
            emoji = ' 📱';
        } else if (text.toLowerCase().includes('experience') || text.toLowerCase().includes('pengalaman')) {
            emoji = ' 👨‍💼';
        }

        return `${greeting}${text}${emoji}${closing}`;
    };

    // Update suggested questions based on conversation
    const updateSuggestions = (lastMessage) => {
        const detectedLang = detectLanguage(lastMessage);
        let langKey = detectedLang;
        if (detectedLang === 'id_gaul' || detectedLang === 'id_formal') {
            langKey = 'id_formal'; // Use formal Indonesian for suggestions
        }

        setLanguageMode(detectedLang);
        setSuggestedQuestions(questionSuggestions[langKey] || questionSuggestions.en);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
        // Initialize with English suggestions
        setSuggestedQuestions(questionSuggestions.en);
    }, [messages]);

    // Quick reply handler
    const handleQuickReply = (question) => {
        setInput(question);
        setTimeout(() => {
            handleSend(true, question);
        }, 100);
    };

    // Typing animation effect
    useEffect(() => {
        if (isTyping) {
            const timer = setTimeout(() => {
                scrollToBottom();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [isTyping]);

    const handleSend = async (isQuickReply = false, quickQuestion = '') => {
        const userMessageText = isQuickReply ? quickQuestion : input;
        if (!userMessageText.trim()) return;

        // Detect language from user input
        const detectedLang = detectLanguage(userMessageText);
        setLanguageMode(detectedLang);

        const userMessage = {
            sender: 'user',
            text: userMessageText,
            id: Date.now(),
            language: detectedLang
        };
        setMessages(prev => [...prev, userMessage]);
        setChatHistory(prev => [...prev, userMessageText]);

        if (!isQuickReply) {
            setInput('');
        }

        setIsTyping(true);

        try {
            // Try DeepSeek API first
            const deepseekKey = process.env.REACT_APP_DEEPSEEK_API_KEY || 'YOUR_DEEPSEEK_API_KEY_HERE';

            // Prepare system prompt based on detected language
            const systemPrompt = {
                en: `You are a friendly, enthusiastic AI assistant for Sadit Aditya's portfolio. 
                Be conversational, use emojis occasionally 😊, and show personality! 
                Help users learn about Sadit's skills, projects, and experience. 
                Keep responses concise but engaging. Ask follow-up questions. 
                Important projects: SISPOL, Wordpress Blog, Toko Game, Kalkulator, Web Fakultas Teknik, 
                Univrab Mobile, SILABO, Web TI, Universitas Abdurrab, Laporan BUMDES. 
                When users ask about contact information, direct them to the portfolio's contact section with a link.
                Always provide specific details when asked about these.`,

                id_formal: `Anda adalah asisten AI yang ramah untuk portfolio Sadit Aditya. 
                Gunakan bahasa Indonesia yang formal namun tetap santai. 
                Bantu pengguna mengetahui tentang keahlian, proyek, dan pengalaman Sadit. 
                Gunakan emoji sesekali 😊 dan bersikaplah bersahabat. 
                Proyek penting: SISPOL, Wordpress Blog, Toko Game, Kalkulator, Web Fakultas Teknik, 
                Univrab Mobile, SILABO, Web TI, Universitas Abdurrab, Laporan BUMDES. 
                Ketika pengguna bertanya tentang kontak, arahkan mereka ke bagian kontak portfolio dengan tautan.
                Berikan detail spesifik ketika ditanya tentang proyek-proyek ini.`,

                id_gaul: `Lo adalah asisten AI Sadit Aditya yang santai dan friendly! 
                Pake bahasa Indonesia gaul yang natural kayak lagi chat sama temen. 
                Kasi tau tentang skill, project, dan pengalaman Sadit. 
                Pake emoji biar asik 😎✨, dan jangan kaku ya! 
                Project penting: SISPOL, Wordpress Blog, Toko Game, Kalkulator, Web Fakultas Teknik, 
                Univrab Mobile, SILABO, Web TI, Universitas Abdurrab, Laporan BUMDES. 
                Kalo ada yang nanya kontak, kasih tau mereka buat cek bagian kontak di portfolio pake link.
                Kasi detail kalo ditanya tentang project-project ini.`
            };

            const promptLang = detectedLang === 'id_gaul' || detectedLang === 'id_formal' ? detectedLang : 'en';

            if (deepseekKey !== 'YOUR_DEEPSEEK_API_KEY_HERE') {
                const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${deepseekKey}`
                    },
                    body: JSON.stringify({
                        model: 'deepseek-chat',
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt[promptLang]
                            },
                            ...messages.map(msg => ({
                                role: msg.sender === 'user' ? 'user' : 'assistant',
                                content: msg.text
                            })),
                            {
                                role: 'user',
                                content: userMessageText
                            }
                        ],
                        max_tokens: 250,
                        temperature: 0.9,
                        presence_penalty: 0.6,
                        frequency_penalty: 0.5
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    let botText = data.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.';
                    botText = formatResponse(botText, detectedLang);

                    const botResponse = {
                        sender: 'bot',
                        text: botText.trim(),
                        id: Date.now(),
                        language: detectedLang
                    };
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    updateSuggestions(userMessageText);
                    return;
                }
            }

            // Fallback to free API with language support
            const response = await fetch('https://api.affiliateplus.co/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt[promptLang]
                        },
                        ...messages.map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'assistant',
                            content: msg.text
                        })),
                        {
                            role: 'user',
                            content: userMessageText
                        }
                    ],
                    temperature: 0.9
                })
            });

            if (response.ok) {
                const data = await response.json();
                let botText = data.response || 'Sorry, I couldn\'t process that.';
                botText = formatResponse(botText, detectedLang);

                const botResponse = {
                    sender: 'bot',
                    text: botText.trim(),
                    id: Date.now(),
                    language: detectedLang
                };
                setMessages(prev => [...prev, botResponse]);
                setIsTyping(false);
                updateSuggestions(userMessageText);
                return;
            }

            throw new Error('All APIs failed');
        } catch (error) {
            console.error('Chatbot API Error:', error);

            // Enhanced fallback responses with personality
            const fallbackResponses = {
                // English responses
                'skills_en': `Sadit's got some serious skills! 🔥 He's rocking React JS (90%), HTML/CSS (97%), and UI/UX Design (92%). 
                Also pretty good with PHP/Laravel (80%) and MySQL (95%). Plus mobile dev and web design too! 
                Want me to dive deeper into any specific skill?`,

                'project_en': `Oh, you gotta see Sadit's projects! 🚀 There's SISPOL (cool polling system), 
                Univrab Mobile app, Faculty Website, and 7 other awesome projects. 
                <a href="/#projects" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                Wanna check them all out? 👀</a> Or I can tell you more about any specific one!`,

                'sispol_en': `SISPOL is seriously cool! 🤖 It's a polling system that helps Dishub Provinsi Riau 
                evaluate their partner companies. Makes the whole assessment process super smooth for transportation companies!<br><br>
                <a href="https://github.com/saditya2610/sispol" target="_blank" 
                style="color: #c6a665; text-decoration: none; font-weight: 500; background: rgba(198, 166, 101, 0.1); padding: 4px 8px; border-radius: 4px;">
                👨‍💻 Check the code on GitHub!</a>`,

                'contact_en': `Want to connect with Sadit? 📱 You can check out his contact info and social media profiles!<br><br>
                <a href="/#contact" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 Go to Contact Section</a><br>
                <a href="/#profile" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 View Full Profile</a><br><br>
                You'll find his LinkedIn, GitHub, Instagram, and other ways to get in touch!`,

                'experience_en': `Sadit currently works as an IT Programmer at Universitas Abdurrab and has experience as a Content Creator. He's also worked at KONI Provinsi Riau and did his internship at Dishub Provinsi Riau. Pretty diverse background!`,

                // Indonesian formal responses
                'skills_id_formal': `Sadit memiliki keahlian yang cukup lengkap! 💻 Dia sangat mahir dalam React JS (90%), 
                HTML/CSS (97%), dan UI/UX Design (92%). Juga berpengalaman dengan PHP/Laravel (80%) dan MySQL (95%). 
                Ditambah kemampuan mobile development dan web design. Apakah Anda ingin tahu lebih detail tentang keahlian tertentu?`,

                'project_id_formal': `Sadit telah mengerjakan beberapa proyek yang menarik! 🚀 Ada SISPOL (sistem polling), 
                aplikasi Univrab Mobile, Web Fakultas Teknik, dan 7 proyek lainnya. 
                <a href="/#projects" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                Ingin melihat semuanya? 👀</a> Atau saya bisa jelaskan lebih detail tentang proyek tertentu!`,

                'contact_id_formal': `Ingin menghubungi Sadit? 📱 Anda dapat melihat informasi kontak dan profil media sosialnya!<br><br>
                <a href="/#contact" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 Pergi ke Bagian Kontak</a><br>
                <a href="/#profile" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 Lihat Profil Lengkap</a><br><br>
                Anda akan menemukan LinkedIn, GitHub, Instagram, dan cara lain untuk menghubunginya!`,

                // Indonesian gaul responses
                'skills_id_gaul': `Wah, skill Sadit lengkap banget nih! 🔥 Dia jago React JS (90%), 
                HTML/CSS (97%), sama UI/UX Design (92%). Jago juga mainin PHP/Laravel (80%) sama MySQL (95%). 
                Plus bisa mobile development dan web design juga! Mau gue bahas lebih dalem skill yang mana nih?`,

                'project_id_gaul': `Project-project Sadit keren-keren nih! 🚀 Ada SISPOL (sistem polling yang keren), 
                aplikasi Univrab Mobile, Web Fakultas Teknik, dan 7 project lainnya. 
                <a href="/#projects" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                Mau liat semuanya? 👀</a> Atau gue ceritain lebih detail tentang yang mana nih?`,

                'contact_id_gaul': `Mau kontak Sadit? 📱 Lo bisa cek info kontak sama profil sosmed dia nih!<br><br>
                <a href="/#contact" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 Cek Bagian Kontak</a><br>
                <a href="/#profile" target="_blank" style="color: #c6a665; text-decoration: none; font-weight: 500;">
                👉 Liat Profil Lengkap</a><br><br>
                Lo bakal nemuin LinkedIn, GitHub, Instagram, sama cara lain buat hubungin dia!`
            };

            const lowerInput = userMessageText.toLowerCase();
            let responseKey = 'default';
            let responseLang = detectedLang;

            // Detect topic
            if (lowerInput.includes('skill') || lowerInput.includes('bisa') ||
                lowerInput.includes('keahlian') || lowerInput.includes('kemampuan')) {
                responseKey = 'skills';
            } else if (lowerInput.includes('project') || lowerInput.includes('portfolio') ||
                lowerInput.includes('proyek') || lowerInput.includes('karya')) {
                responseKey = 'project';
            } else if (lowerInput.includes('sispol')) {
                responseKey = 'sispol';
            } else if (lowerInput.includes('contact') || lowerInput.includes('hubungi') ||
                lowerInput.includes('kontak') || lowerInput.includes('menghubungi') ||
                lowerInput.includes('contact') || lowerInput.includes('reach')) {
                responseKey = 'contact';
            } else if (lowerInput.includes('experience') || lowerInput.includes('kerja') ||
                lowerInput.includes('pengalaman') || lowerInput.includes('kerja')) {
                responseKey = 'experience';
            }

            // Combine key with language
            const fullKey = `${responseKey}_${responseLang}`;
            let responseText = fallbackResponses[fullKey] ||
                fallbackResponses[`${responseKey}_en`] ||
                (responseLang.includes('id') ?
                    `Saya di sini untuk membantu! Kamu bisa tanya tentang skill Sadit, project-project kerennya, pengalaman kerja, atau cara hubungi dia. Mau tahu apa nih? 😊` :
                    `I'm here to help! You can ask about Sadit's skills, cool projects, work experience, or how to contact him. What would you like to know? 😊`);

            responseText = formatResponse(responseText, responseLang);

            const fallbackResponse = {
                sender: 'bot',
                text: responseText,
                id: Date.now(),
                language: responseLang
            };
            setMessages(prev => [...prev, fallbackResponse]);
            setIsTyping(false);
            updateSuggestions(userMessageText);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // Toggle language mode
    const toggleLanguageMode = () => {
        const modes = ['auto', 'en', 'id_formal', 'id_gaul'];
        const currentIndex = modes.indexOf(languageMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setLanguageMode(modes[nextIndex]);

        // Update suggestions based on new mode
        if (modes[nextIndex] === 'auto') {
            setSuggestedQuestions(questionSuggestions.en);
        } else if (modes[nextIndex] === 'en') {
            setSuggestedQuestions(questionSuggestions.en);
        } else if (modes[nextIndex] === 'id_formal') {
            setSuggestedQuestions(questionSuggestions.id_formal);
        } else {
            setSuggestedQuestions(questionSuggestions.id_gaul);
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`chatbot-toggle-btn ${isOpen ? 'open' : ''}`}
                aria-label="Toggle chat"
            >
                <span className="pulse-dot"></span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 10h.01M12 10h.01M16 10h.01"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chatbot-window">
                    {/* Header */}
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <span className="status-dot"></span>
                            <div className="title-content">
                                AI Assistant
                                <div className="subtitle">Ask me about Sadit's portfolio!</div>
                            </div>
                        </div>
                        <div className="header-controls">
                            <button
                                onClick={toggleLanguageMode}
                                className="language-btn"
                                title={`Language: ${languageMode}`}
                                aria-label="Change language"
                            >
                                {languageMode === 'en' ? '🌐 EN' :
                                    languageMode === 'id_formal' ? '🇮🇩 Formal' :
                                        languageMode === 'id_gaul' ? '🇮🇩 Gaul' : '🌍 Auto'}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="close-btn"
                                aria-label="Close chat"
                            >
                                ×
                            </button>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    <div className="message-time">
                                        {new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span>Typing...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Suggested Questions */}
                    {suggestedQuestions.length > 0 && !isTyping && (
                        <div className="suggested-questions">
                            <div className="suggestions-label">Quick questions:</div>
                            <div className="suggestions-grid">
                                {suggestedQuestions.map((question, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleQuickReply(question)}
                                        className="suggestion-btn"
                                    >
                                        {question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={languageMode.includes('id') ?
                                "Ketik pesan kamu di sini..." :
                                "Type your message here..."}
                            disabled={isTyping}
                        />
                        <div className="input-controls">
                            <button
                                onClick={() => setInput('')}
                                className="clear-btn"
                                disabled={!input.trim()}
                                aria-label="Clear input"
                            >
                                ✕
                            </button>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isTyping}
                                className="send-btn"
                                aria-label="Send message"
                            >
                                {isTyping ? (
                                    <div className="sending-dots">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotWidget;