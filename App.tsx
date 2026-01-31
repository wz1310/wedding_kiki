
import React, { useState, useEffect } from 'react';
import { Heart, MapPin, Calendar, Users, Send, MessageCircle, Star, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Countdown from './components/Countdown';
import { geminiService } from './services/geminiService';

const WEDDING_DATE = "2026-03-24T08:00:00";
const BRIDE_NAME = "Rizki Rahma Kurnia, A.Md Ftr";
const GROOM_NAME = "Hinka S.s";
const MAPS_URL = "https://maps.app.goo.gl/FkoSv91khJDpf3ww8";

// DAFTAR UCAPAN PERMANEN (Dikosongkan total agar tampilan bersih)
const INITIAL_WISHES: any[] = [];

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '', status: 'Hadir' as 'Hadir' | 'Tidak Hadir' });
  const [wishes, setWishes] = useState<any[]>(INITIAL_WISHES);
  const [aiPoem, setAiPoem] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Menghapus pengambilan data dari localStorage agar benar-benar kosong sesuai permintaan
    setWishes(INITIAL_WISHES);

    const fetchPoem = async () => {
      const poem = await geminiService.generateRomanticPoem(BRIDE_NAME, GROOM_NAME);
      setAiPoem(poem);
    };
    fetchPoem();
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWish.name || !newWish.message) return;
    
    setIsSubmitting(true);
    
    // Simulasi penambahan ucapan ke state (hanya sementara di sesi ini)
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
      {/* Cover Overlay */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cover bg-center text-white text-center p-6"
            style={{ 
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920')` 
            }}
          >
            <motion.p 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5 }}
              className="text-sm uppercase tracking-[0.3em] mb-4 font-light"
            >
              Undangan Pernikahan
            </motion.p>
            <motion.h1 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ delay: 0.8 }}
              className="text-5xl md:text-7xl font-cursive mb-6"
            >
              Kiki & Hinka
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="glass-card p-6 rounded-2xl text-[#4a4a4a] max-w-sm w-full"
            >
              <p className="mb-4 text-sm font-medium">Kepada Bapak/Ibu/Saudara/i:</p>
              <p className="text-xl font-serif font-bold italic mb-6">Tamu Undangan</p>
              <button 
                onClick={handleOpen}
                className="bg-[#a68b5a] text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 mx-auto hover:bg-[#8e764d] transition-colors shadow-lg animate-bounce"
              >
                <Send size={18} />
                Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {isOpen && (
        <div className="bg-[#fdfbf7]">
          {/* Hero Section */}
          <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&q=80&w=1920" 
                 className="w-full h-full object-cover opacity-25" 
                 alt="Flower Landscape Background" 
               />
            </div>
            <div className="z-10 text-center px-4">
              <span className="text-sm uppercase tracking-[0.4em] text-[#a68b5a] mb-6 block">The Wedding Celebration</span>
              <h2 className="text-5xl md:text-8xl font-cursive text-[#4a4a4a] mb-8">Kiki & Hinka</h2>
              <div className="h-[1px] w-24 bg-[#a68b5a] mx-auto mb-8"></div>
              <p className="font-serif text-xl md:text-2xl text-[#6b6b6b] mb-12">Selasa, 24 Maret 2026</p>
              <Countdown targetDate={WEDDING_DATE} />
            </div>
          </section>

          {/* Verse Section */}
          <section className="py-20 px-6 max-w-4xl mx-auto text-center">
            <Heart className="mx-auto text-[#a68b5a] mb-6 fill-[#a68b5a]/10" size={32} />
            <div className="mb-12">
               <p className="font-serif text-lg italic text-[#6b6b6b] leading-relaxed whitespace-pre-line px-4">
                 {aiPoem || "Dua hati satu janji, melangkah bersama dalam naungan restu Ilahi."}
               </p>
            </div>
            <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#a68b5a] to-transparent mx-auto"></div>
          </section>

          {/* Bride & Groom Section */}
          <section className="py-24 bg-white/50 px-6">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
              {/* Groom */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-8">
                  <div className="absolute -inset-4 border border-[#a68b5a]/30 rounded-full animate-pulse"></div>
                  <img 
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Hinka&backgroundColor=fdfbf7" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl bg-[#fdfbf7] border-4 border-white transition-all duration-500" 
                    alt="Hinka" 
                  />
                </div>
                <h3 className="text-3xl font-cursive text-[#a68b5a] mb-2">{GROOM_NAME}</h3>
                <p className="text-sm text-[#8b8b8b] uppercase tracking-widest mb-4">Putra dari</p>
                <p className="font-serif text-[#4a4a4a]">Bapak Yasmi & Ibu Yentimar</p>
              </motion.div>

              {/* Bride */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center md:order-2"
              >
                <div className="relative inline-block mb-8">
                   <div className="absolute -inset-4 border border-[#a68b5a]/30 rounded-full animate-pulse"></div>
                  <img 
                    src="https://api.dicebear.com/7.x/notionists/svg?seed=Rizki&backgroundColor=fdfbf7" 
                    className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl bg-[#fdfbf7] border-4 border-white transition-all duration-500" 
                    alt="Rizki" 
                  />
                </div>
                <h3 className="text-3xl font-cursive text-[#a68b5a] mb-2">{BRIDE_NAME}</h3>
                <p className="text-sm text-[#8b8b8b] uppercase tracking-widest mb-4">Putri dari</p>
                <p className="font-serif text-[#4a4a4a]">Bapak H Syahril (Alm) & Ibu Hj Dasmawati</p>
              </motion.div>
            </div>
          </section>

          {/* Event Details Section */}
          <section className="py-24 px-6 bg-[#fdfbf7]">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-center text-4xl font-cursive text-[#a68b5a] mb-16">Acara Bahagia</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Akad */}
                <motion.div className="bg-white p-10 rounded-3xl shadow-xl border border-[#a68b5a]/10 text-center">
                  <Calendar className="mx-auto text-[#a68b5a] mb-6" size={40} />
                  <h4 className="text-2xl font-serif font-bold text-[#4a4a4a] mb-4">Akad Nikah</h4>
                  <p className="text-[#6b6b6b] mb-2">Selasa, 24 Maret 2026</p>
                  <p className="text-[#6b6b6b] mb-6">Pukul 08.00 WIB - Selesai</p>
                  <div className="h-[1px] w-20 bg-[#a68b5a]/20 mx-auto mb-6"></div>
                  <p className="font-medium text-[#4a4a4a]">Lokasi Acara</p>
                  <p className="text-sm text-[#6b6b6b] italic font-semibold">Kediaman Mempelai Perempuan</p>
                  <p className="text-xs text-[#8b8b8b] mb-6">Jln. Marahadin No 750A, Ampang Kualo</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#a68b5a] text-white px-6 py-2 rounded-full hover:bg-[#8e764d] transition-colors shadow-md">
                    <MapPin size={16} /> Buka Peta
                  </a>
                </motion.div>

                {/* Resepsi */}
                <motion.div className="bg-white p-10 rounded-3xl shadow-xl border border-[#a68b5a]/10 text-center">
                  <Users className="mx-auto text-[#a68b5a] mb-6" size={40} />
                  <h4 className="text-2xl font-serif font-bold text-[#4a4a4a] mb-4">Resepsi</h4>
                  <p className="text-[#6b6b6b] mb-2">Selasa, 24 Maret 2026</p>
                  <p className="text-[#6b6b6b] mb-6">Pukul 11.00 WIB - Selesai</p>
                  <div className="h-[1px] w-20 bg-[#a68b5a]/20 mx-auto mb-6"></div>
                  <p className="font-medium text-[#4a4a4a]">Lokasi Acara</p>
                  <p className="text-sm text-[#6b6b6b] italic font-semibold">Kediaman Mempelai Perempuan</p>
                  <p className="text-xs text-[#8b8b8b] mb-6">Jln. Marahadin No 750A, Ampang Kualo</p>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#a68b5a] text-white px-6 py-2 rounded-full hover:bg-[#8e764d] transition-colors shadow-md">
                    <MapPin size={16} /> Buka Peta
                  </a>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Guest Book Section */}
          <section className="py-24 px-6 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <MessageCircle className="mx-auto text-[#a68b5a] mb-4" size={32} />
                <h2 className="text-4xl font-cursive text-[#a68b5a]">Ucapan & Doa Restu</h2>
                <p className="text-[#6b6b6b] mt-2">Tuliskan pesan bahagia Anda untuk kedua mempelai</p>
              </div>

              <div className="grid md:grid-cols-5 gap-12">
                {/* Form area */}
                <div className="md:col-span-2">
                  <form onSubmit={submitWish} className="bg-[#fdfbf7] p-6 rounded-3xl shadow-inner sticky top-24 border border-[#a68b5a]/10">
                    <div className="mb-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#a68b5a] mb-2">Nama</label>
                      <input 
                        type="text" 
                        required
                        value={newWish.name}
                        onChange={(e) => setNewWish({...newWish, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-[#a68b5a]/10 focus:outline-none focus:ring-1 focus:ring-[#a68b5a] bg-white text-sm" 
                        placeholder="Nama Anda" 
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#a68b5a] mb-2">Kehadiran</label>
                      <select 
                        value={newWish.status}
                        onChange={(e) => setNewWish({...newWish, status: e.target.value as any})}
                        className="w-full px-4 py-3 rounded-xl border border-[#a68b5a]/10 focus:outline-none focus:ring-1 focus:ring-[#a68b5a] bg-white text-sm"
                      >
                        <option value="Hadir">Hadir</option>
                        <option value="Tidak Hadir">Tidak Hadir</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-xs font-bold uppercase tracking-widest text-[#a68b5a] mb-2">Pesan</label>
                      <textarea 
                        required
                        value={newWish.message}
                        onChange={(e) => setNewWish({...newWish, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl border border-[#a68b5a]/10 h-24 focus:outline-none focus:ring-1 focus:ring-[#a68b5a] bg-white text-sm" 
                        placeholder="Doa & Harapan..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#a68b5a] text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#8e764d] transition-all"
                    >
                      {isSubmitting ? "Mengirim..." : <><Send size={16} /> Kirim Ucapan</>}
                    </button>
                    {showSuccess && (
                      <p className="text-green-600 text-[10px] text-center mt-2 font-bold animate-pulse">Ucapan berhasil ditambahkan!</p>
                    )}
                  </form>
                </div>

                {/* List area (Dinding Ucapan) */}
                <div className="md:col-span-3">
                  <div className="max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                    {wishes.length > 0 ? (
                      <div className="space-y-4">
                        {wishes.map((wish, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-5 rounded-2xl border border-[#a68b5a]/5 shadow-sm relative"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-bold text-[#4a4a4a] text-sm">{wish.name}</h5>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full ${wish.status === 'Hadir' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {wish.status}
                              </span>
                            </div>
                            <p className="text-[#6b6b6b] text-xs italic leading-relaxed">
                              "{wish.message}"
                            </p>
                            <Quote className="absolute bottom-2 right-2 text-[#a68b5a]/10" size={32} />
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-[#8b8b8b] italic py-20 bg-white/30 rounded-3xl border border-dashed border-[#a68b5a]/20">
                        <MessageCircle size={40} className="mb-4 opacity-20" />
                        <p className="text-sm">Belum ada ucapan. Jadilah yang pertama!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Gift Section */}
          <section className="py-24 px-6 bg-[#fdfbf7] text-center">
             <div className="max-w-2xl mx-auto">
                <Star className="mx-auto text-[#a68b5a] mb-6" size={32} />
                <h2 className="text-3xl font-serif text-[#4a4a4a] mb-8">Kado Digital</h2>
                <p className="text-[#6b6b6b] mb-12">Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, dapat melalui:</p>
                <div className="grid gap-6">
                   <div className="bg-white p-8 rounded-3xl border border-[#a68b5a]/10 flex flex-col items-center shadow-sm">
                      <p className="font-bold text-lg mb-2">Bank Transfer (Bank BRI)</p>
                      <p className="text-[#a68b5a] text-2xl font-bold mb-2 tracking-widest">555301007257533</p>
                      <p className="text-sm text-[#6b6b6b]">a.n Rizki Rahma Kurnia</p>
                      <button 
                        onClick={() => copyToClipboard('555301007257533')}
                        className="mt-4 text-xs underline text-[#a68b5a] hover:text-[#8e764d]"
                      >
                        Salin Nomor Rekening
                      </button>
                   </div>
                </div>
             </div>
          </section>

          {/* Footer */}
          <footer className="py-16 bg-[#4a4a4a] text-white text-center px-6">
             <p className="font-cursive text-3xl mb-6">Kiki & Hinka</p>
             <p className="text-sm font-light tracking-widest mb-12 uppercase">Terima kasih telah menjadi bagian dari kebahagiaan kami</p>
             <div className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                Digital Invitation Created with Love
             </div>
          </footer>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
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
