import { ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Contact {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  is_online: boolean;
}

interface ChatHeaderProps {
  contact: Contact | null;
  onBack?: () => void;
}

const ChatHeader = ({ contact, onBack }: ChatHeaderProps) => {
  if (!contact) {
    return (
      <header className="bg-green-600 text-white p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-700 rounded-xl">
            <div className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">LexiFix</h1>
            <p className="text-sm text-green-100">Select a chat to start messaging</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-green-600 text-white p-4 border-b border-green-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <Button variant="ghost" size="icon" onClick={onBack} className="text-white hover:bg-green-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          
          {/* Contact Avatar */}
          <div className="relative">
            <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center text-white font-medium">
              {contact.avatar}
            </div>
            {contact.is_online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-green-600"></div>
            )}
          </div>
          
          {/* Contact Info */}
          <div>
            <h2 className="font-semibold">{contact.name}</h2>
            <p className="text-sm text-green-100">
              {contact.is_online ? 'online' : 'last seen recently'}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-green-700">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;