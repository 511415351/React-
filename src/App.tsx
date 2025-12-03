import './App.css';
import Card from './components/Card/index';
import Card2 from './components/Card2/index';
import { useState, useEffect } from 'react';
import { useLayoutEffect, useReducer } from 'react';
import { useStorage } from './hooks/useStorage';

function App() {
  const [obj, setObj] = useState(() => {
    const date = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
    return {
      age: 18,
      date,
      name: 'App',
    };
  });
  const heandleClick = () => {
    setObj({
      ...obj,
      name: obj.name === 'App' ? 'React App' : 'App'
    })
  }
  const [data, setData] = useState<Array<{productName: string; price: number; quantity: number}>>([
    { productName: 'Apple', price: 3, quantity: 5 },
    { productName: 'Banana', price: 2, quantity: 8 },
    { productName: 'Orange', price: 4, quantity: 3 },
  ]);
  const [count, setCount] = useState(0);
  const [countStorage, setCountStorage] = useStorage('countKey', 0);
  return (
    <>
      <h1>{countStorage}</h1>
      <button onClick={() => setCountStorage(countStorage + 1)}>storage +1</button>
      <h1>productcar</h1>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
            <tr>
                <th>productName</th>
                <th>price</th>
                <th>quantity</th>
                <th>total</th>
                <th>operation</th>
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.productName}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
                    <td>
                        <button onClick={() => {
                            const newData = [...data];
                            newData[index].quantity += 1;
                            setData(newData);
                        }}>+</button>
                        <button onClick={() => {
                            const newData = [...data];
                            if (newData[index].quantity > 0) {
                                newData[index].quantity -= 1;
                                setData(newData);
                            }
                        }}>-</button>
                        <button onClick={() => {
                            const newData = [...data];
                            newData.splice(index, 1);
                            setData(newData);
                        }}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>

      </table>
      <button onClick={() => setCount(count+1)}>+1</button>
      <button onClick={() => setCount(count-1)}>-1</button>
      <div>{count}</div>
      <h1>{obj.date}</h1>
      <h1>{obj.name}</h1>
      <h1>{obj.age}</h1>
      <button onClick={heandleClick}>切换名称</button>
      <Card  title="Card 1" />
      <Card2 title="Card 2" />
      <button onClick={() => window.onShow && window.onShow()}>Show Message</button>
    </>
  )
}

export default App
