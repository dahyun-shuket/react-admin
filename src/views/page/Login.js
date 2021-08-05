import React, { useState } from "react";
import { Link, Router } from "react-router-dom";
import axios from "axios";
import { Card, CardHeader, CardBody, Row, Col, Button, Form, Label, FormGroup, Input, Container, CardGroup, InputGroup, InputGroupText, InputGroupProps } from "reactstrap";
import { setUserSession } from "../../Utils/Common";

// import jQuery from 'jquery';
// window.$ = window.jQuery = jQuery;

function LoginPage(props) {
    const [LOGINID, setLOGINID] = useState("");
    const [PWD, setPWD] = useState("");

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    };
    const onClickLogin = async () => {
        const Special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;

        if (LOGINID === null || LOGINID === "" || LOGINID === undefined || PWD === null || PWD === "" || PWD === undefined) {
            alert("빈칸을 입력하여 주세요");
            return;
        } else if (LOGINID.length > 15 || LOGINID.length < 4 || PWD.length > 15 || PWD.length < 4) {
            alert("4~15 글자로 입력하여 주세요");
            return;
        } else if (LOGINID === Special) {
            alert("아이디에 특수문자는 사용할 수 없습니다.");
            return;
        } else {
            let url = "http://localhost:3333/api/users/login";
            axios
                .post(url, { LOGINID: LOGINID, PWD: PWD })
                .then((response) => {
                    console.log(response);
                    if (response.data.result === "success") {
                        setUserSession(response.data.data.token);
                        alert("로그인 성공");
                        props.history.push("/admin");
                    } else if (response.data.result === "fail") {
                        alert("로그인에 실패하였습니다.");
                        return;
                    }
                })
                .catch((error) => {
                    // if (error.response.status === 401) setError(error.response.data.message);
                    // else setError(alert('로그인 실패'))
                    alert(error, "로그인 실패");
                });
        }
    };

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="8" style={{ marginTop: "10%" }}>
                    <CardGroup>
                        <Card className="p-4">
                            <CardBody>
                                <Form onSubmit={onSubmitHandler}>
                                    <h2>Login</h2>
                                    {/* <p className="text-muted">아이디 / 비밀번호를 입력하세요.</p> */}
                                    <FormGroup className="mb-3">
                                        <Label>아이디를 입력하여 주세요.</Label>
                                        <Input type="text" placeholder="Username" autoComplete="username" name="LOGINID" value={LOGINID || ""} onChange={(e) => setLOGINID(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="mb-4">
                                        <Label>비밀번호를 입력하여 주세요.</Label>
                                        <Input type="password" placeholder="Password" autoComplete="current-password" name="PWD" value={PWD || ""} onChange={(e) => setPWD(e.target.value)} />
                                    </FormGroup>
                                    <Row>
                                        <Col xs="6">
                                            <Button color="primary" className="px-4" type="submit" onClick={onClickLogin}>
                                                로그인
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                        <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
                            <CardBody className="text-center">
                                <div>
                                    <h2>회원가입</h2>
                                    <p>회원가입을 하세요!</p>
                                    <Link to="/register">
                                        <Button color="primary" className="mt-3" active tabIndex={-1}>
                                            Join
                                        </Button>
                                    </Link>
                                </div>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default LoginPage;
