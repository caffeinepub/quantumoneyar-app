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
export interface SpawnItem {
    id: string;
    latitude: number;
    attributes: string;
    longitude: number;
    itemType: string;
    spawnType: string;
}
export type Timestamp = bigint;
export interface VestingEntry {
    unlockTimestamp: Timestamp;
    installmentNumber: bigint;
    unlocked: boolean;
    amount: number;
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
export interface ActionResponse {
    globalStats?: {
        natValue: bigint;
    };
    playerState: PlayerState;
    message: string;
    timestamp: Timestamp;
    successful: boolean;
}
export interface PlayerState {
    id: string;
    xp: bigint;
    lockedQMY: number;
    coinLocks: Array<CoinLock>;
    lockedCoins: Array<CoinLock>;
    unlockedQMY: number;
    capturedMonsters: Array<Monster>;
    monsters: Array<Monster>;
}
export interface Monster {
    id: string;
    name: string;
    captured: boolean;
    captureTimestamp?: Timestamp;
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
    captureMonster(spawnId: string): Promise<ActionResponse>;
    claimBonus(): Promise<void>;
    claimWelcomeBonus(): Promise<void>;
    getBonusStats(): Promise<{
        maxUsers: bigint;
        remaining: bigint;
        registrationCount: bigint;
    }>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClaimBonus(): Promise<Bonus | null>;
    getPlayerState(): Promise<PlayerState>;
    getSpawnList(): Promise<Array<SpawnItem>>;
    getUserBonus(user: Principal): Promise<Bonus | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVestingSchedule(): Promise<Array<VestingEntry>>;
    isCallerAdmin(): Promise<boolean>;
    lockCoin(coinId: string): Promise<ActionResponse>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setDisplayName(displayName: string): Promise<void>;
    setProfilePhoto(photo: ExternalBlob): Promise<void>;
    unlockCoin(coinId: string): Promise<ActionResponse>;
}
