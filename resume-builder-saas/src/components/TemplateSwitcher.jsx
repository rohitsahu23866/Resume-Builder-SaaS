import React from 'react';
import useResumeStore from '../state/resumeStore';

export default function TemplateSwitcher() {
  const { template, setTemplate } = useResumeStore();

  return (
    <div className="mt-4">
      <label className="mr-3 font-medium text-gray-700">Template:</label>
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="border rounded p-2"
      >
        <option value="column">Column Layout</option>
        <option value="row">Row Layout</option>
      </select>
    </div>
  );
}
