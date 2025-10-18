/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../../ui/button";

export type Category = {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
  count: string;
  color: string;
  description: string;
};

export type IndustriesProps = {
  categories?: Category[];
  onCategorySelect?: (selectedIds: number[]) => void;
  multipleSelect?: boolean;
  className?: string;
};

const defaultCategories: Category[] = [
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
    color: "bg-primary/100",
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
  {
    id: 9,
    title: "Sales",
    icon: Users,
    count: "1,234 jobs",
    color: "bg-orange-500",
    description: "B2B, Retail, Account Management",
  },
  {
    id: 10,
    title: "Education",
    icon: Award,
    count: "654 jobs",
    color: "bg-indigo-500",
    description: "Teaching, Training, Research",
  },
  {
    id: 11,
    title: "Remote",
    icon: Globe,
    count: "3,421 jobs",
    color: "bg-teal-500",
    description: "Work from anywhere",
  },
];

const Industries = ({
  categories = defaultCategories,
  onCategorySelect,
  multipleSelect = true,
}: IndustriesProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelection = (id: number) => {
    setSelected((prev) => {
      let newSelected: number[];

      if (multipleSelect) {
        newSelected = prev.includes(id)
          ? prev.filter((industryId: number) => industryId !== id)
          : [...prev, id];
      } else {
        newSelected = prev.includes(id) ? [] : [id];
      }

      console.log("Selected industries:", newSelected);
      onCategorySelect?.(newSelected);

      return newSelected;
    });
  };

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
        {categories.map((category) => {
          const isSelected = selected?.includes(category.id);

          return (
            <SwiperSlide key={category.id} className="!w-auto">
              <Button
                onClick={() => toggleSelection(category.id)}
                className={`group h-auto cursor-pointer rounded-full border px-6 py-2 whitespace-nowrap shadow-xs transition-colors ${isSelected ? "bg-primary text-white" : "bg-card text-foreground dark:hover:bg-card hover:bg-white"}`}
              >
                {
                  <category.icon
                    className={`h-5 w-5 rounded-full p-0.5 ${category.color} text-white`}
                  />
                }
                {category.title}
                <p
                  className={`text-foreground ml-2 text-xs ${isSelected ? "text-white" : ""}`}
                >
                  {category.count.split(" ")[0]}
                </p>
              </Button>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="mt-4 flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="swiper-button-prev-2 cursor-pointer"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="swiper-button-next-2 cursor-pointer"
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Industries;
