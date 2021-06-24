import React, { useState, useCallback } from 'react';
import { InputGroup, Input, Icon, Alert } from 'rsuite';
import { useParams } from 'react-router';
import firebase from 'firebase/app';
import { database } from '../../../misc/firebase';
import { useProfile } from '../../../Context/ProfileContext';
import AttchmentBtnModal from './AttchmentBtnModal';
import AudioMessageBtn from './AudioMessageBtn';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}
const Bottom = () => {
  const [input, setInput] = useState(' ');
  const [isLoading, setIsLoading] = useState(false);

  const { profile } = useProfile();
  const { chatId } = useParams();
  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      // eslint-disable-next-line no-useless-return
      return;
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };
    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput('');
      setIsLoading(false);
    } catch (error) {
      Alert.error(error.message, 4000);
      setIsLoading(false);
    }
  };

  const onKeyDown = eve => {
    if (eve.keyCode === 13) {
      eve.preventDefault();
      onSendClick();
    }
  };

  const afterUpload = useCallback(
    async files => {
      setIsLoading(true);

      const updates = {};

      files.forEach(file => {
        const msgData = assembleMessage(profile, chatId);
        msgData.file = file;
        const messageId = database.ref('messages').push().key;

        updates[`/messages/${messageId}`] = msgData;
      });
      const lastMsgId = Object.keys(updates).pop();
      updates[`/rooms/${chatId}/lastMessage`] = {
        ...updates[lastMsgId],
        msgId: lastMsgId,
      };

      try {
        await database.ref().update(updates);
        setIsLoading(false);
      } catch (error) {
        Alert.error(error.message, 4000);
        setIsLoading(false);
      }
    },
    [chatId, profile]
  );

  return (
    <div>
      <InputGroup>
        <AttchmentBtnModal afterUpload={afterUpload} />
        <AudioMessageBtn afterUpload={afterUpload} />
        <Input
          placeholder="Write a new message here..."
          onChange={onInputChange}
          value={input}
          onKeyDown={onKeyDown}
        />

        <InputGroup.Button
          color="blue"
          appearance="primary"
          onClick={afterUpload}
          disabled={isLoading}
        >
          <Icon icon="send" />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default Bottom;
