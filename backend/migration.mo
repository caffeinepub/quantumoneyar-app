import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

module {
  type OldActor = {
    principalToUserId : Map.Map<Principal, Nat>;
  };

  type NewActor = {
    principalToUserId : Map.Map<Principal, Nat>;
    principalToUserIdGlobal : Map.Map<Principal, Nat>;
  };

  public func run(old : OldActor) : NewActor {
    let principalToUserIdGlobal = Map.empty<Principal, Nat>();
    { old with principalToUserIdGlobal };
  };
};
