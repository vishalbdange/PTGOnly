import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './App.css';
import PrescriptionForm from './PrescriptionForm'
import PrescriptionFormEmpty from './PrescriptionFormEmpty'
import Preview from './Preview';
import PdfTemplate from './PdfTemplate';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import TestPDF from "./TestPDF.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './AutismScorePredictor/Form'
import AutismDSM from './AUTISM DSM/AutismDSM'
import NavbarComponent from "./NavbarComponent"
import Home from "./Home"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import PreviewEmpty from './PreviewEmpty';
import Form1 from './Form1/Form1'


const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});


function App() {

  const [imageURL,setImageURL] = useState(null);
 
  

  return (
    <Router>
      <Routes>
        
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/prescription" element={ <PrescriptionForm changeImgURL={(url) => setImageURL(url)}/>} />
        <Route exact path="/short-prescription" element={ <PrescriptionFormEmpty changeImgURL={(url) => setImageURL(url)}/>} />
        <Route  exact path="/prescription-view" element={<Preview  imageURL={imageURL}/>} />
        <Route  exact path="/short-prescription-view" element={<PreviewEmpty  imageURL={imageURL}/>} />
        <Route  exact path="/autism-score" element={<Form />} />
        <Route  exact path="/autism-dsm" element={<AutismDSM />} />
        <Route  exact path="/form1" element={<Form1 />} />
      </Routes>
    </Router>

  );
}

export default App;
