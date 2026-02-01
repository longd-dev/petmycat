import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import cat from "./assets/cat.png";
import Footer from "./components/Footer";
import funnyCatMessages from "./data/funnyCatMessages";
import milestoneMessages from "./data/milestoneMessages";

const App = () => {
  const [pets, setPets] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Click the cat to pet it 🐾");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState("");
  const [catImage, setCatImage] = useState(null);

  const CAT_API_KEY = import.meta.env.VITE_CAT_API_KEY;

  const handlePet = () => {
    setPets((prev) => prev + 1);

    const random =
      funnyCatMessages[Math.floor(Math.random() * funnyCatMessages.length)];
    setMessage(random);

    if ((pets + 1) % 10 === 0) {
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
        .catch(() => {
          console.error("Failed to fetch cat image");
        });
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
          <Confetti />
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
      {/* Cat */}
      <div
        className='text-8xl transition-transform active:scale-90 hover:scale-105 w-60 h-60 relative z-10'
        onClick={handlePet}
      >
        <img src={cat} alt='cat' />
      </div>

      {/* Reaction */}
      <p className='text-xl font-medium text-center'>{message}</p>

      {/* Counter */}
      <p className='text-sm text-gray-500'>Pets: {pets}</p>

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
      <Footer />
    </div>
  );
};

export default App;
