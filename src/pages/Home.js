/* eslint-disable arrow-body-style */
import React from 'react';
import { Grid, Col, Row } from 'rsuite';
import Sidebar from '../components/Sidebar';
import { RoomsProvider } from '../Context/RoomContext';

const Home = () => {
  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          <Col xs={24} md={8} className="h-100">
            <Sidebar />
          </Col>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
