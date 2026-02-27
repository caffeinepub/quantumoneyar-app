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

  public shared ({ caller }) func setDisplayName(displayName : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set display name");
    };
    let userId = getOrCreateUserId(caller);
    let existing = switch (userProfiles.get(userId)) {
      case (null) {
        {
          name = displayName;
          gender = null;
          photoUrl = null;
          locale = "en";
        };
      };
      case (?profile) {
        { profile with name = displayName };
      };
    };
    userProfiles.add(userId, existing);
  };

  public shared ({ caller }) func setProfilePhoto(photo : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can set profile photo");
    };
    let userId = getOrCreateUserId(caller);
    let existing = switch (userProfiles.get(userId)) {
      case (null) {
        {
          name = "";
          gender = null;
          photoUrl = ?photo;
          locale = "en";
        };
      };
      case (?profile) {
        { profile with photoUrl = ?photo };
      };
    };
    userProfiles.add(userId, existing);
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

  public type VestingEntry = {
    installmentNumber : Nat;
    amount : Float;
    unlockTimestamp : Timestamp;
    unlocked : Bool;
  };

  let bonuses = Map.empty<UserID, Bonus>();
  let vestingSchedules = Map.empty<UserID, List.List<VestingEntry>>();
  var registrationCount = 0 : Nat;
  let MAX_BONUS_USERS = 100_000;

  let VESTING_INSTALLMENTS = 9 : Nat;
  let VESTING_AMOUNT_PER_INSTALLMENT : Float = 100.0;
  let NANOSECONDS_PER_MONTH = 2_592_000_000_000_000 : Int;

  public query ({ caller }) func getClaimBonus() : async ?Bonus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access bonus information");
    };

    switch (getUserIdReadOnly(caller)) {
      case (null) { null };
      case (?userId) { bonuses.get(userId) };
    };
  };

  public shared ({ caller }) func claimWelcomeBonus() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can claim bonuses");
    };

    let userId = getOrCreateUserId(caller);

    switch (bonuses.get(userId)) {
      case (?_existing) {
        // Idempotent: already claimed, silently return
        return;
      };
      case (null) {};
    };

    if (registrationCount >= MAX_BONUS_USERS) {
      Runtime.trap("This bonus promotion has a limit of 100,000 users");
    };

    let now = Time.now();

    let newBonus : Bonus = {
      unlocked = 100.0;
      locked = 900.0;
      lastUnlockTimestamp = 0;
      nextUnlockBalance = 100.0;
      remainingLocked = 900.0;
      percentageUnlocked = 0.1;
      unlocksRemaining = 9;
      fullyUnlocked = false;
      nextUnlockMessage = "Next unlock in 1 month";
      cntRemaining = 8;
      hasNextUnlock = true;
      hasTokens = true;
      totqmy = 1000;
    };

    bonuses.add(userId, newBonus);

    // Build vesting schedule: 9 monthly installments of 100 QMY each
    var vestingList = List.empty<VestingEntry>();
    var i = 0 : Nat;
    while (i < VESTING_INSTALLMENTS) {
      let entry : VestingEntry = {
        installmentNumber = i + 1;
        amount = VESTING_AMOUNT_PER_INSTALLMENT;
        unlockTimestamp = now + (NANOSECONDS_PER_MONTH * (i + 1));
        unlocked = false;
      };
      vestingList.add(entry);
      i += 1;
    };
    vestingSchedules.add(userId, vestingList);

    // Award 100 XP for claiming welcome bonus
    addPlayerXP(userId, 100);

    registrationCount += 1;
  };

  // Keep claimBonus as alias for backward compatibility
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

    let now = Time.now();

    let newBonus : Bonus = {
      unlocked = 100.0;
      locked = 900.0;
      lastUnlockTimestamp = 0;
      nextUnlockBalance = 100.0;
      remainingLocked = 900.0;
      percentageUnlocked = 0.1;
      unlocksRemaining = 9;
      fullyUnlocked = false;
      nextUnlockMessage = "Next unlock in 1 month";
      cntRemaining = 8;
      hasNextUnlock = true;
      hasTokens = true;
      totqmy = 1000;
    };

    bonuses.add(userId, newBonus);

    var vestingList = List.empty<VestingEntry>();
    var i = 0 : Nat;
    while (i < VESTING_INSTALLMENTS) {
      let entry : VestingEntry = {
        installmentNumber = i + 1;
        amount = VESTING_AMOUNT_PER_INSTALLMENT;
        unlockTimestamp = now + (NANOSECONDS_PER_MONTH * (i + 1));
        unlocked = false;
      };
      vestingList.add(entry);
      i += 1;
    };
    vestingSchedules.add(userId, vestingList);

    addPlayerXP(userId, 100);

    registrationCount += 1;
  };

  public query ({ caller }) func getVestingSchedule() : async [VestingEntry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access vesting schedule");
    };

    switch (getUserIdReadOnly(caller)) {
      case (null) { [] };
      case (?userId) {
        switch (vestingSchedules.get(userId)) {
          case (null) { [] };
          case (?list) { list.toArray() };
        };
      };
    };
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
    lockedQMY : Float;
    unlockedQMY : Float;
    capturedMonsters : [Monster];
    lockedCoins : [CoinLock];
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

  public type SpawnItem = {
    id : Text;
    spawnType : Text;
    latitude : Float;
    longitude : Float;
    itemType : Text;
    attributes : Text;
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

  func isMonsterCapturedByUser(userId : UserID, monsterId : Text) : Bool {
    switch (monsters.get(userId)) {
      case (null) { false };
      case (?list) {
        for (m in list.toArray().vals()) {
          if (m.id == monsterId and m.captured) {
            return true;
          };
        };
        false;
      };
    };
  };

  func getUserLockedQMY(userId : UserID) : Float {
    switch (bonuses.get(userId)) {
      case (null) { 0.0 };
      case (?b) { b.locked };
    };
  };

  func getUserUnlockedQMY(userId : UserID) : Float {
    switch (bonuses.get(userId)) {
      case (null) { 0.0 };
      case (?b) { b.unlocked };
    };
  };

  func buildPlayerState(userId : UserID) : PlayerState {
    let monsterList = switch (monsters.get(userId)) {
      case (null) { List.empty<Monster>() };
      case (?list) { list };
    };

    let coinLockList = switch (coinLocks.get(userId)) {
      case (null) { List.empty<CoinLock>() };
      case (?list) { list };
    };

    let capturedArr = monsterList.toArray();
    let lockedCoinsArr = coinLockList.toArray();

    {
      id = userId.toText();
      xp = getPlayerXP(userId);
      lockedQMY = getUserLockedQMY(userId);
      unlockedQMY = getUserUnlockedQMY(userId);
      capturedMonsters = capturedArr;
      lockedCoins = lockedCoinsArr;
      monsters = capturedArr;
      coinLocks = lockedCoinsArr;
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
          lockedQMY = 0.0;
          unlockedQMY = 0.0;
          capturedMonsters = [];
          lockedCoins = [];
          monsters = [];
          coinLocks = [];
        };
      };
      case (?userId) {
        buildPlayerState(userId);
      };
    };
  };

  public query func getSpawnList() : async [SpawnItem] {
    [
      {
        id = "coin_spawn_001";
        spawnType = "coin";
        latitude = 37.7749;
        longitude = -122.4194;
        itemType = "QMY_coin";
        attributes = "value:10,rarity:common";
      },
      {
        id = "coin_spawn_002";
        spawnType = "coin";
        latitude = 37.7751;
        longitude = -122.4180;
        itemType = "QMY_coin";
        attributes = "value:50,rarity:uncommon";
      },
      {
        id = "coin_spawn_003";
        spawnType = "coin";
        latitude = 37.7760;
        longitude = -122.4200;
        itemType = "QMY_coin";
        attributes = "value:100,rarity:rare";
      },
      {
        id = "monster_spawn_001";
        spawnType = "monster";
        latitude = 37.7755;
        longitude = -122.4190;
        itemType = "Quantumon_Alpha";
        attributes = "level:1,hp:100,xp_reward:20";
      },
      {
        id = "monster_spawn_002";
        spawnType = "monster";
        latitude = 37.7740;
        longitude = -122.4210;
        itemType = "Quantumon_Beta";
        attributes = "level:3,hp:250,xp_reward:20";
      },
      {
        id = "monster_spawn_003";
        spawnType = "monster";
        latitude = 37.7770;
        longitude = -122.4170;
        itemType = "Quantumon_Gamma";
        attributes = "level:5,hp:500,xp_reward:20";
      },
      {
        id = "coin_spawn_004";
        spawnType = "coin";
        latitude = 40.7128;
        longitude = -74.0060;
        itemType = "QMY_coin";
        attributes = "value:25,rarity:common";
      },
      {
        id = "monster_spawn_004";
        spawnType = "monster";
        latitude = 40.7130;
        longitude = -74.0050;
        itemType = "Quantumon_Delta";
        attributes = "level:2,hp:150,xp_reward:20";
      },
    ];
  };

  public shared ({ caller }) func captureMonster(spawnId : Text) : async ActionResponse {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can capture monsters");
    };

    let userId = getOrCreateUserId(caller);

    if (isMonsterCapturedByUser(userId, spawnId)) {
      Runtime.trap("Monster has already been captured by you");
    };

    let monster : Monster = {
      id = spawnId;
      name = "Quantumon_" # spawnId;
      captured = true;
      captureTimestamp = ?Time.now();
    };

    let monsterList = switch (monsters.get(userId)) {
      case (null) { List.fromArray<Monster>([monster]) };
      case (?list) {
        list.add(monster);
        list;
      };
    };
    monsters.add(userId, monsterList);

    addPlayerXP(userId, CAPTURE_XP_REWARD);

    let entry = {
      actionType = "capture_monster";
      timestamp = Time.now();
      metadata = "Monster " # spawnId # " captured, +" # CAPTURE_XP_REWARD.toText() # " XP";
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
      message = "Monster captured successfully, +" # CAPTURE_XP_REWARD.toText() # " XP";
      playerState = buildPlayerState(userId);
      globalStats = null;
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
      playerState = buildPlayerState(userId);
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
      playerState = buildPlayerState(userId);
      globalStats = null;
    };
  };
};
