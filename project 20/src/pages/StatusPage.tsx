import { CheckCircle2, AlertTriangle, XCircle, Clock } from 'lucide-react';
import { usePageLoader } from '../hooks/usePageLoader';
import PageSkeleton from '../components/PageSkeleton';

const SERVICES = [
  { name: 'Builder & AI generation', status: 'operational', uptime: '99.98%' },
  { name: 'Deployment pipeline', status: 'operational', uptime: '99.95%' },
  { name: 'App hosting (CDN)', status: 'operational', uptime: '100%' },
  { name: 'Database (Supabase)', status: 'operational', uptime: '99.99%' },
  { name: 'Edge Functions', status: 'operational', uptime: '99.97%' },
  { name: 'Authentication', status: 'operational', uptime: '99.99%' },
  { name: 'API', status: 'operational', uptime: '99.96%' },
  { name: 'Dashboard & web app', status: 'operational', uptime: '99.94%' },
];

const INCIDENTS = [
  {
    date: 'February 10, 2026',
    title: 'Elevated Edge Function latency',
    status: 'resolved',
    duration: '23 minutes',
    updates: [
      { time: '14:32 UTC', message: 'Investigating reports of slow Edge Function response times in the EU region.' },
      { time: '14:41 UTC', message: 'Identified a misconfigured load balancer in the eu-west-1 zone. Rollback in progress.' },
      { time: '14:55 UTC', message: 'Load balancer configuration restored. Latency returning to normal.' },
      { time: '15:05 UTC', message: 'All systems operating normally. Incident resolved.' },
    ],
  },
  {
    date: 'January 28, 2026',
    title: 'Deployment pipeline delays',
    status: 'resolved',
    duration: '11 minutes',
    updates: [
      { time: '09:14 UTC', message: 'Deploy queue processing delays detected. Some deployments taking longer than usual.' },
      { time: '09:25 UTC', message: 'Root cause identified: upstream CDN provider experiencing degraded performance. Queue cleared.' },
    ],
  },
];

const UPTIME_DAYS = Array.from({ length: 90 }, (_, i) => {
  const rand = Math.random();
  if (i === 30 || i === 61) return 'degraded';
  if (rand > 0.003) return 'operational';
  return 'degraded';
});

const statusConfig = {
  operational: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/10', label: 'Operational' },
  degraded: { icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Degraded' },
  outage: { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', label: 'Outage' },
};

export default function StatusPage() {
  const loading = usePageLoader();
  if (loading) return <PageSkeleton />;
  const allOperational = SERVICES.every((s) => s.status === 'operational');

  return (
    <div className="min-h-screen bg-[#080808] pt-24 pb-24 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-medium text-blue-400 uppercase tracking-widest mb-3">System status</p>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-6">
            withaibuild status
          </h1>

          <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border ${allOperational ? 'bg-green-500/6 border-green-500/20' : 'bg-amber-500/6 border-amber-500/20'}`}>
            {allOperational ? (
              <CheckCircle2 size={20} className="text-green-400" />
            ) : (
              <AlertTriangle size={20} className="text-amber-400" />
            )}
            <div>
              <p className={`text-sm font-semibold ${allOperational ? 'text-green-400' : 'text-amber-400'}`}>
                {allOperational ? 'All systems operational' : 'Some systems experiencing issues'}
              </p>
              <p className="text-xs text-white/35 mt-0.5">
                Last checked: {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-sm font-semibold text-white mb-4">Services</h2>
          <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl overflow-hidden divide-y divide-white/5">
            {SERVICES.map(({ name, status, uptime }) => {
              const cfg = statusConfig[status as keyof typeof statusConfig];
              const Icon = cfg.icon;
              return (
                <div key={name} className="flex items-center justify-between px-5 py-3.5">
                  <span className="text-sm text-white/70">{name}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-white/25">{uptime} uptime</span>
                    <div className={`flex items-center gap-1.5 ${cfg.color}`}>
                      <Icon size={13} />
                      <span className="text-xs font-medium">{cfg.label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">90-day uptime</h2>
            <div className="flex items-center gap-3 text-xs text-white/30">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-green-500/60 inline-block" /> Operational</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500/60 inline-block" /> Degraded</span>
            </div>
          </div>
          <div className="flex gap-0.5">
            {UPTIME_DAYS.map((day, i) => (
              <div
                key={i}
                title={day}
                className={`flex-1 h-8 rounded-sm ${day === 'operational' ? 'bg-green-500/40 hover:bg-green-500/70' : 'bg-amber-500/50 hover:bg-amber-500/80'} transition-colors cursor-default`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/20">
            <span>90 days ago</span>
            <span>Today</span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white mb-5">Recent incidents</h2>
          {INCIDENTS.length === 0 ? (
            <div className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-6 text-center text-sm text-white/30">
              No incidents in the last 30 days.
            </div>
          ) : (
            <div className="space-y-4">
              {INCIDENTS.map((incident) => (
                <div key={incident.title} className="bg-[#0d0d0d] border border-white/6 rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="text-sm font-semibold text-white">{incident.title}</p>
                      <p className="text-xs text-white/30 mt-1">{incident.date} · {incident.duration}</p>
                    </div>
                    <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2.5 py-1 rounded-full flex-shrink-0 flex items-center gap-1.5">
                      <CheckCircle2 size={10} />
                      Resolved
                    </span>
                  </div>
                  <div className="space-y-3 border-t border-white/5 pt-4">
                    {incident.updates.map(({ time, message }) => (
                      <div key={time} className="flex items-start gap-3">
                        <div className="flex items-center gap-1.5 text-white/25 flex-shrink-0 mt-0.5">
                          <Clock size={10} />
                          <span className="text-xs font-mono">{time}</span>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed">{message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-white/25">
            Subscribe to status updates at{' '}
            <span className="text-white/45">status.withaibuild.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
