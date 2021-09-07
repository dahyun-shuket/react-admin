import React, { useEffect, useState } from "react";
import axios from "axios";
import RecruitLists from "components/RecruitList";
import Select from "react-select";
// import Paging from "components/Paging";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import PanelHeader from "../../templates/PanelHeader";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";

import { Button, Card, CardHeader, CardBody, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
const Recruit = () => {
    const [recruitLists, setRecruitLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const [name, setName] = useState("");
    const [active, setActive] = useState("");
    const [checkList, setCheckList] = useState([]);
    const [totalCount, setTotalCount] = useState("");
    const regions = ["서울", "경기", "인천", "부산", "대구", "광주", "대전", "울산", "세종", "강원", "경남", "경북", "전남", "전북", "충남", "충북", "제주", "전국"];
    let selectOptions = [
        { value: "", label: "전체" },
        { value: "Y", label: "구인 중" },
        { value: "N", label: "마감" },
    ];
    const RecruitList = async () => {
        setLoading(true);
        axios.post("http://localhost:3000/api/recruit/reactlist",
        {key: secrectKey.secretKey
        }, {headers: 
            {
                'contentType': 'application/json',
                
                
                'Authorization': getCookie('xToken')
            }
        }).then((response) => {
                setRecruitLists(response.data.data.list);
                setTotalCount(response.data.data.totalCount);
                setLoading(false);
            });
    };

    const onChange = (value) => {
        // 콜백 함수 정의
        setActive(value);
    };
    const changeHandler = (checked, id) => {
        if (checked) {
            setCheckList([...checkList, id]);
        } else {
            // 체크 해제
            setCheckList(checkList.filter((el) => el !== id));
        }
    };
    function checkOutRegions() {
        // const query = 'input[name="region"]:checked';
        // const selectedEls = document.querySelectorAll(query);

        // selectedEls.forEach(function (v, i) {
        //     v.checked = false;
        // });
        setCheckList([]);
    }
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

    const SearchButton = async () => {
        setLoading(true);
        axios
            .post("http://localhost:3000/api/recruit/reactlist", {
                name: name,
                regions: getRegions(),
                active: active,
                key: secrectKey.secretKey
            }, {headers: 
                {
                    'contentType': 'application/json',
                    
                    
                    'Authorization': getCookie('xToken')
                }
            })
            .then((response) => {
                setRecruitLists(response.data.data.list);
                setTotalCount(response.data.data.totalCount);
                setLoading(false);
            });
    };
    const ResetButton = () => {
        setName("");
        setActive("");
        checkOutRegions();
        // window.location.replace("/admin/recruit");
    };
    useEffect(() => {
        RecruitList();
    }, []);
    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = recruitLists != null ? recruitLists.slice(indexOfFirstPost, indexOfLastPost) : [];

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
                                            {regions.map((data, index) => {
                                                return (
                                                    <Label check key={index}>
                                                        <Input
                                                            type="checkbox"
                                                            name="region"
                                                            value={index + 1}
                                                            id={index + 1}
                                                            onChange={(e) => {
                                                                changeHandler(e.currentTarget.checked, index + 1);
                                                            }}
                                                        checked={checkList.includes(index+1) ? true : false}
                                                        />
                                                        <span className="form-check-sign" />
                                                        {data}
                                                    </Label>
                                                );
                                            })}
                                        </FormGroup>
                                    </Col>
                                    <Label md="2">마트명</Label>
                                    <Col md="10">
                                        <InputGroup className="no-border">
                                            <Input placeholder="Search..." value={name} onChange={({ target: { value } }) => setName(value)} />
                                        </InputGroup>
                                    </Col>
                                    <Label md="2">상태</Label>
                                    <Col md="10">
                                        <Select
                                            className="react-select primary"
                                            classNamePrefix="react-select"
                                            value={selectOptions.find((op) => {
                                                // choice state에 따라 디폴트 option 세팅
                                                return op.value === active;
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
                                    <tbody>
                                    <tr className="text-primary">
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
                                    </tr>
                                        <RecruitLists recruitLists={currentPosts} />
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {/* pagination
                https://pagination-react-component.vercel.app/demo/more */}
                <Pagination className="ant-pagination d-flex justify-content-center" total={totalCount} current={currentPage} pageSize={postsPerPage} onChange={(page) => setCurrentPage(page)} />
            </div>
        </>
    );
};

export default Recruit;
