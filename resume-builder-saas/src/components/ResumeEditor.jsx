import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import useResumeStore from '../state/resumeStore';

const ResumeEditor = () => {
  const { resumeData, setResumeData } = useResumeStore();

  const makeEditor = (key) =>
    useEditor({
      extensions: [
        StarterKit.configure({
          bulletList: false,
          orderedList: false,
          listItem: false,
        }),
        TextStyle,
        Color,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
      ],
      content: resumeData[key] || '',
      editorProps: {
        attributes: {
          class: 'border border-gray-300 rounded-md p-3 min-h-[120px] bg-white focus:outline-none',
        },
      },
      onUpdate({ editor }) {
        setResumeData({ [key]: editor.getHTML() });
      },
    });

  const summaryEditor = makeEditor('summary');
  const experienceEditor = makeEditor('experience');
  const projectsEditor = makeEditor('projects');

  const fontSizes = ['12px', '14px', '16px', '18px', '20px'];
  const colors = [
    { label: 'Black', value: '#000000' },
    { label: 'Gray', value: '#4B5563' },
    { label: 'Amber', value: '#d97706' },
    { label: 'Green', value: '#10b981' },
    { label: 'Blue', value: '#3b82f6' },
  ];
  const symbols = ['•', '–', '→', '✓', '★', '⚡'];

  const renderToolbar = (editor) =>
    editor && (
      <div className="flex flex-wrap items-center gap-3 border border-gray-300 p-2 rounded-md bg-gray-50 mb-2">

        {/* Bold / Italic */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 rounded ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>I</button>

        {/* Font Size Dropdown */}
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) =>
            editor.chain().focus().setMark('textStyle', { fontSize: e.target.value }).run()
          }
          defaultValue=""
        >
          <option disabled value="">Font Size</option>
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        {/* Text Align */}
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>⬅️</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>↔️</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`px-2 py-1 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}>➡️</button>

        {/* Text Color Dropdown */}
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
          defaultValue=""
        >
          <option disabled value="">Text Color</option>
          {colors.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        {/* Symbol Insert */}
        <select
          className="border px-2 py-1 rounded"
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().insertContent(e.target.value + ' ').run();
              e.target.value = '';
            }
          }}
          defaultValue=""
        >
          <option disabled value="">Insert Symbol</option>
          {symbols.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    );

  return (
    <div className="space-y-6">
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={resumeData.name || ''}
        onChange={(e) => setResumeData({ name: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
      />

      <div>
        <label className="block font-medium text-gray-700 mb-1">Summary</label>
        {renderToolbar(summaryEditor)}
        <EditorContent editor={summaryEditor} />
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Experience</label>
        {renderToolbar(experienceEditor)}
        <EditorContent editor={experienceEditor} />
      </div>

      <textarea
        name="skills"
        placeholder="Skills (comma separated)"
        value={resumeData.skills || ''}
        onChange={(e) => setResumeData({ skills: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
        rows={2}
      />

      <textarea
        name="education"
        placeholder="Education"
        value={resumeData.education || ''}
        onChange={(e) => setResumeData({ education: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
        rows={2}
      />

      <div>
        <label className="block font-medium text-gray-700 mb-1">Projects</label>
        {renderToolbar(projectsEditor)}
        <EditorContent editor={projectsEditor} />
      </div>

      <textarea
        name="certifications"
        placeholder="Certifications"
        value={resumeData.certifications || ''}
        onChange={(e) => setResumeData({ certifications: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
        rows={2}
      />
      <textarea
        name="awards"
        placeholder="Awards"
        value={resumeData.awards || ''}
        onChange={(e) => setResumeData({ awards: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
        rows={2}
      />
      <textarea
        name="links"
        placeholder="Links (GitHub, LinkedIn)"
        value={resumeData.links || ''}
        onChange={(e) => setResumeData({ links: e.target.value })}
        className="w-full border border-gray-300 rounded p-3"
        rows={2}
      />
    </div>
  );
};

export default ResumeEditor;
