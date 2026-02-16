import { StoryEvent, EventDetail, GalleryImage } from './types';

export const WEDDING_DATE = "2026-07-30T16:00:00";

export const COUPLE_NAMES = {
  bride: "Sofia",
  groom: "Alejandro"
};

export const STORY_DATA: StoryEvent[] = [
  {
    id: 1,
    year: "2018",
    title: "El Primer Encuentro",
    description: "Nos conocimos en una pequeña cafetería del centro. Una coincidencia, un café derramado y una risa compartida marcaron el inicio de todo.",
    image: "https://picsum.photos/seed/meet/400/400"
  },
  {
    id: 2,
    year: "2020",
    title: "Nuestra Primera Aventura",
    description: "Viajamos juntos a la Patagonia. Entre montañas y lagos, supimos que éramos el mejor equipo para recorrer el mundo.",
    image: "https://picsum.photos/seed/travel/400/400"
  },
  {
    id: 3,
    year: "2023",
    title: "El 'Sí' Quiero",
    description: "Bajo un atardecer inolvidable en la playa, Alejandro hizo la pregunta y Sofia dijo que sí sin dudarlo.",
    image: "https://picsum.photos/seed/proposal/400/400"
  }
];

export const EVENTS: { ceremony: EventDetail; reception: EventDetail } = {
  ceremony: {
    title: "Ceremonia Religiosa",
    date: "30 de Julio, 2026",
    time: "16:00 HRS",
    locationName: "Catedral de Santa María",
    address: "Av. Principal 123, Centro Histórico",
    mapLink: "https://maps.google.com"
  },
  reception: {
    title: "Recepción & Fiesta",
    date: "30 de Julio, 2026",
    time: "18:30 HRS",
    locationName: "Hacienda Los Olivos",
    address: "Km 45 Carretera Norte, Valle Sagrado",
    mapLink: "https://maps.google.com"
  }
};

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1, src: "https://picsum.photos/seed/w1/600/800", alt: "Couple 1" },
  { id: 2, src: "https://picsum.photos/seed/w2/600/800", alt: "Couple 2" },
  { id: 3, src: "https://picsum.photos/seed/w3/800/600", alt: "Couple 3" },
  { id: 4, src: "https://picsum.photos/seed/w4/600/800", alt: "Couple 4" },
  { id: 5, src: "https://picsum.photos/seed/w5/600/800", alt: "Couple 5" },
  { id: 6, src: "https://picsum.photos/seed/w6/800/600", alt: "Couple 6" },
];