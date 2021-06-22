/* eslint-disable arrow-body-style */
import React from 'react';
import { Button, Icon, Drawer } from 'rsuite';
import Dashboard from '.';
import { useModalState } from '../../misc/CustomHooks';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        DashboardToggle
      </Button>
      <Drawer show={isOpen} onHide={close} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
