import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Icon, ButtonToolbar } from 'rsuite';
import { useCurrentRoom } from '../../../Context/CurrentRoomContext';
import { useMediaQuery } from '../../../misc/CustomHooks';
import RoomIndoBtnModal from './RoomIndoBtnModal';

const Top = () => {
  const name = useCurrentRoom(v => v.name);

  const isMobile = useMediaQuery('(max-width:992px)');

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex align-items-center">
          <Icon
            icon="arrow-circle-left"
            size="2x"
            componentClass={Link}
            to="/"
            className={
              isMobile
                ? 'd-inline-block p-0 mr-2 text-blue link-unstyled'
                : 'd-none'
            }
          />
          <span className="text-disappear">{name}</span>
        </h4>
        <ButtonToolbar className="ws-nowrap"> todo</ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>TODO</span>
        <RoomIndoBtnModal />
      </div>
    </div>
  );
};

export default memo(Top);
