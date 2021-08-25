import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumeLists from "components/ResumeList";
import { Button, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import Paging from "components/Paging";

const Resume = () => {
    const [resumeLists, setResumeLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

    const [name, setName] = useState('');
    const [certificate, setCertificate] = useState('');
    let selectOptions = [
        { value: "", label: "전체" },
        { value: "Y", label: "인증" },
        { value: "N", label: "미인증" },
        { value: "W", label: "미인증(파일 업로드)" },
    ];
    
    const ResumetList = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/resume/list")
            .then((response) => {
            setResumeLists(response.data.data.list);
            setLoading(false);
        });
    };

    const onChange = (value) => { 
        // 콜백 함수 정의 
        setCertificate(value);
    }
    
    function getRegions() {
        const query = 'input[name="region"]:checked';
        const selectedEls = document.querySelectorAll(query);
        var checkRegion = "";
        selectedEls.forEach((el) => {
            checkRegion += el.value + ',';
        });
        if (checkRegion.length > 0) checkRegion = checkRegion.substring(0, checkRegion.length - 1);
        return checkRegion;
    }

    function getJobKinds() {
        const query = 'input[name="jobkind"]:checked';
        const selectedEls = document.querySelectorAll(query);
        var checkJobKind = "";
        selectedEls.forEach((el) => {
            checkJobKind += el.value + ',';
        });
        if (checkJobKind.length > 0) checkJobKind = checkJobKind.substring(0, checkJobKind.length - 1);
        return checkJobKind;
    }

    // ResetButton

    const SearchButton = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/resume/list",{
            name: name,
            certificate: certificate,
            regions: getRegions(),
            jobKinds: getJobKinds()
        })
            .then((response) => {
            setResumeLists(response.data.data.list);
            setLoading(false);
        });
    };
    const ResetButton = () => {
        window.location.replace("/admin/resume");
    };

    useEffect(() => {
        ResumetList();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = (resumeLists != null) ? resumeLists.slice(indexOfFirstPost, indexOfLastPost) : [];

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return <h2>Loading...</h2>;
    }
    return (
        <>
            <div className="content">
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
                                        <Label check>
                                            <Input type="checkbox" name="region" value='1'/>
                                            <span className="form-check-sign" />
                                            서울
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='2'/>
                                            <span className="form-check-sign" />
                                            경기
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='3'/>
                                            <span className="form-check-sign" />
                                            인천
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='4' />
                                            <span className="form-check-sign" />
                                            부산
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='5' />
                                            <span className="form-check-sign" />
                                            대구
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='6'/>
                                            <span className="form-check-sign" />
                                            광주
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='7'/>
                                            <span className="form-check-sign" />
                                            대전
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='8'/>
                                            <span className="form-check-sign" />
                                            울산
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='9'/>
                                            <span className="form-check-sign" />
                                            세종
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='10'/>
                                            <span className="form-check-sign" />
                                            강원
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='11'/>
                                            <span className="form-check-sign" />
                                            경남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='12'/>
                                            <span className="form-check-sign" />
                                            경북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='13'/>
                                            <span className="form-check-sign" />
                                            전남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='14'/>
                                            <span className="form-check-sign" />
                                            전북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='15'/>
                                            <span className="form-check-sign" />
                                            충남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='16'/>
                                            <span className="form-check-sign" />
                                            충북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='17'/>
                                            <span className="form-check-sign" />
                                            제주
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="region" value='18'/>
                                            <span className="form-check-sign" />
                                            전국
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Label md="2">이름</Label>
                                <Col md='10'>
                                    <InputGroup className="no-border">
                                        <Input  placeholder="Search..." value={name} onChange={({ target: { value } }) => setName(value)}/>
                                    </InputGroup>
                                </Col>
                                <Label md="2">직종</Label>
                                <Col md='10'>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="1"/>
                                        <span className="form-check-sign" />
                                        점장
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="2"/>
                                        <span className="form-check-sign" />
                                        계산원/경리
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="3"/>
                                        <span className="form-check-sign" />
                                        스태프/보조/진열
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="4"/>
                                        <span className="form-check-sign" />
                                        공산(파트)
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="5"/>
                                        <span className="form-check-sign" />
                                        농산담당
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="6"/>
                                        <span className="form-check-sign" />
                                        축산담당
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="7"/>
                                        <span className="form-check-sign" />
                                        수산담당
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="8"/>
                                        <span className="form-check-sign" />
                                        배달/배송기사
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" name="jobkind" value="9"/>
                                        <span className="form-check-sign" />
                                        기타
                                    </Label>
                                </FormGroup>
                                </Col>
                                <Label md="2">인증여부</Label>
                                <Col md='10'>
                                    <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                value={selectOptions.find(op => { // choice state에 따라 디폴트 option 세팅 
                                    return op.value === certificate })} 
                                    placeholder="선택해주세요." 
                                    onChange={(value) => { onChange(value.value); }} options={selectOptions}
                                />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button className='btn-info' onClick={SearchButton}>검색</Button>
                            <Button className='btn-info' onClick={ResetButton}>조건 리셋</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md="12">
                    <Card>
                        <CardBody>
                            <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th className="text-center">이름</th>
                                        <th className="text-center">연락처</th>
                                        <th className="text-center">나이</th>
                                        <th className="text-center">성별</th>
                                        <th className="text-center">희망지역</th>
                                        <th className="text-center">직종</th>
                                        <th className="text-center">인증</th>
                                        <th className="text-center">수정일</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <ResumeLists resumeLists={currentPosts}></ResumeLists>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
                <Paging postsPerPage={postsPerPage}
                        totalPosts={(resumeLists) ? resumeLists.length : 0}
                        paginate={paginate}>
                </Paging>
            </Row>
            </div>
        </>
    );
};

export default Resume;
