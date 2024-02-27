import React, { useContext, useLayoutEffect, useState } from "react";
import { Form, InputNumber, Select, Button, message } from "antd";
import MultiStepContext from "./MultiStepContext";
import { Dish } from "../types/dishes";
import { PlusOutlined } from "@ant-design/icons";

const { Option } = Select;
type SelectedDish = {
  name: string;
  quantity: number;
};
const Dishes = () => {
  //@ts-ignore
  const { dishes, setSelectedDishes, selectedDishes, nextStep, prevStep } =
    useContext(MultiStepContext);
  const [form] = Form.useForm();
  const [restautentData, setRestautentData] = useState([] as Dish[]);
  const [selectedDish, setSelectedDish] = useState([] as SelectedDish[]);

  useLayoutEffect(() => {
    if (selectedDishes?.restaurent) {
      setRestautentData(
        dishes[selectedDishes?.meal][selectedDishes?.restaurent]
      );
    }
  }, [dishes, selectedDishes.meal, selectedDishes?.restaurent]);
  const handleAddDish = () => {
    if (selectedDish.length >= 10) {
      message.error("Maximum limit reached");
      return;
    }

    const dish = form.getFieldsValue();

    if (!dish.dishSelect || !dish.quantity) {
      message.error("Please select a dish");
      return;
    }
    if (selectedDish.find((selected) => selected.name === dish.dishSelect)) {
      message.error("Dish already added");
      return;
    }
    setSelectedDish([
      ...selectedDish,
      { name: dish?.dishSelect, quantity: dish?.quantity },
    ]);
    form.resetFields();
  };

  return (
    <div className="flex-auto relative">
      <Form
        form={form}
        layout="vertical"
        className="!w-full mx-auto"
        initialValues={{ quantity: 1 }}
        onFinish={() => {
            const totalSelectedDishes = selectedDish.reduce((total, dish) => total + dish.quantity, 0);
            if (totalSelectedDishes < selectedDishes.people) {
              message.error("The number of servings should be equal or more than the number of people");
              return
            }
          setSelectedDishes({ ...selectedDishes, selectedDish });
          nextStep();
        }}
        onReset={() => {
          setSelectedDish([]);
          prevStep();
        }}
      >
        <div className="w-fit mx-auto text-left">
          <Form.Item name="dishSelect" label="Please select a dish">
            <Select placeholder="Select a dish" className="!w-fit min-w-[150px]">
              {restautentData.map((dish: Dish) => (
                <Option key={dish.id} value={dish.name}>
                  {dish.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="Please enter number of servings"
            className="text-left"
            rules={[
              { required: true, message: "Please select a quantity" },
              {
                type: "number",
                min: 1,
                message: "Please select a quantity more than or equal 1",
              },
            ]}
          >
            <InputNumber min={1} max={10} />
          </Form.Item>
        </div>
        <Button
          type="default"
          className="rounded-full p-2 flex items-center ml-10"
          onClick={handleAddDish}
        >
          <PlusOutlined />
        </Button>
        <ul className="!w-fit mx-auto" >
          {selectedDish.map((dish: SelectedDish, index: number) => (
            <li className="!text-left" key={index}>
              {dish.name} - {dish.quantity}
            </li>
          ))}
        </ul>

        <div className="flex absolute bottom-0 w-full flex-row justify-between items-center mt-10">
          <Button htmlType="reset">Previous</Button>
          <Button htmlType="submit">Next</Button>
        </div>
      </Form>
    </div>
  );
};

export default Dishes;
