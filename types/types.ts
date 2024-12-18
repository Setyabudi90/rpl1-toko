export interface Dish {
  id?: string;
  name: string;
  description: string;
  image: string;
  price: string;
  star: number;
}

export interface Data {
  title: string;
  description: string;
  dishes: Dish[];
  closed_text: string;
}
