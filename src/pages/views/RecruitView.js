import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Nav, TabContent, TabPane, NavItem, NavLink, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";

const RecruitView = () => {
    let { id } = useParams();
    const [recruitDetailData, setRecruitDetailData] = useState([]);
    const [martInfo, setMartInfo] = useState([]);
    const [listForRecruits, setListForRecruits] = useState([]);
    
    const [loading, setLoading] = useState(false);
    // Tab
    const [activeTab, setActiveTab] = useState("1");
    const toggleTab = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    // console.log(secrectKey.secretKey)
    const RecruitDetail = async () => {
        setLoading(true);
        await axios
            .post("http://localhost:3000/api/recruit/get", {
                seq: id,
            })
            .then((response) => {
                setRecruitDetailData(response.data.data);
                axios
                    .post("http://localhost:3000/api/mart/get", {
                        seq: response.data.data.MART_SEQ
                    })  
                    .then((response) => {
                        setMartInfo(response.data.data);
                    });
                setLoading(false);
            });
    };

    const listForRecruit = async () => {
        setLoading(true);
        await axios.post("http://localhost:3000/api/resume/listForRecruit",{
            recruitSeq: id
        })
            .then((response) => {
            // alert(JSON.stringify(response.data.data))
                setListForRecruits(response.data.data.list)
                setLoading(false);
        })
            .catch(() => {
                setListForRecruits([])
                setLoading(false);
        })
    };

    const ListButton = async () => {
        window.location.replace("/admin/recruit");
    };

    const StopButton = async () => {
        if (window.confirm("게시중인 이력서를 게시 중단하시겠습니까? 중단된 이력서는 다시 게시할 수 없습니다. 이 작업은 되돌릴 수 없습니다.")) {
            if (window.confirm("다시 한 번 확인합니다. 정말로 게시 중단하겠습니까?")) {
                alert(getCookie('xToken'));
                axios
                .post(`http://localhost:3000/api/recruit/remove`, {
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
                    alert(JSON.stringify(json));
                    if (json.data.result === "success") 
                    window.location.replace("/admin/recruit");
                    else alert("이력서를 게시 중단하는 도중에 오류가 발생했습니다. 1");
                });
            }
        }
        return false;
    };
    
    useEffect(() => {   
        RecruitDetail();
        listForRecruit();
    }, []);
    
    if (loading) {
        return <h2>Loading...</h2>;
    }
    
    return (
        <div className="content">
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <CardTitle tag="h4">공고 상세</CardTitle>
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
                                    공고 내용
                                </NavLink>
                            </NavItem>
                            <NavItem xs={12}>
                                <NavLink
                                    className={{ active: activeTab === "2" }}
                                    onClick={() => {
                                        toggleTab("2");
                                    }}
                                >
                                    지원자 목록
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
                                                    <Col md={12}>
                                                        <p>{recruitDetailData.SUBJECT}</p>
                                                    </Col>
                                                </Row>
                                                <hr />
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>채용절차</h5>
                                                        <p><b>기간 : </b>{moment(recruitDetailData.STARTDATE).format('YYYY-MM-DD')} ~ {moment(recruitDetailData.ENDATE).format('YYYY-MM-DD')}</p>
                                                        <p><b>전형절차 : </b>{recruitDetailData.HIRINGSTEP}</p>
                                                        <p><b>제출서류 : </b>{recruitDetailData.REQUIREDOCS}</p>
                                                    </Col>
                                                    <hr />
                                                    <Col md={12}>
                                                        <h5>인사 담당자 정보</h5>
                                                        <p><b>이름 : </b>{recruitDetailData.HRONAME}</p>
                                                        <p><b>연락처 : </b>{recruitDetailData.HROCONTACT}</p>
                                                        <p><b>이메일 : </b>{recruitDetailData.HROEMAIL}</p>
                                                    </Col>
                                                    <hr />
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>담당업무</h5>
                                                        <p><b>직종 : </b> {recruitDetailData.JOBKIND_NAME}</p>
                                                        <p><b>경력 : </b>{recruitDetailData.CAREER_NAME}</p>
                                                        <p><b>담당 업무 : </b>{recruitDetailData.CHARGE}</p>
                                                        <p><b>직급/직책 : </b>{recruitDetailData.JOBRANK}</p>
                                                        <p><b>필수우대조건 : </b>{recruitDetailData.PREFERENTIAL}</p>
                                                    </Col>
                                                    <hr />
                                                    <Col md={12}>
                                                        <h5>지원 자격 및 조건</h5>
                                                        <p><b>학력 : </b>{recruitDetailData.EDUCATION}</p>
                                                        <p><b>급여종류 : </b>{recruitDetailData.SALARYTYPE}</p>
                                                        <p><b>연봉 : </b>{recruitDetailData.SALARY}</p>
                                                        <p><b>근무형태 : </b>{recruitDetailData.WORKINGTYPE_NAME}</p>
                                                        <p><b>수습기간 : </b>{recruitDetailData.PROBATIONTERM}</p>
                                                        <p><b>근무요일 : </b>{recruitDetailData.WORKSHIFT}</p>
                                                        <p><b>근무시간 : </b>{recruitDetailData.WORKSHIFTTIME}</p>
                                                        <p><b>지역 : </b>{recruitDetailData.WORKREGION_NAME}</p>
                                                        <p><b>성별 : </b>{recruitDetailData.GENDER}</p>
                                                        <p><b>나이 : </b>{recruitDetailData.AGE}</p>
                                                    </Col>
                                                    <hr />
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                    <h5>상태</h5>
                                                    <p><b>등록일 :</b>{moment(recruitDetailData.CREATED).format('YYYY-MM-DD hh:mm:ss')}</p>
                                                    <p><b>수정일 : </b>{moment(recruitDetailData.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</p>
                                                    <p><b>상태 : </b>{(recruitDetailData.ACTIVE === 'Y') ? '게시 중' : '게시 중단'}</p>
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
                                                            <th className="text-center">이름</th>
                                                            <th className="text-center">연락처</th>
                                                            <th className="text-center">주소</th>
                                                            <th className="text-center">지역</th>
                                                            <th className="text-center">직종</th>
                                                            <th className="text-center">인증여부</th>                            
                                                            <th className="text-center">지원일</th>
                                                        </tr>
                                                        {listForRecruits 
                                                            ? listForRecruits.map((data) => {
                                                                return (
                                                                    <tr key={data.SEQ}>
                                                                        <td>{data.NAME}</td>
                                                                        <td>{data.CONTACT}</td>
                                                                        <td>{data.ADDRESS} {data.ADDRESSEXTRA}</td>
                                                                        <td>{data.WORKREGION_NAME}</td>
                                                                        <td>{data.WORKINGTYPE_NAMES}</td>
                                                                        <td>{(data.CERTIFICATE ) ? '인증됨' : '인증 안됨'}</td>
                                                                        <td>{moment(data.APPLYDATE).format('YYYY-MM-DD')}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                            : <tr></tr>
                                                        } 
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
                                {(martInfo.LOGOFILE) ? <img src={"http://localhost:3000/api/files/get/" + martInfo.LOGOFILE} alt="profile-image" /> : <h3>{martInfo.NAME}</h3>}
                                <p className="text-muted">{martInfo.REGNO}</p>
                            </Col>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>이름 :</strong> <span className="m-l-15">{martInfo.NAME}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>우편번호 :</strong>
                                    <span className="m-l-15">
                                        {martInfo.POSTCODE}
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>주소 :</strong>
                                    <span className="m-l-15">{martInfo.ADDRESS} {martInfo.ADDRESSEXTRA}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>연락처 :</strong>
                                    <span className="m-l-15">{martInfo.CONTACT}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>인사담당자 :</strong>
                                    <span className="m-l-15">
                                        {martInfo.HRONAME}
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>연락처 :</strong> <span className="m-l-15">{martInfo.HROCONTACT}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>직급 :</strong> <span className="m-l-15">{martInfo.HRORANK}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>수정일 :</strong> <span className="m-l-15">{moment(martInfo.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>등록일 :</strong> <span className="m-l-15">{moment(martInfo.CREATED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>수정일 :</strong> <span className="m-l-15">{moment(martInfo.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>상태 :</strong> <span className="m-l-15">{martInfo.ACTIVE === "Y" ? "게시 중" : "게시 중단"}</span>
                                </p>
                            </div>

                            <div className="widget-bg-color-icon card-box">
                                <div className="font-icon-detail">
                                    <i className="users_single-02"></i>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-dark">
                                        <b>{
                                    (listForRecruits) ? listForRecruits.length : '0'}</b>
                                    </h4>
                                    <p>명이 지원함</p>
                                </div>
                                <div className="clearfix"></div>
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

export default RecruitView;
