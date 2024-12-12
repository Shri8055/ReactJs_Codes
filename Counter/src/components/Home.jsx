import {React,useState} from "react";
function Home(){
    const reset=0
    const [value=0,updatedVal]=useState();
    function Increment(){
        updatedVal(value+1);
    }
    function Decrement(){
        updatedVal(value-1);
    }
    function Reload(){
        updatedVal(reset);
    }
    return(
        <div className="container">
            <input type="number" readOnly value={value}/>
            <div className="btn">
                <button onClick={Increment}>+</button>
                <button onClick={Reload}>↺</button>
                <button onClick={Decrement}>-</button>
            </div>
        </div>
    )
}
export default Home;