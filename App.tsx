
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Users, Send, MessageCircle, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './components/Countdown';
import AudioPlayer from './components/AudioPlayer';

const WEDDING_DATE = "2026-03-24T08:00:00";
const BRIDE_NAME = "Rizki Rahma Kurnia, A.Md Ftr";
const GROOM_NAME = "Hinka S.s";
const MAPS_URL = "https://maps.app.goo.gl/FkoSv91khJDpf3ww8";

const INITIAL_WISHES: any[] = [];

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '', status: 'Hadir' as 'Hadir' | 'Tidak Hadir' });
  const [wishes, setWishes] = useState<any[]>(INITIAL_WISHES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setWishes(INITIAL_WISHES);
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.message) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const wishToAdd = { ...newWish };
      setWishes([wishToAdd, ...wishes]);
      setNewWish({ name: '', message: '', status: 'Hadir' });
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Nomor rekening berhasil disalin!');
  };

  return (
    <div className="relative min-h-screen">
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            key="cover"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cover bg-center text-white text-center p-6"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920')` 
            }}
          >
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-[0.4em] mb-4 font-medium"
            >
              Undangan Pernikahan
            </motion.p>
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="text-6xl md:text-8xl font-cursive mb-6 text-[#f3e5ab]"
            >
              Kiki & Hinka
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="glass-card p-8 rounded-3xl text-[#4a4a4a] max-w-sm w-full shadow-2xl"
            >
              <p className="mb-4 text-sm font-semibold tracking-wide">Kepada Bapak/Ibu/Saudara/i:</p>
              <p className="text-2xl font-serif font-bold italic mb-8 border-b border-[#a68b5a]/30 pb-4">Tamu Undangan</p>
              <button 
                onClick={handleOpen}
                className="bg-[#a68b5a] text-white px-10 py-4 rounded-full flex items-center justify-center gap-3 mx-auto hover:bg-[#8e764d] transition-all shadow-xl animate-bounce font-semibold uppercase text-xs tracking-widest"
              >
                <Send size={16} />
                Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <div className="bg-[#fdfbf7]">
          <AudioPlayer />
          
          <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1920" 
                 className="w-full h-full object-cover opacity-25" 
                 alt="Flower Background" 
               />
            </div>
            <div className="z-10 text-center px-4">
              <span className="text-xs uppercase tracking-[0.5em] text-[#a68b5a] mb-6 block font-bold">The Wedding Celebration</span>
              <h2 className="text-6xl md:text-9xl font-cursive text-[#a68b5a] mb-8 drop-shadow-sm">Kiki & Hinka</h2>
              <div className="h-[2px] w-32 bg-[#a68b5a] mx-auto mb-8"></div>
              <p className="font-serif text-2xl md:text-3xl text-[#4a4a4a] mb-12 font-medium">Selasa, 24 Maret 2026</p>
              <Countdown targetDate={WEDDING_DATE} />
            </div>
          </section>

          <section className="py-24 px-6 max-w-4xl mx-auto text-center">
            <Heart className="mx-auto text-[#a68b5a] mb-8 fill-[#a68b5a]/10" size={36} />
            <div className="mb-12">
               <p className="font-serif text-xl italic text-[#555] leading-relaxed px-4 md:px-12">
                 "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                 <br />
                 <span className="block mt-6 font-bold not-italic text-sm text-[#a68b5a] uppercase tracking-widest">( Ar-Rum: 21 )</span>
               </p>
            </div>
            <div className="h-[1px] w-64 bg-gradient-to-r from-transparent via-[#a68b5a] to-transparent mx-auto"></div>
          </section>

          <section className="py-24 bg-white/60 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-10">
                  <div className="absolute -inset-6 border-2 border-dashed border-[#a68b5a]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                  <img 
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Hinka&backgroundColor=fdfbf7" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl bg-[#fdfbf7] border-8 border-white relative z-10" 
                    alt="Hinka" 
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cursive text-[#a68b5a] mb-4 whitespace-nowrap overflow-hidden text-ellipsis px-2">
                  {GROOM_NAME}
                </h3>
                <p className="text-xs text-[#8b8b8b] uppercase tracking-[0.3em] font-bold mb-4">Putra dari</p>
                <p className="font-serif text-xl text-[#4a4a4a]">Bapak Yasmi & Ibu Yentimar</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-10">
                   <div className="absolute -inset-6 border-2 border-dashed border-[#a68b5a]/20 rounded-full animate-[spin_25s_linear_infinite]"></div>
                  <img 
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Rizki&backgroundColor=fdfbf7" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl bg-[#fdfbf7] border-8 border-white relative z-10" 
                    alt="Rizki" 
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cursive text-[#a68b5a] mb-4 whitespace-nowrap overflow-hidden text-ellipsis px-2">
                  {BRIDE_NAME}
                </h3>
                <p className="text-xs text-[#8b8b8b] uppercase tracking-[0.3em] font-bold mb-4">Putri dari</p>
                <p className="font-serif text-xl text-[#4a4a4a]">Bapak H Syahril (Alm) & Ibu Hj Dasmawati</p>
              </motion.div>
            </div>
          </section>

          <section className="py-24 px-6 bg-[#fdfbf7]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-center text-5xl font-cursive text-[#a68b5a] mb-20 drop-shadow-sm">Acara Bahagia</h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-[#a68b5a]/10 text-center transform hover:-translate-y-2 transition-transform duration-500">
                  <Calendar className="mx-auto text-[#a68b5a] mb-8" size={48} />
                  <h4 className="text-3xl font-serif font-bold text-[#4a4a4a] mb-4">Akad Nikah</h4>
                  <p className="text-lg text-[#6b6b6b] mb-1">Selasa, 24 Maret 2026</p>
                  <p className="text-lg text-[#6b6b6b] mb-8 font-semibold">Pukul 08.00 WIB - Selesai</p>
                  <div className="h-[2px] w-24 bg-[#a68b5a]/30 mx-auto mb-8"></div>
                  <p className="font-bold text-[#4a4a4a] mb-1">Lokasi Acara</p>
                  <p className="text-sm text-[#a68b5a] italic font-bold mb-2">Kediaman Mempelai Perempuan</p>
                  <p className="text-xs text-[#8b8b8b] mb-8 leading-relaxed px-4">Jln. Marahadin No 750A, Ampang Kualo, Kota Solok</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#a68b5a] text-white px-8 py-3 rounded-full hover:bg-[#8e764d] transition-all shadow-lg font-bold text-xs uppercase tracking-widest">
                    <MapPin size={16} /> Buka Peta
                  </a>
                </div>

                <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-[#a68b5a]/10 text-center transform hover:-translate-y-2 transition-transform duration-500">
                  <Users className="mx-auto text-[#a68b5a] mb-8" size={48} />
                  <h4 className="text-3xl font-serif font-bold text-[#4a4a4a] mb-4">Resepsi</h4>
                  <p className="text-lg text-[#6b6b6b] mb-1">Selasa, 24 Maret 2026</p>
                  <p className="text-lg text-[#6b6b6b] mb-8 font-semibold">Pukul 11.00 WIB - Selesai</p>
                  <div className="h-[2px] w-24 bg-[#a68b5a]/30 mx-auto mb-8"></div>
                  <p className="font-bold text-[#4a4a4a] mb-1">Lokasi Acara</p>
                  <p className="text-sm text-[#a68b5a] italic font-bold mb-2">Kediaman Mempelai Perempuan</p>
                  <p className="text-xs text-[#8b8b8b] mb-8 leading-relaxed px-4">Jln. Marahadin No 750A, Ampang Kualo, Kota Solok</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#a68b5a] text-white px-8 py-3 rounded-full hover:bg-[#8e764d] transition-all shadow-lg font-bold text-xs uppercase tracking-widest">
                    <MapPin size={16} /> Buka Peta
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <MessageCircle className="mx-auto text-[#a68b5a] mb-6" size={40} />
                <h2 className="text-5xl font-cursive text-[#a68b5a]">Ucapan & Doa</h2>
                <p className="text-[#6b6b6b] mt-4 font-medium">Tuliskan pesan bahagia Anda untuk kami</p>
              </div>

              <div className="grid md:grid-cols-5 gap-16">
                <div className="md:col-span-2">
                  <form onSubmit={submitWish} className="bg-[#fdfbf7] p-8 rounded-[2rem] shadow-inner sticky top-24 border border-[#a68b5a]/10">
                    <div className="mb-6">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a68b5a] mb-3">Nama Lengkap</label>
                      <input 
                        type="text" 
                        required
                        value={newWish.name}
                        onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border border-[#a68b5a]/20 focus:outline-none focus:ring-2 focus:ring-[#a68b5a]/50 bg-white text-sm font-medium transition-all" 
                        placeholder="Nama Anda" 
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a68b5a] mb-3">Konfirmasi Kehadiran</label>
                      <select 
                        value={newWish.status}
                        onChange={(e) => setNewWish({...newWish, status: e.target.value as any})}
                        className="w-full px-5 py-4 rounded-xl border border-[#a68b5a]/20 focus:outline-none focus:ring-2 focus:ring-[#a68b5a]/50 bg-white text-sm font-medium transition-all"
                      >
                        <option value="Hadir">Saya Akan Hadir</option>
                        <option value="Tidak Hadir">Berhalangan Hadir</option>
                      </select>
                    </div>
                    <div className="mb-8">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#a68b5a] mb-3">Pesan Bahagia</label>
                      <textarea 
                        required
                        value={newWish.message}
                        onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                        className="w-full px-5 py-4 rounded-xl border border-[#a68b5a]/20 h-32 focus:outline-none focus:ring-2 focus:ring-[#a68b5a]/50 bg-white text-sm font-medium transition-all resize-none" 
                        placeholder="Tuliskan doa terbaik Anda..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#a68b5a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-[#8e764d] transition-all shadow-md active:scale-95 uppercase text-[10px] tracking-widest"
                    >
                      {isSubmitting ? "Mengirim..." : <><Send size={16} /> Kirim Pesan</>}
                    </button>
                    {showSuccess && (
                      <p className="text-green-600 text-[10px] text-center mt-4 font-bold animate-pulse">Pesan Anda telah kami terima!</p>
                    )}
                  </form>
                </div>

                <div className="md:col-span-3">
                  <div className="max-h-[600px] overflow-y-auto pr-6 custom-scrollbar">
                    {wishes.length > 0 ? (
                      <div className="space-y-6">
                        {wishes.map((wish, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white p-6 rounded-3xl border border-[#a68b5a]/10 shadow-sm relative group"
                          >
                            <div className="flex justify-between items-start mb-4">
                              <h5 className="font-bold text-[#4a4a4a] text-sm tracking-wide">{wish.name}</h5>
                              <span className={`text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${wish.status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {wish.status}
                              </span>
                            </div>
                            <p className="text-[#555] text-sm italic leading-relaxed font-serif">
                              "{wish.message}"
                            </p>
                            <Quote className="absolute bottom-4 right-6 text-[#a68b5a]/5 group-hover:text-[#a68b5a]/10 transition-colors" size={48} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-[#8b8b8b] italic py-32 bg-white/30 rounded-[3rem] border-2 border-dashed border-[#a68b5a]/20">
                        <MessageCircle size={56} className="mb-6 opacity-20" />
                        <p className="text-sm font-medium tracking-wide">Belum ada pesan tertulis.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-24 px-6 bg-[#fdfbf7] text-center">
             <div className="max-w-2xl mx-auto">
                <Star className="mx-auto text-[#a68b5a] mb-8" size={40} />
                <h2 className="text-4xl font-serif font-bold text-[#4a4a4a] mb-8">Kado Digital</h2>
                <p className="text-[#6b6b6b] mb-12 text-lg leading-relaxed">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui saluran di bawah ini:</p>
                <div className="grid gap-8">
                   <div className="bg-white p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] border border-[#a68b5a]/10 flex flex-col items-center shadow-xl transform transition-all hover:scale-[1.01]">
                      <div className="bg-blue-50 w-24 h-12 flex items-center justify-center rounded-lg mb-6">
                        <span className="text-blue-700 font-black italic text-2xl">BRI</span>
                      </div>
                      <p className="text-[#a68b5a] text-xl sm:text-3xl font-bold mb-3 tracking-widest break-all">555301007257533</p>
                      <p className="text-xs sm:text-md text-[#4a4a4a] font-bold uppercase tracking-widest mb-6">a.n Rizki Rahma Kurnia</p>
                      <button 
                        onClick={() => copyToClipboard('555301007257533')}
                        className="bg-[#fdfbf7] border border-[#a68b5a] text-[#a68b5a] px-8 py-3 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#a68b5a] hover:text-white transition-all shadow-sm active:scale-95"
                      >
                        Salin Rekening
                      </button>
                   </div>
                </div>
             </div>
          </section>

          <footer className="py-20 bg-[#333] text-white text-center px-6 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a68b5a] to-transparent opacity-50"></div>
             <p className="font-cursive text-5xl mb-8 text-[#f3e5ab]">Kiki & Hinka</p>
             <p className="text-sm font-medium tracking-[0.4em] mb-16 opacity-70 uppercase px-4">Terima kasih telah menjadi bagian dari perjalanan cinta kami</p>
             <div className="text-[10px] text-white/20 uppercase tracking-[0.5em] font-bold">
                Created with Love &mdash; 2026
             </div>
          </footer>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #a68b5a;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default App;
