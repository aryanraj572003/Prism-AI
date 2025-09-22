import React, { useMemo, useState } from 'react'
import moment from 'moment'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const MessageSleekbar = () => {
  const { chats, selectedChat, navigate, setSelectedChat, setScrollToMessageTs } = useAppContext()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const userMessages = useMemo(() => {
    // Only show messages from the currently open chat
    if (!selectedChat || !Array.isArray(selectedChat.messages)) return []
    const items = []
    for (const msg of selectedChat.messages) {
      if (msg?.role === 'user' && typeof msg.content === 'string') {
        items.push({
          chatId: selectedChat._id,
          chat: selectedChat,
          content: msg.content,
          timestamp: msg.timestamp,
        })
      }
    }
    return items.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0))
  }, [selectedChat])

  const filtered = useMemo(() => {
    if (!query) return userMessages
    const q = query.toLowerCase()
    return userMessages.filter(m => m.content.toLowerCase().includes(q))
  }, [query, userMessages])

  const handleClick = (item) => {
    if (!item?.chat) return
    setSelectedChat(item.chat)
    setScrollToMessageTs(item.timestamp)
    navigate('/')
  }

  return (
    <>
      {/* Backdrop overlay when open */}
      {open && (
        <div
          className='fixed inset-0 bg-black/30 z-30'
          onClick={() => setOpen(false)}
        />
      )}

      {/* Toggle Handle that moves with panel */}
      <button
        onClick={() => setOpen(!open)}
        className={
          `fixed top-1/2 -translate-y-1/2 z-40 flex items-center justify-center h-12 w-6
           bg-[#57317C]/40 border border-white/20 rounded-l-md hover:bg-[#57317C]/60 transition-all
           ${open ? 'right-[336px]' : 'right-0'}`
        }
        aria-label={open ? 'Collapse messages panel' : 'Expand messages panel'}
      >
        <span className='text-white text-xs'>{open ? '<' : '>'}</span>
      </button>

      {/* Right Sleekbar as popup box */}
      <aside
        className={
          `fixed top-20 right-4 h-[70vh] w-80 p-4 z-40
           bg-[#1f1630]/95 border border-[#80609F]/30 rounded-xl shadow-xl
           transform transition-transform duration-300 ease-in-out
           ${open ? 'translate-x-0' : 'translate-x-[calc(100%+1rem)]'}`
        }
      >
        {/* If it's a new chat (no messages), show nothing */}
        {userMessages.length > 0 && (
          <>
            <div className='flex items-center gap-2 p-2 mb-2 border border-white/20 rounded-md'>
              <img src={assets.search_icon} className='w-4 not-dark:invert' />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type='text'
                placeholder='Search your messages in this chat'
                className='text-xs text-gray-200 placeholder:text-gray-200 outline-none bg-transparent flex-1'
              />
            </div>
            
            <div className='flex-1 overflow-y-auto mt-3 space-y-2'>
              {filtered.length === 0 && (
                <p className='text-xs text-gray-400'>No messages found</p>
              )}
              {filtered.map((m) => (
                <button
                  key={`${m.chatId}-${m.timestamp}`}
                  onClick={() => handleClick(m)}
                  className='w-full text-left p-2 px-3 bg-[#57317C]/10 border border-white/15 rounded-md hover:bg-white/5 transition-colors'
                >
                  <p className='text-white text-sm truncate'>{m.content}</p>
                
                </button>
              ))}
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default MessageSleekbar
