import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, Volume2, VolumeX, MapPin, Sparkles, ArrowDown, X, Plane, LockKeyhole } from 'lucide-react';
import * as THREE from 'three';
import './styles.css';

const memories = [
  { image: '/images/sis-1.jpg', emoji: '😂', title: 'Our chaos', text: 'The jokes, fights and nonsense that only we understand.' },
  { image: '/images/sis-2.jpg', emoji: '📸', title: 'Our memories', text: 'A few moments from a lifetime of being stuck with each other.' },
  { image: '/images/sis-3.jpg', emoji: '🤫', title: 'Our secrets', text: 'Some stories are permanently classified between siblings.' },
  { image: '/images/sis-4.jpg', emoji: '🫶', title: 'Our bond', text: 'Australia can be far away. Our bond is not.' },
];

const timeline = [
  ['Then', 'Two kids, one house, unlimited fights. 😂'],
  ['Growing up', 'Somehow the fights became memories we laugh about now.'],
  ['Australia', 'You flew miles away and made a new life of your own. ✈️'],
  ['Today', 'Different countries. Same stupid jokes. Same bond. ❤️'],
];

function Rakhi3D() {
  const group = useRef();
  const gem = useRef();
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.28;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.75) * 0.1;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.15) * 0.16;
    if (gem.current) gem.current.rotation.z += delta * 0.65;
  });

  const petals = Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    return <mesh key={i} position={[Math.cos(a) * 0.66, Math.sin(a) * 0.66, 0]} scale={[0.33, 0.17, 0.12]} rotation={[0, 0, a]}>
      <sphereGeometry args={[1, 20, 14]} />
      <meshStandardMaterial color="#d66f88" roughness={0.28} metalness={0.25} />
    </mesh>;
  });

  return <group ref={group}>
    <mesh><torusGeometry args={[1.3, 0.085, 24, 96]} /><meshStandardMaterial color="#e4a3b1" roughness={0.22} metalness={0.5} /></mesh>
    {petals}
    <mesh ref={gem} position={[0, 0, 0.18]}>
      <icosahedronGeometry args={[0.43, 2]} />
      <meshStandardMaterial color="#f4ca67" roughness={0.14} metalness={0.8} emissive="#7a4f10" emissiveIntensity={0.12} />
    </mesh>
    <mesh position={[0, 0, 0.5]}>
      <sphereGeometry args={[0.105, 20, 20]} />
      <meshStandardMaterial color="#fff4ca" emissive="#ffd66e" emissiveIntensity={1.1} />
    </mesh>
    <mesh position={[0, 0, -0.18]}>
      <torusGeometry args={[0.58, 0.025, 12, 64]} />
      <meshStandardMaterial color="#fff0b8" metalness={0.7} roughness={0.2} />
    </mesh>
  </group>;
}

function Particles() {
  const ref = useRef();
  const count = 110;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025; });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={0.035} color="#e6a9b7" transparent opacity={0.72} /></points>;
}

function ThreeScene() {
  return <div className="three-scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]}>
    <ambientLight intensity={1.8} />
    <pointLight position={[3, 4, 4]} intensity={17} color="#ffd9e1" />
    <pointLight position={[-4, -2, 2]} intensity={10} color="#ffe4a8" />
    <Rakhi3D /><Particles />
  </Canvas></div>;
}

function PhotoCard({ item, index }) {
  const [failed, setFailed] = useState(false);
  return <motion.article className="photo-card" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.09 }} whileHover={{ y: -8, rotate: index % 2 ? 1 : -1 }}>
    <div className="photo-frame">
      {!failed ? <img src={item.image} alt={item.title} onError={() => setFailed(true)} /> : <div className="photo-placeholder"><span>{item.emoji}</span><small>Add your photo</small></div>}
    </div>
    <h3>{item.title}</h3><p>{item.text}</p><span className="card-number">0{index + 1}</span>
  </motion.article>;
}

