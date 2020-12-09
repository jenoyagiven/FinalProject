import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Card, CardImg, CardText, CardBody, Button, 
    CardTitle, CardSubtitle, Row, Col
  } from 'reactstrap';


class subscription extends Component {
    render(){
        return(
            <div className="d-flex justify-content-around col-sm-10 mx-auto mt-5" >
                      <Col sm="6">
                    <Card body>
                        <CardTitle>Free</CardTitle>
                        <CardSubtitle>RP0/year</CardSubtitle>
                        <CardText>
                            <ul>
                                <li>todolist</li>
                            </ul>
                        </CardText>
                        <Button>Subscribe</Button>
                    </Card>
                    </Col>

                    <Col sm="6">
                    <Card body>
                        <CardTitle>Free</CardTitle>
                        <CardSubtitle>RP0/year</CardSubtitle>
                        <CardText>
                            <ul>
                                <li>todolist</li>
                            </ul>
                        </CardText>
                        <Button>Subscribe</Button>
                    </Card>
                    </Col>
            </div>
        )
    }
}

export default connect(null)(subscription)