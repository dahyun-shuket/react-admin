import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, UncontrolledTooltip,Modal,ModalHeader,ModalBody,
  ModalFooter, CardTitle, Table, Row, Col, CardFooter, Label, InputGroup, FormGroup, Input } from "reactstrap";
import Select from "react-select";
import axios from "axios";
import moment from "moment";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";

const thead = ["제목","작성자", "수정일"];


function NoticeList({ posts, loading, props }) {



  const [SUBJECT, setSUBJECT] = useState('');
  const [CONTENT, setCONTENT] = useState('');
  const [SEQ, setSEQ] = useState('');
  //보기모달
  const [viewModal, setViewModal] = useState(false);
  const viewToggle = () => setViewModal(!viewModal);
  //수정모달
  const [editModal, setEditModal] = useState(false);
  const editToggle = () => setEditModal(!editModal);

  
  // 클릭 보기
  const viewClick = (SEQ) => {
    viewToggle();
    const urlView = `http://localhost:3000/api/notice/view`;
    axios.post(urlView, {SEQ:SEQ, SUBJECT:SUBJECT ,CONTENT:CONTENT })
      .then((res) => {
        setSUBJECT(res.data.data.SUBJECT)
        setCONTENT(res.data.data.CONTENT)
      });
  };

  // 수정하기전 정보 가지고 오는 모달
const editChange = (SEQ) => {
  editToggle();
  const urlGet = `http://localhost:3000/api/notice/get`;
  axios.post(urlGet, {SEQ:SEQ, SUBJECT:SUBJECT, CONTENT:CONTENT})
    .then((res) => {
      console.log('get:  ', res)
      console.log('seq', res.data.data.SEQ)
      setSEQ(res.data.data.SEQ)
      setSUBJECT(res.data.data.SUBJECT)
      setCONTENT(res.data.data.CONTENT)
  
    });
  }
  // 수정하기
  const editTable = (data) => {
  editToggle();
  const urlEdit = `http://localhost:3000/api/notice/update`;
  
  axios.post(urlEdit, {SEQ:SEQ, SUBJECT:SUBJECT, CONTENT:CONTENT, key: secrectKey.secretKey}, {headers: 
    {
        'contentType': 'application/json',
        'User-Agent': 'DEVICE-AGENT',
        'userAgent': 'DEVICE-AGENT',
        'Authorization': getCookie('xToken')
    }
})
    .then((res) => {
      console.log('updata:  ',res);
      if(res.data.result === 'success') {
        alert('수정 성공')
        // 새로고침
        window.location.reload();
      } else if(res.data.result === 'fail') {
        alert('수정 실패')
        return;
      }
    })
  
  }

  const resetEdit = () => {
    editToggle();
    setSUBJECT('');
    setCONTENT('');
    }
    
    // 삭제 delete
    const removeTable = (SEQ) => {
    const urlRemove = `http://localhost:3000/api/notice/remove`
    if(window.confirm('삭제하시겠습니까?')) {
      axios.post(urlRemove, {SEQ:SEQ, key: secrectKey.secretKey}, {headers: 
        {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
    })
      // .then((data) => {console.log(data)})
      .then((data) => {
        if(data.data.result === 'success') {
          console.log(data.data.result)
          alert('목록 삭제 성공')
          window.location.reload();
        } else if(data.data.result === 'fail') {
          alert('목록 삭제 실패')
          return;
        }
      })}
    }
    

    

    return (
        <>
           
        {posts && posts.map((post) => {
          return (
          <tr key={post.SEQ} >
            {/* <td>{post.SEQ}</td> */}
            <td onClick={(e) => viewClick(post.SEQ)} style={{cursor:'pointer'}}>{post.SUBJECT}</td>
            <td>{post.LOGINID}</td>
            {/* <td onClick={(e) => viewClick(post.SEQ)} style={{cursor:'pointer'}}>{post.CONTENT}</td> */}
            {/* <td>{moment(post.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</td> */}
            <td>{moment(post.MODIFIED).format("YYYY-MM-DD hh:mm")}</td>
            <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
            <td><p onClick={(e) => removeTable(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
          </tr>
          );
        })}
                  
                  
              
        {/* 수정모달 */}
      <Modal isOpen={editModal} toggle={editToggle} backdrop={false} >
          <ModalHeader>목록 수정</ModalHeader>
          <ModalBody>
            <Input type='hidden' value={SEQ} name="SEQ" onChange={(e) => setSEQ(e.target.value)} />
            <FormGroup>
              <Label>제목을 입력하세요</Label>
              <Input value={SUBJECT} name='SUBJECT' onChange={(e) => setSUBJECT(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label>내용을 입력하세요</Label>
              <Input  value={CONTENT} name='CONTENT' onChange={(e) => setCONTENT(e.target.value)} type="textarea" />
            </FormGroup>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={(e) => editTable(e.target.value)}>수정</Button>{' '}
            <Button color="secondary"  onClick={resetEdit}>닫기</Button>
          </ModalFooter>
        </Modal>
        {/* 보기모달 */}
        <Modal isOpen={viewModal} toggle={viewToggle} backdrop={false} >
          <ModalHeader></ModalHeader>
          <ModalBody>
            <p >{SUBJECT}</p>
            <p dangerouslySetInnerHTML={{__html:CONTENT}}></p>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary"  onClick={viewToggle}>닫기</Button>
          </ModalFooter>
        </Modal>  
      </>

      
    );
}

export default NoticeList;
