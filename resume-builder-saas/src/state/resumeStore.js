import { create } from 'zustand';

const useResumeStore = create((set) => ({
  template: 'column',
  resumeData: {
    name: '',
    summary: '',
    experience: '',
    skills: '',
    education: '',
    projects: '',
    certifications: '',
    links: '',
  },
  setResumeData: (data) => set((state) => ({ resumeData: { ...state.resumeData, ...data } })),
  setTemplate: (template) => set(() => ({ template })),
}));

export default useResumeStore;
