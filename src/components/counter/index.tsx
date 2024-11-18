import React from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';

interface CounterProps {
 onIncrement: () => void;
 onDecrement: () => void;
 value: number;
}

const Counter: React.FC<CounterProps> = ({
 onDecrement,
 onIncrement,
 value,
}) => {
 return (
  <div className="flex items-center justify-center">
   <button
    onClick={onDecrement}
    className=" flex items-center justify-center bg-red-500 text-white w-6 h-6 rounded-md hover:bg-red-600 transition-colors duration-200"
   >
    <MinusOutlined />
   </button>

   <span className="mx-2 text-md text-gray-800">{value}</span>

   <button
    onClick={onIncrement}
    className=" flex items-center justify-center bg-green-500 text-white w-6 h-6 rounded-md hover:bg-green-600 transition-colors duration-200"
   >
    <PlusOutlined />
   </button>
  </div>
 );
};

export default Counter;
