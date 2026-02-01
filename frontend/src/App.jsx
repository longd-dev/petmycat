import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import cat from "./assets/cat.webp";
import Footer from "./components/Footer";
import funnyCatMessages from "./data/funnyCatMessages";
import milestoneMessages from "./data/milestoneMessages";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import meow1 from "./assets/meows/meow1.mp3";
import meow2 from "./assets/meows/meow2.mp3";
import meow3 from "./assets/meows/meow3.mp3";
import meow4 from "./assets/meows/meow4.mp3";
import meow5 from "./assets/meows/meow5.mp3";
import meow6 from "./assets/meows/meow6.mp3";
import meow7 from "./assets/meows/meow7.mp3";
import meow8 from "./assets/meows/meow8.mp3";
import meow9 from "./assets/meows/meow9.mp3";
import meow10 from "./assets/meows/meow10.mp3";
import meow11 from "./assets/meows/meow11.mp3";
import meow12 from "./assets/meows/meow12.mp3";
import meow13 from "./assets/meows/meow13.mp3";
import meow14 from "./assets/meows/meow14.mp3";

// Add your 6 meows here
const meows = [
  meow1,
  meow2,
  meow3,
  meow4,
  meow5,
  meow6,
  meow7,
  meow8,
  meow9,
  meow10,
  meow11,
  meow12,
  meow13,
  meow14,
];

const App = () => {
  const [pets, setPets] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Click the cat to pet it 🐾");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState("");
  const [catImage, setCatImage] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

  const handlePet = () => {
    const newPets = pets + 1;
    setPets(newPets);

    // Random funny message
    const random =
      funnyCatMessages[Math.floor(Math.random() * funnyCatMessages.length)];
    setMessage(random);

    // Play a random meow every 5 clicks
    if (newPets % 5 === 0 && !isMuted) {
      const randomIndex = Math.floor(Math.random() * meows.length);
      const audio = new Audio(meows[randomIndex]);
      audio.play();
    }

    // Milestone logic every 10 clicks
    if (newPets % 10 === 0) {
      const randomMilestone =
        milestoneMessages[Math.floor(Math.random() * milestoneMessages.length)];
      setConfettiMessage(randomMilestone);
      setShowConfetti(true);

      fetch("https://api.thecatapi.com/v1/images/search", {
        headers: {
          "x-api-key": CAT_API_KEY,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data[0]?.url) {
            setCatImage(data[0].url);
          }
        })
        .catch(() => console.error("Failed to fetch cat image"));

      setTimeout(() => {
        setShowConfetti(false);
        setConfettiMessage("");
      }, 6000);
    }
  };

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4 relative overflow-hidden cursor-none'
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      {showConfetti && (
        <div className='fixed top-0 left-0 w-full flex flex-col items-center z-50 pointer-events-none select-none'>
          <Confetti width={window.innerWidth} height={window.innerHeight} />
          <AnimatePresence>
            {confettiMessage && (
              <motion.div
                className='mt-4 text-3xl font-bold text-center text-gray-900 drop-shadow-lg'
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {confettiMessage}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      <motion.div
        className='fixed top-0 left-0 text-3xl pointer-events-none select-none z-50'
        animate={{
          x: cursor.x + 4,
          y: cursor.y + 4,
          rotate: -10,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
      >
        🤚
      </motion.div>

      {/* Milestone Cat Image */}
      {catImage && (
        <div className='mt-4 w-40 h-40 relative z-10'>
          <img
            src={catImage}
            alt='milestone cat'
            className='w-full h-full object-cover rounded-xl shadow-lg'
          />
        </div>
      )}

      {/* Cat */}
      <motion.div
        className='w-60 h-60 relative z-10'
        onClick={handlePet}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <img src={cat} alt='cat' />
      </motion.div>

      {/* Reaction */}
      <p className='text-xl font-medium text-center'>{message}</p>

      {/* Counter */}
      <p className='text-sm text-gray-500'>Pets: {pets}</p>
      <p className='text-sm text-gray-500 text-center'>
        This site has sound effects. Click the button to mute or unmute.
      </p>
      <motion.button
        onClick={() => setIsMuted(!isMuted)}
        className='mt-2 px-4 py-2 bg-gray-300 rounded flex items-center gap-2 hover:bg-gray-400'
        whileHover={{ scale: 1.1, backgroundColor: "#d1d5db" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {isMuted ? (
          <>
            <FaVolumeMute size={20} />
          </>
        ) : (
          <>
            <FaVolumeUp size={20} />
          </>
        )}
      </motion.button>
      <Footer />
    </div>
  );
};

export default App;
