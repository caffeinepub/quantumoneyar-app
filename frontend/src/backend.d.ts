import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ActionResponse {
    globalStats?: {
        natValue: bigint;
    };
    playerState: PlayerState;
    message: string;
    timestamp: Timestamp;
    successful: boolean;
}
export type Timestamp = bigint;
export interface PlayerState {
    id: string;
    xp: bigint;
    coinLocks: Array<CoinLock>;
    monsters: Array<Monster>;
}
export interface Monster {
    id: string;
    name: string;
    captured: boolean;
    captureTimestamp?: Timestamp;
}
export interface CoinLock {
    id: string;
    locked: boolean;
    lockedBy?: Principal;
    timestamp?: Timestamp;
}
export interface Bonus {
    hasNextUnlock: boolean;
    percentageUnlocked: number;
    fullyUnlocked: boolean;
    cntRemaining: bigint;
    locked: number;
    unlocked: number;
    unlocksRemaining: bigint;
    nextUnlockBalance: number;
    totqmy: bigint;
    remainingLocked: number;
    lastUnlockTimestamp: bigint;
    hasTokens: boolean;
    nextUnlockMessage: string;
}
export interface UserProfile {
    name: string;
    locale: string;
    photoUrl?: ExternalBlob;
    gender?: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimBonus(): Promise<void>;
    getBonusStats(): Promise<{
        maxUsers: bigint;
        remaining: bigint;
        registrationCount: bigint;
    }>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClaimBonus(): Promise<Bonus | null>;
    getPlayerState(): Promise<PlayerState>;
    getUserBonus(user: Principal): Promise<Bonus | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    lockCoin(coinId: string): Promise<ActionResponse>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    unlockCoin(coinId: string): Promise<ActionResponse>;
}
