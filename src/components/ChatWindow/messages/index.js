/* eslint-disable consistent-return */
/* eslint-disable no-alert */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { groupBy, transformToArrWithId } from '../../../misc/Helper';
import MessageItem from './MessageItem';

const Messages = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length >= 0;

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());

        setMessages(data);
      });
    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);
  const handleAdmin = useCallback(
    async uid => {
      const adminRef = database.ref(`/rooms/${chatId}/admins`);

      let alertMsg;
      await adminRef.transaction(admins => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = 'Admin Permission removed';
          } else {
            admins[uid] = true;
            alertMsg = 'Admin Permission granted';
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  const handlLike = useCallback(async msgId => {
    const { uid } = auth.currentUser;
    const messageRef = database.ref(`/messages/${msgId}`);

    let alertMsg;
    await messageRef.transaction(msg => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = 'Like removed';
        } else {
          msg.likeCount += 1;

          if (!msg.likes) {
            msg.likes = {};
          }

          msg.likes[uid] = true;
          alertMsg = 'LIKED';
        }
      }
      return msg;
    });
    Alert.info(alertMsg, 4000);
  }, []);

  const handleDelete = useCallback(
    async (msgId, file) => {
      if (!window.confirm('delete This Message?')) {
        return;
      }

      const isLast = messages[messages.length - 1].id === msgId;

      const updates = {};
      updates[`/messages/${msgId}`] = null;

      if (isLast && messages.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...messages[messages.length - 2],
          msgId: messages[messages.length - 2].id,
        };
      }

      if (isLast && messages.length === 1) {
        updates[`/messages/${chatId}/lastMessage`] = null;
      }
      try {
        await database.ref().update(updates);
        Alert.info('Message has been deleted');
      } catch (error) {
        return Alert.error(error.message, 4000);
      }

      if (file) {
        try {
          const fileRef = storage.refFromURL(file.url);
          await fileRef.delete();
        } catch (error) {
          return Alert.error(error.message, 4000);
        }
      }
    },
    [chatId, messages]
  );

  const renderMessages = () => {
    const groups = groupBy(messages, item =>
      new Date(item.createdAt).toDateString()
    );

    const items = [];
    Object.keys(groups).forEach(date => {
      items.push(
        <li className="text-center mb-1 padded" key={date}>
          {date}
        </li>
      );

      const msgs = groups[date].map(msg => (
        <MessageItem
          handleAdmin={handleAdmin}
          key={msg.id}
          message={msg}
          handlLike={handlLike}
          handleDelete={handleDelete}
        />
      ));
      items.push(...msgs);
    });
    return items;
  };

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && <li>NO MESSAGES YET</li>}
      {canShowMessages && renderMessages()}
    </ul>
  );
};

export default Messages;
