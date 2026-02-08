export interface Resume {
  id: string;
  name: string;
  type: "Frontend" | "Backend" | "Full Stack" | "UI/UX" | "Other";
  url: string;
  uploadedAt: string;
  fileSize: string;
  isMain: boolean;
}

export const mockResumes: Resume[] = [
  {
    id: "r1",
    name: "Muzahid_FullStack.pdf",
    type: "Full Stack",
    url: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    uploadedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    fileSize: "1.2 MB",
    isMain: true,
  },
  {
    id: "r2",
    name: "Muzahid_Frontend_React.pdf",
    type: "Frontend",
    url: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    uploadedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    fileSize: "980 KB",
    isMain: false,
  },
  {
    id: "r3",
    name: "Muzahid_Backend_Node.pdf",
    type: "Backend",
    url: "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    uploadedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    fileSize: "1.1 MB",
    isMain: false,
  },
];
