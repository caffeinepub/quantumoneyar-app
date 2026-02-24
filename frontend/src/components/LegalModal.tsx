import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Camera, MapPin, Info, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGeolocation } from '@/contexts/GeolocationContext';

interface LegalModalProps {
  onAccept: () => void;
  onNavigateToTerms: () => void;
}

export function LegalModal({ onAccept, onNavigateToTerms }: LegalModalProps) {
  const { t } = useLanguage();
  const { requestPermission: requestLocationPermission } = useGeolocation();
  const [cameraAccepted, setCameraAccepted] = useState(false);
  const [locationAccepted, setLocationAccepted] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const allAccepted = cameraAccepted && locationAccepted && termsAccepted && privacyAccepted && cookiesAccepted && ageConfirmed;

  const handleRequestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraAccepted(true);
    } catch (error) {
      console.error('Camera permission denied:', error);
    }
  };

  const handleRequestLocationPermission = async () => {
    const granted = await requestLocationPermission();
    if (granted) {
      setLocationAccepted(true);
    }
  };

  return (
    <Dialog open={true} onOpenChange={() => {}}>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] bg-black/95 border-[#FFD700]"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl text-[#FFD700]">
            {t('legal.welcome')}
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            {t('legal.welcomeDesc')}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {/* Camera Permission */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-semibold text-white">{t('legal.cameraPermission')}</h3>
              </div>
              <p className="text-sm text-gray-400">{t('legal.cameraDesc')}</p>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="camera" 
                  checked={cameraAccepted}
                  onCheckedChange={(checked) => setCameraAccepted(checked as boolean)}
                />
                <label htmlFor="camera" className="text-sm text-white cursor-pointer">
                  {t('legal.acceptCamera')}
                </label>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleRequestCameraPermission}
                className="border-[#FFD700] text-[#FFD700]"
              >
                {t('legal.requestCamera')}
              </Button>
            </div>

            {/* Location Permission */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-semibold text-white">{t('legal.locationPermission')}</h3>
              </div>
              <p className="text-sm text-gray-400">{t('legal.locationDesc')}</p>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="location" 
                  checked={locationAccepted}
                  onCheckedChange={(checked) => setLocationAccepted(checked as boolean)}
                />
                <label htmlFor="location" className="text-sm text-white cursor-pointer">
                  {t('legal.acceptLocation')}
                </label>
              </div>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={handleRequestLocationPermission}
                className="border-[#FFD700] text-[#FFD700]"
              >
                {t('legal.requestLocation')}
              </Button>
            </div>

            {/* Terms & Conditions */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-semibold text-white">{t('legal.termsTitle')}</h3>
              </div>
              <p className="text-sm text-gray-400">{t('legal.termsDesc')}</p>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <label htmlFor="terms" className="text-sm text-white cursor-pointer">
                  {t('legal.acceptTerms')}
                </label>
              </div>
              <Button 
                size="sm" 
                variant="link" 
                onClick={onNavigateToTerms}
                className="text-[#FFD700] p-0 h-auto"
              >
                {t('legal.readTerms')}
              </Button>
            </div>

            {/* Privacy Policy */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-[#FFD700]" />
                <h3 className="font-semibold text-white">{t('legal.privacyTitle')}</h3>
              </div>
              <p className="text-sm text-gray-400">{t('legal.privacyDesc')}</p>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="privacy" 
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                />
                <label htmlFor="privacy" className="text-sm text-white cursor-pointer">
                  {t('legal.acceptPrivacy')}
                </label>
              </div>
            </div>

            {/* Cookies */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white">{t('legal.cookiesTitle')}</h3>
              <p className="text-sm text-gray-400">{t('legal.cookiesDesc')}</p>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="cookies" 
                  checked={cookiesAccepted}
                  onCheckedChange={(checked) => setCookiesAccepted(checked as boolean)}
                />
                <label htmlFor="cookies" className="text-sm text-white cursor-pointer">
                  {t('legal.acceptCookies')}
                </label>
              </div>
            </div>

            {/* Age Confirmation */}
            <div className="space-y-2">
              <h3 className="font-semibold text-white">{t('legal.ageTitle')}</h3>
              <div className="flex items-center gap-2">
                <Checkbox 
                  id="age" 
                  checked={ageConfirmed}
                  onCheckedChange={(checked) => setAgeConfirmed(checked as boolean)}
                />
                <label htmlFor="age" className="text-sm text-white cursor-pointer">
                  {t('legal.confirmAge')}
                </label>
              </div>
            </div>

            <Alert className="bg-yellow-900/20 border-yellow-600">
              <AlertDescription className="text-yellow-200 text-xs">
                {t('legal.disclaimer')}
              </AlertDescription>
            </Alert>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button 
            onClick={onAccept}
            disabled={!allAccepted}
            className="w-full bg-[#FFD700] text-black hover:bg-[#D4AF37] font-bold"
          >
            {t('legal.acceptAndContinue')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
