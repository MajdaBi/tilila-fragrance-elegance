import p1 from "@/assets/perfume-1.jpg";
import p2 from "@/assets/perfume-2.jpg";
import p3 from "@/assets/perfume-3.jpg";
import p4 from "@/assets/perfume-4.jpg";
import p5 from "@/assets/perfume-5.jpg";
import p6 from "@/assets/perfume-6.jpg";

export type Category = "Vanilla" | "Musk" | "Floral";

export interface ProductNotes {
  top: string;
  middle: string;
  base: string;
}

export interface Product {
  id: string;
  nameKey: string;
  descKey: string;
  fullDescKey: string;
  price: number;
  image: string;
  category: Category;
  notes: ProductNotes;
  initialStock: number;
}

export const products: Product[] = [
  {
    id: "herrera-50",
    nameKey: "products.herrera.name",
    descKey: "products.herrera.desc",
    fullDescKey: "products.herrera.full",
    price: 80,
    image: p1,
    category: "Vanilla",
    notes: { top: "Bergamot, Pear", middle: "Tuberose, Jasmine", base: "Vanilla, Sandalwood" },
    initialStock: 12,
  },
  {
    id: "kayali-50",
    nameKey: "products.kayali.name",
    descKey: "products.kayali.desc",
    fullDescKey: "products.kayali.full",
    price: 50,
    image: p2,
    category: "Vanilla",
    notes: { top: "Cotton Candy, Sugar", middle: "Vanilla Orchid", base: "Tonka Bean, Amber" },
    initialStock: 3,
  },
  {
    id: "kayali33-50",
    nameKey: "products.kayali33.name",
    descKey: "products.kayali33.desc",
    fullDescKey: "products.kayali33.full",
    price: 70,
    image: p3,
    category: "Musk",
    notes: { top: "Pink Pepper", middle: "Soft Musk, Iris", base: "Vanilla, Cashmeran" },
    initialStock: 0,
  },
  {
    id: "rose-royale-50",
    nameKey: "products.rose.name",
    descKey: "products.rose.desc",
    fullDescKey: "products.rose.full",
    price: 90,
    image: p4,
    category: "Floral",
    notes: { top: "Rose Petals, Lychee", middle: "Peony, Jasmine", base: "White Musk, Cedar" },
    initialStock: 8,
  },
  {
    id: "noir-musk-50",
    nameKey: "products.noir.name",
    descKey: "products.noir.desc",
    fullDescKey: "products.noir.full",
    price: 95,
    image: p5,
    category: "Musk",
    notes: { top: "Saffron, Cardamom", middle: "Oud, Leather", base: "Black Musk, Amber" },
    initialStock: 5,
  },
  {
    id: "vanille-or-50",
    nameKey: "products.vanille.name",
    descKey: "products.vanille.desc",
    fullDescKey: "products.vanille.full",
    price: 85,
    image: p6,
    category: "Vanilla",
    notes: { top: "Mandarin, Almond", middle: "Vanilla Bean, Heliotrope", base: "Caramel, Benzoin" },
    initialStock: 15,
  },
];
