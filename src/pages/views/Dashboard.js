/*!

=========================================================
* Now UI Dashboard React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState } from "react";

// reactstrap components
import { Card, CardHeader, CardFooter, CardTitle, Row, Col, CardBody } from "reactstrap";
import axios from "axios";
// core components
import PanelHeader from "../../templates/PanelHeader";
import secrectKey from "../../Utils/secretkey";
import { getCookie } from "Utils/Cookie";
function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [dashboardData, setDashboardData] = useState([]);

    const DashBoardList = async () => {
        // setLoading(false);
        setLoading(true);
        await axios
            .post(
                "http://localhost:3000/api/analytics/getDashboard",
                {
                    key: secrectKey.secretKey,
                },
                {
                    headers: {
                        contentType: "application/json",
                        Authorization: getCookie("xToken"),
                    },
                }
            )
            .then((response) => {
                // alert(JSON.stringify(response.data.data));
                setDashboardData(response.data.data[0]);
                console.log(dashboardData);
                setLoading(false);
            });
    };
    useEffect(() => {
        DashBoardList();
        // console.log(dashboardData);
    }, []);
    if (loading) {
        return <h2>Loading...</h2>;
    }
    if(!dashboardData){
        return <h2>Not DashBoardData...</h2>;
    }
    return (
        <>
            <PanelHeader />
            
            <div className="content">
                <Row>
                    <Col xs={12} md={6}>
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total Mart</h5>
                                {/* <CardTitle tag="h4">{dashboardData[0].MartCount}</CardTitle> */}
                                {/* <CardTitle tag="h4">{JSON.stringify(dashboardData)}</CardTitle> */}
                                {/* <CardTitle tag="h4">{dashboardData ? dashboardData[0].MartCount : ''}</CardTitle> */}
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h4">{dashboardData.MartCount}</CardTitle>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Col>

                    <Col xs={12} md={6}>
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total Recruits</h5>
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h4">{dashboardData.RecruitCount}</CardTitle>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Col>
                    <Col xs={12} md={6}>
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total Resume</h5>
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h4">{dashboardData.ResumeCount}</CardTitle>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Col>

                    <Col xs={12} md={6}>
                        <Card className="card-chart">
                            <CardHeader>
                                <h5 className="card-category">Total Certificate</h5>
                            </CardHeader>
                            <CardBody>
                                <CardTitle tag="h4">{dashboardData.ResumeCertCount}</CardTitle>
                            </CardBody>
                            <CardFooter></CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Dashboard;
