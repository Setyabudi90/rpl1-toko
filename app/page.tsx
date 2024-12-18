"use client";
import { useEffect, useState } from "react";
import { Data } from "@/types/types";
import Main from "@/components/Main/index";
import Footer from "@/components/Footer";

export async function getData(): Promise<Data> {
  try {
    const response = await fetch("/data/dishes.json");

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    const data: Data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData);
      } catch (err) {
        setError("Unable to load data. Please try again later.");
        console.error(err)
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center text-3xl font-extrabold">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white dark:bg-slate-900 text-white pt-4">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:leading-none text-gray-900 md:text-5xl lg:text-6xl capitalize break-words dark:text-white">
            {data.title}
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-200 lg:text-xl sm:px-16 lg:px-48 ">
            {data.description}
          </p>
        </div>
      </section>
      <Main dishes={data.dishes} />

      <Footer />
    </>
  );
}
