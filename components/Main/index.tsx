import { Dish } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

export default function Main({ dishes }: { dishes: Dish[] }) {
  return (
    <main className="p-8 bg-[#eee] dark:bg-slate-900 text-white" id="content">
      <h1 className="text-3xl font-bold mb-4 p-3 text-center">Menu Makanan</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 shadow-lg">
        {dishes.map((dish) => (
          <div
            className="bg-white dark:bg-transparent dark:backdrop-blur-lg dark:text-white border shadow-sm dark:shadow-white border-gray-200 rounded-lg"
            key={dish.id}
          >
            <Link href={`/dishes/${dish.id}`}>
              <Image
                className="rounded-t-lg w-full h-48 object-cover"
                src={dish.image}
                alt={`Image of ${dish.name}`}
                width={200}
                height={200}
              />
            </Link>
            <div className="p-5">
              <Link href={`/dishes/${dish.id}`}>
                <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                  {dish.name}
                </h5>
              </Link>
              <p className="mb-3 font-normal">
                {dish.description.slice(0, 100)}...
              </p>
              <Link
                href={`/dishes/${dish.id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Selengkapnya
                <svg
                  className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
