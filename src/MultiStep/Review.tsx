import React from "react";
import { useContext } from "react";
import MultiStepContext from "./MultiStepContext";
import { Button } from "antd";
const Review = () => {
  //@ts-ignore
  const { selectedDishes, prevStep } = useContext(MultiStepContext);
  return (
    <div className=" flex items-center w-full flex-col justify-center">
      <div className="h-[90%]">
        <h1>Review</h1>
        <p className="text-left mt-2">Meal: {selectedDishes?.meal}</p>
        <p className="text-left mt-2">People: {selectedDishes?.people}</p>
        <p className="text-left mt-2">
          Restaurent: {selectedDishes?.restaurent}
        </p>
        <p className="text-left  flex gap-2 flex-row mt-2">
          Dishes:{" "}
          <ul className="border border-gray-600 p-1 shadow-md">
            {selectedDishes?.selectedDish.map((dish: any) => (
              <li className="list-none" key={dish.name}>
                {dish.name} - {dish.quantity}
              </li>
            ))}
          </ul>
        </p>
      </div>
      <div className=" flex h-[10%] w-full mt-5 flex-row justify-between items-center">
        <Button onClick={() => prevStep()}>Previous</Button>

        <Button onClick={() => console.log(selectedDishes)}>submit</Button>
      </div>{" "}
    </div>
  );
};

export default Review;
