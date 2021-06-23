import React from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../Context/CurrentRoomContext';
import { useModalState } from '../../../misc/CustomHooks';

const RoomIndoBtnModal = () => {
  const { isOpen, close, open } = useModalState();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-1">DESCRIPTION:</h5>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RoomIndoBtnModal;
