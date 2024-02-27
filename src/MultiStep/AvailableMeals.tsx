import React,{useContext} from 'react'
import MultiStepContext  from './MultiStepContext'
import { Form, Select, Button, InputNumber } from 'antd'
const AvailableMeals = () => {
    //@ts-ignore
    const {dishes,setSelectedDishes,selectedDishes,nextStep} = useContext(MultiStepContext)
  
    return (
      <Form 
        className='!w-full relative mx-auto'
        layout="vertical"
        onFinish={(values:{[key:string]: string}) => {
          setSelectedDishes({...selectedDishes ,...values});
          nextStep();
        }}
        initialValues={{people: 1}}
      >
        <div className='!w-fit !text-left mx-auto'><Form.Item
          name="meal"
          
          label="Please select a meal"
          rules={[{ required: true, message: 'Please select a meal' }]}
        >
          <Select className='!w-auto' placeholder='Select a meal'>
            {Object.keys(dishes || {}).map((meal) => (
              <Select.Option key={meal} value={meal}>
                {meal}
              </Select.Option>
            ))}
          </Select>

        </Form.Item>
        <Form.Item name='people' label='Please Enter number of people'
          rules={[
            {
              required: true,
              message: 'Please input number of people!',
            },
            {
              type: 'number',
              min: 1,
              max: 10,
              message: 'The input is not valid number!',
            }
          ]}
        >
          <InputNumber min={1} max={10} />
        </Form.Item></div>
            <Button className=' absolute bottom-0 right-3' htmlType="submit">Next</Button>
      </Form>
    );
}

export default AvailableMeals