import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Nav, TabContent, TabPane, NavItem, NavLink, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import CareerLists from "components/CareerList";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";

const ResumeView = () => {
    let { id } = useParams();
    const [resumeDetailData, setResumeDetailData] = useState([]);
    const [careerListData, setCareerListData] = useState([]);
    const [loading, setLoading] = useState(false);
    // Tab
    const [activeTab, setActiveTab] = useState("1");
    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    const ResumeDetail = async () => {
        setLoading(true);
        await axios
            .post("http://localhost:3000/api/resume/get", {
                seq: id,
                key: secrectKey.secretKey
            }, {headers: 
                {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': getCookie('xToken')
                }
            })
            .then((response) => {
                setResumeDetailData(response.data.data);
                // console.log([response.data.data]);
                setLoading(false);
            });
    };

    const CareerList = async () => {
        setLoading(true);
        await axios
            .post("http://localhost:3000/api/resume/listCareer", {
                resumeSeq: id,
                key: secrectKey.secretKey
            }, {headers: 
                {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': getCookie('xToken')
                }
            })
            .then((response) => {
                setCareerListData(response.data.data);
                // console.log([response.data.data]);
                setLoading(false);
            });
    };
    const ListButton = async () => {
        window.location.replace("/admin/resume");
    };
    const StopButton = async () => {
        if (window.confirm("???????????? ???????????? ?????? ????????????????????????? ????????? ???????????? ?????? ????????? ??? ????????????. ??? ????????? ????????? ??? ????????????.")) {
            if (window.confirm("?????? ??? ??? ???????????????. ????????? ?????? ??????????????????????")) {
                axios
                    .post(`http://localhost:3000/api/resume/remove`, {
                        seq: id,
                        key: secrectKey.secretKey
                    }, {headers: 
                        {
                            'contentType': 'application/json',
                            'User-Agent': 'DEVICE-AGENT',
                            'userAgent': 'DEVICE-AGENT',
                            'Authorization': getCookie('xToken')
                        }
                    })
                    .then(function (json) {
                        if (json.data.result == "success") 
                        window.location.replace("/admin/resume");
                        else alert("???????????? ?????? ???????????? ????????? ????????? ??????????????????.");
                    })
            }
        }
        return false;
    };
    const ButtonCertificate = async () => {
        await axios
            .post(`http://localhost:3000/api/resume/certificate`,{
                seq:id,
                key: secrectKey.secretKey
                    }, {headers: 
                        {
                            'contentType': 'application/json',
                            'User-Agent': 'DEVICE-AGENT',
                            'userAgent': 'DEVICE-AGENT',
                            'Authorization': getCookie('xToken')
                        }
                    })
            .then(() => {
                window.location.reload()
            });
    };
    const ButtonCertificateCancel = async () => {
        await axios
            .post(`http://localhost:3000/api/resume/clearCertificate`,{
                seq:id,
                key: secrectKey.secretKey
                    }, {headers: 
                        {
                            'contentType': 'application/json',
                            'User-Agent': 'DEVICE-AGENT',
                            'userAgent': 'DEVICE-AGENT',
                            'Authorization': getCookie('xToken')
                        }
                    })
            .then(() => {
                window.location.reload()
            });
    };
    
    useEffect(() => {
        ResumeDetail();
        CareerList();
    }, [resumeDetailData.CERTIFICATE]);
    
    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">????????? ??????</CardTitle>
                        </CardHeader>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={9}>
                    <Card>
                        <Nav xs={12} tabs style={{ cursor: "pointer" }}>
                            <NavItem xs={12}>
                                <NavLink
                                    className={{ active: activeTab === "1" }}
                                    onClick={() => {
                                        toggleTab("1");
                                    }}
                                >
                                ????????? ??????
                                </NavLink>
                            </NavItem>
                            <NavItem xs={12}>
                                <NavLink
                                    className={{ active: activeTab === "2" }}
                                    onClick={() => {
                                        toggleTab("2");
                                    }}
                                >
                                ?????? ??????
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col xs={12}>
                                        <Card>
                                            <CardBody>
                                                <Row>
                                                    <Col md={6}>
                                                        <p>{resumeDetailData.SUBJECT}</p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <div className="widget-bg-color-icon card-box">
                                                            <div className="text-center">
                                                                <h3 className="text-dark"><b> {(resumeDetailData.CERTIFICATE === 'Y')? 'CERTIFICATED' : 'WAIT'}</b></h3>                                                                
                                                                <p className="text-muted">{(resumeDetailData.CERTIFICATE === 'Y') 
                                                                ? moment(resumeDetailData.CERTIFICATEDATE).format('YYYY-MM-DD') 
                                                                : '?????? ???????????? ???????????????'}</p>
                                                                {
                                                                    (resumeDetailData.CERTIFICATE === 'Y') 
                                                                    ? <p><Button type="button" className="btn btn-warning waves-effect w-md waves-light m-t-5" onClick={ButtonCertificateCancel}>?????? ??????</Button></p> 
                                                                    : <p><Button type="button" className="btn btn-warning waves-effect w-md waves-light m-t-5" onClick={ButtonCertificate}>?????? ??????</Button></p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <h5>????????????</h5>
                                                        <p>?????? : {resumeDetailData.EDUCATION}</p>
                                                        <p>?????? ?????? : {resumeDetailData.EDUCATIONSCHOOL}</p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h5>?????? ?????? ??? ??????</h5>
                                                        <p>?????? ?????? : {resumeDetailData.TECHNICAL}</p>
                                                        <p>????????? : {resumeDetailData.LICENSE}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <h5>?????? ????????????</h5>
                                                        <p>?????? ?????? : {resumeDetailData.ISWELFARE}</p>
                                                        <p>?????? : {resumeDetailData.ISMILITALY}</p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h5>?????? ?????? ??????</h5>
                                                        <p>???????????? : {resumeDetailData.WORKINGTYPE_NAMES}</p>
                                                        <p>?????? : {resumeDetailData.SALARY}</p>
                                                        <p>?????? : {resumeDetailData.WORKREGION_NAME}</p>
                                                        <p>?????? : {resumeDetailData.JOBKIND_NAME}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                    <h5 className="text-primary m-b-10">
                                                        <a href={'http://localhost:3000/api/files/get/' + resumeDetailData.CAREERCERTIFICATE} target="_blank">  
                                                        ?????? ???????????? ????????????</a>
                                                    </h5>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h5>
                                                            ????????????
                                                        </h5>
                                                        <p>{resumeDetailData.INTRODUCE}</p>
                                                    </Col>
                                                </Row>
                                            </CardBody>
                                            <CardFooter></CardFooter>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col xs={12}>
                                        <Card>
                                            <CardBody>
                                                <Table>
                                                    <tbody>
                                                        <tr className="text-primary">
                                                            <th className="text-center">?????????</th>
                                                            <th className="text-center">????????????</th>
                                                            <th className="text-center">??????/??????</th>
                                                            <th className="text-center">??????</th>
                                                            <th className="text-right">????????????</th>
                                                            <th className="text-right">????????????</th>
                                                            <th className="text-right">????????????</th>
                                                        </tr>
                                                        <CareerLists careerListData={careerListData}></CareerLists>
                                                    </tbody>
                                                </Table>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Card>
                </Col>
                <Col md={3}>
                    <Card>
                        <Row>
                            <Col className="text-center">
                                {resumeDetailData.PHOTO ? <img src={"http://localhost:3000/api/files/get/" + resumeDetailData.PHOTO} alt="profile-image" /> : <h3>{resumeDetailData.NAME}</h3>}
                            </Col>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong> <span className="m-l-15">{resumeDetailData.NAME}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong>{" "}
                                    <span className="m-l-15">
                                        {resumeDetailData.BIRTHYEAR} ({resumeDetailData.BIRTHYEAR ? new Date().getFullYear() - resumeDetailData.BIRTHYEAR : ""})
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong>
                                    <span className="m-l-15">{resumeDetailData.GENDER}</span>
                                </p>
                            </div>
                            <br></br>
                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>???????????? :</strong>
                                    <span className="m-l-15">{resumeDetailData.POSTCODE}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong>{" "}
                                    <span className="m-l-15">
                                        {resumeDetailData.ADDRESS} {resumeDetailData.ADDRESSEXTRA}
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{resumeDetailData.CONTACT}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{resumeDetailData.EMAIL}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{moment(resumeDetailData.CREATED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{moment(resumeDetailData.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong> <span className="m-l-15">{resumeDetailData.ACTIVE === "Y" ? "?????? ???" : "?????? ??????"}</span>
                                </p>
                            </div>
                        </Row>
                        <Row>
                            <Col mc={12}>
                                <Button className="btn btn-danger" onClick={StopButton}>
                                    ?????? ??????
                                </Button>
                            </Col>

                            <Col mc={12}>
                                <Button className="btn btn-default" onClick={ListButton}>
                                    ??????
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ResumeView;
