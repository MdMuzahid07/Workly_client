/**
 * Central domain types for the messaging feature.
 * Used by: ConversationSidebar, MediaGallery, MediaLightbox.
 */

export type MessageType = 'TEXT' | 'IMAGE' | 'FILE' | 'LINK' | 'AUDIO' | 'VIDEO';

export type MessageStatus = 'SENT' | 'DELIVERED' | 'READ' | 'DELETED';

export interface Message {
  id: string;
  content: string;
  messageType: MessageType;
  status: MessageStatus;
  createdAt: string;
  senderId?: string;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: number | null;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantAvatar?: string | null;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline?: boolean;
}
