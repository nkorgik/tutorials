import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Mic, Send, MoreVertical, Phone, Search } from 'lucide-react';
import type { Chat } from '../types';

interface ChatAreaProps {
    chat: Chat;
    onSendMessage: (text: string) => void;
    onBack: () => void; // For mobile
    isTyping?: boolean;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ chat, onSendMessage, onBack, isTyping }) => {
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chat.messages]);

    const handleSend = () => {
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-[var(--color-bg-chat)] relative w-full">
            {/* Background Pattern - subtle repeating pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            {/* Header */}
            <div className="flex items-center justify-between p-2 pl-4 pr-4 bg-[var(--color-bg-sidebar)] border-b border-[#12181e] z-10 sticky top-0 h-14 shrink-0">
                <div className="flex items-center cursor-pointer" onClick={onBack}>
                    {/* Back button for mobile only, handled by parent usually but good to have nice UX */}
                    <div className="md:hidden mr-3 text-[var(--color-text-secondary)]">←</div>

                    <img src={chat.user.avatar} alt={chat.user.name} className="w-9 h-9 rounded-full object-cover" />
                    <div className="ml-3">
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{chat.user.name}</h3>
                        <p className="text-xs text-[var(--color-text-secondary)]">{chat.user.status}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-[var(--color-text-secondary)]">
                    <Search size={22} className="cursor-pointer hover:text-[var(--color-text-primary)]" />
                    <Phone size={22} className="cursor-pointer hover:text-[var(--color-text-primary)]" />
                    <MoreVertical size={22} className="cursor-pointer hover:text-[var(--color-text-primary)]" />
                </div>
            </div>

            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar relative z-0">
                {chat.messages.map((message) => {
                    const isMe = message.senderId === 'me';
                    return (
                        <div
                            key={message.id}
                            className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-[70%] md:max-w-[480px] rounded-lg p-2 pl-3 pr-3 relative shadow-sm text-[15px] leading-snug break-words ${isMe
                                    ? 'bg-[var(--color-bubble-sent)] text-white rounded-tr-none'
                                    : 'bg-[var(--color-bubble-received)] text-white rounded-tl-none'
                                    }`}
                            >
                                {message.text}
                                <div className={`text-[11px] text-right mt-1 opacity-70 flex justify-end items-center gap-1 ${isMe ? 'text-[#aaddff]' : 'text-[#8b9bb4]'}`}>
                                    <span>{message.timestamp}</span>
                                    {isMe && (
                                        <span className="text-[14px]">{message.read ? '✓✓' : '✓'}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-[var(--color-bubble-received)] text-[var(--color-text-secondary)] rounded-lg rounded-tl-none p-3 shadow-sm inline-flex items-center space-x-1">
                            <div className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-[var(--color-text-secondary)] rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-2 pb-3 bg-[var(--color-bg-sidebar)] border-t border-[#12181e] z-10 shrink-0">
                <div className="flex items-end space-x-2 max-w-4xl mx-auto">
                    <button className="p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                        <Paperclip size={24} />
                    </button>

                    <div className="flex-1 bg-[#242f3d] rounded-2xl flex items-center min-h-[44px]">
                        <textarea
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write a message..."
                            className="w-full bg-transparent text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] px-4 py-3 focus:outline-none resize-none overflow-hidden"
                            rows={1}
                            style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                    </div>

                    <button
                        onClick={inputText.trim() ? handleSend : undefined}
                        className={`p-3 rounded-full transition-all transform duration-200 ${inputText.trim()
                            ? 'text-[var(--color-accent)] hover:bg-[rgba(82,136,193,0.1)] rotate-0 scale-100'
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.05)]'
                            }`}
                    >
                        {inputText.trim() ? <Send size={24} /> : <Mic size={24} />}
                    </button>
                </div>
            </div>
        </div>
    );
};
