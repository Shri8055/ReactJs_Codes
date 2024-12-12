import {React,useState} from 'react';
import './Header.css';
function Header(){
    const reset=0;
    const [value=0,setValue]=useState(0);
    function increment(){
        setValue(value+1);
    }
    function Valreset(){
        setValue(reset);
    }
    function decrement(){
        setValue(value-1);
    }
    return(
        <div className="container">
            <h1>Counter App</h1>
            <input type="number" readOnly value={value}/>
            <div className="btn">
                <button onClick={increment}>+</button>
                <button onClick={Valreset}>↺</button>
                <button onClick={decrement}>-</button>
            </div>
        </div>
    )
}
export default Header;