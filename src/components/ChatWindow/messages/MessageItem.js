import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import Presence from '../../Presence';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import { auth } from '../../../misc/firebase';
import { useCurrentRoom } from '../../../Context/CurrentRoomContext';
import IconBtnControl from './IconBtnControl';

const MessageItem = ({ message, handleAdmin }) => {
  const { author, createdAt, text } = message;

  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmins = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  return (
    <li className="padded mb-1">
      <div className="d-flex align-items-center font-bolder mb-1">
        <Presence uid={author.uid} />
        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <span className="ml-2">{author.name}</span>
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="p-0 ml-1 text-black"
        >
          {canGrantAdmin && (
            <Button
              block
              onClick={() => {
                handleAdmin(author.uid);
              }}
              color="blue"
            >
              {isMsgAuthorAdmins
                ? 'Remove Admin Permission'
                : 'Give Admin In This Room'}
            </Button>
          )}
        </ProfileInfoBtnModal>
        <TimeAgo
          datetime={createdAt}
          className="font-normal text-black-45 ml-2"
        />

        <IconBtnControl
          {...(true ? { color: 'red' } : {})}
          isVisible
          iconName="heart"
          tooltip="Like this Message"
          onClick={() => {}}
          badgeContent={5}
        />
      </div>
      <div>
        <span className="world-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
