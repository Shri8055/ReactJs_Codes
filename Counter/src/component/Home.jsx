import {React,useState} from "react";
import "./Header.css";
function Home(){
    const [inputValue=0,setInputValue]=useState();

    function increment(){
        setInputValue(inputValue+1);
    }
    function decrement(){
        setInputValue(inputValue-1);
    }
    return(
        <div>
            <input type="number" placeholder="Enter something" value={inputValue}/>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
export default Home;