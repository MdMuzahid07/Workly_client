# Messaging System Documentation

The client messaging system is built with Next.js, RTK Query, and Socket.io-client.

## Components
- `MessageView`: The main container for the messaging interface.
- `ConversationSidebar`: Lists active chats and search functionality.
- `MediaGallery`: Displays shared files and attachments (Placeholder).

## State Management
- `messageApi.ts`: RTK Query endpoints for conversations and history.
- `SocketProvider.tsx`: Context provider that manages the `socket.io-client` connection and lifecycle.

## Real-time Integration
The `MessageView` component uses the `useSocket` hook to listen for:
- `new_message`: Appends messages to the current view.
- `user_typing`: Shows typing indicators in the header/sidebar.
- `messages_read`: Updates the status of sent messages.

## Usage
To send a message, the `useSendMessageMutation` is called, which handles the DB persistence and triggers the server-side socket broadcast.

## Socket Connection
The connection is automatically established when an `accessToken` is present in the Redux store. It is terminated on logout.
