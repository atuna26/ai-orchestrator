"use client";

import { log } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const [allChat, setAllChat] = useState([]);
  const chatModels = [
    { name: "deepseek/deepseek-r1:free", logo: "/deepseekLogo.png", url: "/chat/deepSeek" },
    { name: "meta-llama/llama-3.2-1b-instruct:free", logo: "/metaLogo.png", url: "/chat/llama" },
    { name: "microsoft/phi-4-reasoning-plus:free", logo: "/microsoftLogo.png", url: "/chat/phi4" },
    { name: "claude", logo: "/claudeLogo.png", url: "/chat/claude" },
  ];
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

  const deleteChat = async (id) => {
    const res = await fetch("http://localhost:3001/chat/deleteChat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        chatUrl: id})
    })
    const data = await res.json();
    getAllChats();
  }

  useEffect(() => {
    if (status === "authenticated" && session.accessToken) {
      getAllChats();
    }
  }, [status, session]);

  return (
    <>
      <section className="w-full bg-primary min-h-[530px] pattern flex justify-center items-center flex-col py-10">
        <h1 className="heading">Choose Your AI!</h1>
        <p className="sub-heading !max-w-3xl">
          Welcome to the AI Playground! Here, you can explore and interact with
          various AI models.
        </p>
        <div className="flex flex-col md:flex-row  justify-center  gap-10 mt-10 border-2 border-black/50 p-5 rounded-lg bg-black/5 md:w-[700px] w-fit">
          {chatModels.map((model) => (
            <Link key={model.name} href={model.url}>
              <Image
                src={model.logo}
                width={65}
                height={65}
                alt={model.name}
                className="w-[65px] h-[65px] object-contain bg-white rounded-full transition-transform duration-150 ease-out hover:scale-110 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </section>
      <section className="w-full bg-white min-h-[330px] flex flex-col py-10">
        {status === "authenticated" ? (
          <>
            <h1 className="font-medium text-[20px] max-w-2xl break-words text-black pl-2">
              Your Recent Chats:
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 overflow-y-auto max-h-[300px] px-4">
              {allChat.map((chat) => {
                const lastMessage = chat.messages?.[chat.messages.length - 1];
                const model = chatModels.find((model) => model.name=== chat.chatModel);
                const chatLogo = model?.logo || "/deepseekLogo.png";
                return (
                  <div key={chat._id} className="relative group  w-[300px] " >
                  <Link href={`/chat/${chat.chatUrl}`}>
                    <div className="flex flex-col gap-5 bg-black hover:bg-black/95 rounded-2xl p-5 h-[200px] ">
                      <div className="flex gap-2 cursor-pointer">
                        <Image
                          src={chatLogo}
                          alt=""
                          width={40}
                          height={40}
                          className="h-[40px] w-[40px] object-contain bg-white rounded-full"
                        />
                        <p className="font-medium text-[17px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden">
                          {chat.chatModel}
                        </p>
                      </div>
                      <h1 className="font-medium text-[20px] max-w-2xl break-words text-white truncate whitespace-nowrap overflow-hidden text-end">
                        {chat.chatTitle}
                      </h1>
                      <p className="font-normal text-[17px] max-w-2xl break-words line-clamp-2 text-white text-end">
                        {lastMessage?.content || "No messages yet."}
                      </p>
                    </div>
                  </Link>
                  <button onClick={() => deleteChat(chat.chatUrl)}
                      className="absolute top-2 right-2 text-white  p-2 rounded-full border border-white bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <p className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] my-5 text-center w-full">
            Please Sign In to see your recent chats!
          </p>
        )}
      </section>
    </>
  );
}
