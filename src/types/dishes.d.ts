export type Dish = {
    id: number;
    name: string;
    availableMeals: string[];
    restaurant: string;
  };
export type GroupedData = {
    [meal: string]: {
      [restaurant: string]: Dish[];
    };
  };