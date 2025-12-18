import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Mic } from "lucide-react";

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
    const [text, setText] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (text.trim() && !disabled) {
            onSendMessage(text.trim());
            setText("");
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className="p-3 bg-tg-chat border-t border-black/10 flex items-end gap-2">
            <button className="p-2 text-tg-muted hover:text-tg-accent transition-colors flex-shrink-0">
                <Paperclip className="w-6 h-6" />
            </button>

            <div className="flex-1 bg-tg-bg rounded-2xl px-4 py-2 flex items-center min-h-[44px]">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    placeholder="Write a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-sm resize-none py-1 max-h-32 text-tg-text placeholder:text-tg-muted"
                />
            </div>

            <button
                onClick={handleSend}
                disabled={disabled || !text.trim()}
                className="p-2 bg-tg-accent hover:bg-tg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all rounded-full flex-shrink-0"
            >
                {text.trim() ? (
                    <Send className="w-6 h-6 text-white" />
                ) : (
                    <Mic className="w-6 h-6 text-white" />
                )}
            </button>
        </div>
    );
};
