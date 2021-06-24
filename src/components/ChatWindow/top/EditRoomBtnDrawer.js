import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../Context/CurrentRoomContext';
import { useMediaQuery, useModalState } from '../../../misc/CustomHooks';
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width:992px)');
  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('SucessFUll updated', 4000);
      })
      .catch(error => {
        Alert.error(error.message, 4000);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };
  const onDescriptionSave = newDescription => {
    updateData('description', newDescription);
  };

  return (
    <div>
      <Button className="br-circle" size="sm" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>EDIT ROOM</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">NAME</h6>}
            emptyMsg="NAME CAN'T BE EMPTY"
            wrapperClassName="mt-3"
          />
          <EditableInput
            wrapperClassName="mt-3"
            componentClass="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescriptionSave}
            label={<h6 className="mb-2">DESCRIPTION</h6>}
            emptyMsg="DESCRIPTION CAN'T BE EMPTY"
          />
        </Drawer.Body>
        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
