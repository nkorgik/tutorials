import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatArea } from './components/ChatArea';
import { mockChats } from './data/mockData';
import type { Chat, Message } from './types';
import { getAIResponse } from './services/ai';
import './index.css';

function App() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  // For mobile view management
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeChat = chats.find(c => c.id === activeChatId);

  const handleChatSelect = (chat: Chat) => {
    setActiveChatId(chat.id);
    // Mark as read logic
    if (chat.unreadCount > 0) {
      setChats(prev => prev.map(c => {
        if (c.id === chat.id) {
          return { ...c, unreadCount: 0 };
        }
        return c;
      }));
    }
  };

  const handleSendMessage = (text: string) => {
    if (!activeChatId) return;

    const newMessage = {
      id: Date.now().toString(),
      text,
      senderId: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setChats(prev => prev.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: newMessage
        };
      }
      return c;
    }));

    // AI Response Logic
    // We only respond if the chat is not with "Me" (which is just a placeholder here, but let's assume all other users trigger AI)
    // Realistically, we'd check if it's an AI bot user. For this demo, let's treat everyone as AI except yourself.
    if (activeChatId) {
      setIsTyping(true);
      // Simulate network delay + typing
      const currentChatHistory = chats.find(c => c.id === activeChatId)?.messages || [];
      const historyWithNew = [...currentChatHistory, newMessage];

      getAIResponse(historyWithNew, text).then(aiText => {
        const aiMessage: Message = {
          id: Date.now().toString() + '_ai',
          text: aiText,
          senderId: activeChatId, // The other user sends it
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          read: false
        };

        setChats(prev => prev.map(c => {
          if (c.id === activeChatId) {
            return {
              ...c,
              messages: [...c.messages, aiMessage],
              lastMessage: aiMessage,
              unreadCount: c.id !== activeChatId ? c.unreadCount + 1 : 0 // If we switched away, increment unread (edge case in this synchronous flow)
            };
          }
          return c;
        }));
        setIsTyping(false);
      }).catch(err => {
        console.error("AI Error", err);
        setIsTyping(false);
      });
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg-main)] text-[var(--color-text-primary)] font-sans antialiased">
      {/* Sidebar - hidden on mobile if chat is open */}
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onChatSelect={handleChatSelect}
        className={`${isMobileView && activeChatId ? 'hidden' : 'flex'} w-full md:w-[420px] shrink-0`}
      />

      {/* Main Chat Area - hidden on mobile if no chat is open */}
      <div className={`flex-1 flex flex-col h-full min-w-0 bg-[#0e1621] ${isMobileView && !activeChatId ? 'hidden' : 'flex'}`}>
        {activeChat ? (
          <ChatArea
            chat={activeChat}
            onSendMessage={handleSendMessage}
            onBack={() => setActiveChatId(null)}
            isTyping={isTyping}
          />
        ) : (
          <div className="hidden md:flex flex-col items-center justify-center h-full text-[var(--color-text-secondary)] select-none">
            <div className="bg-[#212d3b] p-4 rounded-full mb-4">
              <span className="text-4xl">👋</span>
            </div>
            <p className="bg-[rgba(0,0,0,0.2)] px-4 py-1 rounded-full text-sm font-medium">
              Select a chat to start messaging
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
