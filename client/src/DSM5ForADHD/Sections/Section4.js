import React,{useState} from 'react'

import { FormGroup,Input,Label,Col,Button} from 'reactstrap'
const Section4 = () => {
    return (
        <div>

            <div style={{textAlign:"center"}}><Button color="info" >Section 4:  SENSORY INTEGRATION
 </Button></div>
            <FormGroup row p-0 style={{marginBottom:"0px !important"}}>
                <Label for="exampleSex" sm-2>
                   Q 15.  Doesn’t like to be hugged or or touched/apparent insensitivity to pain
                </Label>
                <Col sm-10>
                    <Input
                        id="Q 15"
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
                Q 16. Intolerance/addiction to certain sounds,tastes,odours,visuals
                </Label>
                <Col sm-10>
                    <Input
                        id="Q16"
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
                Q 17. No understanding or fear of real dangers /Excessive fear for heights,change in position
                </Label>
                <Col sm-10>
                    <Input
                        id="Q17"
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
               Q 18. Enjoys spinning or rotating objects
                </Label>
                <Col sm-10>
                    <Input
                        id="Q18"
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
                Q 19. Inappropriate laughing and giggling/crying spells with extreme distress for no apparent reason

                </Label>
                <Col sm-10>
                    <Input
                        id="Q19"
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
            <FormGroup row>
                <Label for="exampleSex" sm-2>
                Q 20. Difficulty in fine motor skills/a tendency to fall/clumsiness/resistance to motor movement activities 

                </Label>
                <Col sm-10>
                    <Input
                        id="Q20"
                        name="Q6"
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

export default Section4
