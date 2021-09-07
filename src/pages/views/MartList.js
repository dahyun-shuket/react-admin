import React, {useState} from "react";
// import { Link } from "react-router-dom";
import { Button, Form, Modal,ModalHeader,ModalBody,
  ModalFooter,  Row, Col,  FormGroup, Input } from "reactstrap";
// import Select from "react-select";
import axios from "axios";
import moment from "moment";
import secrectKey from'../../Utils/secretkey'
import { getCookie } from "Utils/Cookie";


function MartList({ posts, loading, props }) {

    const [auth, setAuth] = useState(null);
    //수정모달
    const [editModal, setEditModal] = useState(false);
    const editToggle = () => setEditModal(!editModal);
    // 로고 모달
    const [imgModal, setImgModal] = useState(false);
    const imgToggle = () => setImgModal(!imgModal);
    // const [refresh, setRefresh] = useState(0);
    const [inputs, setInputs] = useState([{
      seq:'',
        SEQ:'',
        NAME: '',
        LOGOFILE: null,
        REGNO: '',
        ADDRESS: '',
        CONTACT: '',
        POSTCODE: '',
        ADDRESSEXTRA: '',
        HRONAME: '',
        HRORANK: '',
        HROCONTACT: '',
        previewURL:'',
        logoImage: null,
        location: '',
        uploadFile:null,
        fileName:'',
    }]);
    const {SEQ, NAME, LOGOFILE, REGNO, ADDRESS, CONTACT, POSTCODE, ADDRESSEXTRA, HRONAME, HRORANK, HROCONTACT,  previewURL, logoImage, location, uploadFile, seq, fileName } = inputs;
    const onChange = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
            // [fileName]: value
        })
    }

    // 이미지 미리보기
    const handleFileOnChange = (event) => {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
        reader.onloadend = () => {
          setInputs({
            file : file,
            previewURL : reader.result,
            noURL : '',
          })
        }
        reader.readAsDataURL(file);
      }

      // const handleFileChange = (e) => {
      //   console.log('click event')
      //   // event.target.profile_img.files[0]
      //   const uploadLogo = 'http://localhost:3333/api/files/uploadSingle';
      //   const formData = new FormData();
      //   // formData.append('SEQ', inputs.SEQ);
      //   formData.append('LOCATION', 'MART');
      //   formData.append('LOGOFILE', inputs.LOGOFILE);
      //   const config = {
      //     headers: {
      //       "content-type": "multipart/form-data"
      //     }
      //   };
      //   axios.post(uploadLogo,  formData, config)
      //     // .then((res) => {
      //     //   if(res.data.data.result === 'success') {
      //     //     logoImage(res.data.data.filename)
      //     //     axios.post('http://localhost:3333/api/mart/logo', {SEQ:SEQ, LOGOFILE:logoImage })
      //     //       .then((res) => {
      //     //         console.log('res',res)
      //     //         alert('로고 수정 완료')
      //     //       })
      //     //   }
      //     // })
      //   console.log('LOGOFILE',LOGOFILE);
      // }


      // 로고 수정 ndb
      function addCustomer() {
        const url = 'http://localhost:3000/api/files/uploadSingle';
        const formData = new FormData();
        formData.append('location', 'martlogo');
        formData.append('uploadFile', inputs.uploadFile);
        // formData.append('fileName', inputs.uploadFile.value);
        const config = {
            headers: {
                'content-type' : 'multipart/form-data',
            }
        }
        console.log(formData);
        return axios.post(url, formData, config)
      }
      
    
    function handleFormSubmit(e) {

        e.preventDefault()
        addCustomer()
        // addLogo()
        .then((res) => {
          // setInputs(res.data.data.fileName)
          // console.log(logoImage)
          // console.log("res.data.filename ? ? ? " + JSON.stringify(res.data.data.filename))
          // let fileName = inputs.uploadFile.name;

          const config = {
            headers: {
                'Content-type': 'application/json',
                'User-Agent': 'DEVICE-AGENT',
                'userAgent': 'DEVICE-AGENT',
                'Authorization': getCookie('xToken')
            }
          }
          console.log("res.data.data ? ? ? ? ? ? ? ?@@@@@@@" + JSON.stringify(res.data.data))
           axios.post('http://localhost:3000/api/mart/updateLogo', 
           {
              SEQ:SEQ, 
              LOGOFILE: 'martlogo/'+res.data.data.filename,
              key: secrectKey.secretKey
           }
           , config
           )

              .then((res) => {
                setInputs(res.data.data);

                console.log('logo', res)
                console.log('로고 수정 완료')
                logoClose();
                window.location.reload();
              })

            console.log('uploadSingle', res)
        })
        .catch(err => console.log(err));
        setInputs({
            uploadFile: null,
            location: 'martlogo',

        })
    }
    
    function handleFileChange(e) {
        const {name, value} = e.target;
        setInputs({
            ...inputs,
            [name]: e.target.files[0],
            [fileName]: value
        })
        console.log(fileName);
        
        console.log('name, value',name, value);
        console.log('e.target.file',e.target.files[0])
    }
  
  
      // 수정 모달 리셋
      const resetEdit = () => {
          editToggle();
          setInputs('');
          }
      // 수정 모달 GET
      const editChange = (seq) => {
          editToggle();
          const urlGet = `http://localhost:3000/api/mart/get`;
          axios.post(urlGet, {SEQ:seq})
          .then((res) => {
              console.log('get:  ', res.data.data)
              setInputs(res.data.data);
          });
      }
  
      // 마트 수정 update
      const editTable = (data) => {
          editToggle();
          const urlEdit = `http://localhost:3000/api/mart/update`;
          
          axios.post(urlEdit, {userSeq:auth, SEQ:SEQ, NAME:NAME, REGNO:REGNO, ADDRESS:ADDRESS, CONTACT:CONTACT, POSTCODE:POSTCODE, ADDRESSEXTRA:ADDRESSEXTRA, HRONAME:HRONAME, HRORANK:HRORANK, HROCONTACT:HROCONTACT, key: secrectKey.secretKey}, {headers: 
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
                alert('수정 성공');
                console.log('수정 성공')
                // 새로고침
                window.location.reload();
              } else if(res.data.result === 'fail') {
                alert('수정 실패')
                return;
              }
            })
            .catch((err) => {
              alert(err, '마트 수정 실패')
            })
          
          }
  
      // 마트 삭제
      const removeChange = (SEQ) => {
          const urlRemove = 'http://localhost:3000/api/mart/remove';
          if(window.confirm('삭제 하시겠습니까?')) {
              axios.post(urlRemove, {SEQ:SEQ, key: secrectKey.secretKey}, {headers: 
                {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': getCookie('xToken')
                }
            })
                  .then((res) => {
                      if(res.data.result === 'success') {
                          console.log('성공 result', res.data.result)
                          alert('마트 삭제 성공')
                      } else if(res.data.result === 'fail') {
                          alert('마트 삭제 실패')
                      }
                  })
          }
      }
  
      // 마트 로고
      const imageChage = (SEQ) =>{
          imgToggle();
          axios.post('http://localhost:3000/api/mart/get', {SEQ:SEQ})
            .then((res) => {
              setInputs(res.data.data);
            })
      }
      // 마트 로고1
      const inputChange = (e) => {
          const img = e.target.files[0];
          const formData = new FormData();
          formData.append('file', img);
      }
  
      let profile_preview = null;
      if(LOGOFILE !== ''){
        profile_preview = <img className='profile_preview' src={previewURL}></img>
      }
  
      // 로고 닫기
      const logoClose = () => {
        imgToggle();
        setInputs('');
      }

    return (
        <>
          {posts && posts.map((post) => (
            <tr key={post.SEQ} >
              <td>{post.SEQ}</td>
                <td>{post.NAME}</td>
                <td><img src={'http://localhost:3000/api/files/get/'+post.LOGOFILE} alt={LOGOFILE} name={LOGOFILE} />  </td>
                <td>{post.REGNO}</td>
                <td>{post.ADDRESS}</td>
                <td>{post.CONTACT}</td>
                <td>{moment(post.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</td>
                <td>{moment(post.MODIFIED).format("YYYY-MM-DD hh:mm:ss")}</td>
                <td><p onClick={(e) => editChange(post.SEQ) } style={{display:'block', cursor:'pointer'}}><i class="far fa-edit"></i></p></td>
                <td><p onClick={(e) => imageChage(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i class="far fa-image"></i></p></td>
                <td><p  onClick={(e) => removeChange(post.SEQ)} style={{display:'block', cursor:'pointer'}}><i className="far fa-trash-alt"></i></p></td>
            </tr>  
            ))}  


             {/* 수정모달 */}
         <Modal isOpen={editModal} toggle={editToggle} backdrop={false} >
            <ModalHeader>마트 수정</ModalHeader>
            <ModalBody>
            <Input type='hidden' value={SEQ} name="SEQ" onChange={onChange} />
            
            <Form>
                <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>마트명</label>
                        <Input value={NAME || ''} name='NAME' onChange={onChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="8">
                      <FormGroup>
                        <label>사업자등록번호</label>
                        <Input  value={REGNO || ''} name='REGNO' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>연락처</label>
                        <Input  value={CONTACT || ''} name='CONTACT' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>우편번호</label>
                        <Input  value={POSTCODE || ''} name='POSTCODE' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="8">
                      <FormGroup>
                        <label>주소</label>
                        <Input  value={ADDRESS || ''} name='ADDRESS' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>상세주소</label>
                        <Input value={ADDRESSEXTRA || ''} name='ADDRESSEXTRA' onChange={onChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>인사 담당자</label>
                        <Input  value={HRONAME || ''} name='HRONAME' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>인사 담당자 직급</label>
                        <Input  value={HRORANK || ''} name='HRORANK' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>인사 담당자 연락처</label>
                        <Input  value={HROCONTACT || ''} name='HROCONTACT' onChange={onChange}  />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>            
            </ModalBody>
            <ModalFooter>
            <Button color="primary" onClick={(e) => editTable(e.target.value)} >수정</Button>{' '}
            <Button color="secondary"  onClick={resetEdit}>닫기</Button>
            </ModalFooter>
        </Modal> 
        
        {/* 마트 로고 수정 */}
        <Modal isOpen={imgModal} toggle={imgToggle} backdrop={false} >
            <ModalHeader></ModalHeader>
            <ModalBody>
                <Row>
                    <Col md="12">
                      <Input type='hidden' value={SEQ} name='SEQ' onChange={(e) => setInputs(e.target.value)} />
                      {/* <form onSubmit={handleFormSubmit} encType='multipart/form-data'>
                        <input onChange={handleFileOnChange} type="file" name="LOGOFILE" accept='image/jpg, image/png, image/jpeg' file={LOGOFILE} value={fileName}  />
                        <Button onClick={handleFileChange} type="submit">추가하기</Button>
                        {profile_preview}
                        </form> */}

                        {/* <input accept='image/*' type="file" file={LOGOFILE} value={fileName} name='LOGOFILE' onChange={handleFileOnChange} />
                        <Button onClick={handleFileChange} type="submit">로고수정</Button>
                        {profile_preview} */}

                        <input  accept="image/*" id="raised-button-file" name='uploadFile' type="file" file={uploadFile} value={fileName} onChange={handleFileChange}/><br/>

                    </Col>
                  </Row>
            </ModalBody>
            <ModalFooter>
            <Button color="secondary"  onClick={handleFormSubmit}>수정</Button>
            <Button color="secondary"  onClick={logoClose}>닫기</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}

export default MartList;