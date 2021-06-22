/* eslint-disable arrow-body-style */
import React from 'react';
import { Drawer, Button } from 'rsuite';
import { useProfile } from '../../Context/ProfileContext';

const Dashboard = ({ OnSignOut }) => {
  const { profile } = useProfile();

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
      </Drawer.Body>
      <Drawer.Footer>
        <Button block color="red" onClick={OnSignOut}>
          SignOut
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
