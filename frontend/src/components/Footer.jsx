import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold">Shabi Abbas</h2>
        <p className="mt-2">shabiabbas100@gmail.com</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://www.linkedin.com/in/shabi-abbas-318a54238/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Shabiabbas100"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500"
          >
            Twitter
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Shabi Abbas. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
