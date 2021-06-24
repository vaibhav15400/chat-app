import React from 'react';
import { Badge, Tooltip, Whisper, Icon, IconButton } from 'rsuite';

const ConditionBadge = ({ condition, children }) => {
  return condition ? <Badge content={condition}>{children}</Badge> : children;
};
const IconBtnControl = ({
  isVisible,
  tooltip,
  iconName,
  onClick,
  badgeContent,
  ...props
}) => {
  return (
    <div
      className="ml-2"
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <ConditionBadge condition={badgeContent}>
        <Whisper
          placement="top"
          delay={0}
          delayHide={0}
          delayShow={0}
          trigger="hover"
          speaker={<Tooltip>{tooltip}</Tooltip>}
        >
          <IconButton
            {...props}
            onClick={onClick}
            circle
            size="xs"
            icon={<Icon icon={iconName} />}
          />
        </Whisper>
      </ConditionBadge>
    </div>
  );
};

export default IconBtnControl;
