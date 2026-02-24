/**
 * Client-only share helper using Web Share API with fallback
 */

export interface ShareData {
  title: string;
  text: string;
  url?: string;
}

export async function shareContent(data: ShareData): Promise<{ success: boolean; method: 'native' | 'clipboard' | 'none' }> {
  // Try Web Share API first (mobile-friendly)
  if (navigator.share) {
    try {
      await navigator.share({
        title: data.title,
        text: data.text,
        url: data.url,
      });
      return { success: true, method: 'native' };
    } catch (error: any) {
      // User cancelled or error occurred
      if (error.name === 'AbortError') {
        return { success: false, method: 'native' };
      }
      // Fall through to clipboard
    }
  }

  // Fallback to clipboard
  const shareText = `${data.title}\n\n${data.text}${data.url ? `\n\n${data.url}` : ''}`;
  
  try {
    await navigator.clipboard.writeText(shareText);
    return { success: true, method: 'clipboard' };
  } catch {
    // Clipboard failed, try legacy method
    try {
      const textArea = document.createElement('textarea');
      textArea.value = shareText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, method: 'clipboard' };
    } catch {
      return { success: false, method: 'none' };
    }
  }
}
