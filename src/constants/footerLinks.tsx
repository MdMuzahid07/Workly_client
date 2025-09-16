import { Facebook, Linkedin, Twitter } from "lucide-react";

export const footerLinks = [
  {
    title: "Jobs",
    links: [
      { name: "Browse Jobs", href: "#" },
      { name: "Remote Jobs", href: "#" },
      { name: "Part-time Jobs", href: "#" },
      { name: "Internships", href: "#" },
      { name: "Entry Level", href: "#" },
    ],
  },
  {
    title: "Companies",
    links: [
      { name: "Browse Companies", href: "#" },
      { name: "Top Companies", href: "#" },
      { name: "Startup Jobs", href: "#" },
      { name: "Tech Companies", href: "#" },
      { name: "Fortune 500", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Resume Builder", href: "#" },
      { name: "Salary Guide", href: "#" },
      { name: "Interview Prep", href: "#" },
      { name: "Career Advice", href: "#" },
      { name: "Skills Tests", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
  },
];

export const worklyJobSocials = [
  {
    href: "#",
    icon: <Linkedin className="h-5 w-5" />,
  },
  {
    href: "#",
    icon: <Facebook className="h-5 w-5" />,
  },
  {
    href: "#",
    icon: <Twitter className="h-5 w-5" />,
  },
];
