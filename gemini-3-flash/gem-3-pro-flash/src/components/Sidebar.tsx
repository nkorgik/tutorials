import { Search, Menu } from "lucide-react";
import { Contact } from "../data/contacts";
import { ContactItem } from "./ContactItem";

interface SidebarProps {
    contacts: Contact[];
    activeContactId: string | null;
    onSelectContact: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const Sidebar = ({
    contacts,
    activeContactId,
    onSelectContact,
    searchQuery,
    onSearchChange
}: SidebarProps) => {
    return (
        <div className="w-full md:w-[350px] lg:w-[400px] h-full flex flex-col bg-tg-sidebar border-r border-black/20 z-10">
            <div className="p-4 flex items-center gap-4">
                <button className="text-tg-muted hover:text-tg-text transition-colors">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-tg-muted" />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-tg-bg border-none rounded-2xl py-2 pl-10 pr-4 text-sm focus:ring-1 focus:ring-tg-accent outline-none"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {contacts.map(contact => (
                    <ContactItem
                        key={contact.id}
                        contact={contact}
                        active={activeContactId === contact.id}
                        onClick={() => onSelectContact(contact.id)}
                    />
                ))}
            </div>
        </div>
    );
};
