import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Users, Briefcase, Award, TrendingUp, Info } from 'lucide-react';

export function ConceptualAllocationsPlaceholders() {
  const allocations = [
    {
      title: 'Pre-Sale Allocation',
      icon: TrendingUp,
      amount: '150,000,000 QMY',
      percentage: '15%',
      description: 'Reserved for early supporters and pre-sale participants',
      color: 'from-blue-500/20 to-blue-600/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      title: 'Team Allocation',
      icon: Users,
      amount: '100,000,000 QMY',
      percentage: '10%',
      description: 'Reserved for core team members with 24-month vesting',
      color: 'from-green-500/20 to-green-600/20',
      borderColor: 'border-green-500/30',
      textColor: 'text-green-400',
    },
    {
      title: 'Founders Allocation',
      icon: Award,
      amount: '80,000,000 QMY',
      percentage: '8%',
      description: 'Reserved for project founders with 36-month vesting',
      color: 'from-purple-500/20 to-purple-600/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
    },
    {
      title: 'Advisors Allocation',
      icon: Briefcase,
      amount: '50,000,000 QMY',
      percentage: '5%',
      description: 'Reserved for strategic advisors and partners',
      color: 'from-amber-500/20 to-amber-600/20',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-amber-400">Future Allocations (Conceptual)</h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-amber-400/60" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-xs">
                These allocations are future-oriented placeholders for visual simulation purposes only. 
                No real token distribution or financial transactions are active.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {allocations.map((allocation) => {
          const Icon = allocation.icon;
          return (
            <TooltipProvider key={allocation.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className={`bg-gradient-to-br ${allocation.color} ${allocation.borderColor} cursor-help`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-5 w-5 ${allocation.textColor}`} />
                          <CardTitle className={`text-sm ${allocation.textColor}`}>
                            {allocation.title}
                          </CardTitle>
                        </div>
                        <Info className="h-4 w-4 text-white/40" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        <div className={`text-2xl font-bold ${allocation.textColor}`}>
                          {allocation.amount}
                        </div>
                        <div className="text-sm text-white/60">
                          {allocation.percentage} of total supply
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-xs font-semibold mb-1">{allocation.title}</p>
                  <p className="text-xs text-white/80">{allocation.description}</p>
                  <p className="text-xs text-amber-400 mt-2">
                    ⚠️ Future-oriented / Conceptual / Visual Simulation
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
}
