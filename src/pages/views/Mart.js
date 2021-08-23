import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardFooter, InputGroup, Form, Table, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter,
  } from "reactstrap";
  import PanelHeader from "../../templates/PanelHeader";
  import { post } from 'axios';
  import MartList from './MartList';
  import Paging from "../../components/Paging";

  const thead = ["마트명", "마트로고","사업자번호", "주소","연락처", "작성일", "수정일"];
  let urlList = `http://localhost:3333/api/mart/list`;

const Mart = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const [NAME, setNAME] = useState('');
    const [ADDRESS, setADDRESS] = useState('');

    const [refresh, setRefresh] = useState(0);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    // 마트 리스트 데이터 리스트
    const martLists = async () => {
      setLoading(true);
      axios.post(urlList)
        .then((res) => {
          setPosts(res.data.data.list);
          setLoading(false);
        })

    }
  

    useEffect(() => {
      martLists();
    }, [refresh]);






    // 검색하기
    const SearchButton = async () => {
      setLoading(true);
      axios.post("http://localhost:3333/api/mart/list",{
          NAME: NAME,
      })
          .then((response) => {
          setPosts(response.data.data.list);
          setLoading(false);
      });
  };

  // 생성 추가
  const createChange = () => {
    toggle();
    axios.post('http://localhost:3333/api/mart/create', {NAME: NAME, ADDRESS:ADDRESS})
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
  setNAME('');
  setADDRESS('');
}
// 검색 리셋
const MartSearchReset = () => {
  // setLoading(true);
  setNAME.value('');
  window.location.reload();
  axios.post("http://localhost:3333/api/mart/list")
      .then((response) => {
      setNAME('');
      setPosts(response.data.data.list);
      // setLoading(false);
  });
}

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
      return <h2>Loading...</h2>;
  }


    const mediaUrl = 'C:/Users/yydh5/OneDrive/문서/mart-recruit-api/PDSData/uploads/undefined/';
    return (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col xs={12}>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">마트 관리
                    <button onClick={toggle} >추가</button>
                    </CardTitle>
                  </CardHeader>

                  <CardBody >
                  <Row>
                    <Col className="pr-1" md="9">
                    <InputGroup className="no-border">
                          <Input  placeholder="Search..." value={NAME} onChange={({ target: { value } }) => setNAME(value)} />
                          <Button  onClick={SearchButton} className='btn-info'>검색</Button>
                          <Button className='btn-info' onclick={MartSearchReset}>조건 리셋</Button>
                      </InputGroup>
                    </Col>
                  </Row>
                  </CardBody>
                  
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
                        <MartList posts={currentPosts}></MartList>
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
                <Input value={NAME || ''} name='NAME' onChange={(e) => setNAME(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <Label>내용을 입력하세요</Label>
                <Input  value={ADDRESS || ''} name='ADDRESS' onChange={(e) => setADDRESS(e.target.value)} type="textarea" />
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

export default Mart;