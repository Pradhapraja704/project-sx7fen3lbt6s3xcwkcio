import { MessageCircle, Settings, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ChatHeader = () => {
  return (
    <header className="bg-[#1a1a1a] backdrop-blur-md border-b border-[#333] shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#4a9eff] rounded-xl">
            <MessageCircle className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">LexiFix</h1>
            <p className="text-sm text-[#999999]">AI-Powered Chat with Text Refinement</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full text-[#999999] hover:text-white hover:bg-[#333]">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-[#999999] hover:text-white hover:bg-[#333]">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default ChatHeader;