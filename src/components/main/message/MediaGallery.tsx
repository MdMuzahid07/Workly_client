import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  Eye,
  FileArchive,
  FileCode,
  FileText,
  Filter,
  HardDrive,
  Image as ImageIcon,
  Link as LinkIcon,
  MoreVertical,
  Search,
  Share2,
  Trash2,
  X,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { JSX, useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css/pagination";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import "swiper/css/zoom";
import { Keyboard, Navigation, Pagination, Zoom } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

/* ========================================
   TYPE DEFINITIONS
======================================== */

interface MediaItem {
  id: number;
  url: string;
  name: string;
  size: string;
  date: string;
  thumbnail: string;
}

interface DocumentItem {
  id: number;
  type: string;
  name: string;
  size: string;
  date: string;
}

interface LinkItem {
  id: number;
  title: string;
  url: string;
  date: string;
  description: string;
}

interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  participantName: string;
}

const MOCK_MEDIA = {
  images: [
    {
      id: 1,
      url: "/mock-media/ui-preview.png",
      name: "UI Design Preview.png",
      size: "2.4 MB",
      date: "Feb 05, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=400",
    },
    {
      id: 2,
      url: "/mock-media/dashboard.png",
      name: "Dashboard Prototype.png",
      size: "1.8 MB",
      date: "Feb 04, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
    },
    {
      id: 3,
      url: "/mock-media/landing-page.png",
      name: "Landing Page.png",
      size: "3.2 MB",
      date: "Feb 02, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400",
    },
    {
      id: 4,
      url: "/mock-media/mobile-app.png",
      name: "Mobile App Design.png",
      size: "1.5 MB",
      date: "Feb 01, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400",
    },
    {
      id: 5,
      url: "/mock-media/components.png",
      name: "Component Library.png",
      size: "2.1 MB",
      date: "Jan 30, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    },
    {
      id: 6,
      url: "/mock-media/wireframe.png",
      name: "Wireframe.png",
      size: "890 KB",
      date: "Jan 28, 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400",
    },
  ],
  documents: [
    {
      id: 1,
      type: "pdf",
      name: "Job Proposal.pdf",
      size: "450 KB",
      date: "Feb 05, 2026",
    },
    {
      id: 2,
      type: "zip",
      name: "Asset_Package.zip",
      size: "12.5 MB",
      date: "Feb 03, 2026",
    },
    {
      id: 3,
      type: "docx",
      name: "Agreement.docx",
      size: "120 KB",
      date: "Feb 01, 2026",
    },
    {
      id: 4,
      type: "pdf",
      name: "Project_Requirements.pdf",
      size: "680 KB",
      date: "Jan 30, 2026",
    },
  ],
  links: [
    {
      id: 1,
      title: "GitHub Repository",
      url: "https://github.com/workly/project",
      date: "Feb 05, 2026",
      description: "Main project repository",
    },
    {
      id: 2,
      title: "Figma Design",
      url: "https://figma.com/file/...",
      date: "Feb 04, 2026",
      description: "UI/UX design files",
    },
    {
      id: 3,
      title: "Portfolio Website",
      url: "https://muzahid.dev",
      date: "Feb 02, 2026",
      description: "Personal portfolio",
    },
    {
      id: 4,
      title: "API Documentation",
      url: "https://docs.api.example.com",
      date: "Jan 29, 2026",
      description: "REST API docs",
    },
  ],
};

/* ========================================
   UTILITY FUNCTIONS
======================================== */

const getFileIcon = (type: string) => {
  const icons: Record<string, JSX.Element> = {
    pdf: <FileText className="h-5 w-5 text-red-500" />,
    zip: <FileArchive className="h-5 w-5 text-yellow-500" />,
    docx: <FileCode className="h-5 w-5 text-blue-500" />,
  };
  return icons[type] || <FileText className="text-muted-foreground h-5 w-5" />;
};

const calculateTotalSize = (images: MediaItem[]): string => {
  const totalKB = images.reduce((acc, img) => {
    const sizeNum = parseFloat(img.size);
    const multiplier = img.size.includes("KB") ? 1 : 1024;
    return acc + sizeNum * multiplier;
  }, 0);
  return (totalKB / 1024).toFixed(1);
};

const downloadImage = (url: string, filename: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
};

/* ========================================
   COMPONENT: ImageLightbox
   Swiper-based fullscreen image viewer
======================================== */

interface ImageLightboxProps {
  images: MediaItem[];
  currentIndex: number;
  onClose: () => void;
}

function ImageLightbox({ images, currentIndex, onClose }: ImageLightboxProps) {
  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(currentIndex);
  const currentImage = images[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="animate-in fade-in fixed inset-0 z-100 bg-black/95 backdrop-blur-sm duration-200">
      {/* Header */}
      <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between bg-linear-to-b from-black/80 to-transparent p-3 md:p-4">
        <div className="min-w-0 flex-1 text-white">
          <h3 className="truncate text-sm font-semibold md:text-base">
            {currentImage.name}
          </h3>
          <p className="text-xs text-white/70 md:text-sm">
            {currentImage.size} • {currentImage.date}
          </p>
        </div>
        <div className="ml-4 flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full text-white hover:bg-white/10"
            onClick={() =>
              downloadImage(currentImage.thumbnail, currentImage.name)
            }
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Swiper */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Swiper
          modules={[Navigation, Keyboard, Zoom, Pagination]}
          initialSlide={currentIndex}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
          spaceBetween={30}
          navigation={{
            prevEl: ".swiper-button-prev-custom",
            nextEl: ".swiper-button-next-custom",
          }}
          keyboard={{ enabled: true }}
          zoom={{ maxRatio: 3, minRatio: 1 }}
          pagination={{ type: "fraction", el: ".swiper-pagination-custom" }}
          className="h-full w-full"
          style={{ padding: "80px 60px" }}
        >
          {images.map((image) => (
            <SwiperSlide
              key={image.id}
              className="flex items-center justify-center"
            >
              <div className="swiper-zoom-container">
                <Image
                  src={image.thumbnail}
                  alt={image.name}
                  className="max-h-full max-w-full rounded-lg object-contain shadow-2xl select-none"
                  draggable={false}
                  fill
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons */}
        <button
          className="swiper-button-prev-custom absolute top-1/2 left-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 md:left-4"
          disabled={activeIndex === 0}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="swiper-button-next-custom absolute top-1/2 right-2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-30 md:right-4"
          disabled={activeIndex === images.length - 1}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Counter */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm" />

      {/* Zoom Hint */}
      <div className="absolute bottom-20 left-1/2 hidden -translate-x-1/2 text-xs text-white/60 md:block">
        Double-click or pinch to zoom
      </div>
    </div>
  );
}

/* ========================================
   COMPONENT: EmptyState
======================================== */

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center md:py-16">
      <div className="bg-muted mb-4 rounded-full p-4 md:p-6">{icon}</div>
      <p className="text-foreground text-sm font-medium md:text-base">
        {title}
      </p>
      <p className="text-muted-foreground mt-1 text-xs md:text-sm">
        {description}
      </p>
    </div>
  );
}

/* ========================================
   COMPONENT: MediaGrid
======================================== */

interface MediaGridProps {
  items: MediaItem[];
  onImageClick: (index: number) => void;
  searchQuery: string;
}

function MediaGrid({ items, onImageClick, searchQuery }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <ImageIcon className="text-muted-foreground/50 h-8 w-8 md:h-12 md:w-12" />
        }
        title={searchQuery ? "No matching media files" : "No media files"}
        description={
          searchQuery
            ? "Try adjusting your search"
            : "Images and videos will appear here"
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4 xl:grid-cols-5">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="group border-border bg-muted hover:border-primary/50 relative aspect-square cursor-pointer overflow-hidden rounded-lg border transition-all hover:shadow-lg active:scale-95"
          onClick={() => onImageClick(index)}
        >
          <div className="from-primary/5 to-accent/5 absolute inset-0 bg-linear-to-br">
            <Image
              src={item.thumbnail}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              fill
            />
          </div>
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="absolute right-0 bottom-0 left-0 p-2 md:p-3">
              <p className="mb-1 truncate text-xs font-medium text-white">
                {item.name}
              </p>
              <div className="flex items-center justify-between text-[10px] text-white/80 md:text-xs">
                <span>{item.size}</span>
                <span className="hidden sm:inline">{item.date}</span>
              </div>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <Button
                size="icon"
                variant="secondary"
                className="h-7 w-7 md:h-8 md:w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  onImageClick(index);
                }}
              >
                <Eye className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="h-7 w-7 md:h-8 md:w-8"
                onClick={(e) => {
                  e.stopPropagation();
                  downloadImage(item.thumbnail, item.name);
                }}
              >
                <Download className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </Button>
            </div>
          </div>
          <div className="absolute top-2 left-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="rounded-full bg-black/50 p-1.5 backdrop-blur-sm">
              <ZoomIn className="h-3 w-3 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========================================
   COMPONENT: DocumentsList
