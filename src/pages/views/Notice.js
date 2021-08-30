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
// import CuntryDetailTest from "../../components/Customer";



const thead = ["제목", "내용", "수정일"];
const urlList = 'http://localhost:3000/api/notice/reactlist';


const NoticeTables = ({props}) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [totalCount, setTotalCount] = useState("");
    
    const [SUBJECT, setSUBJECT] = useState('');
    const [CONTENT, setCONTENT] = useState('');
    const [active, setActive] = useState('');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    

    let selectOptions = [
      {value: '' , label: '전체 검색'},
      {value: SUBJECT , label: '제목 검색'},
      {value: CONTENT , label: '내용 검색'},
    ];
    // console.log('SUBJECT ?? '+JSON.stringify(selectOptions));

    const onChange = (value) => { 
      // 콜백 함수 정의 
      setActive(value);
      console.log('value ? ? ?' +value)
  }

    const noticeLists = async () => {
      setLoading(true);
      axios.post(urlList)
        .then((res) => {
          setPosts(res.data.data.list);
          setTotalCount(res.data.data.totalCount);
          setLoading(false)
        });
    };
    
    useEffect(() => {
      noticeLists();
    }, [refresh]);

    // 검색 버튼
    const SearchButton = () => {
      setLoading(true);
      axios.post("http://localhost:3000/api/notice/reactlist",{
          CONTENT: CONTENT,
          SUBJECT: SUBJECT,
          // active: active,
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
    axios.post("http://localhost:3000/api/notice/reactlist")
        .then((res) => {
        setPosts(res.data.data.list);
        setTotalCount(res.data.data.list);
        setLoading(false);
        setRefresh(oldkey => oldkey +1);
    });
};

    const searchOnchange = ( res, value ) => {
      // { target: { value } }) => setPosts(value)
      
      setSUBJECT(value) 
      setCONTENT(value) 
     
    }

    // 생성 추가
    const createChange = () => {
      toggle();
      axios.post('http://localhost:3000/api/notice/create', {SUBJECT: SUBJECT, CONTENT:CONTENT})
        .then((data) => {
          console.log('data:  ', data)
          if(data.data.result === 'success') {
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

    if (loading) {
      return <h2>Loading...</h2>;
  }
  
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
                                  <Select
                                    className="react-select primary"
                                    classNamePrefix="react-select"
                                    value={selectOptions.find(op => { // choice state에 따라 디폴트 option 세팅 
                                    return op.value === active })} 
                                    placeholder="선택해주세요." 
                                    onChange={(value) => { onChange(value); }} options={selectOptions}
                                  />
                                  {/* <Input type='select' value={SUBJECT || CONTENT} >
                                      <option value={SUBJECT || CONTENT}>전체 검색</option>
                                      <option value={SUBJECT}>제목 검색</option>
                                      <option value={CONTENT}>내용 검색</option>
                                  </Input> */}
                                </Col>
                                <Col md='7'>
                                    <InputGroup className="no-border">
                                      {/* ({ target: { value } }) => setName(value) */}
                                      <Input  placeholder="Search..." id='searchInput'  onChange={ ( {target: {value}} ) => setCONTENT(value)   } />
                                    </InputGroup>
                                </Col>
                                <Col md='3' style={{border:'1px solid yellow'}}>
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
        <ModalHeader charCode="X" toggle={toggle}>목록 추가</ModalHeader>
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