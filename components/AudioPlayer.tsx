
import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Berusaha memutar musik segera setelah user mengklik "Buka Undangan"
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          audioRef.current.volume = 0.4;
          // Memulai pemutaran
          await audioRef.current.play();
          setIsPlaying(true);
          setError(null);
        } catch (err) {
          console.error("Autoplay dicegah:", err);
          // Jika gagal autoplay, tampilkan pesan agar user klik manual
          setError("Klik untuk musik");
          setIsPlaying(false);
        }
      }
    };

    // Delay sangat singkat untuk memastikan transisi selesai
    const timer = setTimeout(playAudio, 300);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setError(null);
          })
          .catch(err => {
            console.error("Gagal memutar:", err);
            setError("Gagal memuat audio");
          });
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Pesan bantuan jika autoplay gagal */}
      {error && !isPlaying && (
        <span className="bg-black/60 text-white text-[10px] px-2 py-1 rounded-md backdrop-blur-sm animate-pulse whitespace-nowrap">
          {error}
        </span>
      )}
      
      <audio ref={audioRef} loop preload="auto">
        <source src="https://cdn.pixabay.com/audio/2022/08/31/audio_1070857502.mp3" type="audio/mpeg" />
        Browser Anda tidak mendukung elemen audio.
      </audio>

      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform hover:scale-110 ${
          isPlaying ? 'bg-[#a68b5a] text-white animate-pulse' : 'bg-white text-[#a68b5a] border border-[#a68b5a]'
        }`}
        aria-label={isPlaying ? "Pause Music" : "Play Music"}
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} className={!isPlaying ? "animate-bounce" : ""} />}
      </button>
    </div>
  );
};

export default AudioPlayer;
