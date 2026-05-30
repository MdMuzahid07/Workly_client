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
  id: string | number;
  name: string;
  icon: string;
  count: string;
  color: string;
  description: string;
  _count?: {
    jobs: number;
  };
};

export type IndustriesProps = {
  categories?: Category[];
  onCategorySelect?: (selectedIds: (string | number)[]) => void;
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
  const [selected, setSelected] = useState<(string | number)[]>([]);

  const toggleSelection = (id: string | number) => {
    setSelected((prev) => {
      let newSelected: (string | number)[];

      if (multipleSelect) {
        newSelected = prev.includes(id)
          ? prev.filter((industryId) => industryId !== id)
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
    <div className="mx-auto mt-4 max-w-7xl md:mt-7 xl:p-0">
      {/* Premium Category Header with Navigation Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-foreground text-sm font-bold tracking-wider uppercase">
            Popular Industries
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-prev-2 border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-next-2 border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
                {category._count?.jobs !== undefined ? (
                  <p
                    className={`text-foreground ml-2 text-xs ${isSelected ? "text-white" : ""}`}
                  >
                    {category._count.jobs}
                  </p>
                ) : category.count ? (
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
    </div>
  );
};

export default Industries;
