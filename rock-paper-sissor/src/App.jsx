import React,{useState} from 'react';
import './App.css';
function App(){
  const [userScore,setUserScore]=useState(0);
  const [compScore,setCompScore]=useState(0);
  const [userChoice,setUserChoice]=useState('rock');
  const [compChoice,setCompChoice]=useState('rock');
  const [result,setResult]=useState('');
  const [winnerClass, setWinnerClass]=useState('');
  const action=(userChoice)=>{
    const choices=['rock','paper','scissor'];
    let compChoice=choices[Math.floor(Math.random()*3)];
    setUserChoice(userChoice);
    setCompChoice(compChoice);
    if(userChoice===compChoice){
      setResult('Tie!');
    }else {
      let userWins=false;
      switch(userChoice){
        case 'rock':
          userWins=compChoice==='scissor';
          break;
        case 'paper':
          userWins=compChoice==='rock';
          break;
        case 'scissor':
          userWins=compChoice==='paper';
          break;
        default:
          break;
      }
      if(userWins){
        setUserScore(userScore+1);
        setResult('You Win!');
        setWinnerClass('.green-text');
      } else {
        setCompScore(compScore+1);
        setResult('Computer Wins!');
        setWinnerClass('');
      }
      setTimeout(()=>setWinnerClass(''),2000);
    }
  };
  return(
    <div className='container'>
      <h1>Rock-Paper-Scissor</h1>
      <div className='btns'>
        <button className='rock' onClick={()=>action('rock')}>👊</button>
        <button className='paper' onClick={()=>action('paper')}>🖐</button>
        <button className='sissor' onClick={()=>action('scissor')}>✌</button>
      </div>
      <div className='result'>
        <p className='comCho'>Computer: {compChoice}</p>
        <p className='useCho'>User: {userChoice}</p>
        <p className='compScr'>Computer Score: {compScore}</p>
        <p className='userScr'>Your Score: {userScore}</p>
        <p className='res'>{result}</p>
      </div>
    </div>
  );
}
export default App;