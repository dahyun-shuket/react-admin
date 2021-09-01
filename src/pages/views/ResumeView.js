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
        if (window.confirm("게시중인 이력서를 게시 중단하시겠습니까? 중단된 이력서는 다시 게시할 수 없습니다. 이 작업은 되돌릴 수 없습니다.")) {
            if (window.confirm("다시 한 번 확인합니다. 정말로 게시 중단하겠습니까?")) {
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
                        else alert("이력서를 게시 중단하는 도중에 오류가 발생했습니다.");
                    })
            }
        }
        return false;
    };
    const ButtonCertificate = async () => {
        await axios
            .post(`http://localhost:3000/api/resume/certificate`,{
                seq:id
            })
            .then(() => {
                window.location.reload()
            });
    };
    const ButtonCertificateCancel = async () => {
        await axios
            .post(`http://localhost:3000/api/resume/clearCertificate`,{
                seq:id
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
                            <CardTitle tag="h4">이력서 상세</CardTitle>
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
                                    {/* <NavLink>
                                        </NavLink> */}
                                        이력서 내용
                                </NavLink>
                            </NavItem>
                            <NavItem xs={12}>
                                <NavLink
                                    className={{ active: activeTab === "2" }}
                                    onClick={() => {
                                        toggleTab("2");
                                    }}
                                >
                                    {/* <NavLink>
                                        </NavLink> */}
                                        경력 사항
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
                                                                : '아직 검증되지 않았습니다'}</p>
                                                                {
                                                                    (resumeDetailData.CERTIFICATE === 'Y') 
                                                                    ? <p><Button type="button" className="btn btn-warning waves-effect w-md waves-light m-t-5" onClick={ButtonCertificateCancel}>검증 취소</Button></p> 
                                                                    : <p><Button type="button" className="btn btn-warning waves-effect w-md waves-light m-t-5" onClick={ButtonCertificate}>검증 완료</Button></p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <h5>학력사항</h5>
                                                        <p>학력 : {resumeDetailData.EDUCATION}</p>
                                                        <p>최종 학교 : {resumeDetailData.EDUCATIONSCHOOL}</p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h5>보유 기술 및 능력</h5>
                                                        <p>보유 기술 : {resumeDetailData.TECHNICAL}</p>
                                                        <p>자격증 : {resumeDetailData.LICENSE}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={6}>
                                                        <h5>취업 우대사항</h5>
                                                        <p>보훈 대상 : {resumeDetailData.ISWELFARE}</p>
                                                        <p>병역 : {resumeDetailData.ISMILITALY}</p>
                                                    </Col>
                                                    <Col md={6}>
                                                        <h5>희망 근무 조건</h5>
                                                        <p>근무형태 : {resumeDetailData.WORKINGTYPE_NAMES}</p>
                                                        <p>연봉 : {resumeDetailData.SALARY}</p>
                                                        <p>지역 : {resumeDetailData.WORKREGION_NAME}</p>
                                                        <p>직종 : {resumeDetailData.JOBKIND_NAME}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                    <h5 className="text-primary m-b-10">
                                                        <a href={'http://localhost:3000/api/files/get/' + resumeDetailData.CAREERCERTIFICATE} target="_blank">  
                                                        경력 인증문서 다운받기</a>
                                                    </h5>
                                                    </Col>
                                                    <Col md={12}>
                                                        <h5>
                                                            자기소개
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
                                                            <th className="text-center">근무처</th>
                                                            <th className="text-center">근무기간</th>
                                                            <th className="text-center">직급/직책</th>
                                                            <th className="text-center">직종</th>
                                                            <th className="text-right">근무지역</th>
                                                            <th className="text-right">담당업무</th>
                                                            <th className="text-right">최종연봉</th>
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
                                    <strong>이름 :</strong> <span className="m-l-15">{resumeDetailData.NAME}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>나이 :</strong>{" "}
                                    <span className="m-l-15">
                                        {resumeDetailData.BIRTHYEAR} ({resumeDetailData.BIRTHYEAR ? new Date().getFullYear() - resumeDetailData.BIRTHYEAR : ""})
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>성별 :</strong>
                                    <span className="m-l-15">{resumeDetailData.GENDER}</span>
                                </p>
                            </div>
                            <br></br>
                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>우편번호 :</strong>
                                    <span className="m-l-15">{resumeDetailData.POSTCODE}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>주소 :</strong>{" "}
                                    <span className="m-l-15">
                                        {resumeDetailData.ADDRESS} {resumeDetailData.ADDRESSEXTRA}
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>연락처 :</strong> <span className="m-l-15">{resumeDetailData.CONTACT}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>이메일 :</strong> <span className="m-l-15">{resumeDetailData.EMAIL}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>등록일 :</strong> <span className="m-l-15">{moment(resumeDetailData.CREATED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>수정일 :</strong> <span className="m-l-15">{moment(resumeDetailData.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>상태 :</strong> <span className="m-l-15">{resumeDetailData.ACTIVE === "Y" ? "게시 중" : "게시 중단"}</span>
                                </p>
                            </div>
                        </Row>
                        <Row>
                            <Col mc={12}>
                                <Button className="btn btn-danger" onClick={StopButton}>
                                    개시 중단
                                </Button>
                            </Col>

                            <Col mc={12}>
                                <Button className="btn btn-default" onClick={ListButton}>
                                    목록
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
