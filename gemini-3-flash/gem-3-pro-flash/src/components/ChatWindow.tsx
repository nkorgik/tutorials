import { useEffect, useRef } from "react";
import { MoreVertical, Search, Phone, ChevronLeft } from "lucide-react";
import { Contact } from "../data/contacts";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { ChatBackground } from "./ChatBackground";

interface ChatWindowProps {
    contact: Contact;
    onSendMessage: (text: string) => void;
    isTyping: boolean;
    onBack: () => void;
}

export const ChatWindow = ({ contact, onSendMessage, isTyping, onBack }: ChatWindowProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [contact.chatHistory, isTyping]);

    return (
        <div className="flex-1 flex flex-col h-full bg-tg-chat relative">
            <ChatBackground />

            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 bg-tg-sidebar border-b border-black/20 z-10">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="md:hidden p-1 -ml-2 text-tg-accent hover:bg-tg-accent/10 rounded-full transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="min-w-0">
                        <h2 className="text-sm font-semibold text-tg-text truncate">{contact.name}</h2>
                        <p className="text-[11px] text-tg-accent">
                            {isTyping ? "typing..." : "online"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-tg-muted">
                    <Search className="w-5 h-5 cursor-pointer hover:text-tg-text transition-colors" />
                    <Phone className="w-5 h-5 cursor-pointer hover:text-tg-text transition-colors" />
                    <MoreVertical className="w-5 h-5 cursor-pointer hover:text-tg-text transition-colors" />
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 flex flex-col z-10 scroll-smooth"
            >
                <div className="flex-1" />
                {contact.chatHistory.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
                {isTyping && (
                    <div className="flex justify-start mb-4">
                        <div className="bg-tg-bubble-contact px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1">
                            <div className="w-1.5 h-1.5 bg-tg-muted rounded-full animate-bounce" />
                            <div className="w-1.5 h-1.5 bg-tg-muted rounded-full animate-bounce [animation-delay:0.2s]" />
                            <div className="w-1.5 h-1.5 bg-tg-muted rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="z-10">
                <MessageInput onSendMessage={onSendMessage} disabled={isTyping} />
            </div>
        </div>
    );
};
