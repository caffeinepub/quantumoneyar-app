import { useLanguage } from '../contexts/LanguageContext';
import { useGetClaimBonus } from '../hooks/useQueries';

interface WelcomeBackModalProps {
  onClose: () => void;
}

export default function WelcomeBackModal({ onClose }: WelcomeBackModalProps) {
  const { t } = useLanguage();
  const { data: bonus } = useGetClaimBonus();

  const unlocked = bonus?.unlocked ?? 100;
  const locked = bonus?.locked ?? 900;
  const total = bonus?.totqmy ?? 1000;
  const pct = bonus ? Math.round(bonus.percentageUnlocked * 100) : 10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-gold/40 bg-black/90 p-6 shadow-gold text-center">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-gold/10 text-3xl">
            👋
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-1 font-display text-2xl font-bold text-gold">
          {t('welcomeBack')}
        </h2>
        <p className="mb-5 text-sm text-gold/70">
          {t('returningUserMessage')}
        </p>

        {/* Balance cards */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-3">
            <p className="text-xs text-gold/60">{t('currentBalanceUnlocked')}</p>
            <p className="mt-1 font-display text-lg font-bold text-gold">
              {unlocked.toFixed(0)} QMY
            </p>
          </div>
          <div className="rounded-xl border border-gold/20 bg-gold/5 p-3">
            <p className="text-xs text-gold/60">{t('currentBalanceLocked')}</p>
            <p className="mt-1 font-display text-lg font-bold text-amber-400">
              {locked.toFixed(0)} QMY
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="mb-4 rounded-xl border border-gold/30 bg-gold/10 p-3">
          <p className="text-xs text-gold/60">{t('totalQMY')}</p>
          <p className="font-display text-xl font-bold text-gold">{Number(total)} QMY</p>
        </div>

        {/* Vesting progress */}
        <div className="mb-5">
          <div className="mb-1 flex justify-between text-xs text-gold/60">
            <span>{t('vestingProgress')}</span>
            <span>{pct}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gold/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-amber-400 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-xl border border-gold bg-gold/10 py-3 font-display font-semibold text-gold transition-all hover:bg-gold/20 active:scale-95"
        >
          {t('continueGame')}
        </button>
      </div>
    </div>
  );
}
