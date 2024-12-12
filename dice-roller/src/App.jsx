import {React,useState} from 'react';
import './App.css';
function App(){
  const [value,setValue]=useState('');
  const [values,setValues]=useState([]);
  const [images,setImages]=useState([]);
  const submit=(e)=>{
    e.preventDefault();
    if(!value){
      alert('Enter players');
    }
    else if(value>10){
      alert('The number of players should not exceed 10.');
    }
    else{
      const newValues=[];
      const newImages=[];
      for(let i=0;i<value;i++){
        let randomNums=Math.floor(Math.random()*6+1);
        newValues.push(randomNums);
        newImages.push(`pngs/${randomNums}.png`);
      }
      setValues(newValues);
      setImages(newImages);
    }
  }
  const isButtonDisabled=!value||value>10;
  const buttonStyle={
    backgroundColor:isButtonDisabled?'red':'skyblue',
    transition:'.5s',
    color:'white',
    cursor:isButtonDisabled?'not-allowed':'pointer'
  };
  return(
    <div className='container'>
      <h1>Dice Roller</h1>
      <input type="number" placeholder='Enter total players' value={value} onChange={(e)=>{setValue(e.target.value)}}/>
      <button onClick={submit} style={buttonStyle} disabled={isButtonDisabled}>Roll</button>
      {
        values.length>0 && (
          <div className='inner-container'>
            <p>Dice: [ {values.join(' , ')} ]</p>
            {images.map((src,index)=>(
              <img key={index} src={src} alt={`Dice ${values[index]}`}/>
            ))}
          </div>
        )
      }
    </div>
  );
}
export default App;