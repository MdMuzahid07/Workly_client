/* eslint-disable @typescript-eslint/ban-ts-comment */

"use client";

import Industries from "../../components/main/jobs/Industries";
import JobCard from "../../components/main/jobs/JobCard";
import Searchbar from "../../components/main/jobs/Searchbar";
import Sidebar from "../../components/main/jobs/Sidebar";
import SidebarFilter from "../../components/main/jobs/SidebarFilter";

// fake data
const jobs = [
  {
    title: "Frontend Developer",
    company: "TechHive Solutions",
    location: "Dhaka, Bangladesh",
    budget: "1200",
    budgetType: "fixed",
    timePosted: "2 hours ago",
    description:
      "We are looking for a React.js developer to build scalable and interactive web applications.",
    skills: ["React", "TypeScript", "Tailwind CSS"],
    isUrgent: true,
    isFeatured: true,
  },
  {
    title: "Backend Engineer",
    company: "CloudBridge Ltd",
    location: "Remote",
    budget: "25",
    budgetType: "hourly",
    timePosted: "1 day ago",
    description:
      "Seeking an experienced Node.js developer with expertise in PostgreSQL and Prisma.",
    skills: ["Node.js", "Prisma", "PostgreSQL", "REST APIs"],
    isUrgent: false,
    isFeatured: true,
  },
  {
    title: "UI/UX Designer",
    company: "PixelCraft Studio",
    location: "London, UK",
    budget: "800",
    budgetType: "fixed",
    timePosted: "5 hours ago",
    description:
      "Design intuitive user experiences for web and mobile platforms.",
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping"],
    isUrgent: true,
    isFeatured: false,
  },
  {
    title: "Mobile App Developer",
    company: "AppNation",
    location: "San Francisco, USA",
    budget: "30",
    budgetType: "hourly",
    timePosted: "3 days ago",
    description:
      "Hiring React Native developers to build cross-platform mobile applications.",
    skills: ["React Native", "Expo", "Redux", "Firebase"],
    isUrgent: false,
    isFeatured: true,
  },
  {
    title: "Full Stack Developer",
    company: "CodeWave Technologies",
    location: "Berlin, Germany",
    budget: "2000",
    budgetType: "fixed",
    timePosted: "6 hours ago",
    description:
      "We need a full stack engineer to work on a SaaS product using MERN stack.",
    skills: ["MongoDB", "Express.js", "React", "Node.js"],
    isUrgent: true,
    isFeatured: true,
  },
  {
    title: "Data Analyst",
    company: "Insight Analytics",
    location: "Toronto, Canada",
    budget: "20",
    budgetType: "hourly",
    timePosted: "12 hours ago",
    description:
      "Analyze business data and build visual dashboards for better insights.",
    skills: ["SQL", "Power BI", "Python", "Excel"],
    isUrgent: false,
    isFeatured: false,
  },
  {
    title: "DevOps Engineer",
    company: "NextGen Cloud",
    location: "Remote",
    budget: "1500",
    budgetType: "fixed",
    timePosted: "2 days ago",
    description:
      "Looking for DevOps experts to optimize CI/CD pipelines and cloud deployments.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    isUrgent: true,
    isFeatured: false,
  },
  {
    title: "QA Tester",
    company: "QualityWorks",
    location: "Sydney, Australia",
    budget: "18",
    budgetType: "hourly",
    timePosted: "8 hours ago",
    description: "Manual and automated testing for web applications.",
    skills: ["Selenium", "Cypress", "Jest", "Manual Testing"],
    isUrgent: false,
    isFeatured: true,
  },
  {
    title: "AI Engineer",
    company: "NeuralNet Labs",
    location: "New York, USA",
    budget: "3000",
    budgetType: "fixed",
    timePosted: "1 week ago",
    description:
      "Work on cutting-edge AI and ML solutions for real-world problems.",
    skills: ["Python", "TensorFlow", "PyTorch", "NLP"],
    isUrgent: true,
    isFeatured: true,
  },
  {
    title: "Content Writer",
    company: "WriteRight Media",
    location: "Mumbai, India",
    budget: "10",
    budgetType: "hourly",
    timePosted: "3 hours ago",
    description:
      "We need creative writers for blogs, social media, and product descriptions.",
    skills: ["SEO", "Copywriting", "Content Strategy", "Research"],
    isUrgent: false,
    isFeatured: false,
  },
];

const JobView = () => {
  return (
    <div className="bg-gray-50 pb-12">
      <Searchbar />
      <Industries />
      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 pt-5 xl:px-0">
        <div className="col-span-12 md:col-span-4">
          <div className="sticky top-24 hidden md:flex">
            {
              //@ts-ignore
              <SidebarFilter className="w-full" />
            }
          </div>
          <div className="flex md:hidden">
            {
              //@ts-ignore
              <Sidebar />
            }
          </div>
        </div>
        <div className="col-span-12 md:col-span-8">
          <div className="flex flex-col gap-4">
            {jobs.map((job, index) => (
              //@ts-ignore
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobView;