======================================== */

interface DocumentsListProps {
  items: DocumentItem[];
  searchQuery: string;
}

function DocumentsList({ items, searchQuery }: DocumentsListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <FileText className="text-muted-foreground/50 h-8 w-8 md:h-12 md:w-12" />
        }
        title={searchQuery ? "No matching documents" : "No documents"}
        description={
          searchQuery
            ? "Try adjusting your search"
            : "Shared documents will appear here"
        }
      />
    );
  }

  return (
    <div className="space-y-2 md:space-y-3">
      {items.map((doc) => (
        <div
          key={doc.id}
          className="group border-border bg-card hover:border-primary/50 flex items-center gap-3 rounded-lg border p-3 transition-all hover:shadow-md active:scale-[0.98] md:gap-4 md:p-4"
        >
          <div className="bg-muted group-hover:bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors md:h-12 md:w-12">
            {getFileIcon(doc.type)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground truncate text-sm font-medium md:text-base">
              {doc.name}
            </p>
            <div className="text-muted-foreground mt-1 flex items-center gap-2 text-xs md:gap-3 md:text-sm">
              <span className="flex items-center gap-1">
                <HardDrive className="h-3 w-3" />
                {doc.size}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden items-center gap-1 sm:flex">
                <Calendar className="h-3 w-3" />
                {doc.date}
              </span>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1 md:gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="hidden h-8 text-xs sm:flex md:h-9 md:text-sm"
            >
              <Download className="mr-1.5 h-3.5 w-3.5 md:h-4 md:w-4" />
              Download
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 md:hidden">
              <Download className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========================================
   COMPONENT: LinksList
======================================== */

interface LinksListProps {
  items: LinkItem[];
  searchQuery: string;
}

function LinksList({ items, searchQuery }: LinksListProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        icon={
          <LinkIcon className="text-muted-foreground/50 h-8 w-8 md:h-12 md:w-12" />
        }
        title={searchQuery ? "No matching links" : "No links"}
        description={
          searchQuery
            ? "Try adjusting your search"
            : "Shared links will appear here"
        }
      />
    );
  }

  return (
    <div className="space-y-2 md:space-y-3">
      {items.map((link) => (
        <div
          key={link.id}
          className="group border-border bg-card hover:border-primary/50 flex items-start gap-3 rounded-lg border p-3 transition-all hover:shadow-md active:scale-[0.98] md:gap-4 md:p-4"
        >
          <div className="from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br transition-all md:h-12 md:w-12">
            <LinkIcon className="text-primary h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-foreground text-sm font-medium md:text-base">
              {link.title}
            </p>
            {link.description && (
              <p className="text-muted-foreground mt-0.5 line-clamp-1 text-xs md:text-sm">
                {link.description}
              </p>
            )}
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary mt-1.5 flex items-center gap-1 truncate text-xs hover:underline md:mt-2 md:text-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="truncate">{link.url}</span>
              <ExternalLink className="h-3 w-3 shrink-0" />
            </a>
            <p className="text-muted-foreground mt-1.5 flex items-center gap-1 text-xs md:mt-2 md:text-sm">
              <Calendar className="h-3 w-3" />
              <span className="hidden sm:inline">Shared on</span> {link.date}
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-8 shrink-0 text-xs md:h-9 md:text-sm"
            asChild
            onClick={(e) => e.stopPropagation()}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5 md:h-4 md:w-4" />
              <span className="hidden sm:inline">Visit</span>
              <span className="sm:hidden">Go</span>
            </a>
          </Button>
        </div>
      ))}
    </div>
  );
}

/* ========================================
   MAIN COMPONENT: MediaGallery
======================================== */

export function MediaGallery({
  isOpen,
  onClose,
  participantName,
}: MediaGalleryProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState("media");

  const totalItems =
    MOCK_MEDIA.images.length +
    MOCK_MEDIA.documents.length +
    MOCK_MEDIA.links.length;
  const totalSize = calculateTotalSize(MOCK_MEDIA.images);

  const filterItems = useCallback(
    <T extends { name?: string; title?: string }>(items: T[]): T[] => {
      if (!searchQuery.trim()) return items;
      return items.filter((item) => {
        const searchText = (
          "name" in item ? item.name || "" : item.title || ""
        ).toLowerCase();
        return searchText.includes(searchQuery.toLowerCase());
      });
    },
    [searchQuery],
  );

  const filteredImages = filterItems(MOCK_MEDIA.images);
  const filteredDocuments = filterItems(MOCK_MEDIA.documents);
  const filteredLinks = filterItems(MOCK_MEDIA.links);

  const handleImageClick = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="h-screen max-w-7xl gap-0 overflow-hidden rounded-none p-0 sm:rounded-xl md:h-[85vh] xl:min-w-7xl">
          {/* Header */}
          <DialogHeader className="border-border shrink-0 border-b px-4 pt-4 pb-3 md:px-6 md:pt-6 md:pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <DialogTitle className="text-foreground truncate text-xl font-bold md:text-2xl">
                  Shared Media
                </DialogTitle>
                <p className="text-muted-foreground mt-1 truncate text-xs md:text-sm">
                  {participantName} • {totalItems} items
                </p>
              </div>
              <Badge
                variant="secondary"
                className="h-7 shrink-0 text-xs md:h-auto md:text-sm"
              >
                <HardDrive className="mr-1 h-3 w-3 md:mr-1.5 md:h-3.5 md:w-3.5" />
                <span className="hidden sm:inline">{totalSize} MB</span>
                <span className="sm:hidden">{totalSize}MB</span>
              </Badge>
            </div>
          </DialogHeader>

          {/* Search Bar */}
          <div className="border-border bg-muted/30 shrink-0 border-b px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <Input
                  placeholder="Search files, images, links..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background h-9 rounded-full pl-9 text-sm md:h-10"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 shrink-0 md:h-10 md:w-10"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="border-border shrink-0 border-b">
              <TabsList className="mx-4 mt-3 mb-0 grid h-9 w-full max-w-md grid-cols-3 md:mx-6 md:mt-4 md:h-10">
                <TabsTrigger
                  value="media"
                  className="gap-1.5 text-xs md:gap-2 md:text-sm"
                >
                  <ImageIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Media</span>
                  <span className="sm:hidden">({filteredImages.length})</span>
                  <span className="hidden sm:inline">
                    ({filteredImages.length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="documents"
                  className="gap-1.5 text-xs md:gap-2 md:text-sm"
                >
                  <FileText className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Docs</span>
                  <span className="sm:hidden">
                    ({filteredDocuments.length})
                  </span>
                  <span className="hidden sm:inline">
                    ({filteredDocuments.length})
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="links"
                  className="gap-1.5 text-xs md:gap-2 md:text-sm"
                >
                  <LinkIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Links</span>
                  <span className="sm:hidden">({filteredLinks.length})</span>
                  <span className="hidden sm:inline">
                    ({filteredLinks.length})
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Content */}
            <div className="min-h-0 flex-1 px-4 pb-4 md:px-6 md:pb-6">
              <ScrollArea className="mt-3 h-full md:mt-4">
                <TabsContent value="media" className="mt-0">
                  <MediaGrid
                    items={filteredImages}
                    onImageClick={handleImageClick}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                <TabsContent value="documents" className="mt-0">
                  <DocumentsList
                    items={filteredDocuments}
                    searchQuery={searchQuery}
                  />
                </TabsContent>
                <TabsContent value="links" className="mt-0">
                  <LinksList items={filteredLinks} searchQuery={searchQuery} />
                </TabsContent>
              </ScrollArea>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>

      {selectedImageIndex !== null && (
        <ImageLightbox
          images={filteredImages}
          currentIndex={selectedImageIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
