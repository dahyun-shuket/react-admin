import React, {useEffect, useState, useCallback} from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
} from "reactstrap";


import axios from "axios";


const thead = ["제목", "내용", "작성일", "수정일"];
const urlList = 'http://localhost:3000/api/notice/list';


const CuntryDetailTest = (props) => {
  // const [posts, setPosts] = useState([]);
  // const [result, setResult] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  //보기모달
  const [viewModal, setViewModal] = useState(false);
  const viewToggle = () => setViewModal(!viewModal);
  //수정모달
  const [editModal, setEditModal] = useState(false);
  const editToggle = () => setEditModal(!editModal);
  const [editData, setEditData] = useState(null);
  // input
  const [SUBJECT, setSUBJECT] = useState('');
  const [CONTENT, setCONTENT] = useState('');
  const [SEQ, setSEQ] = useState('');
  const [CREATED, setCREATED] = useState('');
  const [MODIFIED, setMODIFIED] = useState('');





  // const stateRefresh = async () => {
  //   setInterval(() => {
  //     setRefresh((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
  //   }, 20);
  //   const result = await axios.post(urlList);
  //   setResult(result.data.data.list);
  // }

// reset
// const resetInput = () => {
//   toggle();
//   setSUBJECT('');
//   setCONTENT('');
// }
const resetEdit = () => {
editToggle();
setSUBJECT('');
setCONTENT('');
}

// 삭제 delete
const removeTable = (SEQ) => {
const urlRemove = `http://localhost:3000/api/notice/remove`
if(window.confirm('삭제하시겠습니까?')) {
  axios.post(urlRemove, {SEQ:SEQ})
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
    setRefresh(oldkey => oldkey +1);
  })
}
}
// 수정하기전 정보 가지고 오는 모달
const editChange = (SEQ) => {
editToggle();
const urlGet = `http://localhost:3000/api/notice/get`;
const urlEdit = `http://localhost:3000/api/notice/update`;
axios.post(urlGet, {SEQ:SEQ, SUBJECT:SUBJECT, CONTENT:CONTENT})
  .then((res) => {
    console.log('get:  ', res)
    setSEQ(res.data.data.SEQ)
    setSUBJECT(res.data.data.SUBJECT)
    setCONTENT(res.data.data.CONTENT)

  });
}
// 수정하기
const editTable = (data) => {
editToggle();
const urlEdit = `http://localhost:3000/api/notice/update`;

axios.post(urlEdit, {SEQ:SEQ, SUBJECT:SUBJECT, CONTENT:CONTENT})
  .then((res) => {
    console.log('updata:  ',res);
    if(res.data.result === 'success') {
      alert('수정 성공')
      // 새로고침
      // window.location.reload();
    } else if(res.data.result === 'fail') {
      alert('수정 실패')
      return;
    }
    setRefresh(oldkey => oldkey +1);
  })

}
// 자세히 보기 
const viewClick = (SEQ) => {
viewToggle();
const urlView = `http://localhost:3000/api/notice/view`;
axios.post(urlView, {SEQ:SEQ, SUBJECT:SUBJECT ,CONTENT:CONTENT })
  .then((res) => {
    setSUBJECT(res.data.data.SUBJECT)
    setCONTENT(res.data.data.CONTENT)
  })
}

// const CuntryDetail = (props) => {
  
//   return(
//     <tr key={SEQ} >
//       <td  style={{cursor:'pointer'}}>{SUBJECT}</td>
//       <td  style={{cursor:'pointer'}}>{CONTENT}</td>
//       <td>{CREATED}</td>
//       <td>{MODIFIED}</td>
//       <td><p  style={{display:'block', cursor:'pointer'}}>수정</p></td>
//       <td><p  style={{display:'block', cursor:'pointer'}}>삭제</p></td>
//     </tr>
                 
                
//   )
// }

// const { SEQ, SUBJECT, CONTENT, CREATED, MODIFIED } = props;

  return (
    <>
    {/* { loading &&
      <div> loading... </div>
    } */}
    
      
        
          <tr key={props.SEQ} >
            <td onClick={(e) => viewClick(props.SEQ)} style={{cursor:'pointer'}}>{props.SUBJECT}</td>
            <td onClick={(e) => viewClick(props.SEQ)} style={{cursor:'pointer'}}>{props.CONTENT}</td>
            <td>{props.CREATED}</td>
            <td>{props.MODIFIED}</td>
            <td><p  onClick={(e) => editChange(props.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
            <td><p onClick={(e) => removeTable(props.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
          </tr>
        
      
      
   
    {/* 수정모달 */}
    <Modal isOpen={editModal} toggle={editToggle} backdrop={false} >
        <ModalHeader charCode="X" toggle={editToggle}>목록 수정</ModalHeader>
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
        <ModalHeader charCode="X" toggle={viewToggle}></ModalHeader>
        <ModalBody>
          <p >{SUBJECT}</p>
          <p>{CONTENT}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary"  onClick={viewToggle}>닫기</Button>
        </ModalFooter>
      </Modal>
   </>
  );
}

export default CuntryDetailTest;