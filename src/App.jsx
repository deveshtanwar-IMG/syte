import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import AddMaterial from './screens/addMaterial/AddMaterial';
import Inventory from './screens/Inventory/Inventory';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<AddMaterial />}/>
        <Route exact path='/inventory' element={<Inventory />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
