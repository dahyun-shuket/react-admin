import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {Card,CardBody,CardHeader,InputGroup,CardTitle,CardFooter,Table,Form,Row,Col,Modal,ModalHeader,ModalBody,Input,FormGroup,Label,ModalFooter,TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText,
} from "reactstrap";

// core components
import PanelHeader from "../../templates/PanelHeader";
import axios from "axios";
import Paging from "../../components/Paging";
import UserList from "./UserList";

const thead = ["아이디", "구분", "생성일", "수정일"];


const RegularTables = ({props}) => {

    const [posts, setPosts] = useState([]);
    const [test, setTest] = useState([]);
    const [refresh, setRefresh] = useState(0);
    // users
    const [SEQ, setSEQ] = useState('');
    const [LOGINID, setLOGINID] = useState('');
    const [PWD, setPWD] = useState('');
    const [USERTYPE, setUSERTYPE] = useState('');
    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [createModal , setCreateModal] = useState(false);
    const createToggle = () => setCreateModal(!createModal);

    // Tab
    const [activeTab, setActiveTab] = useState('1');
    const toggleTab = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
    // 페이지
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(11);

    const url = 'http://localhost:3333/api/users/list';

    const AdminType = async () => {
      setLoading(true);
      axios.post(url, {
        USERTYPE: 'A'
      })
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false);
        })
    }
    const MartType = async () => {
      setLoading(true);
      axios.post(url, {
        USERTYPE: 'M'
      })
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false);
        })
    }
    const UserType = async () => {
      setLoading(true);
      axios.post(url, {
        USERTYPE: 'U'
      })
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false);
        })
    }

    useEffect(() => {
      AdminType()

    }, [refresh])

    const ResumetList = async () => {
      setLoading(true);
      axios.post("http://localhost:3333/api/users/list")
          .then((response) => {
          setPosts(response.data.data.list);
          setLoading(false);
          setRefresh(oldkey => oldkey +1);
      });
  };
  function getRegions() {
    const query = 'input[name="USERTYPE"]:checked';
    const selectedEls = document.querySelectorAll(query);
    var checkRegion = "";
    selectedEls.forEach((el) => {
        checkRegion += el.value + ',';
    });
    if (checkRegion.length > 0) checkRegion = checkRegion.substring(0, checkRegion.length - 1);
    return checkRegion;
}

    // 검색 버튼
    const SearchButton = async () => {
      setLoading(true);
      axios.post("http://localhost:3333/api/users/list",{
          LOGINID: LOGINID,
          USERTYPE: getRegions()
      })
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false);
        })
      //     .then((res) => {
      //       if(posts.USERTYPE === 'A') {
      //         console.log('A 검색 성공')
      //         setPosts(res.data.data.list) 
      //       } else if (posts.USERTYPE === 'M') {
      //         console.log('M 검색 성공')
      //         setPosts(res.data.data.list)
      //       } else if (posts.USERTYPE === 'U') {
      //         console.log('U 검색 성공')
      //         setPosts(res.data.data.list)
      //       }
      //       setLoading(false);
      // });
  };

  // 추가 모달
  const createChange = () => {
    createToggle();
    axios.post('http://localhost:3333/api/users/idCheck', {LOGINID:LOGINID})
    .then((res) => {
      if(res.data.data.tf === true) {
        axios.post('http://localhost:3333/api/users/create', {USERTYPE:USERTYPE, LOGINID:LOGINID, PWD:PWD})
        .then((data) => {
          console.log('crate: ',data)
          console.log('usertype:  ', USERTYPE);
          if(data.data.result === 'success') {
            alert('사용자 추가 완료')
          } else if(data.data.result === 'fail') {
            alert('사용자 생성 실패')
            return;
          }
          setRefresh(oldkey => oldkey +1);
        })
        .catch((err) => {
          alert(err, '유저 생성 실패')
        })
      } else {
        alert('중복된 아이디가 존재합니다.');
        return false;
      }
    })
    .catch((err) => {
      alert(err, '아이디 체크 에러')
    })
      resetCreate();
  }
  // 추가 이벤트
  const handleChange = (e, type) => {
    const value = e.target.value;
    if(type === 'userType') {
      setUSERTYPE(value);
      console.log(value);
      console.log('유저 타입 설정')
    }
  }

  // 추가 모달 리셋
  const resetCreate = () => {
    createToggle();
    setLOGINID('');
    setPWD('');
  }

  

  

  const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
      return <h2>Loading...</h2>;
  }


  return (
    <>
      <PanelHeader size="sm" />
      <div style={{border:'1px solid red', marginBottom:'40px'}}>
      <Row>
                <Col md="10" className='text'>
                    <Card>
                        <CardBody>
                            <Row>
                                <Label sm="2">유저 구분</Label>
                                <Col className="checkbox-radios" sm={10}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox" name="USERTYPE" value='A' />
                                            <span className="form-check-sign" />
                                            관리자
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="USERTYPE" value='M' />
                                            <span className="form-check-sign" />
                                            마트관리자
                                        </Label>
                                        <Label check>
                                            <Input type="checkbox" name="USERTYPE" value='U'/>
                                            <span className="form-check-sign" />
                                            구직자
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Label md="2">아이디</Label>
                                <Col md='10'>
                                    <InputGroup className="no-border">
                                        <Input  placeholder="Search..." value={LOGINID} onChange={({ target: { value } }) => setLOGINID(value)} />
                                    </InputGroup>
                                </Col>
                                <Label md="2">상태</Label>
                                <Col md='10'>

                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button className='btn-info' onClick={SearchButton}>검색</Button>
                            <Button className='btn-info' onClick={ResumetList}>조건 리셋</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
      </div>

      <div className="content">
      <Nav xs={12} tabs style={{cursor:'pointer'}}>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '1' })}
            onClick={() => { toggleTab('1'); }}
            onChange={AdminType}
          >
            <NavLink onClick={AdminType}>관리자</NavLink>
          </NavLink>
        </NavItem>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '2' })}
            onClick={() => { toggleTab('2')}}
            onChange={MartType}
          >
            <NavLink onClick={MartType}>마트관리자</NavLink>
            
          </NavLink>
        </NavItem>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '3' })}
            onClick={() => { toggleTab('3'); }}
            onChange={UserType}
          >
            <NavLink onClick={UserType}>구직자</NavLink>
            
          </NavLink>
        </NavItem>
        <button onClick={createToggle}>추가</button>
      </Nav>

      {/* 컨텐츠 시작 */}
      <TabContent activeTab={activeTab}>
        <TabPane  tabId="1">
            <Row>
                <Col xs={12}>
                    <Card>
                    <CardBody>
                        <Table responsive>
                        <thead className="text-primary">
                            <tr>
                            {thead.map((prop, key) => {
                                if (key === thead.length - 1)
                                return (
                                    <th key={key} className="text-right">
                                    {prop}
                                    </th>
                                );
                                return <th key={key}>{prop}</th>;
                            })}
                            </tr>
                        </thead>
                        <tbody>
                          <UserList posts={currentPosts}></UserList>
                        </tbody>
                        

                        </Table>
                      </CardBody>
                      <CardFooter>
                        
                      </CardFooter>
                    </Card>
                </Col>
            </Row>
          </TabPane>


           <TabPane tabId="2" >
            <Row>
                <Col xs={12}>
                    <Card>
                      <CardBody>
                          <Table responsive>
                          <thead className="text-primary">
                              <tr>
                              {thead.map((prop, key) => {
                                  if (key === thead.length - 1)
                                  return (
                                      <th key={key} className="text-right">
                                      {prop}
                                      </th>
                                  );
                                  return <th key={key}>{prop}</th>;
                              })}
                              </tr>
                          </thead>
                          <tbody>
                          <UserList posts={currentPosts}></UserList>
                        </tbody>
                          </Table>
                      </CardBody>
                      <CardFooter>
                        
                      </CardFooter>
                    </Card>
                </Col>
            </Row>
          </TabPane> 


          <TabPane tabId="3">
            <Row>
                <Col xs={12}>
                    <Card>
                    <CardBody>
                        <Table responsive>
                        <thead className="text-primary">
                            <tr>
                            {thead.map((prop, key) => {
                                if (key === thead.length - 1)
                                return (
                                    <th key={key} className="text-right">
                                    {prop}
                                    </th>
                                );
                                return <th key={key}>{prop}</th>;
                            })}
                            </tr>
                        </thead>
                        <tbody>
                          <UserList posts={currentPosts}></UserList>
                        </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                  
                      </CardFooter>
                    </Card>
                </Col>
            </Row>
          </TabPane> 
          <Paging postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}>
                </Paging>
      </TabContent>
    </div>
      {/* 생성모달 */}
      <Modal isOpen={createModal} toggle={createToggle} backdrop={false} >
      <ModalHeader charCode="X" toggle={createToggle}>사용자 추가</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>아이디를 입력하세요</Label>
          <Input  name='LOGINID' onChange={(e) => setLOGINID(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>비밀번호를 입력하세요</Label>
          <Input  name='PWD' onChange={(e) => setPWD(e.target.value)} />
        </FormGroup>

        <FormGroup>
          <Label>유저 타입을 선택하세요</Label>

          <Input type='select' name='USERTYPE' value={USERTYPE} onChange={e => handleChange(e, 'userType')}>
            <option name="" value={''}>선택하세요</option>
            <option name="A" value={'A'}>관리자</option>
            <option name="M" value={'M'}>마트관리자</option>
            <option name="U" value={'U'}>구직자</option>
          </Input>
        </FormGroup>

      </ModalBody>
      <ModalFooter>
        <Button color="primary"  onClick={createChange}>추가</Button>{' '}
        <Button color="secondary"  onClick={resetCreate}>닫기</Button>
      </ModalFooter>
    </Modal>                      
    
    </>
  );

  
}


export default RegularTables;
