"use client";
import { getData } from "@/hooks/data";
import { Dish } from "@/types/types";
import Image from "next/image";
import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [dish, setDish] = useState<Dish | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        const foundDish = data.dishes.find(
          (dish: Dish) => dish.name.toLowerCase().replace(/ /g, "-") === id
        );
        if (foundDish) {
          setDish(foundDish);
        } else {
          setError("Dish not found.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load the dish.");
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!dish) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-3xl font-extrabold">
        <p>Loading...</p>
      </div>
    );
  }
  // Generate stars
  const renderStars = (starCount: number) => {
    const stars = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(
        <Image
          key={i}
          src={"/data/starsWhite.png"}
          alt="Star"
          width={24}
          height={24}
          className="inline-block"
        />
      );
    }
    return stars;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 dark:text-white p-8 space-y-8 relative">
      <h1 className="text-4xl font-bold">{dish.name}</h1>
      <button
        onClick={() => router.back()}
        className="text-xl absolute top-2 underline right-4 font-bold"
      >
        Kembali
      </button>
      <div className="w-full max-w-3xl mx-auto">
        {dish.image && (
          <Image
            src={dish.image}
            alt={dish.name}
            width={500}
            height={500}
            className="rounded-md"
          />
        )}
      </div>
      <p className="text-lg text-gray-700 dark:text-slate-200">
        {dish.description}
      </p>
      <br />
      <div className="flex justify-between flex-shrink-0 items-center">
        <strong className="text-2xl">{dish.price}</strong>
        <div className="flex items-center space-x-1">
          {renderStars(dish.star || 0)}
        </div>
      </div>
      <Link
        href={`https://wa.me/6281357379636?text=${encodeURIComponent(
          "Halo! Saya ingin membeli " +
            dish.name +
            " dengan harga " +
            dish.price
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bottom-0 relative flex w-full items-center justify-between bg-slate-600 p-3 rounded text-white"
      >
        Pesan Sekarang
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          className="w-5 h-5"
          fill="currentColor"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.84.739 5.579 2.144 8.011L0 32l8.076-2.113A15.938 15.938 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0Zm0 29.273c-2.624 0-5.194-.693-7.428-2.001L6.82 28.18l1.008-3.658A13.198 13.198 0 0 1 2.727 16C2.727 8.926 8.926 2.727 16 2.727c7.074 0 13.273 6.2 13.273 13.273 0 7.074-6.2 13.273-13.273 13.273Z" />
          <path d="M23.708 18.901c-.346-.173-2.052-1.014-2.371-1.132-.319-.119-.553-.173-.787.173-.234.346-.902 1.132-1.106 1.366-.204.234-.404.26-.751.086-.346-.173-1.462-.539-2.784-1.719-1.029-.917-1.725-2.054-1.927-2.4-.202-.347-.021-.535.152-.707.155-.154.347-.404.519-.607.173-.202.23-.346.346-.579.119-.234.06-.433-.03-.606-.086-.173-.787-1.9-1.08-2.609-.284-.686-.571-.593-.787-.606h-.674c-.202 0-.52.073-.793.346-.273.272-1.04 1.016-1.04 2.473 0 1.457 1.064 2.868 1.213 3.065.173.231 2.092 3.278 5.07 4.594.709.306 1.263.49 1.693.627.712.227 1.36.195 1.874.119.573-.085 2.052-.837 2.34-1.646.288-.808.288-1.503.202-1.646-.086-.144-.316-.23-.662-.404Z" />
        </svg>
      </Link>
    </div>
  );
}
