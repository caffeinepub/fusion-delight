import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Reservation {
    id: bigint;
    contact: string;
    date: string;
    name: string;
    specialRequests: string;
    time: string;
    timestamp: Time;
    partySize: bigint;
}
export interface MenuItem {
    name: string;
    description: string;
    price: number;
}
export type Time = bigint;
export interface MenuCategory {
    category: string;
    items: Array<MenuItem>;
}
export interface ContactSubmission {
    id: bigint;
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface Review {
    id: bigint;
    date: Time;
    name: string;
    comment: string;
    rating: bigint;
}
export interface backendInterface {
    addContactSubmission(name: string, email: string, message: string): Promise<bigint>;
    addMenuCategory(category: string, items: Array<MenuItem>): Promise<void>;
    addReservation(name: string, date: string, time: string, partySize: bigint, specialRequests: string, contact: string): Promise<bigint>;
    addReview(name: string, rating: bigint, comment: string): Promise<bigint>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    getMenu(): Promise<Array<MenuCategory>>;
    getReservations(): Promise<Array<Reservation>>;
    getReviews(): Promise<Array<Review>>;
}
