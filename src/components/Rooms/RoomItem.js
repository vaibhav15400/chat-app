/* eslint-disable arrow-body-style */

import React from 'react'
import TimeAgo from 'timeago-react';

export const RoomItem = () => {
  return (
    <div>
      
      

      <div className='d-flex justify-content-between align-items-center'>
      <h3 className='text-disappear'>Room Name</h3>
      <TimeAgo
        datetime={new Date()} className='font-normal text-black-50'
      />
    </div>


    <div className='d-flex  align-items-center text-black-70'>
      <span>No Messages Yet</span>
    </div>
    </div>

    
  )
}
