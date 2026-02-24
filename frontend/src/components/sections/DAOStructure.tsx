import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Vote, MessageSquare, Send, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Proposal {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'passed' | 'failed';
  votesFor: number;
  votesAgainst: number;
}

interface ChatMessage {
  id: string;
  user: string;
  message: string;
  timestamp: string;
}

const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Increase XP rewards for rare creatures',
    description: 'Proposal to increase XP rewards for rare creature captures from 25 to 35 XP',
    status: 'active',
    votesFor: 1250,
    votesAgainst: 340,
  },
  {
    id: '2',
    title: 'Add new monster types',
    description: 'Introduce 5 new legendary monster types to the game',
    status: 'active',
    votesFor: 890,
    votesAgainst: 120,
  },
  {
    id: '3',
    title: 'Reduce redeem XP cost',
    description: 'Lower the XP cost for redeeming coins from 15 to 10 XP',
    status: 'passed',
    votesFor: 2100,
    votesAgainst: 450,
  },
];

const mockChatMessages: ChatMessage[] = [
  { id: '1', user: 'Player123', message: 'What do you think about the new XP proposal?', timestamp: '10:30 AM' },
  { id: '2', user: 'CryptoHunter', message: 'I think it\'s a great idea! Rare creatures should give more XP.', timestamp: '10:32 AM' },
  { id: '3', user: 'QMYFan', message: 'Agreed! Let\'s vote yes on this one.', timestamp: '10:35 AM' },
  { id: '4', user: 'GameMaster', message: 'Don\'t forget to check the new monster proposal too!', timestamp: '10:40 AM' },
];

export default function DAOStructure() {
  const { t } = useLanguage();
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages);

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        user: 'You',
        message: chatInput,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setChatInput('');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-600';
      case 'passed':
        return 'bg-green-600';
      case 'failed':
        return 'bg-red-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="w-full bg-black text-white" style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-[#FFD700]">{t('dao.title')}</h1>
          <p className="text-gray-400">{t('dao.subtitle')}</p>
        </div>

        <Tabs defaultValue="proposals" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="proposals">{t('dao.proposals')}</TabsTrigger>
            <TabsTrigger value="chat">{t('dao.chat')}</TabsTrigger>
          </TabsList>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="space-y-4">
            {mockProposals.map((proposal) => (
              <Card key={proposal.id} className="glass-card-gold">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-[#FFD700] flex items-center gap-2">
                        <Vote className="h-5 w-5" />
                        {proposal.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 mt-2">
                        {proposal.description}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(proposal.status)}>
                      {t(`dao.${proposal.status}`)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="text-sm text-green-400 mb-1">Votes For</div>
                      <div className="text-2xl font-bold text-green-500">{proposal.votesFor}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <div className="text-sm text-red-400 mb-1">Votes Against</div>
                      <div className="text-2xl font-bold text-red-500">{proposal.votesAgainst}</div>
                    </div>
                  </div>
                  {proposal.status === 'active' && (
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        Vote For
                      </Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        Vote Against
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="glass-card-gold">
              <CardHeader>
                <CardTitle className="text-[#FFD700] flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Community Discussion
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Simulated chat for pre-proposal discussions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="p-3 rounded-lg bg-gray-800/50 border border-[#FFD700]/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-[#FFD700] flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            {msg.user}
                          </span>
                          <span className="text-xs text-gray-500">{msg.timestamp}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{msg.message}</p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                <div className="flex gap-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-gray-800 border-[#FFD700]/30"
                  />
                  <Button onClick={handleSendMessage} className="bg-[#FFD700] text-black hover:bg-[#D4AF37]">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  This is a simulated chat for demonstration purposes
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
