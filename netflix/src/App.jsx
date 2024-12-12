import React from 'react';
import './App.scss';
import Home from './Component/Home/Home';
import Header from './Component/Header/Header';
import Section from './Component/Section';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
function App(){
  return(
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/section/:id" element={<Section/>}/>
      </Routes>
    </Router>
  )
}
export default App;