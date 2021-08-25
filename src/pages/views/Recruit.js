import React, { useEffect, useState } from "react";
import axios from "axios";
import RecruitLists from "components/RecruitList";
import Select from "react-select";
import Paging from "components/Paging";
import { Button, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
const Recruit = () => {
    const [recruitLists, setRecruitLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [name, setName] = useState('');
    const [active, setActive] = useState('');
    const [totalCount, setTotalCount] = useState('');
    let selectOptions = [
        { value: "", label: "전체" },
        { value: "Y", label: "구인 중" },
        { value: "N", label: "마감" },
    ];
    const RecruitList = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/recruit/list")
            .then((response) => {
            setRecruitLists(response.data.data.list);
            setTotalCount(response.data.data.totalCount)
            setLoading(false);
        });
    };

    const onChange = (value) => { 
        // 콜백 함수 정의 
        setActive(value);
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

    const SearchButton = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/recruit/list",{
            name: name,
            regions: getRegions(),
            active: active

        })
            .then((response) => {
            setRecruitLists(response.data.data.list);
            
            setLoading(false);
        });
    };
    const ResetButton = () => {
        window.location.replace("/admin/recruit");
    };
    useEffect(() => {
        RecruitList();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = (recruitLists != null) ? recruitLists.slice(indexOfFirstPost, indexOfLastPost) : [];

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
                            <CardTitle tag="h4">공고 관리</CardTitle>
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
                                <Label md="2">마트명</Label>
                                <Col md='10'>
                                    <InputGroup className="no-border">
                                        <Input  placeholder="Search..." value={name} onChange={({ target: { value } }) => setName(value)}/>
                                    </InputGroup>
                                </Col>
                                <Label md="2">상태</Label>
                                <Col md='10'>
                                <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                value={selectOptions.find(op => { // choice state에 따라 디폴트 option 세팅 
                                    return op.value === active })} 
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
                                        <th className="text-center">마트이름</th>
                                        <th className="text-center">공고</th>
                                        <th className="text-center">직종</th>
                                        <th className="text-center">직급</th>
                                        <th className="text-center">근무형태</th>
                                        <th className="text-center">희망지역</th>
                                        <th className="text-center">기간</th>
                                        <th className="text-center">지원자</th>
                                        <th className="text-center">상태</th>
                                        <th className="text-center">수정일</th>
                                        <th className="text-center">수정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                <RecruitLists recruitLists={currentPosts}></RecruitLists>
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
                <Paging postsPerPage={postsPerPage}
                        totalPosts={(recruitLists) ? recruitLists.length : 0}
                        paginate={paginate}>
                </Paging>
            </div>
        </>
    );
};

export default Recruit;
