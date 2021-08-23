import React, {useEffect, useState, useRef, useMemo} from "react";
import { Button, Card, CardHeader, CardBody, UncontrolledTooltip,Modal,ModalHeader,ModalBody,
  ModalFooter, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
import Select from "react-select";

import PanelHeader from "../../templates/PanelHeader";


import axios from "axios";


import Paging from "../../components/Paging";
import NoticeList from "./NoticeList";
import CuntryDetailTest from "../../components/Customer";



const thead = ["제목", "내용", "작성일", "수정일"];
const urlList = 'http://localhost:3000/api/notice/list';


const NoticeTables = (props) => {

    const [posts, setPosts] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(11);
    const [SUBJECT, setSUBJECT] = useState('');
    const [CONTENT, setCONTENT] = useState('');

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const noticeLists = async () => {
      setLoading(true);
      axios.post(urlList)
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false)
        });
    };
    
    useEffect(() => {
      noticeLists();
    }, [refresh]);
    // 검색 버튼
    const SearchButton = async () => {
      setLoading(true);
      axios.post("http://localhost:3000/api/notice/list",{
          SUBJECT: SUBJECT,
      })
          .then((response) => {
          setPosts(response.data.data.list);
          setLoading(false);
      });
  };
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
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
      return <h2>Loading...</h2>;
  }
  
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
    
      <Row >
          <Col md="12" >
            <Card >
              <CardHeader>
                <CardTitle tag="h4">Sample Table<Button color="info" size="sm" onClick={toggle} >추가</Button></CardTitle>
                  <Col md='10'>
                      <InputGroup className="no-border">
                          <Input  placeholder="Search..." value={SUBJECT} onChange={({ target: { value } }) => setSUBJECT(value)} />
                          <Button  onClick={SearchButton} className='btn-info'>검색</Button>
                      </InputGroup>
                  </Col>
              </CardHeader>
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
                <Paging postsPerPage={postsPerPage}
                  totalPosts={posts.length}
                  paginate={paginate}>
                </Paging>
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
            <Input value={SUBJECT || ''} name='SUBJECT' onChange={(e) => setSUBJECT(e.target.value)} />
          </FormGroup>

          <FormGroup>
            <Label>내용을 입력하세요</Label>
            <Input  value={CONTENT || ''} name='CONTENT' onChange={(e) => setCONTENT(e.target.value)} type="textarea" />
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