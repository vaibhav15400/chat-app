/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Icon, Drawer } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/CustomHooks';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        DashboardToggle
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
