import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardTitle, CardFooter, InputGroup, Form, Table, Row, Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter,
  } from "reactstrap";
  import PanelHeader from "../../templates/PanelHeader";
  import { post } from 'axios';
  import MartList from './MartList';
  import Pagination from "rc-pagination";

  const thead = ["마트명", "마트로고","사업자번호", "주소","연락처", "작성일", "수정일"];
  let urlList = `http://localhost:3000/api/mart/list`;

const Mart = (props) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(2);
    const [totalCount, setTotalCount] = useState("");
    const [NAME, setNAME] = useState('');
    const [ADDRESS, setADDRESS] = useState('');
    const [RENGO, setRENGO] = useState('');

    const [refresh, setRefresh] = useState(0);

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    
    // 마트 리스트 데이터 리스트
    const martLists = async () => {
      setLoading(true);
      axios.post(urlList)
        .then((res) => {
          setPosts(res.data.data.list);
          setTotalCount(res.data.data.totalCount);
          setLoading(false);
          console.log('몇개인지 테스트', res.data.data.totalCount)
        })
    }
  

    useEffect(() => {
      martLists();
    }, [refresh]);

    const stateRefresh = async () => {
      setInterval(() => {
        setLoading((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
      }, 20);
      const result = await axios.post('http://localhost:3000/api/mart/reactlist');
      setPosts(result.data.data.list);
    }




    // 검색하기
    const SearchButton = async () => {
      setLoading(true);
      axios.post("http://localhost:3000/api/mart/reactlist",{
          NAME: NAME,
          RENGO: RENGO,
      })
          .then((res) => {
          setPosts(res.data.data.list);
          setTotalCount(res.data.data.totalCount);
          setLoading(false);
          console.log('검색 갯수', res.data.data.totalCount)
      });
  };

  // 생성 추가
  const createChange = () => {
    toggle();
    axios.post('http://localhost:3000/api/mart/create', {NAME: NAME, ADDRESS:ADDRESS})
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
  setRENGO('');
}
const MartSearchReset = async () => {
  setLoading(true);
  axios.post(urlList)
    .then((res) => {
      setPosts(res.data.data.list);
      setLoading(false);
      setNAME('');
      setRefresh(oldkey => oldkey +1);
    })
};
    // const indexOfLastPost = currentPage * postsPerPage;
    // const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // const currentPosts = (posts !== null) ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];
    // const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts != null ? posts.slice(indexOfFirstPost, indexOfLastPost) : [];

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
                    {/* <button onClick={toggle} >추가</button> */}
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
                        <MartList posts={currentPosts}  ></MartList>
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                  <Pagination className="ant-pagination d-flex justify-content-center" total={totalCount} current={currentPage} pageSize={postsPerPage} onChange={(page) => {setCurrentPage(page); console.log('totalCount',totalCount)}} />
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