import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, Heart, MapPin, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import './styles.css';

const memories = [
  ['😂', 'Our chaos', 'The jokes, fights and nonsense that only we understand.'],
  ['📸', 'Our memories', 'A few more photos will turn this into our little scrapbook.'],
  ['🤫', 'Our secrets', 'Some stories are permanently classified between siblings.'],
  ['🫶', 'Our bond', 'Australia can be far away. Our bond is not.'],
];

function Rakhi3D() {
  const group = useRef();
  const bead = useRef();
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.32;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.8) * 0.12;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.2) * 0.18;
    if (bead.current) bead.current.rotation.z += delta * 0.6;
  });

  const petals = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return <mesh key={i} position={[Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0]} scale={[0.34, 0.18, 0.12]} rotation={[0, 0, a]}>
      <sphereGeometry args={[1, 24, 16]} />
      <meshStandardMaterial color="#d86f87" roughness={0.3} metalness={0.2} />
    </mesh>;
  });

  return <group ref={group}>
    <mesh rotation={[0, 0, 0]}>
      <torusGeometry args={[1.25, 0.09, 24, 96]} />
      <meshStandardMaterial color="#e2a1b0" roughness={0.25} metalness={0.45} />
    </mesh>
    {petals}
    <mesh ref={bead} position={[0, 0, 0.18]}>
      <icosahedronGeometry args={[0.42, 2]} />
      <meshStandardMaterial color="#f2c766" roughness={0.16} metalness={0.75} />
    </mesh>
    <mesh position={[0, 0, 0.48]}>
      <sphereGeometry args={[0.1, 20, 20]} />
      <meshStandardMaterial color="#fff3c7" emissive="#ffd87a" emissiveIntensity={0.8} />
    </mesh>
  </group>;
}

function Particles() {
  const ref = useRef();
  const count = 90;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.025; });
  return <points ref={ref}><bufferGeometry><bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} /></bufferGeometry><pointsMaterial size={0.035} color="#e5a7b5" transparent opacity={0.75} /></points>;
}

function ThreeScene() {
  return <div className="three-scene" aria-hidden="true"><Canvas camera={{ position: [0, 0, 5.5], fov: 42 }} dpr={[1, 1.5]}>
    <ambientLight intensity={1.8} />
    <pointLight position={[3, 4, 4]} intensity={16} color="#ffd9e1" />
    <pointLight position={[-4, -2, 2]} intensity={9} color="#ffe4a8" />
    <Rakhi3D />
    <Particles />
  </Canvas></div>;
}

export default function App() {
  const celebrate = () => confetti({ particleCount: 180, spread: 110, startVelocity: 32, origin: { y: 0.62 } });
  return <main>
    <section className="hero">
      <ThreeScene />
      <div className="hero-glow" />
      <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <div className="eyebrow">🇮🇳 India <span>→</span> Australia 🇦🇺</div>
        <p className="distance">A Rakhi surprise across the miles</p>
        <h1>For my favourite<br /><em>person to annoy.</em> ❤️</h1>
        <p className="subtext">You are thousands of kilometres away, so I made something that can travel instantly.</p>
        <motion.button className="primary-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }} onClick={celebrate}><Gift size={19} /> Open your surprise</motion.button>
        <p className="scroll-hint">scroll down ↓</p>
      </motion.div>
    </section>

    <section className="intro section-pad"><div className="paper-card">
      <span className="tiny-label">DEAR SIS,</span>
      <h2>Rakhi ka gift courier se nahi bheja…</h2>
      <p>Kyuki jo gift dena tha, woh parcel mein fit hi nahi hota. 🥹</p>
      <p>Isliye ek chhota sa corner of the internet bana diya — sirf tere liye.</p>
      <div className="signature">— tera annoying bhai <Heart size={16} fill="currentColor" /></div>
    </div></section>

    <section className="memories section-pad"><div className="section-heading"><span>OUR LITTLE WORLD</span><h2>Things only <em>we</em> understand.</h2></div>
      <div className="memory-grid">{memories.map(([emoji, title, text], i) => <motion.article key={title} className="memory-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }}>
        <div className="memory-emoji">{emoji}</div><h3>{title}</h3><p>{text}</p><span className="card-number">0{i + 1}</span>
      </motion.article>)}</div>
    </section>

    <section className="letter-section section-pad"><div className="letter-wrap">
      <div className="letter-top"><span>A MESSAGE FROM HOME</span><Sparkles size={18} /></div>
      <h2>Some things are easier<br /><em>to write than say.</em></h2>
      <motion.div className="envelope" whileHover={{ scale: 1.025 }} whileTap={{ scale: .98 }} onClick={celebrate}>
        <div className="envelope-flap" /><Heart size={42} fill="currentColor" /><span>Tap for a little love ❤️</span>
      </motion.div>
    </div></section>

    <section className="finale section-pad"><MapPin size={18} /><p>Australia 🇦🇺 ↔ India 🇮🇳</p><h2>Distance: a lot.<br /><em>Love: unlimited.</em></h2><button className="primary-btn" onClick={celebrate}>Send some love ✨</button><p className="footer-note">Happy Raksha Bandhan, sis. ❤️</p></section>
  </main>;
}
