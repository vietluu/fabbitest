import { Button, Form, Select } from "antd";
import React, { useContext, useLayoutEffect } from "react";
import MultiStepContext from "./MultiStepContext";

const Restaurents = () => {
  //@ts-ignore
  const { dishes, setSelectedDishes, selectedDishes, nextStep, prevStep } =
    useContext(MultiStepContext);
  const [restaurent, setRestaurent] = React.useState([] as string[]);
  useLayoutEffect(() => {
    if (selectedDishes.meal) {
      setRestaurent(Object.keys(dishes[selectedDishes.meal]));
    }
  }, [dishes, selectedDishes]);

  return (
    <Form
      layout="vertical"
      className="!w-full flex flex-auto relative  mx-auto"
      onFinish={(values: { [key: string]: string }) => {
        setSelectedDishes({ ...selectedDishes, ...values });
        nextStep();
      }}
      onReset={() => {
        prevStep();
      }}
    >
      <Form.Item
        name="restaurent"
        className="!w-fit mx-auto"
        label="Select a restaurent"
        rules={[{ required: true, message: "Please select a restaurent" }]}
      >
        <Select className="!w-fit" placeholder="Select a restaurent">
          {restaurent.map((restaurent) => (
            <Select.Option key={restaurent} value={restaurent}>
              {restaurent}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex absolute bottom-0 w-full flex-row justify-between items-center">
        <Button htmlType="reset">Previous</Button>
        <Button htmlType="submit">Next</Button>
      </div>
    </Form>
  );
};

export default Restaurents;
