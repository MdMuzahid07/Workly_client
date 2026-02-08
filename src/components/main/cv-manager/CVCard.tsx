"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Resume } from "@/data/mockCVs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Download,
  Eye,
  FileText,
  MoreVertical,
  Star,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import PDFViewerModal from "../../shared/PDFViewerModal";

interface CVCardProps {
  resume: Resume;
  index: number;
}

const CVCard = ({ resume, index }: CVCardProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        className={cn(
          "group relative overflow-hidden border transition-all duration-300",
          resume.isMain
            ? "border-primary/50 ring-primary/20 ring-1"
            : "border-border/50",
        )}
      >
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary/5 text-primary group-hover:bg-primary flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h3 className="line-clamp-1 text-base font-bold tracking-tight">
                  {resume.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary rounded-lg border-none px-2 py-0.5 text-[10px] font-bold tracking-tight"
                  >
                    {resume.type}
                  </Badge>
                  {resume.isMain && (
                    <Badge
                      variant="default"
                      className="rounded-lg px-2 py-0.5 text-[10px] font-black tracking-widest uppercase"
                    >
                      Primary
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted h-8 w-8 rounded-full"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl p-2">
                <DropdownMenuItem className="h-10 cursor-pointer rounded-lg font-medium">
                  <Star className="mr-2 h-4 w-4" />
                  Set as Primary
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive h-10 cursor-pointer rounded-lg font-medium">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="border-border/40 mt-6 flex items-center justify-between border-t pt-4">
            <div className="text-muted-foreground/70 text-[11px] font-medium">
              <p>
                Uploaded on {new Date(resume.uploadedAt).toLocaleDateString()}
              </p>
              <p>{resume.fileSize}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-xl"
                onClick={() => setIsPreviewOpen(true)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                className="h-9 w-9 rounded-xl"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <PDFViewerModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        pdfUrl={resume.url}
        title={resume.name}
      />
    </motion.div>
  );
};

export default CVCard;
