/* eslint-disable arrow-body-style */
import React, { useState, useRef } from 'react';
import { Modal, Button, Alert } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import ProfileAvatar from './ProfileAvatar';
import { useModalState } from '../../misc/CustomHooks';
import { database, storage } from '../../misc/firebase';
import { useProfile } from '../../Context/ProfileContext';
import { getUserUpdate } from '../../misc/Helper';

const fileInputTypes = '.png,.jpeg,.jpg';
const acceptedFileTypes = [
  'image/png',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
];
const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File Process Error'));
      }
    });
  });
};

const AvatarUploadbtn = () => {
  const { isOpen, open, close } = useModalState();
  const [image, setImage] = useState(null);
  const avatarEditorRef = useRef();
  const { profile } = useProfile();
  const [isloading, setIsLoading] = useState(false);
  const onFileInputChange = eve => {
    const currentFiles = eve.target.files;

    if (currentFiles.length === 1) {
      const file = currentFiles[0];
      if (isValidFile(file)) {
        setImage(file);
        open();
      } else {
        Alert.warning(`Wrong File Type ${file.type}`, 4000);
      }
    }
  };
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdate(
        profile.uid,
        'avatar',
        downloadUrl,
        database
      );
      await database.ref().update(updates);
      setIsLoading(false);
      close();
      Alert.info('avatar has been uploaded', 4000);
    } catch (error) {
      setIsLoading(false);
      Alert.error(error.meeage, 4000);
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />

      <div>
        <label htmlFor="avatarUpload" className="d-block cursor-pointer padded">
          Select New Avatar
          <input
            id="avatarUpload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>

        <Modal show={isOpen} onHide={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {image && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={image}
                  width={200}
                  height={200}
                  border={10}
                  rotate={0}
                  borderRadius={100}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="ghost"
              block
              onClick={onUploadClick}
              disabled={isloading}
            >
              UPLOAD AVATAR
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadbtn;
