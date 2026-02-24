import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Share2 } from 'lucide-react';

interface TransparentRuleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
  onShare?: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: 'rules' | 'congratulations';
  showShare?: boolean;
}

export function TransparentRuleModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  onShare,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'rules',
  showShare = false,
}: TransparentRuleModalProps) {
  const handleConfirm = () => {
    onConfirm?.();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleShare = () => {
    onShare?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-md bg-black/90 backdrop-blur-md border-2 border-[#FFD700]/50 text-[#FFD700]"
        style={{ maxHeight: '80vh' }}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#FFD700]">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-[#FFD700]/80">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="text-[#FFD700]/90 space-y-3 text-sm">
            {children}
          </div>
        </ScrollArea>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          {variant === 'rules' && (
            <>
              {onCancel && (
                <Button
                  onClick={handleCancel}
                  variant="outline"
                  className="border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/10"
                >
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button
                  onClick={handleConfirm}
                  className="bg-[#FFD700] text-black hover:bg-[#D4AF37] font-bold"
                >
                  {confirmText}
                </Button>
              )}
            </>
          )}

          {variant === 'congratulations' && (
            <>
              {showShare && onShare && (
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="border-[#FFD700]/50 text-[#FFD700] hover:bg-[#FFD700]/10"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              )}
              <Button
                onClick={() => onOpenChange(false)}
                className="bg-[#FFD700] text-black hover:bg-[#D4AF37] font-bold"
              >
                Close
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
