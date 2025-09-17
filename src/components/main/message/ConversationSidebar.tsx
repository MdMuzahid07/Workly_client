/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Search } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { Input } from "../../ui/input";

const ConversationSidebar = ({
  showMobileChat,
  searchQuery,
  setSearchQuery,
  filteredConversations,
  selectedConversation,
  handleConversationSelect,
}: {
  showMobileChat: boolean;
  searchQuery: any;
  setSearchQuery: (query: string) => void;
  filteredConversations: any;
  selectedConversation: string | null;
  handleConversationSelect: (conversationId: string) => void;
}) => {
  return (
    <div
      className={`lg:col-span-4 xl:col-span-3 ${showMobileChat ? "hidden lg:block" : "block"}`}
    >
      <Card className="h-full">
        <CardHeader className="pb-3">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-full pl-10"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-320px)]">
            <div className="space-y-1">
              {filteredConversations.map((conversation: any) => (
                <div
                  key={conversation.id}
                  className={`hover:bg-muted/50 cursor-pointer p-4 transition-colors ${
                    selectedConversation === conversation.id
                      ? "bg-primary/10 border-primary border-r-2"
                      : ""
                  }`}
                  onClick={() => handleConversationSelect(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            conversation.participantAvatar || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {conversation.participantName
                            .split(" ")
                            .map((n: any) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.isOnline && (
                        <div className="bg-primary border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2"></div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-foreground truncate text-sm font-medium">
                          {conversation.participantName}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-muted-foreground text-xs">
                            {conversation.lastMessageTime}
                          </span>
                          {conversation.unreadCount > 0 && (
                            <Badge
                              variant="default"
                              className="flex h-5 w-5 items-center justify-center p-0 text-xs"
                            >
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-1 text-xs">
                        {conversation.participantRole}
                      </p>
                      <p className="text-muted-foreground truncate text-sm">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationSidebar;
