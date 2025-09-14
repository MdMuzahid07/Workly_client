"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Archive,
  ArrowLeft,
  Info,
  MoreVertical,
  Phone,
  Search,
  Send,
  Star,
  Trash2,
  Video,
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

const MessageView = () => {
  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileChat, setShowMobileChat] = useState(false);

  const conversations: Conversation[] = [
    {
      id: "1",
      participantName: "Sarah Johnson",
      participantAvatar: "/professional-woman-diverse.png",
      participantRole: "HR Manager at TechFlow Inc.",
      lastMessage:
        "Thank you for your application. We would like to schedule an interview.",
      lastMessageTime: "2 hours ago",
      unreadCount: 2,
      isOnline: true,
      messages: [
        {
          id: "1",
          senderId: "sarah",
          senderName: "Sarah Johnson",
          senderAvatar: "/professional-woman-diverse.png",
          content:
            "Hi! I reviewed your application for the Frontend Developer position.",
          timestamp: "10:30 AM",
          isRead: true,
        },
        {
          id: "2",
          senderId: "sarah",
          senderName: "Sarah Johnson",
          senderAvatar: "/professional-woman-diverse.png",
          content:
            "Thank you for your application. We would like to schedule an interview.",
          timestamp: "10:32 AM",
          isRead: false,
        },
      ],
    },
    {
      id: "2",
      participantName: "Michael Chen",
      participantAvatar: "/professional-man.png",
      participantRole: "Recruiter at DataVision Labs",
      lastMessage: "Could you please send your portfolio?",
      lastMessageTime: "1 day ago",
      unreadCount: 0,
      isOnline: false,
      messages: [
        {
          id: "3",
          senderId: "michael",
          senderName: "Michael Chen",
          senderAvatar: "/professional-man.png",
          content: "Could you please send your portfolio?",
          timestamp: "Yesterday",
          isRead: true,
        },
      ],
    },
    {
      id: "3",
      participantName: "Emma Wilson",
      participantAvatar: "/professional-woman-2.png",
      participantRole: "CTO at InnovateCorp",
      lastMessage: "Great to meet you at the networking event!",
      lastMessageTime: "3 days ago",
      unreadCount: 0,
      isOnline: true,
      messages: [
        {
          id: "4",
          senderId: "emma",
          senderName: "Emma Wilson",
          senderAvatar: "/professional-woman-2.png",
          content: "Great to meet you at the networking event!",
          timestamp: "3 days ago",
          isRead: true,
        },
      ],
    },
  ];

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const currentConversation = conversations.find(
    (conv) => conv.id === selectedConversation,
  );

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedConversation) {
      console.log("Sending message:", newMessage);
      setNewMessage("");
    }
  };

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
    setShowMobileChat(true);
  };

  const handleBackToConversations = () => {
    setShowMobileChat(false);
    setSelectedConversation(null);
  };

  return (
    <div className="bg-background min-h-screen md:pt-14">
      {/* Header */}
      <div className="border-border bg-card sticky top-0 z-50 flex w-full justify-start border-b md:hidden">
        <div className="max-w-6xl p-4">
          {showMobileChat && selectedConversation && currentConversation ? (
            <div className="flex items-center space-x-3 lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToConversations}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={
                    currentConversation.participantAvatar || "/placeholder.svg"
                  }
                />
                <AvatarFallback>
                  {currentConversation.participantName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-foreground text-lg font-semibold">
                  {currentConversation.participantName}
                </h1>
                <p className="text-muted-foreground text-sm">
                  {currentConversation.participantRole}
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-foreground text-2xl font-bold">Messages</h1>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid h-[calc(100vh-200px)] grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Conversations Sidebar */}
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
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[calc(100vh-320px)]">
                  <div className="space-y-1">
                    {filteredConversations.map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`hover:bg-muted/50 cursor-pointer p-4 transition-colors ${
                          selectedConversation === conversation.id
                            ? "bg-primary/10 border-primary border-r-2"
                            : ""
                        }`}
                        onClick={() =>
                          handleConversationSelect(conversation.id)
                        }
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={
                                  conversation.participantAvatar ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback>
                                {conversation.participantName
                                  .split(" ")
                                  .map((n) => n[0])
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

          {/* Chat Area */}
          <div
            className={`lg:col-span-8 xl:col-span-9 ${!showMobileChat && selectedConversation ? "hidden lg:block" : showMobileChat || !selectedConversation ? "block" : "hidden lg:block"}`}
          >
            {selectedConversation && currentConversation ? (
              <Card className="flex h-full flex-col">
                {/* Chat Header */}
                <CardHeader className="border-border hidden border-b pb-3 lg:block">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={
                              currentConversation.participantAvatar ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {currentConversation.participantName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {currentConversation.isOnline && (
                          <div className="bg-primary border-background absolute -right-1 -bottom-1 h-3 w-3 rounded-full border-2"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="text-foreground font-semibold">
                          {currentConversation.participantName}
                        </h2>
                        <p className="text-muted-foreground text-sm">
                          {currentConversation.participantRole}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Star className="mr-2 h-4 w-4" />
                            Star Conversation
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Archive className="mr-2 h-4 w-4" />
                            Archive
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 p-0">
                  <ScrollArea className="h-[calc(100vh-280px)] p-4 lg:h-[calc(100vh-400px)]">
                    <div className="space-y-4">
                      {currentConversation.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.senderId === "current-user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex max-w-[85%] items-start space-x-2 sm:max-w-[70%] ${
                              message.senderId === "current-user"
                                ? "flex-row-reverse space-x-reverse"
                                : ""
                            }`}
                          >
                            <Avatar className="h-8 w-8 flex-shrink-0">
                              <AvatarImage
                                src={message.senderAvatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {message.senderName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              className={`rounded-lg px-4 py-2 ${
                                message.senderId === "current-user"
                                  ? "bg-primary text-primary-foreground"
                                  : "bg-muted text-foreground"
                              }`}
                            >
                              <p className="text-sm break-words">
                                {message.content}
                              </p>
                              <p
                                className={`mt-1 text-xs ${
                                  message.senderId === "current-user"
                                    ? "text-primary-foreground/70"
                                    : "text-muted-foreground"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>

                {/* Message Input */}
                <div className="border-border border-t p-4">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleSendMessage()
                      }
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                    <Send className="text-muted-foreground h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-2 text-lg font-semibold">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageView;
