import React from 'react';
import { Modal } from 'rsuite';
import { useModalState } from '../../../misc/CustomHooks';

const ImgBtnModal = ({ src, fileName }) => {
  const { isOpen, close, open } = useModalState();

  return (
    <>
      <input
        type="image"
        alt="file"
        src={src}
        onClick={open}
        className="mw-100 mh-100 w-auto"
      />
      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>{fileName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img src={src} height="100%" width="100%" alt="file" />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <a href={src} target="blank" rel="noopener noreferer">
            View Original
          </a>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImgBtnModal;
