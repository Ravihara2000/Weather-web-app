import React from 'react'
import Login from './Login'
import Register from './Register';
import Weather from './Weather';
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom';

function App(){
  return (
  
    <Router>
        <div className='App'>
           <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route exact path='/register' element={<Register/>}></Route>
          <Route exact path='/weather' element={<Weather/>}></Route>
          <Route exact path='/login' element={<Login/>}></Route>
          </Routes>
        </div>
    </Router>
   
  )
}

export default App;
