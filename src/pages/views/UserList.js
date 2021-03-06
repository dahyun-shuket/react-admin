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
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";

const thead = ["아이디", "구분", "생성일", "수정일"];

const UserList = ({props, posts, types}) => {


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
    const urlGet = `http://localhost:3000/api/users/get`;
    axios.post(urlGet, {SEQ:SEQ, LOGINID:LOGINID, USERTYPE:USERTYPE, key: secrectKey.secretKey}, 
      {headers: 
        {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
      })
      .then((res) => {
        setSEQ(res.data.data.SEQ)
        setLOGINID(res.data.data.LOGINID)
        setUSERTYPE(res.data.data.USERTYPE)
      })
  }

  // 수정 
  const editUser = () => {
    toggle();
    const urlUpdate = `http://localhost:3000/api/users/update`;
    axios.post(urlUpdate, {SEQ:SEQ, LOGINID:LOGINID, PWD:PWD, USERTYPE:USERTYPE, key: secrectKey.secretKey}, 
      {headers: 
        {
            'contentType': 'application/json',
            'User-Agent': 'DEVICE-AGENT',
            'userAgent': 'DEVICE-AGENT',
            'Authorization': getCookie('xToken')
        }
      })
      .then((res) => {
        console.log('update:  ', res)
        if(res.data.result === 'success') {
          alert('수정 성공')
          // window.location.reload();
        } else if(res.data.result === 'fail') {
          alert('수정 실패')
          return;
        }
      })
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

  // 리셋
  const resetEdit = () => {
    toggle();
    setLOGINID('');
    setPWD('');
  }
  
  const removeUser = (SEQ) => {
    const urlRemove = 'http://localhost:3000/api/users/remove';
    if(window.confirm('삭제하시겠습니까?')) {
        axios.post(urlRemove, {SEQ:SEQ, key: secrectKey.secretKey}, 
          {headers: 
            {
                'contentType': 'application/json',
                'User-Agent': 'DEVICE-AGENT',
                'userAgent': 'DEVICE-AGENT',
                'Authorization': getCookie('xToken')
            }
          })
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
   

          {/* {posts && posts.map((post) => {
            return (
              <tr key={post.SEQ} >
                <td >{post.LOGINID}</td>
                <td>{post.USERTYPE}</td>
                <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
                <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
                <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
                <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
              </tr>
            )
            } 
          )}  */}

          {posts && posts.filter(post => post.USERTYPE === types).map((post) => {
            return (
              <tr key={post.SEQ} >
                <td >{post.LOGINID}</td>
                {
                  (() => {
                    if(post.USERTYPE === 'A') return (<td>관리자</td>);
                    if(post.USERTYPE === 'M') return (<td>마트 관리자</td>);
                    if(post.USERTYPE === 'U') return (<td>구직자</td>);
                  })()
                }
                <td>{moment(post.CREATED).format('YYYY-MM-DD hh:mm:ss')}</td>
                <td>{moment(post.MODIFIED).format('YYYY-MM-DD hh:mm:ss')}</td>
                <td><p onClick={(e) => editChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
                <td><p onClick={(e) => removeUser(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
              </tr>
            )
            } 
          )} 


      

        {/* 수정모달 */}
        <Modal isOpen={modal} toggle={toggle} backdrop={false} >
          <ModalHeader>사용자 수정</ModalHeader>
          <ModalBody>
            <Input type='hidden' value={SEQ} name="SEQ" onChange={(e) => setSEQ(e.target.value)} />
            <FormGroup>
              <Label>아이디를 입력하세요.</Label>
              <Input value={LOGINID} name='LOGINID' onChange={(e) => setLOGINID(e.target.value)} />
            </FormGroup>

            <FormGroup>
              <Label>비밀번호를 입력하세요.</Label>
              <Input  name='PWD' onChange={(e) => setPWD(e.target.value)}  />
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
            <Button color="primary"  onClick={(e) => editUser(e.target.value)}>수정</Button>{' '}
            <Button color="secondary"  onClick={resetEdit}>닫기</Button>
          </ModalFooter>
        </Modal>
            
    </>
    
  );

  
}


export default UserList;
