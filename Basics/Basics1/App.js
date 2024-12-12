import './App.css';
import Header from './component/header';
function Mycomponent(props) {
  return <div>{props.name}</div>;
}
function App() {
  return <div> Hello
    <Header />
    Guys
  </div>;
}
export default App;