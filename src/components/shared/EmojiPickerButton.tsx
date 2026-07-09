"use client";

import * as React from "react";
import { useState } from "react";
import { Smile } from "lucide-react";
import {
  EmojiPicker,
  type EmojiPickerListCategoryHeaderProps,
  type EmojiPickerListRowProps,
  type EmojiPickerListEmojiProps,
} from "frimousse";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface EmojiPickerButtonProps {
  /**
   * Callback function triggered when an emoji is selected.
   * Receives the raw emoji character (e.g. "😀").
   */
  onEmojiSelect: (emoji: string) => void;
  /**
   * Optional CSS class name for the trigger button.
   */
  className?: string;
}

const CustomCategoryHeader = React.forwardRef<
  HTMLDivElement,
  EmojiPickerListCategoryHeaderProps
>(({ category, className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-popover/90 text-muted-foreground sticky top-0 z-10 py-1 text-[10px] font-bold tracking-wider uppercase backdrop-blur-xs select-none",
      className,
    )}
    {...props}
  >
    {category.label}
  </div>
));
CustomCategoryHeader.displayName = "CustomCategoryHeader";

const CustomRow = React.forwardRef<HTMLDivElement, EmojiPickerListRowProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-8 justify-items-center gap-1 py-0.5",
        className,
      )}
      {...props}
    />
  ),
);
CustomRow.displayName = "CustomRow";

const CustomEmoji = React.forwardRef<
  HTMLButtonElement,
  EmojiPickerListEmojiProps
>(({ emoji, className, ...props }, ref) => (
  <button
    ref={ref}
    type="button"
    className={cn(
      "hover:bg-primary/10 flex aspect-square cursor-pointer items-center justify-center rounded-md p-1 text-lg transition-all duration-200 outline-none select-none active:scale-95",
      emoji.isActive && "bg-primary/20 scale-110",
      className,
    )}
    title={emoji.label}
    {...props}
  >
    {emoji.emoji}
  </button>
));
CustomEmoji.displayName = "CustomEmoji";

/**
 * A reusable Emoji Picker Button component built with Radix Popover and Liveblocks Frimousse.
 * Lazily loads Frimousse's emoji list assets on popover trigger click.
 */
export default function EmojiPickerButton({
  onEmojiSelect,
  className,
}: EmojiPickerButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "hover:bg-muted text-muted-foreground h-9 w-9 shrink-0 rounded-full",
            className,
          )}
        >
          <Smile className="h-5 w-5" />
          <span className="sr-only">Choose emoji</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="top"
        sideOffset={8}
        className="bg-popover border-border border-border/40 max-h-80 w-[325px] rounded-2xl border p-3 shadow-md shadow-xs outline-hidden"
      >
        {/* Lazy render picker only when popover is open to prevent eager assets fetching */}
        {open && (
          <EmojiPicker.Root
            columns={8}
            onEmojiSelect={(emoji) => {
              onEmojiSelect(emoji.emoji);
              setOpen(false);
            }}
            className="flex h-72 flex-col gap-2"
          >
            <EmojiPicker.Search
              placeholder="Search emojis..."
              className="border-input/60 focus-visible:ring-primary/20 bg-muted/20 placeholder:text-muted-foreground flex h-8 w-full rounded-xl border px-3 py-1.5 text-xs shadow-2xs transition-colors focus-visible:ring-2 focus-visible:outline-hidden"
            />
            <EmojiPicker.Viewport className="scrollbar-thin scrollbar-thumb-muted-foreground/10 scrollbar-track-transparent mt-1 max-h-60 flex-1 overflow-x-hidden overflow-y-auto pr-0.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <EmojiPicker.Loading className="text-muted-foreground block animate-pulse py-12 text-center text-xs font-semibold">
                Loading emojis...
              </EmojiPicker.Loading>
              <EmojiPicker.Empty className="text-muted-foreground block py-12 text-center text-xs font-medium">
                No emojis found
              </EmojiPicker.Empty>
              <EmojiPicker.List
                components={{
                  CategoryHeader: CustomCategoryHeader,
                  Row: CustomRow,
                  Emoji: CustomEmoji,
                }}
              />
            </EmojiPicker.Viewport>
          </EmojiPicker.Root>
        )}
      </PopoverContent>
    </Popover>
  );
}
