'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
} from 'react-share';
import { Share2, Copy, Check, Send, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Custom premium brand SVG icons for perfect resolution and scaling
const WhatsappIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.445h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MessengerIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.14 2 11.24c0 2.9 1.45 5.5 3.73 7.2V22l3.41-1.87c.92.25 1.9.4 2.86.4 5.52 0 10-4.14 10-9.24C22 6.14 17.52 2 12 2zm1.08 11.58L10.5 10.8l-5.01 2.73 5.51-5.85 2.56 2.73 5-2.73-5.48 5.85z" />
  </svg>
);

const FacebookIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
    <path d="M14 13.5h2.5l1-3H14V8.5c0-.7.2-1 1-1h1.5V4.5c-.6-.1-1.4-.2-2.3-.2-2.3 0-3.7 1.4-3.7 3.9v2.3H8.5v3H10.5V20h3.5v-6.5z" />
  </svg>
);

const LinkedinIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5" aria-hidden="true">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const XIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const TelegramIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5.5 w-5.5" aria-hidden="true">
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.16-.22 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.577.194l-8.536 7.701-.332 4.981c.488 0 .705-.224.978-.488l2.35-2.285 4.887 3.61c.9.497 1.55.241 1.774-.836l3.203-15.093c.33-1.32-.505-1.92-1.375-1.52z" />
  </svg>
);

const EmailIconSvg = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

