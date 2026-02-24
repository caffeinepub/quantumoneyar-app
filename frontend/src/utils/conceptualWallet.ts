import { Principal } from '@dfinity/principal';

/**
 * Generates a deterministic conceptual wallet ID from a principal
 * Uses Web Crypto API for stable hashing
 */
export async function generateConceptualWalletId(principal: Principal): Promise<string> {
  const principalText = principal.toString();
  const encoder = new TextEncoder();
  const data = encoder.encode(principalText);
  
  // Use SHA-256 for deterministic hashing
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  // Format as a wallet-like ID (QMY-XXXX-XXXX-XXXX)
  return `QMY-${hashHex.slice(0, 4).toUpperCase()}-${hashHex.slice(4, 8).toUpperCase()}-${hashHex.slice(8, 12).toUpperCase()}`;
}

export interface ConceptualTransaction {
  id: string;
  type: 'incoming' | 'outgoing';
  amount: number;
  timestamp: Date;
  description: string;
  status: 'completed' | 'pending';
}

/**
 * Generates placeholder transactions for visual display
 */
export function generatePlaceholderTransactions(): ConceptualTransaction[] {
  const now = Date.now();
  
  return [
    {
      id: 'tx-001',
      type: 'incoming',
      amount: 100,
      timestamp: new Date(now - 1000 * 60 * 60 * 24 * 0), // Today
      description: 'Welcome Bonus (Unlocked)',
      status: 'completed',
    },
    {
      id: 'tx-002',
      type: 'incoming',
      amount: 100,
      timestamp: new Date(now + 1000 * 60 * 60 * 24 * 30), // +30 days
      description: 'Vesting Unlock (Month 1)',
      status: 'pending',
    },
    {
      id: 'tx-003',
      type: 'incoming',
      amount: 100,
      timestamp: new Date(now + 1000 * 60 * 60 * 24 * 60), // +60 days
      description: 'Vesting Unlock (Month 2)',
      status: 'pending',
    },
    {
      id: 'tx-004',
      type: 'outgoing',
      amount: 50,
      timestamp: new Date(now - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      description: 'AR Coin Lock (Conceptual)',
      status: 'completed',
    },
  ];
}
