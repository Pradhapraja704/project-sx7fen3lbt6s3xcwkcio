import { Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  is_refined: boolean;
  avatar: string;
  created_at: string;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isCurrentUser = message.sender === 'You';
  const timeString = new Date(message.created_at).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${isCurrentUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
          isCurrentUser
            ? 'bg-[#4a9eff] text-black'
            : 'bg-[#333] text-white'
        }`}>
          {message.avatar}
        </div>

        {/* Message Content */}
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
          isCurrentUser
            ? 'bg-[#4a9eff] text-black rounded-br-md'
            : 'bg-[#333] text-white rounded-bl-md border border-[#444]'
        }`}>
          {/* Refined Badge */}
          {message.is_refined && (
            <div className="flex items-center space-x-1 mb-2">
              <Badge variant="secondary" className="text-xs bg-black/20 text-black border-black/30">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Refined
              </Badge>
            </div>
          )}

          {/* Message Text */}
          <p className="text-sm leading-relaxed">{message.content}</p>

          {/* Timestamp */}
          <p className={`text-xs mt-1 ${
            isCurrentUser ? 'text-black/70' : 'text-[#999999]'
          }`}>
            {timeString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;