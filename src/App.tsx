import * as React from "react";
import { useState, ReactNode, Component, ErrorInfo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Phone, 
  Film, 
  Music, 
  BookOpen, 
  ChevronRight, 
  Facebook, 
  Instagram, 
  Youtube,
  Sparkles,
  Sun,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "./firebase";

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
    <div className="max-w-7xl mx-auto glass rounded-full px-8 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center overflow-hidden">
          <img 
            src="/logo eglise ad vridi blanc.png" 
            alt="Logo Eglise AD Vridi" 
            className="w-8 h-8 object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.classList.add('bg-primary');
              const icon = document.createElement('div');
              icon.innerHTML = '<svg class="text-on-primary w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.912 5.886h6.188l-5.004 3.636 1.912 5.886-5.008-3.638-5.008 3.638 1.912-5.886-5.004-3.636h6.188z"/></svg>';
              target.parentElement?.appendChild(icon.firstChild as Node);
            }}
          />
        </div>
        <div className="hidden md:block">
          <p className="text-xs font-bold text-primary uppercase tracking-widest">Eglise des Assemblées de Dieu</p>
          <p className="text-[10px] text-on-surface-variant/70 uppercase">Vridi Cité / Petit Bassam</p>
        </div>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#accueil" className="text-primary hover:opacity-80 transition-opacity">Accueil</a>
        <a href="#programme" className="hover:text-primary transition-colors">Programme</a>
        <a href="#lieu" className="hover:text-primary transition-colors">Lieu</a>
        <a href="#inscription" className="hover:text-primary transition-colors">Inscription</a>
      </div>

      <a 
        href="#inscription" 
        className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform"
      >
        PARTICIPER
      </a>
    </div>
  </nav>
);

const Hero = () => (
  <section id="accueil" className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden hero-gradient">
    {/* Background Image with Overlay */}
    <div className="absolute inset-0 z-0">
      <img 
        src="/fond écran programme de paques.png" 
        alt="Fond Programme de Pâques" 
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://picsum.photos/seed/divine/1920/1080?blur=4";
        }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-surface/0 via-surface/60 to-surface"></div>
    </div>

    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative z-10 text-center max-w-4xl"
    >
      <div className="inline-block glass px-4 py-1 rounded-full mb-8">
        <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">Grande campagne d'évangélisation</span>
      </div>
      
      <h1 className="text-6xl md:text-9xl font-bold leading-[0.85] mb-6 tracking-tighter">
        JÉSUS LA <span className="text-primary italic">PÂQUE</span>
        <br />
        <span className="text-primary italic">QUI SAUVE</span>
      </h1>

      <p className="text-lg md:text-xl text-on-surface-variant/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
        Rejoignez-nous pour une grande campagne d'évangélisation à Petit Bassam. 
        Venez vivre le JÉSUS qui sauve à travers des moments de louange, de prédication et de communion fraternelle.
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <a 
          href="#inscription"
          className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold text-lg shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
        >
          S'INSCRIRE
        </a>
        
        <div className="flex items-center gap-3 text-on-surface-variant/60">
          <Calendar className="w-5 h-5" />
          <span className="text-sm font-medium uppercase tracking-widest">3 — 4 AVRIL 2026</span>
        </div>
      </div>
    </motion.div>

    {/* Scroll Indicator */}
    <motion.div 
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2"
    >
      <div className="w-[1px] h-12 bg-linear-to-b from-primary to-transparent"></div>
    </motion.div>
  </section>
);

