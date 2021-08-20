import React, { useEffect, useState, useCallback } from "react";

// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table,
  Form,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  FormGroup,
  Label,
  ModalFooter,
  TabContent, TabPane, Nav, NavItem, NavLink, Button, CardText,
} from "reactstrap";

// core components
import PanelHeader from "../../templates/PanelHeader";
import axios from "axios";
import Paging from "./Paging";
// import ReactPaginate from "react-paginate";
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
    const [postsPerPage] = useState(10);

    const url = 'http://localhost:3333/api/users/list';

    useEffect(() => {
              setLoading(true);
        axios.post(url,{USERTYPE: 'A'})
            .then((data) => {
              // if(data.data.data === 'A') {
              //   setPosts(data.data.data)
              // } else if(data.data.data === 'M') {
              //   setPosts(data.data.data) 
              // } else if(data.data.data === 'U') {
              //   setPosts(data.data.data)
              // }
              setPosts(data.data.data.list)
              console.log(data.data.data.list)
              console.log(data.data.data.list === 'A')

              console.log('test:  ',data)
              setLoading(false);
            })
    }, [refresh]);

    // 페이지
    const indexOfLast = currentPage * postsPerPage;
    const indexOfFirst = indexOfLast - postsPerPage;
    function currentPosts(posts) {
      let currentPosts = 0;
      currentPosts = posts.slice(indexOfFirst, indexOfLast);
      return currentPosts;
    }
    // const AdminTest = () => {
    //   axios.post(url)
    //     .then((data) => {
    //       if(posts.USERTYPE === 'A') {
    //         setPosts(data.data.data)
    //       } else if(posts.USERTYPE === 'M') {
    //         setPosts(data.data.data) 
    //       } else if(posts.USERTYPE === 'U') {
    //         setPosts(data.data.data)
    //       }
    //     })
    // }


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


    // 수정하기전 가져오기 GET
    const editChange = (SEQ) => {
      toggle();
      const urlGet = `http://localhost:3333/api/users/get`;
      axios.post(urlGet, {SEQ:SEQ, LOGINID:LOGINID})
        .then((res) => {
          console.log('get:  ', res)
          setSEQ(res.data.data.SEQ)
          setLOGINID(res.data.data.LOGINID)
        })
    }

    // 수정 
    const editUser = () => {
      toggle();
      const urlUpdate = `http://localhost:3333/api/users/update`;
      axios.post(urlUpdate, {SEQ:SEQ, LOGINID:LOGINID, PWD:PWD})
        .then((res) => {
          console.log('update:  ', res)
          if(res.data.data.result === 'success') {
            alert('수정 성공')
          } else if(res.data.data.result === 'fail') {
            alert('수정 실패')
            return;
          }
          setRefresh(oldkey => oldkey +1);
        })
    }

    // 리셋
    const resetEdit = () => {
      toggle();
      setLOGINID('');
      setPWD('');
    }

    const removeUser = (SEQ) => {
        const urlRemove = 'http://localhost:3333/api/users/remove';
        if(window.confirm('삭제하시겠습니까?')) {
            axios.post(urlRemove, {SEQ:SEQ})
            .then((data) => {
                if(data.data.result === 'success') {
                    console.log('성공 result:  ', data.data.result)
                    alert('유저 삭제 성공')
                } else if (data.data.result === 'fail') {
                    alert('유저 삭제 실패')
                }
                setRefresh(oldkey => oldkey +1);
            })
        }
    }
  
    
    // const AdminType = (e) => {
    //   e.preventDefault();
    //   if(posts.USERTYPE === 'A') {
    //     console.log('관리자 타입')
    //   }
    // }

    const AdminTab = () => {
      setLoading(true);
      axios.post(url,{USERTYPE: 'A'})
          .then((data) => {
            setPosts(data.data.data.list)
            console.log(' 관리자 받기 성공')
            setLoading(false);
          })
    }
    const MartTab = () => {
      setLoading(true);
      axios.post(url,{USERTYPE: 'M'})
          .then((data) => {
            setPosts(data.data.data.list)
            console.log('마트 관리자 받기 성공')
            setLoading(false);
          })
    }
    const UserTab = () => {
      setLoading(true);
      axios.post(url,{USERTYPE: 'U'})
          .then((data) => {
            setPosts(data.data.data.list)
            console.log('구직자 받기 성공')
            setLoading(false);
          })
    }


  return (
    <>
      <PanelHeader size="sm" />
      <div style={{border:'1px solid red', marginBottom:'40px'}}>
        <Form xs={12}>
          <Row xs={12}>
            <Col xs={3}>
              <p>사용자 아이디</p>
            </Col>
            <Col xs={9}>
              <Label>아이디를 입력하세요.</Label>
              {/* <SearchBar type="text" search={search} onUserInput={handleUserInput} /> */}
              {/* <Input type="text" value={search} onChange={handleSearch} /> */}

              <Button >검색</Button>
  
            </Col>
          </Row>
        </Form>
      </div>

      <div className="content">
      <Nav xs={12} tabs style={{cursor:'pointer'}}>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '1' })}
            onClick={() => { toggleTab('1'); }}
          >
            <NavLink onClick={AdminTab}>관리자</NavLink>
            
          </NavLink>
        </NavItem>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '2' })}
            onClick={() => { toggleTab('2')}}
            
          >
            <NavLink onClick={MartTab}>마트관리자</NavLink>
            
          </NavLink>
        </NavItem>
        <NavItem  xs={12}>
          <NavLink
            className={({ active: activeTab === '3' })}
            onClick={() => { toggleTab('3'); }}
            
          >
            <NavLink onClick={UserTab}>구직자</NavLink>
            
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
                        
                        <UserList posts={currentPosts(posts)}  loading={loading}></UserList>

                       {/* <tbody>
                   {posts.map((post) => 
                  {
                  if(post.USERTYPE === 'A') 
                      return (
                          <tr key={post.SEQ} >
                      <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
                      <td style={{cursor:'pointer'}}>관리자</td>
                      <td>{post.CREATED}</td>
                      <td>{post.MODIFIED}</td>
                      <td><p style={{display:'block', cursor:'pointer'}}>수정</p></td>
                      <td><p  style={{display:'block', cursor:'pointer'}}>삭제</p></td>
                      </tr>

                      );
                  
                  }
                  )}
                  </tbody> */}

                        </Table>
                      </CardBody>
                      <CardFooter>
                        <Paging postsPerPage={postsPerPage}
                        
                          totalPosts={posts.length}
                          paginate={setCurrentPage}>
                        </Paging>
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
                          { loading &&
                              <div> loading... </div>
                          }
                          <UserList  posts={currentPosts(posts)}  loading={loading}></UserList>
                          </Table>
                      </CardBody>
                      <CardFooter>
                        <Paging postsPerPage={postsPerPage}
                        
                          totalPosts={posts.length}
                          paginate={setCurrentPage}>
                        </Paging>
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
                        <UserList  posts={currentPosts(posts)}  loading={loading}></UserList>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Paging postsPerPage={postsPerPage}
                        
                          totalPosts={posts.length}
                          paginate={setCurrentPage}>
                        </Paging>
                      </CardFooter>
                    </Card>
                </Col>
            </Row>
          </TabPane> 

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

      {/* 수정모달 */}
      <Modal isOpen={modal} toggle={toggle} backdrop={false} >
        <ModalHeader charCode="X" toggle={toggle}>사용자 수정</ModalHeader>
        <ModalBody>
          <Input type='hidden' value={SEQ} name="SEQ" onChange={(e) => setSEQ(e.target.value)} />
          <FormGroup>
            <Label>아이디를 입력하세요.</Label>
            <Input value={LOGINID} name='LOGINID' onChange={(e) => setLOGINID(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>비밀번호를 입력하세요.</Label>
            <Input  name='PWD' onChange={(e) => setPWD(e.target.value)} type="textarea" />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary"  onClick={(e) => editUser(e.target.value)}>수정</Button>{' '}
          <Button color="secondary"  onClick={resetEdit}>닫기</Button>
        </ModalFooter>
      </Modal>
    </>
  );

  
}


export default RegularTables;
