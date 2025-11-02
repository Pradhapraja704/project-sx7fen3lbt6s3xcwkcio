import { useState } from 'react';
import { Send, Sparkles, Loader2, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { invokeLLM } from '@/integrations/core';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSendMessage: (content: string, isRefined?: boolean) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSendMessage, disabled = false }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleRefine = async () => {
    if (!message.trim()) {
      toast({
        title: "No text to refine",
        description: "Please type a message first before refining.",
        variant: "destructive"
      });
      return;
    }

    setIsRefining(true);
    try {
      const refinedText = await invokeLLM({
        prompt: `Please refine and correct the following text for grammar, spelling, and clarity while maintaining the original meaning and tone. Make it sound natural and well-written:

"${message}"

Return only the refined text without any additional explanation or quotes.`,
      });

      if (refinedText && typeof refinedText === 'string') {
        setMessage(refinedText.trim());
        toast({
          title: "Text refined!",
          description: "Your message has been improved by AI.",
        });
      }
    } catch (error) {
      console.error('Error refining text:', error);
      toast({
        title: "Refinement failed",
        description: "Could not refine the text. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsRefining(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (disabled) {
    return (
      <div className="bg-gray-800 p-4 text-center text-gray-400">
        Select a contact to start chatting
      </div>
    );
  }

  return (
    <div className="bg-gray-800 p-4 border-t border-gray-700">
      <div className="flex items-center space-x-3">
        {/* Attachment Button */}
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200 hover:bg-gray-700">
          <Paperclip className="h-5 w-5" />
        </Button>
        
        {/* Message Input Container */}
        <div className="flex-1 flex items-center bg-gray-700 rounded-full border border-gray-600 px-4 py-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message"
            className="flex-1 border-none focus:ring-0 focus:outline-none bg-transparent text-white placeholder-gray-400"
          />
          
          {/* Emoji Button */}
          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200 ml-2">
            <Smile className="h-5 w-5" />
          </Button>
          
          {/* Refine Button */}
          <Button
            onClick={handleRefine}
            disabled={!message.trim() || isRefining}
            variant="ghost"
            size="icon"
            className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 ml-1"
            title="Refine with AI"
          >
            {isRefining ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        {/* Send Button */}
        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-blue-600 hover:bg-blue-700 rounded-full p-3"
          size="icon"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;