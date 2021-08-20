import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, UncontrolledTooltip, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
import Select from "react-select";
function RecruitLists({ recruitLists, loading, props }) {
    if (loading) {
        return <h2>Loading...</h2>;
    }
    let selectOptions = [
        { value: "", label: "전체" },
        { value: "Y", label: "구인 중" },
        { value: "N", label: "마감" },
    ];
    // const onClickView = async () => {
        // alert("페이지 클릭");
    // };
    return (
        <div>
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
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            서울
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            경기
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            인천
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            부산
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            대구
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            광주
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            대전
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            울산
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            세종
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            강원
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            경남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            경북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            전남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            전북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            충남
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            충북
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            제주
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" />
                                            <span className="form-check-sign" />
                                            전국
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Label md="2">마트명</Label>
                                <Col md='10'>
                                    <InputGroup className="no-border">
                                        <Input  placeholder="Search..." />
                                    </InputGroup>
                                </Col>
                                <Label md="2">상태</Label>
                                <Col md='10'>
                                    <Select
                                className="react-select primary"
                                classNamePrefix="react-select"
                                placeholder="선택하세요."
                                defaultValue={'null'}
                                options={selectOptions}
                                />
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button className='btn-info'>검색</Button>
                            <Button className='btn-info'>조건 리셋</Button>
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
                                        <th>공고</th>
                                        <th>직종</th>
                                        <th className="text-center">직급</th>
                                        <th className="text-right">근무형태</th>
                                        <th className="text-right">희망지역</th>
                                        <th className="text-right">기간</th>
                                        <th className="text-right">지원자</th>
                                        <th className="text-right">상태</th>
                                        <th className="text-right">수정일</th>
                                        <th className="text-right">수정</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recruitLists.map((data) => {
                                        return (
                                            <tr key={data.SEQ}>
                                                <td>{data.NAME}</td>
                                                {/* <td onClick={onClickView}> */}
                                                <td>
                                                    <Link to={`/admin/recruit/${data.SEQ}`}>{data.SUBJECT}</Link>
                                                </td>
                                                <td>{data.JOBKIND_NAME}</td>
                                                <td>{data.JOBRANK}</td>
                                                <td>{data.WORKINGTYPE_NAME}</td>
                                                <td>{data.WORKREGION_NAME}</td>
                                                <td>{data.STARTDATE}</td>
                                                <td>{data.APPLYCOUNT}</td>
                                                <td>{data.ACTIVE}</td>
                                                <td>{data.MODIFIED}</td>
                                                <td>
                                                    <Button className="btn-icon btn-neutral" color="success" id="tooltip824696339" size="sm" type="button">
                                                        <i className="now-ui-icons ui-2_settings-90" />
                                                    </Button>
                                                    <UncontrolledTooltip delay={0} target="tooltip824696339" />
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default RecruitLists;
