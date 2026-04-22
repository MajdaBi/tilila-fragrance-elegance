import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";

export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  price: number;
  image: string;
}

export const products: Product[] = [
  { id: "herrera-50", nameKey: "products.herrera.name", descKey: "products.herrera.desc", price: 80, image: p1 },
  { id: "kayali-50", nameKey: "products.kayali.name", descKey: "products.kayali.desc", price: 50, image: p2 },
  { id: "kayali33-50", nameKey: "products.kayali33.name", descKey: "products.kayali33.desc", price: 70, image: p3 },
];
