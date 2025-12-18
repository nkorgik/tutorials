import { Contact } from "../data/contacts";
import { cn } from "../lib/utils";

interface ContactItemProps {
    contact: Contact;
    active: boolean;
    onClick: () => void;
}

export const ContactItem = ({ contact, active, onClick }: ContactItemProps) => {
    const lastMessage = contact.chatHistory[contact.chatHistory.length - 1];

    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 p-3 cursor-pointer transition-colors duration-200",
                active ? "bg-tg-accent/20" : "hover:bg-tg-chat/50"
            )}
        >
            <div className="relative flex-shrink-0">
                <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-12 h-12 rounded-full border-2 border-tg-sidebar"
                />
                {contact.status === 'online' && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-tg-sidebar" />
                )}
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-tg-text truncate">{contact.name}</h3>
                    <span className="text-[10px] text-tg-muted">
                        {lastMessage?.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="text-xs text-tg-muted truncate">
                    {contact.status === 'typing...' ? (
                        <span className="text-tg-accent font-medium">typing...</span>
                    ) : (
                        lastMessage?.text || "No messages yet"
                    )}
                </p>
            </div>
        </div>
    );
};
