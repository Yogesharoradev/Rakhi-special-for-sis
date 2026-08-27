import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function MemoryStory({ memory, index, total, onBack, onPrev, onNext }) {
  if (!memory) return null;
  return (
    <motion.section className="memory-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <button className="memory-back" onClick={onBack}><ArrowLeft size={17}/> Back to our memories</button>
      <div className="memory-page-grid">
        <motion.div className="memory-page-photo" initial={{ scale: 1.08, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .9 }}>
          <img src={memory.image} alt={memory.title}/>
          <div className="memory-page-number">{String(index + 1).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
        </motion.div>
        <article className="memory-page-copy">
          <motion.span initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.2}}>{memory.kicker}</motion.span>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.3}}>{memory.emoji} {memory.title}</motion.h1>
          <motion.div className="story-rule" initial={{scaleX:0}} animate={{scaleX:1}} transition={{delay:.4,duration:.6}}/>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.5}}>{memory.text}</motion.p>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.65}}>{memory.detail}</motion.p>
          <motion.p initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} transition={{delay:.8}}>And maybe that is what I wanted this page to remind you of: we do not need every moment to be extraordinary. We just need to keep making ordinary moments worth remembering. Wherever life takes us next, there will always be another chapter waiting for us.</motion.p>
          <div className="memory-heart"><Heart size={18} fill="currentColor"/> Still us. Always.</div>
          <div className="memory-page-nav"><button disabled={index===0} onClick={onPrev}><ChevronLeft size={17}/> Previous</button><span>{index + 1} of {total}</span><button disabled={index===total-1} onClick={onNext}>Next <ChevronRight size={17}/></button></div>
        </article>
      </div>
    </motion.section>
  );
}