const Program = () => (
  <section id="programme" className="py-24 px-6 bg-surface">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">Programme de nos rencontres</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Day 1 */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -30 }}
          viewport={{ once: true }}
          className="glass-dark p-10 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          
          <div className="mb-8">
            <p className="text-xs font-bold text-primary uppercase tracking-widest mb-2">Vendredi</p>
            <h3 className="text-4xl font-bold">03 Avril 2026</h3>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Film className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Projection de Film</h4>
                <p className="text-sm text-on-surface-variant/60">Une immersion visuelle dans le sacrifice du Christ.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Louange</h4>
                <p className="text-sm text-on-surface-variant/60">Célébration céleste par la chorale unifiée.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Prédication</h4>
                <p className="text-sm text-on-surface-variant/60">Parole de vie et de transformation profonde.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Day 2 */}
        <motion.div 
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 30 }}
          viewport={{ once: true }}
          className="glass-dark p-10 rounded-xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity">
            <Sun className="w-12 h-12 text-secondary" />
          </div>

          <div className="mb-8">
            <p className="text-xs font-bold text-secondary uppercase tracking-widest mb-2">Samedi</p>
            <h3 className="text-4xl font-bold">04 Avril 2026</h3>
          </div>

          <div className="space-y-8">
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <Film className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Projection de Film</h4>
                <p className="text-sm text-on-surface-variant/60">La victoire sur la mort racontée avec puissance.</p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <Music className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Louange</h4>
                <p className="text-sm text-on-surface-variant/60">Adoration prophétique pour la nation.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Prédication</h4>
                <p className="text-sm text-on-surface-variant/60">L'appel au salut et à la vie éternelle.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Info = () => (
  <section id="lieu" className="py-24 px-6 bg-surface-container-low">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="relative">
        <div className="rounded-xl overflow-hidden shadow-2xl border border-outline-variant">
          <img 
            src="/date programme evangelisation.jpg" 
            alt="Programme d'évangélisation" 
            className="w-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://picsum.photos/seed/church/800/600";
            }}
          />
        </div>
        <div className="absolute -bottom-6 -right-6 glass p-8 rounded-xl max-w-xs shadow-2xl">
          <h4 className="font-bold text-primary mb-2">Entrée Libre</h4>
          <p className="text-xs text-on-surface-variant/80">L'accès à l'événement est totalement gratuit. Venez avec vos proches pour ce moment unique.</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold text-primary uppercase tracking-widest mb-4">Informations Pratiques</p>
        <h2 className="text-4xl md:text-6xl font-bold mb-10 leading-tight">
          Rejoignez-nous au <span className="text-primary italic">Petit Bassam</span>
        </h2>

        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Lieu exact</h4>
              <p className="text-on-surface-variant/60">Vridi Cité / Petit Bassam, Entrée du quartier</p>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">Contact d'assistance</h4>
              <p className="text-on-surface-variant/60">07 47 28 71 51 / 07 87 63 69 75</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-1 rounded-xl bg-outline-variant/20">
          <div className="bg-surface rounded-lg h-48 flex items-center justify-center text-on-surface-variant/30 italic text-center px-6">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15892.20595846656!2d-4.000941497913277!3d5.254589183207489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1e8d59f0e9123%3A0x83db66548bbc445e!2sPetit-Bassam%2C%20Abidjan!5e0!3m2!1sen!2sci!4v1774875072864!5m2!1sen!2sci" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Registration = () => {
  const [formData, setFormData] = useState({ fullName: "", phoneNumber: "", residence: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.residence) {
      setStatus("error");
      setErrorMessage("Veuillez remplir tous les champs.");
      return;
    }

    setStatus("loading");
    try {
      await addDoc(collection(db, "registrations"), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setStatus("success");
      setFormData({ fullName: "", phoneNumber: "", residence: "" });
    } catch (error: any) {
      console.error("Error adding document: ", error);
      setStatus("error");
      setErrorMessage("Une erreur est survenue lors de l'inscription. Veuillez réessayer.");
      
      // Handle Firestore error with specific context for AIS Agent diagnosis
      handleFirestoreError(error, OperationType.WRITE, "registrations");
    }
  };

  return (
    <section id="inscription" className="py-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6">Prendre part à ce programme</h2>
        <p className="text-on-surface-variant/60 mb-12">Inscrivez-vous pour recevoir les détails de l'événement et les rappels par SMS.</p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-dark p-8 md:p-12 rounded-xl text-left relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4">Inscription Réussie !</h3>
                <p className="text-on-surface-variant/60 mb-8">
                  Merci de vous être inscrit. Nous avons hâte de vous voir à Petit Bassam pour ce moment de grâce.
                </p>
                <button 
                  onClick={() => setStatus("idle")}
                  className="text-primary font-bold hover:underline"
                >
                  Inscrire une autre personne
                </button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Nom Complet</label>
                    <input 
                      type="text" 
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Jean-Luc Kouadio"
                      className="w-full bg-surface-container-highest/50 border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Numéro de Téléphone</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="07 00 00 00 00"
                      className="w-full bg-surface-container-highest/50 border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-primary">Lieu de résidence</label>
                  <input 
                    type="text" 
                    required
                    value={formData.residence}
                    onChange={(e) => setFormData({ ...formData, residence: e.target.value })}
                    placeholder="Vridi, Port-Bouët, Marcory..."
                    className="w-full bg-surface-container-highest/50 border border-outline-variant rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 p-3 rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-primary text-on-primary py-4 rounded-full font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "TRAITEMENT..." : "CONFIRMER MON INSCRIPTION"}
                  <ChevronRight className="w-5 h-5" />
                </button>

                <p className="text-[10px] text-center text-on-surface-variant/40 uppercase tracking-widest">
                  Vos données sont sécurisées et ne seront utilisées que pour l'événement.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-6 border-t border-outline-variant bg-surface">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
        <img 
          src="/logo eglise ad vridi blanc.png" 
          alt="Logo Eglise AD Vridi" 
          className="h-12 object-contain opacity-80"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div>
          <h3 className="font-bold text-primary mb-1">Eglise des Assemblées de Dieu de Vridi Cité / Petit Bassam</h3>
          <p className="text-xs text-on-surface-variant/50 italic">INSPIRÉ PAR LA FOI, GUIDÉ PAR L'ESPRIT</p>
        </div>
      </div>

      <div className="flex gap-6">
        <a href="https://www.facebook.com/share/1ZPZYEH5wr/" className="text-on-surface-variant/60 hover:text-primary transition-colors"><Facebook className="w-5 h-5" /></a>
        <a href="https://youtube.com/@advainqueurs?si=5l0Jn_-STUYBNM7L" className="text-on-surface-variant/60 hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
      </div>

      <p className="text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
        © 2026 JÉSUS LA PÂQUE QUI SAUVE. TOUS DROITS RÉSERVÉS.
      </p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Program />
      <Info />
      <Registration />
      <Footer />
    </div>
  );
}
