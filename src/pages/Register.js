import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardBody, Row, Col, Button, Form, Label, FormGroup, Input, Container, CardGroup, InputGroup, InputGroupText, InputGroupProps, CardFooter } from "reactstrap";

const Register = (props) => {
    const [LOGINID, setLOGINID] = useState("");
    const [PWD, setPWD] = useState("");
    const [repwd, setRepwd] = useState("");

    const onClickJoin = async (e) => {
        e.preventDefault();

        let url = "http://localhost:3333/api/users/create";
        const Special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
        const pattern = /\s/g; 
        const str = LOGINID.value || PWD.value;

        if (PWD !== repwd) {
            alert("비밀번호를 다시 확인하여 주세요");
            return false;
        } else if (LOGINID === null || LOGINID === "" || LOGINID === undefined || PWD === null || PWD === "" || PWD === undefined || repwd === null || repwd === "" || repwd === undefined) {
            alert("빈 칸을 입력하여 주세요");
            return false;
        } else if (LOGINID.length > 15 || LOGINID.length < 4 || PWD.length > 15 || PWD.length < 4) {
            alert("4~15 글자로 맞추어 주세요");
            return false;
        } else if (LOGINID === Special) {
            alert("아이디에 특수문자는 사용할 수 없습니다.");
            return false;
        } else if( LOGINID.search(/\s/g) !== -1 ) {
            alert('아이디에 공백은 포함 할 수 없습니다.');
            return false;
        } else if( PWD.search(/\s/g) !== -1 || repwd.search(/\s/g) !== -1 ) {
            alert('비밀번호에 공백이 확인되었습니다. \n공백을 제거하여 주세요.');
            return false;
        } else {
            axios
                .post("http://localhost:3333/api/users/idCheck", { LOGINID: LOGINID })
                .then((response) => {
                    if (response.data.data.tf === true) {
                        axios
                            .post(url, { LOGINID: LOGINID, PWD: PWD })
                            .then((response) => {
                                console.log(response);
                                if (response.data.result === "success") {
                                    alert("회원가입 성공");
                                    props.history.push("/login");
                                } else if (response.data.result === "fail") {
                                    alert("회원가입에 실패하였습니다.");
                                    return;
                                }
                            })
                            .catch((error) => {
                                alert(error, "회원가입에 실패하였습니다");
                            });
                    } else {
                        alert("중복된 아이디가 존재합니다.");
                        return false;
                    }
                })
                .catch((error) => {
                    alert(error, "아이디 체크 에러");
                });
        }  
    };

    return (
        <div className="c-app c-default-layout flex-row align-items-center">
            <Container>
                <Row className="justify-content-center" style={{ marginTop: "10%" }}>
                    <Col md="6">
                        <Card className="p-4">
                            <CardHeader>
                                <h5 className="title">회원가입</h5>
                            </CardHeader>

                            <CardBody>
                                <Form>
                                    <FormGroup className="form-group">
                                        <Label>아이디를 입력하여 주세요.</Label>
                                        <Input type="text" className="form-control" placeholder="Enter ID" id="LOGINID" name="LOGINID" value={LOGINID || ""} onChange={(e) => setLOGINID(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Label>비밀번호를 입력하여 주세요.</Label>
                                        <Input type="password" className="form-control" placeholder="Enter Password" name="PWD" value={PWD || ""} onChange={(e) => setPWD(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Label>비밀번호를 다시 한번 입력하여 주세요.</Label>
                                        <Input type="password" className="form-control" placeholder="Enter Password" name="repwd" value={repwd || ""} onChange={(e) => setRepwd(e.target.value)} />
                                    </FormGroup>
                                    <Button variant="primary" type="submit" className="btn btn-primary btn-block" onClick={onClickJoin}>
                                        회원가입
                                    </Button>

                                    <Link to='/login'>
                                        <p className='forgot-password text-right' style={{textAlign:'right'}}>
                                            로그인 하러가기
                                        </p>
                                    </Link>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
