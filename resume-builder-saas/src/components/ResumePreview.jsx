import React, { forwardRef } from 'react';
import useResumeStore from '../state/resumeStore';

const ResumePreview = forwardRef((_, ref) => {
  const { resumeData, template } = useResumeStore();

  const dataBlock = (title, value, isHTML = false) =>
    value && (
      <div className="mb-4">
        <h3 className="text-md font-bold">{title}</h3>
        {isHTML ? (
          <div className="text-sm text-gray-700" dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <p className="text-sm text-gray-700 whitespace-pre-line">{value}</p>
        )}
      </div>
    );

  return (
    <div ref={ref} className="border border-gray-300 rounded p-6 shadow bg-gray-50 h-full w-full">
      <h2 className="text-2xl font-bold text-blue-700">{resumeData.name || 'Your Name'}</h2>
      {dataBlock('Summary', resumeData.summary, true)}
      <div className={`grid ${template === 'column' ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {dataBlock('Experience', resumeData.experience, true)}
        {dataBlock('Skills', resumeData.skills)}
        {dataBlock('Education', resumeData.education)}
        {dataBlock('Projects', resumeData.projects, true)}
        {dataBlock('Certifications', resumeData.certifications)}
        {dataBlock('Awards', resumeData.awards)}
        {dataBlock('Links', resumeData.links)}
      </div>
    </div>
  );
});

export default ResumePreview;