export interface ShareButtonProps {
  /** The full URL to share. Defaults to window.location.href */
  url?: string;
  /** Title of the content being shared */
  title: string;
  /** Summary or description of the content */
  summary?: string;
  /** Hashtags to append to social messages */
  hashtags?: string[];
  /** Popover alignment relative to the trigger button */
  align?: 'start' | 'center' | 'end';
  /** Visual theme variants */
  variant?: 'outline' | 'default' | 'secondary' | 'ghost';
  /** Size variant */
  size?: 'default' | 'sm' | 'lg' | 'icon';
  /** Optional custom trigger content to replace the default Share2 icon */
  children?: React.ReactNode;
  /** CSS class to style the trigger button */
  className?: string;
  /** Custom action ID for analytics tracking */
  shareId?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  url: propUrl,
  title,
  summary = '',
  hashtags = ['WorklyJob', 'Jobs', 'Career'],
  align = 'end',
  variant = 'outline',
  size = 'icon',
  children,
  className,
}) => {
  const [shareUrl, setShareUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Sync URL in client mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(propUrl || window.location.href);
    }
  }, [propUrl]);

  // Clipboard Copy Action
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy link');
      console.error('Clipboard copy failed:', err);
    }
  };

  // Messenger sharing handler: copies link with a guide for security & reliability
  const handleMessengerShare = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareUrl);
    toast.success('Messenger share link copied!', {
      description: 'Paste and send the link directly in your Messenger chats.',
      duration: 4000,
    });
  };

  // Native Web Share API integration (Highly premium UX on mobile)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: summary || title,
          url: shareUrl,
        });
        toast.success('Shared successfully!');
        setIsOpen(false);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Native share failed:', err);
        }
      }
    } else {
      // Fallback: copy link if native share called but unsupported
      handleCopyLink();
    }
  };

  // Formatted hashtags string (space-separated or array of hashtags)
  const twitterHashtags = hashtags.map((tag) => tag.replace('#', ''));

  const shareItems = [
    {
      name: 'Facebook',
      button: FacebookShareButton,
      icon: FacebookIconSvg,
      color:
        'bg-blue-50/80 dark:bg-blue-950/20 text-[#1877F2] border-blue-100/30 dark:border-blue-900/10 group-hover:bg-[#1877F2] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#1877F2]/20',
      props: { url: shareUrl, hashtag: `#${hashtags[0]}` },
    },
    {
      name: 'WhatsApp',
      button: WhatsappShareButton,
      icon: WhatsappIconSvg,
      color:
        'bg-emerald-50/80 dark:bg-emerald-950/20 text-[#25D366] border-emerald-100/30 dark:border-emerald-900/10 group-hover:bg-[#25D366] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#25D366]/20',
      props: { url: shareUrl, title: `${title} - Shared via Workly Job` },
    },
    {
      name: 'LinkedIn',
      button: LinkedinShareButton,
      icon: LinkedinIconSvg,
      color:
        'bg-sky-50/80 dark:bg-sky-950/20 text-[#0A66C2] border-sky-100/30 dark:border-sky-900/10 group-hover:bg-[#0A66C2] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#0A66C2]/20',
      props: { url: shareUrl, title: title, summary: summary },
    },
    {
      name: 'Messenger',
      button: 'div', // Handled by custom onClick
      icon: MessengerIconSvg,
      color:
        'bg-blue-50/80 dark:bg-blue-950/20 text-[#0084FF] border-blue-100/30 dark:border-blue-900/10 group-hover:bg-[#0084FF] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#0084FF]/20',
      onClick: handleMessengerShare,
      props: {},
    },
    {
      name: 'Telegram',
      button: TelegramShareButton,
      icon: TelegramIconSvg,
      color:
        'bg-cyan-50/80 dark:bg-cyan-950/20 text-[#24A1DE] border-cyan-100/30 dark:border-cyan-900/10 group-hover:bg-[#24A1DE] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#24A1DE]/20',
      props: { url: shareUrl, title: `${title} - Shared via Workly Job` },
    },
    {
      name: 'Twitter / X',
      button: TwitterShareButton,
      icon: XIconSvg,
      color:
        'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border-zinc-200/50 dark:border-zinc-700/50 group-hover:bg-zinc-900 dark:group-hover:bg-zinc-100 group-hover:text-white dark:group-hover:text-black group-hover:border-transparent group-hover:shadow-md',
      props: { url: shareUrl, title: title, hashtags: twitterHashtags },
    },
    {
      name: 'Email',
      button: EmailShareButton,
      icon: EmailIconSvg,
      color:
        'bg-rose-50/80 dark:bg-rose-950/20 text-[#EA4335] border-rose-100/30 dark:border-rose-900/10 group-hover:bg-[#EA4335] group-hover:text-white group-hover:border-transparent group-hover:shadow-md group-hover:shadow-[#EA4335]/20',
      props: {
        url: shareUrl,
        subject: `Job Posting: ${title}`,
        body: `Check out this job opportunity on Workly Job:\n\n${title}\n\nLink:`,
      },
    },
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant={variant}
            size={size}
            className={cn(
              'cursor-pointer rounded-xl border-gray-200 transition-all duration-300 dark:border-zinc-800',
              isOpen ? 'bg-primary/10 text-primary border-primary/20' : '',
              className,
            )}
            aria-label="Share options"
          >
            <Share2
              className={cn(
                'h-5 w-5',
                isOpen ? 'text-primary animate-pulse' : 'text-gray-400 dark:text-zinc-400',
              )}
            />
          </Button>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        sideOffset={8}
        className="bg-background/95 w-80 overflow-hidden rounded-2xl border border-zinc-100 p-0 shadow-2xl backdrop-blur-xl dark:border-zinc-800"
      >
        {/* Header Section */}
        <div className="border-b border-zinc-100 p-4 dark:border-zinc-800">
          <h3 className="text-foreground flex items-center gap-2 text-sm font-semibold tracking-tight">
            <Share2 className="text-primary h-4 w-4" />
            Share with your network
          </h3>
          <p className="text-muted-foreground mt-1 text-xs">
            Spread the word and help others discover this page
          </p>
        </div>

        {/* Share Items Grid */}
        <div className="grid max-h-[220px] grid-cols-4 gap-2 overflow-y-auto p-3">
          {shareItems.map((item, idx) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const ButtonComponent = item.button as any;
            const Icon = item.icon;

            const content = (
              <div className="flex flex-col items-center gap-2 px-1 py-2">
                <div
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-full border shadow-xs transition-all duration-300',
                    item.color,
                  )}
                >
                  <Icon />
                </div>
                <span className="text-muted-foreground group-hover:text-foreground w-full truncate text-center text-[10.5px] font-semibold transition-colors duration-300">
                  {item.name}
                </span>
              </div>
            );
            if (item.onClick) {
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    item.onClick(e);
                  }}
                  className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-transparent transition-all duration-300 focus:outline-none"
                >
                  {content}
                </button>
              );
            }

            return (
              <ButtonComponent
                key={idx}
                {...item.props}
                className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border border-transparent transition-all duration-300 outline-none focus:outline-none"
              >
                {content}
              </ButtonComponent>
            );
          })}
        </div>

        {/* Copy Link & Mobile Native Share Section */}
        <div className="flex flex-col gap-3 border-t border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="text-muted-foreground focus:border-primary/50 w-full truncate rounded-xl border border-zinc-200 bg-zinc-100 px-3 py-2 pr-8 text-xs select-all focus:outline-none dark:border-zinc-800 dark:bg-zinc-950"
              />
              <span className="text-muted-foreground/40 absolute top-1/2 right-2.5 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center">
                <ExternalLink className="h-3 w-3" />
              </span>
            </div>
            <Button
              variant={copied ? 'default' : 'outline'}
              size="icon"
              onClick={handleCopyLink}
              className={cn(
                'h-9 w-9 cursor-pointer rounded-xl border-zinc-200 transition-all duration-300 dark:border-zinc-800',
                copied ? 'border-transparent bg-emerald-500 text-white hover:bg-emerald-600' : '',
              )}
              title="Copy URL"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4 text-zinc-500" />}
            </Button>
          </div>

          {/* Premium Native Share Feature Indicator */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <Button
              variant="secondary"
              className="hover:bg-primary h-9 w-full cursor-pointer rounded-xl text-xs font-semibold transition-all duration-300 hover:text-white"
              onClick={handleNativeShare}
            >
              <Send className="mr-1.5 h-3.5 w-3.5" />
              More Share Options (System)
            </Button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
