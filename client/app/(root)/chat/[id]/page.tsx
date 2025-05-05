"use client";

import Sidebar from "@/app/components/Sidebar";
import { User } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Message = () => {
  const { data: session, status } = useSession();
  const params = useParams();
  const { id } = params;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [allMessages, setAllMessages] = useState([]);
  const [chatModel, setChatModel] = useState("");
  const chatModels = [
    { name: "deepseek/deepseek-r1:free", logo: "/deepseekLogo.png", url: "/chat/deepSeek" },
    { name: "meta-llama/llama-3.2-1b-instruct:free", logo: "/metaLogo.png", url: "/chat/llama" },
    { name: "microsoft/phi-4-reasoning-plus:free", logo: "/microsoftLogo.png", url: "/chat/phi4" },
    { name: "claude", logo: "/claudeLogo.png", url: "/chat/claude" },
  ];


  const getAllMessages = async () => {
    console.log("Fetching all messages...");
    const res = await fetch(`http://localhost:3001/chat/getChat/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
    const data = await res.json();
    console.log("data", data);
    setChatModel(data.chatModel);
    setAllMessages(data.messages);
  };

  const newChat = async (model) => {
    console.log("Creating new chat...");
    const res = await fetch("http://localhost:3001/chat/startChat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
      },
      body: JSON.stringify({
        chatModel: model,
        user: session?.user.id,
      }),
    });

    const data = await res.json();
    console.log(data);
    router.push(`/chat/${data.chatUrl}`);
  };

  useEffect(() => {
    if (status !== "authenticated" || !session?.accessToken) return;
    console.log(id)
    if (id === "deepSeek") {
      newChat("deepseek/deepseek-r1:free");
    }else if (id=== "llama"){
      newChat("meta-llama/llama-3.2-1b-instruct:free");
    }else if (id === "phi4"){
      newChat("microsoft/phi-4-reasoning-plus:free");
    }
     else {
      getAllMessages();
    }
  }, [id, status, session?.accessToken]);

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm) return;
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/chat/newMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          userMessage: searchTerm,
          chatUrl: id,
        }),
      });
  
      const data = await res.json();
      setSearchTerm("");
      getAllMessages();
  
    }
    catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    } 
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex w-full flex-col items-center justify-between ">
        <div className="flex flex-col w-full md:px-32 px-0 pt-10 gap-4 overflow-y-auto max-h-[calc(100vh-175px)]">
          {allMessages?.map((message) => {
              const model = chatModels.find((model) => model.name=== chatModel);
              const chatLogo = model?.logo || "/deepseekLogo.png";
            return (
              <React.Fragment key={message._id}>
              {message.role === "assistant" ? (
                <div className="flex gap-2">
                  <div>
                    <Image
                      src={chatLogo}
                      alt="GPT Logo"
                      width={50}
                      height={50}
                      className=" rounded-full"
                    />
                  </div>
                  <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-50 rounded-2xl p-4">
                    {message.content}
                  </p>
                </div>
              ) : (
                <div className="flex gap-2 justify-end rounded-md p-2">
                  <p className="font-medium text-[15px] max-w-4xl break-words text-black bg-gray-200 rounded-2xl p-4">
                    {message.content}
                  </p>
                  <div>
                    <User
                      className="bg-gray-200 rounded-full p-2"
                      width={50}
                      height={50}
                    />
                  </div>
                </div>
              )}
            </React.Fragment>
            )
           
          })}
        </div>
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0 w-[600px] mb-4 shadow-md"
        >
          <label
            htmlFor="message"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Message
          </label>
          <div className="relative">
            <textarea
              rows={3}
              type="text"
              id="message"
              value={searchTerm}
              onChange={handleSearchChange}
              className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Message"
              required
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
               {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Message;
