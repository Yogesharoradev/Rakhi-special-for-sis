import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

export default function LoveYouSection() {
  return (
    <section id="love-you" className="love-you-section section-pad">
      <motion.div
        className="love-you-card"
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="love-you-heart"><Heart size={30} fill="currentColor" /></div>
        <span className="tiny-label">ONE LAST THING</span>
        <h2>We love you <em>a lot.</em></h2>
        <h3>And miss you even more. ❤️</h3>
        <p>
          Australia kitna bhi door ho, hum dono ke liye tu kabhi door nahi hogi. Kabhi kabhi bas mann karta hai ki ek baar phir wohi ghar ho, hum teen ek jagah baithe ho, bina kisi plan ke baatein kar rahe ho aur kisi stupid si baat pe has rahe ho.
        </p>
        <p>
          Tu apni life, apne dreams aur apni duniya build kar rahi hai — aur hum dono bhai yahan se har step par tere liye proud hain. Bas itna yaad rakhna: chahe kitne bhi kilometres beech mein aa jaayein, <strong>hum teen hamesha hum teen hi rahenge.</strong>
        </p>
        <div className="love-you-signoff">
          <Sparkles size={17} />
          <span>Love you loads, choti. — Your two annoying brothers ❤️</span>
          <Sparkles size={17} />
        </div>
      </motion.div>
    </section>
  );
}
