import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Gift,
  Heart,
  Volume2,
  VolumeX,
  MapPin,
  Sparkles,
  ArrowDown,
  X,
  Plane,
  LockKeyhole,
  ChevronRight,
  ChevronLeft,
  Camera,
  Star,
} from "lucide-react";
import "./styles-cinematic.css";

const memories = [
  {
    image:
      "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=85",
    emoji: "😂",
    title: "The chaos years",
    kicker: "CHAPTER 01",
    text: "There was a time when our biggest problems were who got the TV remote, who ate the last piece of something, and who was going to tell Mom that the other one did it. Looking back, those tiny fights were never really about the thing we were fighting over. They were just our weird little way of growing up together.",
    detail:
      "I still remember how quickly a normal afternoon could turn into an argument and, somehow, five minutes later, we would be laughing about something completely unrelated. That is one of the things I miss most — not one particular day, but the feeling that you were always there in the next room.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=1200&q=85",
    emoji: "📸",
    title: "Growing up",
    kicker: "CHAPTER 02",
    text: "Somewhere between the silly fights and the ordinary days, we grew up. School changed, routines changed, life got busier, and suddenly the things that felt normal became memories. We never really noticed the transition while it was happening.",
    detail:
      "If someone had told me back then that I would someday look at those ordinary moments and miss them, I probably would not have believed them. But that is what happens with family. The boring days become the golden ones because they were ours.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1200&q=85",
    emoji: "🤫",
    title: "Our secret language",
    kicker: "CHAPTER 03",
    text: "Every sibling relationship has a collection of references that make absolutely no sense to anyone else. A look across a room. One random word. A stupid joke from years ago. Somehow we can still pick up the conversation exactly where we left it.",
    detail:
      "There are things I could explain to another person for ten minutes and they still would not understand why they are funny. With you, I do not have to explain anything. You just get it. And honestly, that kind of understanding is pretty special.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=85",
    emoji: "🫶",
    title: "Miles apart",
    kicker: "CHAPTER 04",
    text: "Then came Australia. A new country, new people, new routines and a completely different side of life for you. I am genuinely proud of you for building your own world there. But I would be lying if I said the distance never feels strange.",
    detail:
      "There are moments when I instinctively want to tell you something and then remember that you are on the other side of the world. The good thing is that distance only changed the geography. It never changed the relationship. You are still my sister, still annoying, still loved, and still only one call away.",
  },
];
const chapters = [
  ["The beginning", "Two kids. One home. Unlimited nonsense."],
  [
    "The middle",
    "Fights, laughter, secrets, celebrations and ordinary days that became memories.",
  ],
  [
    "The distance",
    "You went to Australia and started writing a new chapter of your life.",
  ],
  ["Right now", "Different time zones. Same family. Same bond."],
  [
    "Always",
    "No matter where either of us ends up, that part will never change.",
  ],
];

