import { useState } from 'react';
import { Search, MoreVertical, MessageCircle, Phone, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  last_message: string;
  last_message_time: string;
  unread_count: number;
  is_online: boolean;
}

interface ContactsSidebarProps {
  contacts: Contact[];
  selectedContactId: string | null;
  onSelectContact: (contactId: string) => void;
}

const ContactsSidebar = ({ contacts, selectedContactId, onSelectContact }: ContactsSidebarProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-white">Chats</h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-white hover:bg-gray-700">
              <MessageCircle className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-gray-300 hover:text-white hover:bg-gray-700">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400 rounded-lg focus:border-blue-500"
          />
        </div>
      </div>

      {/* Contacts List */}
      <ScrollArea className="flex-1">
        <div className="divide-y divide-gray-700">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => onSelectContact(contact.id)}
              className={`p-4 hover:bg-gray-800 cursor-pointer transition-colors ${
                selectedContactId === contact.id ? 'bg-blue-900 border-r-4 border-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                    {contact.avatar}
                  </div>
                  {contact.is_online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-gray-900"></div>
                  )}
                </div>
                
                {/* Contact Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white truncate">{contact.name}</h3>
                    <span className="text-xs text-gray-400">
                      {formatTime(contact.last_message_time)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-300 truncate">{contact.last_message}</p>
                    {contact.unread_count > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {contact.unread_count}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ContactsSidebar;