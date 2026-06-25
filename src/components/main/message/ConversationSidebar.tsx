import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Conversation } from "@/types/message";

interface ConversationSidebarProps {
  showMobileChat: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredConversations: Conversation[];
  selectedConversation: string | null;
  handleConversationSelect: (conversationId: string) => void;
}

const ConversationSidebar = ({
  showMobileChat,
  searchQuery,
  setSearchQuery,
  filteredConversations,
  selectedConversation,
  handleConversationSelect,
}: ConversationSidebarProps) => {
  return (
    <div
      className={`lg:col-span-4 xl:col-span-3 ${showMobileChat ? "hidden lg:block" : "block"} h-full`}
    >
      <Card className="lg:bg-card/50 flex h-full flex-col overflow-hidden border-none bg-transparent shadow-none lg:border lg:shadow-sm lg:backdrop-blur-xl">
        {/* Sidebar Header - Compact & Clean */}
        <CardHeader className="px-5 py-5 lg:px-5 lg:py-6">
          <div className="group relative flex items-center space-x-3">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="text-muted-foreground/50 group-focus-within:text-primary h-4.5 w-4.5 transition-colors" />
            </div>
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/40 focus-within:ring-primary/5 focus-visible:ring-primary/10 h-12 w-full rounded-full border pr-12 pl-11 text-sm font-semibold transition-all focus-within:ring-4 focus-visible:ring-2"
            />
          </div>
        </CardHeader>

        {/* Conversation List - Edge to Edge on Mobile */}
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-[calc(100vh-200px)] lg:h-[calc(100vh-260px)]">
            <div className="space-y-0.5 pb-8 lg:space-y-1.5 lg:px-3">
              {filteredConversations.map((conversation: Conversation) => {
                const isActive = selectedConversation === conversation.id;
                return (
                  <div
                    key={conversation.id}
                    className={`group border-border/5 relative flex cursor-pointer items-center space-x-4 border-b px-5 py-5 transition-all duration-300 lg:rounded-lg lg:border-none lg:p-4 ${
                      isActive
                        ? "bg-primary/5 lg:bg-primary/10 shadow-none"
                        : "hover:bg-muted/40 lg:hover:bg-muted/50"
                    }`}
                    onClick={() => handleConversationSelect(conversation.id)}
                  >
                    {/* Active Indicator - Native Style */}
                    {isActive && (
                      <div className="bg-primary absolute top-0 bottom-0 left-0 w-1 shadow-[2px_0_8px_rgba(var(--primary),0.3)] lg:top-1/2 lg:h-8 lg:w-1.5 lg:-translate-y-1/2 lg:rounded-r-full" />
                    )}

                    {/* Avatar with Enhanced Presence */}
                    <div className="relative shrink-0">
                      <div
                        className={`rounded-2xl p-0.5 transition-all duration-300 ${isActive ? "scale-105" : ""}`}
                      >
                        <Avatar className="border-background h-14 w-14 rounded-2xl border-2 shadow-lg lg:h-12 lg:w-12">
                          <AvatarImage
                            src={
                              conversation.participantAvatar ||
                              "/placeholder.svg"
                            }
                            className="object-cover"
                          />
                          <AvatarFallback className="from-primary/10 to-primary/20 text-primary rounded-2xl bg-linear-to-br text-base font-black lg:text-sm">
                            {conversation.participantName
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div
                        className={`border-background absolute -right-1 -bottom-1 h-4.5 w-4.5 rounded-full border-3 shadow-sm lg:h-4 lg:w-4 ${conversation.isOnline ? "bg-success" : "bg-muted-foreground/30"}`}
                      />
                    </div>

                    {/* Info Preview - Better Mobile Hierarchy */}
                    <div className="min-w-0 flex-1 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`truncate text-base leading-none font-black tracking-tight transition-colors lg:text-sm ${isActive ? "text-primary" : "text-foreground/90"}`}
                        >
                          {conversation.participantName}
                        </h3>
                        <span
                          className={`text-[10px] font-black tracking-widest uppercase ${isActive ? "text-primary/80" : "text-muted-foreground/50"}`}
                        >
                          {conversation.lastMessageTime}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <p
                          className={`truncate text-sm leading-tight transition-colors lg:text-xs ${isActive ? "text-primary/80 font-bold" : "text-muted-foreground/80 font-medium"}`}
                        >
                          {conversation.lastMessage}
                        </p>
                        {(conversation.unreadCount ?? 0) > 0 && (
                          <Badge className="bg-primary text-primary-foreground shadow-primary/30 animate-in zoom-in h-5.5 min-w-[22px] rounded-full px-1.5 text-[10px] font-black shadow-xl">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationSidebar;
