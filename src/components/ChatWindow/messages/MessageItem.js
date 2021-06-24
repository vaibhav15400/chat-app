import React, { memo } from 'react';
import TimeAgo from 'timeago-react';
import { Button } from 'rsuite';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';
import Presence from '../../Presence';
import ProfileAvatar from '../../Dashboard/ProfileAvatar';
import { auth } from '../../../misc/firebase';
import { useCurrentRoom } from '../../../Context/CurrentRoomContext';
import IconBtnControl from './IconBtnControl';
import { useHover, useMediaQuery } from '../../../misc/CustomHooks';

const MessageItem = ({ message, handleAdmin, handlLike, handleDelete }) => {
  const { author, createdAt, text, likes, likeCount } = message;

  const [selfRef, isHovered] = useHover();

  const isMoblie = useMediaQuery('(max-width:992px)');
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const admins = useCurrentRoom(v => v.admins);

  const isMsgAuthorAdmins = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdmin = isAdmin && !isAuthor;

  const canShowIcons = isMoblie || 'hover';
  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? 'bg-black-02' : ''}`}
      ref={selfRef}
    >
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
          {...(isLiked ? { color: 'red' } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like this Message"
          onClick={() => handlLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete this Message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        <span className="world-break-all">{text}</span>
      </div>
    </li>
  );
};

export default memo(MessageItem);
