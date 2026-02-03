import './App.css';
import { useStorage } from './hooks/useStorage';


function App() {
  const [countStorage, setCountStorage] = useStorage('countKey', 0);
  return (
    <>
      <h1>{countStorage}</h1>
      <button onClick={() => setCountStorage(countStorage + 1)}>storage +1</button>
      
      
      <button onClick={() => window.onShow && window.onShow()}>Show Message</button>
    </>
  )
}

export default App
