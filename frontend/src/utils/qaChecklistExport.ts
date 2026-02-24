import { ChecklistStatus } from '@/hooks/useBetaQaChecklistOverrides';

export interface ExportItem {
  id: string;
  label: string;
  autoStatus: ChecklistStatus;
  finalStatus: ChecklistStatus;
  hasOverride: boolean;
  notes: string;
}

export interface ExportReport {
  generatedAt: string;
  url: string;
  totals: {
    pass: number;
    fail: number;
    pending: number;
  };
  items: ExportItem[];
}

export function buildExportReport(items: ExportItem[]): ExportReport {
  const totals = items.reduce(
    (acc, item) => {
      acc[item.finalStatus]++;
      return acc;
    },
    { pass: 0, fail: 0, pending: 0 }
  );

  return {
    generatedAt: new Date().toISOString(),
    url: window.location.href,
    totals,
    items,
  };
}

export async function copyReportToClipboard(report: ExportReport): Promise<boolean> {
  const json = JSON.stringify(report, null, 2);
  
  try {
    // Modern Clipboard API (preferred)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(json);
      return true;
    }
    
    // Fallback for older browsers and mobile
    const textArea = document.createElement('textarea');
    textArea.value = json;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}

export function downloadReportAsJson(report: ExportReport): void {
  const json = JSON.stringify(report, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `qa-checklist-${new Date().toISOString().split('T')[0]}.json`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the object URL
  setTimeout(() => URL.revokeObjectURL(url), 100);
}
