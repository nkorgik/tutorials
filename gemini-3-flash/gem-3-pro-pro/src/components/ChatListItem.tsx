import React from 'react';
import type { Chat } from '../types';

interface ChatListItemProps {
    chat: Chat;
    isActive: boolean;
    onClick: (chat: Chat) => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat, isActive, onClick }) => {
    return (
        <div
            onClick={() => onClick(chat)}
            className={`flex items-center p-2.5 cursor-pointer transition-colors duration-200 ${isActive
                ? 'bg-[#2b5278] hover:bg-[#2b5278]'
                : 'hover:bg-[#202b36]'
                }`}
        >
            <div className="relative flex-shrink-0">
                <img
                    src={chat.user.avatar}
                    alt={chat.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                />
                {chat.user.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[var(--color-bg-sidebar)] rounded-full"></div>
                )}
            </div>

            <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className={`text-[15px] font-medium truncate ${isActive ? 'text-white' : 'text-[var(--color-text-primary)]'}`}>
                        {chat.user.name}
                    </h3>
                    <span className={`text-xs ${isActive ? 'text-[#dbeafe]' : 'text-[var(--color-text-secondary)]'}`}>
                        {chat.lastMessage?.timestamp}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <p className={`text-[14px] truncate flex-1 ${isActive ? 'text-[#dbeafe]' : 'text-[var(--color-text-secondary)]'}`}>
                        {chat.lastMessage?.senderId === 'me' && <span className="text-accent mr-1">You:</span>}
                        {chat.lastMessage?.text}
                    </p>

                    {chat.unreadCount > 0 && (
                        <div className={`ml-2 min-w-[20px] h-5 px-1.5 rounded-full flex items-center justify-center text-xs font-bold ${isActive ? 'bg-white text-[var(--color-bubble-sent)]' : 'bg-[#3e546a] text-white'
                            }`}>
                            {chat.unreadCount}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
