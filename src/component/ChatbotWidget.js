import React, { useState, useRef, useEffect } from 'react';
import './ChatbotWidget.css';

const ChatbotWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! I\'m your AI assistant. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        try {
            // Try DeepSeek API first (cheaper and has free tier)
            const deepseekKey = process.env.REACT_APP_DEEPSEEK_API_KEY || 'YOUR_DEEPSEEK_API_KEY_HERE';

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
                                content: 'You are a helpful AI assistant for a portfolio website. Be friendly, professional, and concise. Help users learn about Sadit Aditya\'s skills (React, JavaScript, HTML/CSS, UI/UX Design, PHP, Laravel, MySQL), projects (SISPOL, Univrab Mobile, Web Fakultas Teknik), and experience as a programmer and content creator.'
                            },
                            ...messages.filter(msg => msg.sender !== 'bot').map(msg => ({
                                role: msg.sender === 'user' ? 'user' : 'assistant',
                                content: msg.text
                            })),
                            {
                                role: 'user',
                                content: input
                            }
                        ],
                        max_tokens: 150,
                        temperature: 0.7
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    const botText = data.choices[0]?.message?.content || 'Sorry, I couldn\'t process that.';

                    const botResponse = {
                        sender: 'bot',
                        text: botText.trim()
                    };
                    setMessages(prev => [...prev, botResponse]);
                    setIsTyping(false);
                    return;
                }
            }

            // Fallback to free API
            const response = await fetch('https://api.affiliateplus.co/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful AI assistant for a portfolio website. Be friendly, professional, and concise. Help users learn about Sadit Aditya\'s skills (React, JavaScript, HTML/CSS, UI/UX Design, PHP, Laravel, MySQL), projects (SISPOL, Univrab Mobile, Web Fakultas Teknik), and experience as a programmer and content creator.'
                        },
                        ...messages.filter(msg => msg.sender !== 'bot').map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'assistant',
                            content: msg.text
                        })),
                        {
                            role: 'user',
                            content: input
                        }
                    ]
                })
            });

            if (response.ok) {
                const data = await response.json();
                const botText = data.response || 'Sorry, I couldn\'t process that.';

                const botResponse = {
                    sender: 'bot',
                    text: botText.trim()
                };
                setMessages(prev => [...prev, botResponse]);
                return;
            }

            throw new Error('All APIs failed');
        } catch (error) {
            console.error('Chatbot API Error:', error);

            // Fallback responses about portfolio
            const fallbackResponses = {
                'skills': 'Sadit has expertise in React JS (90%), HTML/CSS (97%), UI/UX Design (92%), PHP/Laravel (80%), and MySQL (95%). He\'s also skilled in mobile development and web design.',
                'project': 'Sadit has worked on several projects including SISPOL (Sistem Polling), Univrab Mobile app, and Web Fakultas Teknik. <a href="/#projects" target="_blank" style="color: #c6a665;">Click here to view all projects</a>',
                'experience': 'Sadit works as an IT Programmer at Universitas Abdurrab and has experience as a Content Creator. He worked at KONI Provinsi Riau and did internship at Dishub Provinsi Riau.',
                'contact': 'You can contact Sadit through:\n• LinkedIn: <a href="https://www.linkedin.com/in/surya-aditya-gd-33306821b/" target="_blank" style="color: #c6a665;">linkedin.com/in/surya-aditya-gd</a>\n• GitHub: <a href="https://github.com/saditya2610" target="_blank" style="color: #c6a665;">github.com/saditya2610</a>\n• Instagram: <a href="https://www.instagram.com/dirgantaras/" target="_blank" style="color: #c6a665;">instagram.com/dirgantaras</a>',
                'default': 'I\'m here to help you learn about Sadit Aditya\'s portfolio! You can ask about his skills, projects, experience, or how to contact him.',

                // Indonesian responses
                'skills_id': 'Sadit memiliki keahlian dalam React JS (90%), HTML/CSS (97%), UI/UX Design (92%), PHP/Laravel (80%), dan MySQL (95%). Dia juga ahli dalam mobile development dan web design.',
                'project_id': 'Sadit telah mengerjakan beberapa proyek termasuk SISPOL (Sistem Polling), aplikasi Univrab Mobile, dan Web Fakultas Teknik. <a href="/#projects" target="_blank" style="color: #c6a665;">Klik di sini untuk lihat semua proyek</a>',
                'experience_id': 'Sadit bekerja sebagai IT Programmer di Universitas Abdurrab dan memiliki pengalaman sebagai Content Creator. Dia bekerja di KONI Provinsi Riau dan magang di Dishub Provinsi Riau.',
                'contact_id': 'Kamu bisa menghubungi Sadit melalui:\n• LinkedIn: <a href="https://www.linkedin.com/in/surya-aditya-gd-33306821b/" target="_blank" style="color: #c6a665;">linkedin.com/in/surya-aditya-gd</a>\n• GitHub: <a href="https://github.com/saditya2610" target="_blank" style="color: #c6a665;">github.com/saditya2610</a>\n• Instagram: <a href="https://www.instagram.com/dirgantaras/" target="_blank" style="color: #c6a665;">instagram.com/dirgantaras</a>',
                'default_id': 'Saya di sini untuk membantu kamu belajar tentang portfolio Sadit Aditya! Kamu bisa tanya tentang skill, proyek, pengalaman, atau cara menghubunginya.'
            };

            const lowerInput = input.toLowerCase();
            let responseText = fallbackResponses.default;
            let isIndonesian = false;

            // Check if input is in Indonesian first
            if (lowerInput.includes('apa') || lowerInput.includes('bagaimana') ||
                lowerInput.includes('siapa') || lowerInput.includes('kamu') ||
                lowerInput.includes('saya') || lowerInput.includes('tolong') ||
                lowerInput.includes('terima') || lowerInput.includes('kasih')) {
                isIndonesian = true;
            }

            // Detect Indonesian keywords
            if (lowerInput.includes('skill') || lowerInput.includes('bisa') ||
                lowerInput.includes('keahlian') || lowerInput.includes('kemampuan')) {
                responseText = isIndonesian ? fallbackResponses.skills_id : fallbackResponses.skills;
            } else if (lowerInput.includes('project') || lowerInput.includes('portfolio') ||
                lowerInput.includes('proyek') || lowerInput.includes('karya')) {
                responseText = isIndonesian ? fallbackResponses.project_id : fallbackResponses.project;
            } else if (lowerInput.includes('experience') || lowerInput.includes('kerja') ||
                lowerInput.includes('pengalaman')) {
                responseText = isIndonesian ? fallbackResponses.experience_id : fallbackResponses.experience;
            } else if (lowerInput.includes('contact') || lowerInput.includes('hubungi') ||
                lowerInput.includes('kontak') || lowerInput.includes('menghubungi')) {
                responseText = isIndonesian ? fallbackResponses.contact_id : fallbackResponses.contact;
            } else {
                // Use default response based on language
                responseText = isIndonesian ? fallbackResponses.default_id : fallbackResponses.default;
            }

            const fallbackResponse = {
                sender: 'bot',
                text: responseText
            };
            setMessages(prev => [...prev, fallbackResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
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
                            AI Assistant (Free)
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="close-btn"
                            aria-label="Close chat"
                        >
                            ×
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="chatbot-messages">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}`}>
                                <div className="message-bubble" dangerouslySetInnerHTML={{ __html: msg.text }} />
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            disabled={isTyping}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="send-btn"
                            aria-label="Send message"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatbotWidget;
