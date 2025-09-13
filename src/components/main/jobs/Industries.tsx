"use client";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import {
  Award,
  ChevronLeft,
  ChevronRight,
  Code,
  Globe,
  Heart,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "../../ui/button";

const jobCategories = [
  {
    id: 1,
    title: "Technology",
    icon: Code,
    count: "2,847 jobs",
    color: "bg-blue-500",
    description: "Software, AI, Data Science",
  },
  {
    id: 2,
    title: "Healthcare",
    icon: Heart,
    count: "1,923 jobs",
    color: "bg-red-500",
    description: "Medical, Nursing, Research",
  },
  {
    id: 3,
    title: "Finance",
    icon: TrendingUp,
    count: "1,456 jobs",
    color: "bg-green-500",
    description: "Banking, Investment, Accounting",
  },
  {
    id: 4,
    title: "Marketing",
    icon: Zap,
    count: "987 jobs",
    color: "bg-purple-500",
    description: "Digital, Content, SEO",
  },
  {
    id: 5,
    title: "Design",
    icon: Star,
    count: "743 jobs",
    color: "bg-pink-500",
    description: "UI/UX, Graphic, Product",
  },
  {
    id: 6,
    title: "Sales",
    icon: Users,
    count: "1,234 jobs",
    color: "bg-orange-500",
    description: "B2B, Retail, Account Management",
  },
  {
    id: 7,
    title: "Education",
    icon: Award,
    count: "654 jobs",
    color: "bg-indigo-500",
    description: "Teaching, Training, Research",
  },
  {
    id: 8,
    title: "Remote",
    icon: Globe,
    count: "3,421 jobs",
    color: "bg-teal-500",
    description: "Work from anywhere",
  },
];

const Industries = () => {
  return (
    <div className="mx-auto mt-4 max-w-7xl p-4 md:mt-7 xl:p-0">
      <Swiper
        modules={[Navigation]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation={{
          prevEl: ".swiper-button-prev-2",
          nextEl: ".swiper-button-next-2",
        }}
        className="category-slider-2 flex w-full justify-center"
      >
        {jobCategories.map((category) => (
          <SwiperSlide key={category.id} className="!w-auto">
            <Button
              variant="outline"
              className="hover:bg-primary group bg-background h-auto rounded-lg px-6 py-2 whitespace-nowrap text-black transition-colors hover:text-white"
            >
              {category.title}
              <p className="group:hover:text-white ml-2 text-xs text-black">
                {category.count.split(" ")[0]}
              </p>
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" className="swiper-button-prev-2">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button variant="ghost" size="sm" className="swiper-button-next-2">
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Industries;
