export interface User {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'offline' | string;
}

export interface Message {
    id: string;
    text: string;
    timestamp: string;
    senderId: string; // 'me' or userId
    read?: boolean;
}

export interface Chat {
    id: string;
    user: User;
    messages: Message[];
    unreadCount: number;
    lastMessage?: Message;
}
