"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import getIconComponent from "../../../helper/getIconComponent";
import IndustriesSkeleton from "../../../skeleton/job/IndustriesSkeleton ";
import { Button } from "../../ui/button";

export type Category = {
  id: number;
  name: string;
  icon: string;
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
          const { icon: CategoryIcon, color } = getIconComponent(category.icon);
          return (
            <SwiperSlide key={category.id} className="w-auto!">
              <Button
                onClick={() => toggleSelection(category.id)}
                className={`group h-auto cursor-pointer rounded-full border px-6 py-2 whitespace-nowrap shadow-xs transition-colors ${isSelected ? "bg-primary text-white" : "bg-card text-foreground dark:hover:bg-card hover:bg-white"}`}
              >
                <CategoryIcon
                  className={`h-5 w-5 ${color} rounded-full p-0.5 text-white`}
                />
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

      <div className="mt-4 flex items-center justify-between sm:mt-6">
        <Button
          variant="outline"
          size="sm"
          className="swiper-button-prev-2 border-border/40 hover:bg-primary/5 hover:text-primary h-9 cursor-pointer rounded-full px-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="swiper-button-next-2 border-border/40 hover:bg-primary/5 hover:text-primary h-9 cursor-pointer rounded-full px-4"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Industries;
