import { Check, CheckCheck, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  is_refined: boolean;
  avatar: string;
  created_at: string;
  is_sent_by_me: boolean;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const timeString = new Date(message.created_at).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${message.is_sent_by_me ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm ${
        message.is_sent_by_me
          ? 'bg-blue-600 text-white rounded-br-none'
          : 'bg-gray-700 border border-gray-600 text-gray-100 rounded-bl-none'
      }`}>
        {/* Refined Badge */}
        {message.is_refined && (
          <div className="flex items-center space-x-1 mb-1">
            <Badge variant="secondary" className={`text-xs ${
              message.is_sent_by_me 
                ? 'bg-blue-700 text-blue-100 border-blue-500' 
                : 'bg-purple-600 text-purple-100 border-purple-500'
            }`}>
              <Sparkles className="h-3 w-3 mr-1" />
              AI Refined
            </Badge>
          </div>
        )}
        
        {/* Message Text */}
        <p className="text-sm leading-relaxed break-words">{message.content}</p>
        
        {/* Timestamp and Status */}
        <div className={`flex items-center justify-end space-x-1 mt-1 ${
          message.is_sent_by_me ? 'text-blue-200' : 'text-gray-400'
        }`}>
          <span className="text-xs">{timeString}</span>
          {message.is_sent_by_me && (
            <CheckCheck className="h-3 w-3 text-blue-300" />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;