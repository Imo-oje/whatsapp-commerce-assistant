import type { Route } from "./+types/catalog";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Catalog" },
    { description: "Catalog page", content: "Welcome to catalog" },
  ];
}
export default function Catalog() {
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      title: "one",
      img: "",
      viewing: true,
    },
    {
      title: "two",
      img: "",
      viewing: false,
    },
    {
      title: "three",
      img: "",
      viewing: false,
    },
    {
      title: "four",
      img: "",
      viewing: false,
    },
  ]);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 2,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 3,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 4,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 5,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 6,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 7,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 8,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 9,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
    {
      id: 10,
      title: "product title",
      img: "",
      price: "5.00",
      description: "something about this product",
    },
  ]);
  const [autoIndex, setAutoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAutoIndex((prevState) =>
        prevState < featuredProducts.length - 1 ? prevState + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  useEffect(() => {
    updateCarousel(autoIndex);
  }, [autoIndex]);

  const updateCarousel = (index: number) => {
    const updated = [...featuredProducts];
    updated.forEach((item, i) => {
      if (index === i) {
        return (item.viewing = true);
      }
      item.viewing = false;
    });
    setFeaturedProducts(updated);
  };

  return (
    <>
      <header className="flex flex-col md:flex-row w-full gap-4 p-4">
        <div className="h-[20rem] md:h-[30rem] lg:h-[36rem] flex justify-end md:w-4/5">
          {featuredProducts.map((item, index) => (
            <div
              onClick={() => updateCarousel(index)}
              key={index}
              className={`h-full border rounded-sm overflow-hidden transition-all duration-300 ${
                item.viewing ? "w-full" : "w-[2rem]"
              }`}
            >
              {/*{item.title}*/}
            </div>
          ))}
        </div>
        <div className="border rounded-sm w-full h-[10rem] md:w-1/5 md:h-[30rem] lg:h-[36rem]"></div>
      </header>

      <div className="px-4 w-full rounded-sm">query block</div>

      <main className=" p-4 rounded-sm carousel-grid gap-4">
        {products.map((product) => (
          <div key={product.id} className=" aspect-4/5 border rounded-sm">
            {product.title}
          </div>
        ))}
      </main>
    </>
  );
}
