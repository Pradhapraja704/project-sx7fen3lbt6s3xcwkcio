import { MessageCircle, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatHeader = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
            <MessageCircle className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">ChatRefine</h1>
            <p className="text-sm text-gray-500">AI-Powered Chat Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;