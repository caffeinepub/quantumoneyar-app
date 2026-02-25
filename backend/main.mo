import Nat "mo:core/Nat";
import Map "mo:core/Map";
import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  include MixinStorage();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type UserID = Nat;
  public type Timestamp = Time.Time;

  public type UserProfile = {
    name : Text;
    gender : ?Text;
    photoUrl : ?Storage.ExternalBlob;
    locale : Text;
  };

  let userProfiles = Map.empty<UserID, UserProfile>();
  let principalToUserId = Map.empty<Principal, UserID>();

  var nextUserId : UserID = 1;

  func getOrCreateUserId(principal : Principal) : UserID {
    switch (principalToUserId.get(principal)) {
      case (?id) { id };
      case (null) {
        let newId = nextUserId;
        principalToUserId.add(principal, newId);
        nextUserId += 1;
        newId;
      };
    };
  };

  func getUserIdReadOnly(principal : Principal) : ?UserID {
    principalToUserId.get(principal);
  };

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };

    switch (getUserIdReadOnly(caller)) {
      case (null) { null };
      case (?userId) { userProfiles.get(userId) };
    };
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };

    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };

    switch (getUserIdReadOnly(user)) {
      case (null) { null };
      case (?userId) { userProfiles.get(userId) };
    };
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let userId = getOrCreateUserId(caller);
    userProfiles.add(userId, profile);
  };

  public type Bonus = {
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

  let bonuses = Map.empty<UserID, Bonus>();
  var registrationCount = 0 : Nat;
  let MAX_BONUS_USERS = 100_000;

  public query ({ caller }) func getClaimBonus() : async ?Bonus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access bonus information");
    };

    switch (getUserIdReadOnly(caller)) {
      case (null) { null };
      case (?userId) { bonuses.get(userId) };
    };
  };

  public shared ({ caller }) func claimBonus() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can claim bonuses");
    };

    let userId = getOrCreateUserId(caller);

    switch (bonuses.get(userId)) {
      case (?_existing) {
        Runtime.trap("User has already claimed this promotion");
      };
      case (null) {};
    };

    if (registrationCount >= MAX_BONUS_USERS) {
      Runtime.trap("This bonus promotion has a limit of 100,000 users");
    };

    let newBonus : Bonus = {
      unlocked = 100.0;
      locked = 900.0;
      lastUnlockTimestamp = 0;
      nextUnlockBalance = 100.0;
      remainingLocked = 900.0;
      percentageUnlocked = 0.1;
      unlocksRemaining = 9;
      fullyUnlocked = false;
      nextUnlockMessage = "Next unlock in 6 months";
      cntRemaining = 8;
      hasNextUnlock = false;
      hasTokens = true;
      totqmy = 1000;
    };

    bonuses.add(userId, newBonus);
    registrationCount += 1;
  };

  public query ({ caller }) func getBonusStats() : async { registrationCount : Nat; maxUsers : Nat; remaining : Nat } {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view statistics");
    };

    let safeResult = Int.abs(MAX_BONUS_USERS - registrationCount);

    {
      registrationCount;
      maxUsers = MAX_BONUS_USERS;
      remaining = safeResult;
    };
  };

  public query ({ caller }) func getUserBonus(user : Principal) : async ?Bonus {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view other users' bonuses");
    };

    switch (getUserIdReadOnly(user)) {
      case (null) { null };
      case (?userId) { bonuses.get(userId) };
    };
  };

  public type Monster = {
    id : Text;
    name : Text;
    captured : Bool;
    captureTimestamp : ?Timestamp;
  };

  public type CoinLock = {
    id : Text;
    locked : Bool;
    lockedBy : ?Principal;
    timestamp : ?Timestamp;
  };

  public type StatWithTimestamp = {
    value : ?Int;
    timestamp : Timestamp;
  };

  public type HistoryEntry = {
    actionType : Text;
    timestamp : Timestamp;
    metadata : Text;
  };

  public type PlayerState = {
    id : Text;
    xp : Nat;
    monsters : [Monster];
    coinLocks : [CoinLock];
  };

  public type PlayerProfile = {
    id : Text;
    xp : ?Int;
    monsters : [Monster];
    coinLocks : [CoinLock];
    counters : ?{ natValue : Nat };
    actionHistory : [HistoryEntry];
    statsWithTimestamp : [StatWithTimestamp];
  };

  public type ActionResponse = {
    timestamp : Timestamp;
    successful : Bool;
    message : Text;
    playerState : PlayerState;
    globalStats : ?{ natValue : Nat };
  };

  public type UnlockRecord = {
    timestamp : Timestamp;
    coinId : Text;
  };

  let monsters = Map.empty<UserID, List.List<Monster>>();
  let coinLocks = Map.empty<UserID, List.List<CoinLock>>();
  let actionHistory = Map.empty<UserID, List.List<HistoryEntry>>();
  let playerStats = Map.empty<UserID, List.List<StatWithTimestamp>>();
  let playerXP = Map.empty<UserID, Nat>();
  let unlockHistory = Map.empty<UserID, List.List<UnlockRecord>>();

  let UNLOCK_LIMIT_24H = 100 : Nat;
  let UNLOCK_XP_COST = 15 : Nat;
  let LOCK_XP_REWARD = 10 : Nat;
  let CAPTURE_XP_REWARD = 20 : Nat;
  let NANOSECONDS_PER_DAY = 86_400_000_000_000 : Int;

  func getPlayerXP(userId : UserID) : Nat {
    switch (playerXP.get(userId)) {
      case (null) { 0 };
      case (?xp) { xp };
    };
  };

  func addPlayerXP(userId : UserID, amount : Nat) {
    let currentXP = getPlayerXP(userId);
    playerXP.add(userId, currentXP + amount);
  };

  func deductPlayerXP(userId : UserID, amount : Nat) : Bool {
    let currentXP = getPlayerXP(userId);
    if (currentXP < amount) {
      return false;
    };
    let safeResult = Int.abs(currentXP - amount);
    playerXP.add(userId, safeResult);
    true;
  };

  func countUnlocksLast24Hours(userId : UserID) : Nat {
    let now = Time.now();
    let cutoff = now - NANOSECONDS_PER_DAY;

    switch (unlockHistory.get(userId)) {
      case (null) { 0 };
      case (?history) {
        var count = 0 : Nat;
        for (record in history.toArray().vals()) {
          if (record.timestamp >= cutoff) {
            count += 1;
          };
        };
        count;
      };
    };
  };

  func isCoinLockedByUser(userId : UserID, coinId : Text) : Bool {
    switch (coinLocks.get(userId)) {
      case (null) { false };
      case (?list) {
        for (coin in list.toArray().vals()) {
          if (coin.id == coinId and coin.locked) {
            return true;
          };
        };
        false;
      };
    };
  };

  public query ({ caller }) func getPlayerState() : async PlayerState {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access player state");
    };

    switch (getUserIdReadOnly(caller)) {
      case (null) {
        {
          id = "0";
          xp = 0;
          monsters = [];
          coinLocks = [];
        };
      };
      case (?userId) {
        let monsterList = switch (monsters.get(userId)) {
          case (null) { List.empty<Monster>() };
          case (?list) { list };
        };

        let coinLockList = switch (coinLocks.get(userId)) {
          case (null) { List.empty<CoinLock>() };
          case (?list) { list };
        };

        {
          id = userId.toText();
          xp = getPlayerXP(userId);
          monsters = monsterList.toArray();
          coinLocks = coinLockList.toArray();
        };
      };
    };
  };

  public shared ({ caller }) func lockCoin(coinId : Text) : async ActionResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can lock coins");
    };

    let userId = getOrCreateUserId(caller);

    if (isCoinLockedByUser(userId, coinId)) {
      Runtime.trap("Coin is already locked by you");
    };

    let coinLock = {
      id = coinId;
      locked = true;
      lockedBy = ?caller;
      timestamp = ?Time.now();
    };

    let coinList = switch (coinLocks.get(userId)) {
      case (null) { List.fromArray<CoinLock>([coinLock]) };
      case (?list) {
        list.add(coinLock);
        list;
      };
    };
    coinLocks.add(userId, coinList);

    addPlayerXP(userId, LOCK_XP_REWARD);

    let entry = {
      actionType = "lock_coin";
      timestamp = Time.now();
      metadata = "Coin " # coinId # " locked, +" # LOCK_XP_REWARD.toText() # " XP";
    };
    let historyList = switch (actionHistory.get(userId)) {
      case (null) { List.fromArray<HistoryEntry>([entry]) };
      case (?list) {
        list.add(entry);
        list;
      };
    };
    actionHistory.add(userId, historyList);

    {
      timestamp = Time.now();
      successful = true;
      message = "Coin locked successfully, +" # LOCK_XP_REWARD.toText() # " XP";
      playerState = {
        id = userId.toText();
        xp = getPlayerXP(userId);
        monsters = switch (monsters.get(userId)) {
          case (null) { [] };
          case (?list) { list.toArray() };
        };
        coinLocks = coinList.toArray();
      };
      globalStats = null;
    };
  };

  public shared ({ caller }) func unlockCoin(coinId : Text) : async ActionResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can unlock coins");
    };

    let userId = getOrCreateUserId(caller);

    if (not isCoinLockedByUser(userId, coinId)) {
      Runtime.trap("Unauthorized: Coin is not locked by you or does not exist");
    };

    let unlocksLast24h = countUnlocksLast24Hours(userId);
    if (unlocksLast24h >= UNLOCK_LIMIT_24H) {
      Runtime.trap("Unlock limit reached: maximum 100 unlocks per 24 hours");
    };

    let currentXP = getPlayerXP(userId);
    if (currentXP < UNLOCK_XP_COST) {
      Runtime.trap("Insufficient XP: need at least " # UNLOCK_XP_COST.toText() # " XP to unlock");
    };

    if (not deductPlayerXP(userId, UNLOCK_XP_COST)) {
      Runtime.trap("Failed to deduct XP");
    };

    let coinList = switch (coinLocks.get(userId)) {
      case (null) { List.empty<CoinLock>() };
      case (?list) { list };
    };

    let updatedCoinList = coinList.map<CoinLock, CoinLock>(
      func(coin) {
        if (coin.id == coinId) {
          { coin with locked = false; lockedBy = null; timestamp = null };
        } else {
          coin;
        };
      }
    );
    coinLocks.add(userId, updatedCoinList);

    let unlockRecord = {
      timestamp = Time.now();
      coinId = coinId;
    };
    let unlockHistoryList = switch (unlockHistory.get(userId)) {
      case (null) { List.fromArray<UnlockRecord>([unlockRecord]) };
      case (?list) {
        list.add(unlockRecord);
        list;
      };
    };
    unlockHistory.add(userId, unlockHistoryList);

    let entry = {
      actionType = "unlock_coin";
      timestamp = Time.now();
      metadata = "Coin " # coinId # " unlocked, -" # UNLOCK_XP_COST.toText() # " XP";
    };
    let historyList = switch (actionHistory.get(userId)) {
      case (null) { List.fromArray<HistoryEntry>([entry]) };
      case (?list) {
        list.add(entry);
        list;
      };
    };
    actionHistory.add(userId, historyList);

    {
      timestamp = Time.now();
      successful = true;
      message = "Coin unlocked, -" # UNLOCK_XP_COST.toText() # " XP";
      playerState = {
        id = userId.toText();
        xp = getPlayerXP(userId);
        monsters = switch (monsters.get(userId)) {
          case (null) { [] };
          case (?list) { list.toArray() };
        };
        coinLocks = updatedCoinList.toArray();
      };
      globalStats = null;
    };
  };
};
