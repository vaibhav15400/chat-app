import React from 'react';
import { Tooltip, Whisper, Badge } from 'rsuite';
import { usePresence } from '../misc/CustomHooks';

const getColor = presence => {
  if (!presence) {
    return 'gray';
  }
  switch (presence.state) {
    case 'online':
      return 'green';
    case 'offline':
      return 'red';
    default:
      return 'gray';
  }
};

const getText = presence => {
  if (!presence) {
    return 'Unknow State';
  }
  return presence.state === 'online'
    ? 'Online'
    : `Last online ${new Date(presence.last_changed).toLocaleDateString()}`;
};

const Presence = ({ uid }) => {
  const presence = usePresence(uid);
  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence) }}
      />
    </Whisper>
  );
};

export default Presence;
