import React, { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import Message from "./Message";
import { LoaderFive } from "./ui/loader";



export const ChatBox = () => {
  const { selectedChat, theme } = useAppContext();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [prompt, setPrompt] = useState("");
  const [mode, setMode] = useState("text");
  const [isPublished, setIsPublished] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false);

  const textareaRef = useRef(null)
  const containerRef = useRef(null)

  const onSubmit = async (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // reset
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"; // expand
    }

    const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight, 10);
    setIsExpanded(textareaRef.current.scrollHeight > lineHeight + 4);
  }, [prompt]);

  useEffect(() => {

    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat])

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scroll({
        top:containerRef.current.scrollHeight,
      })
    }
  },[messages])

  return (
    <div className="flex-1 flex flex-col justify-between m-5 md:m-1 xl:mx-30 max-md mt-14 2xl:pr-40">
      <div ref={containerRef} className="flex-1 mb-3 overflow-y-scroll">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-2 text-primary">
            <img src={assets.logo_full} alt="" className="w-full max-w-56 sm:max-w-68" />
            <p className="mt-5 text-4xl sm:text-6x1 text-center text-gray-400 dark:text-white">Ask me Anything</p>
          </div>
        )}

        {messages.map((message, index) =>
          <Message key={index} message={message} />
        )}
      </div>
      {
        // loading && <div className="loader flex items-center gap-1.5">
        //   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark: bg-white animate-bounce"></div>
        //   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark: bg-white animate-bounce"></div>
        //   <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark: bg-white animate-bounce"></div>
        // </div>
        loading && <LoaderFive text="Generating chat..." />
      }

      
      


      <form
        className={`bg-primary/20 dark:bg-[#352372]/30 border border-primary dark:border-[#80609F]/30 
      w-full max-w-2xl p-3 pl-4 mx-auto flex gap-4 items-center text-white transition-all
      ${isExpanded ? "rounded-2xl" : "rounded-full"}`}
      >
        {/* Mode Selector */}
        <select
          onChange={(e) => setMode(e.target.value)}
          value={mode}
          className="text-sm pl-3 pr-2 bg-transparent outline-none "
        >
          <option className="bg-transparent text-black" value="text">Text</option>
          <option className="bg-transparent text-black  border rounded-lg" value="image">Image</option>
        </select>

        {/* Auto-expanding textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          onChange={(e) => setPrompt(e.target.value)}
          value={prompt}
          placeholder="Type your prompt here..."
          className="flex-1 resize-none overflow-y-auto w-full bg-transparent text-sm outline-none max-h-[6.5rem]"
          required
        />

        {/* Send button */}
        <button type="submit" disabled={loading} className="shrink-0">
          <img src={loading ? assets.stop_icon : assets.send_icon} alt="send" />
        </button>
      </form>
      <div className=" flex h-7 items-center">
      {mode === 'image' && (
          <label className="inline-flex items-center gap-2 text-sm mx-auto text-white">
            <p className="text-xs">Publish Generated Image to Community</p>
            <input type="checkbox" className="cursor-pointer" checked={isPublished} onChange={(e)=>{setIsPublished(e.target.checked)}}/>
          </label>
        )}
      </div>
    </div>

  );
};

