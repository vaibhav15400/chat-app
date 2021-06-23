import React from 'react';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import ChatTop from '../../components/ChatWindow/top/index';
import Messages from '../../components/ChatWindow/messages/index';
import ChatBottom from '../../components/ChatWindow/Bottom/index';
import { useRooms } from '../../Context/RoomContext';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">chat {chatId} not found</h6>;
  }

  return (
    <>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </>
  );
};

export default Chat;
