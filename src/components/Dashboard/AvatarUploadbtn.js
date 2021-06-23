/* eslint-disable arrow-body-style */
import React, { useState } from 'react'
import { Modal,Button, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor'
import { useModalState } from '../../misc/CustomHooks';

const fileInputTypes='.png,.jpeg,.jpg';
const acceptedFileTypes=['image/png','image/jpeg','image/pjpeg','image/png']
const isValidFile=(file)=>acceptedFileTypes.includes(file.type);


const AvatarUploadbtn = () => {
  const {isOpen, open, close}=useModalState();
  // eslint-disable-next-line no-unused-vars
  const [image,setImage]=useState(null)
  const onFileInputChange=(eve)=>{


    const currentFiles=eve.target.files;

    if(currentFiles.length===1){
      const file=currentFiles[0];
      if(isValidFile(file)){
        setImage(file)
        open();
      }else{
        Alert.warning(`Wrong File Type ${file.type}`,4000)
      }

    }
  }
  return (
    <div className='mt-3 text-center'>
      
      <div>

      <label htmlFor='avatarUpload' className='d-block cursor-pointer padded'>
        Select New Avatar
        <input id='avatarUpload' type='file' className='d-none' accept={fileInputTypes}
        onChange={onFileInputChange}/>
      </label>

      <Modal show={isOpen} onHide={close} >
        <Modal.Header>
          <Modal.Title>
            Adjust and upload 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex justify-content-center align-items-center h-100'>
          {image&&
            <AvatarEditor
            image={image}
            width={200}
            height={200}
            border={10}
            rotate={0}
            borderRadius={100}
          />
          }
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button appearance='ghost' block>
            UPLOAD AVATAR
          </Button>
        </Modal.Footer>
      </Modal>


      </div>


    </div>
  )
}

export default AvatarUploadbtn
