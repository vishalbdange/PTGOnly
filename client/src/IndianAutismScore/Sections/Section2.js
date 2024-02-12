import React,{useState} from 'react'

import { FormGroup,Input,Label,Col,Button} from 'reactstrap'
const Section2 = ({scoreBoard,gotoAutismScorer}) => {
  

    return (
        <div>
            
            <div style={{textAlign:"center"}}><Button color="info" >Section 2 : COMMUNICATION </Button></div>
            <FormGroup row p-0 style={{marginBottom:"0px !important"}}>
                <Label for="exampleInp" sm-2>
                   Q6.  Difficulty in comprehension/communication
                </Label>
                <Col sm-10>
                    <Input
                        id="Q6"
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
                <Label for="exampleInp" sm-2>
                Q7. May/may not indicate needs by gestures or leading adults by the hand

                </Label>
                <Col sm-10>
                    <Input
                        id="Q7"
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
                <Label for="exampleInp" sm-2>
                Q8. Echolalia/using nonsensical words and muttering to self
                </Label>
                <Col sm-10>
                    <Input
                        id="Q8"
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
                <Label for="exampleInp" sm-2>
               Q9. Lack of Pretend play 

                </Label>
                <Col sm-10>
                    <Input
                        id="Q9"
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

export default Section2

