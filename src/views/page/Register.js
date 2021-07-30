import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
    Card,
    CardHeader,
    CardBody,
    Row,
    Col,
    Button,
    Form,
    Label,
    FormGroup,
    Input,
    Container,
    CardGroup,
    InputGroup,
    InputGroupText,
    InputGroupProps,
    CardFooter
  } from "reactstrap";
// function JoinUser(credentials) {
// return fetch('http://localhost:3333/api/users/create', {
//     method: 'POST',
//     mode: 'cors',
//     headers: {
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(credentials)
// })
//     .then(data => data.json())
// }



const Register = (props) => {
    const [LOGINID, setLOGINID] = useState('');
    const [PWD, setPWD] = useState('');
    const [repwd, setRepwd] = useState('');
    const [usingid, setUsingid] = useState(false);
    let idTestCheck = false;
    let userFlag =true;


    // const idCheck = () => {
    //     // e.preventDefault();
    //     let urls = 'http://localhost:3333/api/users/idCheck';
    //      fetch(urls, {
    //         method: 'post',
    //         headers: {'Content-Type' : 'application/json'},
    //         body: JSON.stringify({LOGINID: LOGINID}),
    //     })
    //     .then(res => res.json())
    //     .then(json => {
    //         console.log('sdflsf')
    //         if(json.data.tf === false){
    //             alert('사용불가 아이디입니다.')
    //             setUsingid(false);
    //             return false;
    //         } else {
    //             alert('사용가능 아이디')
    //             setUsingid(true)
                
    //         }
    //     })
    // }
    // http://localhost:3333/api/users/idCheck
        const onClickJoin = async (e) => {
            e.preventDefault();

            let url = 'http://localhost:3333/api/users/create';
            
            let option = {
                method:'POST',
                url: url,
                data: { LOGINID: LOGINID, PWD: PWD }
            };
            // let options = {
            //     method:'POST',
            //     url: urls,
            //     data: { LOGINID: LOGINID }
            // };
            // let response = await axios(option);
            
           
            let testCheck = false;
            const Special = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
            const pattern = /\s/g;
            const inputtest = LOGINID.value;

            if(PWD !== repwd) {
                alert('비밀번호를 다시 확인하여 주세요')
                return false;
            } else if(LOGINID === null || LOGINID === '' || LOGINID === undefined || PWD === null || PWD === '' || PWD === undefined || repwd === null || repwd === '' || repwd === undefined){
                alert('빈 칸을 입력하여 주세요')
                return false;
            }else if(LOGINID.length > 15 || LOGINID.length < 4 || PWD.length > 15 || PWD.length < 4) {
                alert('4~15 글자로 맞추어 주세요')
                return false;
            } else if(inputtest.pattern) {
                LOGINID.replace(/(\s*)/g, "");
                alert('공백제거')
            } else if(LOGINID === Special){
                alert('아이디에 특수문자는 사용할 수 없습니다.')
                return false;
            } else {
                axios.post(url, {LOGINID: LOGINID, PWD: PWD})
                .then(response => {
                    console.log(response);
                    if(response.data.result === 'success') {
                        alert('회원가입 성공')
                        props.history.push('/login');
                    } else if(response.data.result === 'fail') {
                        alert('회원가입에 실패하였습니다.')
                        return
                    }
                   
                })
                .catch(error => {
                    alert(error,'로그인 실패')
                })
    
            }
        }



    



    return (
       
        <div className="c-app c-default-layout flex-row align-items-center">
            <Container>
                <Row className="justify-content-center" style={{marginTop:'10%'}}>
                    <Col md="6">
                            <Card  className="p-4">
                            <CardHeader>
                                <h5 className="title">회원가입</h5>
                            </CardHeader>
                                <CardBody>
                                <Form >
                                    <FormGroup  className="form-group">
                                        <Label>아이디를 입력하여 주세요.</Label>
                                        <Input type="text" className='form-control'  placeholder="Enter ID" name="LOGINID" value={LOGINID || ''} onChange={e => setLOGINID(e.target.value)} />
                                        {/* <Button onClick={idCheck}>중복확인</Button> */}
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Label>비밀번호를 입력하여 주세요.</Label>
                                        <Input type="password" className='form-control' placeholder="Enter Password" name="PWD" value={PWD || ''} onChange={e => setPWD(e.target.value)} />
                                    </FormGroup>
                                    <FormGroup className="form-group">
                                        <Label>비밀번호를 다시 한번 입력하여 주세요.</Label>
                                        <Input type="password" className='form-control' placeholder="Enter Password" name="repwd" value={repwd || ''} onChange={e => setRepwd(e.target.value)} />
                                    </FormGroup>
                                    <Button variant="primary" type="submit"  className="btn btn-primary btn-block" onClick={onClickJoin}>
                                        회원가입
                                    </Button>
                                    <Link to='/login'>
                                        <p className='forgot-password text-right'>
                                            로그인 하러가기
                                        </p>
                                    </Link>
                                </Form>
                                </CardBody>
                                {/* <CardFooter>
                                    <Row>
                                        <Col >
                                            <Link to='/login'>
                                                <Button className="btn btn-primary btn-block">로그인</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </CardFooter> */}
                            </Card>
                    </Col>
                </Row>
            </Container>
        </div>



        
    //     <Container>
    //     <Row className="justify-content-center">
    //       <Col md="8">
    //         <CardGroup>
    //           <Card className="p-4">
    //             <CardBody>
    //               <Form>
    //                 <h2>회원가입</h2>
    //                 <p className="text-muted">가입자 정보를 입력하세요.</p>
    //                 <FormGroup className="mb-3">
    //                     <Label>아이디를 입력하여 주세요.</Label>
    //                   <Input type="text" className='form-control' placeholder="Username" autoComplete="username" name="LOGINID" value={LOGINID || ''} onChange={e =>setLOGINID(e.target.value)}  />
    //                 </FormGroup>
    //                 <FormGroup className="mb-4">
    //                 <Label>비밀번호를 입력하여 주세요.</Label>
    //                   <Input type="password" placeholder="Password" autoComplete="current-password" name="PWD" value={PWD || ''} onChange={e => setPWD(e.target.value)} />
    //                 </FormGroup>
    //                 <FormGroup className="mb-4">
    //                 <Label>비밀번호를 입력하여 주세요.</Label>
    //                   <Input type="password" placeholder="Password" autoComplete="current-password" name="PWD" value={repwd || ''} onChange={e => setRepwd(e.target.value)} />
    //                 </FormGroup>
    //                 <Row>
    //                   <Col xs="6">
    //                     <Button color="primary" className="px-4" type='submit' onClick={onClickJoin}>회원가입</Button>
    //                   </Col>
    //                 </Row>
    //               </Form>
    //             </CardBody>
    //           </Card>
    //           <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
    //             <CardBody className="text-center">
    //               <div>
    //                 <h2>로그인</h2>
    //                 <p>로그인을 하세요!</p>
    //                 <Link to="/login">
    //                   <Button color="primary" className="mt-3" active tabIndex={-1}>Join</Button>
    //                 </Link>
    //               </div>
    //             </CardBody>
    //           </Card>
    //         </CardGroup>
    //       </Col>
    //     </Row>
    //   </Container>
      
       
    )
}

export default Register;