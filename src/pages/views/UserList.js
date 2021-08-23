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

import axios from "axios";
import moment from "moment";

const thead = ["아이디", "구분", "생성일", "수정일"];

const UserList = ({props, posts, loading, Aposts, Mposts, Uposts}) => {


    // users
    const [SEQ, setSEQ] = useState('');
    const [LOGINID, setLOGINID] = useState('');
    const [PWD, setPWD] = useState('');
    const [USERTYPE, setUSERTYPE] = useState('');
    // modal
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


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
        if(res.data.result === 'success') {
          alert('수정 성공')
          window.location.reload();
        } else if(res.data.result === 'fail') {
          alert('수정 실패')
          return;
        }
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
          window.location.reload();
            if(data.data.result === 'success') {
                console.log('성공 result:  ', data.data.result)
                alert('유저 삭제 성공')
                window.location.reload();
            } else if (data.data.result === 'fail') {
                alert('유저 삭제 실패')
            }
        })
    }
}
    



  return (      
    <>
      {/* {posts.map((post) => 
      {
      if(post.USERTYPE === 'A') {
          return (
              <tr key={post.SEQ} >
          <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
          <td style={{cursor:'pointer'}}>{post.USERTYPE}관리자</td>
          <td>{post.CREATED}</td>
          <td>{post.MODIFIED}</td>
          <td><p style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
          <td><p  style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
          </tr>

          );
      }
        else if(post.USERTYPE === 'M') {
          return (
              <tr key={post.SEQ} >
          <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
          <td style={{cursor:'pointer'}}>{post.USERTYPE}마트관리자</td>
          <td>{post.CREATED}</td>
          <td>{post.MODIFIED}</td>
          <td><p style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
          <td><p  style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
          </tr>

          );
      } else if(post.USERTYPE === 'U') {
        return (
            <tr key={post.SEQ} >
        <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
        <td style={{cursor:'pointer'}}>{post.USERTYPE}구직자</td>
        <td>{post.CREATED}</td>
        <td>{post.MODIFIED}</td>
        <td><p style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
        <td><p  style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
        </tr>

        );
    }
      
      }
      )} */}


         {Aposts && Aposts.map((post) => {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE} 관리자</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          )
          } 
        )} 

        {Mposts && Mposts.map((post) => {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE} 마트관리자</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          )
          } 
        )} 

        {Uposts && Uposts.map((post) => {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE} 구직자</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          )
          } 
        )} 
        

  {/* {posts && posts.map((post) => {
        if(USERTYPE === 'A') {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE}</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          );
        } else if(USERTYPE === 'M') {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE}</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          );
        } else if(USERTYPE === 'U') {
          return (
            <tr key={post.SEQ} >
              <td >{post.LOGINID}</td>
              <td>{post.USERTYPE}</td>
              <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
              <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
              <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>
          );
        }
        }
          
      )} */}



      

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


export default UserList;
