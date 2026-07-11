'use client';

import { Card } from '@/components/ui/card';
import type { GlobeConfig } from '@/components/ui/globe';
import {
  ArrowRight,
  Briefcase,
  Building2,
  CheckCircle2,
  FileText,
  MapPin,
  PlusCircle,
  Radio,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  UserCheck,
  Users,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { Suspense, useEffect, useState, type ComponentType } from 'react';
import { globeConfig, globeSampleAreas } from '../../constants';
import { useGetSearchSuggestionsQuery } from '../../redux/feature/job/jobApi';
import { useGetLandingStatsQuery } from '../../redux/feature/statistics/statisticsApi';
import GlobeSkeleton from '../../skeleton/landing/home/GlobeSkeleton';
import AnimatedCounter from '../shared/AnimatedCounter';

interface WorldProps {
  data: typeof globeSampleAreas;
  globeConfig: GlobeConfig;
}

interface LandingHeroProps {
  World: ComponentType<WorldProps>;
}

const SLIDES = [
  {
    id: 'jobs',
    title: 'Find Your Next Career Move',
    subtitle:
      'Explore thousands of active jobs from top-rated startups and global tech enterprises. Apply with a single click and land your dream job.',
    highlights: ['1-Click Easy Apply', 'Verified Job Openings', 'Direct Apply to Employers'],
    badgeText: 'Search Jobs',
    badgeIcon: Briefcase,
    colorTheme: 'primary',
  },
  {
    id: 'post-job',
    title: 'Post Jobs & Find Top Talent',
    subtitle:
      'List your open positions on Workly, reach thousands of qualified applicants daily, and build your dream team with ease.',
    highlights: ['Simple Job Creator', 'Reach Premium Candidates', 'Manage Applications'],
    badgeText: 'Post Openings',
    badgeIcon: PlusCircle,
    colorTheme: 'accent',
  },
  {
    id: 'cv-manager',
    title: 'Manage CVs & Stand Out',
    subtitle:
      'Upload your professional resumes in our CV Manager, highlight your qualifications, and let top recruiters discover your profile.',
    highlights: ['CV/Resume Manager', 'Featured Talent Profiles', 'Direct Profile Inquiries'],
    badgeText: 'Resume Manager',
    badgeIcon: FileText,
    colorTheme: 'primary',
  },
];

// Motion variants for ultra-smooth parallel slide transitions
const cardSlideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : -50,
    y: 10,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : -50,
    y: -10,
    opacity: 0,
    scale: 0.95,
  }),
};

const textTransitionVariants = {
  enter: {
    y: 8,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -8,
    opacity: 0,
  },
};

