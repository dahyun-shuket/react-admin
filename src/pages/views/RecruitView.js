import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Nav, TabContent, TabPane, NavItem, NavLink, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter } from "reactstrap";
import { useParams } from "react-router-dom";
import moment from "moment";
import secrectKey from "../../Utils/secretkey";
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
            .post(
                "http://localhost:3000/api/recruit/get",
                {
                    seq: id,
                    key: secrectKey.secretKey,
                },
                {
                    headers: {
                        contentType: "application/json",
                        
                        userAgent: "DEVICE-AGENT",
                        Authorization: getCookie("xToken"),
                    },
                }
            )
            .then((response) => {
                setRecruitDetailData(response.data.data);
                axios
                    .post("http://localhost:3000/api/mart/get", {
                        seq: response.data.data.MART_SEQ,
                    })
                    .then((response) => {
                        setMartInfo(response.data.data);
                    });
                setLoading(false);
            });
    };

    const listForRecruit = async () => {
        setLoading(true);
        await axios
            .post(
                "http://localhost:3000/api/resume/listForRecruit",
                {
                    recruitSeq: id,
                    key: secrectKey.secretKey,
                },
                {
                    headers: {
                        contentType: "application/json",
                        
                        userAgent: "DEVICE-AGENT",
                        Authorization: getCookie("xToken"),
                    },
                }
            )
            .then((response) => {
                // alert(JSON.stringify(response.data.data))
                setListForRecruits(response.data.data.list);
                setLoading(false);
            })
            .catch(() => {
                setListForRecruits([]);
                setLoading(false);
            });
    };

    const ListButton = async () => {
        window.location.replace("/admin/recruit");
    };

    const StopButton = async () => {
        if (window.confirm("???????????? ???????????? ?????? ????????????????????????? ????????? ???????????? ?????? ????????? ??? ????????????. ??? ????????? ????????? ??? ????????????.")) {
            if (window.confirm("?????? ??? ??? ???????????????. ????????? ?????? ??????????????????????")) {
                axios
                    .post(
                        `http://localhost:3000/api/recruit/remove`,
                        {
                            seq: id,
                            key: secrectKey.secretKey,
                        },
                        {
                            headers: {
                                contentType: "application/json",
                                
                                userAgent: "DEVICE-AGENT",
                                Authorization: getCookie("xToken"),
                            },
                        }
                    )
                    .then(function (json) {
                        alert(JSON.stringify(json));
                        if (json.data.result === "success") window.location.replace("/admin/recruit");
                        else alert("???????????? ?????? ???????????? ????????? ????????? ??????????????????. 1");
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
                            <CardTitle tag="h4">?????? ??????</CardTitle>
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
                                    ?????? ??????
                                </NavLink>
                            </NavItem>
                            <NavItem xs={12}>
                                <NavLink
                                    className={{ active: activeTab === "2" }}
                                    onClick={() => {
                                        toggleTab("2");
                                    }}
                                >
                                    ????????? ??????
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
                                                        <h5>????????????</h5>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {moment(recruitDetailData.STARTDATE).format("YYYY-MM-DD")} ~ {moment(recruitDetailData.ENDATE).format("YYYY-MM-DD")}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.HIRINGSTEP}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.REQUIREDOCS}
                                                        </p>
                                                    </Col>
                                                    <hr />
                                                    <Col md={12}>
                                                        <h5>?????? ????????? ??????</h5>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.HRONAME}
                                                        </p>
                                                        <p>
                                                            <b>????????? : </b>
                                                            {recruitDetailData.HROCONTACT}
                                                        </p>
                                                        <p>
                                                            <b>????????? : </b>
                                                            {recruitDetailData.HROEMAIL}
                                                        </p>
                                                    </Col>
                                                    <hr />
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>????????????</h5>
                                                        <p>
                                                            <b>?????? : </b> {recruitDetailData.JOBKIND_NAME}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.CAREER_NAME}
                                                        </p>
                                                        <p>
                                                            <b>?????? ?????? : </b>
                                                            {recruitDetailData.CHARGE}
                                                        </p>
                                                        <p>
                                                            <b>??????/?????? : </b>
                                                            {recruitDetailData.JOBRANK}
                                                        </p>
                                                        <p>
                                                            <b>?????????????????? : </b>
                                                            {recruitDetailData.PREFERENTIAL}
                                                        </p>
                                                    </Col>
                                                    <hr />
                                                    <Col md={12}>
                                                        <h5>?????? ?????? ??? ??????</h5>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.EDUCATION}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.SALARYTYPE}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.SALARY}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.WORKINGTYPE_NAME}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.PROBATIONTERM}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.WORKSHIFT}
                                                        </p>
                                                        <p>
                                                            <b>???????????? : </b>
                                                            {recruitDetailData.WORKSHIFTTIME}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.WORKREGION_NAME}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.GENDER}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.AGE}
                                                        </p>
                                                    </Col>
                                                    <hr />
                                                </Row>
                                                <Row>
                                                    <Col md={12}>
                                                        <h5>??????</h5>
                                                        <p>
                                                            <b>????????? :</b>
                                                            {moment(recruitDetailData.CREATED).format("YYYY-MM-DD hh:mm:ss")}
                                                        </p>
                                                        <p>
                                                            <b>????????? : </b>
                                                            {moment(recruitDetailData.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}
                                                        </p>
                                                        <p>
                                                            <b>?????? : </b>
                                                            {recruitDetailData.ACTIVE === "Y" ? "?????? ???" : "?????? ??????"}
                                                        </p>
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
                                                            <th className="text-center">??????</th>
                                                            <th className="text-center">?????????</th>
                                                            <th className="text-center">??????</th>
                                                            <th className="text-center">??????</th>
                                                            <th className="text-center">??????</th>
                                                            <th className="text-center">????????????</th>
                                                            <th className="text-center">?????????</th>
                                                        </tr>
                                                        {listForRecruits ? (
                                                            listForRecruits.map((data) => {
                                                                return (
                                                                    <tr key={data.SEQ}>
                                                                        <td>{data.NAME}</td>
                                                                        <td>{data.CONTACT}</td>
                                                                        <td>
                                                                            {data.ADDRESS} {data.ADDRESSEXTRA}
                                                                        </td>
                                                                        <td>{data.WORKREGION_NAME}</td>
                                                                        <td>{data.WORKINGTYPE_NAMES}</td>
                                                                        <td>{data.CERTIFICATE ? "?????????" : "?????? ??????"}</td>
                                                                        <td>{moment(data.APPLYDATE).format("YYYY-MM-DD")}</td>
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <tr></tr>
                                                        )}
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
                                {martInfo.LOGOFILE ? <img src={"http://localhost:3000/api/files/get/" + martInfo.LOGOFILE} alt="profile-image" /> : <h3>{martInfo.NAME}</h3>}
                                <p className="text-muted">{martInfo.REGNO}</p>
                            </Col>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong> <span className="m-l-15">{martInfo.NAME}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>???????????? :</strong>
                                    <span className="m-l-15">{martInfo.POSTCODE}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong>
                                    <span className="m-l-15">
                                        {martInfo.ADDRESS} {martInfo.ADDRESSEXTRA}
                                    </span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong>
                                    <span className="m-l-15">{martInfo.CONTACT}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>??????????????? :</strong>
                                    <span className="m-l-15">{martInfo.HRONAME}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{martInfo.HROCONTACT}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong> <span className="m-l-15">{martInfo.HRORANK}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{moment(martInfo.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                            </div>

                            <div className="text-left m-t-40">
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{moment(martInfo.CREATED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>????????? :</strong> <span className="m-l-15">{moment(martInfo.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</span>
                                </p>
                                <p className="text-muted font-13">
                                    <strong>?????? :</strong> <span className="m-l-15">{martInfo.ACTIVE === "Y" ? "?????? ???" : "?????? ??????"}</span>
                                </p>
                            </div>

                            <div className="widget-bg-color-icon card-box">
                                <div className="font-icon-detail">
                                    <i className="users_single-02"></i>
                                </div>
                                <div className="text-right">
                                    <h4 className="text-dark">
                                        <b>{listForRecruits ? listForRecruits.length : "0"}</b>
                                    </h4>
                                    <p>?????? ?????????</p>
                                </div>
                                <div className="clearfix"></div>
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

export default RecruitView;
