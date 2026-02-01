import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import cat from "./assets/cat.png";

const App = () => {
  const [pets, setPets] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Click the cat to pet it 🐾");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiMessage, setConfettiMessage] = useState("");

  const funnyMessages = [
    "Purrrr 😌",
    "Hey! Watch the whiskers!",
    "Mrrrow~ That’s the spot!",
    "You have been chosen 😼",
    "Human detected. Pets accepted.",
    "Okay okay, I get it!",
    "This is… acceptable.",
    "MORE PETS. NOW.",
    "Excuse me, I was napping.",
    "Oh wow. You’re still here.",
    "Yes… obey the cat.",
    "Careful! This model bites.",
    "You may continue.",
    "I allow this.",
    "Hmm. Suspiciously good petting.",
    "That was a premium pet.",
    "I will remember this.",
    "Wow. Ten out of ten.",
    "Again. Do it again.",
    "My floof thanks you.",
    "Human… you have potential.",
    "This pleases the cat.",
    "You have unlocked chin scratches.",
    "Illegal levels of cuteness detected.",
    "Pet harder. Emotionally.",
    "Watch it!!!",
  ];

  const milestoneMessages = [
    "Keep going, cat champion!",
    "Amazing petting skills!",
    "You’re unstoppable!",
    "The cat appreciates you!",
    "Pawsome job, keep it up!",
    "You’re the purrfect human!",
    "Cats everywhere salute you!",
    "You’ve got the magic touch!",
    "Feline good vibes only!",
    "You’re a petting pro!",
    "Whisker wizard at work!",
    "Tail twitching with joy!",
    "You make the cat smile!",
    "Claws out for you!",
    "Purrfection achieved!",
    "Master of the kitty arts!",
    "You’re on a roll, human!",
    "Keep those pets coming!",
    "Cat’s best friend forever!",
    "You’re the cat’s meow!",
    "Purrs and applause!",
    "Unleash the pet power!",
    "Fur-tastic effort!",
    "You’ve earned a catnap!",
  ];

  const handlePet = () => {
    setPets((prev) => prev + 1);
    const random =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setMessage(random);
    if ((pets + 1) % 10 === 0) {
      const randomMilestone =
        milestoneMessages[Math.floor(Math.random() * milestoneMessages.length)];
      setConfettiMessage(randomMilestone);
      setShowConfetti(true);
      setTimeout(() => {
        setShowConfetti(false);
        setConfettiMessage("");
      }, 3000);
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
    </div>
  );
};

export default App;
