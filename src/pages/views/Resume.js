import "components/Paging.less";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumeLists from "components/ResumeList";
import { Button, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import PanelHeader from "../../templates/PanelHeader";

const Resume = () => {
    const [resumeLists, setResumeLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [totalCount, setTotalCount] = useState(1);
    const [regionCheck, setRegionCheck] = useState([]);
    const [jobKindCheck, setJobKindCheck] = useState([]);
    const [name, setName] = useState("");
    const [certificate, setCertificate] = useState("");

    const regions = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "경남", "경북", "전남", "전북", "충남", "충북", "제주", "전국"];
    const jobKinds = ["점장", "계산원/경리", "스태프/보조/진열", "공산(파트)", "농산담당", "축산담당", "수산담당", "배달/배송기사", "기타"];
    let selectOptions = [
        { value: "", label: "전체" },
        { value: "Y", label: "인증" },
        { value: "N", label: "미인증" },
        { value: "W", label: "미인증(파일 업로드)" },
    ];

    const ResumetList = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/resume/reactlist").then((response) => {
            setResumeLists(response.data.data.list);
            setTotalCount(response.data.data.totalCount);
            setLoading(false);
        });
    };

    const regionChangeHandler = (checked, id) => {
        if (checked) {
            setRegionCheck([...regionCheck, id]);
        } else {
            // 체크 해제
            setRegionCheck(regionCheck.filter((el) => el !== id));
        }
    };
    const jobkindChangeHandler = (checked, id) => {
        if (checked) {
            setJobKindCheck([...jobKindCheck, id]);
        } else {
            // 체크 해제
            setJobKindCheck(jobKindCheck.filter((el) => el !== id));
        }
    };
    
    const onChange = (value) => {
        // 콜백 함수 정의
        setCertificate(value);
    };

    function getRegions() {
        const query = 'input[name="region"]:checked';
        const selectedEls = document.querySelectorAll(query);
        var checkRegion = "";
        selectedEls.forEach((el) => {
            checkRegion += el.value + ",";
        });
        if (checkRegion.length > 0) checkRegion = checkRegion.substring(0, checkRegion.length - 1);
        return checkRegion;
    }

    function getJobKinds() {
        const query = 'input[name="jobkind"]:checked';
        const selectedEls = document.querySelectorAll(query);
        var checkJobKind = "";
        selectedEls.forEach((el) => {
            checkJobKind += el.value + ",";
        });
        if (checkJobKind.length > 0) checkJobKind = checkJobKind.substring(0, checkJobKind.length - 1);
        return checkJobKind;
    }

    // ResetButton

    const SearchButton = async () => {
        setLoading(true);
        axios
            .post("http://localhost:3000/api/resume/reactlist", {
                name: name,
                certificate: certificate,
                regions: getRegions(),
                jobKinds: getJobKinds(),
            })
            .then((response) => {
                setResumeLists(response.data.data.list);
                setLoading(false);
            });
    };
    const ResetButton = () => {
        setName("");
        setCertificate("");
        setRegionCheck("");
        setJobKindCheck("");
        // window.location.replace("/admin/resume");
    };

    useEffect(() => {
        ResumetList();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = resumeLists != null ? resumeLists.slice(indexOfFirstPost, indexOfLastPost) : [];

    // Change page
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <div className="content">
                <PanelHeader size="sm" />
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">이력서 관리</CardTitle>
                            </CardHeader>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Row>
                                    <Label sm="2">지역</Label>
                                    <Col className="checkbox-radios" sm={10}>
                                        <FormGroup check>
                                            {regions.map((data, index) => {
                                                return (
                                                    <Label key={index} check >
                                                        <Input type="checkbox" name="region" value={index + 1} id={'region'+(index + 1)}
                                                            onChange={(e) => {
                                                                regionChangeHandler(e.currentTarget.checked, index + 1);
                                                            }}
                                                        checked={regionCheck.includes(index+1) ? true : false} />
                                                        <span className="form-check-sign" />
                                                        {data}
                                                    </Label>
                                                );
                                            })}
                                        </FormGroup>
                                    </Col>
                                    <Label md="2">이름</Label>
                                    <Col md="10">
                                        <InputGroup className="no-border">
                                            <Input placeholder="Search..." value={name} onChange={({ target: { value } }) => setName(value)} />
                                        </InputGroup>
                                    </Col>
                                    <Label md="2">직종</Label>
                                    <Col md="10">
                                        <FormGroup check>
                                            {jobKinds.map((data, index) => {
                                                return (
                                                    <Label check>
                                                        <Input type="checkbox" name="jobkind" value={index + 1} id={'jobkind'+(index + 1)}
                                                            onChange={(e) => {
                                                                jobkindChangeHandler(e.currentTarget.checked, index + 1);
                                                            }}
                                                        checked={jobKindCheck.includes(index+1) ? true : false} />
                                                        <span className="form-check-sign" />
                                                        {data}
                                                    </Label>
                                                );
                                            })}
                                        </FormGroup>
                                    </Col>
                                    <Label md="2">인증여부</Label>
                                    <Col md="10">
                                        <Select
                                            className="react-select primary"
                                            classNamePrefix="react-select"
                                            value={selectOptions.find((op) => {
                                                // choice state에 따라 디폴트 option 세팅
                                                return op.value === certificate;
                                            })}
                                            placeholder="선택해주세요."
                                            onChange={(value) => {
                                                onChange(value.value);
                                            }}
                                            options={selectOptions}
                                        />
                                    </Col>
                                </Row>
                            </CardBody>
                            <CardFooter>
                                <Button className="btn-info" onClick={SearchButton}>
                                    검색
                                </Button>
                                <Button className="btn-info" onClick={ResetButton}>
                                    조건 리셋
                                </Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Card>
                            <CardBody>
                                <Table responsive>
                                    <tr className="text-primary">
                                        <th className="text-center">이름</th>
                                        <th className="text-center">연락처</th>
                                        <th className="text-center">나이</th>
                                        <th className="text-center">성별</th>
                                        <th className="text-center">희망지역</th>
                                        <th className="text-center">직종</th>
                                        <th className="text-center">인증</th>
                                        <th className="text-center">파일</th>
                                        <th className="text-center">수정일</th>
                                    </tr>
                                    <tbody>
                                        <ResumeLists resumeLists={currentPosts} />
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Pagination 
                        className="ant-pagination d-flex justify-content-center" 
                        total={totalCount} 
                        current={currentPage} 
                        pageSize={postsPerPage} 
                        onChange={(page) => setCurrentPage(page)} 
                    />
                </Row>
            </div>
        </>
    );
};

export default Resume;
