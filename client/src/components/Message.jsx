import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import moment from 'moment'
import Markdown from 'react-markdown'
import Prism from 'prismjs'


const Message = ({message}) => {
  
  useEffect((message)=>{
    Prism.highlightAll();
  },[message.content])


  return (
    <div>
      {message.role === "user" ?(
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 py-3 bg-slate-50 dark:bg-[#352372]/50 bprder border-[#80609F]/30 rounded-md max-w-2xl'>
            <p className='text-sm text-gray-200'>{message.content}</p>
            {/* <span className='text-xs text-gray-400 dark:text-[#B1A6C0]'>{moment(message.timestamp).fromNow()}</span> */}
          </div>
          <img src={assets.user_icon} alt="" className='w-8 rounded-full'/>
        </div>
      ):(
        <div className=' inline-flex flex-col gap-2 p-2 px-4 py-4 max-w-2xl ' >
          {message.isImage?( <img src={message.content}  className='w-full max-w-md mt-2 rounded-md'/>):(<div className='text-sm text-gray-200 reset-tw'>
          <Markdown>{message.content}</Markdown>  
          </div>)}
          {/* <span className='text-xs dark:text-primary reset-tw'>{moment(message.timestamp).fromNow()}</span> */}
        </div>        
      )}
    </div>
  )
}

export default Message
