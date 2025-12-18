import { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { CONTACTS, Contact, Message } from './data/contacts';
import { getAIResponse } from './services/ai';

function App() {
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [activeContactId, setActiveContactId] = useState<string | null>(CONTACTS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const activeContact = contacts.find(c => c.id === activeContactId) || contacts[0];

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = useCallback(async (text: string) => {
    if (!activeContactId) return;

    // 1. Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setContacts(prev => prev.map(c =>
      c.id === activeContactId
        ? { ...c, chatHistory: [...c.chatHistory, userMessage] }
        : c
    ));

    // 2. Trigger typing indicator
    setIsTyping(true);

    try {
      // 3. Get AI response
      // Map existing history (before the new message was added)
      const mappedHistory = activeContact.chatHistory.map(m => ({
        role: (m.sender === 'user' ? 'user' : 'model') as 'user' | 'model',
        parts: [{ text: m.text }]
      }));

      // Find the first index where role is 'user' to comply with Google API
      const firstUserIndex = mappedHistory.findIndex(h => h.role === 'user');
      const filteredHistory = firstUserIndex === -1 ? [] : mappedHistory.slice(firstUserIndex);

      const aiText = await getAIResponse(activeContact.systemPrompt, text, filteredHistory);

      // 4. Add AI message
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        sender: 'contact',
        timestamp: new Date()
      };

      setContacts(prev => prev.map(c =>
        c.id === activeContactId
          ? { ...c, chatHistory: [...c.chatHistory, aiMessage] }
          : c
      ));
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setIsTyping(false);
    }
  }, [activeContactId, activeContact.systemPrompt, activeContact.chatHistory]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-tg-bg text-tg-text">
      {/* Sidebar - Hidden on mobile if contact selected */}
      <div className={`${activeContactId && 'hidden md:block'} w-full md:w-auto`}>
        <Sidebar
          contacts={filteredContacts}
          activeContactId={activeContactId}
          onSelectContact={setActiveContactId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </div>

      {/* Main Chat Area - Full screen on mobile if active contact */}
      {activeContactId ? (
        <div className="flex-1 relative flex flex-col h-full">
          <ChatWindow
            contact={activeContact}
            onSendMessage={handleSendMessage}
            isTyping={isTyping}
            onBack={() => setActiveContactId(null)}
          />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-tg-chat text-tg-muted text-sm">
          Select a chat to start messaging
        </div>
      )}
    </div>
  );
}

export default App;
