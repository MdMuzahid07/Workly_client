import { ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useGetCategoriesQuery } from '../../../redux/feature/category/categoryApi';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';

interface CompanyFilterProps {
  selectedFilter?: string;
  onFilterChange: (value: string) => void;
}

const CompanyFilter = ({ selectedFilter, onFilterChange }: CompanyFilterProps) => {
  const { data: industries, isLoading } = useGetCategoriesQuery({
    type: 'company',
  });

  if (isLoading) {
    return (
      <div className="w-full bg-transparent">
        <div className="flex items-center gap-4 pb-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Use data.data if it's wrapped, otherwise use industries directly
  const industryList = industries?.data || industries || [];

  return (
    <div className="w-full bg-transparent">
      {/* Premium Category Header with Navigation Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-foreground flex items-center gap-2 text-sm font-bold tracking-wider uppercase">
          <Layers className="text-primary h-4 w-4" />
          <span>Filters</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-prev-company border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="swiper-button-next-company border-border/40 hover:bg-primary/5 hover:text-primary h-8 w-8 cursor-pointer rounded-full p-0 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
        navigation={{
          prevEl: '.swiper-button-prev-company',
          nextEl: '.swiper-button-next-company',
        }}
        className="company-filter-slider flex w-full"
      >
        {// eslint-disable-next-line @typescript-eslint/no-explicit-any
        industryList?.map((industry: any) => {
          const isSelected = selectedFilter === industry.name;
          return (
            <SwiperSlide key={industry.id} className="w-auto!">
              <Badge
                variant={isSelected ? 'default' : 'secondary'}
                className={`mb-1 cursor-pointer rounded-full border-gray-100 px-5 py-2 text-xs font-semibold shadow-sm transition-all duration-300 select-none ${
                  isSelected
                    ? 'bg-primary border-primary text-white'
                    : 'hover:bg-primary hover:border-primary bg-card text-slate-600 hover:text-white dark:border-slate-800 dark:text-slate-400'
                }`}
                onClick={() => onFilterChange(isSelected ? '' : industry.name)}
              >
                {industry.name}
              </Badge>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default CompanyFilter;
