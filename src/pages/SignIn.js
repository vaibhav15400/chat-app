/* eslint-disable arrow-body-style */
import React from 'react';
import firebase from 'firebase/app';
import { Container, Grid, Button, Row, Panel, Col, Icon, Alert } from 'rsuite';
import { auth, database } from '../misc/firebase';

const SignIn = () => {
  const SignInWIthProvider = async provider => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
      Alert.success('Signined In', 4000);
    } catch (err) {
      Alert.error(err.message, 4000);
    }
  };

  const onFacebookSignIN = () => {
    SignInWIthProvider(new firebase.auth.FacebookAuthProvider());
  };
  const onGoogleSignIN = () => {
    SignInWIthProvider(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <Container>
      <Grid className="mt-page">
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel>
              <div className="text-center">
                <h2> WELCOME TO CHAT</h2>
                <p> Progressive chat app</p>
              </div>
              <div className="mt-3">
                <Button block color="blue" onClick={onFacebookSignIN}>
                  <Icon icon="facebook" />
                  Continue with Facebook
                </Button>
                <Button block color="green" onClick={onGoogleSignIN}>
                  <Icon icon="google" />
                  Continue with Google
                </Button>
                <Button block color="red">
                  <Icon icon="email" />
                  X-UNDERCONSTRUCTION-X
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  );
};

export default SignIn;
