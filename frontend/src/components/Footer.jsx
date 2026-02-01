import React from "react";
import { FaCat, FaCommentDots } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className='mt-12 border-t border-gray-200'
      style={{ background: "linear-gradient(to bottom, #ede7f6, #d6d0e3)" }}
    >
      <div className='mx-auto max-w-5xl px-4 py-6'>
        <div className='flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:text-left'>
          <p className='text-sm text-gray-600'>
            <span className='font-medium flex items-center gap-2'>
              <FaCat className='hover:scale-105' /> Pet-The-Cat
            </span>
            <span className='block sm:inline'>
              {" "}
              built for fun, clicks, and good vibes
            </span>
          </p>

          <div className='flex flex-col items-center sm:items-end gap-1'>
            <span className='text-xs sm:text-sm text-gray-400 italic'>
              Keep going. The cat believes in you.
            </span>
            <a
              href='https://docs.google.com/forms/d/1q_OT40g10jqze1eknJHt2hM8untp5o0hKvPr6wkVogc/edit'
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-1 text-xs sm:text-sm text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors'
            >
              <FaCommentDots className='hover:scale-105' /> Send feedback /
              report a bug
            </a>
          </div>
        </div>
        <p className='mt-4 text-center text-xs text-gray-400'>
          © {new Date().getFullYear()} Pet-The-Cat. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
