import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './App.css';
import PrescriptionForm from './PrescriptionForm'
import Preview from './Preview';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

  const [imageURL,setImageURL] = useState(null);
 
  return (
    <>
    <Router>
     
      <Routes>
        
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/prescription" element={ <PrescriptionForm changeImgURL={(url) => setImageURL(url)}/>} />
        <Route  exact path="/prescription-view" element={<Preview  imageURL={imageURL}/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