function Rakhi3D() {
  const group = useRef(),
    gem = useRef();
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.24;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.7) * 0.09;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.1) * 0.15;
    if (gem.current) gem.current.rotation.z += delta * 0.55;
  });
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2;
    return (
      <mesh
        key={i}
        position={[Math.cos(a) * 0.68, Math.sin(a) * 0.68, 0]}
        scale={[0.3, 0.15, 0.1]}
        rotation={[0, 0, a]}
      >
        <sphereGeometry args={[1, 20, 14]} />
        <meshStandardMaterial
          color="#d66f88"
          roughness={0.28}
          metalness={0.25}
        />
      </mesh>
    );
  });
  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[1.3, 0.085, 24, 96]} />
        <meshStandardMaterial
          color="#e4a3b1"
          roughness={0.22}
          metalness={0.5}
        />
      </mesh>
      {petals}
      <mesh ref={gem} position={[0, 0, 0.18]}>
        <icosahedronGeometry args={[0.43, 2]} />
        <meshStandardMaterial
          color="#f4ca67"
          roughness={0.14}
          metalness={0.8}
          emissive="#7a4f10"
          emissiveIntensity={0.12}
        />
      </mesh>
      <mesh position={[0, 0, 0.5]}>
        <sphereGeometry args={[0.105, 20, 20]} />
        <meshStandardMaterial
          color="#fff4ca"
          emissive="#ffd66e"
          emissiveIntensity={1.1}
        />
      </mesh>
    </group>
  );
}
function Particles() {
  const ref = useRef(),
    count = 130,
    positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.032} color="#e6a9b7" transparent opacity={0.72} />
    </points>
  );
}
function ThreeScene() {
  return (
    <div className="three-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.6], fov: 42 }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.8} />
        <pointLight position={[3, 4, 4]} intensity={17} color="#ffd9e1" />
        <pointLight position={[-4, -2, 2]} intensity={10} color="#ffe4a8" />
        <Rakhi3D />
        <Particles />
      </Canvas>
    </div>
  );
}
function PhotoCard({ item, index, onOpen }) {
  return (
    <motion.button
      className="photo-card"
      onClick={() => onOpen(index)}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, rotate: index % 2 ? 1 : -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="photo-frame">
        <img src={item.image} alt={item.title} />
        <div className="photo-overlay">
          <Camera size={18} />
          <span>Open this memory</span>
        </div>
      </div>
      <div className="photo-meta">
        <span>{item.kicker}</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <ChevronRight size={17} />
      </div>
    </motion.button>
  );
}
export default function App() {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false),
    [muted, setMuted] = useState(false),
    [letterOpen, setLetterOpen] = useState(false),
    [memory, setMemory] = useState(null),
    [progress, setProgress] = useState(0);
  useEffect(() => {
    const f = () => {
      const m = document.documentElement.scrollHeight - innerHeight;
      setProgress(m > 0 ? (scrollY / m) * 100 : 0);
    };
    addEventListener("scroll", f, { passive: true });
    f();
    return () => removeEventListener("scroll", f);
  }, []);
  const start = async () => {
    setStarted(true);
    try {
      audioRef.current.volume = 0.52;
      await audioRef.current.play();
    } catch {}
    confetti({
      particleCount: 150,
      spread: 100,
      startVelocity: 28,
      origin: { y: 0.72 },
    });
  };
  const toggle = async () => {
    if (!started) await start();
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setMuted(audioRef.current.muted);
  };
  const celebrate = () =>
    confetti({
      particleCount: 240,
      spread: 120,
      startVelocity: 34,
      scalar: 1.05,
      origin: { y: 0.62 },
    });
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <main>
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        loop
        preload="auto"
      />
      <div className="scroll-progress">
        <span style={{ width: `${progress}%` }} />
      </div>
      <AnimatePresence>
        {!started && (
          <motion.div
            className="welcome"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, pointerEvents: "none" }}
          >
            <motion.div
              className="welcome-card"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.7 }}
            >
              <span className="tiny-label">A LITTLE SOMETHING FROM HOME</span>
              <div className="welcome-rakhi">🧿</div>
              <p>For my sister, all the way in Australia 🇦🇺</p>
              <h1>Put your headphones on.</h1>
              <p className="welcome-sub">
                Do not rush this. I made a whole little journey for you.
              </p>
              <button className="primary-btn" onClick={start}>
                <Heart size={18} fill="currentColor" /> Enter your surprise
              </button>
              <small>Music starts when you enter ♫</small>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <button className="sound-btn" onClick={toggle}>
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <section className="hero">
        <ThreeScene />
        <div className="hero-glow" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 1 }}
        >
          <div className="eyebrow">
            🇮🇳 India <span>→</span> Australia 🇦🇺
          </div>
          <p className="distance">10,000+ km apart · one family</p>
          <h1>
            For my favourite
            <br />
            <em>person to annoy.</em> ❤️
          </h1>
          <p className="subtext">
            This is not really a website. Think of it as a tiny trip through all
            the things I could not fit into a WhatsApp message.
          </p>
          <motion.button
            className="primary-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => scrollTo("story")}
          >
            <Sparkles size={18} /> Start the story
          </motion.button>
          <button className="scroll-btn" onClick={() => scrollTo("story")}>
            <ArrowDown size={17} /> take your time
          </button>
        </motion.div>
      </section>
      <section id="story" className="intro section-pad">
        <div className="story-intro">
          <span className="tiny-label">BEFORE WE GO ANYWHERE</span>
          <h2>
            Some people are part of your life.
            <br />
            <em>Some people are part of your story.</em>
          </h2>
          <p>And you are both.</p>
          <div className="long-copy">
            <p>
              When you grow up with someone, you do not realise how many tiny
              pieces of your life you are collecting together. A random
              afternoon. A family function. A stupid argument. A joke that
              stopped being funny years ago but somehow still makes both of you
              laugh. None of those moments feels important while you are living
              them.
            </p>
            <p>
              Then one day, there are thousands of kilometres between you, and
              you realise those ordinary moments were actually the extraordinary
              part.
            </p>
          </div>
          <button className="text-btn" onClick={() => scrollTo("memories")}>
            Let's go back for a minute <ChevronRight size={16} />
          </button>
        </div>
      </section>
      <section id="memories" className="memories section-pad">
        <div className="section-heading">
          <span>CHAPTERS 01—04</span>
          <h2>
            Click a photo.
            <br />
            <em>Stay for the story.</em>
          </h2>
          <p>Each one opens into a full memory.</p>
        </div>
        <div className="photo-grid">
          {memories.map((x, i) => (
            <PhotoCard key={x.title} item={x} index={i} onOpen={setMemory} />
          ))}
        </div>
      </section>
      <section className="chapter-section section-pad">
        <div className="section-heading">
          <span>THE BIGGER PICTURE</span>
          <h2>
            Five chapters.
            <br />
            <em>One ridiculous bond.</em>
          </h2>
        </div>
        <div className="chapter-list">
          {chapters.map(([t, d], i) => (
            <motion.div
              className="chapter-row"
              key={t}
              initial={{ opacity: 0, x: -25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="chapter-num">0{i + 1}</div>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
              <Star size={16} />
            </motion.div>
          ))}
        </div>
      </section>
      <section className="timeline-section section-pad">
        <div className="section-heading">
          <span>FROM THEN TO NOW</span>
          <h2>
            Life changed.
            <br />
            <em>We did too.</em>
          </h2>
        </div>
        <div className="timeline">
          {chapters.map(([year, text], i) => (
            <motion.div
              className="timeline-item"
              key={year}
              initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="timeline-dot" />
              <div>
                <span>{year}</span>
                <p>{text}</p>
                <p className="timeline-extra">
                  Some chapters were loud, some quiet. All of them are ours.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="fun-section section-pad">
        <div className="section-heading">
          <span>OFFICIAL SIBLING REPORT</span>
          <h2>
            Proof that you're <em>actually annoying.</em> 😂
          </h2>
          <p>Unfortunately, I still love you.</p>
        </div>
        <div className="fun-grid">
          {[
            ["Steals my stuff", "GUILTY"],
            ["Says “2 minutes”", "NEVER 2 MINUTES"],
            ["Calls when she needs something", "🤨 SUS"],
            ["Wins arguments somehow", "HOW?!"],
            ["Laughs at her own jokes", "LOUDLY"],
            ["Still my favourite person", "UNFORTUNATELY ❤️"],
          ].map(([a, b], i) => (
            <motion.div
              className="fun-card"
              key={a}
              whileHover={{ rotate: i % 2 ? -2 : 2, y: -6 }}
            >
              <span>0{i + 1}</span>
              <h3>{a}</h3>
              <strong>{b}</strong>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="map-section section-pad">
        <div className="globe-wrap">
          <div className="globe">
            <div className="india-pin">🇮🇳</div>
            <div className="australia-pin">🇦🇺</div>
            <div className="flight-line">
              <Plane size={18} />
            </div>
          </div>
        </div>
        <div className="map-copy">
          <span className="tiny-label">THE DISTANCE</span>
          <h2>
            Different skies.
            <br />
            <em>Same home.</em>
          </h2>
          <p>
            There are days when the distance is just a number. And there are
            days when it feels very real. But every call, every photo, every
            “how are you?” makes the map feel a little smaller.
          </p>
          <p>
            Australia is where you are building your life. Home is still
            wherever our people are.
          </p>
          <div className="route">
            <MapPin size={15} /> INDIA <span>──────── ✈ ────────</span>{" "}
            AUSTRALIA
          </div>
        </div>
      </section>
      <section className="letter-section section-pad">
        <div className="letter-wrap">
          <div className="letter-top">
            <span>A MESSAGE FROM HOME</span>
            <Sparkles size={18} />
          </div>
          <h2>
            Some things are easier
            <br />
            <em>to write than say.</em>
          </h2>
          <p className="letter-lead">
            There are a few paragraphs I wanted you to actually sit and read.
          </p>
          <motion.button
            className="envelope"
            onClick={() => setLetterOpen(true)}
            whileHover={{ scale: 1.025, rotate: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="envelope-flap" />
            <Heart size={42} fill="currentColor" />
            <span>Open my letter</span>
          </motion.button>
        </div>
      </section>
      <section className="finale section-pad">
        <MapPin size={18} />
        <p>Australia 🇦🇺 ↔ India 🇮🇳</p>
        <h2>
          Distance: a lot.
          <br />
          <em>Love: unlimited.</em>
        </h2>
        <p className="final-copy">
          If you ever miss home, come back to this little page. It will still be
          here.
        </p>
        <motion.button
          className="primary-btn"
          whileHover={{ scale: 1.06 }}
          onClick={celebrate}
        >
          Happy Rakhi ❤️
        </motion.button>
        <p className="footer-note">Made with ❤️ by your annoying brother.</p>
      </section>
      <AnimatePresence>
        {memory !== null && (
          <motion.div
            className="memory-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="memory-modal"
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <button className="close-btn" onClick={() => setMemory(null)}>
                <X size={20} />
              </button>
              <div className="memory-modal-image">
                <img src={memories[memory].image} alt="" />
              </div>
              <div className="memory-modal-copy">
                <span>{memories[memory].kicker}</span>
                <h2>{memories[memory].title}</h2>
                <p>{memories[memory].text}</p>
                <p>{memories[memory].detail}</p>
                <div className="memory-nav">
                  <button
                    disabled={memory === 0}
                    onClick={() => setMemory(memory - 1)}
                  >
                    <ChevronLeft size={16} /> Previous
                  </button>
                  <strong>
                    {memory + 1} / {memories.length}
                  </strong>
                  <button
                    disabled={memory === memories.length - 1}
                    onClick={() => setMemory(memory + 1)}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {letterOpen && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLetterOpen(false)}
          >
            <motion.div
              className="letter-modal"
              initial={{ opacity: 0, scale: 0.88, y: 28 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setLetterOpen(false)}
              >
                <X size={20} />
              </button>
              <span className="tiny-label">DEAR SIS ❤️</span>
              <h2>
                To my sister,
                <br />
                wherever you are.
              </h2>
              <p>
                Australia may be far away, but somehow you are still part of all
                the little things that make my day. That is the strange thing
                about family: distance can change your routine without changing
                your place in each other's lives.
              </p>
              <p>
                We might not be tying a Rakhi in the same room this year, and
                honestly, I hate that. I miss the easy version of being together
                — the version where seeing you did not require a phone, a Wi-Fi
                connection or checking a time zone.
              </p>
              <p>
                But I am also incredibly proud of you. You went somewhere new,
                built a life, handled the difficult days and kept moving
                forward. I hope you know that from here, I am always cheering
                for you.
              </p>
              <p>
                So keep chasing your dreams, keep being your weird self, call
                home when you feel like it, and remember that your annoying
                brother is always only a call away. 😂
              </p>
              <p className="love-line">
                Happy Raksha Bandhan. Love you always. 🫶
              </p>
              <button
                className="letter-close"
                onClick={() => setLetterOpen(false)}
              >
                <LockKeyhole size={15} /> Keep this between us
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
