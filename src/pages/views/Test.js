import React from "react";

import { Card, CardHeader, CardBody, Row, Col, CardFooter } from "reactstrap";

import PanelHeader from "../../templates/PanelHeader";

const Test = () => {
    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Row>
                    <Col md="6">
                        <Card>
                        <CardHeader>
                            <h5 className="title">Left Test</h5>
                        </CardHeader>
                        <CardBody>
                            <h3>Left Body</h3>
                        </CardBody>
                        <CardFooter>
                            Footer
                        </CardFooter>
                        </Card>
                    </Col>
                    <Col md="6">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Right Test</h5>
                            </CardHeader>
                            <CardBody>
                                <h3>Right Body</h3>
                            </CardBody>
                            <CardFooter>
                                Footer
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default Test;
