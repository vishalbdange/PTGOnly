import React from 'react'
import { useContext,useState } from 'react';
import AppContext from "../../AppContext";
import { FormGroup,Input,Label,Col,Button} from 'reactstrap'
const Section3 = ( ) => {


    return (
        <div>

            <div style={{textAlign:"center"}}><Button color="info" >Section 3 : BEHAVIOURAL CHARACTERISTICS </Button></div>
            <FormGroup row p-0 style={{marginBottom:"0px !important"}}>
                <Label for="exampleSex" sm-2>
                   Q 10.  Likes sameness in everyday routine
                </Label>
                <Col sm-10>
                    <Input
                        id="Q10"
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
                Q 11. Inappropriate attachment to objects

                </Label>
                <Col sm-10>
                    <Input
                        id="Q11"
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
                Q 12. Unsual body movements such as flapping hands or rocking or jumping

                </Label>
                <Col sm-10>
                    <Input
                        id="Q12"
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
               Q 13. Extreme restlessness,hyperactivity/overpassivity or prefers to be alone all the time 

                </Label>
                <Col sm-10>
                    <Input
                        id="Q13"
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
                Q 14. Not responsive to normal teaching methods
                </Label>
                <Col sm-10>
                    <Input
                        id="Q14"
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
        </div>
    )
}

export default Section3
