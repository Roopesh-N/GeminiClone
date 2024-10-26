import React, { useState } from 'react'
import "./SideBar.css";
import {assets} from '../../assets/assets';
import { ContextStore } from '../../context';

const SideBar = () => {
  const [Extended, setExtended] = useState(false)
  const {onSent, PrevPrompts,setShowResult}=ContextStore();


  
  const handleGetRecent=(e)=>{
    const recentEntryIndex=e.target.closest(".recent-entry")
    if(recentEntryIndex){
      const index=recentEntryIndex.dataset.index;
      const prompt= PrevPrompts[index]
      onSent(prompt)
    }
  }

  return (
    <>
    <div className='sidebar'>
        <div className='top'>
            <img className="menu" src={assets.menu_icon} alt='' onClick={()=>setExtended(!Extended)}/>
            <div className='new-chat' onClick={()=>setShowResult(false)}>
              <img className="" src={assets.plus_icon} alt=""/>
              {Extended?<p>New Chat</p>:null}
            </div>
            {Extended?
            <div className='recent' onClick={(e)=>handleGetRecent(e)}>
              <p className='recent-title'>Recent</p>
                {PrevPrompts.map((prompt,index)=>{
                  return (
                    <div className='recent-entry' key={index} data-index={index}>
                      <img src={assets.message_icon} alt=""/>
                      <p>{prompt.slice(0,15).padEnd(18,".")}</p>
                    </div>
                  )
                })}
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