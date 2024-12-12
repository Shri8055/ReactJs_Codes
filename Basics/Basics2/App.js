import './App.css';
import {Header1,Header2,Header3} from './component/header';
function Mycomponent(props) {
  return <div>{props.name}</div>;
}
function App() {
  return <div> Hello
    <Header1 />
    <Header2 />
    <Header3 />
    And Bikes.
  </div>;
}
export default App;