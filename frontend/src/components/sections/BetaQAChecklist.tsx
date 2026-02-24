import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Download, Copy, RotateCcw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useBetaQaChecklistOverrides, ChecklistStatus } from '@/hooks/useBetaQaChecklistOverrides';
import { buildExportReport, copyReportToClipboard, downloadReportAsJson, ExportItem } from '@/utils/qaChecklistExport';
import { hasAcceptedTerms } from '@/lib/termsAcceptance';

interface CheckItem {
  id: string;
  category: string;
  description: string;
  autoStatus: ChecklistStatus;
  notes?: string;
}

export default function BetaQAChecklist() {
  const { overrides, setOverride, reset } = useBetaQaChecklistOverrides();
  const [editingNotes, setEditingNotes] = useState<Record<string, string>>({});

  // Auto-detect checks
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'terms-visible',
      category: 'Terms Flow',
      description: 'Terms UI visible when qmy_terms_v1 is missing',
      autoStatus: 'pending',
    },
    {
      id: 'terms-accept',
      category: 'Terms Flow',
      description: 'Accept stores qmy_terms_v1=accepted and hides Terms UI',
      autoStatus: 'pending',
    },
    {
      id: 'terms-persist',
      category: 'Terms Flow',
      description: 'Terms acceptance persists after page refresh',
      autoStatus: 'pending',
    },
    {
      id: 'login-enabled',
      category: 'Terms Flow',
      description: 'Internet Identity login enabled after accepting Terms',
      autoStatus: 'pending',
    },
    {
      id: 'login-works',
      category: 'Terms Flow',
      description: 'Internet Identity login proceeds successfully',
      autoStatus: 'pending',
    },
    {
      id: 'single-login-button',
      category: 'UI',
      description: 'Only one Internet Identity login button visible when logged out',
      autoStatus: 'pending',
    },
    {
      id: 'no-legacy-keys',
      category: 'Technical',
      description: 'No legacy Terms keys (quantumoney-terms-accepted, quantumoney-legal-accepted) used',
      autoStatus: 'pending',
    },
  ]);

  useEffect(() => {
    const runAutoChecks = () => {
      const updatedChecks = checks.map(check => {
        let autoStatus: ChecklistStatus = 'pending';

        switch (check.id) {
          case 'terms-visible':
            // Check if Terms are accepted
            autoStatus = hasAcceptedTerms() ? 'pass' : 'pending';
            break;
          
          case 'terms-accept':
            // Check if qmy_terms_v1 key exists
            autoStatus = localStorage.getItem('qmy_terms_v1') === 'accepted' ? 'pass' : 'pending';
            break;

          case 'terms-persist':
            // Check if Terms are still accepted
            autoStatus = hasAcceptedTerms() ? 'pass' : 'pending';
            break;

          case 'no-legacy-keys':
            // Check for legacy keys
            const hasLegacy = 
              localStorage.getItem('quantumoney-terms-accepted') !== null ||
              localStorage.getItem('quantumoney-legal-accepted') !== null;
            autoStatus = hasLegacy ? 'fail' : 'pass';
            break;

          case 'single-login-button':
            // Count login buttons in DOM
            const loginButtons = document.querySelectorAll('[class*="Login"], button:has(svg[class*="internet"])');
            autoStatus = loginButtons.length === 1 ? 'pass' : loginButtons.length > 1 ? 'fail' : 'pending';
            break;

          default:
            autoStatus = 'pending';
        }

        return { ...check, autoStatus };
      });

      setChecks(updatedChecks);
    };

    runAutoChecks();
    const interval = setInterval(runAutoChecks, 2000);
    return () => clearInterval(interval);
  }, []);

  const getEffectiveStatus = (check: CheckItem): ChecklistStatus => {
    const override = overrides[check.id];
    return override?.status || check.autoStatus;
  };

  const handleStatusOverride = (checkId: string, status: ChecklistStatus) => {
    const currentNotes = overrides[checkId]?.notes || editingNotes[checkId] || '';
    setOverride(checkId, status, currentNotes);
  };

  const handleNotesChange = (checkId: string, notes: string) => {
    setEditingNotes(prev => ({ ...prev, [checkId]: notes }));
  };

  const handleNotesSave = (checkId: string) => {
    const status = overrides[checkId]?.status || checks.find(c => c.id === checkId)?.autoStatus || 'pending';
    setOverride(checkId, status, editingNotes[checkId] || '');
    toast.success('Notes saved');
  };

  const handleReset = () => {
    if (confirm('Reset all overrides and notes?')) {
      reset();
      setEditingNotes({});
      toast.success('Checklist reset');
    }
  };

  const handleExportClipboard = async () => {
    const exportItems: ExportItem[] = checks.map(check => ({
      id: check.id,
      label: check.description,
      autoStatus: check.autoStatus,
      finalStatus: getEffectiveStatus(check),
      hasOverride: !!overrides[check.id],
      notes: overrides[check.id]?.notes || '',
    }));

    const report = buildExportReport(exportItems);
    const success = await copyReportToClipboard(report);
    
    if (success) {
      toast.success('Checklist copied to clipboard');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleExportFile = () => {
    const exportItems: ExportItem[] = checks.map(check => ({
      id: check.id,
      label: check.description,
      autoStatus: check.autoStatus,
      finalStatus: getEffectiveStatus(check),
      hasOverride: !!overrides[check.id],
      notes: overrides[check.id]?.notes || '',
    }));

    const report = buildExportReport(exportItems);
    downloadReportAsJson(report);
    toast.success('Checklist exported to file');
  };

  const getStatusIcon = (status: ChecklistStatus) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusBadge = (status: ChecklistStatus) => {
    const variants: Record<ChecklistStatus, 'default' | 'destructive' | 'secondary'> = {
      pass: 'default',
      fail: 'destructive',
      pending: 'secondary',
    };
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const categoryGroups = checks.reduce((acc, check) => {
    if (!acc[check.category]) acc[check.category] = [];
    acc[check.category].push(check);
    return acc;
  }, {} as Record<string, CheckItem[]>);

  const totalChecks = checks.length;
  const passedChecks = checks.filter(c => getEffectiveStatus(c) === 'pass').length;
  const failedChecks = checks.filter(c => getEffectiveStatus(c) === 'fail').length;

  return (
    <div className="w-full h-full flex flex-col bg-black text-white p-4 overflow-y-auto">
      <Card className="bg-black/90 border-[#FFD700]">
        <CardHeader>
          <CardTitle className="text-2xl text-[#FFD700]">Beta QA Checklist</CardTitle>
          <CardDescription className="text-gray-400">
            Terms acceptance and login flow validation
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="text-sm">
              <span className="text-green-500 font-bold">{passedChecks}</span> passed
            </div>
            <div className="text-sm">
              <span className="text-red-500 font-bold">{failedChecks}</span> failed
            </div>
            <div className="text-sm">
              <span className="text-yellow-500 font-bold">{totalChecks - passedChecks - failedChecks}</span> pending
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-2 mb-4">
            <Button onClick={handleExportClipboard} variant="outline" size="sm" className="border-[#FFD700] text-[#FFD700]">
              <Copy className="h-4 w-4 mr-2" />
              Copy JSON
            </Button>
            <Button onClick={handleExportFile} variant="outline" size="sm" className="border-[#FFD700] text-[#FFD700]">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button onClick={handleReset} variant="outline" size="sm" className="border-red-500 text-red-500">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <ScrollArea className="h-[600px]">
            <div className="space-y-6">
              {Object.entries(categoryGroups).map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-[#FFD700] mb-3">{category}</h3>
                  <div className="space-y-4">
                    {items.map(check => {
                      const effectiveStatus = getEffectiveStatus(check);
                      const hasOverride = !!overrides[check.id];

                      return (
                        <Card key={check.id} className="bg-black/50 border-gray-700">
                          <CardContent className="pt-4">
                            <div className="flex items-start gap-3 mb-2">
                              {getStatusIcon(effectiveStatus)}
                              <div className="flex-1">
                                <p className="text-sm text-white">{check.description}</p>
                                <div className="flex gap-2 mt-2">
                                  <span className="text-xs text-gray-500">Auto: {getStatusBadge(check.autoStatus)}</span>
                                  {hasOverride && (
                                    <span className="text-xs text-gray-500">Override: {getStatusBadge(effectiveStatus)}</span>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-3">
                              <Button
                                size="sm"
                                variant={effectiveStatus === 'pass' ? 'default' : 'outline'}
                                onClick={() => handleStatusOverride(check.id, 'pass')}
                                className="text-xs"
                              >
                                Pass
                              </Button>
                              <Button
                                size="sm"
                                variant={effectiveStatus === 'fail' ? 'destructive' : 'outline'}
                                onClick={() => handleStatusOverride(check.id, 'fail')}
                                className="text-xs"
                              >
                                Fail
                              </Button>
                              <Button
                                size="sm"
                                variant={effectiveStatus === 'pending' ? 'secondary' : 'outline'}
                                onClick={() => handleStatusOverride(check.id, 'pending')}
                                className="text-xs"
                              >
                                Pending
                              </Button>
                            </div>

                            <div className="mt-3">
                              <Textarea
                                placeholder="Add notes..."
                                value={editingNotes[check.id] ?? overrides[check.id]?.notes ?? ''}
                                onChange={(e) => handleNotesChange(check.id, e.target.value)}
                                className="text-xs bg-black/50 border-gray-700 text-white"
                                rows={2}
                              />
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleNotesSave(check.id)}
                                className="mt-1 text-xs text-[#FFD700]"
                              >
                                Save Notes
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
