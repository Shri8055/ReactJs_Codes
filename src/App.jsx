import { React,useState,useEffect } from 'react'
import './App.scss'
import axios from 'axios';
const jokesurl='https://official-joke-api.appspot.com/random_joke';
const Emojiurl='https://emoji-api.com/emojis?access_key=e0dcaa38142f9e272ad00b2fac2ece0a9c5ca864';
function App(){
  const [joke,setjoke]=useState({setup:'',punchline:''});
  const [punch,setpunch]=useState(false);
  const [count,setcount]=useState(4);
  const fetchJoke=async()=>{
  try{
    const response=await axios.get(jokesurl);
    setjoke(response.data);
    setpunch(false);
    startCountdown();
    setcount(4);
    console.log(response.data);
  }catch(error){
      console.log(`error fetching jokes`,error);
    }
  }
  const startCountdown=()=>{
    let counter=4;
    const myinterval=setInterval(()=>{
      counter--;
      setcount(counter);
      if(counter==0){
        clearInterval(myinterval);
      }
    },1000);
  };
  const showPunchline=()=>{
    setpunch(true);
  }
  useEffect(()=>{
    fetchJoke();
  },[]);
  return(
    <div className='container'>
      <h1>Jokes</h1>
      <div className='inner-container'>
        <p className='jokes'>{joke.setup || 'Loading joke..'}</p>
        <div className='btns'>
          <button className='btn1' onClick={fetchJoke}>Next Joke</button>
          <button className='btn2' onClick={showPunchline} disabled={count>0}>{count>0?`Guess in ${count}s`:`Show punchline 🥊`}</button>
        </div>
        <p className='punch'>{punch?joke.punchline:''}</p>
      </div>
    </div>
  )
}
export default App;