/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useState } from 'react'
import firebase from 'firebase/app';
import { Button,Icon,Modal,Form,FormGroup,ControlLabel,FormControl, Schema, Alert } from 'rsuite'
import { useModalState } from '../misc/CustomHooks'
import { database } from '../misc/firebase';

const {StringType}=Schema.Types;

const model=Schema.Model({
  name:StringType().isRequired('chat name is required'),
  description:StringType().isRequired('chat description is required')

})


const INITISL_FORM={
  name:'',
  description:''
}

const CreateRoomBtnModal = () => {

  const {isOpen,open,close}=useModalState();
  const [formValue, setFormValue]=useState(INITISL_FORM);
  const [isloading, setIsLoading]=useState(false);
  const formRef=useRef();

  const onFormChange=useCallback(value=>{
    setFormValue(value);
  },[]);


  const onSubmit= async ()=>{

    if(!formRef.current.check()){
      return;
    }

    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    }
    try {
      await database.ref('rooms').push(newRoomData);
      Alert.info(`${formValue.name} has been created`,4000)
      setIsLoading(false);
      setFormValue(INITISL_FORM)
      close();
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.message,4000)
    }

  }


  return (
    <div className='mt-2'>
      
      <Button block color='green' onClick={open}>
        <Icon icon='creative'/>Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>
            NEW CHAT ROOM
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid onChange={onFormChange} formValue={formValue} model={model} ref={formRef}>
            <FormGroup>
              <ControlLabel>
                ROOM NAME
              </ControlLabel>
              <FormControl name='name' placeholder='Enter chat room name ....'/>
            </FormGroup>
            
            <FormGroup>
            <ControlLabel>
               DESCRIPTION
              </ControlLabel>
              <FormControl componentClass="textarea" row={10} name='description' placeholder='Enter description room  ....'/>

            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance='primary' onClick={onSubmit} disabled={isloading}>
            CREATE NEW CHAT ROOM
          </Button>
        </Modal.Footer>
      </Modal>




    </div>
  )
}

export default CreateRoomBtnModal
