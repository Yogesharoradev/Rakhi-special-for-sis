import React, { Suspense, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, MapPin, Volume2, VolumeX, ArrowDown, X } from 'lucide-react';
import './styles.css';

const memories = [
  { emoji: '😂', title: 'Our nonsense', text: 'The jokes that make absolutely no sense to anyone else.' },
  { emoji: '🤫', title: 'Our secrets', text: 'Some stories are better kept between one brother and one sister.' },
  { emoji: '🥹', title: 'Our bond', text: 'No matter the country, time zone, or distance — still us.' },
  { emoji: '🫶', title: 'Always home', text: 'You are one of the people who makes home feel like home.' },
];

function FloatingRakhi() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.45;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.7) * 0.12;
  });
  return (
    <group ref={ref} position={[0, 0.1, 0]}>
      <mesh>
        <torusGeometry args={[1.35, 0.08, 16, 64]} />
        <meshStandardMaterial color="#d98a9b" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial color="#e7b95f" metalness={0.7} roughness={0.2} />
      </mesh>
      <Text position={[0, 0, 0.42]} fontSize={0.22} color="#fff8f4" anchorX="center" anchorY="middle">
        LOVE
      </Text>
    </group>
  );
}

function ThreeScene() {
  return (
    <div className="three-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={2} />
        <pointLight position={[3, 4, 4]} intensity={18} color="#ffd6df" />
        <pointLight position={[-4, -2, 2]} intensity={10} color="#ffe8b5" />
        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.55}>
            <FloatingRakhi />
          </Float>
          <Sparkles count={70} scale={6} size={2.2} speed={0.35} color="#f1b8c6" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  const celebrate = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.65 }, scalar: 1.05 });
    setOpened(true);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <main>
      <button className="sound-btn" onClick={() => setMuted(!muted)} aria-label="Toggle sound">
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>

      <section className="hero">
        <ThreeScene />
        <div className="hero-glow" />
        <motion.div className="hero-content" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <div className="eyebrow"><span>🇮🇳</span> India <span className="dash">→</span> Australia <span>🇦🇺</span></div>
          <p className="distance">10,000+ km apart</p>
          <h1>For my favourite<br /><em>person to annoy.</em> ❤️</h1>
          <p className="subtext">A tiny Rakhi surprise for my sister, because this year the distance doesn't get to win.</p>
          <motion.button className="primary-btn" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={celebrate}>
            <Gift size={19} /> Open your gift
          </motion.button>
          <button className="scroll-btn" onClick={() => scrollTo('memories')}><ArrowDown size={17} /> there's more</button>
        </motion.div>
      </section>

      <section className="intro section-pad">
        <div className="paper-card">
          <span className="tiny-label">DEAR SIS,</span>
          <h2>Rakhi ka gift parcel mein fit nahi hua…</h2>
          <p>So I made you a little corner of the internet instead. 🥹</p>
          <p>Because no matter how far Australia is, some relationships don't need a flight to feel close.</p>
          <div className="signature">— your annoying brother <Heart size={16} fill="currentColor" /></div>
        </div>
      </section>

      <section id="memories" className="memories section-pad">
        <div className="section-heading"><span>little things</span><h2>Things only <em>we</em> understand.</h2></div>
        <div className="memory-grid">
          {memories.map((item, i) => (
            <motion.article key={item.title} className="memory-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }}>
              <div className="memory-emoji">{item.emoji}</div><h3>{item.title}</h3><p>{item.text}</p><span className="card-number">0{i + 1}</span>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="letter-section section-pad">
        <div className="letter-wrap">
          <div className="letter-top"><span>ONE THING I WANTED TO SAY</span><Heart size={18} fill="currentColor" /></div>
          <h2>Some things are easier<br /><em>to write than say.</em></h2>
          <motion.button className="envelope" onClick={() => setLetterOpen(true)} whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.98 }}>
            <div className="envelope-flap" /><Heart size={42} fill="currentColor" /><span>Open my letter</span>
          </motion.button>
        </div>
      </section>

      <section className="finale section-pad">
        <MapPin size={18} />
        <p>Australia 🇦🇺 ↔ India 🇮🇳</p>
        <h2>Distance: a lot.<br /><em>Love: unlimited.</em></h2>
        <button className="primary-btn" onClick={celebrate}>{opened ? 'Happy Rakhi! ❤️' : 'Send some love ✨'}</button>
        <p className="footer-note">Happy Raksha Bandhan, sis. ❤️</p>
      </section>

      <AnimatePresence>
        {letterOpen && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLetterOpen(false)}>
            <motion.div className="letter-modal" initial={{ opacity: 0, scale: 0.9, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setLetterOpen(false)}><X size={20} /></button>
              <span className="tiny-label">DEAR SIS ❤️</span>
              <h2>To my sister,<br />wherever you are.</h2>
              <p>Australia may be far away, but somehow you are still part of all the little things that make my day.</p>
              <p>We might not be tying a Rakhi in the same room this year, and honestly, I hate that. But I'm lucky enough to call you my sister — and that's something distance can't change.</p>
              <p>Keep chasing your dreams, keep being your weird self, and please remember that your annoying brother is always just a call away. 😂</p>
              <p className="love-line">Happy Raksha Bandhan. Love you always. 🫶</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
