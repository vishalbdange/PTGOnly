import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import {
  Document,
  Image,
  Note,
  Page,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";
import { PDFDownloadLink } from "@react-pdf/renderer";



const TestPDF = ({state}) => {
   
    console.log(state)
    const pdf = (
        <Document>
          <Page wrap>
            <Image />
            <View style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              {/* <Text >{date}</Text> */}
              <Text style={{color:"red",border:"2px solid grey",padding:"10px"}}  >{state.Name} Hell o</Text>
              
            
              {/* {items.map(item => (
                <Text>{item}</Text>
              ))} */}
              
            </View>
          </Page>
        </Document>
      );




    return (
      <div>
          {/* <h1> Here is {date} {Name}</h1> */}
        <PDFDownloadLink
          document={pdf}
          fileName={"Quote" + new Date().getTime() + ".pdf"}
        >
          {({ blob, url, loading, error }) =>
            loading ? "Loading . . ." : "Download"
          }
        </PDFDownloadLink>
      </div>
    );

    
};

export default TestPDF;
