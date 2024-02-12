import React, { useState } from 'react'
import { useContext } from 'react';
import AppContext from "../../AppContext";
import { FormGroup,Input,Label,Col,Button} from 'reactstrap'

const Section1 = () => {
   
   
    return (
        <div>

            <div style={{textAlign:"center"}}><Button color="info" >Section 1 :  SOCIAL INTERACTION  </Button></div>
            <FormGroup row p-0 style={{marginBottom:"0px !important"}}>
                <Label for="exampleSex" sm-2>
                   Q1.  Inability to establish and/or maintain eye contact
                </Label>
                <Col sm-10>
                    <Input
                        id="Q1"
                        name="Q1"
                        type="select"
                        className="inp"
                        
                    >
                        <option>
                           Never
                        </option>
                        <option>
                           Sometimes
                        </option>
                        <option>
                            Often
                        </option>
                        <option>
                            Always
                        </option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSex" sm-2>
                Q2. Child does not respond when called,sometimes appears to be deaf
                </Label>
                <Col sm-10>
                    <Input
                        id="Q2"
                        name="Q2"
                        type="select"
                        className="inp"
                        
                    >
                        <option>
                           Never
                        </option>
                        <option>
                           Sometimes
                        </option>
                        <option>
                            Often
                        </option>
                        <option>
                            Always
                        </option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSex" sm-2>
                Q3. Difficulty in mixing and playing with other children of same age
                </Label>
                <Col sm-10>
                    <Input
                        id="Q3"
                        name="Q3"
                        type="select"
                        className="inp"
                        
                    >
                        <option>
                           Never
                        </option>
                        <option>
                           Sometimes
                        </option>
                        <option>
                            Often
                        </option>
                        <option>
                            Always
                        </option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSex" sm-2>
               Q4. Lack of appropriate emotional response

                </Label>
                <Col sm-10>
                    <Input
                        id="Q4"
                        name="Q4"
                        type="select"
                        className="inp"
                        
                    >
                        <option>
                           Never
                        </option>
                        <option>
                           Sometimes
                        </option>
                        <option>
                            Often
                        </option>
                        <option>
                            Always
                        </option>
                    </Input>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="exampleSex" sm-2>
                Q5. Can do certain tasks well,but not the tasks involving social undestanding
                </Label>
                <Col sm-10>
                    <Input
                        id="Q5"
                        name="Q5"
                        type="select"
                        className="inp"
                        
                    >
                        <option>
                           Never
                        </option>
                        <option>
                           Sometimes
                        </option>
                        <option>
                            Often
                        </option>
                        <option>
                            Always
                        </option>
                    </Input>
                </Col>
            </FormGroup>
          
        </div>
    )
}

export default Section1
