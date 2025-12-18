import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import type { Chat } from '../types';
import { ChatListItem } from './ChatListItem';

interface SidebarProps {
    chats: Chat[];
    activeChatId: string | null;
    onChatSelect: (chat: Chat) => void;
    className?: string; // Support for responsive hiding
}

export const Sidebar: React.FC<SidebarProps> = ({ chats, activeChatId, onChatSelect, className = '' }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredChats = chats.filter(chat =>
        chat.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage?.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`flex flex-col h-full bg-[var(--color-bg-sidebar)] border-r border-[#12181e] w-full md:w-[420px] ${className}`}>
            {/* Header / Search */}
            <div className="p-2 gap-2 flex items-center">
                <button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] rounded-full hover:bg-[rgba(255,255,255,0.05)] md:hidden">
                    <Menu size={24} />
                </button>
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-[#242f3d] text-[var(--color-text-primary)] placeholder-[var(--color-text-secondary)] rounded-full py-2 pl-10 pr-4 text-[15px] focus:outline-none focus:bg-transparent focus:ring-1 focus:ring-[#5288c1] border border-transparent focus:border-[#5288c1] transition-all"
                    />
                    <Search className="absolute left-3 top-2.5 text-[var(--color-text-secondary)]" size={18} />
                </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredChats.map(chat => (
                    <ChatListItem
                        key={chat.id}
                        chat={chat}
                        isActive={activeChatId === chat.id}
                        onClick={onChatSelect}
                    />
                ))}
            </div>
        </div>
    );
};
