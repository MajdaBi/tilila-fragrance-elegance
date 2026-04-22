export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  city: string;
}

export const reviews: Review[] = [
  { id: "r1", name: "Salma B.", city: "Casablanca", rating: 5, text: "Parfum zwin bzaf w kayb9a longtemps, ana m3jba bezzaf!" },
  { id: "r2", name: "Yasmine E.", city: "Rabat", rating: 5, text: "Très féminin et élégant, je reçois des compliments partout." },
  { id: "r3", name: "Imane K.", city: "Marrakech", rating: 5, text: "Very classy scent, perfect for everyday use. Highly recommend." },
  { id: "r4", name: "Fatima Zahra", city: "Tanger", rating: 5, text: "Riha rai3a, w l'emballage chic. Khdma nadifa, merci Tilila!" },
  { id: "r5", name: "Sara A.", city: "Fès", rating: 5, text: "J'adore la vanille, doux et sensuel. Mon préféré sans hésiter." },
  { id: "r6", name: "Hajar M.", city: "Agadir", rating: 5, text: "Ktbghi had l3otour, ri7tha hadiya w kat3jeb tout le monde ❤" },
];
