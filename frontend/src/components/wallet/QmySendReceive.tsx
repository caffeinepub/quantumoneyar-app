import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowUpRight, ArrowDownLeft, AlertCircle, CheckCircle2, Copy } from 'lucide-react';
import { useSendQmy, useReceiveQmy } from '@/hooks/useQmySync';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { toast } from 'sonner';

export default function QmySendReceive() {
  const { identity } = useInternetIdentity();
  const sendMutation = useSendQmy();
  const receiveMutation = useReceiveQmy();

  const [sendLoginId, setSendLoginId] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [receiveLoginId, setReceiveLoginId] = useState('');

  const myLoginId = identity?.getPrincipal().toString().slice(0, 12) || '';

  const handleSend = async () => {
    if (!sendLoginId.trim()) {
      toast.error('Login ID is required');
      return;
    }

    const amount = parseFloat(sendAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Valid amount is required');
      return;
    }

    try {
      const result = await sendMutation.mutateAsync({
        toLoginId: sendLoginId,
        amount,
      });

      if (result.success) {
        toast.success('Send request submitted', {
          description: result.message,
        });
        setSendLoginId('');
        setSendAmount('');
      } else {
        toast.error('Send failed', {
          description: result.message,
        });
      }
    } catch (error: any) {
      toast.error('Send error', {
        description: error.message || 'Try again',
      });
    }
  };

  const handleReceive = async () => {
    if (!receiveLoginId.trim()) {
      toast.error('Login ID is required');
      return;
    }

    try {
      const result = await receiveMutation.mutateAsync({
        fromLoginId: receiveLoginId,
      });

      if (result.success) {
        toast.success('Receive request submitted', {
          description: result.message,
        });
        setReceiveLoginId('');
      } else {
        toast.error('Receive failed', {
          description: result.message,
        });
      }
    } catch (error: any) {
      toast.error('Receive error', {
        description: error.message || 'Try again',
      });
    }
  };

  const copyLoginId = () => {
    navigator.clipboard.writeText(myLoginId);
    toast.success('Login ID copied to clipboard');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
          Send & Receive QMY
        </h2>
        <p className="text-gray-400">Transfer QMY tokens via Login ID</p>
      </div>

      <Alert className="bg-amber-500/10 border-amber-500/30">
        <AlertCircle className="h-4 w-4 text-amber-500" />
        <AlertDescription className="text-amber-200">
          <strong>UI-Only / Pending Live:</strong> This feature is visual-only and does not perform real token transfers. 
          All operations are simulated until QMY tokens go live.
        </AlertDescription>
      </Alert>

      <Card className="glass-card-gold">
        <CardHeader>
          <CardTitle className="text-amber-400">Your Login ID</CardTitle>
          <CardDescription className="text-gray-400">
            Share this ID to receive QMY from others
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              value={myLoginId}
              readOnly
              className="flex-1 bg-black/50 border-amber-500/30 text-white font-mono"
            />
            <Button
              size="icon"
              variant="outline"
              className="border-amber-500/30"
              onClick={copyLoginId}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="send" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50">
          <TabsTrigger value="send" className="data-[state=active]:bg-amber-500/20">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            Send
          </TabsTrigger>
          <TabsTrigger value="receive" className="data-[state=active]:bg-amber-500/20">
            <ArrowDownLeft className="h-4 w-4 mr-2" />
            Receive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card className="glass-card-gold">
            <CardHeader>
              <CardTitle className="text-amber-400">Send QMY</CardTitle>
              <CardDescription className="text-gray-400">
                Enter recipient Login ID and amount
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="send-login-id" className="text-amber-400">
                  Recipient Login ID *
                </Label>
                <Input
                  id="send-login-id"
                  type="text"
                  placeholder="Enter recipient Login ID"
                  value={sendLoginId}
                  onChange={(e) => setSendLoginId(e.target.value)}
                  className="bg-black/50 border-amber-500/30 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="send-amount" className="text-amber-400">
                  Amount (QMY) *
                </Label>
                <Input
                  id="send-amount"
                  type="number"
                  placeholder="0.00"
                  value={sendAmount}
                  onChange={(e) => setSendAmount(e.target.value)}
                  className="bg-black/50 border-amber-500/30 text-white"
                  min="0"
                  step="0.01"
                />
              </div>

              <Button
                onClick={handleSend}
                disabled={sendMutation.isPending}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black font-bold"
              >
                {sendMutation.isPending ? 'Sending...' : 'Send QMY'}
              </Button>

              {sendMutation.isSuccess && (
                <Alert className="bg-green-500/10 border-green-500/30">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-200">
                    Send request submitted successfully (UI-only)
                  </AlertDescription>
                </Alert>
              )}

              {sendMutation.isError && (
                <Alert className="bg-red-500/10 border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    {sendMutation.error?.message || 'Send failed'}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="receive" className="space-y-4">
          <Card className="glass-card-gold">
            <CardHeader>
              <CardTitle className="text-amber-400">Receive QMY</CardTitle>
              <CardDescription className="text-gray-400">
                Request QMY from another user
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receive-login-id" className="text-amber-400">
                  Sender Login ID *
                </Label>
                <Input
                  id="receive-login-id"
                  type="text"
                  placeholder="Enter sender Login ID"
                  value={receiveLoginId}
                  onChange={(e) => setReceiveLoginId(e.target.value)}
                  className="bg-black/50 border-amber-500/30 text-white"
                />
              </div>

              <Button
                onClick={handleReceive}
                disabled={receiveMutation.isPending}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold"
              >
                {receiveMutation.isPending ? 'Requesting...' : 'Request QMY'}
              </Button>

              {receiveMutation.isSuccess && (
                <Alert className="bg-green-500/10 border-green-500/30">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <AlertDescription className="text-green-200">
                    Receive request submitted successfully (UI-only)
                  </AlertDescription>
                </Alert>
              )}

              {receiveMutation.isError && (
                <Alert className="bg-red-500/10 border-red-500/30">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    {receiveMutation.error?.message || 'Receive failed'}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
