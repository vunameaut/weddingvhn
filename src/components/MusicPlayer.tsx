import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Wedding music URL
  const musicUrl = "https://res.cloudinary.com/dazo6ypwt/video/upload/v1788450987/50_N%C4%82M_V%E1%BB%80_SAU_-_TU%E1%BA%A4N_KI%E1%BB%86T_x_%C4%90%E1%BA%B6NG_THANH_TUY%E1%BB%80N_ANIMATION_MV_Nguy%E1%BB%87n_c%E1%BA%A7u_%C4%91%E1%BA%BFn_50_n%C4%83m_v%E1%BB%81_sau..._emxcyh.mp3";

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, [hasInteracted]);

  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const handlePauseMusic = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    window.addEventListener('pause-music', handlePauseMusic);
    return () => window.removeEventListener('pause-music', handlePauseMusic);
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Tab is hidden (switched to another tab or minimized)
        if (audioRef.current && !audioRef.current.paused) {
          wasPlayingRef.current = true;
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          wasPlayingRef.current = false;
        }
      } else {
        // Tab is active again
        if (wasPlayingRef.current && audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch(console.error);
          wasPlayingRef.current = false;
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
      <button
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-wedding-pink text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label={isPlaying ? "Tắt nhạc" : "Bật nhạc"}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6 animate-pulse-soft" />
        ) : (
          <Music className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default MusicPlayer;

