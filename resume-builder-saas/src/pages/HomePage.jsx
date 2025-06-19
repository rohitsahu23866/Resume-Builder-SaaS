import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-50 to-blue-100 p-6">
      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center flex-grow">
        <div className="bg-white shadow-xl rounded-xl p-10 max-w-xl w-full transition-all duration-300">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4 animate-fade-in">
            Resume Builder SaaS
          </h1>
          <p className="text-gray-600 text-md md:text-lg mb-8">
            Build, preview, and export beautiful resumes — all in your browser.
          </p>
          <button
            onClick={() => navigate('/build')}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 text-lg rounded-md font-semibold shadow-md transition-all"
          >
            🚀 Start Building
          </button>
        </div>

        {/* About Section */}
        <section className="mt-12 max-w-3xl text-left text-gray-700 bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-2 text-blue-600">About This SaaS</h2>
          <p className="mb-2">
            Resume Builder SaaS is a free, no-login tool that lets you create modern, professional resumes in minutes.
            Enjoy real-time previewing, customization, and one-click PDF export.
          </p>
          <p>
            Built with <span className="font-semibold">React</span>, <span className="font-semibold">Tailwind CSS</span>,
            and <span className="font-semibold">TipTap Editor</span>, it's fully open-source and optimized for job-seekers and freelancers.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 text-center text-gray-600 text-sm border-t border-gray-300 pt-4">
        <p className="mb-2">Made with 💙 by Susheel Sahu</p>
        <div className="flex justify-center gap-4 text-blue-600 text-lg">
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin-id"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-800 transition"
          >
            LinkedIn
          </a>
        </div>
        <p className="mt-2 text-xs text-gray-500">© 2025 Resume Builder SaaS. All rights reserved.</p>
      </footer>
    </div>
  );
}
