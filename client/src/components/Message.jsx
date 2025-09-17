import React, { useEffect } from 'react'
import { assets } from '../assets/assets'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
import { LoaderFive } from './ui/loader'

const Message = ({ message }) => {

  useEffect(() => {
    Prism.highlightAll();
  }, [message.content])

  return (
    <div>
      {message.role === "user" ? (
        <div className='flex items-start justify-end my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 py-3 bg-[#352372]/50 border border-[#80609F]/50 rounded-md max-w-2xl'>
            <p className='text-sm text-gray-200'>{message.content}</p>
          </div>
          <img src={assets.user_icon} alt="user" className='w-8 rounded-full' />
        </div>
      ) : message.isLoading ? (
        <div className='flex items-start my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 py-3 bg-transparent max-w-2xl'>
            <LoaderFive text="Generating chat..." />
          </div>
        </div>
      ) : (
        <div className='flex items-start my-4 gap-2'>
          <div className='flex flex-col gap-2 p-2 px-4 py-3 bg-tranparent rounded-md max-w-2xl'>
            {message.isImage ? (
              <img src={message.content} className='w-full max-w-md mt-2 rounded-md' alt="generated" />
            ) : (
              <div className='text-sm text-gray-200 reset-tw'>
                <Markdown>{message.content}</Markdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Message
