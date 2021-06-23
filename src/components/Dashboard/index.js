/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import React from 'react';
import { Drawer, Button, Divider, Alert } from 'rsuite';
import { useProfile } from '../../Context/ProfileContext';
import { getUserUpdate } from '../../misc/Helper';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import AvatarUploadbtn from './AvatarUploadbtn';
import ProviderBlock from './ProviderBlock';

const Dashboard = ({ OnSignOut }) => {
  const { profile } = useProfile();

  const onSave = async newData => {
    try {
      const updates = await getUserUpdate(
        profile.uid,
        'name',
        newData,
        database
      );

      await database.ref().update(updates);

      Alert.success('Nickname Has Been Updated Successfully', 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>Hey, {profile.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          name="nickname"
          initialValue={profile.name}
          onSave={onSave}
          label={<h6 className="mb-2">Nickname</h6>}
        />
        <AvatarUploadbtn />
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
