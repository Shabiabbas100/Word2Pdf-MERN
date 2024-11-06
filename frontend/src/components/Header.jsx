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





// const Header = () => {
//   return (
//     <header className=" bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white fixed top-0 left-0 w-full py-4 shadow-lg z-50">
//       <div className="container mx-auto text-center">
//         <h1 className="text-4xl font-extrabold tracking-widest">
//           <span className="text-yellow-300">W</span>
//           <span className="text-red-300">o</span>
//           <span className="text-green-300">r</span>
//           <span className="text-blue-300">d</span>
//           <span className="mx-2 text-gray-200 italic">To</span>
//           <span className="text-yellow-400">P</span>
//           <span className="text-purple-300">D</span>
//           <span className="text-pink-300">F</span>
//           <span className="ml-2 text-gray-100 font-light tracking-wide">
//             Converter
//           </span>
//         </h1>
//       </div>
//     </header>
//   );
// };






//  {
//    /* hover:scale-125 - isse hover karne pe bada ho jayega */
//  }
// {
//   /* max-w-screen-2xl - looks good on big screen as well
//        container - makes responsive 
//         shadow-lg - isse shadow aa gaya line me neeche
//         */
// }

// <div className="max-w-screen-2xl mx-auto container px-6 py-3 md:px-40 shadow-lg h-16 fixed">
    //   <div className="flex justify-between">
    //     <h1 className="text-2xl cursor-pointer font-bold">
    //       Word<span className="text-3xl text-red-500">To</span>PDF
    //     </h1>
    //     <h1 className="mt-1 text-2xl cursor-pointer font-bold hover:scale-125 duration-300">
    //       h<span className="text-blue-500">O</span>m
    //       <span className="text-blue-500">e</span>
    //     </h1>
    //   </div>
    // </div>
