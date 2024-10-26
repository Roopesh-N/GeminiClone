import React, { useEffect, useRef, useState } from 'react'
import {assets} from '../../assets/assets';
import "../main/Main.css"
import { ContextStore } from '../../context';

const Main = () => {

    const { PrevPrompts,setInput,setRecentPrompt,RecentPrompt,ShowResult,setPrevPrompts,Input,loading,onSent, resData}=ContextStore();
    console.log(resData.current)
    
        return (
    <div className='main'>
        <div className='nav'>
            <p>Gemini</p>
            <img src={assets.user_icon} alt=""/>
        </div>
        <div className='main-container'>
            {
                (!ShowResult)
                ?<>
                <div className='greet'>
                <p><span>Hello, Dev.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className='cards'>
                <div className='card'>
                    <p>Suggest beatiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt=""/>
                </div>
                <div className='card'>
                    <p>Improve the readability of this code</p>
                    <img src={assets.code_icon} alt=""/>
                </div>
                <div className='card'>
                    <p>Briefly summarize this concept: Urban planning</p>
                    <img src={assets.bulb_icon} alt=""/>
                </div>
                <div className='card'>
                    <p>Brainstorm team bonding activities for work</p>
                    <img src={assets.message_icon} alt=""/>
                </div>
                </div>
                </>
                :<div className='result'>
                    <div className='result-title'>
                        <img src={assets.user_icon} alt=""/>
                        <p>{RecentPrompt}</p>
                    </div>
                    <div className='result-data'>
                        <img src={assets.gemini_icon} alt=""/>
                        {
                            loading 
                            ?<div className='loader'>
                                <hr/>
                                <hr/>
                                <hr/>
                                
                            </div>
                            :<p ref={resData}></p>
                        }
                    </div>
                </div>
            }
            <div className='main-bottom'>
            <div className='search-box'>
                <input onChange={(e)=>setInput(e.target.value)} value={Input} type='text' placeholder='Enter your prompt here'/>
                <div>
                    <img className="" src={assets.gallery_icon}  alt="" />
                    <img className="" src={assets.mic_icon}  alt="" />
                    <img onClick={()=>onSent()} className="" src={assets.send_icon}  alt="" />
                </div>
            </div>
            <p className='bottom-info'>
            Gemini can make mistakes, so double-check it
            </p>
        </div>
        </div>


    </div>
  )

}

export default Main