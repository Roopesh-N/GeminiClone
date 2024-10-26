import { createContext, useContext, useRef, useState } from "react";
import runChat from "./config/gemini";

const Context=createContext();

const ContextProvider=({children})=>{

    const [Input, setInput] = useState("");
    const [RecentPrompt, setRecentPrompt]=useState("");
    const [PrevPrompts, setPrevPrompts]=useState([]);
    const [ShowResult, setShowResult]=useState(false);
    const [loading,setloading]=useState(false);
    const [resultData, setResultData]=useState("");
    const resData=useRef("");

    // const delayPara=(index, nextWord)=>{
        //     let timerId=setTimeout(() => {
            //         setResultData(prev=>prev+nextWord)
            //     }, 75*index);
            //     return ()=>clearTimeout(timerId)
            // }
            
    // great learning for improving performance by reducing re-renders using useRef instead of useState for resultData
    const delayRef=(wordsArray)=>{

        wordsArray.forEach((word,index)=>{
            setTimeout(() => {
                if(resData.current){
                    resData.current.innerHTML +=`${word} `;
                }
            }, 75*index);
        })
    }

    const onSent=async (prompt)=>{
        // setResultData("")
        resData.current="";
        setloading(true);
        setShowResult(true);
        let response;
        if(prompt){
            setRecentPrompt(prompt)
            response=await runChat(prompt);
        }
        else{
            setRecentPrompt(Input)
            setPrevPrompts(prev=>[Input,...prev])
            response=await runChat(Input);
        }

        let newResponse= response.split("**");
        let updateResponse="";
        for(let i=0;i<newResponse.length;i++){
            if((i%2)!== 1){
                updateResponse+=newResponse[i]
            }
            else{
                updateResponse+="<b>"+newResponse[i]+"</b>"
            }
        }
        let updatedResponse=updateResponse.split("*").join("</br>")
        let updatedResponseArray=updatedResponse.split(" ")
        // using useRef to update Result
        delayRef(updatedResponseArray);

        // using useState to update result
        // for(let j=0;j<updatedResponseArray.length;j++){
        //     let nextWord=updatedResponseArray[j]
        //     delayPara(j,nextWord+" ")
        // }
        setloading(false)
        setInput("")
        console.log(RecentPrompt);
    }

    const contextValue={
        PrevPrompts,
        setInput,
        setRecentPrompt,
        RecentPrompt,
        ShowResult,
        setShowResult,
        setPrevPrompts,
        Input,
        loading,
        onSent,
        resData
        
    }

    return <Context.Provider value={contextValue}>{children}</Context.Provider>
}


export const ContextStore=()=>{
    return useContext(Context)
}

export default ContextProvider