export default function App() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const startExperience = async () => {
    setStarted(true);
    try {
      audioRef.current.volume = 0.55;
      audioRef.current.muted = false;
      await audioRef.current.play();
    } catch {
      // Browser may block playback; the sound button remains available.
    }
    confetti({ particleCount: 130, spread: 95, startVelocity: 28, origin: { y: 0.7 } });
  };

  const toggleSound = async () => {
    if (!started) await startExperience();
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };

  const celebrate = () => confetti({ particleCount: 220, spread: 115, startVelocity: 34, scalar: 1.05, origin: { y: 0.62 } });
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return <main>
    <audio ref={audioRef} src="/audio/rakhi-song.mp3" loop preload="auto" />
    <div className="scroll-progress"><span style={{ width: `${progress}%` }} /></div>

    <AnimatePresence>
      {!started && <motion.div className="welcome" initial={{ opacity: 1 }} exit={{ opacity: 0, pointerEvents: 'none' }}>
        <div className="welcome-stars" />
        <motion.div className="welcome-card" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .25 }}>
          <span className="tiny-label">A LITTLE SOMETHING FROM HOME</span>
          <div className="welcome-rakhi">🧿</div>
          <p>For my sister, all the way in Australia 🇦🇺</p>
          <h1>Put your headphones on.</h1>
          <p className="welcome-sub">I made this little corner of the internet just for you.</p>
          <button className="primary-btn" onClick={startExperience}><Heart size={18} fill="currentColor" /> Enter your surprise</button>
          <small>Music starts when you enter ♫</small>
        </motion.div>
      </motion.div>}
    </AnimatePresence>

    <button className="sound-btn" onClick={toggleSound} aria-label="Toggle music">{muted ? <VolumeX size={18} /> : <Volume2 size={18} />}</button>

    <section className="hero">
      <ThreeScene /><div className="hero-glow" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15, duration: 1 }}>
        <div className="eyebrow">🇮🇳 India <span>→</span> Australia 🇦🇺</div>
        <p className="distance">10,000+ km apart</p>
        <h1>For my favourite<br /><em>person to annoy.</em> ❤️</h1>
        <p className="subtext">You are thousands of kilometres away, so I made something that can travel instantly.</p>
        <motion.button className="primary-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: .96 }} onClick={celebrate}><Gift size={19} /> Send some love</motion.button>
        <button className="scroll-btn" onClick={() => scrollTo('intro')}><ArrowDown size={17} /> there's more</button>
      </motion.div>
    </section>

    <section id="intro" className="intro section-pad"><div className="paper-card">
      <span className="tiny-label">DEAR SIS,</span>
      <h2>Rakhi ka gift courier se nahi bheja…</h2>
      <p>Kyuki jo gift dena tha, woh parcel mein fit hi nahi hota. 🥹</p>
      <p>Isliye ek chhota sa corner of the internet bana diya — sirf tere liye.</p>
      <div className="signature">— tera annoying bhai <Heart size={16} fill="currentColor" /></div>
    </div></section>

    <section className="memories section-pad"><div className="section-heading"><span>OUR LITTLE WORLD</span><h2>Things only <em>we</em> understand.</h2><p>Replace the four placeholders with our actual memories.</p></div>
      <div className="photo-grid">{memories.map((item, i) => <PhotoCard key={item.title} item={item} index={i} />)}</div>
    </section>

    <section className="timeline-section section-pad"><div className="section-heading"><span>FROM THEN TO NOW</span><h2>One bond. <em>Many chapters.</em></h2></div>
      <div className="timeline">{timeline.map(([year, text], i) => <motion.div className="timeline-item" key={year} initial={{ opacity: 0, x: i % 2 ? 25 : -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
        <div className="timeline-dot" /><div><span>{year}</span><p>{text}</p></div>
      </motion.div>)}</div>
    </section>

    <section className="fun-section section-pad"><div className="section-heading"><span>OFFICIAL SIBLING REPORT</span><h2>Proof that you're <em>actually annoying.</em> 😂</h2></div>
      <div className="fun-grid">{[['Steals my stuff', 'GUILTY'], ['Says “2 minutes”', 'NEVER 2 MINUTES'], ['Calls when she needs something', '🤨 SUS'], ['Still my favourite person', 'UNFORTUNATELY ❤️']].map(([a, b], i) => <motion.div className="fun-card" key={a} whileHover={{ rotate: i % 2 ? -2 : 2, y: -6 }}><span>0{i + 1}</span><h3>{a}</h3><strong>{b}</strong></motion.div>)}</div>
    </section>

    <section className="map-section section-pad"><div className="globe-wrap"><div className="globe"><div className="india-pin">🇮🇳</div><div className="australia-pin">🇦🇺</div><div className="flight-line"><Plane size={18} /></div></div></div>
      <div className="map-copy"><span className="tiny-label">THE DISTANCE</span><h2>Different skies.<br /><em>Same home.</em></h2><p>India to Australia. Thousands of kilometres, one ridiculous amount of love.</p><div className="route"><MapPin size={15} /> INDIA <span>──────── ✈ ────────</span> AUSTRALIA</div></div>
    </section>

    <section className="letter-section section-pad"><div className="letter-wrap">
      <div className="letter-top"><span>A MESSAGE FROM HOME</span><Sparkles size={18} /></div><h2>Some things are easier<br /><em>to write than say.</em></h2>
      <motion.button className="envelope" onClick={() => setLetterOpen(true)} whileHover={{ scale: 1.025, rotate: -1 }} whileTap={{ scale: .98 }}><div className="envelope-flap" /><Heart size={42} fill="currentColor" /><span>Open my letter</span></motion.button>
    </div></section>

    <section className="finale section-pad"><MapPin size={18} /><p>Australia 🇦🇺 ↔ India 🇮🇳</p><h2>Distance: a lot.<br /><em>Love: unlimited.</em></h2><motion.button className="primary-btn" whileHover={{ scale: 1.06 }} onClick={celebrate}>Happy Rakhi ❤️</motion.button><p className="footer-note">Made with ❤️ by your annoying brother.</p></section>

    <AnimatePresence>{letterOpen && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLetterOpen(false)}>
      <motion.div className="letter-modal" initial={{ opacity: 0, scale: .88, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .95 }} onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setLetterOpen(false)}><X size={20} /></button>
        <span className="tiny-label">DEAR SIS ❤️</span><h2>To my sister,<br />wherever you are.</h2>
        <p>Australia may be far away, but somehow you are still part of all the little things that make my day.</p>
        <p>We might not be tying a Rakhi in the same room this year, and honestly, I hate that. But I'm lucky enough to call you my sister — and that's something distance can't change.</p>
        <p>Keep chasing your dreams, keep being your weird self, and please remember that your annoying brother is always just a call away. 😂</p>
        <p className="love-line">Happy Raksha Bandhan. Love you always. 🫶</p>
        <button className="letter-close" onClick={() => setLetterOpen(false)}><LockKeyhole size={15} /> Keep this between us</button>
      </motion.div>
    </motion.div>}</AnimatePresence>
  </main>;
}
