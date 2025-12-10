import React, { createContext, useState, useRef, useEffect } from 'react';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.3);
    const audioRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        // Set initial volume
        if (audio) {
            audio.volume = volume;
        }

        // Auto-play attempt (browsers may block this)
        const handleUserInteraction = () => {
            if (audio && !isPlaying) {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log('Auto-play was prevented:', error);
                });
                // Remove listener after first interaction
                document.removeEventListener('click', handleUserInteraction);
                document.removeEventListener('keydown', handleUserInteraction);
            }
        };

        // Add event listeners for user interaction
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, [isPlaying, volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (audio) {
            if (isPlaying) {
                audio.pause();
                setIsPlaying(false);
            } else {
                audio.play().then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.log('Play failed:', error);
                });
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    return (
        <MusicContext.Provider value={{
            isPlaying,
            volume,
            togglePlay,
            handleVolumeChange,
            audioRef
        }}>
            {children}
        </MusicContext.Provider>
    );
};
