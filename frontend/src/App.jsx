import React, { useState } from "react";
import { motion } from "framer-motion";
import cat from "./assets/cat.png";

const App = () => {
  const [pets, setPets] = useState(0);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [message, setMessage] = useState("Click the cat to pet it 🐾");

  const getMood = () => {
    if (pets < 5) return "😐 The cat is watching you...";
    if (pets < 10) return "😸 The cat is happy!";
    return "😻 The cat loves you!";
  };

  const funnyMessages = [
    "Purrrr 😌",
    "Hey! Watch the whiskers!",
    "Mrrrow~ That’s the spot!",
    "You have been chosen 😼",
    "Human detected. Pets accepted.",
    "Okay okay, I get it!",
    "This is… acceptable.",
    "MORE PETS. NOW.",
  ];

  const handlePet = () => {
    setPets((prev) => prev + 1);
    const random =
      funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
    setMessage(random);
  };

  return (
    <div
      className='min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4 relative overflow-hidden cursor-none'
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
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
