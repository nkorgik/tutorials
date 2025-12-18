import type { Chat, User } from '../types';

export const currentUser: User = {
    id: 'me',
    name: 'Me',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    status: 'online'
};

const users: User[] = [
    {
        id: 'u1',
        name: 'Sarah Connor',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        status: 'online'
    },
    {
        id: 'u2',
        name: 'John Wick',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        status: 'last seen 5 mins ago'
    },
    {
        id: 'u3',
        name: 'Alice Wonderland',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        status: 'online'
    },
    {
        id: 'u4',
        name: 'Bob Builder',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        status: 'last seen yesterday'
    },
    {
        id: 'u5',
        name: 'Eva Green',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
        status: 'online'
    }
];

export const mockChats: Chat[] = [
    {
        id: 'c1',
        user: users[0],
        unreadCount: 2,
        messages: [
            { id: 'm1', text: 'Hey, are we still on for the mission?', senderId: 'u1', timestamp: '10:30 AM' },
            { id: 'm2', text: 'Yes, absolutely.', senderId: 'me', timestamp: '10:32 AM', read: true },
            { id: 'm3', text: 'Great! Bring the gear.', senderId: 'u1', timestamp: '10:33 AM' },
            { id: 'm4', text: 'See you there.', senderId: 'u1', timestamp: '10:33 AM' }
        ]
    },
    {
        id: 'c2',
        user: users[1],
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'Need a reservation for 12.', senderId: 'me', timestamp: 'Yesterday', read: true },
            { id: 'm2', text: 'Consider it done.', senderId: 'u2', timestamp: 'Yesterday' }
        ]
    },
    {
        id: 'c3',
        user: users[2],
        unreadCount: 5,
        messages: [
            { id: 'm1', text: 'Have you seen the white rabbit?', senderId: 'u3', timestamp: '9:00 AM' },
            { id: 'm2', text: 'He is running late again.', senderId: 'u3', timestamp: '9:01 AM' },
            { id: 'm3', text: 'Wait, I see him!', senderId: 'u3', timestamp: '9:05 AM' },
            { id: 'm4', text: 'Nevermind, it was a cat.', senderId: 'u3', timestamp: '9:10 AM' },
            { id: 'm5', text: 'Hello?', senderId: 'u3', timestamp: '9:15 AM' }
        ]
    },
    {
        id: 'c4',
        user: users[3],
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'Can we fix it?', senderId: 'u4', timestamp: 'Mon' },
            { id: 'm2', text: 'Yes we can!', senderId: 'me', timestamp: 'Mon', read: true }
        ]
    },
    {
        id: 'c5',
        user: users[4],
        unreadCount: 0,
        messages: [
            { id: 'm1', text: 'Casino Royale tonight?', senderId: 'me', timestamp: 'Sun', read: true },
            { id: 'm2', text: 'I am in.', senderId: 'u5', timestamp: 'Sun' }
        ]
    }
];

// Enrich chats with lastMessage for preview
mockChats.forEach(chat => {
    chat.lastMessage = chat.messages[chat.messages.length - 1];
});
