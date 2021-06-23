/* eslint-disable arrow-body-style */
import React, { useRef,useEffect, useState } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
import DashboardToggle from './Dashboard/DashboardToggle';
import ChatRoomList from './Rooms/ChatRoomList';

const Sidebar = () => {

  const topSidebarRef=useRef();
  const [height,setHeight]=useState(0);


  useEffect(() => {
    if(topSidebarRef.current){
      setHeight(topSidebarRef.current.scrollHeight)
    }
  }, [topSidebarRef])

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle />
        <CreateRoomBtnModal/>
        <Divider>Join CONVERsation text</Divider>
      </div>
      <ChatRoomList aboveElHeight={height}/>
    </div>
  );
};

export default Sidebar;
