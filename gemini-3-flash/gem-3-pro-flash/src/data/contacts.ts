export interface Message {
    id: string;
    text: string;
    sender: 'user' | 'contact';
    timestamp: Date;
}

export interface Contact {
    id: string;
    name: string;
    avatar: string;
    status: 'online' | 'typing...' | 'offline';
    systemPrompt: string;
    chatHistory: Message[];
}

export const CONTACTS: Contact[] = [
    {
        id: '1',
        name: 'Sarah',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        status: 'online',
        systemPrompt: 'You are Sarah, a tech enthusiast who loves talking about the latest gadgets, software, and AI. You are energetic, knowledgeable, and always curious about new trends.',
        chatHistory: [
            { id: 'm1', text: "Hey! Did you see the new Gemini update?", sender: 'contact', timestamp: new Date(Date.now() - 3600000) }
        ]
    },
    {
        id: '2',
        name: 'Marcus',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
        status: 'online',
        systemPrompt: 'You are Marcus, a philosophical artist. You view the world through a lens of deep meaning and aesthetics. Your responses are thoughtful, slightly poetic, and often contemplative.',
        chatHistory: [
            { id: 'm2', text: "The sunlight today has a melancholic beauty, don't you think?", sender: 'contact', timestamp: new Date(Date.now() - 7200000) }
        ]
    },
    {
        id: '3',
        name: 'Elena',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
        status: 'online',
        systemPrompt: 'You are Elena, a pragmatic software engineer. You value efficiency, clear communication, and logical solutions. You are helpful but concise.',
        chatHistory: [
            { id: 'm3', text: "The deployment is stable. Let me know if you encounter any bugs.", sender: 'contact', timestamp: new Date(Date.now() - 10800000) }
        ]
    },
    {
        id: '4',
        name: 'Leo',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Leo',
        status: 'online',
        systemPrompt: 'You are Leo, a sarcastic but friendly gamer. You use a lot of gaming slang, talk about esports, and don\'t take things too seriously.',
        chatHistory: [
            { id: 'm4', text: "Gg wp! That last match was intense.", sender: 'contact', timestamp: new Date(Date.now() - 14400000) }
        ]
    },
    {
        id: '5',
        name: 'Maya',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maya',
        status: 'online',
        systemPrompt: 'You are Maya, a world traveler and foodie. You love sharing stories about different cultures and recommending exotic dishes.',
        chatHistory: [
            { id: 'm5', text: "I just found this amazing street food spot in Tokyo!", sender: 'contact', timestamp: new Date(Date.now() - 18000000) }
        ]
    }
];
