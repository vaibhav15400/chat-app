/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';
import { Button, Icon, Drawer, Alert } from 'rsuite';
import Dashboard from '.';
import { isOfflineForDatabase } from '../../Context/ProfileContext';
import { useMediaQuery, useModalState } from '../../misc/CustomHooks';
import { auth, database } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width:992px)');
  const OnSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        close();
      })
      .catch(error => {
        Alert.error(error.message, 5000);
      });

    auth.signOut();
    Alert.info('SIGNED-OUT', 5000);
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
