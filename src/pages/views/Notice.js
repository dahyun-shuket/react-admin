import React, {useEffect, useState} from "react";
import { Button, Card, CardHeader, CardBody,Modal,ModalHeader,ModalBody,
  ModalFooter, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
// import Select from "react-select";

import PanelHeader from "../../templates/PanelHeader";
import Pagination from "rc-pagination";

import axios from "axios";


// import Paging from "../../components/Paging";
import NoticeList from "./NoticeList";
import Select from "react-select";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";
// import CuntryDetailTest from "../../components/Customer";



const thead = ["제목", "작성자", "수정일"];
const urlList = 'http://localhost:3000/api/notice/reactlist';


const NoticeTables = ({props, decoded, userLoginId, userSeq}) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState("");
    
    const [SUBJECT, setSUBJECT] = useState('');
    const [CONTENT, setCONTENT] = useState('');
    const [active, setActive] = useState('');
    const [LOGINID, setLOGINID] = useState('');
    const [USER_SEQ, setUSER_SEQ] = useState('');
    const [auth, setAuth] = useState(null);

    // const [userSeq, setUserSeq] = useState('');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    const noticeLists = async () => {
      setLoading(true);
      axios.post(urlList, {key: secrectKey.secretKey}, {headers: 
        {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
    })
        .then((res) => {
          setPosts(res.data.data.list);
          setTotalCount(res.data.data.totalCount);
          setLoading(false)

        });
    };
    const authUser = () => {
      axios.post('http://localhost:3000/api/auth', {key: secrectKey.secretKey}, {
        headers: {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
    })
    .then((res) => {
      const userSeq = res.data.data;
      res.userSeq = userSeq[0]
      setAuth(res.data.data[0])
      console.log('test',res.data.data[0])
  })
  }
    useEffect(() => {
      noticeLists();
      authUser();
    }, [refresh]);

    // 검색 버튼
    const SearchButton = () => {
      setLoading(true);
      axios.post("http://localhost:3000/api/notice/reactlist",{
          CONTENT: CONTENT,
          SUBJECT: SUBJECT,
          active: active,
          key: secrectKey.secretKey
      }, {headers: 
        {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
    })
          .then((res) => {
          setPosts(res.data.data.list);
          setTotalCount(res.data.data.totalCount)
          console.log('setpost??',res.data.data.list)
          setLoading(false);
      })
          .catch((err) => {
            console.log(err)
          })
  };
  const SearchReset  = async () => {
    setLoading(true);
    axios.post("http://localhost:3000/api/notice/reactlist", {key: secrectKey.secretKey}, {headers: 
    {
        'contentType': 'application/json',
        'User-Agent': 'DEVICE-AGENT',
        'userAgent': 'DEVICE-AGENT',
        'Authorization': getCookie('xToken')
    }
})
        .then((res) => {
        setPosts(res.data.data.list);
        setTotalCount(res.data.data.list);
        setSUBJECT('');
        setLoading(false);
        setRefresh(oldkey => oldkey +1);
    });
};
    // 생성 추가
    const createChange = () => {
      toggle();
      axios.post('http://localhost:3000/api/notice/create', {
        SUBJECT: SUBJECT, 
        CONTENT:CONTENT, 
        LOGINID:LOGINID,  
        userSeq:auth,
        key: secrectKey.secretKey }, {
          headers: 
      {
          'contentType': 'application/json',
          'User-Agent': 'DEVICE-AGENT',
          'userAgent': 'DEVICE-AGENT',
          'Authorization': getCookie('xToken'),
      }
  })
        .then((data) => {
          // console.log('userSeq',userSeq);
          console.log('data:  ', data)
          if(data.data.result === 'success') {

            // setUserSeq(data.data.userSeq); 

            // const decoded = jwt_decode(data.data.token);
            // const resultUser = decoded.result[0]
            // console.log(resultUser)

            console.log('create',data.data.list)
            alert('목록 생성 성공')
          } else if(data.data.result === 'fail') {
            alert('생성 실패')
            return;
          }
          setRefresh(oldkey => oldkey +1);

        })
        .catch((error) => {
          alert(error, '목록 생성에 실패 함')
        })
        resetInput();
  }
  // reset
  const resetInput = () => {
      toggle();
      setSUBJECT('');
      setCONTENT('');
  }


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts != null ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

  //   if (loading) {
  //     return <h2>Loading...</h2>;
  // }
  
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">

      <div >

            <Row style={{justifyContent:'center', margin:'0 auto', alignItems:'center', marginBottom:'40px'}}>
                <Col md="12" className='text'>
                    <Card>
                      <CardHeader>
                        <CardTitle tag="h4">공지사항</CardTitle>
                        
                      </CardHeader>
                        <CardBody>
                            <Row>
                                <Col md='2'>
                                  <p>공지사항 검색</p>
                                </Col>
                                <Col md='7'>
                                    <InputGroup className="no-border">
                                      <Input  placeholder="Search..." id='searchInput' value={SUBJECT}  onChange={ ( {target: {value}} ) => {setSUBJECT(value)  }   } />
                                    </InputGroup>
                                </Col>
                                <Col md='3' >
                                  <Button onClick={SearchButton} className='btn-info' style={{marginRight:'10px'}}>검색</Button>
                                  <Button onClick={SearchReset} className='btn-info'>조건 리셋</Button>
                                </Col>
                            </Row>
                        </CardBody>
                        <CardFooter>
                            <Button color="info" onClick={toggle} >추가 <i class="fa fa-plus"></i></Button>
                            
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
      </div>
    
      <Row >
          <Col md="12" >
            <Card >
              {/* <CardHeader>
                <CardTitle tag="h4">Sample Table<Button color="info" size="sm" onClick={toggle} >추가</Button></CardTitle>
                  <Col md='10'>
                      <InputGroup className="no-border">
                          <Input  placeholder="Search..." id='searchInput'  onChange={({ target: { value } }) => setSUBJECT(value)} />
                          <Button  onClick={SearchButton} className='btn-info'>검색</Button>
                      </InputGroup>
                  </Col>
              </CardHeader> */}
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
                    <NoticeList posts={currentPosts}></NoticeList>
                  </tbody> 
                  
                  
                </Table>
              </CardBody>
              <CardFooter>
              <Pagination className="ant-pagination d-flex justify-content-center" total={totalCount} current={currentPage} pageSize={postsPerPage} onChange={(page) => {setCurrentPage(page); console.log('totalcount'+totalCount.length, 'currentPage'+currentPage)}} />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      
       {/* 생성모달 */}
       <Modal isOpen={modal} toggle={toggle} backdrop={false} >
        <ModalHeader>공지 사항 추가</ModalHeader>
        {/* <Input type='hidden' value={USER_SEQ} name="USER_SEQ" onChange={(e) => setUSER_SEQ(e.target.value)} /> */}
        <ModalBody>
          <FormGroup>
            <Label>제목을 입력하세요</Label>
            <Input type='text'  id='subjectInput' name='SUBJECT' onChange={(e) => setSUBJECT(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>내용을 입력하세요</Label>
            <Input  id='contentInput' name='CONTENT' onChange={(e) => setCONTENT(e.target.value)}  />
          </FormGroup>
          
        </ModalBody>
        <ModalFooter>
          <Button color="primary"  onClick={createChange}>추가</Button>{' '}
          <Button color="secondary"  onClick={resetInput}>닫기</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default NoticeTables;