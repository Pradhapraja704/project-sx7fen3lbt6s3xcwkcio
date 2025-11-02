import { useState } from 'react';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { invokeLLM } from '@/integrations/core';
import { useToast } from '@/hooks/use-toast';

interface ChatInputProps {
  onSendMessage: (content: string, isRefined?: boolean) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [isRefining, setIsRefining] = useState(false);
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim()) {
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

  const handleSendRefined = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), true);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-[#333] bg-[#2d2d2d] p-4">
      <div className="flex items-end space-x-3">
        {/* Message Input */}
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="min-h-[44px] max-h-32 resize-none border-[#444] bg-[#1a1a1a] text-white placeholder:text-[#666] focus:border-[#4a9eff] focus:ring-[#4a9eff] rounded-xl"
            rows={1}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          {/* Refine Button */}
          <Button
            onClick={handleRefine}
            disabled={!message.trim() || isRefining}
            variant="outline"
            size="icon"
            className="rounded-xl border-[#4a9eff] hover:border-[#3a8eef] hover:bg-[#4a9eff]/10 transition-all duration-200"
            title="Refine with AI"
          >
            {isRefining ? (
              <Loader2 className="h-4 w-4 animate-spin text-[#4a9eff]" />
            ) : (
              <Sparkles className="h-4 w-4 text-[#4a9eff]" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            onClick={handleSend}
            disabled={!message.trim()}
            className="rounded-xl bg-[#4a9eff] hover:bg-[#3a8eef] text-white transition-all duration-200"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Helper Text */}
      <div className="mt-2 flex items-center justify-between text-xs text-[#999999]">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className="flex items-center space-x-1">
          <Sparkles className="h-3 w-3 text-[#4a9eff]" />
          <span>Click Refine to improve your text with AI</span>
        </span>
      </div>
    </div>
  );
};

export default ChatInput;