import { PAGES } from "./constant";
const state = {
  products: [
    {
      id: 0,
      name: "Jorts",
      price: 0.99,
      image: "http://placehold.co/150x150?text=Jorts",
    },
    {
      id: 1,
      name: "Jean",
      price: 3.14,
      image: "http://placehold.co/150x150?text=Jean",
    },
    {
      id: 2,
      name: "Nyancat",
      price: 2.73,
      image: "http://placehold.co/150x150?text=Nyancat",
    },
  ],
  pages: PAGES.PRODUCTS,
  cart: {},
};

export default state;
