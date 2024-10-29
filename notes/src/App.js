import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom"
import NavBar from './Component/NavBar';
import Home from './Component/Home';
import About from './Component/About';
import NoteState from './context/notes/NoteState';
import Alert from './Component/Alert';
function App() {
  return (
    <>
    <NoteState>
     <Router>
      <NavBar/>
      <Alert message="this is amazing "/>
        <div className='container'>
      <Routes>
          <Route exact path="/" element={<Home/>}/>   
          <Route exact path="/about" element={<About/>}/>
          </Routes>
          </div>
        </Router>
        </NoteState>
    </>
  );
}

export default App;
