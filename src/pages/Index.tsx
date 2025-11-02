import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Message } from '@/entities';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';

const Index = () => {
  const [messages, setMessages] = useState([]);

  const { data: messagesData, refetch } = useQuery({
    queryKey: ['messages'],
    queryFn: () => Message.list('-created_at', 100),
  });

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const handleSendMessage = async (content: string, isRefined: boolean = false) => {
    try {
      const newMessage = await Message.create({
        sender: 'You',
        content,
        timestamp: new Date().toISOString(),
        is_refined: isRefined,
        avatar: 'Y'
      });
      
      setMessages(prev => [newMessage, ...prev]);
      refetch();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* Chat Header */}
      <ChatHeader />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full px-4 py-6">
        {/* Messages Container */}
        <div className="flex-1 bg-[#1a1a1a] rounded-2xl shadow-lg border border-[#333] flex flex-col overflow-hidden">
          <MessageList messages={messages} />
          <ChatInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Index;