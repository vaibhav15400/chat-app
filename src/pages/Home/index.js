/* eslint-disable arrow-body-style */
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Grid, Col, Row } from 'rsuite';
import Sidebar from '../../components/Sidebar';
import Chat from './Chat';
import { RoomsProvider } from '../../Context/RoomContext';
import { useMediaQuery } from '../../misc/CustomHooks';

const Home = () => {
  const isDesktop = useMediaQuery('(min-width:992px)');

  const { isExact } = useRouteMatch();

  const canRenderSidebar = isDesktop || isExact;

  return (
    <RoomsProvider>
      <Grid fluid className="h-100">
        <Row className="h-100">
          {canRenderSidebar && (
            <Col xs={24} md={8} className="h-100">
              <Sidebar />
            </Col>
          )}

          <Switch>
            <Route exact path="/chat/:chatId">
              <Col xs={24} md={16} className="h-100">
                <Chat />
              </Col>
            </Route>
            <Route>
              {isDesktop && (
                <Col xs={24} md={16} className="h-100">
                  <h1 className="text-center mt-page">Please Select Chat</h1>
                </Col>
              )}
            </Route>
          </Switch>
        </Row>
      </Grid>
    </RoomsProvider>
  );
};

export default Home;
