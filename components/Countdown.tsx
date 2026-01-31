
import React, { useState, useEffect } from 'react';
import { CountdownTime } from '../types';

const Countdown: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const Item: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center bg-white/40 border border-white/50 backdrop-blur-sm rounded-lg p-3 w-16 md:w-20 shadow-sm">
      <span className="text-xl md:text-2xl font-serif font-semibold text-[#a68b5a]">{value}</span>
      <span className="text-[10px] md:text-xs uppercase tracking-widest text-[#6b6b6b]">{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 justify-center py-6">
      <Item value={timeLeft.days} label="Hari" />
      <Item value={timeLeft.hours} label="Jam" />
      <Item value={timeLeft.minutes} label="Menit" />
      <Item value={timeLeft.seconds} label="Detik" />
    </div>
  );
};

export default Countdown;
