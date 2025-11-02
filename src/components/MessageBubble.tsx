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
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
            : 'bg-gray-300 text-gray-700'
        }`}>
          {message.avatar}
        </div>
        
        {/* Message Content */}
        <div className={`relative px-4 py-3 rounded-2xl shadow-sm ${
          isCurrentUser
            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-br-md'
            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md'
        }`}>
          {/* Refined Badge */}
          {message.is_refined && (
            <div className="flex items-center space-x-1 mb-2">
              <Badge variant="secondary" className="text-xs bg-white/20 text-white border-white/30">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Refined
              </Badge>
            </div>
          )}
          
          {/* Message Text */}
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {/* Timestamp */}
          <p className={`text-xs mt-1 ${
            isCurrentUser ? 'text-white/70' : 'text-gray-500'
          }`}>
            {timeString}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;