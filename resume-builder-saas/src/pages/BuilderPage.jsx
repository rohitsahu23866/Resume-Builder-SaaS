import React, { useRef } from 'react';
import ResumeEditor from '../components/ResumeEditor';
import ResumePreview from '../components/ResumePreview';
import TemplateSwitcher from '../components/TemplateSwitcher';
import html2pdf from 'html2pdf.js';

export default function BuilderPage() {
  const printRef = useRef();

  const handleDownloadPDF = async () => {
  const element = printRef.current;
  if (!element) return;

  const html = `
    <html><head><style>body{font-family:sans-serif}</style></head><body>${element.innerHTML}</body></html>
  `;

  const toast = document.createElement('div');
  toast.textContent = 'Generating PDF...';
  toast.className = 'fixed bottom-6 right-6 bg-gray-800 text-white px-4 py-2 rounded shadow z-50';
  document.body.appendChild(toast);

  try {
    const res = await fetch('http://localhost:5000/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ html, fileName: 'My_Resume' }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'My_Resume.pdf';
    a.click();
    URL.revokeObjectURL(url);

    toast.textContent = 'Download Complete ✅';
  } catch (err) {
    console.error(err);
    toast.textContent = 'Download Failed ❌';
  }

  setTimeout(() => toast.remove(), 3000);
};



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 rounded-xl shadow-lg bg-white p-6 md:p-10 transition-all duration-300 ease-in-out">
        {/* Editor Side */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Resume Builder</h1>
          <p className="text-gray-600 text-sm">Fill in your details and preview your resume on the right.</p>
          <ResumeEditor />
          <TemplateSwitcher />
          <button
            onClick={handleDownloadPDF}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 active:scale-95 text-white py-3 rounded-md font-semibold shadow-md transition-all"
          >
            📄 Download as PDF
          </button>
        </div>

        {/* Preview Side */}
        <div className="border border-gray-200 rounded-xl shadow-inner p-4 md:p-6 bg-white overflow-auto">
          <ResumePreview ref={printRef} />
        </div>
      </div>
    </div>
  );
}
