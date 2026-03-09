import Text "mo:core/Text";
import Time "mo:core/Time";
import List "mo:core/List";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type MenuItem = {
    name : Text;
    description : Text;
    price : Float;
  };

  type MenuCategory = {
    category : Text;
    items : [MenuItem];
  };

  type Reservation = {
    id : Nat;
    name : Text;
    date : Text;
    time : Text;
    partySize : Nat;
    specialRequests : Text;
    contact : Text;
    timestamp : Time.Time;
  };

  type Review = {
    id : Nat;
    name : Text;
    rating : Nat;
    comment : Text;
    date : Time.Time;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module Reservation {
    public func compare(r1 : Reservation, r2 : Reservation) : Order.Order {
      Int.compare(r1.timestamp, r2.timestamp);
    };
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      Int.compare(r1.date, r2.date);
    };
  };

  module ContactSubmission {
    public func compare(c1 : ContactSubmission, c2 : ContactSubmission) : Order.Order {
      Int.compare(c1.timestamp, c2.timestamp);
    };
  };

  module MenuCategory {
    public func compare(m1 : MenuCategory, m2 : MenuCategory) : Order.Order {
      Text.compare(m1.category, m2.category);
    };
  };

  let reservations = List.empty<Reservation>();
  var reservationId = 0;

  let reviews = List.empty<Review>();
  var reviewId = 0;

  let contacts = List.empty<ContactSubmission>();
  var contactId = 0;

  let menuData = Map.empty<Text, MenuCategory>();

  public shared ({ caller }) func addReservation(name : Text, date : Text, time : Text, partySize : Nat, specialRequests : Text, contact : Text) : async Nat {
    let newReservation : Reservation = {
      id = reservationId;
      name;
      date;
      time;
      partySize;
      specialRequests;
      contact;
      timestamp = Time.now();
    };
    reservations.add(newReservation);
    reservationId += 1;
    newReservation.id;
  };

  public shared ({ caller }) func addReview(name : Text, rating : Nat, comment : Text) : async Nat {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };
    let newReview : Review = {
      id = reviewId;
      name;
      rating;
      comment;
      date = Time.now();
    };
    reviews.add(newReview);
    reviewId += 1;
    newReview.id;
  };

  public shared ({ caller }) func addContactSubmission(name : Text, email : Text, message : Text) : async Nat {
    let newContact : ContactSubmission = {
      id = contactId;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contacts.add(newContact);
    contactId += 1;
    newContact.id;
  };

  public shared ({ caller }) func addMenuCategory(category : Text, items : [MenuItem]) : async () {
    let newCategory : MenuCategory = {
      category;
      items;
    };
    menuData.add(category, newCategory);
  };

  public query ({ caller }) func getReservations() : async [Reservation] {
    reservations.toArray().sort();
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.toArray().sort();
  };

  public query ({ caller }) func getContactSubmissions() : async [ContactSubmission] {
    contacts.toArray().sort();
  };

  public query ({ caller }) func getMenu() : async [MenuCategory] {
    menuData.values().toArray().sort();
  };
};
