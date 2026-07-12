'use client';

import DashboardAdminMetricsHeader from '@/components/dashboard/dashboard-nav/header/DashboardAdminMetricsHeader';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useGetSystemMetricsQuery } from '@/redux/feature/admin/adminApi';
import { Activity, Cpu, Database, HardDrive, Info, Loader2, Server, Zap } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMetricsView() {
  const {
    data: metricsEnvelope,
    isLoading,
    error,
    refetch,
    isFetching,
  } = useGetSystemMetricsQuery(undefined, {
    pollingInterval: 10000, // auto refresh every 10 seconds
  });

  const handleRefresh = async () => {
    try {
      await refetch().unwrap();
      toast.success('Metrics updated successfully');
    } catch {
      toast.error('Failed to refresh metrics');
    }
  };

  if (isLoading) {
    return (
      <div className="dark:bg-background flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="text-primary h-8 w-8 animate-spin" />
          <p className="text-muted-foreground text-sm font-medium">Gathering system telemetry...</p>
        </div>
      </div>
    );
  }

  if (error || !metricsEnvelope?.success) {
    return (
      <div className="dark:bg-background flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              Telemetry Error
            </CardTitle>
            <CardDescription className="text-red-500/80">
              We couldn&apos;t establish a telemetry connection to the backend server.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleRefresh} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const m = metricsEnvelope.data;

  // Format Helper
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    const parts = [];
    if (d > 0) parts.push(`${d}d`);
    if (h > 0) parts.push(`${h}h`);
    if (m > 0) parts.push(`${m}m`);
    parts.push(`${s}s`);
    return parts.join(' ');
  };

  return (
    <>
      <DashboardAdminMetricsHeader onRefresh={handleRefresh} isFetching={isFetching} />

      <div className="dark:bg-background/50 min-h-screen bg-slate-50/50 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Telemetry Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: RAM Memory */}
            <Card className="border-border/80 border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <HardDrive className="text-primary h-4 w-4" />
                    System Memory (RAM)
                  </CardTitle>
                  <CardDescription className="text-xs">Physical memory utilization</CardDescription>
                </div>
                <Badge
                  variant={
                    m.resources.memory.ratio > 85
                      ? 'destructive'
                      : m.resources.memory.ratio > 65
                        ? 'warning'
                        : 'success'
                  }
                >
                  {m.resources.memory.ratio}%
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <Progress value={m.resources.memory.ratio} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                  <div>
                    <p className="text-muted-foreground">Used RAM</p>
                    <p className="mt-0.5 text-sm">{formatBytes(m.resources.memory.used)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Free RAM</p>
                    <p className="mt-0.5 text-sm">{formatBytes(m.resources.memory.free)}</p>
                  </div>
                  <div className="col-span-2 mt-2 border-t pt-2">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Process Allocation (V8 Heap)
                    </p>
                    <div className="mt-1 grid grid-cols-2 gap-y-2">
                      <div>
                        <p className="text-muted-foreground text-[10px]">RSS</p>
                        <p className="text-xs">{formatBytes(m.resources.memory.processHeap.rss)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-[10px]">Heap Used</p>
                        <p className="text-primary text-xs font-bold">
                          {formatBytes(m.resources.memory.processHeap.heapUsed)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 2: CPU Load */}
            <Card className="border-border/80 border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Cpu className="text-primary h-4 w-4" />
                    Processor CPU Load
                  </CardTitle>
                  <CardDescription className="text-xs">UNIX Load Average metrics</CardDescription>
                </div>
                <Activity className="text-muted-foreground/60 h-4 w-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span>1 Min Load</span>
                      <span className="text-primary font-bold">
                        {m.resources.cpuLoad[0]?.toFixed(2) ?? '0.00'}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (m.resources.cpuLoad[0] ?? 0) * 50)}
                      className="h-1.5"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span>5 Min Load</span>
                      <span>{m.resources.cpuLoad[1]?.toFixed(2) ?? '0.00'}</span>
                    </div>
                    <Progress
                      value={Math.min(100, (m.resources.cpuLoad[1] ?? 0) * 50)}
                      className="h-1.5"
                    />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs font-semibold">
                      <span>15 Min Load</span>
                      <span>{m.resources.cpuLoad[2]?.toFixed(2) ?? '0.00'}</span>
                    </div>
                    <Progress
                      value={Math.min(100, (m.resources.cpuLoad[2] ?? 0) * 50)}
                      className="h-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 3: Dependecies / Connectors */}
            <Card className="border-border/80 border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2 text-base font-bold">
                    <Database className="text-primary h-4 w-4" />
                    Connector Latency
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Database and caching health checks
                  </CardDescription>
                </div>
                <Zap className="text-muted-foreground/60 h-4 w-4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-2">
                      <Database className="text-muted-foreground/70 h-4 w-4" />
                      <div>
                        <p className="text-xs font-semibold">PostgreSQL Database</p>
                        <p className="text-muted-foreground text-[10px]">Client Response Latency</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          m.dependencies.database.status === 'UP' ? 'success' : 'destructive'
                        }
                      >
                        {m.dependencies.database.status}
                      </Badge>
                      {m.dependencies.database.status === 'UP' && (
                        <p className="text-primary mt-1 text-xs font-bold">
                          {m.dependencies.database.latencyMs} ms
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <Server className="text-muted-foreground/70 h-4 w-4" />
                      <div>
                        <p className="text-xs font-semibold">Redis Cache Store</p>
                        <p className="text-muted-foreground text-[10px]">Session Store Connector</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={m.dependencies.redis.status === 'UP' ? 'success' : 'destructive'}
                      >
                        {m.dependencies.redis.status === 'UP' ? 'CONNECTED' : 'OFFLINE'}
                      </Badge>
                      <p className="text-muted-foreground mt-1 text-[10px] font-semibold">
                        {m.dependencies.redis.store}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Runtime Performance & OS Info */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Card 4: Loop & Runtime performance */}
            <Card className="border-border/80 border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Activity className="text-primary h-4 w-4" />
                  Node.js Event Loop Telemetry
                </CardTitle>
                <CardDescription className="text-xs">
                  Runtime request queues and execution delays
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-muted/40 rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Event Loop Lag
                    </p>
                    <p className="text-primary mt-1 text-lg font-black">
                      {m.performance.eventLoopLagMs} <span className="text-xs font-bold">ms</span>
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Active Handles
                    </p>
                    <p className="text-primary mt-1 text-lg font-black">
                      {m.performance.activeHandles}
                    </p>
                  </div>
                  <div className="bg-muted/40 rounded-xl border p-3">
                    <p className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
                      Active Requests
                    </p>
                    <p className="text-primary mt-1 text-lg font-black">
                      {m.performance.activeRequests}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card 5: OS Host metadata */}
            <Card className="border-border/80 border shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-bold">
                  <Info className="text-primary h-4 w-4" />
                  Server Host Telemetry
                </CardTitle>
                <CardDescription className="text-xs">
                  Static operating environment details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Platform / OS Architecture</span>
                  <span className="text-foreground uppercase">
                    {m.server.platform} ({m.server.arch})
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Node.js Version</span>
                  <span className="text-foreground">{m.server.nodeVersion}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Process ID (PID)</span>
                  <span className="text-foreground font-mono">{m.server.pid}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">System Host Uptime</span>
                  <span className="text-foreground">{formatDuration(m.server.uptime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Node Process Uptime</span>
                  <span className="text-foreground text-primary font-bold">
                    {formatDuration(m.server.processUptime)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
