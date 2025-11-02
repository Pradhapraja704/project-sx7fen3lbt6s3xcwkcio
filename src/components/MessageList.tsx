import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  is_refined: boolean;
  avatar: string;
  created_at: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-[#4a9eff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-[#4a9eff]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Start a conversation</h3>
          <p className="text-[#999999] text-sm">Send your first message and try the AI refinement feature!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.slice().reverse().map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;