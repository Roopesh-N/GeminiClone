import React, { useState } from 'react'
import "./SideBar.css";
import {assets} from '../../assets/assets';

const SideBar = () => {
  const [Extended, setExtended] = useState(false)
  return (
    <>
    <div className='sidebar'>
        <div className='top'>
            <img className="menu" src={assets.menu_icon} alt='' onClick={()=>setExtended(!Extended)}/>
            <div className='new-chat'>
              <img className="" src={assets.plus_icon} alt=""/>
              {Extended?<p>New Chat</p>:null}
            </div>
            {Extended?
            <div className='recent'>
              <p className='recent-title'>Recent</p>
              <div className='recent-entry'>
                <img src={assets.message_icon} alt=""/>
                {Extended?<p>previous search..</p>:null}
              </div>
            </div>
            :null}

        </div>
        <div className='bottom'>
          <div className='bottom-item recent-entry'>
            <img  src={assets.question_icon} alt=""/>
            {Extended?<p>Help</p>:null}
          </div>
          <div className='bottom-item recent-entry'>
            <img  src={assets.history_icon} alt=""/>
            {Extended?<p>Activity</p>:null}
          </div>
          <div className='bottom-item recent-entry'>
            <img  src={assets.setting_icon} alt=""/>
            {Extended?<p>Settings</p>:null}
          </div>
        </div>

    </div>

    </>
  )
}

export default SideBar