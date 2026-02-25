import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Int "mo:core/Int";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";

module {
  type UserID = Nat;
  type Timestamp = Time.Time;

  type Bonus = {
    unlocked : Float;
    locked : Float;
    lastUnlockTimestamp : Int;
    nextUnlockBalance : Float;
    remainingLocked : Float;
    percentageUnlocked : Float;
    unlocksRemaining : Nat;
    fullyUnlocked : Bool;
    nextUnlockMessage : Text;
    cntRemaining : Nat;
    hasNextUnlock : Bool;
    hasTokens : Bool;
    totqmy : Int;
  };

  type Monster = {
    id : Text;
    name : Text;
    captured : Bool;
    captureTimestamp : ?Timestamp;
  };

  type CoinLock = {
    id : Text;
    locked : Bool;
    lockedBy : ?Principal;
    timestamp : ?Timestamp;
  };

  type StatWithTimestamp = {
    value : ?Int;
    timestamp : Timestamp;
  };

  type HistoryEntry = {
    actionType : Text;
    timestamp : Timestamp;
    metadata : Text;
  };

  type PlayerState = {
    id : Text;
    xp : Nat;
    monsters : [Monster];
    coinLocks : [CoinLock];
  };

  type PlayerProfile = {
    id : Text;
    xp : ?Int;
    monsters : [Monster];
    coinLocks : [CoinLock];
    counters : ?{ natValue : Nat };
    actionHistory : [HistoryEntry];
    statsWithTimestamp : [StatWithTimestamp];
  };

  type ActionResponse = {
    timestamp : Timestamp;
    successful : Bool;
    message : Text;
    playerState : PlayerState;
    globalStats : ?{ natValue : Nat };
  };

  type UnlockRecord = {
    timestamp : Timestamp;
    coinId : Text;
  };

  type NewActor = {
    bonuses : Map.Map<Nat, Bonus>;
    registrationCount : Nat;
    userProfiles : Map.Map<Nat, { name : Text; gender : ?Text; photoUrl : ?Storage.ExternalBlob; locale : Text }>;
    principalToUserId : Map.Map<Principal, Nat>;
    nextUserId : Nat;
    monsters : Map.Map<Nat, List.List<Monster>>;
    coinLocks : Map.Map<Nat, List.List<CoinLock>>;
    actionHistory : Map.Map<Nat, List.List<HistoryEntry>>;
    playerStats : Map.Map<Nat, List.List<StatWithTimestamp>>;
    playerXP : Map.Map<Nat, Nat>;
    unlockHistory : Map.Map<Nat, List.List<UnlockRecord>>;
    UNLOCK_LIMIT_24H : Nat;
    UNLOCK_XP_COST : Nat;
    LOCK_XP_REWARD : Nat;
    CAPTURE_XP_REWARD : Nat;
    NANOSECONDS_PER_DAY : Int;
  };

  type OldActor = {
    monsters : Map.Map<Nat, List.List<Monster>>;
    coinLocks : Map.Map<Nat, List.List<CoinLock>>;
    actionHistory : Map.Map<Nat, List.List<HistoryEntry>>;
    playerStats : Map.Map<Nat, List.List<StatWithTimestamp>>;
    playerXP : Map.Map<Nat, Nat>;
    unlockHistory : Map.Map<Nat, List.List<UnlockRecord>>;
    nextUserId : Nat;
    UNLOCK_LIMIT_24H : Nat;
    UNLOCK_XP_COST : Nat;
    LOCK_XP_REWARD : Nat;
    CAPTURE_XP_REWARD : Nat;
    NANOSECONDS_PER_DAY : Int;
    bonuses : Map.Map<Nat, Bonus>;
    registrationCount : Nat;
    userProfiles : Map.Map<Nat, { name : Text; gender : ?Text; photoUrl : ?Storage.ExternalBlob; locale : Text }>;
    principalToUserId : Map.Map<Principal, Nat>;
  };

  public func run(old : OldActor) : NewActor {
    {
      old with
      bonuses = old.bonuses;
      registrationCount = old.registrationCount;
      userProfiles = old.userProfiles;
      principalToUserId = old.principalToUserId;
    };
  };
};
