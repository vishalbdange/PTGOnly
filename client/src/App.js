import React,{ createRef, useState ,useEffect,useRef} from 'react'
import './App.css';
import PrescriptionForm from './PrescriptionForm'
import Prescriptions from './All_Prescriptions/prescriptions'
import Prescription from './All_Prescriptions/Prescription'
import PrescriptionFormEmpty from './PrescriptionFormEmpty'
import Preview from './Preview';
import PdfTemplate from './PdfTemplate';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import TestPDF from "./TestPDF.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './AutismScorePredictor/Form'
import IndianAutismForm from './IndianAutismScore/Form.js'
import DSM5ForADHD from './DSM5ForADHD/Form.js'
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
import Form2 from './Form2/Form2'
import Form1 from './Form1/Form1'
import CARS from './CARS/Form'
import Form10IA from './Form_10IA/Form'





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
    <>
   
    <Router>
     
      <Routes>
        
        <Route exact path="/" element={ <Home />} />
        <Route exact path="/prescription" element={ <PrescriptionForm changeImgURL={(url) => setImageURL(url)}/>} />
        <Route exact path="/short-prescription" element={ <PrescriptionFormEmpty changeImgURL={(url) => setImageURL(url)}/>} />
        <Route  exact path="/prescription-view" element={<Preview  imageURL={imageURL}/>} />
        <Route  exact path="/short-prescription-view" element={<PreviewEmpty  imageURL={imageURL}/>} />
        <Route  exact path="/autism-score" element={<Form />} />
        <Route  exact path="/indian-autism-score" element={<IndianAutismForm />} />
        <Route  exact path="/dsm5-for-adhd" element={<DSM5ForADHD />} />
        <Route  exact path="/autism-dsm" element={<AutismDSM />} />
        <Route  exact path="/form2" element={<Form2 />} />
        <Route  exact path="/form1" element={<Form1 />} />
        <Route  exact path="/cars" element={<CARS />} />
        <Route  exact path="/form10ia" element={<Form10IA />} />
        <Route  exact path="/all" element={<Prescriptions />} />
        <Route  exact path="/all/prescriptions/:pid" element={<Prescription />} />
        {/* <Route  exact path="/all/:pid" 
                render={(props) =>
        <Prescription {...props} key={props.match.params.id} />
      }/> */}
      </Routes>
    </Router>
    </>
  );
}

export default App;
