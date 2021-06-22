/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import Dashboard from '.';
import { useMediaQuery, useModalState } from '../../misc/CustomHooks';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const OnSignOut = useCallback(() => {
    auth.signOut();
    Alert.info('SIGNED-OUT', 4000);
    close();
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open}>
        <Icon icon="dashboard" />
        DashboardToggle
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard OnSignOut={OnSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
