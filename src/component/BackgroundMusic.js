import React, { useContext } from 'react';
import { MusicContext } from '../context/MusicContext';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
    const { isPlaying, volume, togglePlay, handleVolumeChange, audioRef } = useContext(MusicContext);

    return (
        <>
            <audio
                ref={audioRef}
                loop
                preload="auto"
            >
                <source src="/assets/song/Clair Obscur_ Expedition 33 - Lumière INSTRUMENTAL VERSION.mp4" type="audio/mp4" />
                Your browser does not support the audio element.
            </audio>

            {/* Music Control Button */}
            <div className="music-control">
                <button
                    onClick={togglePlay}
                    className={`music-btn ${isPlaying ? 'playing' : 'paused'}`}
                    aria-label={isPlaying ? 'Pause music' : 'Play music'}
                >
                    <div className="music-icon">
                        {isPlaying ? (
                            <i className="fas fa-pause"></i>
                        ) : (
                            <i className="fas fa-music"></i>
                        )}
                    </div>
                    <div className="music-waves">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Volume Control */}
                <div className="volume-control">
                    <i className="fas fa-volume-up volume-icon"></i>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="volume-slider"
                    />
                </div>
            </div>

            {/* Visual Music Indicator */}
            <div className={`music-indicator ${isPlaying ? 'active' : ''}`}>
                <div className="music-bars">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </>
    );
};

export default BackgroundMusic;
