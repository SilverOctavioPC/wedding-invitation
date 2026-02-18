export interface StoryEvent {
  id: number;
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface EventDetail {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapLink: string;
}

export interface RSVPData {
  name: string;
  email: string;
  attending: 'yes' | 'no' | null;
  guests: number;
  dietaryRestrictions?: string;
}

export interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
