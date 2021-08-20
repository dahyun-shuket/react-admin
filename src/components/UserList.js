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

const thead = ["아이디", "구분", "생성일", "수정일"];

const UserList = ({props, posts, loading}) => {


    // users
    const [SEQ, setSEQ] = useState('');
    const [LOGINID, setLOGINID] = useState('');
    const [PWD, setPWD] = useState('');
    const [USERTYPE, setUSERTYPE] = useState('');
    // // modal
    // const [modal, setModal] = useState(false);
    // const toggle = () => setModal(!modal);

    // const [createModal , setCreateModal] = useState(false);
    // const createToggle = () => setCreateModal(!createModal);

    // // Tab
    // const [activeTab, setActiveTab] = useState('1');
    // const toggleTab = tab => {
    //     if(activeTab !== tab) setActiveTab(tab);
    // }
  
  return (
   
        
            
        <>
        { loading &&
            <div> loading... </div>
        }
        <tbody>
                {posts.map((post) => 
                {
                if(post.USERTYPE === 'A') {
                    return (
                        <tr key={post.SEQ} >
                    <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
                    <td style={{cursor:'pointer'}}>{post.USERTYPE}관리자</td>
                    <td>{post.CREATED}</td>
                    <td>{post.MODIFIED}</td>
                    <td><p style={{display:'block', cursor:'pointer'}}>수정</p></td>
                    <td><p  style={{display:'block', cursor:'pointer'}}>삭제</p></td>
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
                    <td><p style={{display:'block', cursor:'pointer'}}>수정</p></td>
                    <td><p  style={{display:'block', cursor:'pointer'}}>삭제</p></td>
                    </tr>

                    );
                } else if(post.USERTYPE === 'U') {
                  return (
                      <tr key={post.SEQ} >
                  <td style={{cursor:'pointer'}} >{post.LOGINID}</td>
                  <td style={{cursor:'pointer'}}>{post.USERTYPE}구직자</td>
                  <td>{post.CREATED}</td>
                  <td>{post.MODIFIED}</td>
                  <td><p style={{display:'block', cursor:'pointer'}}>수정</p></td>
                  <td><p  style={{display:'block', cursor:'pointer'}}>삭제</p></td>
                  </tr>

                  );
              }
                
                }
                )}
       </tbody>
</>
    
  );

  
}


export default UserList;
