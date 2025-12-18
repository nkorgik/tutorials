import { Message } from "../data/contacts";
import { cn } from "../lib/utils";

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
    const isUser = message.sender === 'user';

    return (
        <div className={cn(
            "flex w-full mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300",
            isUser ? "justify-end" : "justify-start"
        )}>
            <div className={cn(
                "max-w-[70%] px-3 py-2 rounded-2xl relative shadow-sm",
                isUser
                    ? "bg-tg-bubble-user text-tg-text rounded-tr-none"
                    : "bg-tg-bubble-contact text-tg-text rounded-tl-none"
            )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                <div className={cn(
                    "flex justify-end items-center gap-1 mt-1",
                    isUser ? "text-tg-accent/80" : "text-tg-muted"
                )}>
                    <span className="text-[10px]">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    {isUser && (
                        <svg className="w-4 h-3" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 5L5 9L15 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5 9L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                </div>

                {/* Tail */}
                <div className={cn(
                    "absolute top-0 w-2 h-2",
                    isUser
                        ? "right-[-6px] text-tg-bubble-user"
                        : "left-[-6px] text-tg-bubble-contact"
                )}>
                    <svg className="w-full h-full" viewBox="0 0 10 10">
                        <path
                            d={isUser ? "M0 0 L10 0 L0 10 Z" : "M10 0 L0 0 L10 10 Z"}
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};
