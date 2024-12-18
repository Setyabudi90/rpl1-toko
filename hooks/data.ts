import { Data } from "@/types/types";

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
