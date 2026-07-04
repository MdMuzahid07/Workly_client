import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import {
  DownloadIcon,
  ExternalLinkIcon,
  FileIcon,
  FilterIcon,
  ImageIcon,
  LinkIcon,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useMemo } from "react";
import type { Message } from "@/types/message";

interface MediaGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  participantName: string;
  onImageClick?: (index: number) => void;
}

const MediaGallery: React.FC<MediaGalleryProps> = ({
  isOpen,
  onClose,
  messages,
  participantName,
  onImageClick,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredItems = useMemo(() => {
    const media = messages.filter(
      (m) => m.messageType === "IMAGE" && m.status !== "DELETED",
    );
    const docs = messages.filter(
      (m) => m.messageType === "FILE" && m.status !== "DELETED",
    );
    const links = messages.filter(
      (m) =>
        (m.messageType === "LINK" ||
          (m.messageType === "TEXT" && m.content.match(/https?:\/\/[^\s]+/))) &&
        m.status !== "DELETED",
    );

    const filterFn = (m: Message) =>
      (m.fileName || m.content || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    return {
      media: media.filter(filterFn),
      docs: docs.filter(filterFn),
      links: links.filter(filterFn),
    };
  }, [messages, searchQuery]);

  const totalSize = useMemo(() => {
    const bytes = messages.reduce((acc, m) => acc + (m.fileSize || 0), 0);
    return (bytes / (1024 * 1024)).toFixed(1);
  }, [messages]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-background/95 sm:border-border/40 [&_[data-slot=dialog-close]]:border-border/60 [&_[data-slot=dialog-close]]:bg-muted/40 [&_[data-slot=dialog-close]]:hover:bg-muted/80 fixed top-0 left-0 flex h-full max-h-none w-full max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden rounded-none border-0 p-0 shadow-2xl backdrop-blur-xl sm:top-[50%] sm:left-[50%] sm:h-[85vh] sm:w-[90vw] sm:max-w-5xl sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-3xl sm:border md:w-[85vw] lg:w-[70vw] xl:w-[60vw] [&_[data-slot=dialog-close]]:top-4 [&_[data-slot=dialog-close]]:right-4 [&_[data-slot=dialog-close]]:flex [&_[data-slot=dialog-close]]:h-8 [&_[data-slot=dialog-close]]:w-8 [&_[data-slot=dialog-close]]:items-center [&_[data-slot=dialog-close]]:justify-center [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:border [&_[data-slot=dialog-close]]:transition-all">
        <DialogHeader className="p-4 pb-0 sm:p-6 sm:pb-0">
          <div className="mb-2 flex items-center justify-between pr-8 sm:pr-0">
            <DialogTitle className="text-xl font-black tracking-tight sm:text-2xl">
              Shared Media
            </DialogTitle>
            <Badge
              variant="secondary"
              className="bg-success/10 text-success border-success/20 mr-2 px-2 py-0.5 text-[10px] font-bold sm:mr-0 sm:px-3 sm:py-1 sm:text-xs"
            >
              <DownloadIcon className="mr-1 h-3 w-3 sm:mr-1.5 sm:h-3.5 sm:w-3.5" />
              {totalSize} MB
            </Badge>
          </div>
          <p className="text-muted-foreground text-xs font-medium sm:text-sm">
            {participantName} • {messages.length} Items
          </p>

          <div className="group relative mt-4 sm:mt-6">
            <SearchIcon className="text-muted-foreground group-focus-within:text-primary absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 transition-colors sm:left-4 sm:h-4.5 sm:w-4.5" />
            <Input
              placeholder="Search files, images, links..."
              className="bg-muted/30 border-muted-foreground/10 focus-visible:ring-primary/20 h-10 rounded-xl pl-10 text-xs sm:h-12 sm:pl-11 sm:text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FilterIcon className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 cursor-pointer transition-colors sm:right-4 sm:h-4.5 sm:w-4.5" />
          </div>
        </DialogHeader>

        <Tabs
          defaultValue="media"
          className="mt-4 flex flex-1 flex-col overflow-hidden sm:mt-6"
        >
          <div className="px-4 sm:px-6">
            <TabsList className="bg-muted/40 flex h-10 w-full justify-start gap-1 rounded-full p-1 sm:w-fit">
              <TabsTrigger
                value="media"
                className="text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 rounded-full px-3 py-1 text-xs font-bold transition-all data-[state=active]:shadow-xs sm:flex-initial sm:px-4 sm:py-1.5 sm:text-sm"
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Media ({filteredItems.media.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="docs"
                className="text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 rounded-full px-3 py-1 text-xs font-bold transition-all data-[state=active]:shadow-xs sm:flex-initial sm:px-4 sm:py-1.5 sm:text-sm"
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <FileIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Docs ({filteredItems.docs.length})</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="links"
                className="text-muted-foreground hover:text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex-1 rounded-full px-3 py-1 text-xs font-bold transition-all data-[state=active]:shadow-xs sm:flex-initial sm:px-4 sm:py-1.5 sm:text-sm"
              >
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <LinkIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>Links ({filteredItems.links.length})</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 p-4 sm:p-6">
            <TabsContent value="media" className="m-0 focus-visible:ring-0">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredItems.media.map((item: Message, idx: number) => (
                  <div
                    key={item.id}
                    onClick={() => onImageClick && onImageClick(idx)}
                    className="group border-border/50 hover:border-primary/30 relative aspect-square cursor-pointer overflow-hidden rounded-2xl border shadow-sm transition-all hover:shadow-xl"
                  >
                    <Image
                      src={item.fileUrl || "/placeholder.svg"}
                      alt={item.fileName || "Shared media"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      unoptimized={
                        item.fileUrl?.startsWith("data:") ||
                        item.fileUrl?.startsWith("blob:")
                      }
                    />
                    <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/80 via-black/20 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                      <p className="mb-1 truncate text-[10px] font-bold text-white/90">
                        {item.fileName}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-medium text-white/60">
                          {item.fileSize
                            ? (item.fileSize / 1024).toFixed(1)
                            : "0.0"}{" "}
                          KB
                        </span>
                        <a
                          href={item.fileUrl ?? undefined}
                          download
                          className="rounded-lg bg-white/20 p-1.5 backdrop-blur-md transition-colors hover:bg-white/40"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <DownloadIcon className="h-3.5 w-3.5 text-white" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredItems.media.length === 0 && (
                  <div className="text-muted-foreground col-span-full py-20 text-center font-medium">
                    No shared images found.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="docs" className="m-0 focus-visible:ring-0">
              <div className="space-y-3">
                {filteredItems.docs.map((item: Message) => (
                  <div
                    key={item.id}
                    className="group bg-muted/20 hover:bg-muted/40 border-border/40 flex items-center justify-between rounded-2xl border p-4 transition-all hover:translate-x-1"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                        <FileIcon className="text-primary h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="max-w-[300px] truncate text-sm font-black">
                          {item.fileName}
                        </h4>
                        <div className="mt-0.5 flex items-center gap-2">
                          <span className="text-muted-foreground text-[10px] font-bold uppercase">
                            {item.fileSize
                              ? (item.fileSize / 1024).toFixed(1)
                              : "0.0"}{" "}
                            KB
                          </span>
                          <span className="text-muted-foreground/30">•</span>
                          <span className="text-muted-foreground text-[10px] font-bold uppercase">
                            {format(new Date(item.createdAt), "MMM dd, yyyy")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={item.fileUrl ?? undefined}
                        download
                        className="bg-background hover:bg-primary hover:text-primary-foreground border-border/50 flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-bold shadow-sm transition-all"
                      >
                        <DownloadIcon className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </div>
                  </div>
                ))}
                {filteredItems.docs.length === 0 && (
                  <div className="text-muted-foreground py-20 text-center font-medium">
                    No shared documents found.
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="links" className="m-0 focus-visible:ring-0">
              <div className="space-y-3">
                {filteredItems.links.map((item: Message) => {
                  const urlMatch = item.content.match(/https?:\/\/[^\s]+/);
                  const url = urlMatch ? urlMatch[0] : "#";
                  return (
                    <div
                      key={item.id}
                      className="group bg-muted/20 hover:bg-muted/40 border-border/40 flex items-center justify-between rounded-2xl border p-4 transition-all hover:translate-x-1"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                          <LinkIcon className="text-primary h-6 w-6" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="max-w-[400px] truncate text-sm font-black">
                            Shared Link
                          </h4>
                          <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary mt-0.5 block truncate text-xs font-bold hover:underline"
                          >
                            {url}
                          </a>
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-muted-foreground text-[10px] font-bold uppercase">
                              Shared on{" "}
                              {format(new Date(item.createdAt), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </div>
                      </div>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-background hover:bg-primary hover:text-primary-foreground border-border/50 rounded-xl border p-2.5 shadow-sm transition-all"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </a>
                    </div>
                  );
                })}
                {filteredItems.links.length === 0 && (
                  <div className="text-muted-foreground py-20 text-center font-medium">
                    No shared links found.
                  </div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default MediaGallery;
