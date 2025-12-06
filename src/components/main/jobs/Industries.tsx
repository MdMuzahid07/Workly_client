/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IndustriesSkeleton from "../../../skeleton/job/IndustriesSkeleton ";
import { Button } from "../../ui/button";

export type Category = {
  id: number;
  name: string;
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
  isLoading?: boolean;
};

const Industries = ({
  categories,
  onCategorySelect,
  multipleSelect = true,
  isLoading,
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

      onCategorySelect?.(newSelected);

      return newSelected;
    });
  };

  if (isLoading) {
    return <IndustriesSkeleton />;
  }

  return (
    <div className="mx-auto mt-4 max-w-7xl p-4 md:mt-7 xl:p-0">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView="auto"
        navigation={{
          prevEl: ".swiper-button-prev-2",
          nextEl: ".swiper-button-next-2",
        }}
        className="category-slider-2 flex w-full justify-center"
      >
        {categories?.map((category) => {
          const isSelected = selected?.includes(category.id);
          console.log("Rendering category:", category);
          return (
            <SwiperSlide key={category.id} className="w-auto!">
              <Button
                onClick={() => toggleSelection(category.id)}
                className={`group h-auto cursor-pointer rounded-full border px-6 py-2 whitespace-nowrap shadow-xs transition-colors ${isSelected ? "bg-primary text-white" : "bg-card text-foreground dark:hover:bg-card hover:bg-white"}`}
              >
                {category.icon ? (
                  <category.icon
                    className={`h-5 w-5 rounded-full p-0.5 ${category.color} text-white`}
                  />
                ) : null}
                {category.name}
                {category.count ? (
                  <p
                    className={`text-foreground ml-2 text-xs ${isSelected ? "text-white" : ""}`}
                  >
                    {category.count.split(" ")[0]}
                  </p>
                ) : null}
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
