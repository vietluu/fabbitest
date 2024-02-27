import { useLayoutEffect, useState } from "react";
import { Provider } from "./MultiStepContext";
import rawData from "../data/dishes.json";
import AvailableMeals from "./AvailableMeals";
import Restaurents from "./Restaurents";
import Review from "./Review";
import { Steps } from "antd";
import Dishes from "./Dishes";
import * as Type from "../types/dishes";

const renderStep = (step: number) => {
  switch (step) {
    case 0:
      return <AvailableMeals />;
    case 1:
      return <Restaurents />;
    case 2:
      return <Dishes />;
    case 3:
      return <Review />;
    default:
      return null;
  }
};

const MutilStepOrder = () => {
  const [step, setStep] = useState(0);
  const [selectedDishes, setSelectedDishes] = useState({});
  const [order, setOrder] = useState({});
  const [dishes, setDishes] = useState<Type.GroupedData | null>(null);

  useLayoutEffect(() => {
    const groupedData: Type.GroupedData = {};

    rawData?.dishes.forEach((dish: Type.Dish) => {
      dish.availableMeals.forEach((meal) => {
        if (!groupedData[meal]) {
          groupedData[meal] = {};
        }
        if (!groupedData[meal][dish.restaurant]) {
          groupedData[meal][dish.restaurant] = [];
        }
        groupedData[meal][dish.restaurant].push(dish);
      });
    });
    setDishes(groupedData);
  }, []);
  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const contextValue = {
    step,
    nextStep,
    prevStep,
    selectedDishes,
    setStep,
    setSelectedDishes,
    dishes,
  };

  return (
    <Provider value={contextValue}>
      <div className="max-w-[700px] flex flex-col w-full mx-auto shadow-md h-auto p-4 min-h-[400px]">
        <Steps current={step} className="pb-10">
          <Steps.Step title="Step 1" />
          <Steps.Step title="Step 2" />
          <Steps.Step title="Step 3" />
          <Steps.Step title="Review" />
        </Steps>
        <main className="flex-auto flex">{renderStep(step)}</main>
      </div>
    </Provider>
  );
};

export default MutilStepOrder;
