import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Conversation } from '@/types/message';
import { Search } from 'lucide-react';

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
      className={`xl:col-span-3.5 lg:col-span-4 ${
        showMobileChat ? 'hidden lg:block' : 'block'
      } h-full min-h-0`}
    >
      <Card className="bg-card flex h-full flex-col gap-0 overflow-hidden rounded-2xl border p-0 shadow-xs">
        {/* Sidebar Header - Compact & Clean */}
        <CardHeader className="border-border/40 border-b p-3.5 sm:p-4">
          <div className="group relative flex items-center">
            <Search className="text-muted-foreground group-focus-within:text-primary absolute left-3.5 h-4 w-4 transition-colors" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-muted/30 focus-visible:ring-primary/20 border-border/60 h-10 w-full rounded-full border pr-4 pl-9 text-xs font-semibold transition-all focus-visible:ring-2 sm:text-sm"
            />
          </div>
        </CardHeader>

        {/* Conversation List */}
        <CardContent className="flex-1 overflow-hidden p-0">
          <ScrollArea className="h-full">
            <div className="space-y-1 p-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation: Conversation) => {
                  const isActive = selectedConversation === conversation.id;
                  return (
                    <div
                      key={conversation.id}
                      className={`group relative flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all duration-200 ${
                        isActive
                          ? 'bg-primary/10 border-l-primary border-l-4 shadow-2xs'
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleConversationSelect(conversation.id)}
                    >
                      {/* Avatar with Presence */}
                      <div className="relative shrink-0">
                        <Avatar className="border-background h-11 w-11 rounded-xl border shadow-2xs sm:h-12 sm:w-12">
                          <AvatarImage
                            src={conversation.participantAvatar || '/placeholder.svg'}
                            className="object-cover"
                          />
                          <AvatarFallback className="bg-primary/10 text-primary rounded-xl text-xs font-black sm:text-sm">
                            {conversation.participantName
                              .split(' ')
                              .map((n: string) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`border-background absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 rounded-full border-2 shadow-2xs ${
                            conversation.isOnline ? 'bg-emerald-500' : 'bg-muted-foreground/40'
                          }`}
                        />
                      </div>

                      {/* Info Preview */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h3
                            className={`truncate text-xs font-bold tracking-tight transition-colors sm:text-sm ${
                              isActive ? 'text-primary' : 'text-foreground'
                            }`}
                          >
                            {conversation.participantName}
                          </h3>
                          <span
                            className={`shrink-0 text-[10px] font-semibold ${
                              isActive ? 'text-primary/80' : 'text-muted-foreground/70'
                            }`}
                          >
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <p
                            className={`truncate text-xs leading-tight transition-colors ${
                              isActive
                                ? 'text-primary/90 font-medium'
                                : 'text-muted-foreground font-normal'
                            }`}
                          >
                            {conversation.lastMessage}
                          </p>
                          {(conversation.unreadCount ?? 0) > 0 && (
                            <Badge className="bg-primary text-primary-foreground h-5 min-w-[20px] shrink-0 rounded-full px-1.5 text-[10px] font-bold">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-muted-foreground p-6 text-center text-xs font-medium">
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationSidebar;
