import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Message, Contact } from '@/entities';
import ContactsSidebar from '@/components/ContactsSidebar';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import ChatInput from '@/components/ChatInput';

const Index = () => {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Fetch contacts
  const { data: contactsData } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => Contact.list('-updated_at', 50),
  });

  // Fetch messages for selected contact
  const { data: messagesData, refetch: refetchMessages } = useQuery({
    queryKey: ['messages', selectedContactId],
    queryFn: () => selectedContactId ? Message.filter({ contact_id: selectedContactId }, '-created_at', 100) : [],
    enabled: !!selectedContactId,
  });

  useEffect(() => {
    if (contactsData) {
      setContacts(contactsData);
    }
  }, [contactsData]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || null;

  const handleSendMessage = async (content: string, isRefined: boolean = false) => {
    if (!selectedContactId) return;

    try {
      const newMessage = await Message.create({
        contact_id: selectedContactId,
        sender: 'You',
        content,
        timestamp: new Date().toISOString(),
        is_refined: isRefined,
        avatar: 'Y',
        is_sent_by_me: true
      });
      
      setMessages(prev => [newMessage, ...prev]);
      
      // Update contact's last message
      if (selectedContact) {
        await Contact.update(selectedContactId, {
          last_message: content,
          last_message_time: new Date().toISOString()
        });
      }
      
      refetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* Contacts Sidebar */}
      <ContactsSidebar
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelectContact={setSelectedContactId}
      />
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <ChatHeader contact={selectedContact} />
        
        {/* Messages Area */}
        <div className="flex-1 flex flex-col" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f0f0f0' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundColor: '#e5ddd5'
        }}>
          {selectedContactId ? (
            <>
              <MessageList messages={messages} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-6xl">💬</div>
                </div>
                <h2 className="text-2xl font-light mb-2">WhatsApp Web</h2>
                <p className="text-sm max-w-md">
                  Send and receive messages without keeping your phone online.<br />
                  Use WhatsApp on up to 4 linked devices and 1 phone at the same time.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;