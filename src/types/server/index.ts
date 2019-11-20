export interface DrinkEvent {
    id: number;
    time: string;
    title: string;
    creator: User;
    guests: User[];
    type: EventType;
    location: EventLocation;
    comments: EventComment[];
}

export enum EventType {
    beers = 'BEERS',
    cocktails = 'COCKTAILS',
    coffees = 'COFFEES',
    milkshakes = 'MILKSHAKES',
}

export interface EventLocation {
    name: string;
    latitude: number;
    longitude: number;
}

export interface EventComment {
    user: User;
    timestamp: string;
    message: string;
}

export interface User {
    name: string;
    avatarUrl: string;
}