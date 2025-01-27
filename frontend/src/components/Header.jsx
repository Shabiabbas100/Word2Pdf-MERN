import React from 'react'

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 h-16 w-full fixed top-0 flex justify-center items-center shadow-lg px-4 md:px-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white flex space-x-1 md:space-x-2">
        {Array.from("Word To PDF Converter").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-500 hover:-translate-y-1 hover:text-yellow-300 ${
              index % 2 === 0 ? "rotate-2" : "-rotate-2"
            }`}
          >
            {char}
          </span>
        ))}
      </h1>
    </header>
  );
};

export default Header;