const LandingHero = ({ World }: LandingHeroProps) => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left

  // Search input fields
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');

  const { data: statsRes, isLoading: statsLoading } = useGetLandingStatsQuery();
  const stats = statsRes?.data;

  const trendingList = stats?.trendingKeywords || ['React', 'UI/UX', 'Python', 'Remote', 'DevOps'];

  const [activeInput, setActiveInput] = useState<'keyword' | 'location' | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Debouncing search queries
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [debouncedLocation, setDebouncedLocation] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 300);
    return () => clearTimeout(handler);
  }, [keyword]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLocation(location);
    }, 300);
    return () => clearTimeout(handler);
  }, [location]);

  // Fetch suggestions
  const { data: keywordSuggestionsData } = useGetSearchSuggestionsQuery(
    { keyword: debouncedKeyword },
    {
      skip: !debouncedKeyword || debouncedKeyword.trim().length < 2 || activeInput !== 'keyword',
    },
  );

  const { data: locationSuggestionsData } = useGetSearchSuggestionsQuery(
    { location: debouncedLocation },
    {
      skip: !debouncedLocation || debouncedLocation.trim().length < 2 || activeInput !== 'location',
    },
  );

  const suggestions =
    activeInput === 'keyword'
      ? keywordSuggestionsData?.data?.keywords || []
      : activeInput === 'location'
        ? locationSuggestionsData?.data?.locations || []
        : [];

  // Continuous auto loop: switches index every 3 seconds (looping 0 -> 1 -> 2 -> 0)
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSlideChange = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    type: 'keyword' | 'location',
  ) => {
    if (activeInput !== type) {
      setActiveInput(type);
      setFocusedIndex(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      if (focusedIndex >= 0 && focusedIndex < suggestions.length) {
        e.preventDefault();
        const selectedValue = suggestions[focusedIndex];
        if (type === 'keyword') {
          setKeyword(selectedValue);
        } else {
          setLocation(selectedValue);
        }
        setActiveInput(null);
        setFocusedIndex(-1);
      }
    } else if (e.key === 'Escape') {
      setActiveInput(null);
      setFocusedIndex(-1);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-form-container')) {
        setActiveInput(null);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (keyword) queryParams.set('search', keyword);
    if (location) queryParams.set('location', location);
    router.push(`/jobs?${queryParams.toString()}`);
  };

  const handleTrendingClick = (term: string) => {
    setKeyword(term);
    router.push(`/jobs?search=${encodeURIComponent(term)}`);
  };

  const activeSlide = SLIDES[currentSlide];

  return (
    <section className="bg-background border-primary/20 relative flex min-h-[520px] w-full items-center overflow-hidden border-b pt-24 pb-14 sm:min-h-[700px] sm:pt-36 sm:pb-24 lg:min-h-[800px] lg:pt-40 lg:pb-32">
      {/* Background patterns */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle corporate background visual (Conference Room) */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] mix-blend-multiply grayscale transition-all duration-300 dark:opacity-[0.11] dark:mix-blend-overlay"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1920')",
          }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.03]" />

        {/* Theme compliant color orbs (Green only) */}
        <div className="bg-primary/5 absolute -top-40 -right-40 h-[450px] w-[450px] rounded-full blur-[110px]" />
        <div className="bg-accent/4 absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-8 md:grid-cols-12">
          {/* LEFT COLUMN: Values Slider & Unified Search */}
          <div className="w-full space-y-4 text-left sm:space-y-6 md:col-span-7">
            {/* Slide Header Pills */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {SLIDES.map((slide, index) => {
                const Icon = slide.badgeIcon;
                const isSelected = currentSlide === index;
                return (
                  <button
                    key={slide.id}
                    onClick={() => handleSlideChange(index)}
                    className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-semibold backdrop-blur-sm transition-all duration-300 sm:gap-1.5 sm:px-3.5 sm:py-1.5 sm:text-xs ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary scale-105'
                        : 'border-border/60 bg-card/40 text-muted-foreground hover:bg-card/80 hover:text-foreground'
                    }`}
                  >
                    <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    <span>{slide.badgeText}</span>
                  </button>
                );
              })}
            </div>

            {/* Slider Copy Container (Steady minimum height to avoid jumping layout) */}
            <div className="xs:min-h-[200px] relative min-h-[220px] overflow-hidden md:min-h-[280px] lg:min-h-[200px] xl:min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  variants={textTransitionVariants}
                  transition={{
                    y: { type: 'spring', stiffness: 350, damping: 30 },
                    opacity: { duration: 0.15 },
                  }}
                  className="space-y-3"
                >
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase">
                    <Sparkles className="h-3 w-3" />
                    <span>Explore {activeSlide.badgeText}</span>
                  </div>

                  <h1 className="text-foreground text-3xl leading-[1.15] font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
                    {activeSlide.title.split(' ').map((word, idx) => {
                      const isHighlight =
                        word.toLowerCase().includes('career') ||
                        word.toLowerCase().includes('talent') ||
                        word.toLowerCase().includes('jobs') ||
                        word.toLowerCase().includes('skills');
                      if (isHighlight) {
                        return (
                          <span
                            key={idx}
                            className="from-primary via-primary to-accent bg-linear-to-r bg-clip-text text-transparent"
                          >
                            {word}{' '}
                          </span>
                        );
                      }
                      return <span key={idx}>{word} </span>;
                    })}
                  </h1>

                  <p className="text-muted-foreground max-w-xl text-sm leading-relaxed sm:text-base">
                    {activeSlide.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-x-5 gap-y-1.5 pt-1">
                    {activeSlide.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="text-foreground/90 flex items-center gap-1.5 text-xs font-semibold"
                      >
                        <CheckCircle2 className="text-primary h-3.5 w-3.5 shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Premium Job Search Bar (Borders only, flat design) */}
            <div className="search-form-container max-w-2xl space-y-3">
              <form
                onSubmit={handleSearchSubmit}
                className="bg-card/75 border-border/70 flex flex-col gap-2 rounded-2xl border p-2 backdrop-blur-md lg:flex-row lg:items-center lg:gap-0"
              >
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => {
                      setKeyword(e.target.value);
                      setActiveInput('keyword');
                    }}
                    onFocus={() => {
                      setActiveInput('keyword');
                      setFocusedIndex(-1);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, 'keyword')}
                    placeholder="Job title, keywords, or skills..."
                    className="placeholder:text-muted-foreground text-foreground h-11 w-full bg-transparent pr-4 pl-12 text-sm focus:outline-hidden"
                  />

                  {activeInput === 'keyword' && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-border/70 bg-card/95 absolute top-[calc(100%+8px)] right-0 left-0 z-50 max-h-60 overflow-y-auto rounded-xl border p-1.5 backdrop-blur-xl"
                    >
                      {suggestions.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          onMouseDown={() => {
                            setKeyword(item);
                            setActiveInput(null);
                            setFocusedIndex(-1);
                          }}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            focusedIndex === idx
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <Search className="text-muted-foreground h-4 w-4" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="bg-border/60 hidden h-6 w-px lg:block" />
                <div className="bg-border/60 my-0.5 block h-px w-full lg:hidden" />

                <div className="relative flex-1">
                  <MapPin className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      setActiveInput('location');
                    }}
                    onFocus={() => {
                      setActiveInput('location');
                      setFocusedIndex(-1);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, 'location')}
                    placeholder="Location or Remote..."
                    className="placeholder:text-muted-foreground text-foreground h-11 w-full bg-transparent pr-4 pl-12 text-sm focus:outline-hidden"
                  />

                  {activeInput === 'location' && suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border-border/70 bg-card/95 absolute top-[calc(100%+8px)] right-0 left-0 z-50 max-h-60 overflow-y-auto rounded-xl border p-1.5 backdrop-blur-xl"
                    >
                      {suggestions.map((item: string, idx: number) => (
                        <div
                          key={idx}
                          onMouseDown={() => {
                            setLocation(item);
                            setActiveInput(null);
                            setFocusedIndex(-1);
                          }}
                          className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                            focusedIndex === idx
                              ? 'bg-primary/10 text-primary'
                              : 'text-foreground hover:bg-muted/60'
                          }`}
                        >
                          <MapPin className="text-muted-foreground h-4 w-4" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/95 flex h-9.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl px-4 text-xs font-extrabold text-white transition-all lg:h-11 lg:w-auto lg:gap-2 lg:px-6 lg:text-sm"
                >
                  <Search className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
                  <span>Search Jobs</span>
                </button>
              </form>

              {/* Trending searches */}
              <div className="flex flex-wrap items-center gap-2 px-1 pt-0.5">
                <span className="text-muted-foreground flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                  <TrendingUp className="text-primary h-3.5 w-3.5" />
                  Trending:
                </span>
                {trendingList.map((term, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleTrendingClick(term)}
                    className="border-border bg-card hover:bg-primary/15 hover:text-primary hover:border-primary/30 text-muted-foreground cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Live stats */}
            <div className="border-border/30 max-w-xl border-t pt-4 sm:pt-5">
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    icon: Briefcase,
                    label: 'Active Jobs',
                    value: stats?.activeJobs ?? 0,
                    colorClass: 'text-primary bg-primary/10',
                  },
                  {
                    icon: Building2,
                    label: 'Firms Hiring',
                    value: stats?.companies ?? 0,
                    colorClass: 'text-accent bg-accent/10',
                  },
                  {
                    icon: Users,
                    label: 'Job Seekers',
                    value: stats?.jobSeekers ?? 0,
                    colorClass: 'text-primary bg-primary/10',
                  },
                ].map((stat, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-lg ${stat.colorClass}`}
                      >
                        <stat.icon className="h-3.5 w-3.5" />
                      </div>
                      {statsLoading || !stats ? (
                        <div className="bg-muted/60 h-6 w-14 animate-pulse rounded-md" />
                      ) : (
                        <p className="text-foreground text-lg leading-none font-extrabold sm:text-xl">
                          <AnimatedCounter value={stat.value} />
                        </p>
                      )}
                    </div>
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: HIGH-TECH 3D GLOBE BACKDROP WITH OFFSET SLIDING INTERACTIVE WIDGETS */}
          <div className="relative mx-auto flex h-[340px] w-full max-w-[440px] items-center justify-center overflow-visible sm:h-[400px] md:col-span-5 md:h-[400px] lg:col-span-5 lg:h-[440px]">
            {/* Globe Background Visual - Always active as high-end dimensional backdrop */}
            <div className="pointer-events-none absolute inset-0 z-0 h-full w-full scale-100 sm:scale-105">
              <Suspense fallback={<GlobeSkeleton />}>
                <World data={globeSampleAreas} globeConfig={globeConfig} />
              </Suspense>
            </div>

            {/* Interactive Slide overlays - Offset slightly for premium multi-layered look */}
            <div className="xs:max-w-[310px] xs:right-2 absolute -right-2 bottom-6 z-10 w-full max-w-[290px] sm:right-4 sm:bottom-10 sm:max-w-[330px] md:right-2 md:bottom-8 md:max-w-[310px] lg:right-4 lg:bottom-12 lg:max-w-[330px]">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentSlide}
                  custom={direction}
                  variants={cardSlideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="w-full"
                >
                  {currentSlide === 0 && <InteractiveJobCard />}
                  {currentSlide === 1 && <InteractivePostJobCard />}
                  {currentSlide === 2 && <InteractiveCVCard />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Second Floating Element: Simple premium candidate indicator top-left (balanced composition) */}
            <div className="absolute top-6 left-[-10px] z-10 sm:top-10 sm:left-[-20px]">
              <motion.div
                animate={{ y: -8 }}
                transition={{
                  y: {
                    duration: 2.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    ease: 'easeInOut',
                  },
                }}
                className="border-primary/30 bg-card/90 flex items-center gap-1.5 rounded-full border px-3 py-1.5 backdrop-blur-md"
              >
                <div className="bg-primary/20 flex h-5 w-5 items-center justify-center rounded-full">
                  <Users className="text-primary h-3 w-3" />
                </div>
                <div className="text-left leading-none">
                  <span className="text-muted-foreground block text-[9px] font-bold uppercase">
                    Active Candidates
                  </span>
                  {statsLoading || !stats ? (
                    <div className="bg-muted/60 mt-1 h-3.5 w-16 animate-pulse rounded-md" />
                  ) : (
                    <span className="text-foreground flex items-center gap-0.5 text-xs font-extrabold">
                      <AnimatedCounter value={stats?.activeNow ?? 0} />
                      <span>{stats?.activeNow === 1 ? 'Candidate' : 'Candidates'}</span>
                    </span>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Live active candidate indicator overlaying the globe bottom */}
            <div className="border-border bg-card/90 absolute right-2 bottom-1 left-2 z-20 flex items-center justify-between rounded-xl border p-2.5 backdrop-blur-md">
              <div className="flex items-center gap-1.5">
                <Radio className="text-primary h-3.5 w-3.5 shrink-0" />
                <span className="text-foreground text-[10px] font-bold">Network online</span>
              </div>
              <span className="text-primary flex items-center gap-0.5 text-[10px] font-extrabold">
                Connecting Global Talent <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* MOCKUP 1: Interactive Job Card (Theme compliant green accents, flat borders) */
const InteractiveJobCard = () => {
  const router = useRouter();

  return (
    <Card className="border-primary bg-card/90 w-full rounded-2xl border p-4.5 text-left backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-neutral-900 text-sm font-extrabold text-white">
            V
          </div>
          <div>
            <h5 className="text-foreground flex items-center gap-1 text-xs leading-tight font-bold">
              Senior React Engineer
              <Star className="h-3 w-3 shrink-0 fill-amber-500 text-amber-500" />
            </h5>
            <p className="text-muted-foreground mt-0.5 text-[10px] leading-none font-medium">
              Vercel • Remote
            </p>
          </div>
        </div>
        <div className="border-primary/20 bg-primary/5 text-primary rounded-full border px-2 py-0.5 text-[9px] font-bold">
          98% Match
        </div>
      </div>

      <div className="text-muted-foreground mt-3.5 flex items-center gap-3 text-[10px] font-bold">
        <span className="flex items-center gap-1">
          <MapPin className="text-primary h-3 w-3" />
          Global Remote
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="text-accent h-3 w-3" />
          $140k - $175k
        </span>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-1">
        {['Next.js', 'TypeScript', 'Tailwind'].map((t, idx) => (
          <span
            key={idx}
            className="bg-muted text-muted-foreground/80 rounded-md px-1.5 py-0.5 text-[9px] font-medium"
          >
            {t}
          </span>
        ))}
      </div>

      <button
        onClick={() => router.push('/jobs')}
        className="bg-primary hover:bg-primary/90 mt-4 flex h-8.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-bold text-white transition-all"
      >
        <span>Apply Instantly</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </Card>
  );
};

/* MOCKUP 2: Interactive Post Job Status Card (Theme compliant green accents, flat borders) */
const InteractivePostJobCard = () => {
  const router = useRouter();

  return (
    <Card className="border-accent bg-card/90 w-full rounded-2xl border p-4.5 text-left backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 text-primary flex h-9.5 w-9.5 items-center justify-center rounded-xl text-sm font-extrabold">
            <PlusCircle className="h-5 w-5" />
          </div>
          <div>
            <h5 className="text-foreground text-xs leading-tight font-bold">Create Job Posting</h5>
            <p className="text-muted-foreground mt-0.5 text-[10px] leading-none font-medium">
              Quick Employer Tool
            </p>
          </div>
        </div>
        <div className="border-accent/30 bg-accent/5 text-accent rounded-full border px-2 py-0.5 text-[9px] font-bold">
          Active Listing
        </div>
      </div>

      <div className="bg-muted/40 border-border/50 mt-3.5 space-y-2 rounded-xl border p-2.5">
        <div className="text-foreground/90 flex items-center justify-between text-[10px] font-bold">
          <span>Title: Product Designer</span>
          <span className="text-primary">$120k-$150k</span>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-[9px] font-medium">
          <span>Category: Design / UI-UX</span>
          <span className="flex items-center gap-0.5">
            <UserCheck className="text-accent h-3.5 w-3.5" />
            45 Applicants
          </span>
        </div>
      </div>

      <button
        onClick={() => router.push('/employer/post-job')}
        className="bg-accent hover:bg-accent/90 mt-4 flex h-8.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-bold text-white transition-all"
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span>Publish Listing</span>
      </button>
    </Card>
  );
};

/* MOCKUP 3: Interactive CV Manager Card (Strictly Theme Green, NO Blue, flat borders) */
const InteractiveCVCard = () => {
  const router = useRouter();

  return (
    <Card className="border-primary bg-card/90 w-full rounded-2xl border p-4.5 text-left backdrop-blur-md">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-xl bg-neutral-800 text-sm font-extrabold text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h5 className="text-foreground text-xs leading-tight font-bold">Resume Verified</h5>
            <p className="text-muted-foreground mt-0.5 text-[10px] leading-none font-medium">
              CV Manager System
            </p>
          </div>
        </div>
        <div className="border-primary/20 bg-primary/5 text-primary rounded-full border px-2 py-0.5 text-[9px] font-bold">
          Primary
        </div>
      </div>

      <div className="border-border/50 bg-card mt-3.5 flex items-center justify-between rounded-xl border p-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <FileText className="text-muted-foreground h-4 w-4 shrink-0" />
          <div className="min-w-0">
            <p className="text-foreground truncate text-[10px] leading-none font-bold">
              Resume_FullStack_2026.pdf
            </p>
            <p className="text-muted-foreground mt-0.5 text-[7.5px]">
              1.2 MB • Uploaded 2 days ago
            </p>
          </div>
        </div>
        <CheckCircle2 className="text-primary h-4 w-4 shrink-0" />
      </div>

      <button
        onClick={() => router.push('/dashboard/cv-manager')}
        className="bg-primary hover:bg-primary/90 mt-4 flex h-8.5 w-full cursor-pointer items-center justify-center gap-1.5 rounded-xl text-xs font-bold text-white transition-all"
      >
        <Upload className="h-3.5 w-3.5" />
        <span>Manage CV Documents</span>
      </button>
    </Card>
  );
};

export default LandingHero;
