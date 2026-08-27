import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles, MapPin } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Float, Stars, OrbitControls } from '@react-three/drei';
import './styles.css';

function Rakhi3D() {
  return <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
    <ambientLight intensity={2} />
    <pointLight position={[3, 3, 4]} intensity={20} />
    <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh rotation={[0.2, 0.2, 0]}>
        <torusGeometry args={[1.35, 0.16, 32, 96]} />
        <meshStandardMaterial color="#ff6f91" metalness={0.35} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0, 0.05]}>
        <sphereGeometry args={[0.58, 48, 48]} />
        <meshStandardMaterial color="#ffd166" metalness={0.5} roughness={0.18} />
      </mesh>
    </Float>
    <Stars radius={40} depth={20} count={700} factor={3} fade speed={1} />
    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
  </Canvas>;
}

export default function App() {
  const [open, setOpen] = useState(false);
  const celebrate = () => {
    setOpen(true);
    confetti({ particleCount: 180, spread: 100, origin: { y: 0.65 } });
  };
  return <main>
    <section className="hero">
      <div className="aurora" />
      <motion.div className="badge" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <MapPin size={15} /> India 🇮🇳 → Australia 🇦🇺
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .15 }}>
        For my favourite<br /><span>annoying sister. ❤️</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}>
        Distance can change where we are. Never what we are.
      </motion.p>
      <div className="scene"><Rakhi3D /></div>
      <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: .97 }} onClick={celebrate}>
        <Gift size={19} /> Open your Rakhi surprise
      </motion.button>
    </section>

    <section className="story">
      <div className="eyebrow"><Sparkles size={16}/> A tiny corner of the internet, just for you</div>
      <h2>Rakhi ka gift courier se nahi bheja…</h2>
      <p>Kyuki jo gift dena tha, woh parcel mein fit hi nahi hota. 🥹</p>
      <div className="memory-grid">
        {['Our chaos', 'Our memories', 'Our bond'].map((x, i) => <motion.div className="memory" key={x} whileHover={{ y: -7, rotate: i % 2 ? 1 : -1 }}><div className="photo-placeholder">📸</div><strong>{x}</strong><span>Photo yahan daalni hai</span></motion.div>)}
      </div>
    </section>

    <section className="letter">
      <div className="letter-card">
        <Heart fill="currentColor" />
        <h2>Dear Sis,</h2>
        <p>Australia kitna bhi door ho, Rakhi wale din teri kami thodi extra feel hoti hai.</p>
        <p>Hum roz baat karein ya na karein, tu meri life ka woh part hai jo distance se kabhi door nahi ho sakta.</p>
        <p>Khush reh, apne dreams chase kar — aur haan, kabhi kabhi apne bhai ko yaad bhi kar liya kar. 😂</p>
        <b>Happy Raksha Bandhan ❤️</b>
        <small>— Tera Bhai</small>
      </div>
    </section>

    {open && <motion.div className="modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setOpen(false)}>
      <motion.div className="modal-card" initial={{ scale: .7, rotate: -5 }} animate={{ scale: 1, rotate: 0 }} onClick={e => e.stopPropagation()}>
        <div className="big-rakhi">🧿</div><h2>Distance: 10,000+ km</h2><div className="infinity">∞ ❤️</div><p>Bond: forever.</p><button onClick={() => setOpen(false)}>Okay, emotional kar diya 🥹</button>
      </motion.div>
    </motion.div>}
  </main>;
}
