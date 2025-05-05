"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react"; // ikon kütüphanesi (lucide-react opsiyonel)
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const chatModels = [
    { name: "deepseek/deepseek-r1:free", logo: "/deepseekLogo.png", url: "/chat/deepSeek" },
    { name: "meta-llama/llama-3.2-1b-instruct:free", logo: "/metaLogo.png", url: "/chat/llama" },
    { name: "microsoft/phi-4-reasoning-plus:free", logo: "/microsoftLogo.png", url: "/chat/phi4" },
    { name: "claude", logo: "/claudeLogo.png", url: "/chat/claude" },
  ];


  const [isOpen, setIsOpen] = useState(true);
    const { data: session, status } = useSession();
    const [allChat, setAllChat] = useState([]);
    const getAllChats = async () => {
      console.log("Fetching all chats...");
      const res = await fetch(
        `http://localhost:3001/chat/getAllChats?user=${session?.user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      setAllChat(data);
    };
  
    useEffect(() => {
      if (status === "authenticated" && session.accessToken) {
        getAllChats();
      }
    }, [status, session]);
  

  return (
    <div className="flex h-screen md:block hidden">
      {/* Toggle Button */}
      {/* Sidebar */}
      <div
        className={`w-[250px] bg-gray-50 text-black transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-9/12"
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Chats</h2>
            <button className=" text-black" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div
            className={`flex flex-col gap-5 mt-8 justify-center transition-all duration-300 ease-in-out transform ${
              isOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }`}
          >
            {allChat.map((chat) => {
                const model = chatModels.find((model) => model.name=== chat.chatModel);
                const chatLogo = model?.logo || "/deepseekLogo.png";
              return (
                <Link href={`/chat/${chat.chatUrl}`} key={chat._id} className="flex flex-col w-full h-[50px] bg-black hover:bg-black/95 rounded-2xl items-center justify-center cursor-pointer">
                <div className="flex gap-2 items-center justify-between w-full px-4">
                  <Image
                   src={chatLogo}
                    alt="GPT Logo"
                    width={25}
                    height={25}
                    className="w-[25px] h-[25px] object-contain bg-white rounded-full"
                  />
                  <h1 className="font-medium text-[13px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden text-end">
                    {chat.chatTitle}
                  </h1>
                </div>
                </Link>
              )
          
            })}
           
          </div>
        </div>
      </div>
    </div>
  );
}
