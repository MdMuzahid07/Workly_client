'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBroadcastNotificationMutation } from '@/redux/feature/admin/adminApi';
import { BellRing, ArrowLeft, Send } from 'lucide-react';
import { toast } from 'sonner';

interface AdminBroadcastViewProps {
  onBack: () => void;
}

const AdminBroadcastView = ({ onBack }: AdminBroadcastViewProps) => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState<'all' | 'job-seekers' | 'employers'>('all');
  const [broadcast, { isLoading }] = useBroadcastNotificationMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      toast.error('Please fill in both title and message fields');
      return;
    }

    try {
      const res = await broadcast({ title, message, targetAudience }).unwrap();
      toast.success(`Broadcast sent successfully to ${res.data?.count || 0} users!`);
      setTitle('');
      setMessage('');
      setTargetAudience('all');
    } catch (err) {
      const error = err as { data?: { message?: string }; message?: string };
      toast.error(error?.data?.message || error?.message || 'Failed to dispatch broadcast');
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-20">
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={onBack}
              className="h-10 w-10 rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">System Broadcast</h1>
              <p className="text-muted-foreground text-xs font-medium">
                Dispatch system-wide announcements to push and email recipients.
              </p>
            </div>
          </div>

          <Card className="bg-card rounded-xl border-2">
            <CardHeader className="border-b px-6 py-5">
              <CardTitle className="text-primary flex items-center gap-2 text-lg font-bold">
                <BellRing className="h-5 w-5" />
                Compose Announcement
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-foreground block text-sm font-bold">Target Audience</label>
                  <select
                    value={targetAudience}
                    onChange={(e) =>
                      setTargetAudience(e.target.value as 'all' | 'job-seekers' | 'employers')
                    }
                    className="border-input bg-background focus:ring-primary/20 h-10 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:outline-hidden"
                  >
                    <option value="all">All Users (Job Seekers & Employers)</option>
                    <option value="job-seekers">Job Seekers Only</option>
                    <option value="employers">Employers Only</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-foreground block text-sm font-bold">Broadcast Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter announcement title..."
                    required
                    className="border-input bg-background focus:ring-primary/20 h-10 w-full rounded-lg border px-3 text-sm focus:ring-2 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-foreground block text-sm font-bold">Message Body</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type the announcement message..."
                    required
                    rows={6}
                    className="border-input bg-background focus:ring-primary/20 w-full resize-none rounded-lg border p-3 text-sm focus:ring-2 focus:outline-hidden"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="bg-primary hover:bg-primary/95 flex h-11 items-center gap-2 rounded-xl px-6 font-bold text-white shadow-md transition-all hover:scale-[1.02]"
                  >
                    {isLoading ? (
                      'Sending Broadcast...'
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Broadcast
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBroadcastView;
